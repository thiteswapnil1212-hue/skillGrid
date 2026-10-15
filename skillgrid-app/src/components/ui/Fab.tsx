"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

type FabProps = {
  onClick: () => void;
  label: string;
};

/**
 * Material-style floating action button.
 * Rendered on mobile/tablet only (lg:hidden) — desktop keeps header buttons.
 */
export default function Fab({ onClick, label }: FabProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
    >
      <Plus size={26} />
    </motion.button>
  );
}
