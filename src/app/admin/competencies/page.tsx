"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { competencyDomainSummaries, competencies } from "@/lib/constants/mock-data";

export default function AdminCompetenciesPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Competencies" }]} role="admin">
      <PageHeader title="Organization Competency Analytics" description="Aggregate competency levels across the organization" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {competencyDomainSummaries.map((d) => (
          <Card key={d.domain}>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{d.name}</h3>
              <p className="text-3xl font-bold text-primary mb-2">{d.averageScore}%</p>
              <ProgressBar value={d.averageScore} />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{d.skillCount} skills</span>
                <span>Gap: {d.gap > 0 ? d.gap : 0}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">All Competencies — Organization Average</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {competencies.map((c) => (
              <div key={c.id} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{c.name}</div>
                <div className="flex-1"><ProgressBar value={c.currentScore} /></div>
                <div className="w-20 text-right text-sm text-gray-500">{c.currentScore}%</div>
                <Badge variant={c.priority === "CRITICAL" ? "error" : c.priority === "HIGH" ? "warning" : "secondary"}>{c.priority}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
