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
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type Period = "Weekly" | "Monthly" | "All Time";

const cardShadow =
  "shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const [search, setSearch] = useState("");

  const periods: Period[] = ["Weekly", "Monthly", "All Time"];

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          <Trophy size={14} />
          Community
        </p>
        <div className="mt-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Leaderboard
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Track rankings and celebrate progress with your community.
          </p>
        </div>
      </section>

      {/* Rankings card */}
      <Card
        className={`rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF7E0] text-[#B97E0C]">
                <Medal size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Community leaderboard
                </h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Rankings will appear once real user activity is connected.
                </p>
              </div>
            </div>
            <div className="flex rounded-xl border border-[#E8E5DB] bg-[#F7F6F2] p-1">
              {periods.map((item) => (
                <button
                  key={item}
                  onClick={() => setPeriod(item)}
                  className={`min-h-[48px] rounded-lg px-4 text-sm font-semibold transition ${
                    period === item
                      ? "bg-white text-[#3B5998] shadow-sm"
                      : "text-[#6B7280] hover:text-slate-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
              <LockKeyhole size={28} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">
              Leaderboard is not connected yet
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-[#6B7280]">
              Rankings need real user accounts and activity data. Once those
              are connected, you can see rankings based on points and completed
              challenges.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E8E5DB] bg-white px-4 py-2 text-xs font-medium text-[#6B7280]">
              <Info size={15} />
              No sample rankings are being displayed.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Honest stat placeholders — asymmetric: dark rank + light */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-3xl bg-[#1E293B] p-6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">
                Your rank
              </p>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-white tabular-nums">
                —
              </p>
              <p className="mt-1.5 text-xs text-slate-300/60">
                Available after activity tracking is connected
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
              <Trophy size={20} />
            </div>
          </div>
        </Card>
        <Card
          className={`rounded-3xl border border-[#E8E5DB] bg-white p-6 ${cardShadow}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Community members
              </p>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                —
              </p>
              <p className="mt-1.5 text-xs text-[#9AA0A6]">
                Available after user accounts are connected
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF7EC] text-[#2F9E44]">
              <Users size={20} />
            </div>
          </div>
        </Card>
      </section>

      {/* Find a member */}
      <Card
        className={`rounded-3xl border border-[#E8E5DB] bg-white ${cardShadow}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
                <Search size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Find a member
                </h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Search will work when community members are available.
                </p>
              </div>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA0A6]"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members..."
                aria-label="Search members"
                className="h-12 rounded-xl border-[#E8E5DB] bg-white pl-11 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
              />
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-[#E8E5DB] bg-white/60 px-4 py-8 text-center text-sm text-[#6B7280]">
            {search.trim()
              ? `No members found for "${search}".`
              : "Member profiles will appear here once connected."}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
