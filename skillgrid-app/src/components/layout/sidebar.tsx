
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  GraduationCap,
  Code2,
  FolderKanban,
  Timer,
  Repeat2,
  Users,
  UsersRound,
  Trophy,
  Medal,
  Bell,
  UserRound,
  Settings,
  Grid2X2,
} from "lucide-react";

const navigation = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
      { name: "Academics", href: "/academics", icon: GraduationCap },
    ],
  },
  {
    label: "MY PROGRESS",
    items: [
      { name: "DSA Arena", href: "/dsa", icon: Code2 },
      { name: "Development", href: "/development", icon: FolderKanban },
      { name: "Focus Timer", href: "/focus-timer", icon: Timer },
      { name: "Habits", href: "/habits", icon: Repeat2 },
    ],
  },
  {
    label: "COMMUNITY",
    items: [
      { name: "Friends", href: "/friends", icon: Users },
      { name: "Study Groups", href: "/study-groups", icon: UsersRound },
      { name: "Challenges", href: "/challenges", icon: Trophy },
      { name: "Leaderboard", href: "/leaderboard", icon: Medal },
    ],
  },
  {
    label: "PERSONAL",
    items: [
      { name: "Achievements", href: "/achievements", icon: Grid2X2 },
      { name: "Notifications", href: "/notifications", icon: Bell },
      { name: "Profile", href: "/profile", icon: UserRound },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <div className="flex h-[76px] shrink-0 items-center border-b border-[#E2E8F0] px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B5998] text-white">
            <Grid2X2 size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#1E293B]">
              SkillGrid
            </h1>
            <p className="text-xs text-[#64748B]">
              Track. Learn. Grow.
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navigation.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-3 text-[11px] font-semibold tracking-[0.12em] text-[#94A3B8]">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#E8EEF9] text-[#3B5998]"
                        : "text-[#475569] hover:bg-[#EEF2F7] hover:text-[#1E293B]"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[#E2E8F0] p-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <p className="text-sm font-semibold text-[#1E293B]">
            Keep moving forward
          </p>
          <p className="mt-1 text-xs leading-5 text-[#64748B]">
            Small steps every day lead to big progress.
          </p>
        </div>
      </div>
    </aside>
  );
}