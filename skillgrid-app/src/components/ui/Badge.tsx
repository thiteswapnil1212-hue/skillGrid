import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors",
        {
          "bg-[#F1F0EB] text-slate-700 hover:bg-[#E8E5DB]": variant === "default",
          "bg-[#EAF7EC] text-[#2F9E44] hover:bg-[#EAF7EC]/70": variant === "success",
          "bg-[#FFF7E0] text-[#B97E0C] hover:bg-[#FFF7E0]/70": variant === "warning",
          "bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]/70": variant === "danger",
          "bg-[#EAF0FA] text-[#3B5998] hover:bg-[#EAF0FA]/70": variant === "info",
          "border border-[#E8E5DB] bg-white text-slate-700 hover:bg-[#F7F6F2]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
