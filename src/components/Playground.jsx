import React, { useEffect, useId, useState } from 'react';
import { runSnippet } from '../utils/codeRunner.js';

export default function Playground({ topicId, initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(null);
  const outputId = useId();

  // Reset the editable code whenever the learner switches topics.
  useEffect(() => {
    setCode(initialCode);
    setOutput(null);
  }, [topicId, initialCode]);

  const handleRun = () => {
    const result = runSnippet(code);
    setOutput(result);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  return (
    <section aria-labelledby={`${outputId}-heading`} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id={`${outputId}-heading`} className="font-serif text-xl font-semibold">
          Playground
        </h3>
        <p className="text-sm text-ink-muted dark:text-cream-muted">
          Edit the code below, then run it to see what happens.
        </p>
      </div>

      <label htmlFor={`${outputId}-editor`} className="sr-only">
        Editable JavaScript playground code for this topic
      </label>
      <textarea
        id={`${outputId}-editor`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
        rows={12}
        className="w-full rounded-lg border border-paper-border bg-paper-surface p-4 font-mono text-sm leading-relaxed text-ink focus:border-pine-500 dark:border-night-border dark:bg-night-surface dark:text-cream"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleRun}
          className="rounded-md bg-pine-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pine-600"
        >
          ▶ Run code
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-paper-border px-4 py-2 text-sm font-medium text-ink hover:bg-paper dark:border-night-border dark:text-cream dark:hover:bg-night"
        >
          Reset to example
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="min-h-[3rem] rounded-lg border border-paper-border bg-paper p-4 font-mono text-sm dark:border-night-border dark:bg-night"
      >
        {output === null && (
          <p className="text-ink-muted dark:text-cream-muted">Output will appear here.</p>
        )}
        {output && output.logs.length > 0 && (
          <ul className="space-y-1">
            {output.logs.map((line, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i} className="whitespace-pre-wrap text-ink dark:text-cream">
                {line}
              </li>
            ))}
          </ul>
        )}
        {output && output.logs.length === 0 && !output.error && (
          <p className="text-ink-muted dark:text-cream-muted">
            Code ran with no console output. Try adding a console.log().
          </p>
        )}
        {output && output.error && (
          <p className="text-rust-500 dark:text-rust-400">⚠ {output.error}</p>
        )}
      </div>
    </section>
  );
}
