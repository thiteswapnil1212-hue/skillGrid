import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200": variant === "default",
          "border-transparent bg-success-light text-success hover:bg-success-light/80": variant === "success",
          "border-transparent bg-warning-light text-warning hover:bg-warning-light/80": variant === "warning",
          "border-transparent bg-danger-light text-danger hover:bg-danger-light/80": variant === "danger",
          "border-transparent bg-primary-light text-primary hover:bg-primary-light/80": variant === "info",
          "text-slate-900 border-slate-200 hover:bg-slate-100": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
