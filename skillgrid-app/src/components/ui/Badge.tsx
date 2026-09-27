import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  let variantStyles = "";
  switch (variant) {
    case "default":
      variantStyles = "border-transparent bg-slate-100 text-slate-900";
      break;
    case "success":
      variantStyles = "border-transparent bg-success-light text-success";
      break;
    case "warning":
      variantStyles = "border-transparent bg-warning-light text-warning";
      break;
    case "danger":
      variantStyles = "border-transparent bg-danger-light text-danger";
      break;
    case "info":
      variantStyles = "border-transparent bg-primary-light text-primary";
      break;
    case "outline":
      variantStyles = "text-slate-900 border-slate-200";
      break;
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${variantStyles} ${className}`}
      {...props}
    />
  );
}
