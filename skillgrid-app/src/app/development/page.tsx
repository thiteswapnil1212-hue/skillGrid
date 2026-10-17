"use client";

import { uid } from "@/lib/utils";
import { useMemo, useState, type FormEvent } from "react";
import {
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

const statusBand: Record<LearningStatus, string> = {
  Completed: "bg-[#2F9E44]",
  "In progress": "bg-[#3B5998]",
  "Not started": "bg-[#D8D4C8]",
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

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

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
      id: uid(),
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
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">Learning</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Development</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Organize your technical learning and track what you have completed.</p>
          </div>
          <Button onClick={() => setShowForm((current) => !current)} className="gap-2 rounded-xl">
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close form" : "Add learning item"}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-3xl bg-[#1E293B] p-6 text-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-8 lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
              {stats.total} {stats.total === 1 ? "topic" : "topics"}
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
              <BookOpen size={20} />
            </div>
          </div>
          <p className="mt-4 text-5xl font-semibold tracking-tight text-white tabular-nums sm:text-6xl">{stats.completed}</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Completed</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${completionRate}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-300/70">{stats.inProgress} in progress · {stats.notStarted} not started</p>
        </div>

        <Card className="rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] lg:col-span-2">
          <CardContent className="p-6">
            <div className="divide-y divide-[#E8E5DB]">
              {[
                { label: "Total topics", value: stats.total, icon: BookOpen, tint: "bg-[#EAF0FA] text-[#3B5998]" },
                { label: "In progress", value: stats.inProgress, icon: Clock3, tint: "bg-[#FFF7E0] text-[#B97E0C]" },
                { label: "Not started", value: stats.notStarted, icon: CircleDashed, tint: "bg-[#F7F6F2] text-[#9AA0A6]" },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${row.tint}`}>
                      <Icon size={20} />
                    </div>
                    <p className="flex-1 text-sm font-semibold text-slate-700">{row.label}</p>
                    <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">{row.value}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {showForm && (
        <Card className="overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold tracking-tight">Add learning item</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} aria-label="Close form" className="h-12 w-12 p-0 text-slate-400 hover:text-slate-700">
                <X size={18} />
              </Button>
            </div>
            <p className="mt-1 text-sm text-[#6B7280]">Add a skill, technology, or topic you want to learn.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="dev-topic" className="mb-2 block text-sm font-semibold text-slate-700">Topic or skill *</label>
                  <Input
                    id="dev-topic"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. React Hooks, REST APIs, Java DSA"
                    className="rounded-xl border-[#E8E5DB]"
                  />
                </div>
                <div>
                  <label htmlFor="dev-category" className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                  <select
                    id="dev-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
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
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Initial status</label>
                  <div className="flex h-12 items-center rounded-xl border border-[#E8E5DB] bg-[#F7F6F2] px-3 text-sm text-slate-600">
                    Not started
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="dev-notes" className="mb-2 block text-sm font-semibold text-slate-700">Notes (optional)</label>
                  <textarea
                    id="dev-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add a short note about what you want to learn..."
                    rows={3}
                    className="flex w-full resize-y rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-[#E8E5DB] pt-5">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)} className="rounded-xl border-[#E8E5DB]">Cancel</Button>
                <Button type="submit" className="rounded-xl">Save item</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3 rounded-2xl border border-[#E8E5DB] bg-white p-2 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics, categories or notes..."
            aria-label="Search learning items"
            className="h-12 rounded-xl border-[#E8E5DB] bg-white pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
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
          aria-label="Filter by status"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
        >
          <option value="All">All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Learning roadmap</h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <BookOpen size={28} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {items.length === 0 ? "Your roadmap is empty" : "No matching learning items"}
              </h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
                {items.length === 0
                  ? "Add a skill or topic to start building your learning roadmap."
                  : "Try changing your search or filters."}
              </p>
              {items.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-6 gap-2 rounded-xl">
                  <Plus size={16} /> Add first item
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredItems.map((item) => (
                <article key={item.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)]">
                  <div className={`h-1.5 w-full ${statusBand[item.status]}`} />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#EAF0FA] px-2.5 py-1 text-[11px] font-semibold text-[#3B5998]">{item.category}</span>
                    </div>
                    {item.notes && (
                      <p className="mt-3 whitespace-pre-wrap text-sm text-[#6B7280]">{item.notes}</p>
                    )}
                    <div className="flex-1" />
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8E5DB] pt-4">
                      <div className="relative">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value as LearningStatus)}
                          aria-label={`Status for ${item.title}`}
                          className={`h-12 appearance-none rounded-full border-0 py-1.5 pl-4 pr-10 text-xs font-semibold outline-none cursor-pointer ${
                            item.status === "Completed"
                              ? "bg-[#EAF7EC] text-[#2F9E44]"
                              : item.status === "In progress"
                                ? "bg-[#EAF0FA] text-[#3B5998]"
                                : "bg-[#F7F6F2] text-slate-700"
                          }`}
                        >
                          {statuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-current opacity-60" />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)} aria-label={`Delete learning item "${item.title}"`} className="h-12 w-12 rounded-xl p-0 text-slate-400 hover:text-danger hover:bg-danger-light">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <p className="text-xs text-center text-slate-400 pt-4">
        Learning items are currently held in page state and reset when you refresh...
      </p>
    </main>
  );
}
