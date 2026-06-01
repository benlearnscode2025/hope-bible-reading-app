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

    # 5. Extract verse start times using stable word projection
    # Find start position of each verse in kjv_words
    verse_start_idx = {}
    for idx, w_info in enumerate(kjv_words):
        v = w_info["verse"]
        if v not in verse_start_idx:
            verse_start_idx[v] = idx

    num_verses = len(verses_text)
    timings = [0.0] * num_verses

    COMMON_WORDS = {"and", "the", "of", "in", "to", "that", "it", "he", "was", "for", "on", "as", "with", "a", "but", "is", "his", "they", "them", "shall", "unto", "be", "were", "had", "by", "not", "or", "are", "from", "an", "at", "this", "which", "will", "would"}

    for v in range(1, num_verses + 1):
        v_matches = []
        for k_pos, t_pos in matches:
            w_info = kjv_words[k_pos]
            if w_info["verse"] == v:
                idx_in_verse = k_pos - verse_start_idx[v]
                v_matches.append((idx_in_verse, trans_words[t_pos]["start"], w_info["word"]))

        # Sort matches by index in verse
        v_matches.sort(key=lambda x: x[0])

        stable_match = None
        for idx_in_verse, t_start, word in v_matches:
            if word not in COMMON_WORDS:
                stable_match = (idx_in_verse, t_start)
                break

        if not stable_match and len(v_matches) > 0:
            # Fallback to first matched word
            stable_match = (v_matches[0][0], v_matches[0][1])

        if stable_match:
            k_idx, t_start = stable_match
            # Project start time backwards: each word before k_idx takes ~0.35s
            t_proj = t_start - (k_idx * 0.35)
            
            # Check if there is an actual match before k_idx that is close to t_proj
            actual_start = None
            for idx_in_verse, actual_t, word in v_matches:
                if idx_in_verse < k_idx:
                    # If this match is within 2.0s of projection, it's valid!
                    if abs(actual_t - t_proj) < 2.0:
                        actual_start = actual_t
                        break
            
            if actual_start is not None:
                timings[v-1] = round(float(actual_start), 2)
            else:
                timings[v-1] = round(float(max(0.0, t_proj)), 2)
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
