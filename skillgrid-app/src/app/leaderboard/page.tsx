
"use client";

import { useState } from "react";
import {
  Trophy,
  Search,
  Users,
  Medal,
  LockKeyhole,
  Info,
} from "lucide-react";

type Period = "Weekly" | "Monthly" | "All Time";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const [search, setSearch] = useState("");

  const periods: Period[] = ["Weekly", "Monthly", "All Time"];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Trophy size={16} />
          Community
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Leaderboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track rankings and celebrate progress with your community.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#3B5998]">
              <Medal size={18} />
              Rankings
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Community leaderboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Rankings will appear once real user activity is connected.
            </p>
          </div>

          <div className="flex rounded-lg bg-slate-100 p-1">
            {periods.map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`rounded-md px-3 py-2 text-xs font-medium transition sm:text-sm ${
                  period === item
                    ? "bg-white text-[#3B5998] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#3B5998]">
            <LockKeyhole size={28} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            Leaderboard is not connected yet
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Rankings need real user accounts and activity data. Once those are
            connected, you can see rankings based on points and completed
            challenges.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs text-slate-500 ring-1 ring-slate-200">
            <Info size={15} />
            No sample rankings are being displayed.
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Your rank</p>
            <Trophy size={19} className="text-[#3B5998]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-400">
            Available after activity tracking is connected
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Community members</p>
            <Users size={19} className="text-[#3B5998]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-400">
            Available after user accounts are connected
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Find a member</h2>
            <p className="mt-1 text-sm text-slate-500">
              Search will work when community members are available.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#3B5998]"
            />
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          {search.trim()
            ? `No members found for "${search}".`
            : "Member profiles will appear here once connected."}
        </div>
      </div>
    </div>
  );
}