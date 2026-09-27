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
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

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
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <UsersRound size={16} />
            <span>Community</span>
            <span>/</span>
            <span>Study Groups</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Study Groups</h1>
          <p className="mt-2 text-sm text-slate-500">Organize your study groups by subject and learning goals.</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)} className="gap-2">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close form" : "Create group"}
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Total groups</p>
              <UsersRound size={18} className="text-slate-400" />
            </div>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{groups.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Matching groups</p>
              <Search size={18} className="text-slate-400" />
            </div>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{filteredGroups.length}</p>
          </CardContent>
        </Card>
      </section>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create a study group</CardTitle>
            <p className="text-sm text-slate-500 font-normal">Add a name, subject, and optional description.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Group name *</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Java DSA Study Group"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Subject *</label>
                  <Input
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Data Structures and Algorithms"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Description (optional)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will this group focus on?"
                    rows={4}
                    className="flex w-full resize-y rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Create group</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search groups by name, subject or description..."
          className="pl-9 bg-white"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle>Your study groups</CardTitle>
          <span className="text-sm text-slate-500">
            {filteredGroups.length} {filteredGroups.length === 1 ? "group" : "groups"}
          </span>
        </CardHeader>
        <div>
          {filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <UsersRound size={24} className="text-slate-400 mb-4" />
              <h3 className="font-medium text-slate-900">
                {groups.length === 0 ? "No study groups yet" : "No matching groups"}
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">
                {groups.length === 0
                  ? "Create a group to organize your study topics and goals."
                  : "Try another search term."}
              </p>
              {groups.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-5 gap-2">
                  <Plus size={16} /> Create your first group
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {filteredGroups.map((group) => (
                <article
                  key={group.id}
                  className="rounded-lg border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <BookOpen size={19} />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteGroup(group.id)} className="p-2 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{group.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{group.subject}</p>
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
        </div>
      </Card>

      <p className="text-xs text-center text-slate-400 pt-4">
        Groups are currently stored in page state and reset when you refresh.
        Shared membership and invitations require backend integration.
      </p>
    </main>
  );
}