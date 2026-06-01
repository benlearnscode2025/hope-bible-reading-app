const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function detectIntro(filePath) {
  return new Promise((resolve, reject) => {
    // Run silencedetect filter for the first 45 seconds
    const cmd = `ffmpeg -t 45 -i "${filePath}" -af silencedetect=noise=-30dB:d=0.3 -f null -`;
    exec(cmd, (error, stdout, stderr) => {
      // ffmpeg prints filter info to stderr
      const output = stderr + '\n' + stdout;
      const regex = /silence_end:\s+([\d.]+)\s+\|\s+silence_duration:\s+([\d.]+)/g;
      let match;
      const silences = [];
      while ((match = regex.exec(output)) !== null) {
        silences.push({
          end: parseFloat(match[1]),
          duration: parseFloat(match[2])
        });
      }
      resolve(silences);
    });
  });
}

async function run() {
  const testFiles = [
    'audio/01 Genesis 001.mp3',
    'audio/01 Genesis 002.mp3',
    'audio/01 Genesis 003.mp3',
    'audio/40 Matthew 001.mp3',
    'audio/40 Matthew 002.mp3',
    'audio/19 Psalm 001.mp3',
    'audio/19 Psalm 023.mp3'
  ];

  for (const f of testFiles) {
    if (fs.existsSync(f)) {
      const silences = await detectIntro(f);
      console.log(`File: ${f}`);
      silences.forEach(s => {
        console.log(`  Silence end at: ${s.end}s (duration: ${s.duration}s)`);
      });
    } else {
      console.log(`File not found: ${f}`);
    }
  }
}

run();
