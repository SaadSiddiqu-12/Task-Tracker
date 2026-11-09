import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage.js';
import { CATEGORIES, PRIORITIES, STORAGE_KEY } from './constants.js';
import { makeStarterTasks } from './starterTasks.js';

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
}

// Makes sure saved data is usable, even if it was edited by hand.
function cleanTask(item) {
  if (!item || typeof item !== 'object') return null;
  if (typeof item.id !== 'string' || typeof item.text !== 'string') return null;
  return {
    id: item.id,
    text: item.text,
    priority: PRIORITIES.includes(item.priority) ? item.priority : 'Medium',
    category: CATEGORIES.includes(item.category) ? item.category : 'Other',
    due: typeof item.due === 'string' ? item.due : '',
    completed: Boolean(item.completed),
    createdAt: Number(item.createdAt) || 0,
  };
}

export default function useTasks() {
  const [stored, setStored] = useLocalStorage(STORAGE_KEY, makeStarterTasks);

  const tasks = useMemo(() => {
    if (!Array.isArray(stored)) return [];
    return stored.map(cleanTask).filter(Boolean);
  }, [stored]);

  const addTask = useCallback(
    ({ text, priority, category, due }) => {
      const task = {
        id: makeId(),
        text,
        priority,
        category,
        due,
        completed: false,
        createdAt: Date.now(),
      };
      setStored((prev) => [task, ...(Array.isArray(prev) ? prev : [])]);
    },
    [setStored]
  );

  const toggleTask = useCallback(
    (id) => {
      setStored((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      );
    },
    [setStored]
  );

  const updateTask = useCallback(
    (id, changes) => {
      setStored((prev) => prev.map((task) => (task.id === id ? { ...task, ...changes } : task)));
    },
    [setStored]
  );

  const deleteTask = useCallback(
    (id) => {
      setStored((prev) => prev.filter((task) => task.id !== id));
    },
    [setStored]
  );

  const clearCompleted = useCallback(() => {
    setStored((prev) => prev.filter((task) => !task.completed));
  }, [setStored]);

  return { tasks, addTask, toggleTask, updateTask, deleteTask, clearCompleted };
}
