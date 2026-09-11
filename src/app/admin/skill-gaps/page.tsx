import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getSkillGaps } from "@/lib/data";

export default async function AdminSkillGapsPage() {
  const skillGaps = await getSkillGaps();
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Skill Gaps" }]} role="admin">
      <PageHeader title="Organization-Wide Skill Gaps" description="Most common and critical skill gaps across departments" />

      <div className="grid gap-4">
        {skillGaps.map((g) => (
          <Card key={g.id}>
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{g.skillName}</h3>
                    <Badge variant={g.priority === "CRITICAL" ? "error" : g.priority === "HIGH" ? "warning" : "accent"}>{g.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{g.reason}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Avg Gap: {g.gap} points</span>
                    <span>Future Demand: {Math.round(g.futureDemandWeight * 100)}%</span>
                    <span>Role Importance: {Math.round(g.roleImportanceWeight * 100)}%</span>
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <ProgressBar value={100 - g.gap} />
                  <p className="text-xs text-gray-500 mt-1 text-center">Org Coverage: {100 - g.gap}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
