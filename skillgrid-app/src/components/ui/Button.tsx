import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    let variantStyles = "";
    switch (variant) {
      case "primary":
        variantStyles = "bg-primary text-white hover:bg-primary-hover";
        break;
      case "secondary":
        variantStyles = "bg-slate-100 text-slate-900 hover:bg-slate-200";
        break;
      case "outline":
        variantStyles = "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900";
        break;
      case "ghost":
        variantStyles = "hover:bg-slate-100 hover:text-slate-900 text-slate-700";
        break;
      case "destructive":
        variantStyles = "bg-danger text-white hover:bg-red-700";
        break;
    }

    let sizeStyles = "";
    switch (size) {
      case "sm":
        sizeStyles = "h-8 px-3 text-xs";
        break;
      case "md":
        sizeStyles = "h-10 px-4 py-2 text-sm";
        break;
      case "lg":
        sizeStyles = "h-12 px-8 text-base";
        break;
    }

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
