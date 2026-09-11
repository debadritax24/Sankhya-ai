import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getSkillGaps, getCompetencyDomainSummaries } from "@/lib/data";

export default async function CareerPathPage() {
  const skillGaps = await getSkillGaps();
  const competencyDomainSummaries = await getCompetencyDomainSummaries();

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Career Path" }]}>
      <PageHeader title="Career Path" description="Your career progression and future skill requirements" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Current → Target */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Career Progression</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-center p-4">
                <p className="text-xs text-gray-500 mb-1">Current Role</p>
                <p className="font-semibold text-gray-900">&quot;Senior Statistical Officer&quot;</p>
                <Badge variant="secondary" className="mt-2">Level 7</Badge>
              </div>
              <div className="flex-1 px-8">
                <div className="h-0.5 bg-gray-200 relative">
                  <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "45%" }} />
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Career Readiness: 45%</p>
              </div>
              <div className="text-center p-4">
                <p className="text-xs text-gray-500 mb-1">Target Role</p>
                <p className="font-semibold text-primary">Senior Statistical Officer</p>
                <Badge variant="accent" className="mt-2">Level 9</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Readiness Score */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Readiness Score</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-primary">45%</p>
            <p className="text-sm text-gray-500 mt-2">Overall career readiness</p>
            <p className="text-xs text-gray-400 mt-4">Based on your current competencies vs target role requirements</p>
          </CardContent>
        </Card>
      </div>

      {/* Domain Gaps for Target Role */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg">Domain Readiness for Target Role</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {competencyDomainSummaries.map((d) => (
              <div key={d.domain} className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">{d.name}</h4>
                <ProgressBar value={d.averageScore} />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Current: {d.averageScore}%</span>
                  <span>Required: {d.requiredScore + 5}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Skills */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Future Skills Required</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skillGaps.slice(0, 5).map((g) => (
              <div key={g.id} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{g.skillName}</div>
                <div className="flex-1"><ProgressBar value={g.currentLevel} /></div>
                <div className="w-24 text-right text-xs text-gray-500">{g.currentLevel}% → {g.requiredLevel + 10}%</div>
                <Badge variant={g.futureDemandWeight > 0.7 ? "error" : "secondary"}>{Math.round(g.futureDemandWeight * 100)}% demand</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
