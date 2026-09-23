import React, { useMemo, useState } from "react";
import { categories, topics } from "../data/topics.js";
import SearchBar from "./SearchBar.jsx";

export default function Sidebar({
  selectedTopicId,
  onSelectTopic,
  isOpen,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(() => new Set());

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        items: filteredTopics.filter((t) => t.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredTopics]);

  const toggleCategory = (category) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleSelect = (id) => {
    onSelectTopic(id);
    onClose?.();
  };

  return (
    <>
      {/* Mobile scrim, closes the drawer on click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        id="topic-sidebar"
        aria-label="Topics"
        className={`fixed inset-y-0 left-0 z-40 flex w-[85%] max-w-xs flex-col border-r border-paper-border bg-paper-surface transition-transform duration-200 ease-out dark:border-night-border dark:bg-night-surface md:static md:z-auto md:h-full md:w-72 md:max-w-none md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-paper-border p-4 dark:border-night-border md:hidden">
          <span className="font-serif text-lg font-semibold">Topics</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-ink hover:bg-pine-50 dark:text-cream dark:hover:bg-night"
            aria-label="Close topic menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="space-y-3 p-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            resultCount={filteredTopics.length}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
          {grouped.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-ink-muted dark:text-cream-muted">
              No topics match &ldquo;{query}&rdquo;.
            </p>
          )}

          {grouped.map(({ category, items }) => {
            const isCollapsed = collapsed.has(category);
            const panelId = `category-panel-${category.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div key={category} className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={!isCollapsed}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted hover:bg-pine-50 dark:text-cream-muted dark:hover:bg-night"
                >
                  <span>{category}</span>
                  <span
                    aria-hidden="true"
                    className={`transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                  >
                    ▾
                  </span>
                </button>

                {!isCollapsed && (
                  <ul id={panelId} className="mt-1 space-y-0.5">
                    {items.map((topic) => {
                      const isSelected = topic.id === selectedTopicId;
                      return (
                        <li key={topic.id}>
                          <button
                            type="button"
                            onClick={() => handleSelect(topic.id)}
                            aria-current={isSelected ? "page" : undefined}
                            className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                              isSelected
                                ? "bg-pine-500 text-white shadow-sm"
                                : "text-ink hover:bg-pine-50 dark:text-cream dark:hover:bg-night"
                            }`}
                          >
                            <span className="block font-medium">
                              {topic.title}
                            </span>
                            <span
                              className={`block text-xs ${
                                isSelected
                                  ? "text-pine-50"
                                  : "text-ink-muted dark:text-cream-muted"
                              }`}
                            >
                              {topic.summary}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
