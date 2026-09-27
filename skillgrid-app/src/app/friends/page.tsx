"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Users,
  UserPlus,
  Search,
  Trash2,
  X,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type Friend = {
  id: string;
  name: string;
  username: string;
};

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const filteredFriends = useMemo(() => {
    const query = search.trim().toLowerCase();

    return friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(query) ||
        friend.username.toLowerCase().includes(query)
    );
  }, [friends, search]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    const newFriend: Friend = {
      id: crypto.randomUUID(),
      name: name.trim(),
      username: username.trim(),
    };

    setFriends((current) => [newFriend, ...current]);
    setName("");
    setUsername("");
    setShowForm(false);
  }

  function removeFriend(id: string) {
    setFriends((current) => current.filter((friend) => friend.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Users size={16} />
            <span>Community</span>
            <span>/</span>
            <span>Friends</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Friends</h1>
          <p className="mt-2 text-sm text-slate-500">Keep track of your study connections in one place.</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)} className="gap-2">
          {showForm ? <X size={16} /> : <UserPlus size={16} />}
          {showForm ? "Close form" : "Add friend"}
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Total friends</p>
              <UsersRound size={18} className="text-slate-400" />
            </div>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{friends.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Matching search</p>
              <Search size={18} className="text-slate-400" />
            </div>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{filteredFriends.length}</p>
          </CardContent>
        </Card>
      </section>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add a friend</CardTitle>
            <p className="text-sm text-slate-500 font-normal">Add a name and an optional username to your local list.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Name *</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Username (optional)</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. coder123"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save friend</Button>
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
          placeholder="Search friends by name or username..."
          className="pl-9 bg-white"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
          <CardTitle>Your friends</CardTitle>
          <span className="text-sm text-slate-500">
            {filteredFriends.length} {filteredFriends.length === 1 ? "friend" : "friends"}
          </span>
        </CardHeader>
        <div>
          {filteredFriends.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <UsersRound size={24} className="text-slate-400 mb-4" />
              <h3 className="font-medium text-slate-900">
                {friends.length === 0 ? "Your friends list is empty" : "No matching friends"}
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">
                {friends.length === 0
                  ? "Add someone to start building your study connections."
                  : "Try another name or username."}
              </p>
              {friends.length === 0 && (
                <Button onClick={() => setShowForm(true)} className="mt-5 gap-2">
                  <UserPlus size={16} /> Add your first friend
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredFriends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/50 transition">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <UserRound size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">{friend.name}</p>
                      {friend.username && (
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          @{friend.username.replace(/^@/, "")}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFriend(friend.id)} className="p-2 h-auto text-slate-400 hover:text-danger hover:bg-danger-light">
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <p className="text-xs text-center text-slate-400 pt-4">
        This is a local friends list. Friend requests, accounts, and shared connections are not connected yet. Data resets when you refresh.
      </p>
    </main>
  );
}