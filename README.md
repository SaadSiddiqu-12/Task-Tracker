# Task Tracker

A task manager built with React, hooks and localStorage. Tasks are saved in the browser, so they are still there after a refresh or a restart.

## Features

- Add, edit and delete tasks
- Mark tasks as done or not done
- Priority: Low, Medium, High
- Category: Personal, Work, Study, Shopping, Other
- Optional due date, with an overdue warning
- Filter by All, Active or Completed
- Filter by category
- Search by text
- Sort by newest, due date or priority
- Counters for total, active, completed and overdue tasks
- Clear completed tasks (asks for confirmation)
- Works on phones and desktops

## How it uses React

- Components: Header, TaskForm, Toolbar, TaskList, TaskItem, Footer
- useState, useEffect, useRef, useMemo and useCallback
- Custom hooks:
  - useLocalStorage saves any value to localStorage and keeps other tabs in sync
  - useTasks holds the task list and the add, toggle, update, delete and clear actions
  - useTaskView holds the search, filter and sort state and works out which tasks to show

## Run it on your computer

You need Node.js 20.19 or newer.

```
npm install
npm run dev
```

Build for production:

```
npm run build
```

The finished site is created in the `dist` folder.

## Deploy on Netlify

1. Push this project to GitHub.
2. In Netlify, choose Add new site and import the repository.
3. Build command: `npm run build`
4. Publish directory: `dist`

The settings are already saved in `netlify.toml`.

## Notes

- On the very first visit, four sample tasks are added so the page is not empty. They are only created when nothing is saved yet. Delete them like any other task. To remove the samples completely, change `makeStarterTasks` in `starterTasks.js` to return an empty list.
- All source files are kept in one folder on purpose, so they can be uploaded to GitHub directly from the browser.
