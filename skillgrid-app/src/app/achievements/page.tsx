
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

export default function AchievementsPage() {
  const [achievements] = useState<Achievement[]>(initialAchievements);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const unlockedCount = useMemo(
    () => achievements.filter((item) => item.unlocked).length,
    [achievements]
  );

  const filteredAchievements = achievements.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Unlocked" && item.unlocked) ||
      (filter === "Locked" && !item.unlocked);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Award size={16} />
          Personal Growth
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Achievements
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Celebrate milestones and keep moving toward your goals.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#3B5998]">
            <Trophy size={30} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900">
              Your achievement collection
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your milestones will be unlocked automatically once activity
              tracking is connected.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 px-5 py-3 text-center">
            <p className="text-2xl font-bold text-slate-900">
              {unlockedCount}/{achievements.length}
            </p>
            <p className="text-xs text-slate-500">Unlocked</p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#3B5998] transition-all"
            style={{
              width: `${
                achievements.length
                  ? (unlockedCount / achievements.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search achievements..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3B5998]"
        >
          <option value="All">All achievements</option>
          <option value="Unlocked">Unlocked</option>
          <option value="Locked">Locked</option>
        </select>
      </div>

      {filteredAchievements.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <Search className="mx-auto text-slate-400" size={28} />
          <h3 className="mt-3 font-semibold text-slate-900">
            No achievements found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border bg-white p-5 transition ${
                item.unlocked
                  ? "border-blue-200"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.unlocked
                      ? "bg-blue-50 text-[#3B5998]"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {item.unlocked ? (
                    <Trophy size={23} />
                  ) : (
                    <LockKeyhole size={22} />
                  )}
                </div>

                {item.unlocked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 size={13} />
                    Unlocked
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                    Locked
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                <Sparkles size={15} className="text-[#3B5998]" />
                <span className="text-xs font-medium text-slate-500">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <Target size={19} className="mt-0.5 shrink-0 text-[#3B5998]" />
        <div>
          <p className="text-sm font-medium text-slate-800">
            Achievement tracking
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            These are achievement definitions, not earned rewards. Automatic
            unlocking requires connecting tasks, DSA, habits, and focus
            sessions to a shared data source.
          </p>
        </div>
      </div>
    </div>
  );
}