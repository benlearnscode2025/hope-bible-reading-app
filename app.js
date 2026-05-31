// HOPE TOLEDO BIBLE TRACKER - APPLICATION LOGIC

// 1. Bible Books Index & Chapter Counts
const BIBLE_BOOKS = [
  { name: "Genesis", chapters: 50, testament: "OT" },
  { name: "Exodus", chapters: 40, testament: "OT" },
  { name: "Leviticus", chapters: 27, testament: "OT" },
  { name: "Numbers", chapters: 36, testament: "OT" },
  { name: "Deuteronomy", chapters: 34, testament: "OT" },
  { name: "Joshua", chapters: 24, testament: "OT" },
  { name: "Judges", chapters: 21, testament: "OT" },
  { name: "Ruth", chapters: 4, testament: "OT" },
  { name: "1 Samuel", chapters: 31, testament: "OT" },
  { name: "2 Samuel", chapters: 24, testament: "OT" },
  { name: "1 Kings", chapters: 22, testament: "OT" },
  { name: "2 Kings", chapters: 25, testament: "OT" },
  { name: "1 Chronicles", chapters: 29, testament: "OT" },
  { name: "2 Chronicles", chapters: 36, testament: "OT" },
  { name: "Ezra", chapters: 10, testament: "OT" },
  { name: "Nehemiah", chapters: 13, testament: "OT" },
  { name: "Esther", chapters: 10, testament: "OT" },
  { name: "Job", chapters: 42, testament: "OT" },
  { name: "Psalms", chapters: 150, testament: "OT" },
  { name: "Proverbs", chapters: 31, testament: "OT" },
  { name: "Ecclesiastes", chapters: 12, testament: "OT" },
  { name: "Song of Solomon", chapters: 8, testament: "OT" },
  { name: "Isaiah", chapters: 66, testament: "OT" },
  { name: "Jeremiah", chapters: 52, testament: "OT" },
  { name: "Lamentations", chapters: 5, testament: "OT" },
  { name: "Ezekiel", chapters: 48, testament: "OT" },
  { name: "Daniel", chapters: 12, testament: "OT" },
  { name: "Hosea", chapters: 14, testament: "OT" },
  { name: "Joel", chapters: 3, testament: "OT" },
  { name: "Amos", chapters: 9, testament: "OT" },
  { name: "Obadiah", chapters: 1, testament: "OT" },
  { name: "Jonah", chapters: 4, testament: "OT" },
  { name: "Micah", chapters: 7, testament: "OT" },
  { name: "Nahum", chapters: 3, testament: "OT" },
  { name: "Habakkuk", chapters: 3, testament: "OT" },
  { name: "Zephaniah", chapters: 3, testament: "OT" },
  { name: "Haggai", chapters: 2, testament: "OT" },
  { name: "Zechariah", chapters: 14, testament: "OT" },
  { name: "Malachi", chapters: 4, testament: "OT" },
  { name: "Matthew", chapters: 28, testament: "NT" },
  { name: "Mark", chapters: 16, testament: "NT" },
  { name: "Luke", chapters: 24, testament: "NT" },
  { name: "John", chapters: 21, testament: "NT" },
  { name: "Acts", chapters: 28, testament: "NT" },
  { name: "Romans", chapters: 16, testament: "NT" },
  { name: "1 Corinthians", chapters: 16, testament: "NT" },
  { name: "2 Corinthians", chapters: 13, testament: "NT" },
  { name: "Galatians", chapters: 6, testament: "NT" },
  { name: "Ephesians", chapters: 6, testament: "NT" },
  { name: "Philippians", chapters: 4, testament: "NT" },
  { name: "Colossians", chapters: 4, testament: "NT" },
  { name: "1 Thessalonians", chapters: 5, testament: "NT" },
  { name: "2 Thessalonians", chapters: 3, testament: "NT" },
  { name: "1 Timothy", chapters: 6, testament: "NT" },
  { name: "2 Timothy", chapters: 4, testament: "NT" },
  { name: "Titus", chapters: 3, testament: "NT" },
  { name: "Philemon", chapters: 1, testament: "NT" },
  { name: "Hebrews", chapters: 13, testament: "NT" },
  { name: "James", chapters: 5, testament: "NT" },
  { name: "1 Peter", chapters: 5, testament: "NT" },
  { name: "2 Peter", chapters: 3, testament: "NT" },
  { name: "1 John", chapters: 5, testament: "NT" },
  { name: "2 John", chapters: 1, testament: "NT" },
  { name: "3 John", chapters: 1, testament: "NT" },
  { name: "Jude", chapters: 1, testament: "NT" },
  { name: "Revelation", chapters: 22, testament: "NT" }
];

const TOTAL_BIBLE_CHAPTERS = 1189;

// 2. Custom Reflection Quizzes for Specific Chapters
const CUSTOM_QUIZZES = {
  "Genesis-1": [
    {
      question: "What did God create on the first day, separating it from the darkness?",
      options: [
        "The sun, moon, and stars",
        "Light",
        "The oceans and land plants",
        "Birds and fish"
      ],
      answer: 1,
      explanation: "Genesis 1:3-5 states that God created light and separated the light from the darkness on the first day."
    },
    {
      question: "How did God bring creation into existence throughout this chapter?",
      options: [
        "By physical crafting and sculpting",
        "By speaking ('And God said...')",
        "By using pre-existing materials",
        "Through slow natural evolution"
      ],
      answer: 1,
      explanation: "God created by the power of His spoken Word. Repeatedly, the chapter states, 'And God said, Let there be...' and it was so."
    },
    {
      question: "What was God's declaration regarding His completed creation on the sixth day?",
      options: [
        "It was in progress",
        "It was good",
        "It was very good",
        "It was completed but needed refinement"
      ],
      answer: 2,
      explanation: "Genesis 1:31 records: 'And God saw every thing that he had made, and, behold, it was very good.'"
    }
  ],
  "John-1": [
    {
      question: "Who is 'the Word' (Logos) referred to in John 1?",
      options: [
        "John the Baptist",
        "Moses",
        "Jesus Christ, the Son of God",
        "The Apostle Paul"
      ],
      answer: 2,
      explanation: "John 1:14 clarifies that 'the Word became flesh and dwelt among us,' which refers to the incarnation of Jesus Christ."
    },
    {
      question: "What is declared about the eternal nature of the Word in verse 1?",
      options: [
        "The Word was with God, and the Word was God",
        "The Word was created by God at the beginning of time",
        "The Word was a created angel",
        "The Word was a human philosophy"
      ],
      answer: 0,
      explanation: "John 1:1 declares: 'In the beginning was the Word, and the Word was with God, and the Word was God.'"
    },
    {
      question: "What was John the Baptist's stated role concerning the Light in John 1?",
      options: [
        "To declare himself the Messiah",
        "To bear witness to the Light (Jesus Christ)",
        "To rebuild the temple in Jerusalem",
        "To gather political followers"
      ],
      answer: 1,
      explanation: "John 1:7-8 tells us John came 'to bear witness of the Light, that all men through him might believe.'"
    }
  ],
  "Romans-12": [
    {
      question: "According to Romans 12:1, how are believers asked to present their bodies to God?",
      options: [
        "As temporary sacrifices",
        "As a living sacrifice, holy, acceptable to God",
        "As perfect, faultless beings",
        "Through ritual cleaning"
      ],
      answer: 1,
      explanation: "Romans 12:1 exhorts: 'present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.'"
    },
    {
      question: "What instructions does Paul give regarding the world in Romans 12:2?",
      options: [
        "Adopt its customs to win people over",
        "Be not conformed to this world: but be ye transformed by the renewing of your mind",
        "Isolate completely from non-believers",
        "Focus on obtaining worldly prosperity"
      ],
      answer: 1,
      explanation: "Romans 12:2 states: 'And be not conformed to this world: but be ye transformed by the renewing of your mind...'"
    },
    {
      question: "How does the chapter describe the dynamic of the church body in verses 4-5?",
      options: [
        "A set of independent parts that do not need each other",
        "A strict hierarchy with one person doing all the work",
        "Many members in one body, all having different offices but one in Christ",
        "A group of people competing with one another"
      ],
      answer: 2,
      explanation: "Paul teaches that just as we have many members in one physical body, so we, being many, are one body in Christ and members one of another."
    }
  ]
};

// 3. Application State & Storage Cache
let state = {
  translation: 'kjv',
  fontFamily: 'serif',
  fontSize: 100, // percentage
  currentBookIndex: 0, // Genesis
  currentChapter: 1,
  completedChapters: {}, // Format: { "Genesis": [1, 2], "Exodus": [1] }
  streak: 0,
  lastReadDate: null, // YYYY-MM-DD
  scores: [],
  notificationsEnabled: false,
  notificationTime: "08:00",
  onboarded: false,
  theme: 'light',
  isPhysicalMode: false
};

// Sermon State Variables
let sermons = [];
let currentAudio = null;
let playingSermon = null;
let sermonNotes = {};
let currentPlaybackSpeed = 1.0;
const PLAYBACK_SPEEDS = [1.0, 1.25, 1.5, 2.0];
let isSeeking = false;
let activeSpeakerFilter = "All";
let sermonSearchQuery = "";
let currentScreen = 'reader';

// Scripture Audio Configuration & State Variables
// Change this to your public Cloud Storage bucket URL when deploying (e.g., "https://storage.googleapis.com/your-bucket/")
const AUDIO_BASE_URL = "https://firebasestorage.googleapis.com/v0/b/hope-toledo-bible-tracker.firebasestorage.app/o/audio%2F";

let scriptureAudio = null;
let scripturePlaybackSpeed = 1.0;
let isScriptureSeeking = false;
let currentVerseWeights = [];
let totalVerseLength = 0;
let scriptureSyncOffset = parseFloat(localStorage.getItem('hope_scripture_sync_offset') || '0.0');

function getIntroOffset(bookName, chapter) {
  let baseOffset = 2.5; // Default for other chapters (short "Chapter X" intro)
  if (parseInt(chapter) === 1) {
    if (bookName.toLowerCase() === 'genesis') {
      baseOffset = 24.0; // General intro at beginning of the Bible (approx 24s)
    } else {
      baseOffset = 7.5; // Book introduction title (approx 7.5s)
    }
  }
  return Math.max(0.0, baseOffset + scriptureSyncOffset);
}

function updateSyncOffsetUI() {
  const valueEl = document.getElementById('sync-offset-value');
  if (valueEl) {
    const formatted = scriptureSyncOffset >= 0 ? `+${scriptureSyncOffset.toFixed(1)}s` : `${scriptureSyncOffset.toFixed(1)}s`;
    valueEl.textContent = formatted;
  }
}


// Local storage key name
const STORAGE_KEY = 'hope_toledo_bible_tracker_state';

// Scripture Cache (In-Memory & localStorage)
const SCRIPTURE_CACHE_KEY = 'hope_scripture_cache';
let scriptureCache = {};

try {
  scriptureCache = JSON.parse(localStorage.getItem(SCRIPTURE_CACHE_KEY) || '{}');
} catch (e) {
  console.error("Failed to load scripture cache from localStorage:", e);
  scriptureCache = {};
}

function pruneScriptureCache() {
  const keys = Object.keys(scriptureCache);
  if (keys.length > 80) {
    const keysToDelete = keys.slice(0, 20);
    keysToDelete.forEach(k => delete scriptureCache[k]);
    try {
      localStorage.setItem(SCRIPTURE_CACHE_KEY, JSON.stringify(scriptureCache));
    } catch (e) {
      console.error("Failed to save pruned scripture cache:", e);
    }
  }
}

// Load state from local storage
function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      state = { ...state, ...JSON.parse(savedState) };
    } catch (e) {
      console.error("Failed to parse local storage state", e);
    }
  }
}

// Save state to local storage & cloud
function saveState() {
  // Save locally first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  
  // Save to cloud if user is authenticated and window.HopeFirebase is ready
  if (window.HopeFirebase && state.user) {
    const payload = { ...state };
    delete payload.user; // Don't upload the ephemeral user object to Firestore
    payload.sermonNotes = sermonNotes; // Include sermon notes in cloud sync
    window.HopeFirebase.saveProgress(state.user.uid, payload).catch(err => {
      console.error("Failed to save progress to cloud:", err);
    });
  }
}

// 4. UI Screen Navigation Management
const SCREENS = ['onboarding', 'reader', 'quiz', 'sermons', 'stats', 'settings'];

function navigateTo(screenId) {
  currentScreen = screenId;
  if (screenId !== 'reader') {
    stopScriptureAudio();
  }
  document.body.classList.remove('distraction-free');
  document.body.classList.remove('reader-expanded');
  const scriptureCard = document.querySelector('.scripture-card');
  if (scriptureCard) {
    scriptureCard.classList.remove('expanded');
    scriptureCard.classList.remove('collapsing');
  }
  // Save state on screen change
  saveState();

  // Scroll to top
  window.scrollTo(0, 0);

  SCREENS.forEach(screen => {
    const el = document.getElementById(`screen-${screen}`);
    if (screen === screenId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Highlight bottom navigation tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    if (tab.getAttribute('data-screen') === screenId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Display or hide header and nav bar based on screen state
  const header = document.querySelector('.app-header');
  const nav = document.getElementById('floating-nav');
  
  if (screenId === 'onboarding') {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }

  // Handle specific page loads
  if (screenId === 'reader') {
    loadActiveChapter();
  } else if (screenId === 'sermons') {
    loadSermonsLibrary();
  } else if (screenId === 'stats') {
    renderStats();
  } else if (screenId === 'settings') {
    updateSettingsForm();
  }
}

// 5. Toast Notification System
function showToast(message, icon = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="ph ph-${icon}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  
  // Remove toast from DOM after animations complete (1.5s display + 0.3s fadeout = 1.8s)
  setTimeout(() => {
    toast.remove();
  }, 1800);
}

// ==========================================================================
// SCRIPTURE AUDIO PLAYBACK CONTROLLER
// ==========================================================================

function getAudioFileName(bookName, chapter) {
  const index = BIBLE_BOOKS.findIndex(b => b.name.toLowerCase() === bookName.toLowerCase());
  if (index === -1) return null;
  
  const prefix = String(index + 1).padStart(2, '0');
  let cleanName = bookName;
  
  // Custom mapping to match the Alexander Scourby filenames exactly
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
  const filename = `${prefix} ${cleanName} ${chapterStr}.mp3`;
  
  let base = AUDIO_BASE_URL;
  if (base.startsWith('http://') || base.startsWith('https://')) {
    if (!base.endsWith('/') && !base.toLowerCase().endsWith('%2f')) {
      base += '/';
    }
  } else {
    if (!base.endsWith('/')) {
      base += '/';
    }
  }
  
  if (base.startsWith('http://') || base.startsWith('https://')) {
    const encodedFilename = encodeURIComponent(filename);
    let url = `${base}${encodedFilename}`;
    if (base.includes('firebasestorage.googleapis.com')) {
      const separator = url.includes('?') ? '&' : '?';
      if (!url.includes('alt=media')) {
        url += `${separator}alt=media`;
      }
    }
    return url;
  }
  
  return `${base}${filename}`;
}

function playScriptureAudio(bookName, chapter) {
  // 1. Stop any active sermon playback
  if (currentAudio) {
    currentAudio.pause();
    const sermonPlayer = document.getElementById('persistent-player');
    if (sermonPlayer) sermonPlayer.classList.add('hidden');
    document.body.classList.remove('has-player');
    const playPauseBtn = document.getElementById('player-play-pause-btn');
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');
    if (miniPlayPauseBtn) miniPlayPauseBtn.innerHTML = '<i class="ph ph-play"></i>';
  }

  // 2. Load and play scripture audio
  const audioFile = getAudioFileName(bookName, chapter);
  if (!audioFile) {
    showToast("Invalid book or chapter", "x-circle");
    return;
  }

  if (scriptureAudio) {
    scriptureAudio.pause();
    scriptureAudio = null;
  }

  scriptureAudio = new Audio(audioFile);
  scriptureAudio.playbackRate = scripturePlaybackSpeed;

  const speedBtn = document.getElementById('scripture-speed-btn');
  if (speedBtn) speedBtn.textContent = `${scripturePlaybackSpeed}x`;

  // Show inline player
  const player = document.getElementById('scripture-audio-player');
  if (player) player.classList.remove('hidden');

  const mainBtn = document.getElementById('btn-play-scripture');
  if (mainBtn) {
    mainBtn.classList.add('playing');
    mainBtn.innerHTML = '<i class="ph ph-pause"></i>';
    mainBtn.setAttribute('title', 'Pause Chapter Audio');
  }

  const inlinePlayBtn = document.getElementById('scripture-play-btn');
  if (inlinePlayBtn) inlinePlayBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';

  // Event Listeners for Audio element
  scriptureAudio.addEventListener('timeupdate', () => {
    if (!isScriptureSeeking) {
      updateScriptureProgress();
      updateActiveVerseHighlight();
    }
  });

  scriptureAudio.addEventListener('durationchange', () => {
    updateScriptureDuration();
  });

  scriptureAudio.addEventListener('ended', () => {
    scriptureAudio.currentTime = 0;
    updateScriptureProgress();
    if (inlinePlayBtn) inlinePlayBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    if (mainBtn) {
      mainBtn.classList.remove('playing');
      mainBtn.innerHTML = '<i class="ph ph-play"></i>';
      mainBtn.setAttribute('title', 'Play Chapter Audio');
    }
  });

  scriptureAudio.addEventListener('error', (err) => {
    console.error("Scripture Audio Playback Error:", err);
    showToast("Audio file not found or failed to load.", "x-circle");
    stopScriptureAudio();
  });

  scriptureAudio.play().catch(e => {
    console.error("Failed to auto-play scripture audio", e);
  });
}

function pauseScriptureAudio() {
  if (!scriptureAudio) return;
  scriptureAudio.pause();

  const mainBtn = document.getElementById('btn-play-scripture');
  if (mainBtn) {
    mainBtn.innerHTML = '<i class="ph ph-play"></i>';
    mainBtn.setAttribute('title', 'Resume Chapter Audio');
  }

  const inlinePlayBtn = document.getElementById('scripture-play-btn');
  if (inlinePlayBtn) inlinePlayBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
}

function stopScriptureAudio() {
  if (scriptureAudio) {
    scriptureAudio.pause();
    scriptureAudio = null;
  }

  const player = document.getElementById('scripture-audio-player');
  if (player) player.classList.add('hidden');

  const syncOverlay = document.getElementById('scripture-sync-overlay');
  if (syncOverlay) syncOverlay.classList.add('hidden');
  const syncBtn = document.getElementById('scripture-sync-btn');
  if (syncBtn) syncBtn.classList.remove('active');

  const mainBtn = document.getElementById('btn-play-scripture');
  if (mainBtn) {
    mainBtn.classList.remove('playing');
    mainBtn.innerHTML = '<i class="ph ph-play"></i>';
    mainBtn.setAttribute('title', 'Play Chapter Audio');
  }
}

function toggleScriptureSpeed() {
  if (!scriptureAudio) return;
  
  if (scripturePlaybackSpeed === 1.0) scripturePlaybackSpeed = 1.25;
  else if (scripturePlaybackSpeed === 1.25) scripturePlaybackSpeed = 1.5;
  else if (scripturePlaybackSpeed === 1.5) scripturePlaybackSpeed = 2.0;
  else scripturePlaybackSpeed = 1.0;

  scriptureAudio.playbackRate = scripturePlaybackSpeed;
  const speedBtn = document.getElementById('scripture-speed-btn');
  if (speedBtn) speedBtn.textContent = `${scripturePlaybackSpeed}x`;
}

function toggleScripturePlayPause() {
  if (scriptureAudio) {
    if (scriptureAudio.paused) {
      scriptureAudio.play().catch(e => {
        console.error("Failed to resume scripture audio:", e);
        showToast("Failed to play scripture audio", "x-circle");
      });
      const mainBtn = document.getElementById('btn-play-scripture');
      if (mainBtn) {
        mainBtn.classList.add('playing');
        mainBtn.innerHTML = '<i class="ph ph-pause"></i>';
        mainBtn.setAttribute('title', 'Pause Chapter Audio');
      }
      const inlinePlayBtn = document.getElementById('scripture-play-btn');
      if (inlinePlayBtn) inlinePlayBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
    } else {
      pauseScriptureAudio();
    }
  } else {
    playScriptureAudio(BIBLE_BOOKS[state.currentBookIndex].name, state.currentChapter);
  }
}

function formatAudioTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateScriptureProgress() {
  if (!scriptureAudio) return;
  const seekbar = document.getElementById('scripture-seekbar');
  const currentTimeText = document.getElementById('scripture-current-time');
  
  if (seekbar && scriptureAudio.duration) {
    seekbar.value = (scriptureAudio.currentTime / scriptureAudio.duration) * 100;
  }
  if (currentTimeText) {
    currentTimeText.textContent = formatAudioTime(scriptureAudio.currentTime);
  }
}

function updateScriptureDuration() {
  if (!scriptureAudio) return;
  const durationText = document.getElementById('scripture-duration');
  if (durationText && scriptureAudio.duration) {
    durationText.textContent = formatAudioTime(scriptureAudio.duration);
  }
}

function updateActiveVerseHighlight() {
  if (!scriptureAudio || isNaN(scriptureAudio.duration) || totalVerseLength === 0 || currentVerseWeights.length === 0) return;
  
  const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
  const introOffset = getIntroOffset(bookName, state.currentChapter);
  const outroOffset = 2.0; // seconds
  const duration = scriptureAudio.duration;
  const currentTime = scriptureAudio.currentTime;
  
  let progress = 0;
  if (duration > (introOffset + outroOffset)) {
    if (currentTime > introOffset) {
      progress = (currentTime - introOffset) / (duration - introOffset - outroOffset);
      progress = Math.min(1.0, Math.max(0.0, progress));
    }
  } else {
    progress = currentTime / duration;
  }
  
  const estimatedCharPos = progress * totalVerseLength;
  const activeVerseObj = currentVerseWeights.find(w => w.cumulativeLength >= estimatedCharPos);
  
  if (activeVerseObj) {
    highlightVerse(activeVerseObj.verse);
  }
}

function highlightVerse(verseNum) {
  const verses = document.querySelectorAll('.verse');
  verses.forEach(el => {
    if (parseInt(el.getAttribute('data-verse')) === parseInt(verseNum)) {
      if (!el.classList.contains('active-reading')) {
        el.classList.add('active-reading');
        // Smooth scroll to active verse
        if (!isScriptureSeeking) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    } else {
      el.classList.remove('active-reading');
    }
  });
}

function seekToVerse(verseNum) {
  if (!scriptureAudio || isNaN(scriptureAudio.duration) || totalVerseLength === 0 || currentVerseWeights.length === 0) return;
  
  const index = currentVerseWeights.findIndex(w => parseInt(w.verse) === parseInt(verseNum));
  if (index === -1) return;
  
  const startLength = index > 0 ? currentVerseWeights[index - 1].cumulativeLength : 0;
  const startRatio = startLength / totalVerseLength;
  
  if (!isNaN(startRatio) && isFinite(startRatio)) {
    const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
    const introOffset = getIntroOffset(bookName, state.currentChapter);
    const outroOffset = 2.0; // seconds
    const duration = scriptureAudio.duration;
    
    let targetTime = 0;
    if (duration > (introOffset + outroOffset)) {
      targetTime = introOffset + startRatio * (duration - introOffset - outroOffset);
    } else {
      targetTime = startRatio * duration;
    }
    
    if (!isNaN(targetTime) && isFinite(targetTime)) {
      scriptureAudio.currentTime = targetTime;
      updateScriptureProgress();
      highlightVerse(verseNum);
    }
  }
}

// 6. Scripture Loader (local KJV integration & bible-api.com fallback)
let activeChapterText = "";
let isChapterReadCompleted = false;

let localBiblePromise = null;
let localBibleData = null;

async function loadLocalBibleData() {
  if (localBibleData) return localBibleData;
  if (!localBiblePromise) {
    localBiblePromise = fetch('kjv.json')
      .then(res => {
        if (!res.ok) throw new Error("Failed to load local KJV Bible data");
        return res.json();
      })
      .then(data => {
        localBibleData = data;
        return data;
      })
      .catch(err => {
        localBiblePromise = null; // Reset promise so we can retry on next call
        throw err;
      });
  }
  return localBiblePromise;
}

function cleanScriptureText(text) {
  if (!text) return "";
  // 1. Remove translation/marginal notes (e.g. {firmament: Heb. expansion} or {moving: or, creeping})
  let cleaned = text.replace(/\{[^}]+:[^}]+\}/g, "");
  // 2. Remove braces around translator-inserted words (e.g. {was} becomes was)
  cleaned = cleaned.replace(/\{([^}]+)\}/g, "$1");
  // 3. Clean up double spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

async function fetchBibleText(book, chapter, translation) {
  const cacheKey = `${translation}_${book}_${chapter}`.toLowerCase();
  if (scriptureCache[cacheKey]) {
    const cachedData = scriptureCache[cacheKey];
    // Check if the cached entries still contain raw braces, if so, clean them on the fly
    if (cachedData.verses && cachedData.verses.length > 0 && cachedData.verses.some(v => v.text.includes('{') || v.text.includes('}'))) {
      cachedData.verses = cachedData.verses.map(v => ({
        verse: v.verse,
        text: cleanScriptureText(v.text)
      }));
      cachedData.text = cachedData.verses.map(v => v.text).join(' ');
      scriptureCache[cacheKey] = cachedData;
      try {
        localStorage.setItem(SCRIPTURE_CACHE_KEY, JSON.stringify(scriptureCache));
      } catch (e) {
        console.warn("Failed to update healed scripture cache entry in localStorage:", e);
      }
    }
    return cachedData;
  }

  // Load from local KJV JSON file first for instant and 100% offline access
  if (translation.toLowerCase() === 'kjv') {
    try {
      const localData = await loadLocalBibleData();
      if (localData) {
        const bookIndex = BIBLE_BOOKS.findIndex(b => b.name.toLowerCase() === book.toLowerCase());
        if (bookIndex !== -1 && localData[bookIndex]) {
          const bookData = localData[bookIndex];
          const chapterIndex = chapter - 1;
          if (bookData.chapters && bookData.chapters[chapterIndex]) {
            const verses = bookData.chapters[chapterIndex].map((text, idx) => ({
              verse: idx + 1,
              text: cleanScriptureText(text)
            }));
            const fullText = verses.map(v => v.text).join(' ');
            const result = {
              reference: `${book} ${chapter}`,
              verses: verses,
              text: fullText,
              translation_id: "kjv",
              translation_name: "King James Version",
              translation_note: "Public Domain"
            };

            // Save to cache
            scriptureCache[cacheKey] = result;
            pruneScriptureCache();
            try {
              localStorage.setItem(SCRIPTURE_CACHE_KEY, JSON.stringify(scriptureCache));
            } catch (e) {
              if (e.name === 'QuotaExceededError' || e.code === 22) {
                scriptureCache = {};
                scriptureCache[cacheKey] = result;
                try {
                  localStorage.setItem(SCRIPTURE_CACHE_KEY, JSON.stringify(scriptureCache));
                } catch (innerErr) {
                  console.error("Failed to save scripture cache even after clearing:", innerErr);
                }
              }
            }
            return result;
          }
        }
      }
    } catch (localErr) {
      console.warn("Failed to load local KJV scripture, falling back to network api...", localErr);
    }
  }

  // Setup standard book name formatting for API
  const formattedBook = encodeURIComponent(book);
  const url = `https://bible-api.com/${formattedBook}+${chapter}?translation=${translation}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    
    // Clean network API data
    if (data.verses) {
      data.verses = data.verses.map(v => ({
        verse: v.verse,
        text: cleanScriptureText(v.text)
      }));
      data.text = data.verses.map(v => v.text).join(' ');
    }

    // Save to cache
    scriptureCache[cacheKey] = data;
    pruneScriptureCache();
    try {
      localStorage.setItem(SCRIPTURE_CACHE_KEY, JSON.stringify(scriptureCache));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        scriptureCache = {};
        scriptureCache[cacheKey] = data;
        try {
          localStorage.setItem(SCRIPTURE_CACHE_KEY, JSON.stringify(scriptureCache));
        } catch (innerErr) {
          console.error("Failed to save scripture cache even after clearing:", innerErr);
        }
      }
    }
    
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("Error fetching Bible text", err);
    throw err;
  }
}

// Pre-fetch the next chapter in the background to make the reading flow instant
function prefetchNextChapter() {
  const currentBook = BIBLE_BOOKS[state.currentBookIndex];
  let nextBookIndex = state.currentBookIndex;
  let nextChapter = state.currentChapter + 1;

  if (nextChapter > currentBook.chapters) {
    nextBookIndex = state.currentBookIndex + 1;
    nextChapter = 1;
  }

  // Check if we haven't reached the end of the Bible (Revelation 22)
  if (nextBookIndex < BIBLE_BOOKS.length) {
    const nextBookName = BIBLE_BOOKS[nextBookIndex].name;
    // Prefetch in background without blocking
    fetchBibleText(nextBookName, nextChapter, state.translation).catch(err => {
      console.warn("Failed to prefetch next chapter:", err);
    });
  }
}

async function loadActiveChapter() {
  stopScriptureAudio();
  const container = document.getElementById('scripture-container');
  if (!container) return;

  const scriptureCard = document.querySelector('.scripture-card');
  const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
  const chapter = state.currentChapter;
  
  // Update Book Title and Chapter metadata
  const bookTitleEl = document.getElementById('reader-book-title');
  if (bookTitleEl) bookTitleEl.textContent = bookName;

  const chapterNumEl = document.getElementById('reader-chapter-num');
  if (chapterNumEl) chapterNumEl.textContent = `Chapter ${chapter}`;
  
  // Reset completed button state
  const completeBtn = document.getElementById('complete-chapter-btn');
  if (completeBtn) {
    completeBtn.classList.add('disabled');
    completeBtn.disabled = true;
    const btnSpan = completeBtn.querySelector('span');
    if (btnSpan) btnSpan.textContent = 'Complete & Take Quiz';
  }
  isChapterReadCompleted = false;

  // If in Physical Bible Mode, show companion screen card instead
  if (state.isPhysicalMode) {
    if (scriptureCard) scriptureCard.classList.add('physical-mode');
    container.innerHTML = `
      <div class="physical-bible-content">
        <div class="physical-icon-wrapper">
          <i class="ph-fill ph-book-bookmark"></i>
        </div>
        <h3>Physical Bible Mode</h3>
        <p>Please open your physical copy of God's Word to</p>
        <p class="highlight-ref">${bookName} Chapter ${chapter}</p>
        <p class="desc-text">Read carefully and reflect on the text. Tap the button below when you are finished to take your daily quiz.</p>
      </div>
    `;
    
    if (completeBtn) {
      completeBtn.classList.remove('disabled');
      completeBtn.disabled = false;
      const btnSpan = completeBtn.querySelector('span');
      if (btnSpan) btnSpan.textContent = 'Finished Reading - Take Quiz';
    }
    isChapterReadCompleted = true;
    return;
  }

  if (scriptureCard) scriptureCard.classList.remove('physical-mode');

  // Show Skeleton Loader
  container.innerHTML = `
    <div class="skeleton-loader">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  `;

  try {
    const data = await fetchBibleText(bookName, chapter, state.translation);
    
    // Check if offline fallback returned an error
    if (data.error) {
      container.innerHTML = `<p class="error-message">${data.text}</p>`;
      return;
    }

    // Render Scripture Text
    let htmlContent = `
      <div class="expanded-reference-header">
        <span>${bookName} ${chapter}</span>
        <button class="fullscreen-close-btn icon-btn small" title="Exit Fullscreen"><i class="ph ph-x"></i></button>
      </div>
    `;
    htmlContent += `<div class="bible-text ${state.fontFamily === 'sans' ? 'sans-serif' : ''}" style="font-size: ${state.fontSize}%">`;
    
    if (data.verses && data.verses.length > 0) {
      currentVerseWeights = [];
      let totalLength = 0;
      data.verses.forEach(v => {
        totalLength += v.text.length;
        currentVerseWeights.push({
          verse: v.verse,
          cumulativeLength: totalLength
        });
        htmlContent += `<div class="verse" id="verse-${v.verse}" data-verse="${v.verse}"><span class="verse-num">${v.verse}.</span> <span class="verse-text">${v.text.trim()}</span></div>`;
      });
      totalVerseLength = totalLength;
    } else {
      currentVerseWeights = [];
      totalVerseLength = 0;
      // Fallback in case raw text only
      htmlContent += `<p>${data.text}</p>`;
    }
    htmlContent += `</div>`;
    
    container.innerHTML = htmlContent;
    activeChapterText = data.text;

    // Render related sermons
    await renderRelatedSermons(bookName, chapter);

    // Trigger pre-fetch of next chapter in background
    prefetchNextChapter();

    // Enable complete button after a brief timeout (simulating reading check or scroll check)
    // Here we listen to scroll triggers or let the user click after 2 seconds
    setTimeout(() => {
      completeBtn.classList.remove('disabled');
      completeBtn.disabled = false;
      isChapterReadCompleted = true;
    }, 1500);

    // Scroll reader card to top
    container.scrollTop = 0;

  } catch (err) {
    container.innerHTML = `
      <div class="error-box">
        <i class="ph ph-wifi-high-slash" style="font-size: 2rem; color: var(--color-danger)"></i>
        <h3>Unable to load scripture</h3>
        <p>Please check your connection and try again.</p>
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 8px; text-align: center; font-family: monospace;">Details: ${err.message || err}</p>
        <button id="retry-load-btn" class="btn-primary" style="margin-top: 12px; font-size: 0.85rem; padding: 8px 16px;">
          Retry
        </button>
      </div>
    `;
    
    const retryBtn = document.getElementById('retry-load-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', loadActiveChapter);
    }
  }
}

// 7. Dynamic Quiz Generation Engine
let activeQuizQuestions = [];
let currentQuizQuestionIndex = 0;
let userQuizScore = 0;
let selectedOptionIndex = null;

function generateQuizForChapter(book, chapter) {
  const key = `${book}-${chapter}`;
  
  // If custom hand-coded quiz exists, use it
  if (CUSTOM_QUIZZES[key]) {
    return CUSTOM_QUIZZES[key];
  }
  
  // Otherwise, dynamically generate highly applicable reflection questions
  return [
    {
      question: `What main theme stands out in ${book} ${chapter} regarding God's character?`,
      options: [
        "His enduring faithfulness, guidance, and sovereignty over history.",
        "A distant posture that leaves humans completely to their own choices.",
        "A changing nature that varies with human circumstances.",
        "Unpredictable reactions that make it impossible to trust His covenants."
      ],
      answer: 0,
      explanation: `Scripture is a consistent testimony of God's unchanging faithfulness and sovereignty in all situations, guiding His covenant people.`
    },
    {
      question: `In light of this chapter, how are we encouraged to practice our discipleship daily?`,
      options: [
        "By focusing on self-sufficiency and independent plans.",
        "By trusting His promises, walking in active obedience, and multiplying disciples in fellowship.",
        "By following external rituals without any genuine change in heart.",
        "By relying strictly on personal feelings and modern societal trends."
      ],
      answer: 1,
      explanation: `Discipleship involves active trust, community fellowship, and sharing God's love to multiply disciples, glorifying Jesus Christ.`
    },
    {
      question: `How should a believer respond to the truths presented in ${book} ${chapter}?`,
      options: [
        "Disregard them as historical details irrelevant to modern life.",
        "Apply them through prayer, alignment of daily actions, and sharing the message with others.",
        "Keep them private and never discuss them within our community.",
        "Seek only personal wealth or worldly approval using this text."
      ],
      answer: 1,
      explanation: `God's Word is active and living. Disciples are called to hear, reflect, pray, and apply scripture, living it out in their community.`
    }
  ];
}

function startQuiz() {
  const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
  const chapter = state.currentChapter;
  
  activeQuizQuestions = generateQuizForChapter(bookName, chapter);
  currentQuizQuestionIndex = 0;
  userQuizScore = 0;
  
  document.getElementById('quiz-chapter-title').textContent = `${bookName} ${chapter} Reflection`;
  
  navigateTo('quiz');
  loadQuizQuestion();
}

function loadQuizQuestion() {
  const q = activeQuizQuestions[currentQuizQuestionIndex];
  selectedOptionIndex = null;
  
  // Hide details
  document.getElementById('quiz-explanation').classList.add('hidden');
  document.getElementById('next-quiz-btn').classList.add('hidden');
  document.getElementById('finish-quiz-btn').classList.add('hidden');
  
  // Render question html
  const container = document.getElementById('quiz-question-container');
  
  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="quiz-option-btn" data-index="${idx}">
        <span>${opt}</span>
        <span class="quiz-option-indicator">${String.fromCharCode(65 + idx)}</span>
      </button>
    `;
  });
  
  container.innerHTML = `
    <span class="quiz-progress-text">Question ${currentQuizQuestionIndex + 1} of ${activeQuizQuestions.length}</span>
    <h3 style="margin-top: 8px;">${q.question}</h3>
    <div class="quiz-options">
      ${optionsHtml}
    </div>
  `;
  
  // Add Event Listeners for options
  const optionBtns = container.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'));
      selectOption(idx);
    });
  });
}

function selectOption(index) {
  if (selectedOptionIndex !== null) return; // Answer already validated
  
  selectedOptionIndex = index;
  const q = activeQuizQuestions[currentQuizQuestionIndex];
  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  
  optionBtns.forEach((btn, idx) => {
    btn.disabled = true; // Lock choice
    
    if (idx === q.answer) {
      btn.classList.add('correct');
    } else if (idx === index) {
      btn.classList.add('wrong');
    }
  });
  
  // Update score
  if (index === q.answer) {
    userQuizScore++;
    showToast("Correct! Excellent reflection.", "check-circle");
  } else {
    showToast("Not quite. Take a look at the note.", "x-circle");
  }
  
  // Show explanation note
  document.getElementById('explanation-content').textContent = q.explanation;
  document.getElementById('quiz-explanation').classList.remove('hidden');
  
  // Show navigation actions
  if (currentQuizQuestionIndex < activeQuizQuestions.length - 1) {
    document.getElementById('next-quiz-btn').classList.remove('hidden');
  } else {
    document.getElementById('finish-quiz-btn').classList.remove('hidden');
  }
}

function completeQuiz() {
  const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
  const chapter = state.currentChapter;
  
  // 1. Mark chapter completed in state
  if (!state.completedChapters[bookName]) {
    state.completedChapters[bookName] = [];
  }
  if (!state.completedChapters[bookName].includes(chapter)) {
    state.completedChapters[bookName].push(chapter);
  }
  
  // 2. Update Streak
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (state.lastReadDate === yesterday) {
    state.streak++;
  } else if (state.lastReadDate !== today) {
    state.streak = 1; // reset streak or start new if broken
  }
  state.lastReadDate = today;
  
  // 3. Save Score
  state.scores.push({
    date: today,
    book: bookName,
    chapter: chapter,
    score: `${userQuizScore}/${activeQuizQuestions.length}`
  });
  
  // 4. Progress sequentially to next chapter
  progressToNextChapter();
  
  // 5. Save state and notify user
  saveState();
  showToast(`Reflection Complete! Streak: ${state.streak} Days`, "sparkle");
  
  // 6. Redirect to Stats Dashboard
  navigateTo('stats');
}

function progressToNextChapter() {
  const activeBook = BIBLE_BOOKS[state.currentBookIndex];
  
  if (state.currentChapter < activeBook.chapters) {
    state.currentChapter++;
  } else {
    // Progress to next book
    if (state.currentBookIndex < BIBLE_BOOKS.length - 1) {
      state.currentBookIndex++;
      state.currentChapter = 1;
    } else {
      // Completed the entire Bible!
      showToast("Hallelujah! You have read the entire Bible!", "star");
      state.currentBookIndex = 0;
      state.currentChapter = 1;
    }
  }
}

// 8. Stats, Streaks & Books Grid Rendering
function calculateTotalCompletedChapters() {
  let count = 0;
  for (const book in state.completedChapters) {
    count += state.completedChapters[book].length;
  }
  return count;
}

function renderStats() {
  const completedCount = calculateTotalCompletedChapters();
  const totalPercentage = Math.round((completedCount / TOTAL_BIBLE_CHAPTERS) * 100);
  
  // Update numerical metrics
  document.getElementById('streak-number').textContent = state.streak;
  document.getElementById('chapters-read-count').textContent = completedCount;
  document.getElementById('progress-percentage').textContent = `${totalPercentage}%`;
  
  // Update progress radial gauge
  const fill = document.getElementById('progress-radial-fill');
  fill.setAttribute('stroke-dasharray', `${totalPercentage}, 100`);
  
  // Render Books Grid
  renderBooksGrid();
}

let activeTestamentFilter = "OT"; // OT or NT

function renderBooksGrid() {
  const grid = document.getElementById('books-grid');
  grid.innerHTML = '';
  
  BIBLE_BOOKS.forEach((book, idx) => {
    if (book.testament !== activeTestamentFilter) return;
    
    // Check book completion state
    const completedList = state.completedChapters[book.name] || [];
    const isCompleted = completedList.length === book.chapters;
    const isStarted = completedList.length > 0;
    
    let completionClass = '';
    if (isCompleted) {
      completionClass = 'completed';
    } else if (isStarted) {
      completionClass = 'started';
    }
    
    const bookPill = document.createElement('div');
    bookPill.className = `book-pill ${completionClass}`;
    
    const countCompleted = completedList.length;
    bookPill.innerHTML = `
      <span class="book-name">${book.name}</span>
      <span class="book-progress-tag" style="display:block; font-size:0.55rem; opacity:0.75; font-weight:normal;">
        ${countCompleted}/${book.chapters}
      </span>
    `;
    
    bookPill.addEventListener('click', () => {
      showBookChaptersDialog(idx);
    });
    
    grid.appendChild(bookPill);
  });
}

// Modal/Dialog to pick chapters inside a book
function showBookChaptersDialog(bookIndex) {
  showPassageSelectorDialog(bookIndex);
}

// Unified Passage Selector Dialog (handles Book list and Chapter grids)
function showPassageSelectorDialog(initialBookIndex) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay-dialog';
  
  // State for the dialog
  let currentView = initialBookIndex !== undefined ? 'chapters' : 'books';
  let selectedBookIndex = initialBookIndex !== undefined ? initialBookIndex : state.currentBookIndex;
  let activeTestament = BIBLE_BOOKS[selectedBookIndex].testament;
  
  const renderDialogContent = () => {
    const innerCore = overlay.querySelector('.inner-core');
    if (!innerCore) return;
    
    if (currentView === 'books') {
      // Render book list view
      let booksHtml = '';
      BIBLE_BOOKS.forEach((book, idx) => {
        if (book.testament !== activeTestament) return;
        const completedList = state.completedChapters[book.name] || [];
        const isCompleted = completedList.length === book.chapters;
        const isStarted = completedList.length > 0;
        const isCurrent = state.currentBookIndex === idx;
        
        let statusClass = '';
        if (isCurrent) statusClass = 'current';
        else if (isCompleted) statusClass = 'completed';
        else if (isStarted) statusClass = 'started';
        
        booksHtml += `
          <button class="dialog-book-pill ${statusClass}" data-index="${idx}">
            <span class="book-name">${book.name}</span>
            <span class="book-progress-tag">${completedList.length}/${book.chapters}</span>
          </button>
        `;
      });
      
      innerCore.innerHTML = `
        <div class="dialog-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <h3 class="dialog-title" style="font-family:'Lora',serif; font-size:1.3rem; color:var(--color-accent);">Select Passage</h3>
          <button id="close-dialog-btn" class="icon-btn small"><i class="ph ph-x"></i></button>
        </div>
        
        <div class="dialog-testament-selector" style="display:flex; gap:8px; margin-bottom:16px;">
          <button id="btn-dialog-ot" class="filter-chip ${activeTestament === 'OT' ? 'active' : ''}" style="flex:1;">Old Testament</button>
          <button id="btn-dialog-nt" class="filter-chip ${activeTestament === 'NT' ? 'active' : ''}" style="flex:1;">New Testament</button>
        </div>
        
        <div class="dialog-books-grid">
          ${booksHtml}
        </div>
      `;
      
      // Event listeners for book selection
      innerCore.querySelectorAll('.dialog-book-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          selectedBookIndex = parseInt(pill.getAttribute('data-index'));
          currentView = 'chapters';
          renderDialogContent();
        });
      });
      
      // Close button
      innerCore.querySelector('#close-dialog-btn').addEventListener('click', () => overlay.remove());
      
      // Testament toggles
      innerCore.querySelector('#btn-dialog-ot').addEventListener('click', () => {
        activeTestament = 'OT';
        renderDialogContent();
      });
      innerCore.querySelector('#btn-dialog-nt').addEventListener('click', () => {
        activeTestament = 'NT';
        renderDialogContent();
      });
      
    } else {
      // Render chapter list view
      const book = BIBLE_BOOKS[selectedBookIndex];
      const completedList = state.completedChapters[book.name] || [];
      
      let chaptersHtml = '';
      for (let c = 1; c <= book.chapters; c++) {
        const isRead = completedList.includes(c);
        const isCurrent = state.currentBookIndex === selectedBookIndex && state.currentChapter === c;
        
        chaptersHtml += `
          <button class="chapter-select-btn ${isRead ? 'read' : ''} ${isCurrent ? 'current' : ''}" data-chapter="${c}">
            ${c}
          </button>
        `;
      }
      
      innerCore.innerHTML = `
        <div class="dialog-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <button id="back-to-books-btn" class="text-btn" style="background:none; border:none; color:var(--color-accent); font-weight:600; cursor:pointer; display:flex; align-items:center; gap:4px; font-family:inherit; font-size:0.95rem;">
            <i class="ph ph-caret-left"></i> Books
          </button>
          <h3 class="dialog-title" style="font-family:'Lora',serif; font-size:1.2rem; color:var(--color-accent);">${book.name}</h3>
          <button id="close-dialog-btn" class="icon-btn small"><i class="ph ph-x"></i></button>
        </div>
        
        <div class="chapters-grid">
          ${chaptersHtml}
        </div>
        
        <p style="font-size:0.75rem; color:var(--text-secondary); text-align:center; margin-top:16px;">
          Select a chapter to start reading.
        </p>
      `;
      
      // Back button
      innerCore.querySelector('#back-to-books-btn').addEventListener('click', () => {
        currentView = 'books';
        renderDialogContent();
      });
      
      // Close button
      innerCore.querySelector('#close-dialog-btn').addEventListener('click', () => overlay.remove());
      
      // Chapter selection
      innerCore.querySelectorAll('.chapter-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const chNum = parseInt(btn.getAttribute('data-chapter'));
          state.currentBookIndex = selectedBookIndex;
          state.currentChapter = chNum;
          saveState();
          
          overlay.remove();
          loadActiveChapter();
          navigateTo('reader');
          showToast(`Active Chapter set to ${book.name} ${chNum}`, "book-open");
        });
      });
    }
  };
  
  overlay.innerHTML = `
    <div class="dialog-content double-bezel" style="max-width: 440px; margin: 0 auto;">
      <div class="inner-core">
        <!-- Injected dynamically -->
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  renderDialogContent();
  
  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// 9. Settings Preference Management
function updateSettingsForm() {
  document.getElementById('toggle-notifications').checked = state.notificationsEnabled;
  document.getElementById('reminder-time').value = state.notificationTime;
  
  const reminderGroup = document.getElementById('reminder-time-group');
  if (state.notificationsEnabled) {
    reminderGroup.classList.remove('hidden');
  } else {
    reminderGroup.classList.add('hidden');
  }
}

// ==========================================================================
// CLOUD PROGRESS SYNC HELPER FUNCTIONS
// ==========================================================================

let isSyncing = false;

function handleAuthChange(user) {
  state.user = user;
  
  const syncTitle = document.getElementById('sync-title');
  const syncStatus = document.getElementById('sync-status');
  const authTriggerBtn = document.getElementById('auth-trigger-btn');
  
  if (user) {
    // User is signed in
    if (syncTitle) syncTitle.textContent = "Cloud Sync Profile";
    if (syncStatus) syncStatus.textContent = `Signed in as: ${user.email}`;
    if (authTriggerBtn) {
      const span = authTriggerBtn.querySelector('span');
      if (span) span.textContent = "Sign Out";
    }
    
    // Perform cloud sync merge
    syncProgressWithCloud();
  } else {
    // User is signed out
    if (syncTitle) syncTitle.textContent = "Cloud Sync";
    if (syncStatus) syncStatus.textContent = "Sign in to save and sync progress across devices.";
    if (authTriggerBtn) {
      const span = authTriggerBtn.querySelector('span');
      if (span) span.textContent = "Sign In";
    }
  }
}

async function syncProgressWithCloud() {
  if (!state.user || !window.HopeFirebase || isSyncing) return;
  
  isSyncing = true;
  showToast("Syncing progress with cloud...", "cloud-arrow-down");
  
  try {
    const docSnap = await window.HopeFirebase.getProgress(state.user.uid);
    if (docSnap && typeof docSnap.exists === 'function' && docSnap.exists()) {
      const cloudData = docSnap.data();
      if (cloudData) {
        // Merge Completed Chapters
        const mergedCompleted = { ...state.completedChapters };
        let hasChaptersDiff = false;
        
        if (cloudData.completedChapters) {
          for (const book in cloudData.completedChapters) {
            if (!mergedCompleted[book]) {
              mergedCompleted[book] = [];
            }
            const localList = mergedCompleted[book];
            const cloudList = cloudData.completedChapters[book] || [];
            
            cloudList.forEach(ch => {
              if (!localList.includes(ch)) {
                localList.push(ch);
                hasChaptersDiff = true;
              }
            });
          }
        }
        
        // Merge Sermon Notes
        const mergedNotes = { ...sermonNotes };
        let hasNotesDiff = false;
        if (cloudData.sermonNotes) {
          for (const sermonId in cloudData.sermonNotes) {
            if (!mergedNotes[sermonId]) {
              mergedNotes[sermonId] = cloudData.sermonNotes[sermonId];
              hasNotesDiff = true;
            } else if (mergedNotes[sermonId] !== cloudData.sermonNotes[sermonId]) {
              // Simple resolution: keep the longer note
              const localNote = mergedNotes[sermonId];
              const cloudNote = cloudData.sermonNotes[sermonId];
              if (cloudNote.length > localNote.length) {
                mergedNotes[sermonId] = cloudNote;
                hasNotesDiff = true;
              }
            }
          }
        }
        
        // Compare Streaks
        const cloudStreak = cloudData.streak || 0;
        let hasStreakDiff = false;
        let newStreak = state.streak;
        let newLastReadDate = state.lastReadDate;
        
        if (cloudStreak > state.streak) {
          newStreak = cloudStreak;
          newLastReadDate = cloudData.lastReadDate || state.lastReadDate;
          hasStreakDiff = true;
        }
        
        // Compare current active chapter / reading path
        let hasActivePathDiff = false;
        let newBookIndex = state.currentBookIndex;
        let newChapter = state.currentChapter;
        
        if (cloudData.currentBookIndex !== undefined && cloudData.currentChapter !== undefined) {
          const cloudTotalProgress = (cloudData.currentBookIndex * 150) + cloudData.currentChapter;
          const localTotalProgress = (state.currentBookIndex * 150) + state.currentChapter;
          if (cloudTotalProgress > localTotalProgress) {
            newBookIndex = cloudData.currentBookIndex;
            newChapter = cloudData.currentChapter;
            hasActivePathDiff = true;
          }
        }
        
        // Merge quiz scores
        const mergedScores = [...state.scores];
        let hasScoresDiff = false;
        if (cloudData.scores && Array.isArray(cloudData.scores)) {
          cloudData.scores.forEach(cloudScore => {
            const exists = mergedScores.some(localScore => 
              localScore.date === cloudScore.date && 
              localScore.book === cloudScore.book && 
              localScore.chapter === cloudScore.chapter
            );
            if (!exists) {
              mergedScores.push(cloudScore);
              hasScoresDiff = true;
            }
          });
        }
        
        // If anything changed, update local state
        const stateChanged = hasChaptersDiff || hasStreakDiff || hasActivePathDiff || hasScoresDiff;
        
        if (stateChanged || hasNotesDiff) {
          state.completedChapters = mergedCompleted;
          state.streak = newStreak;
          state.lastReadDate = newLastReadDate;
          state.currentBookIndex = newBookIndex;
          state.currentChapter = newChapter;
          state.scores = mergedScores;
          
          if (hasNotesDiff) {
            sermonNotes = mergedNotes;
            saveSermonNotes();
          }
          
          // Save and refresh UI
          saveState();
          
          const activeScreen = document.querySelector('.screen.active');
          if (activeScreen && activeScreen.id === 'screen-reader') {
            loadActiveChapter();
          } else if (activeScreen && activeScreen.id === 'screen-stats') {
            renderStats();
          }
        }
      }
    }
    
    // Write back local state to cloud to make sure cloud is fully merged as well
    const payload = { ...state };
    delete payload.user;
    payload.sermonNotes = sermonNotes;
    await window.HopeFirebase.saveProgress(state.user.uid, payload);
    
    showToast("Progress synced successfully!", "cloud-check");
  } catch (err) {
    console.error("Cloud sync failed:", err);
    let errorMsg = "Sync failed. Check connection.";
    if (err && err.message) {
      if (err.message.includes("permission-denied") || err.message.includes("insufficient permissions")) {
        errorMsg = "Sync failed: Insufficient permissions. Check your Firestore Database Rules.";
      } else {
        errorMsg = `Sync failed: ${err.message}`;
      }
    }
    showToast(errorMsg, "wifi-high-slash");
  } finally {
    isSyncing = false;
  }
}

// ==========================================================================
// SERMON INTEGRATION CORE FUNCTIONS
// ==========================================================================

function loadSermonNotes() {
  const saved = localStorage.getItem('hope_sermon_notes');
  if (saved) {
    try {
      sermonNotes = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse sermon notes", e);
      sermonNotes = {};
    }
  } else {
    sermonNotes = {};
  }
}

function saveSermonNotes() {
  localStorage.setItem('hope_sermon_notes', JSON.stringify(sermonNotes));
}

async function loadSermonsLibrary() {
  const listContainer = document.getElementById('sermon-list');
  if (!listContainer) return;

  if (sermons.length === 0) {
    listContainer.innerHTML = `
      <div class="skeleton-loader">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    `;
    try {
      const response = await fetch('sermons.json');
      sermons = await response.json();
      renderSpeakerFilters();
    } catch (e) {
      console.error("Error loading sermons library", e);
      listContainer.innerHTML = `
        <p class="error-message">Failed to load sermons. Please check your connection.</p>
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 8px; text-align: center; font-family: monospace;">Details: ${e.message || e}</p>
      `;
      return;
    }
  }
  renderSermonsList();
}

function renderSpeakerFilters() {
  const container = document.getElementById('sermon-speaker-chips');
  if (!container) return;
  
  const speakers = ["All"];
  sermons.forEach(s => {
    if (s.speaker && !speakers.includes(s.speaker)) {
      speakers.push(s.speaker);
    }
  });
  
  container.innerHTML = speakers.map(sp => {
    const isActive = sp === activeSpeakerFilter;
    return `<button class="filter-chip ${isActive ? 'active' : ''}" data-speaker="${sp}">${sp}</button>`;
  }).join('');
  
  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeSpeakerFilter = chip.getAttribute('data-speaker');
      renderSermonsList();
    });
  });
}

function renderSermonsList() {
  const container = document.getElementById('sermon-list');
  if (!container) return;
  
  const filtered = sermons.filter(s => {
    const matchesSpeaker = activeSpeakerFilter === "All" || s.speaker === activeSpeakerFilter;
    const titleLower = (s.title || "").toLowerCase();
    const scriptureLower = (s.scripture || "").toLowerCase();
    const matchesQuery = !sermonSearchQuery || 
                         titleLower.includes(sermonSearchQuery) || 
                         scriptureLower.includes(sermonSearchQuery);
    return matchesSpeaker && matchesQuery;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-secondary); margin-top: 24px;">No sermons found.</p>`;
    return;
  }
  
  container.innerHTML = filtered.map(s => {
    const formattedDate = s.date ? formatDate(s.date) : "";
    const scriptureHTML = s.scripture ? `<span class="sermon-card-scripture"><i class="ph ph-book-open"></i> ${s.scripture}</span>` : '<span></span>';
    return `
      <div class="sermon-card" data-id="${s.id}">
        <div class="sermon-card-meta">
          <span class="sermon-card-speaker">${s.speaker || "Unknown Speaker"}</span>
          <span>${formattedDate}</span>
        </div>
        <h3 class="sermon-card-title">${s.title || "Untitled Message"}</h3>
        <div class="sermon-card-footer">
          ${scriptureHTML}
          <span class="sermon-card-duration"><i class="ph ph-clock"></i> ${s.duration || "0:00"}</span>
        </div>
        <button class="sermon-card-play-btn icon-btn small" title="Play Sermon">
          <i class="ph ph-play"></i>
        </button>
      </div>
    `;
  }).join('');
  
  container.querySelectorAll('.sermon-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const sermonObj = sermons.find(s => s.id === id);
      if (sermonObj) {
        playSermon(sermonObj);
      }
    });
  });
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateStr;
  }
}

function playSermon(sermonObj) {
  if (playingSermon && playingSermon.id === sermonObj.id) {
    maximizePlayer();
    return;
  }
  
  if (currentAudio) {
    currentAudio.pause();
  }
  
  playingSermon = sermonObj;
  
  const noteTextarea = document.getElementById('player-notes-textarea');
  if (noteTextarea) {
    noteTextarea.value = sermonNotes[sermonObj.id] || "";
  }
  
  currentAudio = new Audio(sermonObj.audioUrl);
  currentAudio.playbackRate = currentPlaybackSpeed;
  
  const playerContainer = document.getElementById('persistent-player');
  playerContainer.classList.remove('hidden');
  document.body.classList.add('has-player');
  
  document.getElementById('mini-player-title').textContent = sermonObj.title;
  document.getElementById('mini-player-speaker').textContent = sermonObj.speaker || "Hope Baptist Church";
  
  document.getElementById('player-title').textContent = sermonObj.title;
  document.getElementById('player-speaker').textContent = sermonObj.speaker || "Hope Baptist Church";
  document.getElementById('player-scripture').textContent = sermonObj.scripture || "";
  
  renderSermonStudyGuide(sermonObj);
  
  currentAudio.addEventListener('play', () => {
    updatePlaybackUI();
  });
  
  currentAudio.addEventListener('pause', () => {
    updatePlaybackUI();
  });
  
  currentAudio.addEventListener('timeupdate', () => {
    if (!isSeeking) {
      updateTimeline();
    }
  });
  
  currentAudio.addEventListener('durationchange', () => {
    updateTimeline();
  });
  
  currentAudio.addEventListener('ended', () => {
    currentAudio.currentTime = 0;
    updatePlaybackUI();
    showToast("Sermon finished.", "check-circle");
  });
  
  currentAudio.addEventListener('error', (e) => {
    console.error("Audio playback error", e);
    showToast("Unable to play audio stream.", "x-circle");
  });
  
  currentAudio.play().catch(e => {
    console.error("Failed to auto-play audio", e);
  });
  
  updatePlaybackUI();
  maximizePlayer();
}

function renderSermonStudyGuide(sermonObj) {
  const outlineList = document.getElementById('player-outline-list');
  const questionsList = document.getElementById('player-questions-list');
  
  if (outlineList) {
    if (sermonObj.outline && sermonObj.outline.length > 0) {
      outlineList.innerHTML = sermonObj.outline.map(item => `<li>${item}</li>`).join('');
    } else {
      outlineList.innerHTML = `<li>No outline available for this sermon.</li>`;
    }
  }
  
  if (questionsList) {
    if (sermonObj.questions && sermonObj.questions.length > 0) {
      questionsList.innerHTML = sermonObj.questions.map(q => `
        <div class="note-guide-box">
          <p>${q}</p>
        </div>
      `).join('');
    } else {
      questionsList.innerHTML = `
        <div class="note-guide-box">
          <p>No custom reflection questions. Use this message for personal reflection.</p>
        </div>
      `;
    }
  }
}

function updateTimeline() {
  const seekbar = document.getElementById('player-seekbar');
  const currentTimeText = document.getElementById('player-current-time');
  const durationText = document.getElementById('player-duration');
  
  if (!currentAudio) return;
  
  const current = currentAudio.currentTime;
  const duration = currentAudio.duration || 0;
  
  if (seekbar && !isNaN(duration) && duration > 0) {
    seekbar.value = (current / duration) * 100;
  }
  
  if (currentTimeText) {
    currentTimeText.textContent = formatTime(current);
  }
  
  if (durationText && !isNaN(duration) && duration > 0) {
    durationText.textContent = formatTime(duration);
  } else if (durationText && playingSermon) {
    durationText.textContent = playingSermon.duration || "0:00";
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  const paddedS = s < 10 ? `0${s}` : s;
  
  if (h > 0) {
    const paddedM = m < 10 ? `0${m}` : m;
    return `${h}:${paddedM}:${paddedS}`;
  } else {
    return `${m}:${paddedS}`;
  }
}

function togglePlayPause() {
  if (!currentAudio) return;
  if (currentAudio.paused) {
    currentAudio.play().catch(e => console.error("Play failed", e));
  } else {
    currentAudio.pause();
  }
  updatePlaybackUI();
}

function updatePlaybackUI() {
  const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');
  const playerPlayPauseBtn = document.getElementById('player-play-pause-btn');
  
  if (!currentAudio) return;
  
  const isPlaying = !currentAudio.paused;
  
  if (miniPlayPauseBtn) {
    miniPlayPauseBtn.innerHTML = isPlaying ? '<i class="ph ph-pause"></i>' : '<i class="ph ph-play"></i>';
  }
  
  if (playerPlayPauseBtn) {
    playerPlayPauseBtn.innerHTML = isPlaying ? '<i class="ph-fill ph-pause"></i>' : '<i class="ph-fill ph-play"></i>';
  }
}

function togglePlaybackSpeed() {
  let currentIndex = PLAYBACK_SPEEDS.indexOf(currentPlaybackSpeed);
  let nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
  currentPlaybackSpeed = PLAYBACK_SPEEDS[nextIndex];
  
  if (currentAudio) {
    currentAudio.playbackRate = currentPlaybackSpeed;
  }
  
  const speedBtn = document.getElementById('player-speed-btn');
  if (speedBtn) {
    speedBtn.textContent = `${currentPlaybackSpeed}x`;
  }
}

function maximizePlayer() {
  const expanded = document.getElementById('expanded-player');
  if (expanded) {
    expanded.classList.remove('hidden');
    document.getElementById('mini-player').classList.add('hidden');
  }
}

function minimizePlayer() {
  const expanded = document.getElementById('expanded-player');
  if (expanded) {
    expanded.classList.add('hidden');
    document.getElementById('mini-player').classList.remove('hidden');
  }
}

function stopAndClosePlayer() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  playingSermon = null;
  document.getElementById('persistent-player').classList.add('hidden');
  document.body.classList.remove('has-player');
}

function saveCurrentSermonNotes() {
  if (!playingSermon) return;
  const noteTextarea = document.getElementById('player-notes-textarea');
  if (noteTextarea) {
    sermonNotes[playingSermon.id] = noteTextarea.value;
    saveSermonNotes();
    showToast("Notes saved successfully", "check-circle");
  }
}

function setupPlayerTabs() {
  const tabButtons = document.querySelectorAll('.player-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.querySelectorAll('.player-tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      
      const targetPanel = document.getElementById(`panel-${tabName}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

async function renderRelatedSermons(bookName, chapter) {
  if (sermons.length === 0) {
    try {
      const response = await fetch('sermons.json');
      sermons = await response.json();
    } catch (e) {
      console.error("Failed to load sermons for related section", e);
      return;
    }
  }
  
  const matches = sermons.filter(s => {
    return s.mappedBook === bookName && s.mappedChapter === parseInt(chapter);
  });
  
  const container = document.getElementById('scripture-container');
  if (!container) return;
  
  const existing = container.querySelector('.related-sermons-container');
  if (existing) {
    existing.remove();
  }
  
  if (matches.length === 0) return;
  
  const relatedDiv = document.createElement('div');
  relatedDiv.className = 'related-sermons-container';
  
  const cardsHtml = matches.map(s => `
    <div class="related-sermon-card" data-id="${s.id}">
      <div class="related-sermon-info">
        <span class="related-title">${s.title}</span>
        <span class="related-meta">${s.speaker} &bull; ${s.duration}</span>
      </div>
      <button class="icon-btn small" title="Play Sermon"><i class="ph ph-play"></i></button>
    </div>
  `).join('');
  
  relatedDiv.innerHTML = `
    <div class="related-sermons-title">
      <i class="ph ph-microphone"></i>
      <span>Related Sermons</span>
    </div>
    <div class="related-sermons-list">
      ${cardsHtml}
    </div>
  `;
  
  container.appendChild(relatedDiv);
  
  relatedDiv.querySelectorAll('.related-sermon-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const sermonObj = sermons.find(s => s.id === id);
      if (sermonObj) {
        playSermon(sermonObj);
      }
    });
  });
}

// 9.5 YouTube Stream & Livestream Integration
let youtubeVideos = [];
const YOUTUBE_CACHE_KEY = 'hope_youtube_cache';
const YOUTUBE_LIVE_CACHE_KEY = 'hope_youtube_live';

// Helper to fetch content through multiple public CORS proxies concurrently
async function fetchWithFallbackProxies(targetUrl) {
  const now = new Date().getTime();
  const cacheBuster = `&v=${now}`;
  
  const proxyAttempts = [];

  // If fetching an RSS/Atom XML feed, attempt rss2json converter first (very fast & reliable)
  if (targetUrl.includes('feeds/videos.xml') || targetUrl.includes('.xml')) {
    proxyAttempts.push({
      name: 'RSS2JSON API',
      url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetUrl)}`,
      parse: async (res) => {
        const text = await res.text();
        if (!text || !text.includes('"status":"ok"')) throw new Error("Invalid rss2json response");
        return text;
      }
    });
  }

  // Add standard CORS proxies
  proxyAttempts.push(
    // 1. AllOrigins JSON wrapper
    {
      name: 'AllOrigins JSON',
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}${cacheBuster}`,
      parse: async (res) => {
        const json = await res.json();
        if (!json.contents) throw new Error("Empty AllOrigins content");
        return json.contents;
      }
    },
    // 2. CodeTabs proxy (returns raw text directly)
    {
      name: 'CodeTabs Proxy',
      url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
      parse: async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty CodeTabs content");
        return text;
      }
    }
  );

  const fetchWithTimeout = async (proxy, timeoutMs = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      console.log(`Attempting fetch via ${proxy.name}: ${proxy.url.substring(0, 80)}...`);
      const res = await fetch(proxy.url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const content = await proxy.parse(res);
      clearTimeout(id);
      console.log(`Successfully fetched using proxy: ${proxy.name}`);
      return content;
    } catch (err) {
      clearTimeout(id);
      console.warn(`Proxy ${proxy.name} failed:`, err);
      throw err;
    }
  };

  try {
    // Race all proxies! The first one to resolve successfully wins.
    const content = await Promise.any(proxyAttempts.map(p => fetchWithTimeout(p)));
    return content;
  } catch (aggregateError) {
    console.error("All proxies failed to fetch:", aggregateError);
    throw new Error("All proxies failed to fetch");
  }
}

async function loadYouTubeStreams() {
  const gridContainer = document.getElementById('youtube-video-grid');
  if (!gridContainer) return;

  // Try to load from localStorage cache first for instant speed
  const cachedData = localStorage.getItem(YOUTUBE_CACHE_KEY);
  const cacheTime = localStorage.getItem(YOUTUBE_CACHE_KEY + '_time');
  const now = new Date().getTime();

  if (cachedData && cacheTime && (now - parseInt(cacheTime) < 1000 * 60 * 15)) {
    try {
      youtubeVideos = JSON.parse(cachedData);
      renderYouTubeStreams();
      // Check live status in background
      checkYouTubeLiveStatus();
      return;
    } catch (e) {
      console.warn("Failed to parse cached YouTube videos, fetching fresh...", e);
    }
  }

  // Show Skeleton Loader if no cached data
  if (youtubeVideos.length === 0) {
    gridContainer.innerHTML = `
      <div class="skeleton-loader">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    `;
  }

  try {
    const channelId = "UCnmL_D_pcY9o_pud_EFCApQ";
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    const rawContent = await fetchWithFallbackProxies(feedUrl);

    let parsedVideos = [];

    // Detect JSON response (e.g. from rss2json)
    if (rawContent.trim().startsWith('{')) {
      const data = JSON.parse(rawContent);
      if (data.status === 'ok' && data.items) {
        parsedVideos = data.items.map(item => {
          let videoId = "";
          if (item.guid && item.guid.includes('yt:video:')) {
            videoId = item.guid.split(':').pop();
          } else if (item.link) {
            const match = item.link.match(/[?&]v=([^&#]+)/);
            if (match) videoId = match[1];
          }
          
          return {
            title: item.title || "Untitled video",
            videoId: videoId,
            publishedDate: item.pubDate ? new Date(item.pubDate.replace(/-/g, '/')).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : ""
          };
        }).filter(v => v.videoId);
      }
    } else {
      // Parse as XML Atom feed
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rawContent, "text/xml");
      const entries = xmlDoc.getElementsByTagName("entry");

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const title = entry.getElementsByTagName("title")[0]?.textContent || "Untitled video";
        const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent || "";
        const published = entry.getElementsByTagName("published")[0]?.textContent || "";
        
        if (videoId) {
          parsedVideos.push({
            title,
            videoId,
            publishedDate: published ? new Date(published).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : ""
          });
        }
      }
    }

    if (parsedVideos.length > 0) {
      youtubeVideos = parsedVideos;
      localStorage.setItem(YOUTUBE_CACHE_KEY, JSON.stringify(youtubeVideos));
      localStorage.setItem(YOUTUBE_CACHE_KEY + '_time', now.toString());
      renderYouTubeStreams();
    } else {
      throw new Error("No videos found in feed");
    }
  } catch (err) {
    console.error("Error fetching YouTube feed", err);
    // If offline or proxy fails, try to load any stale cache
    if (cachedData) {
      try {
        youtubeVideos = JSON.parse(cachedData);
        renderYouTubeStreams();
      } catch (e) {}
    } else {
      gridContainer.innerHTML = `
        <div class="error-box">
          <i class="ph ph-wifi-high-slash" style="font-size: 2rem; color: var(--color-danger)"></i>
          <h3>Failed to load streams</h3>
          <p>Please check your connection and try again.</p>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 8px; font-family: monospace;">Details: ${err.message || err} (App v25.2)</p>
        </div>
      `;
    }
  }

  // Check live status
  checkYouTubeLiveStatus();
}

function renderYouTubeStreams() {
  const gridContainer = document.getElementById('youtube-video-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = youtubeVideos.map(video => `
    <div class="youtube-video-card" data-id="${video.videoId}">
      <div class="youtube-video-thumbnail">
        <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg" alt="${video.title}" loading="lazy">
        <div class="play-overlay">
          <div class="play-btn-circle">
            <i class="ph-fill ph-play"></i>
          </div>
        </div>
      </div>
      <div class="youtube-video-info">
        <h3 class="youtube-video-title">${video.title}</h3>
        <span class="youtube-video-date">
          <i class="ph ph-calendar-blank"></i>
          ${video.publishedDate}
        </span>
      </div>
    </div>
  `).join('');

  gridContainer.querySelectorAll('.youtube-video-card').forEach(card => {
    const playBtn = card.querySelector('.play-btn-circle');
    const overlay = card.querySelector('.play-overlay');

    const triggerPlay = (e) => {
      e.stopPropagation();
      const videoId = card.getAttribute('data-id');
      const title = card.querySelector('.youtube-video-title').textContent;
      openVideoPlayer(videoId, title);
    };

    card.addEventListener('click', triggerPlay);
    if (playBtn) playBtn.addEventListener('click', triggerPlay);
    if (overlay) overlay.addEventListener('click', triggerPlay);
  });
}

async function checkYouTubeLiveStatus() {
  const liveBanner = document.getElementById('youtube-live-banner');
  if (!liveBanner) return;

  const now = new Date().getTime();
  const cachedLive = localStorage.getItem(YOUTUBE_LIVE_CACHE_KEY);
  const cacheLiveTime = localStorage.getItem(YOUTUBE_LIVE_CACHE_KEY + '_time');

  // Check live status cache (expires in 5 minutes)
  if (cachedLive && cacheLiveTime && (now - parseInt(cacheLiveTime) < 1000 * 60 * 5)) {
    try {
      const data = JSON.parse(cachedLive);
      if (data.isLive && data.videoId) {
        showLiveBanner(data.videoId, data.title);
      } else {
        liveBanner.classList.add('hidden');
      }
      return;
    } catch (e) {}
  }

  try {
    const liveUrl = 'https://www.youtube.com/@HopeBaptistToledo/live';
    const html = await fetchWithFallbackProxies(liveUrl);
    
    // Check if the stream is actually live. YouTube puts "isLive":true in the player JSON when live.
    const isLive = html.includes('"isLive":true') || (html.includes('/live/') && !html.includes('LIVE_STREAM_OFFLINE'));
    
    let liveVideoId = "";
    let liveTitle = "Sunday Service Live Stream";

    if (isLive) {
      // Extract video ID from canonical link or json metadata
      const watchMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
      const canonicalMatch = html.match(/<link rel="canonical" href="https:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})"/);
      
      if (watchMatch) {
        liveVideoId = watchMatch[1];
      } else if (canonicalMatch) {
        liveVideoId = canonicalMatch[1];
      }

      // Extract title of the live stream if possible
      const titleMatch = html.match(/"title":{"runs":\[{"text":"([^"]+)"/);
      if (titleMatch) {
        liveTitle = titleMatch[1];
      }
    }

    if (isLive && liveVideoId) {
      const liveData = { isLive: true, videoId: liveVideoId, title: liveTitle };
      localStorage.setItem(YOUTUBE_LIVE_CACHE_KEY, JSON.stringify(liveData));
      localStorage.setItem(YOUTUBE_LIVE_CACHE_KEY + '_time', now.toString());
      showLiveBanner(liveVideoId, liveTitle);
    } else {
      const liveData = { isLive: false, videoId: null, title: "" };
      localStorage.setItem(YOUTUBE_LIVE_CACHE_KEY, JSON.stringify(liveData));
      localStorage.setItem(YOUTUBE_LIVE_CACHE_KEY + '_time', now.toString());
      liveBanner.classList.add('hidden');
    }
  } catch (err) {
    console.warn("Failed to check live status:", err);
  }
}

function showLiveBanner(videoId, title) {
  const liveBanner = document.getElementById('youtube-live-banner');
  if (!liveBanner) return;

  liveBanner.innerHTML = `
    <div class="live-badge">
      <span class="live-dot"></span> Live
    </div>
    <div class="live-info-wrapper">
      <div class="live-channel-name">Hope Baptist Toledo</div>
      <h3 class="live-title">${title}</h3>
    </div>
    <div class="live-watch-btn" title="Watch Live Stream">
      <i class="ph ph-play"></i>
    </div>
  `;
  liveBanner.classList.remove('hidden');

  // Remove old event listener by cloning node
  const newBanner = liveBanner.cloneNode(true);
  liveBanner.parentNode.replaceChild(newBanner, liveBanner);

  newBanner.addEventListener('click', () => {
    openVideoPlayer(videoId, title);
  });
}

function openVideoPlayer(videoId, title) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('youtube-player-iframe');
  const modalTitle = document.getElementById('video-modal-title');

  if (!modal || !iframe) return;

  modalTitle.textContent = title;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  modal.classList.remove('hidden');
  document.body.classList.add('reader-expanded');
}

function closeVideoPlayer() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('youtube-player-iframe');

  if (!modal || !iframe) return;

  iframe.src = "";
  modal.classList.add('hidden');
  document.body.classList.remove('reader-expanded');
}

// 10. Core Setup & Global Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load State
  loadState();
  loadSermonNotes();

  // Scroll tracking for distraction-free reader mode
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (currentScreen !== 'reader') {
      lastScrollTop = scrollTop;
      return;
    }
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      document.body.classList.add('distraction-free');
    } else if (scrollTop < lastScrollTop - 12) {
      document.body.classList.remove('distraction-free');
    }
    lastScrollTop = scrollTop;
  }, { passive: true });

  // Fullscreen reader toggle via dedicated button
  const fullscreenBtn = document.getElementById('btn-fullscreen-reader');
  const scriptureCard = document.querySelector('.scripture-card');
  
  if (fullscreenBtn && scriptureCard) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Only expand if it's not physical mode
      if (state.isPhysicalMode) return;
      
      scriptureCard.classList.add('expanded');
      document.body.classList.add('reader-expanded', 'distraction-free');
    });
  }

  // Collapse reader when clicking the close button or expanded card background, and expand it when clicked in collapsed state
  if (scriptureCard) {
    scriptureCard.addEventListener('click', (e) => {
      // Ignore click on links, other buttons (except the close button), related sermons, or customizer elements
      const isCloseBtn = e.target.closest('.fullscreen-close-btn');
      if ((e.target.closest('button') && !isCloseBtn) || e.target.closest('a') || e.target.closest('.reader-customizer') || e.target.closest('.related-sermon-card')) {
        return;
      }
      
      // Ignore click if user is selecting text
      const selection = window.getSelection().toString();
      if (selection.length > 0) return;

      const isExpanded = scriptureCard.classList.contains('expanded');
      if (isExpanded) {
        const closeBtn = e.target.closest('.fullscreen-close-btn');
        const isCardClick = e.target.classList.contains('inner-core') || e.target.classList.contains('scripture-card') || e.target.closest('.expanded-reference-header');
        
        // Only collapse if clicked close button or the card background/header itself
        if (!closeBtn && !isCardClick) {
          return; // Don't collapse if clicking the text verses (to allow selecting/reading)
        }

        // Collapse card
        scriptureCard.classList.remove('expanded');
        scriptureCard.classList.add('collapsing');
        document.body.classList.remove('reader-expanded', 'distraction-free');
        setTimeout(() => {
          scriptureCard.classList.remove('collapsing');
        }, 300);
      } else {
        // Only expand if it's not physical mode
        if (state.isPhysicalMode) return;

        // Expand card
        scriptureCard.classList.add('expanded');
        document.body.classList.add('reader-expanded', 'distraction-free');
      }
    });
  }

  // Handle dark mode setup from saved state
  if (state.theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('toggle-theme-btn').innerHTML = '<i class="ph ph-sun"></i>';
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('toggle-theme-btn').innerHTML = '<i class="ph ph-moon"></i>';
  }

  // Handle navigation screen routes
  if (state.onboarded) {
    navigateTo('reader');
  } else {
    navigateTo('onboarding');
  }

  // ONBOARDING LISTENERS
  document.getElementById('start-journey-btn').addEventListener('click', () => {
    state.translation = 'kjv';
    state.onboarded = true;
    saveState();
    
    navigateTo('reader');
    showToast("Welcome! Enjoy your daily scripture study.", "sparkle");
  });

  // THEME SWITCHER
  document.getElementById('toggle-theme-btn').addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const themeBtn = document.getElementById('toggle-theme-btn');
    
    if (activeTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      state.theme = 'light';
      themeBtn.innerHTML = '<i class="ph ph-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      state.theme = 'dark';
      themeBtn.innerHTML = '<i class="ph ph-sun"></i>';
    }
    saveState();
  });

  // READER CUSTOMIZER LISTENERS
  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    if (state.fontSize < 160) {
      state.fontSize += 10;
      saveState();
      const textEl = document.querySelector('.bible-text');
      if (textEl) textEl.style.fontSize = `${state.fontSize}%`;
    }
  });

  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    if (state.fontSize > 80) {
      state.fontSize -= 10;
      saveState();
      const textEl = document.querySelector('.bible-text');
      if (textEl) textEl.style.fontSize = `${state.fontSize}%`;
    }
  });

  // PINCH-TO-ZOOM GESTURE FOR FONT RESIZING
  let initialTouchDist = 0;
  let initialFontSize = 100;
  let isPinching = false;

  const scriptureContainer = document.getElementById('scripture-container');
  if (scriptureContainer) {
    scriptureContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault(); // Stop default browser page zoom
        isPinching = true;
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialFontSize = state.fontSize;
      }
    }, { passive: false });

    scriptureContainer.addEventListener('touchmove', (e) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault(); // Stop default browser page zoom
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        if (initialTouchDist > 0) {
          const factor = currentDist / initialTouchDist;
          // Dynamically scale font size between 60% and 220%
          let newFontSize = Math.round(initialFontSize * factor);
          newFontSize = Math.max(60, Math.min(220, newFontSize));
          
          state.fontSize = newFontSize;
          const textEl = document.querySelector('.bible-text');
          if (textEl) {
            textEl.style.fontSize = `${state.fontSize}%`;
          }
        }
      }
    }, { passive: false });

    scriptureContainer.addEventListener('touchend', (e) => {
      if (isPinching && e.touches.length < 2) {
        isPinching = false;
        initialTouchDist = 0;
        saveState();
      }
    });

    scriptureContainer.addEventListener('click', (e) => {
      const verseEl = e.target.closest('.verse');
      if (verseEl && scriptureAudio && !isNaN(scriptureAudio.duration)) {
        e.stopPropagation();
        // Check if user is selecting text - if so, don't seek
        const selection = window.getSelection().toString();
        if (selection.length > 0) return;

        const verseNum = parseInt(verseEl.getAttribute('data-verse'));
        if (verseNum) {
          seekToVerse(verseNum);
        }
      }
    });
  }

  document.getElementById('btn-font-family').addEventListener('click', () => {
    state.fontFamily = state.fontFamily === 'serif' ? 'sans' : 'serif';
    saveState();
    
    const textEl = document.querySelector('.bible-text');
    if (textEl) {
      if (state.fontFamily === 'sans') {
        textEl.classList.add('sans-serif');
      } else {
        textEl.classList.remove('sans-serif');
      }
    }
    showToast(`Font switched to ${state.fontFamily === 'serif' ? 'Serif' : 'Sans-Serif'}`, "text-aa");
  });

  // PHYSICAL BIBLE MODE TOGGLE
  const physicalBtn = document.getElementById('btn-physical-bible');
  
  function updatePhysicalBtnUI() {
    if (!physicalBtn) return;
    if (state.isPhysicalMode) {
      physicalBtn.classList.add('active');
      physicalBtn.setAttribute('title', 'Switch to Web Scripture text');
      const icon = physicalBtn.querySelector('i');
      if (icon) icon.className = 'ph-fill ph-book-open';
    } else {
      physicalBtn.classList.remove('active');
      physicalBtn.setAttribute('title', 'Read from Physical Bible');
      const icon = physicalBtn.querySelector('i');
      if (icon) icon.className = 'ph ph-book-open';
    }
  }
  
  if (physicalBtn) {
    updatePhysicalBtnUI();
    physicalBtn.addEventListener('click', () => {
      state.isPhysicalMode = !state.isPhysicalMode;
      saveState();
      updatePhysicalBtnUI();
      loadActiveChapter(); // Re-render reader view
    });
  }

  // PASSAGE SELECTOR TRIGGER ON READER HEADER
  const chapterInfoEl = document.getElementById('current-chapter-info');
  if (chapterInfoEl) {
    chapterInfoEl.addEventListener('click', () => {
      showPassageSelectorDialog();
    });
  }

  // COMPLETE CHAPTER TRIGGER
  document.getElementById('complete-chapter-btn').addEventListener('click', () => {
    if (isChapterReadCompleted) {
      startQuiz();
    }
  });

  // QUIZ CONTROL LISTENERS
  document.getElementById('next-quiz-btn').addEventListener('click', () => {
    currentQuizQuestionIndex++;
    loadQuizQuestion();
  });

  document.getElementById('finish-quiz-btn').addEventListener('click', () => {
    completeQuiz();
  });

  // BOTTOM NAVIGATION CLICK ROUTING
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const scr = tab.getAttribute('data-screen');
      navigateTo(scr);
    });
  });

  // STATS FILTER TRIGGERS
  document.getElementById('btn-filter-ot').addEventListener('click', (e) => {
    document.getElementById('btn-filter-ot').classList.add('active');
    document.getElementById('btn-filter-nt').classList.remove('active');
    activeTestamentFilter = "OT";
    renderBooksGrid();
  });

  document.getElementById('btn-filter-nt').addEventListener('click', (e) => {
    document.getElementById('btn-filter-nt').classList.add('active');
    document.getElementById('btn-filter-ot').classList.remove('active');
    activeTestamentFilter = "NT";
    renderBooksGrid();
  });

  // SETTINGS FORM TRIGGERS
  document.getElementById('toggle-notifications').addEventListener('change', (e) => {
    state.notificationsEnabled = e.target.checked;
    saveState();
    
    // Request permission from browser
    if (state.notificationsEnabled && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showToast("Daily reminders enabled!", "bell");
        } else {
          showToast("Permission denied for notifications", "bell-slash");
          document.getElementById('toggle-notifications').checked = false;
          state.notificationsEnabled = false;
          saveState();
        }
        updateSettingsForm();
      });
    } else {
      showToast("Daily reminders disabled", "bell-slash");
      updateSettingsForm();
    }
  });

  document.getElementById('reminder-time').addEventListener('change', (e) => {
    state.notificationTime = e.target.value;
    saveState();
    showToast(`Reminder time set to ${state.notificationTime}`, "clock");
  });

  // RESET DATABASE TRIGGER
  document.getElementById('reset-progress-btn').addEventListener('click', () => {
    if (confirm("Are you absolutely sure you want to delete all reading progress and streaks? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('hope_sermon_notes');
      sermonNotes = {};
      state = {
        translation: 'kjv',
        fontFamily: 'serif',
        fontSize: 100,
        currentBookIndex: 0,
        currentChapter: 1,
        completedChapters: {},
        streak: 0,
        lastReadDate: null,
        scores: [],
        notificationsEnabled: false,
        notificationTime: "08:00",
        onboarded: false,
        theme: 'light',
        isPhysicalMode: false
      };
      
      // Update UI theme
      document.documentElement.removeAttribute('data-theme');
      document.getElementById('toggle-theme-btn').innerHTML = '<i class="ph ph-moon"></i>';
      
      saveState();
      navigateTo('onboarding');
      showToast("App database reset successfully", "trash");
    }
  });

  // SERMON EVENT LISTENERS
  const searchInput = document.getElementById('sermon-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      sermonSearchQuery = e.target.value.toLowerCase().trim();
      renderSermonsList();
    });
  }

  // YouTube Tab Switching
  const tabAudio = document.getElementById('sermon-tab-audio');
  const tabVideo = document.getElementById('sermon-tab-video');
  const viewAudio = document.getElementById('sermons-audio-view');
  const viewVideo = document.getElementById('sermons-video-view');

  if (tabAudio && tabVideo && viewAudio && viewVideo) {
    tabAudio.addEventListener('click', () => {
      tabAudio.classList.add('active');
      tabVideo.classList.remove('active');
      viewAudio.classList.remove('hidden');
      viewVideo.classList.add('hidden');
    });

    tabVideo.addEventListener('click', () => {
      tabVideo.classList.add('active');
      tabAudio.classList.remove('active');
      viewVideo.classList.remove('hidden');
      viewAudio.classList.add('hidden');
      loadYouTubeStreams();
    });
  }

  // Close Video Player Modal
  const closeVideoBtn = document.getElementById('close-video-modal-btn');
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', closeVideoPlayer);
  }

  const videoModal = document.getElementById('video-modal');
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (!e.target.closest('.video-modal-card')) {
        closeVideoPlayer();
      }
    });
  }

  const miniPlayer = document.getElementById('mini-player');
  if (miniPlayer) {
    miniPlayer.addEventListener('click', (e) => {
      maximizePlayer();
    });
  }

  const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');
  if (miniPlayPauseBtn) {
    miniPlayPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlayPause();
    });
  }

  const miniMaxBtn = document.getElementById('mini-maximize-btn');
  if (miniMaxBtn) {
    miniMaxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      maximizePlayer();
    });
  }

  const playerMinBtn = document.getElementById('player-minimize-btn');
  if (playerMinBtn) {
    playerMinBtn.addEventListener('click', () => {
      minimizePlayer();
    });
  }

  const playerCloseBtn = document.getElementById('player-close-btn');
  if (playerCloseBtn) {
    playerCloseBtn.addEventListener('click', () => {
      stopAndClosePlayer();
    });
  }

  const playerPlayPauseBtn = document.getElementById('player-play-pause-btn');
  if (playerPlayPauseBtn) {
    playerPlayPauseBtn.addEventListener('click', () => {
      togglePlayPause();
    });
  }

  const playerStopBtn = document.getElementById('player-stop-btn');
  if (playerStopBtn) {
    playerStopBtn.addEventListener('click', () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      updatePlaybackUI();
      updateTimeline();
    });
  }

  const seekbar = document.getElementById('player-seekbar');
  if (seekbar) {
    seekbar.addEventListener('input', (e) => {
      isSeeking = true;
      if (currentAudio && currentAudio.duration) {
        const targetTime = (e.target.value / 100) * currentAudio.duration;
        document.getElementById('player-current-time').textContent = formatTime(targetTime);
      }
    });
    
    seekbar.addEventListener('change', (e) => {
      if (currentAudio && currentAudio.duration) {
        currentAudio.currentTime = (e.target.value / 100) * currentAudio.duration;
      }
      isSeeking = false;
    });
  }

  const speedBtn = document.getElementById('player-speed-btn');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      togglePlaybackSpeed();
    });
  }

  const saveNotesBtn = document.getElementById('player-save-notes-btn');
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', () => {
      saveCurrentSermonNotes();
    });
  }

  // SCRIPTURE AUDIO LISTENERS
  const btnPlayScripture = document.getElementById('btn-play-scripture');
  if (btnPlayScripture) {
    btnPlayScripture.addEventListener('click', toggleScripturePlayPause);
  }

  const scripturePlayBtn = document.getElementById('scripture-play-btn');
  if (scripturePlayBtn) {
    scripturePlayBtn.addEventListener('click', toggleScripturePlayPause);
  }

  const scriptureSpeedBtn = document.getElementById('scripture-speed-btn');
  if (scriptureSpeedBtn) {
    scriptureSpeedBtn.addEventListener('click', toggleScriptureSpeed);
  }

  const scriptureCloseBtn = document.getElementById('scripture-close-btn');
  if (scriptureCloseBtn) {
    scriptureCloseBtn.addEventListener('click', stopScriptureAudio);
  }

  // Scripture Highlight Sync Adjustment Listeners
  const scriptureSyncBtn = document.getElementById('scripture-sync-btn');
  const scriptureSyncOverlay = document.getElementById('scripture-sync-overlay');
  
  if (scriptureSyncBtn && scriptureSyncOverlay) {
    scriptureSyncBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = scriptureSyncBtn.classList.toggle('active');
      if (isActive) {
        scriptureSyncOverlay.classList.remove('hidden');
        updateSyncOffsetUI();
      } else {
        scriptureSyncOverlay.classList.add('hidden');
      }
    });
    
    // Prevent closing the overlay when clicking inside it
    scriptureSyncOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Also, close the overlay when clicking outside
    document.addEventListener('click', () => {
      if (scriptureSyncOverlay) scriptureSyncOverlay.classList.add('hidden');
      if (scriptureSyncBtn) scriptureSyncBtn.classList.remove('active');
    });
  }
  
  const syncMinusBtn = document.getElementById('sync-minus-btn');
  if (syncMinusBtn) {
    syncMinusBtn.addEventListener('click', () => {
      scriptureSyncOffset -= 0.5;
      localStorage.setItem('hope_scripture_sync_offset', scriptureSyncOffset);
      updateSyncOffsetUI();
      updateActiveVerseHighlight();
    });
  }
  
  const syncPlusBtn = document.getElementById('sync-plus-btn');
  if (syncPlusBtn) {
    syncPlusBtn.addEventListener('click', () => {
      scriptureSyncOffset += 0.5;
      localStorage.setItem('hope_scripture_sync_offset', scriptureSyncOffset);
      updateSyncOffsetUI();
      updateActiveVerseHighlight();
    });
  }
  
  const syncResetBtn = document.getElementById('sync-reset-btn');
  if (syncResetBtn) {
    syncResetBtn.addEventListener('click', () => {
      scriptureSyncOffset = 0.0;
      localStorage.setItem('hope_scripture_sync_offset', scriptureSyncOffset);
      updateSyncOffsetUI();
      updateActiveVerseHighlight();
    });
  }

  const scriptureSeekbar = document.getElementById('scripture-seekbar');
  if (scriptureSeekbar) {
    scriptureSeekbar.addEventListener('input', (e) => {
      isScriptureSeeking = true;
      if (scriptureAudio && scriptureAudio.duration) {
        const targetTime = (e.target.value / 100) * scriptureAudio.duration;
        const currentTimeText = document.getElementById('scripture-current-time');
        if (currentTimeText) currentTimeText.textContent = formatAudioTime(targetTime);
      }
    });

    scriptureSeekbar.addEventListener('change', (e) => {
      if (scriptureAudio && scriptureAudio.duration) {
        scriptureAudio.currentTime = (e.target.value / 100) * scriptureAudio.duration;
      }
      isScriptureSeeking = false;
    });
  }

  setupPlayerTabs();

  // PWA SERVICE WORKER REGISTRATION
  if ('serviceWorker' in navigator) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Unregister any active service worker during local development to prevent preview caching issues
      navigator.serviceWorker.getRegistrations().then(registrations => {
        let unregisteredAny = false;
        for (let registration of registrations) {
          registration.unregister();
          unregisteredAny = true;
        }
        if (unregisteredAny) {
          console.log('Active Service Worker unregistered for localhost development.');
          // Clear caches so the browser gets fresh assets
          if ('caches' in window) {
            caches.keys().then(names => {
              for (let name of names) {
                caches.delete(name);
              }
            });
          }
          // Force page reload to clear intermediate state and load fresh assets
          window.location.reload();
        }
      });
    } else {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registered successfully', reg.scope))
        .catch(err => console.error('Service Worker registration failed', err));
    }
  }

  // ==========================================
  // CLOUD SYNC & AUTHENTICATION EVENT LISTENERS
  // ==========================================
  const authModal = document.getElementById('auth-modal');
  const authTriggerBtn = document.getElementById('auth-trigger-btn');
  const closeAuthModalBtn = document.getElementById('close-auth-modal-btn');
  const tabSigninBtn = document.getElementById('tab-signin-btn');
  const tabSignupBtn = document.getElementById('tab-signup-btn');
  const authForm = document.getElementById('auth-form');
  const googleSigninBtn = document.getElementById('google-signin-btn');
  
  let currentAuthTab = 'signin'; // 'signin' or 'signup'

  if (authTriggerBtn) {
    authTriggerBtn.addEventListener('click', () => {
      if (state.user) {
        if (confirm("Are you sure you want to sign out? Your offline progress will still be saved on this device.")) {
          window.HopeFirebase.signOut().then(() => {
            showToast("Signed out successfully", "sign-out");
          }).catch(err => {
            console.error(err);
            showToast("Failed to sign out", "x-circle");
          });
        }
      } else {
        if (authModal) authModal.classList.remove('hidden');
      }
    });
  }

  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', () => {
      if (authModal) authModal.classList.add('hidden');
    });
  }

  function setAuthTab(tab) {
    currentAuthTab = tab;
    const modalTitle = document.getElementById('auth-modal-title');
    const submitText = document.getElementById('auth-submit-text');
    
    if (tab === 'signin') {
      if (tabSigninBtn) tabSigninBtn.classList.add('active');
      if (tabSignupBtn) tabSignupBtn.classList.remove('active');
      if (modalTitle) modalTitle.textContent = "Sign In";
      if (submitText) submitText.textContent = "Sign In";
    } else {
      if (tabSigninBtn) tabSigninBtn.classList.remove('active');
      if (tabSignupBtn) tabSignupBtn.classList.add('active');
      if (modalTitle) modalTitle.textContent = "Create Account";
      if (submitText) submitText.textContent = "Create Account";
    }
  }

  if (tabSigninBtn) {
    tabSigninBtn.addEventListener('click', () => setAuthTab('signin'));
  }
  if (tabSignupBtn) {
    tabSignupBtn.addEventListener('click', () => setAuthTab('signup'));
  }

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const submitBtn = document.getElementById('auth-submit-btn');
      
      if (!email || !password) return;
      
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Loading...</span> <div class="btn-icon"><i class="ph ph-spinner"></i></div>`;
      
      try {
        if (currentAuthTab === 'signin') {
          await window.HopeFirebase.signIn(email, password);
          showToast("Welcome back!", "check-circle");
        } else {
          await window.HopeFirebase.signUp(email, password);
          showToast("Account created successfully!", "sparkle");
        }
        
        if (authModal) authModal.classList.add('hidden');
        authForm.reset();
      } catch (err) {
        console.error(err);
        showToast(err.message || "Authentication failed", "x-circle");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
    });
  }

  if (googleSigninBtn) {
    googleSigninBtn.addEventListener('click', async () => {
      const originalText = googleSigninBtn.querySelector('span').textContent;
      
      try {
        // Start the Google sign-in synchronously first to preserve the user gesture
        const signInPromise = window.HopeFirebase.signInWithGoogle();
        
        // Update UI/disable button while waiting for the authentication promise
        googleSigninBtn.disabled = true;
        googleSigninBtn.querySelector('span').textContent = "Signing In...";
        
        await signInPromise;
        showToast("Signed in with Google successfully!", "check-circle");
        if (authModal) authModal.classList.add('hidden');
      } catch (err) {
        console.error(err);
        let errorMsg = "Google Sign-In failed";
        let icon = "x-circle";
        
        if (err.code === 'auth/popup-blocked') {
          errorMsg = "Popup blocked by your adblocker. Please allow popups or use Email/Password.";
          icon = "warning";
        } else if (err.code === 'auth/popup-closed-by-user') {
          errorMsg = "Sign-in window closed before completion.";
          icon = "warning";
        } else if (err.code === 'auth/unauthorized-domain') {
          errorMsg = "This domain is not authorized in the Firebase Console.";
          icon = "x-circle";
        } else if (err.message) {
          errorMsg = err.message;
        }
        
        showToast(errorMsg, icon);
      } finally {
        googleSigninBtn.disabled = false;
        googleSigninBtn.querySelector('span').textContent = originalText;
      }
    });
  }

  // Listen to Auth state change from firebase-config
  if (window.HopeFirebase) {
    window.HopeFirebase.onAuthChange(handleAuthChange);
  } else {
    window.addEventListener('firebase-ready', () => {
      if (window.HopeFirebase) {
        window.HopeFirebase.onAuthChange(handleAuthChange);
      }
    });
  }
});

