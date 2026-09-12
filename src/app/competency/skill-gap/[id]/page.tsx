import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { skillGaps, courses } from "@/lib/constants/mock-data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SkillGapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gap = skillGaps.find((g) => g.id === id);

  if (!gap) return notFound();

  const recommendedCourses = courses.filter((c) => gap.recommendedCourses.includes(c.id));

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Skill Gaps", href: "/competency/skill-gap" }, { label: gap.skillName }]}>
      <PageHeader title={`${gap.skillName} — Skill Gap Detail`} description={gap.reason} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Gap Analysis</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#FCFBF8] rounded-lg">
                <p className="text-sm text-[#77746F]">Current Level</p>
                <p className="text-3xl font-bold text-[#080D2B]">{gap.currentLevel}%</p>
              </div>
              <div className="p-4 bg-[#FCFBF8] rounded-lg">
                <p className="text-sm text-[#77746F]">Required Level</p>
                <p className="text-3xl font-bold text-[#080D2B]">{gap.requiredLevel}%</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-[#77746F]">Gap</p>
                <p className="text-3xl font-bold text-[#9B3B3B]">{gap.gap} pts</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#77746F] mb-2">Progress to Required Level</h3>
              <ProgressBar value={gap.currentLevel} size="lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#77746F]">Priority</p>
                <Badge variant={gap.priority === "CRITICAL" ? "error" : gap.priority === "HIGH" ? "warning" : "accent"}>{gap.priority}</Badge>
              </div>
              <div>
                <p className="text-sm text-[#77746F]">Future Demand</p>
                <p className="text-sm font-medium">{Math.round(gap.futureDemandWeight * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Why This Skill?</CardTitle></CardHeader>
          <CardContent className="text-sm text-[#77746F] space-y-3">
            <p>{gap.reason}</p>
            <div className="p-3 bg-[#FCFBF8] rounded-lg">
              <p className="font-medium text-[#080D2B] text-xs mb-1">AI Analysis</p>
              <p className="text-xs">This skill has a gap of {gap.gap} points with a future demand weight of {Math.round(gap.futureDemandWeight * 100)}%. It is important for your current role ({Math.round(gap.roleImportanceWeight * 100)}% role importance).</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <SectionHeader title="Recommended Learning" action={<Link href="/learning/recommended"><Button variant="ghost" size="sm">View All</Button></Link>} />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedCourses.map((c) => (
              <div key={c.id} className="border border-[#DDDAD4] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{c.provider}</Badge>
                  <span className="text-xs text-[#77746F]">{c.duration}</span>
                </div>
                <h4 className="font-medium text-[#080D2B] mb-1">{c.title}</h4>
                <p className="text-xs text-[#77746F] mb-3">{c.level} · {c.competencyNames.join(", ")}</p>
                <Link href={`/learning/${c.id}`}><Button variant="outline" size="sm" className="w-full">Start Learning</Button></Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-[#080D2B]">{title}</h3>
      {action}
    </div>
  );
}
