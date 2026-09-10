"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  role?: "learner" | "trainer" | "admin";
}

export function AppLayout({ children, breadcrumbs, role = "learner" }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top government bar */}
      <div className="bg-primary text-text-inverse">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-8 items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="font-medium">Government of India</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Ministry of Statistics & Programme Implementation</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">हिन्दी</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <Header />

      {/* Content area with sidebar */}
      <div className="flex flex-1">
        <Sidebar role={role} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="mb-4">
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
