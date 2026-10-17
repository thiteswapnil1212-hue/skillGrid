"use client";

import { uid } from "@/lib/utils";
import Fab from "@/components/ui/Fab";
import { useMemo, useState, type FormEvent } from "react";
import { Code2, Plus, Search, Trash2, ExternalLink, CheckCircle2, CircleDashed, Clock3, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";

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

const statusOptions: ProblemStatus[] = ["Pending", "Attempted", "Solved"];
const difficultyOptions: Difficulty[] = ["Easy", "Medium", "Hard"];

const difficultyTint: Record<Difficulty, string> = {
  Easy: "bg-[#EAF7EC] text-[#2F9E44]",
  Medium: "bg-[#FFF7E0] text-[#B97E0C]",
  Hard: "bg-[#FEF2F2] text-[#DC2626]",
};

const difficultyBar: Record<Difficulty, string> = {
  Easy: "bg-[#2F9E44]",
  Medium: "bg-[#D9A00B]",
  Hard: "bg-[#DC2626]",
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

  const stats = useMemo(() => ({
    total: problems.length,
    solved: problems.filter((p) => p.status === "Solved").length,
    attempted: problems.filter((p) => p.status === "Attempted").length,
    pending: problems.filter((p) => p.status === "Pending").length,
  }), [problems]);

  const accuracy = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;
  const difficultyCounts = difficultyOptions.map((d) => ({
    difficulty: d,
    count: problems.filter((p) => p.difficulty === d).length,
  }));
  const maxDifficultyCount = Math.max(1, ...difficultyCounts.map((d) => d.count));

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return problems.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(query) || problem.topic.toLowerCase().includes(query) || problem.platform.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || problem.status === statusFilter;
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [problems, search, statusFilter, difficultyFilter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !topic.trim()) return;

    const newProblem: Problem = {
      id: uid(),
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
      current.map((problem) => (problem.id === id ? { ...problem, status } : problem))
    );
  }

  function deleteProblem(id: string) {
    setProblems((current) => current.filter((problem) => problem.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">Practice</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">DSA <em className="italic">Arena</em></h1>
            <p className="mt-2 text-sm text-[#6B7280]">Track your coding problems and monitor your practice progress.</p>
          </div>
          <Button onClick={() => setShowForm((curr) => !curr)} className="hidden gap-2 rounded-xl lg:inline-flex">
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close form" : "Add problem"}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-3xl bg-[#1E293B] p-6 text-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-8 lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
              {stats.total} {stats.total === 1 ? "problem" : "problems"}
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="mt-4 text-5xl font-semibold tracking-tight text-white tabular-nums sm:text-6xl">{stats.solved}</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Problems solved</p>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white tabular-nums">{accuracy}%</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white tabular-nums">{stats.attempted}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Attempted</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white tabular-nums">{stats.pending}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Pending</p>
            </div>
          </div>
        </div>

        <Card className="rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Difficulty</h2>
            <div className="mt-5 space-y-4">
              {difficultyCounts.map(({ difficulty, count }) => (
                <div key={difficulty} className="flex items-center gap-3">
                  <span className={`w-16 shrink-0 rounded-full px-2.5 py-1 text-center text-[11px] font-semibold ${difficultyTint[difficulty]}`}>
                    {difficulty}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EFECE3]">
                    <motion.div
                      className={`h-full rounded-full ${difficultyBar[difficulty]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxDifficultyCount) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-semibold text-slate-700 tabular-nums">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold tracking-tight">Add a problem</CardTitle>
                <p className="mt-1 text-sm text-[#6B7280]">Enter the details of the problem you want to track.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="problem-title" className="mb-2 block text-sm font-semibold text-slate-700">Problem title *</label>
                      <Input id="problem-title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Two Sum" className="rounded-xl border-[#E8E5DB]" />
                    </div>
                    <div>
                      <label htmlFor="problem-platform" className="mb-2 block text-sm font-semibold text-slate-700">Platform</label>
                      <select
                        id="problem-platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="flex h-12 w-full rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
                      >
                        <option>LeetCode</option>
                        <option>Codeforces</option>
                        <option>HackerRank</option>
                        <option>GeeksforGeeks</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="problem-difficulty" className="mb-2 block text-sm font-semibold text-slate-700">Difficulty</label>
                      <select
                        id="problem-difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                        className="flex h-12 w-full rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
                      >
                        {difficultyOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="problem-topic" className="mb-2 block text-sm font-semibold text-slate-700">Topic *</label>
                      <Input id="problem-topic" required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Arrays, Strings, Trees" className="rounded-xl border-[#E8E5DB]" />
                    </div>
                    <div>
                      <label htmlFor="problem-link" className="mb-2 block text-sm font-semibold text-slate-700">Problem link</label>
                      <Input id="problem-link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." className="rounded-xl border-[#E8E5DB]" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 border-t border-[#E8E5DB] pt-5">
                    <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button type="submit" className="rounded-xl">Save problem</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#E8E5DB] bg-white p-2 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by problem, topic or platform..." aria-label="Search problems" className="h-12 rounded-xl border-[#E8E5DB] pl-10" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
        >
          <option value="All">All statuses</option>
          {statusOptions.map((status) => <option key={status}>{status}</option>)}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          aria-label="Filter by difficulty"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
        >
          <option value="All">All difficulties</option>
          {difficultyOptions.map((diff) => <option key={diff}>{diff}</option>)}
        </select>
      </div>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Your problems</h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">{filteredProblems.length} {filteredProblems.length === 1 ? "problem" : "problems"}</p>
          </div>
        </div>

        <div className="mt-4">
          {filteredProblems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <Code2 size={28} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">{problems.length === 0 ? "No problems added yet" : "No matching problems"}</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">{problems.length === 0 ? "Add a coding problem to start tracking your practice." : "Try changing your search or filters."}</p>
              {problems.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-6 gap-2 rounded-xl">
                  <Plus size={16} /> Add your first problem
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {filteredProblems.map((problem) => {
                  const StatusIcon = problem.status === "Solved" ? CheckCircle2 : problem.status === "Attempted" ? Clock3 : CircleDashed;
                  const statusTint = problem.status === "Solved" ? "bg-[#EAF7EC] text-[#2F9E44]" : problem.status === "Attempted" ? "bg-[#FFF7E0] text-[#B97E0C]" : "bg-[#F7F6F2] text-[#9AA0A6]";
                  return (
                    <motion.div
                      key={problem.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                      className="group flex flex-col gap-4 rounded-2xl border border-[#E8E5DB] bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${statusTint}`}>
                          <StatusIcon size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold tracking-tight text-slate-900">{problem.title}</h3>
                            {problem.link && (
                              <a href={problem.link} target="_blank" rel="noreferrer" aria-label={`Open ${problem.title} on ${problem.platform}`} className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-[#F7F6F2] hover:text-[#3B5998] sm:h-8 sm:w-8">
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                          <div className="mt-2.5 flex flex-wrap items-center gap-2">
                            <span className="rounded-md border border-[#E8E5DB] bg-[#F7F6F2] px-2 py-1 text-xs font-medium text-slate-600">{problem.platform}</span>
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyTint[problem.difficulty]}`}>
                              {problem.difficulty}
                            </span>
                            <span className="rounded-full bg-[#EAF0FA] px-2.5 py-1 text-[11px] font-semibold text-[#3B5998]">{problem.topic}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pl-14 sm:pl-0">
                        <select
                          value={problem.status}
                          onChange={(e) => updateStatus(problem.id, e.target.value as ProblemStatus)}
                          aria-label={`Status for ${problem.title}`}
                          className={`h-12 rounded-full border-0 px-4 text-xs font-bold outline-none cursor-pointer transition-colors shadow-sm ring-1 ring-inset ${
                            problem.status === "Solved" ? "bg-[#2F9E44] text-white ring-[#2F9E44]" :
                            problem.status === "Attempted" ? "bg-[#FFF7E0] text-[#B97E0C] ring-[#B97E0C]/20" :
                            "bg-[#F7F6F2] text-slate-700 ring-[#E8E5DB]"
                          }`}
                        >
                          {statusOptions.map((status) => <option key={status}>{status}</option>)}
                        </select>
                        <Button variant="ghost" size="sm" onClick={() => deleteProblem(problem.id)} aria-label={`Delete problem "${problem.title}"`} className="h-12 w-12 rounded-xl p-0 text-slate-400 hover:text-danger hover:bg-danger-light lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
      <p className="text-xs font-medium text-center text-slate-400 pt-4">
        Changes are currently held in page state and will reset when you refresh. Database persistence will be added separately.
      </p>
      {!showForm && <Fab onClick={() => setShowForm(true)} label="Add problem" />}
    </main>
  );
}
