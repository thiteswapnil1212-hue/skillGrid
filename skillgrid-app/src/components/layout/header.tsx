
"use client";

import { Menu, Search, Bell, ChevronDown } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-[#475569] hover:bg-[#F1F5F9] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden h-10 w-full max-w-[340px] items-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 sm:flex">
          <Search size={18} className="shrink-0 text-[#94A3B8]" />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
            className="w-full bg-transparent text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
          />

          <kbd className="hidden rounded border border-[#E2E8F0] bg-white px-1.5 py-0.5 text-[10px] text-[#94A3B8] md:inline">
            Ctrl K
          </kbd>
        </div>

        <p className="truncate text-sm font-semibold text-[#1E293B] sm:hidden">
          SkillGrid
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          aria-label="Search"
          className="rounded-lg p-2 text-[#64748B] hover:bg-[#F1F5F9] sm:hidden"
        >
          <Search size={20} />
        </button>

        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-[#64748B] hover:bg-[#F1F5F9]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#3B5998] ring-2 ring-white" />
        </button>

        <div className="hidden h-8 w-px bg-[#E2E8F0] sm:block" />

        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-[#F8FAFC]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8EEF9] text-sm font-bold text-[#3B5998]">
            S
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[#1E293B]">
              Student
            </p>
            <p className="text-xs text-[#64748B]">My account</p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-[#94A3B8] sm:block"
          />
        </button>
      </div>
    </header>
  );
}