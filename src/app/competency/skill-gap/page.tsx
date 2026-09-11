import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getSkillGaps } from "@/lib/data";
import Link from "next/link";

const priorityOrder = ["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;

export default async function SkillGapPage() {
  const skillGaps = await getSkillGaps();
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Skill Gaps" }]}>
      <PageHeader title="Skill Gap Analysis" description="AI-prioritized gaps between your current skills and role requirements" />

      {priorityOrder.map((priority) => {
        const gaps = skillGaps.filter((g) => g.priority === priority);
        if (gaps.length === 0) return null;
        return (
          <div key={priority} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{priority} Priority</h2>
              <Badge variant={priority === "CRITICAL" ? "error" : priority === "HIGH" ? "warning" : "accent"}>{gaps.length}</Badge>
            </div>
            <div className="grid gap-4">
              {gaps.map((g) => (
                <Link key={g.id} href={`/skill-gap/${g.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{g.skillName}</h3>
                            <Badge variant={priority === "CRITICAL" ? "error" : priority === "HIGH" ? "warning" : "accent"}>{g.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{g.reason}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <span>Current: <strong>{g.currentLevel}%</strong></span>
                            <span>Required: <strong>{g.requiredLevel}%</strong></span>
                            <span>Gap: <strong className="text-error">{g.gap} points</strong></span>
                          </div>
                        </div>
                        <div className="w-full md:w-48">
                          <ProgressBar value={g.currentLevel} />
                          <p className="text-xs text-gray-500 mt-1 text-center">{g.currentLevel} / {g.requiredLevel}</p>
                        </div>
                        <Button variant="outline" size="sm">View Path</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </AppLayout>
  );
}
