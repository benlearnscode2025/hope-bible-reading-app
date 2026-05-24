# Immersive Focused Reader & Physical Bible Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a distraction-free focused web reading view and a companion "Physical Bible Mode" to optimize scripture reading.

**Architecture:** 
- Toggling the focused reading view will hide headers, sidebars, and customizer panels dynamically via CSS class changes on scroll/tap.
- Physical Bible Mode will replace the scripture reader view with a centered focus container and a prominent quiz toggle, controlled via State-driven HTML replacements.
- Preference states will persist in local storage.

**Tech Stack:** HTML5, CSS3 (Vanilla), Vanilla JavaScript, Phosphor Icons

---

### Task 1: Add Physical Bible Toggle Button in index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Locate the reader customizer controls**
In `index.html`, locate the `.reader-customizer` container (lines 104-114).

- [ ] **Step 2: Add the Physical Bible button markup**
Insert the new `<button id="btn-physical-bible">` directly inside the `.reader-customizer` container, after the Font Family selector button.

```html
            <button id="btn-font-family" class="icon-btn small" title="Toggle Serif / Sans">
              <i class="ph ph-text-aa"></i>
            </button>
            <button id="btn-physical-bible" class="icon-btn small" title="Toggle Physical Bible Mode">
              <i class="ph ph-book-open"></i>
            </button>
```

- [ ] **Step 3: Manually verify the HTML changes**
Load/open `index.html` in your browser. Ensure the new book icon button is visible next to the Font Family button inside the reader customizer bar.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "style: add physical bible button to reader customizer markup"
```

---

### Task 2: Implement Mobile Spacing and Companion Mode Styling in style.css

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add Distraction-Free visibility rules**
Append transition and transform rules to `style.css` to handle screen fade-away animations when the `distraction-free` class is active on the `body`.

```css
/* Immersive Distraction-Free Reader Mode */
.app-header,
.floating-nav,
.reader-meta-bar {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.4s ease, 
              visibility 0.4s ease;
}

body.distraction-free .app-header {
  transform: translateY(-120%);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

body.distraction-free .floating-nav {
  transform: translate(-50%, 150%) !important;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

body.distraction-free .reader-meta-bar {
  transform: translateY(-10px);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
```

- [ ] **Step 2: Add styles for the Physical Bible Companion Card**
Append the structural styles for `.physical-bible-card` and its elements:

```css
/* Physical Bible Companion View */
.physical-bible-card {
  margin-top: 16px;
  margin-bottom: 24px;
  animation: screenFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.physical-bible-card .inner-core {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  min-height: 240px;
}

.physical-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-accent-light);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 18px;
  box-shadow: 0 4px 12px var(--color-accent-glow);
}

.physical-bible-card h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.physical-bible-card p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  max-width: 320px;
}

.physical-bible-card .highlight-ref {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 1.05rem;
}

.physical-bible-card .desc-text {
  font-size: 0.8rem;
  margin-top: 12px;
  font-style: italic;
  opacity: 0.85;
}
```

- [ ] **Step 3: Make the scripture text flow focused**
Update `.scripture-card` and `.scripture-card .inner-core` so they lose outer card borders when reading. On screen width below `768px`, we style it without double-bezel constraints:

```css
@media (max-width: 768px) {
  .scripture-card {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
  }
  .scripture-card .inner-core {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
    max-height: none !important;
    overflow-y: visible !important;
  }
}
```

- [ ] **Step 4: Verify style loading**
Verify that `style.css` compiles or loads without syntax warnings.

- [ ] **Step 5: Commit**
```bash
git add style.css
git commit -m "style: implement focused reader spacing and physical bible mode card layout"
```

---

### Task 3: Implement Scroll Direction and Background Tap Toggling in app.js

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Add Scroll Tracking to Window**
Add scroll detection inside `DOMContentLoaded` event listener of `app.js` to detect scroll direction and add/remove the `distraction-free` class.

```javascript
  // Scroll hide/show for headers & menus (Distraction-Free)
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    // Only trigger distraction-free in the reader screen
    if (currentScreen !== 'reader') return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      // Scroll Down -> Hide Controls
      document.body.classList.add('distraction-free');
    } else if (scrollTop < lastScrollTop - 12) {
      // Scroll Up -> Show Controls
      document.body.classList.remove('distraction-free');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
```

- [ ] **Step 2: Add Tap-to-Toggle Listener**
Add a background tap event listener inside the reader view container. Ensure clicks on buttons, select elements, or sliders are ignored so controls don't toggle accidentally.

```javascript
  // Tap background to toggle menus on mobile
  const readerScreen = document.getElementById('screen-reader');
  if (readerScreen) {
    readerScreen.addEventListener('click', (e) => {
      // Ignore clicks on buttons, inputs, slider controls, or links
      if (e.target.closest('button') || e.target.closest('.reader-customizer') || e.target.closest('a')) {
        return;
      }
      
      // Prevent toggling if text is currently highlighted/selected
      const selection = window.getSelection().toString();
      if (selection.length > 0) return;
      
      document.body.classList.toggle('distraction-free');
    });
  }
```

- [ ] **Step 3: Manually verify scroll and tap toggles**
Open the application, navigate to the Read screen, scroll down to see the controls fade away, scroll up to see them return, and tap the blank background margin to toggle the view.

- [ ] **Step 4: Commit**
```bash
git add app.js
git commit -m "feat: implement scroll hide and background tap toggles for reader view"
```

---

### Task 4: Integrate Physical Bible Companion Mode Logic in app.js

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Declare State Variables**
Locate state declarations at the top of `app.js` and add `isPhysicalMode` initialized from localStorage:

```javascript
let isPhysicalMode = localStorage.getItem('hope_physical_mode') === 'true';
```

- [ ] **Step 2: Implement Toggle Button Handler**
Add the toggle button event listener inside the `DOMContentLoaded` block:

```javascript
  const physicalBtn = document.getElementById('btn-physical-bible');
  
  function updatePhysicalBtnUI() {
    if (!physicalBtn) return;
    if (isPhysicalMode) {
      physicalBtn.classList.add('active');
      physicalBtn.setAttribute('title', 'Switch to Web Scripture text');
      // Change icon to a closed book or tablet to represent switching back
      physicalBtn.querySelector('i').className = 'ph-fill ph-book-open';
    } else {
      physicalBtn.classList.remove('active');
      physicalBtn.setAttribute('title', 'Read from Physical Bible');
      physicalBtn.querySelector('i').className = 'ph ph-book-open';
    }
  }
  
  if (physicalBtn) {
    updatePhysicalBtnUI();
    physicalBtn.addEventListener('click', () => {
      isPhysicalMode = !isPhysicalMode;
      localStorage.setItem('hope_physical_mode', isPhysicalMode);
      updatePhysicalBtnUI();
      loadActiveChapter(); // Re-render content area
    });
  }
```

- [ ] **Step 3: Update `loadActiveChapter` Content Rendering**
Locate `loadActiveChapter` function and update it to show the companion card instead of scripture text if `isPhysicalMode` is active:

```javascript
  // If in Physical Bible Mode, show companion screen card instead
  if (isPhysicalMode) {
    const bookTitle = BOOKS[currentBookIndex].name;
    const chapterNum = currentChapter;
    
    // Inject the physical companion layout
    scriptureContainer.innerHTML = `
      <div class="physical-bible-card">
        <div class="inner-core">
          <div class="physical-icon-wrapper">
            <i class="ph-fill ph-book-bookmark"></i>
          </div>
          <h3>Physical Bible Mode</h3>
          <p>Please open your physical copy of God's Word to</p>
          <p class="highlight-ref">${bookTitle} Chapter ${chapterNum}</p>
          <p class="desc-text">Read carefully and reflect on the text. Tap the button below when you are finished to take your daily quiz.</p>
        </div>
      </div>
    `;
    
    // Update the reader Complete button UI
    const completeBtn = document.getElementById('complete-chapter-btn');
    if (completeBtn) {
      completeBtn.classList.remove('disabled');
      completeBtn.querySelector('span').textContent = 'Finished Reading - Take Quiz';
    }
    
    // Skip loading online scripture
    return;
  }
```
*Note: Make sure that if `isPhysicalMode` is false, it restores the default complete button label to `Complete & Take Quiz` when loading chapter text.*

- [ ] **Step 4: Verify the transition logic**
Toggling the companion button should immediately clear the online scripture text, replace it with the physical mode placeholder, and enable the "Finished Reading" button. Toggling it off should immediately reload the online chapter text.

- [ ] **Step 5: Commit**
```bash
git add app.js
git commit -m "feat: implement Physical Bible Mode toggling and content replacement"
```

---

### Task 5: Bump PWA Cache in sw.js

**Files:**
- Modify: `sw.js`

- [ ] **Step 1: Locate the cache name**
In `sw.js` (line 1), locate `CACHE_NAME` declaration.

- [ ] **Step 2: Increment the cache version**
Bump `CACHE_NAME` to `hope-toledo-bible-cache-v19`:
```javascript
const CACHE_NAME = 'hope-toledo-bible-cache-v19';
```

- [ ] **Step 3: Verify service worker cache**
Confirm that the service worker activates properly without errors.

- [ ] **Step 4: Commit**
```bash
git add sw.js
git commit -m "chore: bump PWA cache to v19 for reader view updates"
```
