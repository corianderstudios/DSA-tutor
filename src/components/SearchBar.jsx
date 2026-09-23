import React from 'react';

export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="px-1">
      <label htmlFor="topic-search" className="sr-only">
        Search topics
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-muted dark:text-cream-muted"
          aria-hidden="true"
        >
          🔍
        </span>
        <input
          id="topic-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search topics…"
          className="w-full rounded-lg border border-paper-border bg-paper-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-pine-500 dark:border-night-border dark:bg-night-surface dark:text-cream dark:placeholder:text-cream-muted"
          aria-describedby="search-result-count"
        />
      </div>
      <p id="search-result-count" className="mt-1 px-1 text-xs text-ink-muted dark:text-cream-muted" aria-live="polite">
        {value
          ? `${resultCount} topic${resultCount === 1 ? '' : 's'} found`
          : 'Browse by category below'}
      </p>
    </div>
  );
}
