"use client";

import Link from "next/link";
import { Menu, X, Search, Bell } from "lucide-react";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const publicNav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Competency Framework", href: "/competency/competency-framework" },
  { name: "Learning Ecosystem", href: "/learning/learning-ecosystem" },
  { name: "Security", href: "/security" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
              SA
            </div>
            <span className="text-sm font-semibold text-primary hidden sm:inline">SANKHYA AI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {publicNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded transition-colors" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            {isLoaded && isSignedIn && (
              <>
                <Link href="/dashboard/notifications" className="relative p-2 text-gray-400 hover:text-gray-600 rounded transition-colors" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-accent" />
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <UserButton />
                </div>
              </>
            )}
            {isLoaded && !isSignedIn && (
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden py-2 border-t border-gray-100" aria-label="Mobile navigation">
            {publicNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded"
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
