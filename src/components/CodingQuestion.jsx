import React, { useEffect, useId, useState } from 'react';
import { runTests } from '../utils/codeRunner.js';

export default function CodingQuestion({ topicId, question }) {
  const [code, setCode] = useState(question.starterCode);
  const [result, setResult] = useState(null);
  const headingId = useId();

  useEffect(() => {
    setCode(question.starterCode);
    setResult(null);
  }, [topicId, question.starterCode]);

  const handleRunTests = () => {
    const outcome = runTests(code, question.functionName, question.tests);
    setResult(outcome);
  };

  const handleReset = () => {
    setCode(question.starterCode);
    setResult(null);
  };

  const allPassed = result && !result.compileError && result.passCount === result.total;

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <h3 id={headingId} className="font-serif text-xl font-semibold">
        Practice question
      </h3>
      <p className="leading-relaxed text-ink dark:text-cream">{question.prompt}</p>

      <label htmlFor={`${headingId}-editor`} className="sr-only">
        Your solution code for this practice question
      </label>
      <textarea
        id={`${headingId}-editor`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
        rows={10}
        className="w-full rounded-lg border border-paper-border bg-paper-surface p-4 font-mono text-sm leading-relaxed text-ink focus:border-pine-500 dark:border-night-border dark:bg-night-surface dark:text-cream"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleRunTests}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-amber-600 hover:text-white"
        >
          ✓ Run tests
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-paper-border px-4 py-2 text-sm font-medium text-ink hover:bg-paper dark:border-night-border dark:text-cream dark:hover:bg-night"
        >
          Reset to starter code
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="space-y-2 rounded-lg border border-paper-border bg-paper p-4 dark:border-night-border dark:bg-night"
      >
        {result === null && (
          <p className="text-sm text-ink-muted dark:text-cream-muted">
            Test results will appear here once you run them.
          </p>
        )}

        {result && result.compileError && (
          <p className="text-sm text-rust-500 dark:text-rust-400">⚠ {result.compileError}</p>
        )}

        {result && !result.compileError && (
          <>
            <p
              className={`text-sm font-semibold ${
                allPassed ? 'text-pine-600 dark:text-pine-300' : 'text-ink dark:text-cream'
              }`}
            >
              {allPassed
                ? `All ${result.total} tests passed! 🎉`
                : `${result.passCount} of ${result.total} tests passed.`}
            </p>
            <ul className="space-y-1 text-sm">
              {result.results.map((r) => (
                <li key={r.index} className="flex items-start gap-2 font-mono">
                  <span aria-hidden="true">{r.pass ? '✅' : '❌'}</span>
                  <span className="sr-only">{r.pass ? 'Passed:' : 'Failed:'}</span>
                  <span className="text-ink dark:text-cream">
                    Test {r.index + 1}
                    {r.args ? ` — input: ${JSON.stringify(r.args)}` : ''}
                    {!r.pass && !r.error && ` — expected ${JSON.stringify(r.expected)}, got ${JSON.stringify(r.actual)}`}
                    {r.error && ` — threw: ${r.error}`}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
