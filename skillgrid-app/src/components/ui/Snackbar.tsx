"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type SnackbarOptions = {
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
};

type ShowSnackbar = (message: string, options?: SnackbarOptions) => void;

const SnackbarContext = createContext<ShowSnackbar>(() => {});

export const useSnackbar = () => useContext(SnackbarContext);

type Snack = {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snack, setSnack] = useState<Snack | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSnackbar: ShowSnackbar = useCallback((message, options) => {
    if (timer.current) clearTimeout(timer.current);
    const id = Date.now();
    setSnack({
      id,
      message,
      actionLabel: options?.actionLabel,
      onAction: options?.onAction,
    });
    timer.current = setTimeout(
      () => setSnack((current) => (current?.id === id ? null : current)),
      options?.duration ?? 4000
    );
  }, []);

  const dismiss = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setSnack(null);
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <AnimatePresence>
        {snack && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="pointer-events-none fixed inset-x-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-[60] flex justify-center lg:bottom-8"
            role="status"
            aria-live="polite"
          >
            <div className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full bg-slate-900 py-3 pl-5 pr-3 text-sm text-white shadow-xl">
              <span className="truncate">{snack.message}</span>
              {snack.actionLabel && (
                <button
                  type="button"
                  onClick={() => {
                    snack.onAction?.();
                    dismiss();
                  }}
                  className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  {snack.actionLabel}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
}
