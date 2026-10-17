"use client";

import { uid } from "@/lib/utils";
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

const cardShadow =
  "shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";
const cardHover =
  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)]";

const statusStyles: Record<ChallengeStatus, string> = {
  Completed: "bg-[#EAF7EC] text-[#2F9E44]",
  "In Progress": "bg-[#EAF0FA] text-[#3B5998]",
  "Not Started": "bg-[#F7F6F2] text-[#6B7280]",
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

  const sections = [
    {
      title: "Active",
      items: filteredChallenges.filter((c) => c.status === "In Progress"),
    },
    {
      title: "Upcoming",
      items: filteredChallenges.filter((c) => c.status === "Not Started"),
    },
    {
      title: "Completed",
      items: filteredChallenges.filter((c) => c.status === "Completed"),
    },
  ].filter((section) => section.items.length > 0);

  function addChallenge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    const newChallenge: Challenge = {
      id: uid(),
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
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          <Trophy size={14} />
          Personal Growth
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Challenges
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Set goals, track your progress, and complete challenges.
            </p>
          </div>
          <Button onClick={() => setShowForm((v) => !v)} className="gap-2 rounded-xl">
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close form" : "Add Challenge"}
          </Button>
        </div>
      </section>

      {/* Stats — dark contrast lead, light trio */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Card className="rounded-3xl bg-[#1E293B] p-6">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">
              Total Challenges
            </p>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
              <Target size={20} />
            </div>
          </div>
          <p className="mt-5 text-4xl font-semibold tracking-tight text-white tabular-nums">
            {counts.total}
          </p>
        </Card>
        {[
          { label: "In Progress", value: counts.active, icon: Clock3, tile: "bg-[#EAF0FA] text-[#3B5998]" },
          { label: "Not Started", value: counts.pending, icon: Circle, tile: "bg-[#FFF7E0] text-[#B97E0C]" },
          { label: "Completed", value: counts.completed, icon: CheckCircle2, tile: "bg-[#EAF7EC] text-[#2F9E44]" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className={`rounded-3xl border border-[#E8E5DB] bg-white p-6 ${cardShadow}`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {item.label}
                </p>
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.tile}`}
                >
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {item.value}
              </p>
            </Card>
          );
        })}
      </section>

      {/* Create form */}
      {showForm && (
        <Card
          className={`rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow}`}
        >
          <CardHeader>
            <CardTitle>Create a challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addChallenge} className="space-y-5">
              <div>
                <label
                  htmlFor="challenge-title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Challenge title *
                </label>
                <Input
                  id="challenge-title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Solve 30 DSA problems"
                  className="h-12 rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                />
              </div>
              <div>
                <label
                  htmlFor="challenge-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <textarea
                  id="challenge-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What do you want to achieve?"
                  rows={3}
                  className="flex w-full resize-y rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="challenge-category"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Category
                  </label>
                  <select
                    id="challenge-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="challenge-deadline"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Deadline (optional)
                  </label>
                  <Input
                    id="challenge-deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="h-12 rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border-[#E8E5DB]"
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl">
                  Create Challenge
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA0A6]"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search challenges..."
            aria-label="Search challenges"
            className="h-12 rounded-xl border-[#E8E5DB] bg-white pl-11 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter challenges by status"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
        >
          <option value="All">All statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter challenges by category"
          className="flex h-12 rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
        >
          <option value="All">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Challenge sections */}
      {filteredChallenges.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
            <Trophy size={25} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900">
            {challenges.length === 0
              ? "No challenges yet"
              : "No matching challenges"}
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
            {challenges.length === 0
              ? "Create your first challenge and start tracking your progress."
              : "Try changing your search or filters."}
          </p>
          {challenges.length === 0 && (
            <Button
              onClick={() => setShowForm(true)}
              className="mt-5 gap-2 rounded-xl"
            >
              <Plus size={16} /> Add your first challenge
            </Button>
          )}
        </div>
      ) : (
        sections.map((section, sIndex) => (
          <section key={section.title} className="border-t border-[#E8E5DB] pt-6">
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold tracking-[0.18em] text-[#9AA0A6]">
                  {String(sIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  {section.title}
                </h2>
              </div>
              <span className="rounded-full bg-[#EAF0FA] px-2.5 py-1 text-[11px] font-semibold text-[#3B5998]">
                {section.items.length}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow} ${cardHover}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <Badge
                        variant="info"
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      >
                        {challenge.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteChallenge(challenge.id)}
                        aria-label={`Delete challenge "${challenge.title}"`}
                        className="min-h-[48px] min-w-[48px] rounded-xl p-2 text-slate-400 hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                      {challenge.title}
                    </h3>
                    {challenge.description && (
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#6B7280]">
                        {challenge.description}
                      </p>
                    )}
                    {challenge.deadline && (
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#E8E5DB] bg-[#F7F6F2] px-2.5 py-1 text-[11px] font-semibold text-[#6B7280]">
                        <CalendarDays size={13} />
                        Deadline: {challenge.deadline}
                      </div>
                    )}
                    <div className="mt-5 border-t border-[#E8E5DB] pt-4">
                      <label className="mb-2 block text-xs font-medium text-[#6B7280]">
                        Challenge status
                      </label>
                      <div className="relative">
                        <select
                          value={challenge.status}
                          onChange={(e) =>
                            updateStatus(
                              challenge.id,
                              e.target.value as ChallengeStatus
                            )
                          }
                          className={`min-h-[48px] w-full appearance-none rounded-xl py-2 pl-4 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#3B5998]/15 ${statusStyles[challenge.status]}`}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-current opacity-60"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
