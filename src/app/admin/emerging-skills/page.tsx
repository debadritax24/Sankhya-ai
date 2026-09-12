"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

const emergingSkills = [
  { name: "AI/ML", currentOrg: 35, futureDemand: 82, gap: 47, priority: "CRITICAL" as const },
  { name: "Cloud Computing", currentOrg: 28, futureDemand: 75, gap: 47, priority: "CRITICAL" as const },
  { name: "Data Engineering", currentOrg: 40, futureDemand: 70, gap: 30, priority: "HIGH" as const },
  { name: "GIS", currentOrg: 45, futureDemand: 65, gap: 20, priority: "MEDIUM" as const },
  { name: "Cybersecurity", currentOrg: 50, futureDemand: 70, gap: 20, priority: "MEDIUM" as const },
  { name: "Advanced Analytics", currentOrg: 42, futureDemand: 72, gap: 30, priority: "HIGH" as const },
];

export default function AdminEmergingSkillsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Emerging Skills" }]} role="admin">
      <PageHeader title="Emerging Skill Requirements" description="Projected future skill demands and organization readiness" />

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DDDAD4]">
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Skill</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Org Current</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Future Demand</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Gap</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Priority</th>
                </tr>
              </thead>
              <tbody>
                {emergingSkills.map((s) => (
                  <tr key={s.name} className="border-b border-[#DDDAD4] hover:bg-[#FCFBF8]">
                    <td className="py-3 px-2 font-medium text-[#080D2B]">{s.name}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={s.currentOrg} className="w-20" size="sm" />
                        <span className="text-xs">{s.currentOrg}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={s.futureDemand} className="w-20" size="sm" />
                        <span className="text-xs">{s.futureDemand}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-[#9B3B3B]">{s.gap}%</td>
                    <td className="py-3 px-2"><Badge variant={s.priority === "CRITICAL" ? "error" : s.priority === "HIGH" ? "warning" : "accent"}>{s.priority}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[#8D837A]">Prototype: Demand projections are configured estimates, not official government forecasts.</p>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
