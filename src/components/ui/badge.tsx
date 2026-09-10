import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary text-text-inverse border-transparent",
    secondary: "bg-gray-100 text-gray-900 border-transparent",
    outline: "text-gray-700 border-gray-300",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-accent/10 text-accent-dark border-accent/20",
    error: "bg-error/10 text-error border-error/20",
    accent: "bg-accent/10 text-accent-dark border-accent/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
