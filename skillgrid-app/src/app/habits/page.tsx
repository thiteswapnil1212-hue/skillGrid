"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Trash2,
  X,
  Check,
  Flame,
  Target,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

type Habit = {
  id: string;
  name: string;
  category: string;
  completed: boolean;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Study");

  const stats = useMemo(() => {
    const completed = habits.filter((habit) => habit.completed).length;

    return {
      total: habits.length,
      completed,
      remaining: habits.length - completed,
      progress:
        habits.length === 0
          ? 0
          : Math.round((completed / habits.length) * 100),
    };
  }, [habits]);

  const categories = useMemo(
    () => ["All", ...new Set(habits.map((habit) => habit.category))],
    [habits]
  );

  const filteredHabits = useMemo(() => {
    const query = search.trim().toLowerCase();

    return habits.filter((habit) => {
      const matchesSearch =
        habit.name.toLowerCase().includes(query) ||
        habit.category.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" || habit.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [habits, search, categoryFilter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      completed: false,
    };

    setHabits((current) => [...current, newHabit]);
    setName("");
    setCategory("Study");
    setShowForm(false);
  }

  function toggleHabit(id: string) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Target size={16} />
            <span>Productivity</span>
            <span>/</span>
            <span>Habits</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Habits</h1>
          <p className="mt-2 text-sm text-slate-500">Build consistent routines and track your daily habits.</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)} className="gap-2">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close form" : "Add habit"}
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total habits", value: stats.total, icon: Target, color: "text-slate-400" },
          { label: "Completed today", value: stats.completed, icon: CheckCircle2, color: "text-success" },
          { label: "Remaining today", value: stats.remaining, icon: CircleDashed, color: "text-warning" },
          { label: "Daily progress", value: `${stats.progress}%`, icon: Flame, color: "text-orange-500" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <Icon size={18} className={stat.color} />
                </div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Today's progress bar */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">Today&apos;s progress</h2>
              <p className="mt-1 text-sm text-slate-500">
                {stats.completed} of {stats.total} habits completed
              </p>
            </div>
            <span className="text-lg font-semibold text-primary">{stats.progress}%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add a habit</CardTitle>
            <p className="text-sm text-slate-500 font-normal">Create a habit you want to practice regularly.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Habit name *</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Practice Java DSA"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Study</option>
                    <option>Development</option>
                    <option>Health</option>
                    <option>Personal</option>
                    <option>Productivity</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save habit</Button>
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
            placeholder="Search habits..."
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
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle>Daily habits</CardTitle>
          <span className="text-sm text-slate-500">
            {filteredHabits.length} {filteredHabits.length === 1 ? "habit" : "habits"}
          </span>
        </CardHeader>
        <div>
          {filteredHabits.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <Target size={24} className="text-slate-400 mb-4" />
              <h3 className="font-medium text-slate-900">
                {habits.length === 0 ? "No habits added yet" : "No matching habits"}
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">
                {habits.length === 0
                  ? "Add your first habit to start tracking your daily routine."
                  : "Try changing your search or category filter."}
              </p>
              {habits.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-5 gap-2">
                  <Plus size={16} /> Add first habit
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredHabits.map((habit) => (
                <div key={habit.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/50 transition">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      aria-label={
                        habit.completed
                          ? `Mark ${habit.name} incomplete`
                          : `Mark ${habit.name} complete`
                      }
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                        habit.completed
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 text-transparent hover:border-primary"
                      }`}
                    >
                      <Check size={14} />
                    </button>
                    <div className="min-w-0">
                      <p className={`truncate text-sm font-medium ${
                        habit.completed ? "text-slate-400 line-through" : "text-slate-900"
                      }`}>
                        {habit.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{habit.category}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteHabit(habit.id)} className="p-2 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <p className="text-xs text-center text-slate-400 pt-4">
        Habit data is currently held in page state and resets when you refresh.
        Daily history and streaks will require database persistence.
      </p>
    </main>
  );
}