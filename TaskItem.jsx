import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, MAX_TEXT_LENGTH, PRIORITIES } from './constants.js';
import { dueText, isOverdue } from './dates.js';

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [draft, setDraft] = useState({
    text: task.text,
    priority: task.priority,
    category: task.category,
    due: task.due,
  });
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function startEditing() {
    setDraft({
      text: task.text,
      priority: task.priority,
      category: task.category,
      due: task.due,
    });
    setError('');
    setConfirmingDelete(false);
    setEditing(true);
  }

  function changeDraft(field, value) {
    setDraft((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  }

  function save(event) {
    event.preventDefault();
    const text = draft.text.trim();
    if (!text) {
      setError('The task cannot be empty.');
      return;
    }
    onUpdate(task.id, { ...draft, text });
    setEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') setEditing(false);
  }

  if (editing) {
    return (
      <li className="task editing">
        <form className="editForm" onSubmit={save} onKeyDown={handleKeyDown} noValidate>
          <input
            ref={inputRef}
            type="text"
            value={draft.text}
            maxLength={MAX_TEXT_LENGTH}
            aria-label="Edit task description"
            onChange={(e) => changeDraft('text', e.target.value)}
          />
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <div className="options">
            <label>
              <span>Priority</span>
              <select value={draft.priority} onChange={(e) => changeDraft('priority', e.target.value)}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Category</span>
              <select value={draft.category} onChange={(e) => changeDraft('category', e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Due date</span>
              <input
                type="date"
                value={draft.due}
                onChange={(e) => changeDraft('due', e.target.value)}
              />
            </label>
          </div>

          <div className="editActions">
            <button type="submit" className="btn primary small">
              Save
            </button>
            <button type="button" className="btn secondary small" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  const overdue = !task.completed && isOverdue(task.due);

  return (
    <li className={task.completed ? 'task done' : 'task'}>
      <input
        type="checkbox"
        className="check"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark "${task.text}" as not done` : `Mark "${task.text}" as done`}
      />

      <div className="taskBody">
        <p className="taskText">{task.text}</p>
        <div className="taskMeta">
          <span className={`tag priority${task.priority}`}>{task.priority} priority</span>
          <span className="tag categoryTag">{task.category}</span>
          {task.due && <span className={overdue ? 'due overdueText' : 'due'}>{dueText(task.due)}</span>}
        </div>
      </div>

      <div className="taskActions">
        {confirmingDelete ? (
          <>
            <span className="confirmText">Delete this task?</span>
            <button type="button" className="btn danger small" onClick={() => onDelete(task.id)}>
              Yes, delete
            </button>
            <button
              type="button"
              className="btn secondary small"
              onClick={() => setConfirmingDelete(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn secondary small" onClick={startEditing}>
              Edit
            </button>
            <button
              type="button"
              className="btn secondary small"
              onClick={() => setConfirmingDelete(true)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
