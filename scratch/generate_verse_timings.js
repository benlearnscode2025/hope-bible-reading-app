const { exec } = require('child_process');
const fs = require('fs');

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke",
  "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
  "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

function getAudioFileName(bookName, chapter) {
  const index = BIBLE_BOOKS.findIndex(b => b.toLowerCase() === bookName.toLowerCase());
  if (index === -1) return null;
  
  const prefix = String(index + 1).padStart(2, '0');
  let cleanName = bookName;
  
  if (bookName === '1 Samuel') cleanName = 'I Samuel';
  else if (bookName === '2 Samuel') cleanName = 'II Samuel';
  else if (bookName === '1 Kings') cleanName = 'I Kings';
  else if (bookName === '2 Kings') cleanName = 'II Kings';
  else if (bookName === '1 Chronicles') cleanName = 'I Chronicles';
  else if (bookName === '2 Chronicles') cleanName = 'II Chronicles';
  else if (bookName === 'Psalms') cleanName = 'Psalm';
  else if (bookName === 'Song of Solomon') cleanName = 'Solomon';
  else if (bookName === '1 Corinthians') cleanName = 'I Corinthians';
  else if (bookName === '2 Corinthians') cleanName = 'II Corinthians';
  else if (bookName === '1 Thessalonians') cleanName = 'I Thessalonians';
  else if (bookName === '2 Thessalonians') cleanName = 'II Thessalonians';
  else if (bookName === '1 Timothy') cleanName = 'I Timothy';
  else if (bookName === '2 Timothy') cleanName = 'II Timothy';
  else if (bookName === '1 Peter') cleanName = 'I Peter';
  else if (bookName === '2 Peter') cleanName = 'II Peter';
  else if (bookName === '1 John') cleanName = 'I John';
  else if (bookName === '2 John') cleanName = 'II John';
  else if (bookName === '3 John') cleanName = 'III John';
  
  const chapterStr = String(chapter).padStart(3, '0');
  return `audio/${prefix} ${cleanName} ${chapterStr}.mp3`;
}

function getBookChapterCount(bookName) {
  const counts = {
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
  };
  return counts[bookName];
}

function cleanScriptureText(text) {
  if (!text) return "";
  let cleaned = text.replace(/\{[^}]+:[^}]+\}/g, "");
  cleaned = cleaned.replace(/\{([^}]+)\}/g, "$1");
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

function calculateVerseWeight(text) {
  if (!text) return 0;
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const briefPauses = (text.match(/[,;:]/g) || []).length;
  const sentenceEndings = (text.match(/[.?!]/g) || []).length;
  return (wordCount * 1.0) + (briefPauses * 0.5) + (sentenceEndings * 1.0) + 1.2;
}

function getSilenceEnds(filePath) {
  return new Promise((resolve) => {
    const cmd = `ffmpeg -i "${filePath}" -af silencedetect=noise=-20dB:d=0.25 -f null - 2>&1`;
    exec(cmd, (error, stdout, stderr) => {
      const output = stdout + '\n' + (stderr || '');
      const regex = /silence_end:\s+([\d.]+)/g;
      let match;
      const silences = [];
      while ((match = regex.exec(output)) !== null) {
        silences.push(parseFloat(match[1]));
      }
      resolve(silences);
    });
  });
}

function getAudioDuration(filePath) {
  return new Promise((resolve) => {
    const cmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;
    exec(cmd, (error, stdout) => {
      resolve(parseFloat(stdout.trim()) || 0);
    });
  });
}

async function main() {
  const kjvData = JSON.parse(fs.readFileSync('kjv.json', 'utf8'));
  const results = {};
  
  console.log("Starting alignment generation for all 1189 chapters...");
  
  // Create tasks list
  const tasks = [];
  for (let b = 0; b < BIBLE_BOOKS.length; b++) {
    const book = BIBLE_BOOKS[b];
    const totalChapters = getBookChapterCount(book);
    results[book] = {};
    for (let c = 1; c <= totalChapters; c++) {
      tasks.push({ book, chapter: c, bookIndex: b });
    }
  }
  
  const concurrencyLimit = 30;
  let activeCount = 0;
  let taskIndex = 0;
  let completedCount = 0;
  
  return new Promise((resolve) => {
    function next() {
      if (taskIndex >= tasks.length) {
        if (activeCount === 0) {
          fs.writeFileSync('verse_timings.json', JSON.stringify(results));
          console.log(`Verse timings generated successfully. Processed ${completedCount} chapters.`);
          resolve();
        }
        return;
      }
      
      while (activeCount < concurrencyLimit && taskIndex < tasks.length) {
        const task = tasks[taskIndex++];
        activeCount++;
        
        const { book, chapter, bookIndex } = task;
        const filePath = getAudioFileName(book, chapter);
        const versesText = kjvData[bookIndex].chapters[chapter - 1];
        
        if (!fs.existsSync(filePath)) {
          // Fallback if audio file is missing (approximate linear timings)
          const introOffset = chapter === 1 ? 7.5 : 2.5;
          results[book][chapter] = [introOffset]; // start time of verse 1
          activeCount--;
          completedCount++;
          next();
          continue;
        }
        
        Promise.all([
          getSilenceEnds(filePath),
          getAudioDuration(filePath)
        ]).then(([silences, duration]) => {
          let introOffset = 2.5;
          if (chapter === 1) {
            const valid = silences.filter(s => s < 26.0);
            if (valid.length > 0) {
              introOffset = valid[valid.length - 1];
            } else {
              introOffset = 7.5;
            }
          } else {
            const valid = silences.filter(s => s < 10.0);
            if (valid.length > 0) {
              introOffset = valid[valid.length - 1];
            } else {
              introOffset = 2.5;
            }
          }
          
          const outroOffset = 2.0;
          const readingDuration = duration - introOffset - outroOffset;
          
          let totalWeight = 0;
          const weights = versesText.map(t => {
            const w = calculateVerseWeight(cleanScriptureText(t));
            totalWeight += w;
            return w;
          });
          
          let cumulativeWeight = 0;
          const targetEndTimes = weights.map(w => {
            cumulativeWeight += w;
            return introOffset + (cumulativeWeight / totalWeight) * readingDuration;
          });
          
          const verseStarts = [introOffset]; // Verse 1 starts at introOffset
          let lastSnapped = introOffset;
          
          for (let i = 0; i < targetEndTimes.length - 1; i++) {
            const target = targetEndTimes[i];
            const candidates = silences.filter(s => s > lastSnapped + 1.0 && s < duration - 1.0);
            
            if (candidates.length === 0) {
              const val = Math.round(target * 100) / 100;
              verseStarts.push(val);
              lastSnapped = val;
              continue;
            }
            
            let closest = candidates[0];
            let minDiff = Math.abs(closest - target);
            for (let j = 1; j < candidates.length; j++) {
              const diff = Math.abs(candidates[j] - target);
              if (diff < minDiff) {
                minDiff = diff;
                closest = candidates[j];
              }
            }
            
            const val = Math.round(closest * 100) / 100;
            verseStarts.push(val);
            lastSnapped = val;
          }
          
          results[book][chapter] = verseStarts;
          activeCount--;
          completedCount++;
          
          if (completedCount % 50 === 0 || completedCount === tasks.length) {
            console.log(`Progress: ${completedCount}/${tasks.length} chapters aligned...`);
          }
          next();
        }).catch(err => {
          console.error(`Error aligning ${filePath}:`, err);
          const introOffset = chapter === 1 ? 7.5 : 2.5;
          results[book][chapter] = [introOffset];
          activeCount--;
          completedCount++;
          next();
        });
      }
    }
    
    next();
  });
}

main();
