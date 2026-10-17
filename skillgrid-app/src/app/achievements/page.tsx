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

const categoryTints: Record<string, string> = {
  Tasks: "bg-[#EAF0FA] text-[#3B5998]",
  DSA: "bg-[#F3E8FF] text-[#7C3AED]",
  Consistency: "bg-[#EAF7EC] text-[#2F9E44]",
  Focus: "bg-[#FFF7E0] text-[#B97E0C]",
  Challenges: "bg-[#FEF2F2] text-[#DC2626]",
  Habits: "bg-[#EAF7EC] text-[#2F9E44]",
};

const cardShadow =
  "shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";
const cardHover =
  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)]";

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

  const pillFor = (active: boolean) =>
    `min-h-[48px] whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5998] ${
      active
        ? "bg-[#3B5998] text-white shadow-sm"
        : "border border-[#E8E5DB] bg-white text-[#6B7280] hover:border-[#3B5998] hover:text-[#3B5998]"
    }`;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          <Award size={14} />
          Personal Growth
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
          Achievements
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#6B7280]">
          Track meaningful milestones across your tasks, DSA, habits, focus
          sessions, and learning journey.
        </p>
      </section>

      {/* Progress hero — dark contrast */}
      <section className="rounded-3xl bg-[#1E293B] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300/70">
              Collection progress
            </p>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-white tabular-nums">
              {unlockedCount}
              <span className="text-2xl text-slate-300/60">
                /{achievements.length}
              </span>
            </p>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-white">
              Your achievement <em className="italic">collection</em>
            </h2>
            <p className="mt-1 text-sm text-slate-300/70">
              {unlockedCount === 0
                ? "Your first achievement is waiting to be unlocked."
                : `${unlockedCount} achievement${
                    unlockedCount === 1 ? "" : "s"
                  } unlocked so far.`}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-white tabular-nums">
                {progressPercentage}%
              </span>
            </div>
          </div>
          <div className="divide-y divide-white/10 self-center lg:col-span-2">
            {[
              { label: "Total", value: achievements.length },
              { label: "Unlocked", value: unlockedCount },
              { label: "Remaining", value: lockedCount },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between py-3"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">
                  {row.label}
                </p>
                <p className="text-2xl font-semibold tracking-tight text-white tabular-nums">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & filters */}
      <section
        className={`rounded-3xl border border-[#E8E5DB] bg-white p-4 ${cardShadow} sm:p-5`}
      >
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA0A6]"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search achievements..."
              aria-label="Search achievements"
              className="h-12 w-full rounded-xl border border-[#E8E5DB] bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 flex min-h-[48px] min-w-[48px] -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={pillFor(filter === category)}
              >
                {category}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilter("Unlocked")}
              className={pillFor(filter === "Unlocked")}
            >
              Unlocked
            </button>
            <button
              type="button"
              onClick={() => setFilter("Locked")}
              className={pillFor(filter === "Locked")}
            >
              Locked
            </button>
          </div>
        </div>
      </section>

      {/* Result header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Achievement library
          </h2>
          <p className="mt-1 text-xs text-[#9AA0A6]">
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
            className="text-sm font-semibold text-[#3B5998] hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Badge grid */}
      {filteredAchievements.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
            <Search size={25} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900">
            No achievements found
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
            No achievement matches your current search or filter. Try
            something different.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("All");
            }}
            className="mt-5 min-h-[48px] rounded-xl bg-[#3B5998] px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Show all achievements
          </button>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAchievements.map((item) => (
            <article
              key={item.id}
              className={`rounded-3xl border border-[#E8E5DB] bg-white p-5 ${cardShadow} ${cardHover}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    item.unlocked
                      ? categoryTints[item.category] ?? "bg-[#EAF0FA] text-[#3B5998]"
                      : "bg-[#F7F6F2] text-[#9AA0A6] opacity-40 grayscale"
                  }`}
                >
                  {item.unlocked ? (
                    <Trophy size={23} />
                  ) : (
                    <LockKeyhole size={22} />
                  )}
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    item.unlocked
                      ? "bg-[#EAF7EC] text-[#2F9E44]"
                      : "bg-[#F7F6F2] text-[#9AA0A6]"
                  }`}
                >
                  {item.unlocked && <CheckCircle2 size={13} />}
                  {item.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 min-h-[48px] text-sm leading-6 text-[#6B7280]">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#E8E5DB] pt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E5DB] bg-[#F7F6F2] px-2.5 py-1 text-[11px] font-semibold text-[#6B7280]">
                  <Sparkles size={13} />
                  {item.category}
                </span>
                {item.unlocked && (
                  <span className="text-xs font-semibold text-[#2F9E44]">
                    Earned
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Tracking information */}
      <section
        className={`rounded-3xl border border-[#E8E5DB] bg-white p-5 ${cardShadow}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
            <Target size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Achievement tracking
            </p>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">
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
