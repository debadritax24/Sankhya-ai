/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";



export function AdminClient({ departments, competencyDomainSummaries, deptData }: { departments: any[], competencyDomainSummaries: any[], deptData: any[] }) {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Dashboard" }]} role="admin">
      <PageHeader title="Administration Dashboard" description="Organization-wide competency intelligence overview" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Officials" value="1,400" />
        <StatCard label="Avg Competency" value="68%" />
        <StatCard label="Critical Gaps" value="12" />
        <StatCard label="Training Completion" value="74%" />
        <StatCard label="Assessment Pass Rate" value="82%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Competency by Domain */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Competency by Domain</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competencyDomainSummaries.map((d) => (
                <div key={d.domain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{d.name}</span>
                    <span className="text-sm text-[#77746F]">{d.averageScore}%</span>
                  </div>
                  <ProgressBar value={d.averageScore} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Comparison */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Department Competency</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="avgCompetency" fill="#080D2B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department List */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Departments</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DDDAD4]">
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Department</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Officials</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Avg Competency</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Top Gap</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.id} className="border-b border-[#DDDAD4]">
                    <td className="py-3 px-2 font-medium text-[#080D2B]">{d.name}</td>
                    <td className="py-3 px-2 text-right">{d.officialCount}</td>
                    <td className="py-3 px-2 text-right">{d.avgCompetency}%</td>
                    <td className="py-3 px-2"><Badge variant="warning">{d.topGap}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
