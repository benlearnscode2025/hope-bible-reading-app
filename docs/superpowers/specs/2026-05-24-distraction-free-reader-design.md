# Design Spec: Distraction-Free Focused Reader & Physical Bible Mode

This specification details the architecture, design, and interactive changes for Hope Baptist Church Bible Tracker to support a focused reading layout and a physical Bible companion mode.

## 1. Goal and Visual Context
The goal is to shift the scripture reading experience from a constrained "widget-like" container card to an immersive, screen-focused layout. We want the words to take center stage.
- **Focused Web Reader Mode**: Removes borders and card boxes around the scripture text, enabling it to flow naturally on the screen. Scrolling down fades and slides away navigation/headers. Scrolling up or tapping the background restores the UI controls.
- **Physical Bible Companion Mode**: Collapses the text completely for users reading a physical Bible, replacing it with a centered status card and a prominent "Complete & Take Quiz" button.

---

## 2. Technical Design

### A. CSS Class Actions & Spacing
- Modify `style.css` to add support for a `.distraction-free` class on the `body` element.
- When `body.distraction-free` is active:
  - `.app-header` slides upward and fades out: `transform: translateY(-100%); opacity: 0; pointer-events: none;`
  - `#floating-nav` slides downward and fades out: `transform: translate(-50%, 150%); opacity: 0; pointer-events: none;`
  - `.reader-meta-bar` fades out: `opacity: 0; pointer-events: none;`
- Add smooth transitions on these classes: `transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;`
- Modify `.scripture-card` to remove borders, background, double bezels, and max-height constraints *only* when viewing scripture, allowing the text to scroll naturally on the main window.

### B. JavaScript Scroll & Tap Events
- In `app.js`, attach a scroll event listener to `window`.
- **Scroll Detection**:
  - Keep track of `lastScrollTop`.
  - If `scrollTop > lastScrollTop` (scrolling down) and `scrollTop > 60` (beyond header): add `body.classList.add('distraction-free')`.
  - If `scrollTop < lastScrollTop - 12` (scrolling up): remove `body.classList.remove('distraction-free')`.
- **Tap Toggle**:
  - Attach a click listener to the scripture container.
  - If `event.target` is not a button, customizer control, or selected text, toggle `.distraction-free` class on `body`.

### C. Physical Bible Companion Mode
- Add a new customizer button in `.reader-customizer`:
  ```html
  <button id="btn-physical-bible" class="icon-btn small" title="Read from Physical Bible">
    <i class="ph ph-book-open"></i>
  </button>
  ```
- Keep state in `app.js`: `isPhysicalMode` (boolean, synced to `localStorage`).
- If `isPhysicalMode` is true:
  - Instead of fetching/rendering the text content, display a beautiful, minimal companion card:
    ```html
    <div class="physical-bible-card double-bezel">
      <div class="inner-core">
        <i class="ph ph-book-bookmark physical-icon"></i>
        <h3>Reading Physical Bible</h3>
        <p>Open your copy of the Word to <strong id="physical-ref-text">Genesis 1</strong></p>
        <p class="desc">Take your time to read, meditate, and reflect.</p>
      </div>
    </div>
    ```
  - The "Complete & Take Quiz" button is displayed centered and enlarged below the card.

---

## 3. Verification Plan
- Verify scroll hide/show in Chrome/Firefox mobile emulator.
- Verify tap background toggles distraction-free mode.
- Verify toggle button correctly transitions between Physical Bible Companion Card and Full Scripture Web Text.
