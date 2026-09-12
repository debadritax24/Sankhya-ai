import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { competencies, competencyDomainSummaries } from "@/lib/constants/mock-data";
import Link from "next/link";

export default function CompetencyPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Competency" }]}>
      <PageHeader title="Competency Profile" description="Your evidence-based competency assessment across all domains" />

      {/* Domain Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {competencyDomainSummaries.map((d) => (
          <Link key={d.domain} href={`/competency/${d.domain}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[#080D2B]">{d.name}</h3>
                {d.criticalGaps > 0 && <Badge variant="error">{d.criticalGaps}</Badge>}
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold text-[#080D2B]">{d.averageScore}%</span>
                <span className="text-sm text-[#77746F]">/ {d.requiredScore}%</span>
              </div>
              <ProgressBar value={d.averageScore} />
              <p className="mt-2 text-xs text-[#77746F]">{d.skillCount} skills · Gap: {d.gap > 0 ? d.gap : 0} points</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* All Competencies */}
      <Card>
        <CardHeader><CardTitle className="text-lg">All Competencies</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DDDAD4]">
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Skill</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Domain</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Current</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Required</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Gap</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Priority</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Trend</th>
                </tr>
              </thead>
              <tbody>
                {competencies.map((c) => (
                  <tr key={c.id} className="border-b border-[#DDDAD4] hover:bg-[#FCFBF8]">
                    <td className="py-3 px-2 font-medium text-[#080D2B]">{c.name}</td>
                    <td className="py-3 px-2 text-[#77746F] capitalize">{c.domain.replace("_", " ")}</td>
                    <td className="py-3 px-2 text-right">{c.currentScore}%</td>
                    <td className="py-3 px-2 text-right">{c.requiredScore}%</td>
                    <td className="py-3 px-2 text-right font-medium">{c.gap > 0 ? c.gap : "-"}</td>
                    <td className="py-3 px-2 text-right">
                      <Badge variant={c.priority === "CRITICAL" ? "error" : c.priority === "HIGH" ? "warning" : c.priority === "MEDIUM" ? "accent" : c.priority === "OK" ? "success" : "secondary"}>
                        {c.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 capitalize text-[#77746F]">{c.trend}</td>
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
