"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Platform", href: "/about" },
  { name: "Competencies", href: "/competency/competency-framework" },
  { name: "Learning", href: "/learning/learning-ecosystem" },
  { name: "Assessments", href: "/assessments" },
  { name: "Analytics", href: "/admin/analytics" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "#F7F6F3", borderColor: "#DDDAD4" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "#080D2B" }}
            >
              SANKHYA AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-1.5 text-xs font-medium rounded transition-colors hover:bg-[#080D2B]/5"
                style={{ color: "#77746F" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-3 pl-3 border-l" style={{ borderColor: "#DDDAD4" }}>
                <Link href="/dashboard/profile" className="text-xs font-medium" style={{ color: "#77746F" }}>
                  {user.name.split(" ")[0]}
                </Link>
                <button onClick={logout} className="text-xs font-medium hover:underline" style={{ color: "#77746F" }}>
                  Logout
                </button>
              </div>
            )}
            {!user && (
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
            <button
              type="button"
              className="lg:hidden p-2 rounded"
              style={{ color: "#77746F" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            className="lg:hidden py-2 border-t"
            style={{ borderColor: "#DDDAD4" }}
            aria-label="Mobile navigation"
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium rounded"
                style={{ color: "#77746F" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
