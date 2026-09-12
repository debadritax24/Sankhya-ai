"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/user-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    setUser({
      name: nameFromEmail,
      email,
      designation: "Statistical Officer",
      department: "National Statistical Office",
      role: "LEARNER",
    });
    router.push("/dashboard");
  };

  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <p className="eyebrow mb-2">Welcome Back</p>
            <CardTitle className="heading-section text-2xl text-[#080D2B]">
              Sign in to SANKHYA AI
            </CardTitle>
            <p className="text-sm text-[#77746F] mt-2">
              Access your skill intelligence platform
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm text-[#9B3B3B] bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="email" className="eyebrow mb-1 block">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded border border-[#DDDAD4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#080D2B] placeholder-[#8D837A] focus:outline-none focus:ring-2 focus:ring-[#58C4C0]/20 focus:border-[#58C4C0]"
                  placeholder="your.email@gov.in"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                />
              </div>
              <div>
                <label htmlFor="password" className="eyebrow mb-1 block">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full rounded border border-[#DDDAD4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#080D2B] placeholder-[#8D837A] focus:outline-none focus:ring-2 focus:ring-[#58C4C0]/20 focus:border-[#58C4C0]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-[#77746F]">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-[#080D2B] font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
