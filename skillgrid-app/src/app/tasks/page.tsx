
"use client";

import { useState, type FormEvent } from "react";
import {
  Check,
  Circle,
  ClipboardList,
  Plus,
  Trash2,
  X,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  category: string;
  priority: string;
  dueDate: string;
  completed: boolean;
};

const categories = [
  "Personal",
  "Academics",
  "DSA",
  "Development",
  "Other",
];

const priorities = ["Low", "Medium", "High"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const completedCount = tasks.filter((task) => task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      category,
      priority,
      dueDate,
      completed: false,
    };

    setTasks((current) => [newTask, ...current]);
    setTitle("");
    setCategory("Personal");
    setPriority("Medium");
    setDueDate("");
    setShowForm(false);
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-700">Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Tasks
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Organize your work, set priorities, and track completion.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          <Plus size={17} />
          Add task
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total tasks</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {tasks.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {tasks.length - completedCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {completedCount}
          </p>
        </div>
      </section>

      {showForm && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Create task
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="task-title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Task title
              </label>
              <input
                id="task-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter a task title"
                required
                maxLength={160}
                autoFocus
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="task-category"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  id="task-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {priorities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-date"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Due date
                </label>
                <input
                  id="task-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                Create task
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All tasks
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your list
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <div className="rounded-xl bg-slate-100 p-4">
              <ClipboardList className="h-7 w-7 text-slate-500" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              {tasks.length === 0
                ? "No tasks yet"
                : `No ${filter.toLowerCase()} tasks`}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {tasks.length === 0
                ? "Create your first task to start organizing your work."
                : "Tasks matching this filter will appear here."}
            </p>
            {tasks.length === 0 && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                <Plus size={17} />
                Create your first task
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-4 px-5 py-4 transition hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed ? "Mark task pending" : "Mark task complete"
                  }
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                    task.completed
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-300 text-transparent hover:border-blue-500"
                  }`}
                >
                  {task.completed ? (
                    <Check size={13} strokeWidth={3} />
                  ) : (
                    <Circle size={12} />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`break-words text-sm font-medium ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-md bg-slate-100 px-2 py-1">
                      {task.category}
                    </span>
                    <span
                      className={`rounded-md px-2 py-1 ${
                        task.priority === "High"
                          ? "bg-red-50 text-red-700"
                          : task.priority === "Medium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {task.priority} priority
                    </span>
                    {task.dueDate && (
                      <span>
                        Due{" "}
                        {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}