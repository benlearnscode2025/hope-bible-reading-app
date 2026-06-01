import os
import re
import json
import time
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

def get_audio_filename(book_name, chapter):
    index = BIBLE_BOOKS.index(book_name)
    prefix = str(index + 1).zfill(2)
    clean_name = book_name
    
    if book_name == '1 Samuel': clean_name = 'I Samuel'
    elif book_name == '2 Samuel': clean_name = 'II Samuel'
    elif book_name == '1 Kings': clean_name = 'I Kings'
    elif book_name == '2 Kings': clean_name = 'II Kings'
    elif book_name == '1 Chronicles': clean_name = 'I Chronicles'
    elif book_name == '2 Chronicles': clean_name = 'II Chronicles'
    elif book_name == 'Psalms': clean_name = 'Psalm'
    elif book_name == 'Song of Solomon': clean_name = 'Solomon'
    elif book_name == '1 Corinthians': clean_name = 'I Corinthians'
    elif book_name == '2 Corinthians': clean_name = 'II Corinthians'
    elif book_name == '1 Thessalonians': clean_name = 'I Thessalonians'
    elif book_name == '2 Thessalonians': clean_name = 'II Thessalonians'
    elif book_name == '1 Timothy': clean_name = 'I Timothy'
    elif book_name == '2 Timothy': clean_name = 'II Timothy'
    elif book_name == '1 Peter': clean_name = 'I Peter'
    elif book_name == '2 Peter': clean_name = 'II Peter'
    elif book_name == '1 John': clean_name = 'I John'
    elif book_name == '2 John': clean_name = 'II John'
    elif book_name == '3 John': clean_name = 'III John'
    
    chapter_str = str(chapter).zfill(3)
    return f"audio/{prefix} {clean_name} {chapter_str}.mp3"

def get_book_chapter_count(book_name):
    counts = {
      "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
      "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24,
      "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36,
      "Ezra": 10, "Nehemiah": 13, "Esther": 10, "Job": 42, "Psalms": 150,
      "Proverbs": 31, "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66,
      "Jeremiah": 52, "Lamentations": 5, "Ezekiel": 48, "Daniel": 12,
      "Hosea": 14, "Joel": 3, "Amos": 9, "Obadiah": 1, "Jonah": 4,
      "Micah": 7, "Nahum": 3, "Habakkuk": 3, "Zephaniah": 3, "Haggai": 2,
      "Zechariah": 14, "Malachi": 4, "Matthew": 28, "Mark": 16, "Luke": 24,
      "John": 21, "Acts": 28, "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13,
      "Galatians": 6, "Ephesians": 6, "Philippians": 4, "Colossians": 4,
      "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6, "2 Timothy": 4,
      "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5, "1 Peter": 5,
      "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1, "Jude": 1, "Revelation": 22
    }
    return counts[book_name]

def get_median(lst):
    n = len(lst)
    if n == 0:
        return 0
    s_lst = sorted(lst)
    if n % 2 == 1:
        return s_lst[n // 2]
    else:
        return (s_lst[n // 2 - 1] + s_lst[n // 2]) / 2.0

def align_chapter(model, book_name, chapter_num, verses_text, file_path):
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
                kjv_words.append({"word": cw, "verse": verse_num})
                
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
    print(f"CUDA Available: {torch.cuda.is_available()}")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    if device == "cuda":
        print(f"Device Name: {torch.cuda.get_device_name(0)}")
        
    print("Loading Whisper tiny.en model...")
    model = whisper.load_model("tiny.en", device=device)
    print("Model loaded successfully.")
    
    # Load KJV scripture texts
    with open("kjv.json", "r", encoding="utf-8") as f:
        kjv_data = json.load(f)
        
    timings_file = "verse_timings.json"
    progress_file = "scratch/alignment_progress.json"
    
    # Load existing timings or create a fresh dict
    if os.path.exists(timings_file):
        try:
            with open(timings_file, "r", encoding="utf-8") as f:
                verse_timings = json.load(f)
        except Exception:
            verse_timings = {}
    else:
        verse_timings = {}
        
    # Load progress or create a fresh set
    if os.path.exists(progress_file):
        try:
            with open(progress_file, "r", encoding="utf-8") as f:
                completed = set(json.load(f))
        except Exception:
            completed = set()
    else:
        completed = set()

    # Generate full checklist of chapters
    import sys
    target_book = None
    force_all = False
    
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg == "--force":
            force_all = True
            print("Forcing realignment of the entire Bible...")
        elif arg in BIBLE_BOOKS:
            target_book = arg
            print(f"Targeting book for realignment: {target_book}")
        else:
            print(f"Unknown argument: {arg}. Use --force or a Bible book name (e.g. Genesis).")
            return

    all_chapters = []
    for b_idx, book in enumerate(BIBLE_BOOKS):
        ch_count = get_book_chapter_count(book)
        for ch in range(1, ch_count + 1):
            all_chapters.append({
                "book": book,
                "chapter": ch,
                "book_idx": b_idx,
                "key": f"{book} {ch}"
            })
            
    total_chapters = len(all_chapters)
    
    if target_book:
        chapters_to_run = [c for c in all_chapters if c["book"] == target_book]
        completed = {k for k in completed if not k.startswith(target_book + " ")}
    elif force_all:
        chapters_to_run = all_chapters
        completed = set()
    else:
        chapters_to_run = [c for c in all_chapters if c["key"] not in completed]
        
    run_count = len(chapters_to_run)
    
    print(f"Total Bible chapters: {total_chapters}")
    print(f"Already completed: {len(completed)}")
    print(f"Chapters to process: {run_count}")
    
    if run_count == 0:
        print("All chapters are already aligned. Nothing to do!")
        return
        
    start_time_all = time.time()
    processed_count = 0
    
    for c in chapters_to_run:
        book = c["book"]
        chapter = c["chapter"]
        book_idx = c["book_idx"]
        key = c["key"]
        
        file_path = get_audio_filename(book, chapter)
        if not os.path.exists(file_path):
            print(f"Skipping {key}: Audio file not found at {file_path}")
            continue
            
        verses_text = kjv_data[book_idx]["chapters"][chapter - 1]
        
        ch_start = time.time()
        try:
            timings = align_chapter(model, book, chapter, verses_text, file_path)
            
            # Save results back to dictionary
            if book not in verse_timings:
                verse_timings[book] = {}
            # Map keys as strings because JSON needs string keys
            verse_timings[book][str(chapter)] = timings
            
            # Save to verse_timings.json
            with open(timings_file, "w", encoding="utf-8") as f:
                json.dump(verse_timings, f)
                
            # Add to progress tracker
            completed.add(key)
            with open(progress_file, "w", encoding="utf-8") as f:
                json.dump(list(completed), f)
                
            processed_count += 1
            ch_duration = time.time() - ch_start
            
            # Progress statistics
            elapsed = time.time() - start_time_all
            avg_time = elapsed / processed_count
            remaining = run_count - processed_count
            est_remaining_min = (remaining * avg_time) / 60.0
            
            print(f"[{processed_count}/{run_count}] Successfully aligned {key} in {ch_duration:.2f}s. Est. remaining: {est_remaining_min:.1f} mins.")
        except Exception as e:
            print(f"Failed to align {key}: {e}")
            
    print(f"\nAll alignments completed in {(time.time() - start_time_all)/60.0:.1f} minutes!")

if __name__ == "__main__":
    main()
