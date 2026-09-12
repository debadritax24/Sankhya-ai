import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#080D2B] text-text-inverse border-transparent",
    secondary: "bg-[#F7F6F3] text-[#080D2B] border-transparent",
    outline: "text-[#77746F] border-[#8D837A]",
    success: "bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/20",
    warning: "bg-accent/10 text-accent-dark border-accent/20",
    error: "bg-[#9B3B3B]/10 text-[#9B3B3B] border-[#9B3B3B]/20",
    accent: "bg-accent/10 text-accent-dark border-accent/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#080D2B] focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
