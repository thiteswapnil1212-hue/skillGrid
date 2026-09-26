
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
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} />
            <span>Community</span>
            <span>/</span>
            <span>Friends</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Friends
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of your study connections in one place.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304b85]"
        >
          {showForm ? <X size={17} /> : <UserPlus size={17} />}
          {showForm ? "Close form" : "Add friend"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total friends</p>
            <UsersRound size={19} className="text-slate-400" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {friends.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Matching search</p>
            <Search size={19} className="text-slate-400" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {filteredFriends.length}
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
              Add a friend
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a name and an optional username to your local list.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Name *
              </label>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter a name"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#3B5998] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Username (optional)
              </label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="e.g. coder123"
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
              Save friend
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
          placeholder="Search friends by name or username..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Your friends</h2>
          <span className="text-sm text-slate-500">
            {filteredFriends.length}{" "}
            {filteredFriends.length === 1 ? "friend" : "friends"}
          </span>
        </div>

        {filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <UsersRound size={22} className="text-slate-500" />
            </div>

            <h3 className="mt-4 font-medium text-slate-900">
              {friends.length === 0
                ? "Your friends list is empty"
                : "No matching friends"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {friends.length === 0
                ? "Add someone to start building your study connections."
                : "Try another name or username."}
            </p>

            {friends.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#304b85]"
              >
                <UserPlus size={16} />
                Add your first friend
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <UserRound size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {friend.name}
                    </p>
                    {friend.username && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        @{friend.username.replace(/^@/, "")}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => removeFriend(friend.id)}
                  aria-label={`Remove ${friend.name}`}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="text-xs text-slate-400">
        This is a local friends list. Friend requests, accounts, and shared
        connections are not connected yet. Data resets when you refresh.
      </p>
    </div>
  );
}