import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia; provide a stub so components that
// check `prefers-color-scheme` (ThemeContext) don't throw during tests.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
