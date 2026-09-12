import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {icon && <div className="mb-4 text-[#8D837A]">{icon}</div>}
      <h3 className="text-lg font-semibold text-[#080D2B]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[#77746F]">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
