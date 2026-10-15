"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  Code2,
  LayoutDashboard,
  Menu,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Timer", href: "/focus-timer", icon: Timer },
  { name: "DSA", href: "/dsa", icon: Code2 },
];

type BottomNavProps = {
  onMoreClick: () => void;
};

/**
 * Android-style bottom navigation. Mobile/tablet only (lg:hidden) —
 * desktop keeps the sidebar.
 */
export default function BottomNav({ onMoreClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <div className="grid grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[64px] flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                isActive ? "text-primary" : "text-slate-500"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-x-4 inset-y-1.5 rounded-full bg-primary/10"
                />
              )}
              <Icon size={22} className="relative" />
              <span className="relative leading-none">{tab.name}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onMoreClick}
          aria-label="Open navigation menu"
          className="relative flex min-h-[64px] flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        >
          <Menu size={22} className="relative" />
          <span className="relative leading-none">More</span>
        </button>
      </div>
    </nav>
  );
}
