"use client";

import Link from "next/link";
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
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Good morning, Student
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">{today}</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus size={16} />
          <span>Quick Add</span>
        </Button>
      </section>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Summary Statistics */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <motion.div variants={item} className="h-full">
            <Card className="h-full border-primary/20 bg-primary/5">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-2 text-primary">
                  <CheckSquare size={16} />
                  <span className="text-xs font-semibold">Tasks Today</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">0</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full border-violet-600/20 bg-violet-600/5">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-2 text-violet-600">
                  <Clock3 size={16} />
                  <span className="text-xs font-semibold">Focus Time</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">0h 0m</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full border-emerald-600/20 bg-emerald-600/5">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Code2 size={16} />
                  <span className="text-xs font-semibold">DSA Solved</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">0</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full border-amber-600/20 bg-amber-600/5">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-2 text-amber-600">
                  <BookOpen size={16} />
                  <span className="text-xs font-semibold">Academic</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">0%</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full border-orange-600/20 bg-orange-600/5">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-2 text-orange-600">
                  <Target size={16} />
                  <span className="text-xs font-semibold">Current Streak</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">0</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item} className="h-full">
            <Card className="h-full border-yellow-500/20 bg-yellow-500/5">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-2 text-yellow-600">
                  <Trophy size={16} />
                  <span className="text-xs font-semibold">Level 1</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">0 <span className="text-sm text-slate-500 font-medium">XP</span></p>
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
              <Card>
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
                    <div className="rounded-full bg-white shadow-sm border border-slate-100 p-4 mb-4 text-slate-400">
                      <CheckSquare size={26} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">No tasks for today</p>
                    <p className="text-xs text-slate-500 mt-1.5 max-w-xs">Enjoy your free time or get ahead on upcoming work.</p>
                    <Button variant="outline" size="sm" className="mt-5">Add a task</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* DSA Progress & Academic Progress row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div variants={item}>
                <Card className="h-full">
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
                      <p className="text-sm text-slate-500 font-medium">No problems solved yet.</p>
                      <Button variant="ghost" size="sm" className="mt-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">Start tracking</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full">
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
                      <p className="text-sm text-slate-500 font-medium">No subjects added yet.</p>
                      <Button variant="ghost" size="sm" className="mt-3 text-amber-600 hover:text-amber-700 hover:bg-amber-50">Add subject</Button>
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
              <Card>
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
                    <div className="rounded-full bg-slate-50 p-3 mb-3 text-slate-300">
                      <Calendar size={24} />
                    </div>
                    <p className="text-sm font-medium text-slate-500">No upcoming deadlines.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={item}>
              <Card>
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
              <Card>
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