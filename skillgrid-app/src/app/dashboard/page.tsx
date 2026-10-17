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
  Users
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Overview</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {greeting}, Student
          </h1>
          <p className="mt-1 text-sm text-slate-500">{today}</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => router.push("/tasks")}>
          <Plus size={16} />
          <span>Quick Add</span>
        </Button>
      </section>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Summary Statistics */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <motion.div variants={item} className="h-full">
            <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B5998] to-[#2F477A] text-white shadow-sm">
                  <CheckSquare size={20} />
                </div>
                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">0</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Tasks Today</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-sm">
                  <Clock3 size={20} />
                </div>
                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">0h 0m</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Focus Time</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
                  <Code2 size={20} />
                </div>
                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">0</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">DSA Solved</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm">
                  <BookOpen size={20} />
                </div>
                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">0%</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Academic</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
                  <Target size={20} />
                </div>
                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">0</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Current Streak</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-sm">
                  <Trophy size={20} />
                </div>
                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">0 <span className="text-sm text-slate-500 font-medium">XP</span></p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Level 1</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 xl:col-span-2">
            {/* Today's Tasks */}
            <motion.div variants={item}>
              <Card className="rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                      <CheckSquare size={18} />
                    </div>
                    Today's Tasks
                  </CardTitle>
                  <Link href="/tasks" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
                    View all
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-10 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                    <div className="rounded-2xl bg-primary-light p-4 mb-4 text-primary">
                      <CheckSquare size={26} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">No tasks for today</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">Enjoy your free time or get ahead on upcoming work.</p>
                    <Button variant="outline" size="sm" className="mt-5" onClick={() => router.push("/tasks")}>Add a task</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* DSA Progress & Academic Progress row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div variants={item}>
                <Card className="h-full rounded-2xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-600/10 text-emerald-600">
                        <Code2 size={18} />
                      </div>
                      DSA Arena
                    </CardTitle>
                    <Link href="/dsa" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                      Tracker
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <div className="rounded-2xl bg-emerald-600/10 p-4 mb-4 text-emerald-600">
                        <Code2 size={26} />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">No problems solved.</p>
                      <Button variant="ghost" size="sm" className="mt-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => router.push("/dsa")}>Start tracking</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full rounded-2xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-600/10 text-amber-600">
                        <BookOpen size={18} />
                      </div>
                      Academics
                    </CardTitle>
                    <Link href="/academics" className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                      Overview
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <div className="rounded-2xl bg-amber-600/10 p-4 mb-4 text-amber-600">
                        <BookOpen size={26} />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">No subjects added yet.</p>
                      <Button variant="ghost" size="sm" className="mt-3 text-amber-600 hover:text-amber-700 hover:bg-amber-50" onClick={() => router.push("/academics")}>Add subject</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <motion.div variants={item}>
              <Card className="rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-danger/10 text-danger">
                      <AlertCircle size={18} />
                    </div>
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-2xl bg-danger/10 p-4 mb-4 text-danger">
                      <Calendar size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">No upcoming deadlines.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={item}>
              <Card className="rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                      <Activity size={18} />
                    </div>
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[160px] items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-400">Chart data unavailable</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Challenges and Groups */}
            <motion.div variants={item}>
              <Card className="rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-600/10 text-purple-600">
                      <Users size={18} />
                    </div>
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="text-sm text-slate-500 font-medium">Not participating in any challenges.</p>
                      <Link href="/challenges" className="mt-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">Find challenges</Link>
                    </div>
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