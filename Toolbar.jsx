import { CATEGORIES, FILTERS, SORT_OPTIONS } from './constants.js';

export default function Toolbar({
  filter,
  onFilter,
  query,
  onQuery,
  category,
  onCategory,
  sort,
  onSort,
  counts,
}) {
  const filterCounts = {
    All: counts.total,
    Active: counts.active,
    Completed: counts.completed,
  };

  return (
    <div className="toolbar">
      <input
        type="search"
        className="search"
        value={query}
        placeholder="Search tasks"
        aria-label="Search tasks"
        onChange={(e) => onQuery(e.target.value)}
      />

      <div className="toolbarRow">
        <div className="tabs" role="group" aria-label="Filter by status">
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              className={filter === name ? 'tab activeTab' : 'tab'}
              aria-pressed={filter === name}
              onClick={() => onFilter(name)}
            >
              {name} ({filterCounts[name]})
            </button>
          ))}
        </div>

        <div className="selects">
          <label>
            <span className="srOnly">Filter by category</span>
            <select value={category} onChange={(e) => onCategory(e.target.value)}>
              <option value="All">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="srOnly">Sort tasks</span>
            <select value={sort} onChange={(e) => onSort(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
