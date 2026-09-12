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
    <div className={cn("rounded-lg border border-[#DDDAD4] bg-white p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#77746F]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#080D2B]">{value}</p>
        </div>
        {icon && (
          <div className="rounded-lg bg-[#080D2B]/10 p-3 text-[#080D2B]">{icon}</div>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={cn(
              "text-sm font-medium",
              change >= 0 ? "text-[#4A7C59]" : "text-[#9B3B3B]"
            )}
          >
            {change >= 0 ? "+" : ""}{change}%
          </span>
          {changeLabel && <span className="text-sm text-[#77746F]">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
