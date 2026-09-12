import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-[#080D2B]">{title}</h2>
        {description && <p className="mt-1 text-sm text-[#77746F]">{description}</p>}
      </div>
      {action}
    </div>
  );
}
