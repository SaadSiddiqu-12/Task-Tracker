import { useCallback, useMemo, useState } from 'react';
import { isOverdue } from './dates.js';

const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

function sortTasks(list, sort) {
  const copy = [...list];
  if (sort === 'due') {
    copy.sort((a, b) => {
      if (!a.due && !b.due) return b.createdAt - a.createdAt;
      if (!a.due) return 1;
      if (!b.due) return -1;
      if (a.due === b.due) return b.createdAt - a.createdAt;
      return a.due < b.due ? -1 : 1;
    });
  } else if (sort === 'priority') {
    copy.sort((a, b) => {
      const diff = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      return diff !== 0 ? diff : b.createdAt - a.createdAt;
    });
  } else {
    copy.sort((a, b) => b.createdAt - a.createdAt);
  }
  return copy;
}

// Holds the filter, search, category and sort state
// and works out which tasks should be on screen.
export default function useTaskView(tasks) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  const counts = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const overdue = tasks.filter((t) => !t.completed && isOverdue(t.due)).length;
    return {
      total: tasks.length,
      completed,
      active: tasks.length - completed,
      overdue,
    };
  }, [tasks]);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = tasks.filter((task) => {
      if (filter === 'Active' && task.completed) return false;
      if (filter === 'Completed' && !task.completed) return false;
      if (category !== 'All' && task.category !== category) return false;
      if (search && !task.text.toLowerCase().includes(search)) return false;
      return true;
    });
    return sortTasks(filtered, sort);
  }, [tasks, filter, query, category, sort]);

  const filtersActive = filter !== 'All' || category !== 'All' || query.trim() !== '';

  const resetFilters = useCallback(() => {
    setFilter('All');
    setCategory('All');
    setQuery('');
  }, []);

  return {
    filter,
    setFilter,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    counts,
    visible,
    filtersActive,
    resetFilters,
  };
}
