"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  Award,
  LockKeyhole,
  Search,
  Target,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  category: string;
  unlocked: boolean;
};

const initialAchievements: Achievement[] = [
  {
    id: "first-task",
    title: "First Step",
    description: "Complete your first task.",
    category: "Tasks",
    unlocked: false,
  },
  {
    id: "task-master",
    title: "Task Master",
    description: "Complete 10 tasks.",
    category: "Tasks",
    unlocked: false,
  },
  {
    id: "dsa-starter",
    title: "DSA Starter",
    description: "Solve your first DSA problem.",
    category: "DSA",
    unlocked: false,
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    description: "Solve 25 DSA problems.",
    category: "DSA",
    unlocked: false,
  },
  {
    id: "consistent-learner",
    title: "Consistent Learner",
    description: "Complete 7 days of learning activity.",
    category: "Consistency",
    unlocked: false,
  },
  {
    id: "focus-champion",
    title: "Focus Champion",
    description: "Complete 10 focus sessions.",
    category: "Focus",
    unlocked: false,
  },
  {
    id: "challenge-complete",
    title: "Challenge Accepted",
    description: "Complete your first challenge.",
    category: "Challenges",
    unlocked: false,
  },
  {
    id: "habit-builder",
    title: "Habit Builder",
    description: "Complete your first habit.",
    category: "Habits",
    unlocked: false,
  },
];

const categories = [
  "All",
  "Tasks",
  "DSA",
  "Consistency",
  "Focus",
  "Challenges",
  "Habits",
];

export default function AchievementsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [achievements] = useState<Achievement[]>(initialAchievements);

  const unlockedCount = useMemo(
    () => achievements.filter((item) => item.unlocked).length,
    [achievements]
  );

  const lockedCount = achievements.length - unlockedCount;

  const progressPercentage =
    achievements.length > 0
      ? Math.round((unlockedCount / achievements.length) * 100)
      : 0;

  const filteredAchievements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return achievements.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Unlocked"
            ? item.unlocked
            : filter === "Locked"
              ? !item.unlocked
              : item.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [achievements, search, filter]);

  function clearSearch() {
    setSearch("");
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Award size={16} />
              <span>Personal Growth</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Achievements</span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Achievements
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Track meaningful milestones across your tasks, DSA, habits,
              focus sessions, and learning journey.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <Trophy size={21} className="text-primary" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Collection progress
              </p>
              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {unlockedCount}/{achievements.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
            <Trophy size={30} className="text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Your achievement collection
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {unlockedCount === 0
                    ? "Your first achievement is waiting to be unlocked."
                    : `${unlockedCount} achievement${
                        unlockedCount === 1 ? "" : "s"
                      } unlocked so far.`}
                </p>
              </div>

              <span className="text-sm font-semibold text-slate-700">
                {progressPercentage}%
              </span>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-500">Total</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {achievements.length}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Unlocked</p>
            <p className="mt-1 text-xl font-bold text-emerald-600">
              {unlockedCount}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Remaining</p>
            <p className="mt-1 text-xl font-bold text-slate-700">
              {lockedCount}
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search achievements..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = filter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setFilter("Unlocked")}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                filter === "Unlocked"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Unlocked
            </button>

            <button
              type="button"
              onClick={() => setFilter("Locked")}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                filter === "Locked"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Locked
            </button>
          </div>
        </div>
      </section>

      {/* Result Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Achievement library
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredAchievements.length} of {achievements.length}{" "}
            achievements
          </p>
        </div>

        {(search || filter !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("All");
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Achievement Cards */}
      {filteredAchievements.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Search size={25} className="text-slate-400" />
          </div>

          <h3 className="mt-5 font-semibold text-slate-900">
            No achievements found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            No achievement matches your current search or filter. Try
            something different.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("All");
            }}
            className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Show all achievements
          </button>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAchievements.map((item) => (
            <article
              key={item.id}
              className={`group rounded-2xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                item.unlocked
                  ? "border-primary/20"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    item.unlocked
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {item.unlocked ? (
                    <Trophy size={23} />
                  ) : (
                    <LockKeyhole size={22} />
                  )}
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    item.unlocked
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.unlocked && <CheckCircle2 size={13} />}

                  {item.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className={
                      item.unlocked ? "text-primary" : "text-slate-400"
                    }
                  />

                  <span className="text-xs font-medium text-slate-500">
                    {item.category}
                  </span>
                </div>

                {item.unlocked && (
                  <span className="text-xs font-medium text-emerald-600">
                    Earned
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Tracking Information */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <Target size={18} className="text-primary" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Achievement tracking
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              These achievements are currently definitions only. Automatic
              unlocking will require connecting tasks, DSA, habits, focus
              sessions, challenges, and other activity to a shared data source.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}