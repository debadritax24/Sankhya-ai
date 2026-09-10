"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressBarVariants = cva("h-2 rounded-full transition-all duration-500", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-success",
      warning: "bg-accent",
      error: "bg-error",
      accent: "bg-accent",
    },
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface ProgressBarProps extends VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, showLabel = false, variant, size, className }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const autoVariant =
    percentage >= 75 ? "success" : percentage >= 50 ? "warning" : percentage >= 25 ? "default" : "error";

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(progressBarVariants({ variant: variant || autoVariant, size }))}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-gray-500 text-right">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}
