import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TopicView from './components/TopicView.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { topics } from './data/topics.js';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId) ?? topics[0];

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-cream">
      <a
        href="#main-content"
        className="sr-only-focusable fixed left-2 top-2 z-50 rounded-md bg-pine-500 px-4 py-2 text-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-paper-border bg-paper-surface px-4 py-3 dark:border-night-border dark:bg-night-surface">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-ink hover:bg-pine-50 dark:text-cream dark:hover:bg-night md:hidden"
            aria-label="Open topic menu"
            aria-controls="topic-sidebar"
            aria-expanded={isSidebarOpen}
          >
            <span aria-hidden="true">☰</span>
          </button>
          <span className="font-serif text-lg font-bold sm:text-xl">DSA Interview Prep</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar
          selectedTopicId={selectedTopicId}
          onSelectTopic={setSelectedTopicId}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main id="main-content" className="min-w-0 flex-1">
          <TopicView topic={selectedTopic} />
        </main>
      </div>
    </div>
  );
}
