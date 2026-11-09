import { useEffect, useState } from 'react';

function resolveInitial(initial) {
  return typeof initial === 'function' ? initial() : initial;
}

function readFromStorage(key, initial) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return resolveInitial(initial);
    return JSON.parse(raw);
  } catch {
    return resolveInitial(initial);
  }
}

// Works like useState, but the value is saved in localStorage
// and also stays in sync when the app is open in another tab.
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => readFromStorage(key, initial));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked. The app keeps working in memory.
    }
  }, [key, value]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        // Ignore data that cannot be read.
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [value, setValue];
}
