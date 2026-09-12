"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  { name: "Workforce Competency Report", desc: "Organization-wide competency levels and trends", status: "Available" },
  { name: "Skill Gap Analysis", desc: "Most critical gaps by department and role", status: "Available" },
  { name: "Learning Effectiveness", desc: "Training impact on competency improvement", status: "Available" },
  { name: "Assessment Performance", desc: "Pass rates, weak areas, question analysis", status: "Available" },
  { name: "Emerging Skills Forecast", desc: "Future skill demand projections", status: "Available" },
];

export default function AdminReportsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Reports" }]} role="admin">
      <PageHeader title="Reports & Insights" description="Export and analyze organizational data" />

      <div className="grid gap-4">
        {reports.map((r) => (
          <Card key={r.name}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#080D2B]">{r.name}</h3>
                <p className="text-sm text-[#77746F]">{r.desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">{r.status}</Badge>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
