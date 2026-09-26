
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Code2,
  Plus,
  Search,
  Trash2,
  ExternalLink,
  CheckCircle2,
  CircleDashed,
  Clock3,
  X,
} from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";
type ProblemStatus = "Pending" | "Attempted" | "Solved";

type Problem = {
  id: string;
  title: string;
  platform: string;
  difficulty: Difficulty;
  topic: string;
  status: ProblemStatus;
  link: string;
};

const statusOptions: ProblemStatus[] = [
  "Pending",
  "Attempted",
  "Solved",
];

const difficultyOptions: Difficulty[] = ["Easy", "Medium", "Hard"];

const statusStyles: Record<ProblemStatus, string> = {
  Pending: "bg-slate-100 text-slate-600",
  Attempted: "bg-amber-50 text-amber-700",
  Solved: "bg-emerald-50 text-emerald-700",
};

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "text-emerald-700",
  Medium: "text-amber-700",
  Hard: "text-rose-700",
};

export default function DSAArenaPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LeetCode");
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [topic, setTopic] = useState("");
  const [link, setLink] = useState("");

  const stats = useMemo(
    () => ({
      total: problems.length,
      solved: problems.filter((p) => p.status === "Solved").length,
      attempted: problems.filter((p) => p.status === "Attempted").length,
      pending: problems.filter((p) => p.status === "Pending").length,
    }),
    [problems]
  );

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(query) ||
        problem.topic.toLowerCase().includes(query) ||
        problem.platform.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || problem.status === statusFilter;

      const matchesDifficulty =
        difficultyFilter === "All" ||
        problem.difficulty === difficultyFilter;

      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [problems, search, statusFilter, difficultyFilter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !topic.trim()) return;

    const newProblem: Problem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      platform,
      difficulty,
      topic: topic.trim(),
      status: "Pending",
      link: link.trim(),
    };

    setProblems((current) => [newProblem, ...current]);
    setTitle("");
    setTopic("");
    setLink("");
    setDifficulty("Easy");
    setPlatform("LeetCode");
    setShowForm(false);
  }

  function updateStatus(id: string, status: ProblemStatus) {
    setProblems((current) =>
      current.map((problem) =>
        problem.id === id ? { ...problem, status } : problem
      )
    );
  }

  function deleteProblem(id: string) {
    setProblems((current) => current.filter((problem) => problem.id !== id));
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Code2 size={16} />
            <span>Practice</span>
            <span>/</span>
            <span>DSA Arena</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            DSA Arena
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your coding problems and monitor your practice progress.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304b85]"
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Close form" : "Add problem"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total problems", value: stats.total, icon: Code2 },
          { label: "Solved", value: stats.solved, icon: CheckCircle2 },
          { label: "Attempted", value: stats.attempted, icon: Clock3 },
          { label: "Pending", value: stats.pending, icon: CircleDashed },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <Icon size={18} className="text-slate-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Add a problem
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the details of the problem you want to track.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Problem title *
              </label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Two Sum"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998]"
              >
                <option>LeetCode</option>
                <option>Codeforces</option>
                <option>HackerRank</option>
                <option>GeeksforGeeks</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998]"
              >
                {difficultyOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Topic *
              </label>
              <input
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Arrays, Strings, Trees"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Problem link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
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
              Save problem
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by problem, topic or platform..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3B5998]"
        >
          <option value="All">All statuses</option>
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-[#3B5998]"
        >
          <option value="All">All difficulties</option>
          {difficultyOptions.map((difficulty) => (
            <option key={difficulty}>{difficulty}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Your problems</h2>
          <span className="text-sm text-slate-500">
            {filteredProblems.length}{" "}
            {filteredProblems.length === 1 ? "problem" : "problems"}
          </span>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Code2 size={22} className="text-slate-500" />
            </div>
            <h3 className="mt-4 font-medium text-slate-900">
              {problems.length === 0
                ? "No problems added yet"
                : "No matching problems"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {problems.length === 0
                ? "Add a coding problem to start tracking your practice."
                : "Try changing your search or filters."}
            </p>
            {problems.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#304b85]"
              >
                <Plus size={16} />
                Add your first problem
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-slate-900">
                      {problem.title}
                    </h3>
                    {problem.link && (
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${problem.title}`}
                        className="text-slate-400 hover:text-[#3B5998]"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{problem.platform}</span>
                    <span>·</span>
                    <span className={difficultyStyles[problem.difficulty]}>
                      {problem.difficulty}
                    </span>
                    <span>·</span>
                    <span>{problem.topic}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={problem.status}
                    onChange={(e) =>
                      updateStatus(
                        problem.id,
                        e.target.value as ProblemStatus
                      )
                    }
                    aria-label={`Status for ${problem.title}`}
                    className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ${statusStyles[problem.status]}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => deleteProblem(problem.id)}
                    aria-label={`Delete ${problem.title}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Changes are currently held in page state and will reset when you refresh.
        Database persistence will be added separately.
      </p>
    </div>
  );
}