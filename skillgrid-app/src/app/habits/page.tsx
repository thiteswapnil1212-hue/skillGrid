
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
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Target size={16} />
            <span>Productivity</span>
            <span>/</span>
            <span>Habits</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Habits
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Build consistent routines and track your daily habits.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304b85]"
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Close form" : "Add habit"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total habits", value: stats.total, icon: Target },
          { label: "Completed today", value: stats.completed, icon: CheckCircle2 },
          { label: "Remaining today", value: stats.remaining, icon: CircleDashed },
          { label: "Daily progress", value: `${stats.progress}%`, icon: Flame },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-2">
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

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">Today&apos;s progress</h2>
            <p className="mt-1 text-sm text-slate-500">
              {stats.completed} of {stats.total} habits completed
            </p>
          </div>

          <span className="text-lg font-semibold text-[#3B5998]">
            {stats.progress}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#3B5998] transition-all duration-300"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </section>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Add a habit
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a habit you want to practice regularly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Habit name *
              </label>

              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Practice Java DSA"
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
                <option>Study</option>
                <option>Development</option>
                <option>Health</option>
                <option>Personal</option>
                <option>Productivity</option>
                <option>Other</option>
              </select>
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
              Save habit
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
            placeholder="Search habits..."
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
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Daily habits</h2>
          <span className="text-sm text-slate-500">
            {filteredHabits.length}{" "}
            {filteredHabits.length === 1 ? "habit" : "habits"}
          </span>
        </div>

        {filteredHabits.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Target size={22} className="text-slate-500" />
            </div>

            <h3 className="mt-4 font-medium text-slate-900">
              {habits.length === 0
                ? "No habits added yet"
                : "No matching habits"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {habits.length === 0
                ? "Add your first habit to start tracking your daily routine."
                : "Try changing your search or category filter."}
            </p>

            {habits.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#304b85]"
              >
                <Plus size={16} />
                Add first habit
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
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
                        ? "border-[#3B5998] bg-[#3B5998] text-white"
                        : "border-slate-300 text-transparent hover:border-[#3B5998]"
                    }`}
                  >
                    <Check size={14} />
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-medium ${
                        habit.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-900"
                      }`}
                    >
                      {habit.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {habit.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteHabit(habit.id)}
                  aria-label={`Delete ${habit.name}`}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Habit data is currently held in page state and resets when you refresh.
        Daily history and streaks will require database persistence.
      </p>
    </div>
  );
}