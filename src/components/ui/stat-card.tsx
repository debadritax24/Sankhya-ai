import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, change, changeLabel, icon, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={cn(
              "text-sm font-medium",
              change >= 0 ? "text-success" : "text-error"
            )}
          >
            {change >= 0 ? "+" : ""}{change}%
          </span>
          {changeLabel && <span className="text-sm text-gray-500">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
