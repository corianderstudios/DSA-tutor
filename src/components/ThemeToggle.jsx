import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-paper-border bg-paper-surface px-3 py-1.5 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-pine-50 dark:border-night-border dark:bg-night-surface dark:text-cream dark:hover:bg-night"
      aria-pressed={isDark}
    >
      <span className="text-base" aria-hidden="true">
        {isDark ? '🌙' : '☀️'}
      </span>
      <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
      <span className="sr-only">
        Currently {theme} mode. Activate to switch to {isDark ? 'light' : 'dark'} mode.
      </span>
    </button>
  );
}
