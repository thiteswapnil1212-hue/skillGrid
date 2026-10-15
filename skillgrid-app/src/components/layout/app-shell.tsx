
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Sidebar from "./sidebar";
import Header from "./header";
import BottomNav from "./bottom-nav";
import { SnackbarProvider } from "@/components/ui/Snackbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Let users dismiss the drawer with the Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <SnackbarProvider>
    <div className="h-screen h-[100dvh] overflow-hidden bg-white text-[#1E293B]">
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <div className="hidden w-[260px] shrink-0 border-r border-[#E2E8F0] lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />

          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain bg-white pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-safe">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav onMoreClick={() => setMobileMenuOpen(true)} />

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.button
              aria-label="Close navigation overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] overscroll-contain bg-[#F8FAFC] shadow-2xl pt-safe pb-safe"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="absolute right-3 top-5 z-10 rounded-lg p-2 text-[#64748B] transition-all hover:bg-[#E2E8F0] active:scale-95"
              >
                <X size={20} />
              </button>

              <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </SnackbarProvider>
  );
}