"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/user-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }
    setUser({
      name: formData.name,
      email: formData.email,
      designation: formData.designation || "Statistical Officer",
      department: formData.department || "National Statistical Office",
      role: "LEARNER",
    });
    router.push("/dashboard");
  };

  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <p className="eyebrow mb-2">Create Account</p>
            <CardTitle className="heading-section text-2xl text-[#080D2B]">
              Join SANKHYA AI
            </CardTitle>
            <p className="text-sm text-[#77746F] mt-2">
              Start your skill development journey
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
                <label htmlFor="name" className="eyebrow mb-1 block">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full rounded border border-[#DDDAD4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#080D2B] placeholder-[#8D837A] focus:outline-none focus:ring-2 focus:ring-[#58C4C0]/20 focus:border-[#58C4C0]"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setError(""); }}
                />
              </div>
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
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setError(""); }}
                />
              </div>
              <div>
                <label htmlFor="designation" className="eyebrow mb-1 block">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  className="w-full rounded border border-[#DDDAD4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#080D2B] placeholder-[#8D837A] focus:outline-none focus:ring-2 focus:ring-[#58C4C0]/20 focus:border-[#58C4C0]"
                  placeholder="e.g. Junior Statistical Officer"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="department" className="eyebrow mb-1 block">
                  Department
                </label>
                <select
                  id="department"
                  className="w-full rounded border border-[#DDDAD4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#080D2B] focus:outline-none focus:ring-2 focus:ring-[#58C4C0]/20 focus:border-[#58C4C0]"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select department</option>
                  <option value="National Statistical Office">National Statistical Office</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Survey Design">Survey Design</option>
                  <option value="IT Infrastructure">IT Infrastructure</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-[#77746F]">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-[#080D2B] font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
