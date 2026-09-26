
"use client";

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

type StudyGroup = {
  id: string;
  name: string;
  subject: string;
  description: string;
};

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
      id: crypto.randomUUID(),
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
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <UsersRound size={16} />
            <span>Community</span>
            <span>/</span>
            <span>Study Groups</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Study Groups
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organize your study groups by subject and learning goals.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304b85]"
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Close form" : "Create group"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total groups</p>
            <UsersRound size={19} className="text-slate-400" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {groups.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Matching groups</p>
            <Search size={19} className="text-slate-400" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {filteredGroups.length}
          </p>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Create a study group
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a name, subject, and optional description.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Group name *
              </label>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Java DSA Study Group"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subject *
              </label>
              <input
                required
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="e.g. Data Structures and Algorithms"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What will this group focus on?"
                rows={4}
                className="w-full resize-y rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
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
              Create group
            </button>
          </div>
        </form>
      )}

      <div className="relative">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search groups by name, subject or description..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Your study groups</h2>
          <span className="text-sm text-slate-500">
            {filteredGroups.length}{" "}
            {filteredGroups.length === 1 ? "group" : "groups"}
          </span>
        </div>

        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <UsersRound size={22} className="text-slate-500" />
            </div>

            <h3 className="mt-4 font-medium text-slate-900">
              {groups.length === 0
                ? "No study groups yet"
                : "No matching groups"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {groups.length === 0
                ? "Create a group to organize your study topics and goals."
                : "Try another search term."}
            </p>

            {groups.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#304b85]"
              >
                <Plus size={16} />
                Create your first group
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {filteredGroups.map((group) => (
              <article
                key={group.id}
                className="rounded-xl border border-slate-200 p-5 transition hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B5998]">
                    <BookOpen size={19} />
                  </div>

                  <button
                    onClick={() => deleteGroup(group.id)}
                    aria-label={`Delete ${group.name}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  {group.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#3B5998]">
                  {group.subject}
                </p>

                {group.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">
                    {group.description}
                  </p>
                )}

                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <Users size={15} />
                  <span>Group members are not connected yet</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="text-xs text-slate-400">
        Groups are currently stored in page state and reset when you refresh.
        Shared membership and invitations require backend integration.
      </p>
    </div>
  );
}