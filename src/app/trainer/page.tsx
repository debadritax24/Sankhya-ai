"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TrainerDashboardPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Trainer", href: "/trainer" }, { label: "Dashboard" }]} role="trainer">
      <PageHeader title="Trainer Dashboard" description="Manage content, assessments, and learner engagement" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Uploaded Materials" value="12" />
        <StatCard label="Generated Assessments" value="8" />
        <StatCard label="Questions in Bank" value="156" />
        <StatCard label="Pending Review" value="24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Uploads</CardTitle>
              <Link href="/trainer/content"><Button variant="ghost" size="sm">View All</Button></Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[{ name: "Sampling Methods Guide.pdf", status: "Ready", questions: 45 }, { name: "Data Analysis Handbook.pdf", status: "Processing", questions: 0 }, { name: "Python Tutorial.pptx", status: "Ready", questions: 32 }].map((f) => (
                <div key={f.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{f.name}</p>
                    <p className="text-xs text-gray-500">{f.questions} questions generated</p>
                  </div>
                  <Badge variant={f.status === "Ready" ? "success" : "secondary"}>{f.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pending Review</CardTitle>
              <Link href="/trainer/assessments"><Button variant="ghost" size="sm">Review All</Button></Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[{ q: "What is stratified sampling?", comp: "Survey Design", diff: "Medium" }, { q: "Explain SQL JOIN types", comp: "SQL", diff: "Easy" }, { q: "When to use R vs Python?", comp: "Programming", diff: "Hard" }].map((q, i) => (
                <div key={i} className="py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900">{q.q}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{q.comp}</Badge>
                    <Badge variant="outline">{q.diff}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
