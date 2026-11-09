import { addDays } from './dates.js';

// Shown only on the very first visit, before anything is saved in localStorage.
export function makeStarterTasks() {
  const now = Date.now();
  return [
    {
      id: 'starter4',
      text: 'Pay the electricity bill',
      priority: 'High',
      category: 'Personal',
      due: addDays(1),
      completed: false,
      createdAt: now - 1000,
    },
    {
      id: 'starter3',
      text: 'Revise React hooks notes',
      priority: 'Medium',
      category: 'Study',
      due: addDays(3),
      completed: false,
      createdAt: now - 2000,
    },
    {
      id: 'starter2',
      text: 'Send the project update to the client',
      priority: 'High',
      category: 'Work',
      due: addDays(0),
      completed: false,
      createdAt: now - 3000,
    },
    {
      id: 'starter1',
      text: 'Buy fruit and vegetables',
      priority: 'Low',
      category: 'Shopping',
      due: '',
      completed: true,
      createdAt: now - 4000,
    },
  ];
}
