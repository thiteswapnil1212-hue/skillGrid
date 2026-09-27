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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

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
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Trophy size={16} />
            <span>Personal Growth</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Challenges</h1>
          <p className="mt-2 text-sm text-slate-500">Set goals, track your progress, and complete challenges.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)} className="gap-2">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close form" : "Add Challenge"}
        </Button>
      </section>

      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Total Challenges", value: counts.total, icon: Target, color: "text-slate-400" },
          { label: "In Progress", value: counts.active, icon: Clock3, color: "text-primary" },
          { label: "Not Started", value: counts.pending, icon: Circle, color: "text-slate-400" },
          { label: "Completed", value: counts.completed, icon: CheckCircle2, color: "text-success" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <Icon size={18} className={item.color} />
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create a challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addChallenge} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Challenge title *</label>
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Solve 30 DSA problems" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What do you want to achieve?"
                  rows={3}
                  className="flex w-full resize-y rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Deadline (optional)</label>
                  <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Create Challenge</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search challenges..." className="pl-9 bg-white" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredChallenges.length === 0 ? (
        <Card className="border-dashed">
          <div className="flex flex-col items-center py-14 text-center px-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
              <Trophy size={25} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              {challenges.length === 0 ? "No challenges yet" : "No matching challenges"}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              {challenges.length === 0
                ? "Create your first challenge and start tracking your progress."
                : "Try changing your search or filters."}
            </p>
            {challenges.length === 0 && (
              <Button onClick={() => setShowForm(true)} className="mt-5 gap-2">
                <Plus size={16} /> Add your first challenge
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-sm transition">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="info">{challenge.category}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => deleteChallenge(challenge.id)} className="p-1.5 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                    <Trash2 size={16} />
                  </Button>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{challenge.title}</h3>
                {challenge.description && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500">{challenge.description}</p>
                )}
                {challenge.deadline && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={15} />
                    Deadline: {challenge.deadline}
                  </div>
                )}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <label className="mb-2 block text-xs font-medium text-slate-500">Challenge status</label>
                  <div className="relative">
                    <select
                      value={challenge.status}
                      onChange={(e) => updateStatus(challenge.id, e.target.value as ChallengeStatus)}
                      className={`w-full appearance-none rounded-full border-0 py-2 pl-3 pr-8 text-sm font-semibold outline-none ${
                        challenge.status === "Completed"
                          ? "bg-success-light text-success"
                          : challenge.status === "In Progress"
                            ? "bg-primary-light text-primary"
                            : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}