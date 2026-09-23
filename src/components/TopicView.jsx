import React from 'react';
import CodeBlock from './CodeBlock.jsx';
import Playground from './Playground.jsx';
import CodingQuestion from './CodingQuestion.jsx';

export default function TopicView({ topic }) {
  return (
    <article className="mx-auto max-w-3xl space-y-10 px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="topic-heading">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-pine-600 dark:text-pine-300">
          {topic.category}
        </p>
        <h1 id="topic-heading" className="font-serif text-3xl font-bold text-ink dark:text-cream sm:text-4xl">
          {topic.title}
        </h1>
        <p className="text-lg text-ink-muted dark:text-cream-muted">{topic.summary}</p>
      </header>

      <section aria-labelledby="explanation-heading" className="space-y-4">
        <h2 id="explanation-heading" className="font-serif text-2xl font-semibold">
          How it works
        </h2>
        {topic.explanation.map((paragraph, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i} className="leading-relaxed text-ink dark:text-cream">
            {paragraph}
          </p>
        ))}

        <dl className="grid gap-3 rounded-lg border border-paper-border bg-paper p-4 text-sm dark:border-night-border dark:bg-night sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-ink dark:text-cream">Time complexity</dt>
            <dd className="text-ink-muted dark:text-cream-muted">{topic.complexity.time}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink dark:text-cream">Space complexity</dt>
            <dd className="text-ink-muted dark:text-cream-muted">{topic.complexity.space}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="example-heading" className="space-y-3">
        <h2 id="example-heading" className="font-serif text-2xl font-semibold">
          Worked example
        </h2>
        <p className="leading-relaxed text-ink dark:text-cream">{topic.example.description}</p>
        <CodeBlock code={topic.example.code} label={`${topic.title} example`} />
      </section>

      <Playground key={`playground-${topic.id}`} topicId={topic.id} initialCode={topic.example.code} />

      <CodingQuestion key={`question-${topic.id}`} topicId={topic.id} question={topic.question} />
    </article>
  );
}
