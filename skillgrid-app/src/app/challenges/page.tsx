
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Trophy,
  Target,
  Trash2,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  X,
} from "lucide-react";

type ChallengeStatus = "Not Started" | "In Progress" | "Completed";

type Challenge = {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  status: ChallengeStatus;
};

const categories = ["DSA", "Development", "Academics", "Personal"];

const statusStyles: Record<ChallengeStatus, string> = {
  "Not Started": "bg-slate-100 text-slate-600",
  "In Progress": "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [deadline, setDeadline] = useState("");

  const counts = useMemo(
    () => ({
      total: challenges.length,
      active: challenges.filter((c) => c.status === "In Progress").length,
      completed: challenges.filter((c) => c.status === "Completed").length,
      pending: challenges.filter((c) => c.status === "Not Started").length,
    }),
    [challenges]
  );

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(search.toLowerCase()) ||
      challenge.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || challenge.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || challenge.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  function addChallenge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    const newChallenge: Challenge = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      category,
      deadline,
      status: "Not Started",
    };

    setChallenges((prev) => [newChallenge, ...prev]);
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setDeadline("");
    setShowForm(false);
  }

  function updateStatus(id: string, status: ChallengeStatus) {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, status } : challenge
      )
    );
  }

  function deleteChallenge(id: string) {
    setChallenges((prev) => prev.filter((challenge) => challenge.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Trophy size={16} />
            Personal Growth
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Challenges</h1>
          <p className="mt-1 text-sm text-slate-500">
            Set goals, track your progress, and complete challenges.
          </p>
        </div>

        <button
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304a80]"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close form" : "Add Challenge"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Challenges", value: counts.total, icon: Target },
          { label: "In Progress", value: counts.active, icon: Clock3 },
          { label: "Not Started", value: counts.pending, icon: Circle },
          { label: "Completed", value: counts.completed, icon: CheckCircle2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <Icon size={19} className="text-[#3B5998]" />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {showForm && (
        <form
          onSubmit={addChallenge}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <h2 className="font-semibold text-slate-900">Create a challenge</h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Challenge title *
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve 30 DSA problems"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What do you want to achieve?"
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Deadline (optional)
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-[#3B5998] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#304a80]"
            >
              Create Challenge
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search challenges..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
        >
          <option value="All">All statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
        >
          <option value="All">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredChallenges.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#3B5998]">
            <Trophy size={25} />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">
            {challenges.length === 0
              ? "No challenges yet"
              : "No matching challenges"}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            {challenges.length === 0
              ? "Create your first challenge and start tracking your progress."
              : "Try changing your search or filters."}
          </p>
          {challenges.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#304a80]"
            >
              <Plus size={17} />
              Add your first challenge
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#3B5998]">
                  {challenge.category}
                </span>
                <button
                  onClick={() => deleteChallenge(challenge.id)}
                  aria-label={`Delete ${challenge.title}`}
                  className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                {challenge.title}
              </h3>

              {challenge.description && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500">
                  {challenge.description}
                </p>
              )}

              {challenge.deadline && (
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={15} />
                  Deadline: {challenge.deadline}
                </div>
              )}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Challenge status
                </label>
                <select
                  value={challenge.status}
                  onChange={(e) =>
                    updateStatus(
                      challenge.id,
                      e.target.value as ChallengeStatus
                    )
                  }
                  className={`w-full rounded-lg border-0 px-3 py-2 text-sm font-medium outline-none ${statusStyles[challenge.status]}`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}