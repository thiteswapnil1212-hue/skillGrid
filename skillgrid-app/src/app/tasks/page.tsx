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

// Local-timezone-safe ISO date (yyyy-mm-dd) for date-group comparisons.
function localISODate(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function TaskCheckbox({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.75 }}
      type="button"
      onClick={() => onToggle(task.id)}
      aria-pressed={task.completed}
      aria-label={task.completed ? `Mark "${task.title}" as not completed` : `Mark "${task.title}" as completed`}
      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-5 sm:w-5"
    >
      <motion.span
        key={String(task.completed)}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
          task.completed ? "border-primary bg-primary text-white" : "border-slate-300 text-transparent hover:border-primary"
        }`}
      >
        {task.completed ? <Check size={12} strokeWidth={3} /> : <Circle size={12} />}
      </motion.span>
    </motion.button>
  );
}

export default function TasksPage() {
  const showSnackbar = useSnackbar();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"list" | "timeline">("list");

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

  const todayStr = localISODate();
  const tomorrowStr = localISODate(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const timelineGroups = [
    { key: "overdue", label: "Overdue", tasks: [] as Task[] },
    { key: "today", label: "Today", tasks: [] as Task[] },
    { key: "tomorrow", label: "Tomorrow", tasks: [] as Task[] },
    { key: "upcoming", label: "Upcoming", tasks: [] as Task[] },
    { key: "nodate", label: "No due date", tasks: [] as Task[] },
  ];
  for (const task of filteredTasks) {
    if (!task.dueDate) timelineGroups[4].tasks.push(task);
    else if (task.dueDate < todayStr) timelineGroups[task.completed ? 1 : 0].tasks.push(task);
    else if (task.dueDate === todayStr) timelineGroups[1].tasks.push(task);
    else if (task.dueDate === tomorrowStr) timelineGroups[2].tasks.push(task);
    else timelineGroups[3].tasks.push(task);
  }
  const visibleGroups = timelineGroups.filter((group) => group.tasks.length > 0);

  const priorityDot: Record<string, string> = {
    High: "bg-rose-500",
    Medium: "bg-amber-500",
    Low: "bg-slate-400",
  };

  const priorityBar: Record<string, string> = {
    High: "bg-[#DC2626]",
    Medium: "bg-[#F59E0B]",
    Low: "bg-[#CBD5E1]",
  };

  const priorityPillActive: Record<string, string> = {
    High: "border-[#DC2626]/30 bg-[#FEF2F2] text-[#DC2626]",
    Medium: "border-[#B97E0C]/30 bg-[#FFF7E0] text-[#B97E0C]",
    Low: "border-slate-300 bg-slate-100 text-slate-600",
  };

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

  const pendingCount = tasks.length - completedCount;
  const donePct = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 bg-[#F7F6F2] p-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">Workspace</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Tasks
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Organize your work, set priorities, and track completion.
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="hidden gap-2 rounded-xl lg:inline-flex">
            <Plus size={16} />
            Add task
          </Button>
        </div>
      </section>

      {/* Overview — asymmetric bento with dark contrast card */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">01 · Overview</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl bg-[#1E293B] p-6 text-white sm:p-8 lg:col-span-2">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#3B5998]/25 blur-[80px]" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300/70">Pending right now</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">{pendingCount}</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-xs text-slate-300/70">
                  <span>{completedCount} of {tasks.length} done</span>
                  <span className="tabular-nums">{donePct}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all duration-300"
                    style={{ width: `${donePct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="flex flex-1 items-center gap-4 rounded-3xl border border-[#E8E5DB] bg-white p-5 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7EC] text-[#2F9E44]">
                <Check size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">{completedCount}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Completed</p>
              </div>
            </Card>
            <Card className="flex flex-1 items-center gap-4 rounded-3xl border border-[#E8E5DB] bg-white p-5 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <ClipboardList size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">{tasks.length}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Total tasks</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Add-task form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-[#E8E5DB] pb-4">
                <CardTitle className="text-xl font-semibold tracking-tight">Create task</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} aria-label="Close form" className="h-11 w-11 rounded-xl p-0 text-slate-400 hover:text-slate-700">
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
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
                      className="rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="task-category" className="mb-2 block text-sm font-semibold text-slate-700">
                        Category
                      </label>
                      <select
                        id="task-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex h-12 w-full rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
                      >
                        {categories.map((item) => (
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
                        className="h-12 rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                      />
                    </div>
                  </div>

                  <div>
                    <span id="task-priority-label" className="mb-2 block text-sm font-semibold text-slate-700">
                      Priority
                    </span>
                    <div role="group" aria-labelledby="task-priority-label" className="flex gap-2">
                      {priorities.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setPriority(item)}
                          aria-pressed={priority === item}
                          className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-all ${
                            priority === item
                              ? priorityPillActive[item]
                              : "border-[#E8E5DB] bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${priorityDot[item]}`} />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-[#E8E5DB] pt-5">
                    <Button variant="ghost" type="button" onClick={() => setShowForm(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl">Create task</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar: filters + view segmented */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 self-start rounded-2xl border border-[#E8E5DB] bg-white p-1.5 shadow-sm">
          {["All", "Pending", "Completed"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                filter === item
                  ? "bg-[#3B5998] text-white shadow-sm"
                  : "text-slate-500 hover:bg-[#F7F6F2] hover:text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div role="tablist" aria-label="Task list view" className="flex gap-1 self-start rounded-2xl border border-[#E8E5DB] bg-white p-1.5 shadow-sm sm:self-auto">
          {(["list", "timeline"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={view === option}
              onClick={() => setView(option)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold capitalize transition-all ${
                view === option
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-[#F7F6F2] hover:text-slate-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">02 · Your list</p>
        <div className="mb-4 mt-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">All tasks</h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your list
            </p>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {tasks.length === 0 ? "No tasks yet" : `No ${filter.toLowerCase()} tasks`}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
              {tasks.length === 0 ? "Create your first task to start organizing your work." : "Tasks matching this filter will appear here."}
            </p>
            {tasks.length === 0 && (
              <Button onClick={() => setShowForm(true)} className="mt-6 gap-2 rounded-xl">
                <Plus size={16} /> Create your first task
              </Button>
            )}
          </div>
        ) : view === "timeline" ? (
          <div className="space-y-8">
            {visibleGroups.map((group) => (
              <section key={group.key}>
                <div className="sticky top-0 z-10 -mx-1 bg-[#F7F6F2]/95 py-2 backdrop-blur">
                  <div className="flex items-center gap-2.5">
                    {group.key === "today" ? (
                      <span className="rounded-full bg-[#3B5998] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                        Today
                      </span>
                    ) : (
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {group.label}
                      </h4>
                    )}
                    <span className="rounded-full border border-[#E8E5DB] bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 tabular-nums">
                      {group.tasks.length}
                    </span>
                  </div>
                </div>
                <ul className="mt-3 space-y-2 border-l border-[#E8E5DB] pl-4">
                  {group.tasks.map((task) => (
                    <motion.li
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-2xl border border-[#E8E5DB] bg-white p-3 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${priorityDot[task.priority] ?? "bg-slate-400"}`}
                      />
                      <TaskCheckbox task={task} onToggle={toggleTask} />
                      <p className={`min-w-0 flex-1 text-sm font-semibold transition-all ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
                        {task.title}
                      </p>
                      <Badge variant="outline">{task.category}</Badge>
                    </motion.li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  className="group flex items-start gap-4 rounded-2xl border border-[#E8E5DB] bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className={`w-1 shrink-0 self-stretch rounded-full ${priorityBar[task.priority] ?? "bg-[#CBD5E1]"}`}
                  />
                  <TaskCheckbox task={task} onToggle={toggleTask} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold transition-all ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
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
                        <span className="rounded-full bg-[#F7F6F2] px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                          Due {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} aria-label={`Delete task "${task.title}"`} className="h-11 w-11 rounded-xl p-0 text-slate-400 transition-opacity hover:bg-danger-light hover:text-danger lg:opacity-0 lg:group-hover:opacity-100 lg:focus:opacity-100">
                    <Trash2 size={16} />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
      {!showForm && <Fab onClick={() => setShowForm(true)} label="Add task" />}
    </main>
  );
}
