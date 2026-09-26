
import {
  CheckCircle2,
  Clock3,
  Flame,
  Target,
  BookOpen,
  Code2,
  ArrowUpRight,
  Plus,
  CalendarDays,
  Circle,
} from "lucide-react";

const stats = [
  {
    title: "Tasks Completed",
    value: "0/5",
    subtitle: "Today's progress",
    icon: CheckCircle2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Study Time",
    value: "0h 0m",
    subtitle: "Today's focus time",
    icon: Clock3,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Current Streak",
    value: "0 days",
    subtitle: "Keep showing up!",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Daily Goals",
    value: "0/3",
    subtitle: "Goals completed",
    icon: Target,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const tasks = [
  { title: "Practice DSA problems", category: "DSA", time: "30 min" },
  { title: "Revise academic subjects", category: "Academics", time: "45 min" },
  { title: "Work on a development project", category: "Development", time: "60 min" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Welcome */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Your personal productivity space
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back! 👋
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Ready to make today count? Let&apos;s keep making progress.
          </p>
        </div>

        <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800">
          <Plus size={18} />
          Add Task
        </button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                {stat.value}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Tasks */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Today&apos;s Tasks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Stay focused on what matters.
              </p>
            </div>

            <button className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900">
              View all
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex items-center gap-3 rounded-lg border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-slate-50"
              >
                <Circle size={20} className="shrink-0 text-slate-300" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {task.category}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-500">
                  {task.time}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 transition hover:border-blue-400 hover:text-blue-700">
            <Plus size={17} />
            Add a new task
          </button>
        </div>

        {/* Daily goals */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Daily Goals
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Small steps, steady progress.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl bg-blue-50/70 px-4 py-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-blue-100">
              <span className="text-2xl font-bold text-blue-700">0%</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-800">
              Keep going!
            </p>
            <p className="mt-1 text-center text-xs text-slate-500">
              Complete your goals to build momentum.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {[
              "Complete daily tasks",
              "Study for at least 2 hours",
              "Practice DSA",
            ].map((goal) => (
              <div key={goal} className="flex items-center gap-3">
                <Circle size={18} className="text-slate-300" />
                <span className="text-sm text-slate-600">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Access
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Jump back into your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300">
            <div className="rounded-xl bg-blue-50 p-3">
              <Code2 size={24} className="text-blue-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">DSA Arena</h3>
              <p className="mt-1 text-sm text-slate-500">
                Track your coding practice.
              </p>
            </div>
            <ArrowUpRight size={18} className="text-slate-400" />
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-300">
            <div className="rounded-xl bg-violet-50 p-3">
              <BookOpen size={24} className="text-violet-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">Academics</h3>
              <p className="mt-1 text-sm text-slate-500">
                Manage subjects and study.
              </p>
            </div>
            <ArrowUpRight size={18} className="text-slate-400" />
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300">
            <div className="rounded-xl bg-orange-50 p-3">
              <CalendarDays size={24} className="text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">Focus Timer</h3>
              <p className="mt-1 text-sm text-slate-500">
                Make time for deep work.
              </p>
            </div>
            <ArrowUpRight size={18} className="text-slate-400" />
          </div>
        </div>
      </section>
    </div>
  );
}