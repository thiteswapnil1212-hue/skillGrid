"use client";

import Link from "next/link";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Menu size={22} />
        </button>

        <div className="hidden h-10 w-full max-w-[340px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white sm:flex">
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        <p className="truncate text-sm font-semibold text-slate-900 sm:hidden">
          SkillGrid
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary border-2 border-white" />
        </Link>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <Link
          href="/profile"
          aria-label="My account"
          className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary shadow-sm">
            S
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none mb-1">
              Student
            </p>
            <p className="text-xs font-medium text-slate-500 leading-none">
              My account
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </Link>
      </div>
    </header>
  );
}