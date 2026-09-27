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
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Good morning, Student
          </h1>
          <p className="text-sm text-slate-500">{today}</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus size={16} />
          <span>Quick Add</span>
        </Button>
      </section>

      {/* Summary Statistics */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckSquare size={16} className="text-primary" />
              <span className="text-xs font-medium">Tasks Today</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock3 size={16} className="text-violet-600" />
              <span className="text-xs font-medium">Focus Time</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">0h 0m</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Code2 size={16} className="text-emerald-600" />
              <span className="text-xs font-medium">DSA Solved</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <BookOpen size={16} className="text-amber-600" />
              <span className="text-xs font-medium">Academic</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">0%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Target size={16} className="text-orange-600" />
              <span className="text-xs font-medium">Current Streak</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">0 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-xs font-medium">Level 1</span>
            </div>
            <p className="text-2xl font-semibold text-slate-900">0 XP</p>
          </CardContent>
        </Card>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 xl:col-span-2">
          {/* Today's Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckSquare size={18} className="text-primary" />
                Today's Tasks
              </CardTitle>
              <Link href="/tasks" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-slate-100 p-3 mb-3">
                  <CheckSquare size={24} className="text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-900">No tasks for today</p>
                <p className="text-xs text-slate-500 mt-1">Enjoy your free time or get ahead on upcoming work.</p>
                <Button variant="outline" size="sm" className="mt-4">Add a task</Button>
              </div>
            </CardContent>
          </Card>

          {/* DSA Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Code2 size={18} className="text-emerald-600" />
                DSA Progress
              </CardTitle>
              <Link href="/dsa" className="text-sm font-medium text-primary hover:underline">
                Arena
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-500">No problems solved yet.</p>
                <Button variant="ghost" size="sm" className="mt-2 text-primary">Start tracking</Button>
              </div>
            </CardContent>
          </Card>

          {/* Academic & Subject Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen size={18} className="text-amber-600" />
                Subject Progress
              </CardTitle>
              <Link href="/academics" className="text-sm font-medium text-primary hover:underline">
                Academics
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-500">No subjects added yet.</p>
                <Button variant="ghost" size="sm" className="mt-2 text-primary">Add subject</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle size={18} className="text-danger" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-slate-500">No upcoming deadlines.</p>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity size={18} className="text-blue-500" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[150px] items-center justify-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                <p className="text-xs text-slate-400">Chart data unavailable</p>
              </div>
            </CardContent>
          </Card>

          {/* Challenges and Groups */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users size={18} className="text-purple-600" />
                Challenges & Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center justify-center py-4 text-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <p className="text-sm text-slate-500">Not participating in any challenges.</p>
                  <Link href="/challenges" className="mt-1 text-xs font-medium text-primary hover:underline">Find challenges</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}