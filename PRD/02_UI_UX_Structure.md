# PRD: Phase 2 - UI/UX Structure

## 1. Objective
Build the responsive layout and integrate the design system using Tailwind CSS and shadcn/ui components.

## 2. Layout Structure

### 2.1. Global Layout
-   **Header:**
    -   Logo/Title: "Georgian Alphabet Trainer".
    -   Actions: Theme Toggle (Sun/Moon), GitHub Repository Link.
-   **Main Content (Centered, Max-width 800px):**
    -   **Control Panel (Top):**
        -   Mode Switcher: [Slider Mode] <-> [Groups Mode].
        -   Progression Controls (Slider or Checkboxes).
    -   **Input Section:**
        -   Text Selection Dropdown (Presets + "Custom").
        -   *Conditional:* Textarea for custom input (auto-expanding).
    -   **Reading Area:**
        -   Large, readable typography (Card component).
        -   Padding for comfortable reading on mobile.
-   **Footer:**
    -   Copyright / "Built with ❤️".

## 3. Design System & Components

### 3.1. Typography
-   **Russian:** System sans-serif (Inter/Roboto).
-   **Georgian:** Use `Noto Sans Georgian` (Google Fonts) to ensure consistent rendering across OS.
-   **Highlighting:** Replaced Georgian letters should be visually distinct.
    -   Color: `text-primary` (e.g., Indigo-600 in light, Indigo-400 in dark).
    -   Weight: `font-medium` or `font-semibold`.

### 3.2. Shadcn/UI Components
The following components will be installed and customized:
-   `slider`: For the incremental progression mode.
-   `switch`: For toggling specific letter groups.
-   `select`: For choosing preset texts.
-   `textarea`: For custom input.
-   `card`: To wrap the reading area.
-   `tooltip`: For showing the original Russian letter on hover.
-   `tabs`: To switch between "Slider" and "Groups" modes.
-   `button`: General actions.

## 4. Dark Mode Support
-   Utilize `next-themes`.
-   All colors must use Tailwind's `dark:` modifier or CSS variables defined in `globals.css`.
-   Background: `bg-background` (White/Slate-950).
-   Text: `text-foreground` (Slate-900/Slate-50).

## 5. Acceptance Criteria
- [ ] Application renders without errors on mobile and desktop.
- [ ] Dark/Light mode toggle works instantly and persists.
- [ ] "Reading Area" uses the correct Georgian font.
- [ ] Controls are responsive (stack on mobile, side-by-side on desktop).
