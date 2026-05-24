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
  theme: 'light'
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


// Local storage key name
const STORAGE_KEY = 'hope_toledo_bible_tracker_state';

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

// Save state to local storage
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// 4. UI Screen Navigation Management
const SCREENS = ['onboarding', 'reader', 'quiz', 'sermons', 'stats', 'settings'];

function navigateTo(screenId) {
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

// 6. Scripture Loader (bible-api.com Integration & Caching)
let activeChapterText = "";
let isChapterReadCompleted = false;

async function fetchBibleText(book, chapter, translation) {
  // Setup standard book name formatting for API
  const formattedBook = encodeURIComponent(book);
  const url = `https://bible-api.com/${formattedBook}+${chapter}?translation=${translation}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching Bible text", err);
    throw err;
  }
}

async function loadActiveChapter() {
  const container = document.getElementById('scripture-container');
  const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
  const chapter = state.currentChapter;
  
  // Update Book Title and Chapter metadata
  document.getElementById('reader-book-title').textContent = bookName;
  document.getElementById('reader-chapter-num').textContent = `Chapter ${chapter}`;
  
  // Reset completed button state
  const completeBtn = document.getElementById('complete-chapter-btn');
  completeBtn.classList.add('disabled');
  completeBtn.disabled = true;
  isChapterReadCompleted = false;

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
    let htmlContent = `<div class="bible-text ${state.fontFamily === 'sans' ? 'sans-serif' : ''}" style="font-size: ${state.fontSize}%">`;
    
    if (data.verses && data.verses.length > 0) {
      data.verses.forEach(v => {
        htmlContent += `<span class="verse"><span class="verse-num">${v.verse}</span>${v.text.trim()} </span>`;
      });
    } else {
      // Fallback in case raw text only
      htmlContent += `<p>${data.text}</p>`;
    }
    htmlContent += `</div>`;
    
    container.innerHTML = htmlContent;
    activeChapterText = data.text;

    // Render related sermons
    await renderRelatedSermons(bookName, chapter);

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
        <button id="retry-load-btn" class="btn-primary" style="margin-top: 12px; font-size: 0.85rem; padding: 8px 16px;">
          Retry
        </button>
      </div>
    `;
    
    document.getElementById('retry-load-btn').addEventListener('click', loadActiveChapter);
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
  const book = BIBLE_BOOKS[bookIndex];
  const completedList = state.completedChapters[book.name] || [];
  
  // Create simple floating dialog overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay-dialog';
  
  let chaptersHtml = '';
  for (let c = 1; c <= book.chapters; c++) {
    const isRead = completedList.includes(c);
    const isCurrent = state.currentBookIndex === bookIndex && state.currentChapter === c;
    
    chaptersHtml += `
      <button class="chapter-select-btn ${isRead ? 'read' : ''} ${isCurrent ? 'current' : ''}" data-chapter="${c}">
        ${c}
      </button>
    `;
  }
  
  overlay.innerHTML = `
    <div class="dialog-content double-bezel" style="max-width: 440px; margin: 80px auto 20px auto;">
      <div class="inner-core">
        <div class="dialog-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <h3 class="dialog-title" style="font-family:'Lora',serif; font-size:1.3rem; color:var(--color-accent);">${book.name} Chapters</h3>
          <button id="close-dialog-btn" class="icon-btn small"><i class="ph ph-x"></i></button>
        </div>
        <div class="chapters-grid" style="display:grid; grid-template-cols:repeat(6,1fr); gap:8px; max-height:300px; overflow-y:auto; padding:4px;">
          ${chaptersHtml}
        </div>
        <p style="font-size:0.75rem; color:var(--text-secondary); text-align:center; margin-top:16px;">
          Tap any chapter to set it as your active reading path.
        </p>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listener to close popup
  document.getElementById('close-dialog-btn').addEventListener('click', () => {
    overlay.remove();
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // Chapter buttons listener
  const chBtns = overlay.querySelectorAll('.chapter-select-btn');
  chBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chNum = parseInt(btn.getAttribute('data-chapter'));
      
      state.currentBookIndex = bookIndex;
      state.currentChapter = chNum;
      saveState();
      
      overlay.remove();
      navigateTo('reader');
      showToast(`Active Chapter set to ${book.name} ${chNum}`, "book-open");
    });
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
      listContainer.innerHTML = `<p class="error-message">Failed to load sermons. Please check your connection.</p>`;
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

// 10. Core Setup & Global Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load State
  loadState();
  loadSermonNotes();

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
      showToast("Theme set to Light mode", "sun");
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      state.theme = 'dark';
      themeBtn.innerHTML = '<i class="ph ph-sun"></i>';
      showToast("Theme set to Dark mode", "moon");
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
        theme: 'light'
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
});

