# DSA Interview Prep

An interactive study guide for the data structures and algorithms most
commonly tested in coding interviews — explained in plain JavaScript, with
a runnable playground and a practice question for every topic.

## Features

- **10 core topics**: arrays & strings, hash tables, linked lists, stacks &
  queues, binary trees / BSTs, graphs (BFS/DFS), merge sort, binary search,
  recursion & backtracking, and dynamic programming.
- **Playground** — edit and run the worked example for each topic directly
  in the browser; output (or errors) show up live.
- **Practice question** — a small coding exercise per topic, graded against
  a handful of test cases with immediate pass/fail feedback.
- **Searchable, collapsible, mobile-friendly navigation** — filter topics by
  name, collapse categories, and use an off-canvas drawer on small screens.
- **Accessible by design** — semantic landmarks, visible focus rings, a
  skip-to-content link, `aria-live` status regions for dynamic output,
  `aria-expanded`/`aria-current` state, and screen-reader-only labels
  throughout.
- **Light/dark mode** — defaults to light, remembers your choice, and both
  themes are tuned for comfortable contrast.
- **Serif display type / sans-serif body type** — headings use Lora, body
  copy uses Inter, and code uses JetBrains Mono.

## 🔮 Development Process

This repository was **vibe coded** utilizing AI agents under human supervision.

- **Primary Driver:** `Claude Code`
- **Human Vibe Level:** _Collaborative Vibe_ (AI generated the heavy lifting, human reviewed architectures and edge cases).

## Getting started

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Testing

Built with Vitest, React Testing Library, and jest-dom.

```bash
npm run test        # run the full suite once
npm run test:watch  # re-run on file changes
npm run coverage     # run with coverage
```

## Project structure

```
src/
  components/     UI components (Sidebar, Playground, CodingQuestion, ...)
  context/        ThemeContext (light/dark mode)
  data/           topics.js — all topic content lives here
  hooks/          useLocalStorage
  utils/          codeRunner.js — sandboxed-ish snippet & test execution
  __tests__/      Vitest + RTL test suites
```

## Adding a new topic

Every topic is a plain JS object in `src/data/topics.js`. Add a new entry
with `id`, `category`, `title`, `summary`, `explanation` (an array of
paragraph strings), `complexity`, an `example` (`description` + runnable
`code`), and a `question` (`prompt`, `functionName`, `starterCode`, and an
array of `tests`). No component changes are required — the sidebar,
playground, and practice question all render from this data automatically.

## A note on running user-entered code

The Playground and practice questions execute JavaScript directly in your
own browser tab (via `new Function(...)`, not `eval` on a server) so you
can experiment freely. There is no server-side execution, and nothing you
type is sent anywhere.
