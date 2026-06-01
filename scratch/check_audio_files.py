import os
import json

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

def main():
    missing = []
    found_count = 0
    total_chapters = 0
    
    for book in BIBLE_BOOKS:
        ch_count = get_book_chapter_count(book)
        for ch in range(1, ch_count + 1):
            total_chapters += 1
            filename = get_audio_filename(book, ch)
            if not os.path.exists(filename):
                missing.append((book, ch, filename))
            else:
                found_count += 1
                
    print(f"Total Bible Chapters expected: {total_chapters}")
    print(f"Audio files found: {found_count}")
    print(f"Audio files missing: {len(missing)}")
    
    if missing:
        print("\n--- Missing Files ---")
        for m in missing[:10]:
            print(f"Book: {m[0]}, Chapter: {m[1]}, Expected Path: {m[2]}")
        if len(missing) > 10:
            print("...")

if __name__ == "__main__":
    main()
