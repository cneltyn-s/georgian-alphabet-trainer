# PRD: Georgian Alphabet Trainer - Overview

## 1. Product Vision
A static web application designed to help Russian speakers learn the Georgian alphabet through a "script-mixing" technique. The app gradually replaces Russian letters with Georgian counterparts in a given text, allowing for passive learning through context.

## 2. Core Principles
-   **Static & Portable:** Hosted on GitHub Pages, no backend required.
-   **Modern Stack (2026):** Utilizing the latest frontend standards for performance, accessibility, and maintainability.
-   **User-Centric:** Flexible progression (slider vs. groups), custom content, and instant feedback.
-   **No Hardcoding:** All styles via utility classes (Tailwind), all logic decoupled from UI.

## 3. Technology Stack
-   **Framework:** React 19+ (via Vite)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4
-   **UI Library:** shadcn/ui (Radix UI primitives) for accessible, unstyled-first components.
-   **Icons:** Lucide React
-   **State Management:** React Context or Zustand (lightweight).
-   **Routing:** Not required (Single Page Application).
-   **Theming:** `next-themes` for system/dark/light mode synchronization.
-   **Package Manager:** Yarn (modern, fast, reliable).
-   **Build/Deploy:** GitHub Actions -> GitHub Pages.

## 4. Architecture
The application follows a clean component-based architecture:

```
src/
├── components/
│   ├── ui/           # Shadcn generic components (Button, Slider, etc.)
│   ├── layout/       # Header, Footer, MainContainer
│   └── features/     # App-specific components (TextDisplay, Controls)
├── lib/
│   ├── mapping.ts    # Transliteration logic & dictionaries
│   └── storage.ts    # LocalStorage wrappers
├── hooks/
│   ├── useTransliteration.ts
│   └── useProgress.ts
└── data/
    └── texts.ts      # Default text presets
```

## 5. Development Phases
1.  **Core Logic:** Transliteration engine and data structures.
2.  **UI/UX Structure:** Layout, theming, and base components.
3.  **Features & Progression:** Interactive controls and text management.
4.  **Polish & Deployment:** Tooltips, persistence, and release.
