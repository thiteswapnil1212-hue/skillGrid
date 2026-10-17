"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  CheckSquare,
  Clock3,
  Code2,
  BookOpen,
  Target,
  Trophy,
  Activity,
  Calendar,
  AlertCircle,
  Users,
  Flame,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const miniStats = [
  {
    icon: Clock3,
    tile: "bg-[#F3E8FF] text-[#7C3AED]",
    value: "0h 0m",
    label: "Focus Time"
  },
  {
    icon: Code2,
    tile: "bg-[#EAF7EC] text-[#2F9E44]",
    value: "0",
    label: "DSA Solved"
  },
  {
    icon: BookOpen,
    tile: "bg-[#FFF7E0] text-[#B97E0C]",
    value: "0%",
    label: "Academic"
  },
  {
    icon: Target,
    tile: "bg-[#FEF2F2] text-[#DC2626]",
    value: "0",
    label: "Current Streak"
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">Overview</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {greeting}, <em className="italic">Student</em>
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">{today}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7E0] px-3 py-2 text-[11px] font-semibold text-[#B97E0C]">
              <Flame size={14} />
              0 day streak
            </span>
            <Button size="sm" className="gap-2" onClick={() => router.push("/tasks")}>
              <Plus size={16} />
              <span>Quick Add</span>
            </Button>
          </div>
        </div>
      </section>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        {/* Bento stats — asymmetric: 2 horizontal feature cards + 4 mini cards + dark tile */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <motion.div variants={item} className="col-span-2">
            <Card className="h-full">
              <CardContent className="flex h-full items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Tasks Today</p>
                  <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-900 tabular-nums">0</p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                  <CheckSquare size={24} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {miniStats.map((stat) => (
            <motion.div key={stat.label} variants={item} className="h-full">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.tile}`}>
                      <stat.icon size={20} />
                    </div>
                  </div>
                  <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">{stat.value}</p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div variants={item} className="col-span-2 lg:col-span-1">
            <Card className="h-full">
              <CardContent className="flex h-full items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Level 1</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
                    0 <span className="text-sm text-slate-500 font-medium">XP</span>
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF7E0] text-[#B97E0C]">
                  <Trophy size={20} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dark contrast tile */}
          <motion.div variants={item} className="col-span-2">
            <div className="flex h-full items-center gap-4 rounded-3xl bg-[#1E293B] p-6 text-white">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Quote size={20} />
              </div>
              <p className="text-xl font-semibold italic tracking-tight text-white">
                Keep moving forward.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-8 xl:col-span-2">
            {/* Today's Tasks */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF0FA] text-[#3B5998]">
                    <CheckSquare size={18} />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">Today&apos;s Tasks</h2>
                </div>
                <Link href="/tasks" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#3B5998] hover:underline">
                  View all
                </Link>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                      <CheckSquare size={26} />
                    </div>
                    <p className="text-base font-semibold text-slate-900">No tasks for today</p>
                    <p className="mt-1 text-sm text-[#6B7280]">Enjoy your free time or get ahead on upcoming work.</p>
                    <Button variant="outline" size="sm" className="mt-5" onClick={() => router.push("/tasks")}>Add a task</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* DSA Progress & Academic Progress row */}
            <div className="grid gap-8 sm:grid-cols-2">
              <motion.div variants={item} className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF7EC] text-[#2F9E44]">
                      <Code2 size={18} />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">DSA Arena</h2>
                  </div>
                  <Link href="/dsa" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#3B5998] hover:underline">
                    Tracker
                  </Link>
                </div>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EC] text-[#2F9E44]">
                        <Code2 size={26} />
                      </div>
                      <p className="text-base font-semibold text-slate-900">No problems solved.</p>
                      <Button variant="ghost" size="sm" className="mt-3 text-[#2F9E44] hover:text-[#2F9E44] hover:bg-[#EAF7EC]" onClick={() => router.push("/dsa")}>Start tracking</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF7E0] text-[#B97E0C]">
                      <BookOpen size={18} />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">Academics</h2>
                  </div>
                  <Link href="/academics" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#3B5998] hover:underline">
                    Overview
                  </Link>
                </div>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7E0] text-[#B97E0C]">
                        <BookOpen size={26} />
                      </div>
                      <p className="text-base font-semibold text-slate-900">No subjects added yet.</p>
                      <Button variant="ghost" size="sm" className="mt-3 text-[#B97E0C] hover:text-[#B97E0C] hover:bg-[#FFF7E0]" onClick={() => router.push("/academics")}>Add subject</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#DC2626]">
                  <AlertCircle size={18} />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Upcoming Deadlines</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#DC2626]">
                      <Calendar size={24} />
                    </div>
                    <p className="text-base font-semibold text-slate-900">No upcoming deadlines.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF0FA] text-[#3B5998]">
                  <Activity size={18} />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Weekly Activity</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex h-[160px] items-center justify-center rounded-2xl border border-dashed border-[#E8E5DB] bg-white/60">
                    <p className="text-sm font-medium text-[#9AA0A6]">Chart data unavailable</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                  <Users size={18} />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Community</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
                    <p className="text-sm font-medium text-[#6B7280]">Not participating in any challenges.</p>
                    <Link href="/challenges" className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#7C3AED] hover:underline">Find challenges</Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
