import { useRef, useState } from 'react';
import { CATEGORIES, MAX_TEXT_LENGTH, PRIORITIES } from './constants.js';

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  const [due, setDue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const clean = text.trim();
    if (!clean) {
      setError('Please type a task before adding it.');
      inputRef.current.focus();
      return;
    }
    onAdd({ text: clean, priority, category, due });
    setText('');
    setDue('');
    setError('');
    inputRef.current.focus();
  }

  return (
    <form className="panel formCard" onSubmit={handleSubmit} noValidate>
      <h2>Add a task</h2>

      <div className="addRow">
        <input
          ref={inputRef}
          type="text"
          value={text}
          maxLength={MAX_TEXT_LENGTH}
          placeholder="What needs to be done?"
          aria-label="Task description"
          aria-invalid={error ? 'true' : 'false'}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
        />
        <button type="submit" className="btn primary">
          Add task
        </button>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <div className="options">
        <label>
          <span>Priority</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Due date (optional)</span>
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        </label>
      </div>
    </form>
  );
}
