"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminAssessmentsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Assessments" }]} role="admin">
      <PageHeader title="Assessment Analytics" description="Organization-wide assessment performance and trends" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-[#080D2B]">82%</p><p className="text-xs text-[#77746F]">Pass Rate</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-[#080D2B]">67%</p><p className="text-xs text-[#77746F]">Avg Score</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-[#080D2B]">1,240</p><p className="text-xs text-[#77746F]">Assessments Taken</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-[#080D2B]">8.2</p><p className="text-xs text-[#77746F]">Avg Questions/Assessment</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Performance by Competency</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[{ name: "SQL", score: 72, pass: 85 }, { name: "Python", score: 58, pass: 68 }, { name: "Survey Design", score: 74, pass: 88 }, { name: "Data Viz", score: 65, pass: 78 }, { name: "AI/ML", score: 42, pass: 52 }].map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-32">{c.name}</span>
                  <span className="text-sm text-[#77746F]">Avg: {c.score}%</span>
                  <Badge variant={c.pass >= 80 ? "success" : c.pass >= 60 ? "warning" : "error"}>{c.pass}% pass</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Weak Competencies</CardTitle></CardHeader>
          <CardContent className="text-sm text-[#77746F]">
            <p className="mb-3">Competencies with lowest assessment performance:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Badge variant="error">AI/ML</Badge> 42% avg score — requires targeted training</li>
              <li className="flex items-center gap-2"><Badge variant="warning">Python</Badge> 58% avg score — intermediate courses needed</li>
              <li className="flex items-center gap-2"><Badge variant="accent">Data Visualization</Badge> 65% avg score — practice assessments recommended</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
