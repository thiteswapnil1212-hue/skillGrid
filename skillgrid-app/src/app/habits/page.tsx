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

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Productivity
          </p>
          <h1 className="mt-2 font-display text-[1.8rem] font-medium leading-[1.15] text-slate-900 sm:text-[2.15rem]">Habits</h1>
          <p className="mt-1 text-sm text-slate-500">Build consistent routines and track your daily habits.</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)} className="hidden gap-2 lg:inline-flex">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close form" : "Add habit"}
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total habits", value: stats.total, icon: Target, tile: "from-[#3B5998] to-[#2F477A]" },
          { label: "Completed today", value: stats.completed, icon: CheckCircle2, tile: "from-emerald-500 to-emerald-600" },
          { label: "Remaining today", value: stats.remaining, icon: CircleDashed, tile: "from-amber-500 to-amber-600" },
          { label: "Daily progress", value: `${stats.progress}%`, icon: Flame, tile: "from-rose-500 to-rose-600" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="rounded-2xl border-0 p-5 ring-1 ring-slate-200/60">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</p>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.tile} text-white shadow-sm`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{stat.value}</p>
            </Card>
          );
        })}
      </section>

      {/* Activity heatmap */}
      <Card className="rounded-2xl border-0 ring-1 ring-slate-200/60">
        <CardHeader className="pb-2">
          <CardTitle>Activity</CardTitle>
          <p className="text-sm text-slate-500 font-normal">Your completions across the last 12 weeks.</p>
        </CardHeader>
        <CardContent>
          {heatmap.total === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-6 py-10 text-center">
              <p className="text-sm text-slate-500">Complete habits to start filling your activity map.</p>
            </div>
          ) : (
            <>
              <div className="flex gap-[3px]" role="img" aria-label="Habit activity over the last 12 weeks">
                {heatmap.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <span
                        key={day.date}
                        title={`${day.date}: ${day.count}`}
                        className="h-3 w-3 rounded-[3px]"
                        style={{ backgroundColor: heatLevelColor(day.count) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-slate-500">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="h-3 w-3 rounded-[3px]"
                    style={{ backgroundColor: heatLevelColor(level) }}
                  />
                ))}
                <span>More</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Today's progress bar */}
      <Card className="rounded-2xl border-0 ring-1 ring-slate-200/60">
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
        <Card className="rounded-2xl border-0 ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle>Add a habit</CardTitle>
            <p className="text-sm text-slate-500 font-normal">Create a habit you want to practice regularly.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="habit-name" className="mb-2 block text-sm font-medium text-slate-700">Habit name *</label>
                  <Input
                    id="habit-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Practice Java DSA"
                  />
                </div>
                <div>
                  <label htmlFor="habit-category" className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    id="habit-category"
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
              <div>
                <span className="mb-2 block text-sm font-medium text-slate-700">Color</span>
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
                        className={`h-7 w-7 rounded-full transition ${
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
            aria-label="Search habits"
            className="pl-9 bg-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter habits by category"
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All categories" : item}
            </option>
          ))}
        </select>
      </div>

      <Card className="rounded-2xl border-0 ring-1 ring-slate-200/60">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle>Daily habits</CardTitle>
          <span className="text-sm text-slate-500">
            {filteredHabits.length} {filteredHabits.length === 1 ? "habit" : "habits"}
          </span>
        </CardHeader>
        <div>
          {filteredHabits.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light p-4 text-primary">
                <Target size={24} />
              </div>
              <h3 className="font-display text-xl font-medium text-slate-900">
                {habits.length === 0 ? "No habits added yet" : "No matching habits"}
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
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
              {filteredHabits.map((habit) => {
                const palette = paletteFor(habit.color);
                const streak = getStreak(habit.history ?? []);
                return (
                <div key={habit.id} className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-50">
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
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <motion.span
                        key={String(habit.completed)}
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
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
                      <p className={`truncate text-sm font-medium ${
                        habit.completed ? "text-slate-400 line-through" : "text-slate-900"
                      }`}>
                        {habit.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                        <span>{habit.category}</span>
                        {streak > 0 && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <Flame size={14} className="text-amber-500" />
                            {streak}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteHabit(habit.id)} aria-label={`Delete habit "${habit.name}"`} className="p-2 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                    <Trash2 size={16} />
                  </Button>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      <p className="text-xs text-center text-slate-400 pt-4">
        Habit data is currently held in page state and resets when you refresh.
        Daily history and streaks will require database persistence.
      </p>
      {!showForm && <Fab onClick={() => setShowForm(true)} label="Add habit" />}
    </main>
  );
}