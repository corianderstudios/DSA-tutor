import { useEffect, useState } from 'react';

/**
 * Small wrapper around useState that persists to localStorage.
 * Falls back gracefully (e.g. in private browsing or test environments
 * where localStorage may throw).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (storage disabled, quota exceeded, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}
