import Header from './Header.jsx';
import TaskForm from './TaskForm.jsx';
import Toolbar from './Toolbar.jsx';
import TaskList from './TaskList.jsx';
import Footer from './Footer.jsx';
import useTasks from './useTasks.js';
import useTaskView from './useTaskView.js';

export default function App() {
  const { tasks, addTask, toggleTask, updateTask, deleteTask, clearCompleted } = useTasks();
  const view = useTaskView(tasks);

  return (
    <div className="page">
      <main className="app">
        <Header counts={view.counts} />

        <TaskForm onAdd={addTask} />

        <section className="panel" aria-label="Your tasks">
          <Toolbar
            filter={view.filter}
            onFilter={view.setFilter}
            query={view.query}
            onQuery={view.setQuery}
            category={view.category}
            onCategory={view.setCategory}
            sort={view.sort}
            onSort={view.setSort}
            counts={view.counts}
          />
          <TaskList
            tasks={view.visible}
            hasTasks={tasks.length > 0}
            filtersActive={view.filtersActive}
            onResetFilters={view.resetFilters}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
          <Footer counts={view.counts} onClearCompleted={clearCompleted} />
        </section>
      </main>
    </div>
  );
}
