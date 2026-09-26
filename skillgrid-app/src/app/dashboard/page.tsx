
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  Clock3,
  Code2,
  FolderKanban,
  Target,
} from "lucide-react";

const quickLinks = [
  {
    title: "Tasks",
    description: "Manage your daily work and priorities.",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Academics",
    description: "Organize subjects and academic goals.",
    href: "/academics",
    icon: BookOpen,
  },
  {
    title: "DSA Arena",
    description: "Track your coding practice and progress.",
    href: "/dsa",
    icon: Code2,
  },
  {
    title: "Development",
    description: "Keep track of projects and learning.",
    href: "/development",
    icon: FolderKanban,
  },
  {
    title: "Focus Timer",
    description: "Set aside time for focused work.",
    href: "/focus-timer",
    icon: Clock3,
  },
  {
    title: "Habits",
    description: "Build routines and track consistency.",
    href: "/habits",
    icon: Target,
  },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8">
      <section className="border-b border-slate-200 pb-6">
        <p className="text-sm font-medium text-blue-700">
          Dashboard
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Your workspace
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Keep your tasks, academics, coding practice, and personal
          development organized in one place.
        </p>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your activity summary will appear here once you start
            using SkillGrid.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2.5">
                <CheckSquare className="h-5 w-5 text-blue-700" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                Tasks completed
              </p>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              No activity recorded yet
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-violet-50 p-2.5">
                <Clock3 className="h-5 w-5 text-violet-700" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                Focus time
              </p>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              No sessions recorded yet
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2.5">
                <Code2 className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                DSA problems
              </p>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              No problems recorded yet
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-50 p-2.5">
                <Target className="h-5 w-5 text-orange-700" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                Goals
              </p>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              No goals added yet
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick access
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Open a section to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300 hover:bg-slate-50"
              >
                <div className="rounded-lg bg-slate-100 p-3 transition-colors group-hover:bg-blue-50">
                  <Icon className="h-5 w-5 text-slate-600 group-hover:text-blue-700" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}