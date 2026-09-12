"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({ placeholder = "Search...", value, onChange, className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8D837A]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-md border border-[#8D837A] bg-white py-2 pl-10 pr-4 text-sm text-[#080D2B] placeholder:text-[#8D837A] focus:border-[#080D2B] focus:outline-none focus:ring-1 focus:ring-[#080D2B]"
      />
    </div>
  );
}
