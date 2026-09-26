
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Sidebar from "./sidebar";
import Header from "./header";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#1E293B]">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden w-[260px] shrink-0 border-r border-[#E2E8F0] lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />

          <main className="min-w-0 flex-1 bg-white">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-[#F8FAFC] shadow-xl">
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-3 top-5 z-10 rounded-lg p-2 text-[#64748B] hover:bg-[#E2E8F0]"
            >
              <X size={20} />
            </button>

            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}