"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Code2, Plus, Search, Trash2, ExternalLink, CheckCircle2, CircleDashed, Clock3, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

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
      current.map((problem) => (problem.id === id ? { ...problem, status } : problem))
    );
  }

  function deleteProblem(id: string) {
    setProblems((current) => current.filter((problem) => problem.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Code2 size={16} />
            <span>Practice</span>
            <span>/</span>
            <span>DSA Arena</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">DSA Arena</h1>
          <p className="mt-2 text-sm text-slate-500">Track your coding problems and monitor your practice progress.</p>
        </div>
        <Button onClick={() => setShowForm((curr) => !curr)} className="gap-2">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close form" : "Add problem"}
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total problems", value: stats.total, icon: Code2, color: "text-slate-400" },
          { label: "Solved", value: stats.solved, icon: CheckCircle2, color: "text-success" },
          { label: "Attempted", value: stats.attempted, icon: Clock3, color: "text-warning" },
          { label: "Pending", value: stats.pending, icon: CircleDashed, color: "text-slate-400" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <Icon size={18} className={item.color} />
                </div>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add a problem</CardTitle>
            <p className="text-sm text-slate-500">Enter the details of the problem you want to track.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Problem title *</label>
                  <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Two Sum" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>LeetCode</option>
                    <option>Codeforces</option>
                    <option>HackerRank</option>
                    <option>GeeksforGeeks</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {difficultyOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Topic *</label>
                  <Input required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Arrays, Strings, Trees" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Problem link</label>
                  <Input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save problem</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by problem, topic or platform..." className="pl-9 bg-white" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All statuses</option>
          {statusOptions.map((status) => <option key={status}>{status}</option>)}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All difficulties</option>
          {difficultyOptions.map((diff) => <option key={diff}>{diff}</option>)}
        </select>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle>Your problems</CardTitle>
          <span className="text-sm text-slate-500">{filteredProblems.length} {filteredProblems.length === 1 ? "problem" : "problems"}</span>
        </CardHeader>
        <div className="border-t border-slate-200">
          {filteredProblems.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 mb-4">
                <Code2 size={22} className="text-slate-500" />
              </div>
              <h3 className="font-medium text-slate-900">{problems.length === 0 ? "No problems added yet" : "No matching problems"}</h3>
              <p className="mt-1 text-sm text-slate-500">{problems.length === 0 ? "Add a coding problem to start tracking your practice." : "Try changing your search or filters."}</p>
              {problems.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-5 gap-2">
                  <Plus size={16} /> Add your first problem
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredProblems.map((problem) => (
                <div key={problem.id} className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/50 transition">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-slate-900">{problem.title}</h3>
                      {problem.link && (
                        <a href={problem.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary">
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium">{problem.platform}</span>
                      <span>·</span>
                      <span className={problem.difficulty === "Easy" ? "text-success" : problem.difficulty === "Medium" ? "text-warning" : "text-danger"}>
                        {problem.difficulty}
                      </span>
                      <span>·</span>
                      <span>{problem.topic}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={problem.status}
                      onChange={(e) => updateStatus(problem.id, e.target.value as ProblemStatus)}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none ${
                        problem.status === "Solved" ? "bg-success-light text-success" : 
                        problem.status === "Attempted" ? "bg-warning-light text-warning" : 
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {statusOptions.map((status) => <option key={status}>{status}</option>)}
                    </select>
                    <Button variant="ghost" size="sm" onClick={() => deleteProblem(problem.id)} className="p-2 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
      <p className="text-xs text-center text-slate-400 pt-4">
        Changes are currently held in page state and will reset when you refresh. Database persistence will be added separately.
      </p>
    </main>
  );
}