const fs = require('fs');
const { execSync } = require('child_process');

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
  const cmd = `ffmpeg -i "${filePath}" -af silencedetect=noise=-30dB:d=0.3 -f null - 2>&1`;
  try {
    const output = execSync(cmd).toString();
    return parseSilences(output);
  } catch (err) {
    const output = err.stdout ? err.stdout.toString() : '';
    return parseSilences(output);
  }
}

function parseSilences(output) {
  const regex = /silence_end:\s+([\d.]+)/g;
  let match;
  const silences = [];
  while ((match = regex.exec(output)) !== null) {
    silences.push(parseFloat(match[1]));
  }
  return silences;
}

async function run() {
  const kjvData = JSON.parse(fs.readFileSync('kjv.json', 'utf8'));
  const offsets = JSON.parse(fs.readFileSync('audio_offsets.json', 'utf8'));
  
  const book = "Genesis";
  const chapter = 1;
  const bookIndex = BIBLE_BOOKS.findIndex(b => b.toLowerCase() === book.toLowerCase());
  const versesText = kjvData[bookIndex].chapters[chapter - 1];
  const introOffset = offsets[book][chapter];
  
  const prefix = "01";
  const cleanName = "Genesis";
  const chapterStr = "001";
  const audioPath = `audio/${prefix} ${cleanName} ${chapterStr}.mp3`;
  
  const durationStr = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`).toString();
  const duration = parseFloat(durationStr.trim());
  const outroOffset = 2.0;
  const readingDuration = duration - introOffset - outroOffset;
  
  const silences = getSilenceEnds(audioPath);
  console.log(`Detected ${silences.length} silence endpoints in the whole file.`);
  
  let totalWeight = 0;
  const verseWeights = versesText.map((text, idx) => {
    const cleaned = cleanScriptureText(text);
    const weight = calculateVerseWeight(cleaned);
    totalWeight += weight;
    return { verse: idx + 1, text: cleaned, weight };
  });
  
  let cumulativeWeight = 0;
  const targetEndTimes = verseWeights.map(vw => {
    cumulativeWeight += vw.weight;
    return introOffset + (cumulativeWeight / totalWeight) * readingDuration;
  });
  
  // Snap each target end time to the closest silence endpoint
  const snappedEndTimes = [];
  let lastSnapped = introOffset;
  
  for (let i = 0; i < targetEndTimes.length; i++) {
    const target = targetEndTimes[i];
    
    if (i === targetEndTimes.length - 1) {
      // The last verse ends at the duration minus outro
      snappedEndTimes.push(Math.round((duration - outroOffset) * 100) / 100);
      continue;
    }
    
    // Find the closest silence endpoint that is strictly greater than the last snapped time
    const candidates = silences.filter(s => s > lastSnapped + 1.0 && s < duration - 1.0);
    if (candidates.length === 0) {
      // Fallback to target if no silences
      const val = Math.round(target * 100) / 100;
      snappedEndTimes.push(val);
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
    snappedEndTimes.push(val);
    lastSnapped = val;
  }
  
  // Print results
  let prevTime = introOffset;
  verseWeights.forEach((vw, idx) => {
    const endTime = snappedEndTimes[idx];
    console.log(`Verse ${vw.verse} | Start: ${prevTime.toFixed(2)}s | End: ${endTime.toFixed(2)}s | Duration: ${(endTime - prevTime).toFixed(2)}s | Text: "${vw.text.substring(0, 60)}..."`);
    prevTime = endTime;
  });
}

run();
