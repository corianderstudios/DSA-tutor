import React, { useState } from 'react';

export default function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may be unavailable (e.g. insecure context); ignore.
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-paper-border dark:border-night-border">
      <div className="flex items-center justify-between border-b border-paper-border bg-paper px-4 py-2 dark:border-night-border dark:bg-night">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-cream-muted">
          {label || 'JavaScript'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded px-2 py-1 text-xs font-medium text-pine-600 hover:bg-pine-50 dark:text-pine-300 dark:hover:bg-night-surface"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-paper-surface p-4 text-sm leading-relaxed dark:bg-night-surface">
        <code className="font-mono text-ink dark:text-cream">{code}</code>
      </pre>
    </div>
  );
}
