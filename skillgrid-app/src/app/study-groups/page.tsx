"use client";

import { uid } from "@/lib/utils";
import { useMemo, useState, type FormEvent } from "react";
import {
  UsersRound,
  Plus,
  Search,
  Trash2,
  X,
  BookOpen,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type StudyGroup = {
  id: string;
  name: string;
  subject: string;
  description: string;
};

const cardShadow =
  "shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";
const cardHover =
  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)]";

const coverTints = [
  {
    band: "bg-[#EAF0FA]",
    tile: "bg-white/80 text-[#3B5998]",
    pill: "bg-white/70 text-[#3B5998]",
  },
  {
    band: "bg-[#EAF7EC]",
    tile: "bg-white/80 text-[#2F9E44]",
    pill: "bg-white/70 text-[#2F9E44]",
  },
  {
    band: "bg-[#FFF7E0]",
    tile: "bg-white/80 text-[#B97E0C]",
    pill: "bg-white/70 text-[#B97E0C]",
  },
  {
    band: "bg-[#F3E8FF]",
    tile: "bg-white/80 text-[#7C3AED]",
    pill: "bg-white/70 text-[#7C3AED]",
  },
];

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.subject.toLowerCase().includes(query) ||
        group.description.toLowerCase().includes(query)
    );
  }, [groups, search]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !subject.trim()) return;

    const newGroup: StudyGroup = {
      id: uid(),
      name: name.trim(),
      subject: subject.trim(),
      description: description.trim(),
    };

    setGroups((current) => [newGroup, ...current]);
    setName("");
    setSubject("");
    setDescription("");
    setShowForm(false);
  }

  function deleteGroup(id: string) {
    setGroups((current) => current.filter((group) => group.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          <UsersRound size={14} />
          Community
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Study <em className="italic">Groups</em>
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Organize your study groups by subject and learning goals.
            </p>
          </div>
          <Button
            onClick={() => setShowForm((current) => !current)}
            className="gap-2 rounded-xl"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close form" : "Create group"}
          </Button>
        </div>
      </section>

      {/* Stats — asymmetric: dark contrast + light */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-3xl bg-[#1E293B] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
            <UsersRound size={20} />
          </div>
          <p className="mt-5 text-4xl font-semibold tracking-tight text-white tabular-nums">
            {groups.length}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">
            Total groups
          </p>
        </Card>
        <Card
          className={`rounded-3xl border border-[#E8E5DB] bg-white p-6 ${cardShadow}`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7EC] text-[#2F9E44]">
            <Search size={20} />
          </div>
          <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {filteredGroups.length}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Matching groups
          </p>
        </Card>
      </section>

      {/* Create form */}
      {showForm && (
        <Card
          className={`rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow}`}
        >
          <CardHeader>
            <CardTitle>Create a study group</CardTitle>
            <p className="font-normal text-sm text-[#6B7280]">
              Add a name, subject, and optional description.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="group-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Group name *
                  </label>
                  <Input
                    id="group-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Java DSA Study Group"
                    className="h-12 rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                  />
                </div>
                <div>
                  <label
                    htmlFor="group-subject"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Subject *
                  </label>
                  <Input
                    id="group-subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Data Structures and Algorithms"
                    className="h-12 rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="group-description"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Description (optional)
                  </label>
                  <textarea
                    id="group-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will this group focus on?"
                    rows={4}
                    className="flex w-full resize-y rounded-xl border border-[#E8E5DB] bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[#3B5998] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/15"
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
                  Create group
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA0A6]"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search groups by name, subject or description..."
          aria-label="Search study groups"
          className="h-12 rounded-xl border-[#E8E5DB] bg-white pl-11 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
        />
      </div>

      {/* My groups */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              My groups
            </h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">
              {filteredGroups.length}{" "}
              {filteredGroups.length === 1 ? "group" : "groups"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          {filteredGroups.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <UsersRound size={24} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {groups.length === 0
                  ? "No study groups yet"
                  : "No matching groups"}
              </h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
                {groups.length === 0
                  ? "Create a group to organize your study topics and goals."
                  : "Try another search term."}
              </p>
              {groups.length === 0 && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="mt-5 gap-2 rounded-xl"
                >
                  <Plus size={16} /> Create your first group
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredGroups.map((group, index) => {
                const tint = coverTints[index % coverTints.length];
                const featured = index === 0;
                const band = (large: boolean) => (
                  <div
                    className={`flex items-center justify-between gap-4 px-5 ${
                      large
                        ? "py-5 sm:w-60 sm:flex-col sm:items-start sm:justify-center"
                        : "py-4"
                    } ${tint.band}`}
                  >
                    <div
                      className={`flex items-center justify-center rounded-2xl ${tint.tile} ${
                        large ? "h-12 w-12" : "h-10 w-10"
                      }`}
                    >
                      <BookOpen size={large ? 22 : 19} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tint.pill}`}
                    >
                      {group.subject}
                    </span>
                  </div>
                );
                const body = (
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                      {group.name}
                    </h3>
                    {group.description && (
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#6B7280]">
                        {group.description}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E8E5DB] pt-4">
                      <span className="flex items-center gap-2 text-xs text-[#9AA0A6]">
                        <Users size={15} />
                        Group members are not connected yet
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteGroup(group.id)}
                        aria-label={`Delete group "${group.name}"`}
                        className="min-h-[48px] min-w-[48px] rounded-xl p-2 text-slate-400 hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                );
                return (
                  <article
                    key={group.id}
                    className={`overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow} ${cardHover} ${
                      featured ? "sm:col-span-2" : ""
                    }`}
                  >
                    {featured ? (
                      <div className="flex flex-col sm:flex-row">
                        {band(true)}
                        {body}
                      </div>
                    ) : (
                      <>
                        {band(false)}
                        {body}
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <p className="pt-4 text-center text-xs text-[#9AA0A6]">
        Groups are currently stored in page state and reset when you refresh.
        Shared membership and invitations require backend integration.
      </p>
    </main>
  );
}
