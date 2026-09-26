
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Code2,
  Plus,
  Search,
  Trash2,
  X,
  BookOpen,
  CheckCircle2,
  CircleDashed,
  Clock3,
  ChevronDown,
} from "lucide-react";

type LearningStatus = "Not started" | "In progress" | "Completed";

type LearningItem = {
  id: string;
  title: string;
  category: string;
  status: LearningStatus;
  notes: string;
};

const statuses: LearningStatus[] = [
  "Not started",
  "In progress",
  "Completed",
];

const statusStyles: Record<LearningStatus, string> = {
  "Not started": "bg-slate-100 text-slate-600",
  "In progress": "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

export default function DevelopmentPage() {
  const [items, setItems] = useState<LearningItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [notes, setNotes] = useState("");

  const stats = useMemo(
    () => ({
      total: items.length,
      completed: items.filter((item) => item.status === "Completed").length,
      inProgress: items.filter((item) => item.status === "In progress").length,
      notStarted: items.filter((item) => item.status === "Not started").length,
    }),
    [items]
  );

  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.category))],
    [items]
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.notes.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, search, categoryFilter, statusFilter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    const newItem: LearningItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category,
      status: "Not started",
      notes: notes.trim(),
    };

    setItems((current) => [newItem, ...current]);
    setTitle("");
    setNotes("");
    setCategory("Web Development");
    setShowForm(false);
  }

  function updateStatus(id: string, status: LearningStatus) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  }

  function deleteItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Code2 size={16} />
            <span>Learning</span>
            <span>/</span>
            <span>Development</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Development
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organize your technical learning and track what you have completed.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304b85]"
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Close form" : "Add learning item"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total topics", value: stats.total, icon: BookOpen },
          { label: "Completed", value: stats.completed, icon: CheckCircle2 },
          { label: "In progress", value: stats.inProgress, icon: Clock3 },
          { label: "Not started", value: stats.notStarted, icon: CircleDashed },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <Icon size={18} className="text-slate-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Add learning item
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a skill, technology, or topic you want to learn.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Topic or skill *
              </label>
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. React Hooks, REST APIs, Java DSA"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998]"
              >
                <option>Web Development</option>
                <option>AI / ML</option>
                <option>Backend Development</option>
                <option>Programming Languages</option>
                <option>Tools & Platforms</option>
                <option>System Design</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Initial status
              </label>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600">
                Not started
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add a short note about what you want to learn..."
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#3B5998] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#304b85]"
            >
              Save item
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search topics, categories or notes..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3B5998]"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All categories" : item}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3B5998]"
        >
          <option value="All">All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Learning roadmap</h2>
          <span className="text-sm text-slate-500">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <BookOpen size={22} className="text-slate-500" />
            </div>
            <h3 className="mt-4 font-medium text-slate-900">
              {items.length === 0
                ? "Your roadmap is empty"
                : "No matching learning items"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {items.length === 0
                ? "Add a skill or topic to start building your learning roadmap."
                : "Try changing your search or filters."}
            </p>

            {items.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#304b85]"
              >
                <Plus size={16} />
                Add first item
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-medium text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.category}
                  </p>
                  {item.notes && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500">
                      {item.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={item.status}
                      onChange={(event) =>
                        updateStatus(
                          item.id,
                          event.target.value as LearningStatus
                        )
                      }
                      aria-label={`Status for ${item.title}`}
                      className={`appearance-none rounded-full border-0 py-2 pl-3 pr-8 text-xs font-medium outline-none ${statusStyles[item.status]}`}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    aria-label={`Delete ${item.title}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Learning items are currently held in page state and reset when you
        refresh. Database persistence will be added separately.
      </p>
    </div>
  );
}