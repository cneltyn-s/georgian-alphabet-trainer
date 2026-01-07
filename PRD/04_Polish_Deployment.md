# PRD: Phase 4 - Polish, Persistence & Deployment

## 1. Objective
Add quality-of-life features, save user progress, and deploy the application to GitHub Pages.

## 2. Persistence (Local Storage)
The app must remember the user's state across sessions.

### 2.1. Stored Data Keys
-   `georgian_trainer_mode`: 'slider' | 'groups'
-   `georgian_trainer_slider_value`: number
-   `georgian_trainer_selected_groups`: string[] (JSON)
-   `georgian_trainer_custom_text`: string
-   `georgian_trainer_text_selection`: 'preset-0' | ... | 'custom'

### 2.2. Implementation
-   Create a `usePersistedState` hook that wraps `useState` and syncs with `localStorage`.
-   **Requirement:** State hydration must happen before the initial render to avoid layout shift (or show a skeleton/loader).

## 3. Tooltips & UX Polish

### 3.1. Interactive Tooltips
-   **Library:** `@radix-ui/react-tooltip` (via shadcn/ui).
-   **Behavior:**
    -   Wrap every replaced Georgian letter in a `<TooltipTrigger>`.
    -   On Hover/Tap: Show the original Russian letter.
    -   *Optional:* Show IPA transcription.
-   **Mobile Consideration:** Ensure tapping on a letter on mobile opens the tooltip without selecting text awkwardly.

### 3.2. Visual Feedback
-   **Transitions:** The text replacement should be instant but smooth.
-   **Empty State:** If "Custom Text" is empty, show a helpful placeholder: "Paste your Russian text here..."

## 4. Deployment Strategy

### 4.1. Configuration
-   **Vite Base Path:** Set `base: '/<repo-name>/'` in `vite.config.ts` to support GitHub Pages subdirectory hosting.
-   **Build Script:** `npm run build` should produce a static `dist/` folder.

### 4.2. GitHub Actions (CI/CD)
Create `.github/workflows/deploy.yml`:
1.  Trigger: Push to `main`.
2.  Job:
    -   Checkout code.
    -   Install Node.js.
    -   `npm ci`
    -   `npm run build`
    -   Deploy `dist/` to `gh-pages` branch using `actions/deploy-pages`.

## 5. Final Checklist
- [ ] Persistence works: Refreshing page keeps the slider position.
- [ ] Tooltips appear correctly on hover.
- [ ] Custom text is saved.
- [ ] Production build runs locally (`vite preview`).
- [ ] Deployed URL is accessible.
