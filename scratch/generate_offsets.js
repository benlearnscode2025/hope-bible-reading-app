const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

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

// Function to detect silence ends in the first 30 seconds
function getSilenceEnds(filePath) {
  return new Promise((resolve) => {
    const cmd = `ffmpeg -t 30 -i "${filePath}" -af silencedetect=noise=-30dB:d=0.3 -f null -`;
    exec(cmd, (error, stdout, stderr) => {
      const output = stderr + '\n' + stdout;
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

function getBookChapterCount(bookName) {
  // Simple chapter counts
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

async function main() {
  const results = {};
  
  console.log("Starting offset generation for 1189 files in parallel...");
  
  // Create list of tasks
  const tasks = [];
  for (let b = 0; b < BIBLE_BOOKS.length; b++) {
    const book = BIBLE_BOOKS[b];
    const totalChapters = getBookChapterCount(book);
    results[book] = {};
    for (let c = 1; c <= totalChapters; c++) {
      tasks.push({ book, chapter: c });
    }
  }

  // Concurrency worker pool
  const concurrencyLimit = 30;
  let activeCount = 0;
  let taskIndex = 0;
  let completedCount = 0;

  return new Promise((resolve) => {
    function next() {
      if (taskIndex >= tasks.length) {
        if (activeCount === 0) {
          fs.writeFileSync('audio_offsets.json', JSON.stringify(results, null, 2));
          console.log(`Offsets file generated successfully. Processed ${completedCount} files.`);
          resolve();
        }
        return;
      }

      while (activeCount < concurrencyLimit && taskIndex < tasks.length) {
        const currentTask = tasks[taskIndex++];
        activeCount++;

        const { book, chapter } = currentTask;
        const filePath = getAudioFileName(book, chapter);

        if (!fs.existsSync(filePath)) {
          results[book][chapter] = chapter === 1 ? 7.5 : 2.5;
          activeCount--;
          completedCount++;
          next();
          continue;
        }

        getSilenceEnds(filePath).then(silences => {
          let offset = 2.5;
          if (chapter === 1) {
            const valid = silences.filter(s => s < 26.0);
            if (valid.length > 0) {
              offset = valid[valid.length - 1];
            } else {
              offset = 7.5;
            }
          } else {
            const valid = silences.filter(s => s < 10.0);
            if (valid.length > 0) {
              offset = valid[valid.length - 1];
            } else {
              offset = 2.5;
            }
          }

          results[book][chapter] = Math.round(offset * 100) / 100;
          activeCount--;
          completedCount++;
          
          if (completedCount % 50 === 0 || completedCount === tasks.length) {
            console.log(`Progress: ${completedCount}/${tasks.length} files processed...`);
          }
          next();
        }).catch(err => {
          console.error(`Error processing ${filePath}:`, err);
          results[book][chapter] = chapter === 1 ? 7.5 : 2.5;
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
