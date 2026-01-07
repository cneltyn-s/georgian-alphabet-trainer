# PRD: Phase 3 - Features & Progression Logic

## 1. Objective
Implement the interactive modes for letter replacement and text management logic.

## 2. Progression Modes

### 2.1. State Management
The app needs a central store (Context/Zustand) to track:
-   `mode`: 'slider' | 'groups'
-   `sliderValue`: number (0-33)
-   `selectedGroups`: string[]
-   `activeLetters`: Set<string> (Derived state)

### 2.2. Mode A: Slider (Incremental)
-   **UI:** A single range slider from 0 to 33.
-   **Logic:**
    -   Define a `LEARNING_ORDER` array: `['а', 'о', 'и', 'е', 'у', 'м', 'н', 'л', ...]` (starting from easiest/most frequent).
    -   When slider moves to `N`, the first `N` letters from `LEARNING_ORDER` are added to `activeLetters`.
    -   **Feedback:** Display "New letters: X, Y" below the slider as it moves.

### 2.3. Mode B: Groups (Categorical)
-   **UI:** A grid of Checkboxes/Switches, one for each `LetterGroup` defined in Phase 1.
-   **Logic:**
    -   Toggling a group adds/removes all its constituent letters from `activeLetters`.
    -   "Select All" and "Reset" buttons for convenience.

## 3. Text Management

### 3.1. Presets
-   **Data:** A file `src/data/texts.ts` containing 5 curated Russian texts.
    -   Text 1: Simple children's story (high frequency of simple letters).
    -   Text 2: News snippet.
    -   Text 3: Dialogue.
    -   Text 4: Culture/History of Georgia.
    -   Text 5: Pangram-heavy text (containing all letters).

### 3.2. Custom Text
-   **UI:** When "Custom Text" is selected in the dropdown, reveal a `<Textarea>`.
-   **Behavior:**
    -   User can paste any Russian text.
    -   The transliteration engine processes this input in real-time.

## 4. Acceptance Criteria
- [ ] Switching modes updates `activeLetters` correctly.
- [ ] Slider respects the defined `LEARNING_ORDER`.
- [ ] Checkboxes correctly toggle groups of letters.
- [ ] Changing the source text (Preset -> Custom) preserves the current "Learning Level" (active letters don't reset).
