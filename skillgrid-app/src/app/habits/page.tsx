"use client";

import { uid } from "@/lib/utils";
import Fab from "@/components/ui/Fab";
import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Trash2,
  X,
  Check,
  Flame,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type Habit = {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  color: string;
  history: string[];
};

const HABIT_COLORS = {
  blue:   { from: "#3B5998", to: "#2F477A", soft: "#EAF0FA", label: "Blue" },
  emerald:{ from: "#10B981", to: "#059669", soft: "#D9F5E8", label: "Green" },
  amber:  { from: "#F59E0B", to: "#D97706", soft: "#FDEFD4", label: "Amber" },
  violet: { from: "#8B5CF6", to: "#7C3AED", soft: "#E9E2FD", label: "Violet" },
  rose:   { from: "#F43F5E", to: "#E11D48", soft: "#FBDCE2", label: "Rose" },
  slate:  { from: "#64748B", to: "#475569", soft: "#E2E8F0", label: "Slate" },
} as const;

type HabitColorKey = keyof typeof HABIT_COLORS;

const todayISO = () => new Date().toISOString().slice(0, 10);

function paletteFor(color: string) {
  return HABIT_COLORS[(color as HabitColorKey) ?? "blue"] ?? HABIT_COLORS.blue;
}

// Consecutive completed days ending today (or yesterday if today is not done yet).
function getStreak(history: string[]): number {
  const days = new Set(history);
  const cursor = new Date();
  if (!days.has(todayISO())) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const heatLevelColor = (count: number) =>
  count <= 0
    ? "#ECE9E0"
    : count === 1
      ? "#BBF7D0"
      : count === 2
        ? "#6EE7B7"
        : count === 3
          ? "#34D399"
          : "#059669";

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Study");
  const [color, setColor] = useState("blue");

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

  const heatmap = useMemo(() => {
    const counts = new Map<string, number>();
    for (const habit of habits) {
      for (const date of habit.history ?? []) {
        counts.set(date, (counts.get(date) ?? 0) + 1);
      }
    }
    const days: { date: string; count: number }[] = [];
    const now = new Date();
    for (let i = 83; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: counts.get(key) ?? 0 });
    }
    const weeks: { date: string; count: number }[][] = [];
    for (let w = 0; w < 12; w++) weeks.push(days.slice(w * 7, w * 7 + 7));
    const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0);
    return { weeks, total };
  }, [habits]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    const newHabit: Habit = {
      id: uid(),
      name: name.trim(),
      category,
      completed: false,
      color,
      history: [],
    };

    setHabits((current) => [...current, newHabit]);
    setName("");
    setCategory("Study");
    setColor("blue");
    setShowForm(false);
  }

  function toggleHabit(id: string) {
    const today = todayISO();
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== id) return habit;
        const completed = !habit.completed;
        const history = habit.history ?? [];
        return {
          ...habit,
          completed,
          history: completed
            ? history.includes(today)
              ? history
              : [...history, today]
            : history.filter((date) => date !== today),
        };
      })
    );
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }

  const longestStreak = habits.reduce(
    (max, habit) => Math.max(max, getStreak(habit.history ?? [])),
    0
  );

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 bg-[#F7F6F2] p-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          Productivity
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Habits</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Build consistent routines and track your daily habits.</p>
          </div>
          <Button onClick={() => setShowForm((current) => !current)} className="hidden gap-2 rounded-xl lg:inline-flex">
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close form" : "Add habit"}
          </Button>
        </div>
      </section>

      {/* Overview — asymmetric bento */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">01 · Overview</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          <Card className="rounded-3xl border border-[#E8E5DB] bg-white p-6 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-8 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Today&apos;s momentum</p>
                <p className="mt-3 text-5xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-6xl">
                  {stats.progress}<span className="text-3xl text-slate-400">%</span>
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#DC2626]">
                <Flame size={20} />
              </div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#F1EEE6]">
              <div
                className="h-full rounded-full bg-[#3B5998] transition-all duration-300"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-[#9AA0A6]">
              {stats.completed} of {stats.total} done · {stats.remaining} remaining today
            </p>
          </Card>
          <div className="flex flex-col gap-4">
            <Card className="flex flex-1 items-center gap-4 rounded-3xl border border-[#E8E5DB] bg-white p-5 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <Target size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">{stats.total}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Total habits</p>
              </div>
            </Card>
            <Card className="flex flex-1 items-center gap-4 rounded-3xl border border-[#E8E5DB] bg-white p-5 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF7E0] text-[#B97E0C]">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">{longestStreak}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Longest streak</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Activity heatmap */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">02 · Activity</p>
      <Card className="mt-3 rounded-3xl border border-[#E8E5DB] bg-white p-6 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Activity</h2>
            <p className="mt-1 text-sm text-[#6B7280]">Your completions across the last 12 weeks.</p>
          </div>
          <span className="rounded-full bg-[#F7F6F2] px-2.5 py-1 text-[11px] font-semibold text-slate-600 tabular-nums">
            {heatmap.total} {heatmap.total === 1 ? "check-in" : "check-ins"}
          </span>
        </div>
        {heatmap.total === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-[#E8E5DB] bg-white/60 px-6 py-10 text-center">
            <p className="text-sm text-[#6B7280]">Complete habits to start filling your activity map.</p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-[3px]" role="img" aria-label="Habit activity over the last 12 weeks">
              {heatmap.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.date}: ${day.count}`}
                      className="h-3 w-3 rounded-[4px]"
                      style={{ backgroundColor: heatLevelColor(day.count) }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-[#9AA0A6]">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className="h-3 w-3 rounded-[4px]"
                  style={{ backgroundColor: heatLevelColor(level) }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        )}
      </Card>

      {/* Add-habit form */}
      {showForm && (
        <Card className="rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
          <CardHeader className="border-b border-[#E8E5DB]">
            <CardTitle className="text-xl font-semibold tracking-tight">Add a habit</CardTitle>
            <p className="text-sm text-[#6B7280] font-normal">Create a habit you want to practice regularly.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="habit-name" className="mb-2 block text-sm font-semibold text-slate-700">Habit name *</label>
                  <Input
                    id="habit-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Practice Java DSA"
                    className="rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                  />
                </div>
                <div>
                  <label htmlFor="habit-category" className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                  <select
                    id="habit-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
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
              <div>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Color</span>
                <div className="flex items-center gap-2.5">
                  {(Object.keys(HABIT_COLORS) as HabitColorKey[]).map((key) => {
                    const palette = HABIT_COLORS[key];
                    const selected = color === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setColor(key)}
                        aria-label={`Use ${palette.label} color`}
                        aria-pressed={selected}
                        className={`h-12 w-12 rounded-2xl transition ${
                          selected
                            ? "ring-2 ring-offset-2 ring-slate-900"
                            : "hover:scale-110"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-[#E8E5DB] pt-5">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
                <Button type="submit" className="rounded-xl">Save habit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search habits..."
            aria-label="Search habits"
            className="h-12 rounded-xl border-[#E8E5DB] bg-white pl-9 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter habits by category"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All categories" : item}
            </option>
          ))}
        </select>
      </div>

      {/* Habit cards */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">03 · Daily habits</p>
        <div className="mb-4 mt-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Daily habits</h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">
              {filteredHabits.length} {filteredHabits.length === 1 ? "habit" : "habits"}
            </p>
          </div>
        </div>

        {filteredHabits.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
              <Target size={24} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {habits.length === 0 ? "No habits added yet" : "No matching habits"}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
              {habits.length === 0
                ? "Add your first habit to start tracking your daily routine."
                : "Try changing your search or category filter."}
            </p>
            {habits.length === 0 && (
              <Button onClick={() => setShowForm(true)} className="mt-6 gap-2 rounded-xl">
                <Plus size={16} /> Add first habit
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredHabits.map((habit) => {
              const palette = paletteFor(habit.color);
              const streak = getStreak(habit.history ?? []);
              const historySet = new Set(habit.history ?? []);
              return (
                <div
                  key={habit.id}
                  className="rounded-3xl border border-[#E8E5DB] bg-white p-6 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleHabit(habit.id)}
                        aria-label={
                          habit.completed
                            ? `Mark ${habit.name} incomplete`
                            : `Mark ${habit.name} complete`
                        }
                        aria-pressed={habit.completed}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <motion.span
                          key={String(habit.completed)}
                          initial={{ scale: 0.4 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${
                            habit.completed
                              ? "border-transparent text-white"
                              : "border-slate-300 text-transparent hover:border-primary"
                          }`}
                          style={
                            habit.completed
                              ? {
                                  background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
                                }
                              : undefined
                          }
                        >
                          <Check size={14} />
                        </motion.span>
                      </motion.button>
                      <div className="min-w-0">
                        <p className={`truncate text-base font-semibold ${
                          habit.completed ? "text-slate-400 line-through" : "text-slate-900"
                        }`}>
                          {habit.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#9AA0A6]">
                          <span className="rounded-full px-2 py-0.5 font-semibold" style={{ backgroundColor: palette.soft, color: palette.from }}>
                            {habit.category}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteHabit(habit.id)} aria-label={`Delete habit "${habit.name}"`} className="h-11 w-11 shrink-0 rounded-xl p-0 text-slate-400 hover:bg-danger-light hover:text-danger">
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="mt-5 border-t border-[#E8E5DB] pt-5">
                    <div className="flex items-center gap-2.5">
                      <Flame size={30} style={{ color: palette.from }} aria-hidden="true" />
                      <p className="text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                        {streak}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Day streak
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Last 7 days</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {Array.from({ length: 7 }).map((_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() - (6 - i));
                        const key = d.toISOString().slice(0, 10);
                        const done = historySet.has(key);
                        return (
                          <span
                            key={key}
                            title={key}
                            className="h-3.5 w-3.5 rounded-full transition"
                            style={{
                              background: done
                                ? `linear-gradient(135deg, ${palette.from}, ${palette.to})`
                                : "#ECE9E0",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <p className="pt-4 text-center text-xs text-slate-400">
        Habit data is currently held in page state and resets when you refresh.
        Daily history and streaks will require database persistence.
      </p>
      {!showForm && <Fab onClick={() => setShowForm(true)} label="Add habit" />}
    </main>
  );
}
