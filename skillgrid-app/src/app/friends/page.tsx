"use client";

import { uid } from "@/lib/utils";
import { useMemo, useState, type FormEvent } from "react";
import {
  Users,
  UserPlus,
  Search,
  Trash2,
  X,
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

const cardShadow =
  "shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";
const cardHover =
  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)]";

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
      id: uid(),
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
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          <Users size={14} />
          Community
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Friends
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Keep track of your study connections in one place.
            </p>
          </div>
          <Button
            onClick={() => setShowForm((current) => !current)}
            className="gap-2 rounded-xl"
          >
            {showForm ? <X size={16} /> : <UserPlus size={16} />}
            {showForm ? "Close form" : "Add friend"}
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
            {friends.length}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">
            Total friends
          </p>
        </Card>
        <Card
          className={`rounded-3xl border border-[#E8E5DB] bg-white p-6 ${cardShadow}`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7EC] text-[#2F9E44]">
            <Search size={20} />
          </div>
          <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {filteredFriends.length}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Matching search
          </p>
        </Card>
      </section>

      {/* Add form */}
      {showForm && (
        <Card
          className={`rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow}`}
        >
          <CardHeader>
            <CardTitle>Add a friend</CardTitle>
            <p className="font-normal text-sm text-[#6B7280]">
              Add a name and an optional username to your local list.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="friend-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Name *
                  </label>
                  <Input
                    id="friend-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name"
                    className="h-12 rounded-xl border-[#E8E5DB] bg-white focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
                  />
                </div>
                <div>
                  <label
                    htmlFor="friend-username"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Username (optional)
                  </label>
                  <Input
                    id="friend-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. coder123"
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
                  Save friend
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
          placeholder="Search friends by name or username..."
          aria-label="Search friends"
          className="h-12 rounded-xl border-[#E8E5DB] bg-white pl-11 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
        />
      </div>

      {/* Friend list */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Your friends
            </h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">
              {filteredFriends.length}{" "}
              {filteredFriends.length === 1 ? "friend" : "friends"}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredFriends.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <UsersRound size={24} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {friends.length === 0
                  ? "Your friends list is empty"
                  : "No matching friends"}
              </h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
                {friends.length === 0
                  ? "Add someone to start building your study connections."
                  : "Try another name or username."}
              </p>
              {friends.length === 0 && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="mt-5 gap-2 rounded-xl"
                >
                  <UserPlus size={16} /> Add your first friend
                </Button>
              )}
            </div>
          ) : (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className={`flex items-center gap-4 rounded-2xl border border-[#E8E5DB] bg-white p-4 ${cardHover}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-lg font-semibold text-[#3B5998]">
                  {friend.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-slate-900">
                    {friend.name}
                  </p>
                  {friend.username && (
                    <p className="mt-0.5 truncate text-xs text-[#9AA0A6]">
                      @{friend.username.replace(/^@/, "")}
                    </p>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-[#DCD6C2]"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFriend(friend.id)}
                  aria-label={`Remove friend ${friend.name}`}
                  className="min-h-[48px] min-w-[48px] rounded-xl p-2 text-slate-400 hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))
          )}
        </div>
      </section>

      <p className="pt-4 text-center text-xs text-[#9AA0A6]">
        This is a local friends list. Friend requests, accounts, and shared
        connections are not connected yet. Data resets when you refresh.
      </p>
    </main>
  );
}
