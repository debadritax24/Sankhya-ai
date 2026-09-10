"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Target,
  TrendingDown,
  BookOpen,
  ClipboardCheck,
  Bot,
  Route,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const learnerNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/profile", icon: User },
  { name: "Competency", href: "/competency", icon: Target },
  { name: "Skill Gaps", href: "/skill-gap", icon: TrendingDown },
  { name: "Learning", href: "/learning", icon: BookOpen },
  { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
  { name: "AI Tutor", href: "/ai-tutor", icon: Bot },
  { name: "Career Path", href: "/career-path", icon: Route },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

const trainerNav = [
  { name: "Dashboard", href: "/trainer", icon: LayoutDashboard },
  { name: "Content", href: "/trainer/content", icon: BookOpen },
  { name: "Assessments", href: "/trainer/assessments", icon: ClipboardCheck },
];

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Workforce", href: "/admin/workforce", icon: User },
  { name: "Competencies", href: "/admin/competencies", icon: Target },
  { name: "Skill Gaps", href: "/admin/skill-gaps", icon: TrendingDown },
  { name: "Learning", href: "/admin/learning", icon: BookOpen },
  { name: "Assessments", href: "/admin/assessments", icon: ClipboardCheck },
  { name: "Emerging Skills", href: "/admin/emerging-skills", icon: TrendingDown },
  { name: "Departments", href: "/admin/departments", icon: User },
];

interface SidebarProps {
  role?: "learner" | "trainer" | "admin";
}

export function Sidebar({ role = "learner" }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = role === "admin" ? adminNav : role === "trainer" ? trainerNav : learnerNav;

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
