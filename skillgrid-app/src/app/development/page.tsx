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
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

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
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Code2 size={16} />
            <span>Learning</span>
            <span>/</span>
            <span>Development</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Development
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Organize your technical learning and track what you have completed.
          </p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)} className="gap-2">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close form" : "Add learning item"}
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total topics", value: stats.total, icon: BookOpen, color: "text-slate-400" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-success" },
          { label: "In progress", value: stats.inProgress, icon: Clock3, color: "text-primary" },
          { label: "Not started", value: stats.notStarted, icon: CircleDashed, color: "text-slate-400" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <Icon size={18} className={stat.color} />
                </div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add learning item</CardTitle>
            <p className="text-sm text-slate-500 font-normal">Add a skill, technology, or topic you want to learn.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Topic or skill *</label>
                  <Input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. React Hooks, REST APIs, Java DSA"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Web Development</option>
                    <option>AI / ML</option>
                    <option>Backend Development</option>
                    <option>Programming Languages</option>
                    <option>Tools &amp; Platforms</option>
                    <option>System Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Initial status</label>
                  <div className="flex h-10 items-center rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
                    Not started
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add a short note about what you want to learn..."
                    rows={3}
                    className="flex w-full resize-y rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save item</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics, categories or notes..."
            className="pl-9 bg-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All categories" : item}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle>Learning roadmap</CardTitle>
          <span className="text-sm text-slate-500">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
          </span>
        </CardHeader>
        <div>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <BookOpen size={24} className="text-slate-400 mb-4" />
              <h3 className="font-medium text-slate-900">
                {items.length === 0 ? "Your roadmap is empty" : "No matching learning items"}
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">
                {items.length === 0
                  ? "Add a skill or topic to start building your learning roadmap."
                  : "Try changing your search or filters."}
              </p>
              {items.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-5 gap-2">
                  <Plus size={16} /> Add first item
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/50 transition">
                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{item.category}</p>
                    {item.notes && (
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500">{item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value as LearningStatus)}
                        aria-label={`Status for ${item.title}`}
                        className={`appearance-none rounded-full border-0 py-1.5 pl-3 pr-8 text-xs font-semibold outline-none ${
                          item.status === "Completed"
                            ? "bg-success-light text-success"
                            : item.status === "In progress"
                              ? "bg-primary-light text-primary"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {statuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)} className="p-2 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <p className="text-xs text-center text-slate-400 pt-4">
        Learning items are currently held in page state and reset when you refresh. Database persistence will be added separately.
      </p>
    </main>
  );
}