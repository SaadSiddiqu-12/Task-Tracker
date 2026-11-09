import { useState } from 'react';

export default function Footer({ counts, onClearCompleted }) {
  const [confirming, setConfirming] = useState(false);

  let summary;
  if (counts.total === 0) summary = 'No tasks';
  else if (counts.active === 0) summary = 'All tasks are done';
  else summary = `${counts.active} ${counts.active === 1 ? 'task' : 'tasks'} left`;

  function clear() {
    onClearCompleted();
    setConfirming(false);
  }

  return (
    <footer className="panelFooter">
      <span>{summary}</span>

      {confirming && counts.completed > 0 ? (
        <span className="footerActions">
          <span className="confirmText">
            Remove {counts.completed} completed {counts.completed === 1 ? 'task' : 'tasks'}?
          </span>
          <button type="button" className="btn danger small" onClick={clear}>
            Yes, remove
          </button>
          <button type="button" className="btn secondary small" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </span>
      ) : (
        <button
          type="button"
          className="btn secondary small"
          disabled={counts.completed === 0}
          onClick={() => setConfirming(true)}
        >
          Clear completed ({counts.completed})
        </button>
      )}
    </footer>
  );
}
