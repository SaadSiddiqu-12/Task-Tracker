import TaskItem from './TaskItem.jsx';

export default function TaskList({
  tasks,
  hasTasks,
  filtersActive,
  onResetFilters,
  onToggle,
  onUpdate,
  onDelete,
}) {
  if (!hasTasks) {
    return (
      <div className="empty">
        <p>You have no tasks yet.</p>
        <p>Type something in the box above and press Add task.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty">
        <p>No tasks match your search or filters.</p>
        {filtersActive && (
          <button type="button" className="btn secondary small" onClick={onResetFilters}>
            Reset filters
          </button>
        )}
      </div>
    );
  }

  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
