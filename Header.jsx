export default function Header({ counts }) {
  const items = [
    { label: 'Total', value: counts.total },
    { label: 'Active', value: counts.active },
    { label: 'Completed', value: counts.completed },
    { label: 'Overdue', value: counts.overdue, warn: counts.overdue > 0 },
  ];

  return (
    <header className="header">
      <h1>Task Tracker</h1>
      <p>Add your tasks, set a priority and a due date, and tick them off as you finish.</p>

      <div className="stats">
        {items.map((item) => (
          <div className="stat" key={item.label}>
            <strong className={item.warn ? 'warnText' : ''}>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
