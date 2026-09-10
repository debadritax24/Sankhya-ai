"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { departments } from "@/lib/constants/mock-data";

export default function AdminDepartmentsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Departments" }]} role="admin">
      <PageHeader title="Department Analytics" description="Compare competency, gaps, and learning across departments" />

      <div className="grid gap-6">
        {departments.map((d) => (
          <Card key={d.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{d.name}</h3>
                    <Badge variant="secondary">{d.code}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Officials</p>
                      <p className="text-lg font-bold text-primary">{d.officialCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Avg Competency</p>
                      <p className="text-lg font-bold text-primary">{d.avgCompetency}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Top Gap</p>
                      <Badge variant="warning">{d.topGap}</Badge>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <p className="text-xs text-gray-500 mb-1">Competency Level</p>
                  <ProgressBar value={d.avgCompetency} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
