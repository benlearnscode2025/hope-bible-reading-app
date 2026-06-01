import os
import re
import json
import torch  # type: ignore
import whisper  # type: ignore

BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke",
  "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
  "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
]

def clean_scripture_text(text):
    if not text:
        return ""
    cleaned = re.sub(r'\{[^}]+:[^}]+\}', '', text)
    cleaned = re.sub(r'\{([^}]+)\}', r'\1', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned)
    return cleaned.strip()

def clean_word(w):
    return "".join([c for c in w.lower() if c.isalnum()])

def align_chapter(model, book_name, chapter_num, verses_text, file_path):
    print(f"\nAligning {book_name} {chapter_num} via Whisper...")
    
    # 1. Transcribe the audio file with word timestamps
    result = model.transcribe(file_path, language="en", word_timestamps=True)
    
    # 2. Extract KJV words with verse mappings
    kjv_words = []
    for idx, v_text in enumerate(verses_text):
        verse_num = idx + 1
        cleaned_v = clean_scripture_text(v_text)
        words = cleaned_v.split()
        for w in words:
            cw = clean_word(w)
            if cw:
                kjv_words.append({"word": cw, "verse": verse_num, "orig": w})
                
    # 3. Extract transcribed words with timestamps
    trans_words = []
    for seg in result["segments"]:
        if "words" in seg:
            for w in seg["words"]:
                cw = clean_word(w["word"])
                if cw:
                    trans_words.append({"word": cw, "start": w["start"], "end": w["end"]})
        else:
            # Fallback if words not present in segment
            seg_start = seg["start"]
            seg_end = seg["end"]
            seg_text = seg["text"]
            words = seg_text.split()
            words = [clean_word(x) for x in words if clean_word(x)]
            k = len(words)
            if k > 0:
                duration_seg = seg_end - seg_start
                for idx, w in enumerate(words):
                    w_time = seg_start + (idx / k) * duration_seg
                    trans_words.append({"word": w, "start": w_time, "end": w_time + 0.1})

    n = len(kjv_words)
    m = len(trans_words)
    print(f"KJV words: {n}, Transcribed words: {m}")
    
    if n == 0 or m == 0:
        return []
        
    # 4. Perform DP alignment (LCS-style matching)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if kjv_words[i-1]["word"] == trans_words[j-1]["word"]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
                
    # Backtrack to find matching word indices
    i, j = n, m
    matches = []
    while i > 0 and j > 0:
        if kjv_words[i-1]["word"] == trans_words[j-1]["word"]:
            matches.append((i-1, j-1))
            i -= 1
            j -= 1
        elif dp[i-1][j] >= dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    matches.reverse()
    print(f"Total aligned matches: {len(matches)}")

    # Print first 20 matches for debugging
    print("\n--- First 20 Matches ---")
    for k_pos, t_pos in matches[:20]:
        print(f"KJV: {kjv_words[k_pos]['orig']:<12} (V{kjv_words[k_pos]['verse']}) <-> Trans: {trans_words[t_pos]['word']:<12} at {trans_words[t_pos]['start']:.2f}s")

    # 5. Extract verse start times
    # To handle potential false matches in the introduction, we filter matches for each verse.
    # A verse's matched words should be clustered closely together.
    verse_times = {}
    for k_pos, t_pos in matches:
        v_num = kjv_words[k_pos]["verse"]
        t_start = trans_words[t_pos]["start"]
        if v_num not in verse_times:
            verse_times[v_num] = []
        verse_times[v_num].append(t_start)

    num_verses = len(verses_text)
    timings = [0.0] * num_verses
    
    for v in range(1, num_verses + 1):
        if v in verse_times and len(verse_times[v]) > 0:
            times = sorted(verse_times[v])
            # Filter outliers: if the first match is extremely far from the median, ignore it
            # (handles intro leakage where a word like 'the' at 1.8s matches a 'the' in verse 1)
            import numpy as np
            med = np.median(times)
            # A verse reading typically doesn't span more than 30-40 seconds, so any word
            # more than 20 seconds away from the median of the matched words is an outlier.
            valid_times = [t for t in times if abs(t - med) < 20.0]
            if len(valid_times) > 0:
                timings[v-1] = round(float(valid_times[0]), 2)
            else:
                timings[v-1] = round(float(times[0]), 2)
        else:
            timings[v-1] = None
            
    # Interpolation filling for missing matches
    for idx in range(num_verses):
        if timings[idx] is None:
            prev_val = 0.0
            for k in range(idx - 1, -1, -1):
                if timings[k] is not None:
                    prev_val = timings[k]
                    break
            next_val = None
            for k in range(idx + 1, num_verses):
                if timings[k] is not None:
                    next_val = timings[k]
                    break
            if next_val is None:
                timings[idx] = round(float(prev_val + 4.0), 2)
            else:
                timings[idx] = round(float((prev_val + next_val) / 2), 2)
                
    # Ensure monotone increasing start times
    for idx in range(1, num_verses):
        if timings[idx] < timings[idx - 1]:
            timings[idx] = timings[idx - 1]
            
    return timings

def main():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = whisper.load_model("tiny", device=device)
    
    with open("kjv.json", "r", encoding="utf-8") as f:
        kjv_data = json.load(f)
        
    # Test on Genesis 1
    verses_text_gen = kjv_data[0]["chapters"][0]
    timings_gen = align_chapter(model, "Genesis", 1, verses_text_gen, "audio/01 Genesis 001.mp3")
    print(f"\nFinal Timings for Genesis 1: {timings_gen}")

    # Test on Matthew 1 (Matthew is index 39)
    verses_text_matt = kjv_data[39]["chapters"][0]
    timings_matt = align_chapter(model, "Matthew", 1, verses_text_matt, "audio/40 Matthew 001.mp3")
    print(f"\nFinal Timings for Matthew 1: {timings_matt}")

if __name__ == "__main__":
    main()
