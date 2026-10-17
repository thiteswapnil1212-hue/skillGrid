"use client";

import { uid } from "@/lib/utils";
import { useSnackbar } from "@/components/ui/Snackbar";
import Fab from "@/components/ui/Fab";
import { useState, type FormEvent } from "react";
import { Check, Circle, ClipboardList, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";

type Task = {
  id: string;
  title: string;
  category: string;
  priority: string;
  dueDate: string;
  completed: boolean;
};

const categories = ["Personal", "Academics", "DSA", "Development", "Other"];
const priorities = ["Low", "Medium", "High"];

export default function TasksPage() {
  const showSnackbar = useSnackbar();
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
      id: uid(),
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
    const index = tasks.findIndex((task) => task.id === id);
    const deleted = index >= 0 ? tasks[index] : undefined;
    if (!deleted) return;
    setTasks((current) => current.filter((task) => task.id !== id));
    showSnackbar("Task deleted", {
      actionLabel: "Undo",
      onAction: () => {
        setTasks((current) => {
          const restored = [...current];
          restored.splice(Math.min(index, restored.length), 0, deleted);
          return restored;
        });
      },
    });
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Workspace</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize your work, set priorities, and track completion.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="hidden gap-2 lg:inline-flex">
          <Plus size={16} />
          Add task
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B5998] to-[#2F477A] text-white shadow-sm">
              <ClipboardList size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{tasks.length}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Total tasks</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm">
              <Circle size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{tasks.length - completedCount}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Pending</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
              <Check size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{completedCount}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Completed</p>
          </CardContent>
        </Card>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg">Create task</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} aria-label="Close form" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700">
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="task-title" className="mb-2 block text-sm font-semibold text-slate-700">
                      Task title
                    </label>
                    <Input
                      id="task-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a task title"
                      required
                      maxLength={160}
                      autoFocus
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label htmlFor="task-category" className="mb-2 block text-sm font-semibold text-slate-700">
                        Category
                      </label>
                      <select
                        id="task-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                      >
                        {categories.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="task-priority" className="mb-2 block text-sm font-semibold text-slate-700">
                        Priority
                      </label>
                      <select
                        id="task-priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                      >
                        {priorities.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="task-date" className="mb-2 block text-sm font-semibold text-slate-700">
                        Due date
                      </label>
                      <Input
                        id="task-date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
                    <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create task</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="rounded-2xl">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
          <div>
            <CardTitle className="text-lg">All tasks</CardTitle>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your list
            </p>
          </div>
          <div className="flex gap-1 border border-slate-200 rounded-lg p-1 bg-slate-50/80">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-all ${
                  filter === item ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </CardHeader>
        <div className="border-t border-slate-100 bg-white">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center px-6">
              <div className="rounded-2xl bg-primary-light p-4 mb-4 text-primary">
                <ClipboardList className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {tasks.length === 0 ? "No tasks yet" : `No ${filter.toLowerCase()} tasks`}
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {tasks.length === 0 ? "Create your first task to start organizing your work." : "Tasks matching this filter will appear here."}
              </p>
              {tasks.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-6 gap-2">
                  <Plus size={16} /> Create your first task
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              <AnimatePresence initial={false}>
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    className="group flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      aria-pressed={task.completed}
                      aria-label={task.completed ? `Mark "${task.title}" as not completed` : `Mark "${task.title}" as completed`}
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-5 sm:w-5"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                          task.completed ? "border-primary bg-primary text-white" : "border-slate-300 text-transparent hover:border-primary"
                        }`}
                      >
                        {task.completed ? <Check size={12} strokeWidth={3} /> : <Circle size={12} />}
                      </span>
                    </motion.button>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold transition-colors ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
                        {task.title}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{task.category}</Badge>
                        <Badge
                          variant={
                            task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "default"
                          }
                        >
                          {task.priority} priority
                        </Badge>
                        {task.dueDate && (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Due {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} aria-label={`Delete task "${task.title}"`} className="text-slate-400 hover:text-danger hover:bg-danger-light p-2 h-auto opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100">
                      <Trash2 size={16} />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Card>
      {!showForm && <Fab onClick={() => setShowForm(true)} label="Add task" />}
    </main>
  );
}