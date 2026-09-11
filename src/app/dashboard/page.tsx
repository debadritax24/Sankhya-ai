"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionHeader } from "@/components/ui/section-header";
import { Target, TrendingDown, BookOpen, ClipboardCheck, Bot } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-provider";
import { competencyStats, competencyDomainSummaries, skillGaps, courses, assessments, learningProgress } from "@/lib/constants/mock-data";

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.name?.split(" ")[0] || "User";
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard" }]}>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Good morning, {firstName}</h1>
        <p className="mt-1 text-gray-500">Your competency profile is {competencyStats.overallScore}% complete. Continue learning to close your skill gaps.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Competency Readiness" value={`${competencyStats.overallScore}%`} icon={<Target className="h-5 w-5" />} />
        <StatCard label="Skill Gaps" value={competencyStats.criticalGaps + competencyStats.highPriorityGaps} icon={<TrendingDown className="h-5 w-5" />} />
        <StatCard label="Courses In Progress" value={competencyStats.coursesInProgress} icon={<BookOpen className="h-5 w-5" />} />
        <StatCard label="Assessments Done" value={competencyStats.assessmentsCompleted} icon={<ClipboardCheck className="h-5 w-5" />} />
      </div>

      {/* Competency Overview */}
      <Card className="mb-6">
        <CardHeader>
          <SectionHeader title="Competency Overview" action={<Link href="/competency"><Button variant="ghost" size="sm">View All</Button></Link>} />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {competencyDomainSummaries.map((d) => (
              <div key={d.domain} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{d.name}</h3>
                  {d.criticalGaps > 0 && <Badge variant="error">{d.criticalGaps} Critical</Badge>}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-primary">{d.averageScore}%</span>
                  <span className="text-xs text-gray-500">/ {d.requiredScore}%</span>
                </div>
                <ProgressBar value={d.averageScore} />
                <p className="mt-2 text-xs text-gray-500">{d.skillCount} skills · Gap: {d.gap > 0 ? d.gap : 0}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Top Skill Gaps */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <SectionHeader title="Top Skill Gaps" action={<Link href="/skill-gap"><Button variant="ghost" size="sm">View All</Button></Link>} />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillGaps.slice(0, 4).map((g) => (
                <div key={g.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{g.skillName}</p>
                    <p className="text-xs text-gray-500">Gap: {g.gap} points</p>
                  </div>
                  <Badge variant={g.priority === "CRITICAL" ? "error" : g.priority === "HIGH" ? "warning" : "accent"}>
                    {g.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended For You */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionHeader title="Recommended For You" action={<Link href="/learning/recommended"><Button variant="ghost" size="sm">View All</Button></Link>} />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{c.title}</h4>
                      <Badge variant="secondary" className="text-xs">{c.provider}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{c.duration} · {c.level} · {c.competencyNames.join(", ")}</p>
                    {c.whyRecommended && <p className="text-xs text-gray-600 italic">{c.whyRecommended}</p>}
                  </div>
                  <Link href={`/learning/${c.id}`}><Button variant="outline" size="sm">Start</Button></Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <SectionHeader title="Continue Learning" action={<Link href="/learning/progress"><Button variant="ghost" size="sm">View All</Button></Link>} />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningProgress.filter((lp) => !lp.completedAt).map((lp) => (
                <div key={lp.courseId}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{lp.courseName}</h4>
                    <span className="text-xs text-gray-500">{lp.progressPercent}%</span>
                  </div>
                  <ProgressBar value={lp.progressPercent} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assessment */}
        <Card>
          <CardHeader>
            <SectionHeader title="Recent Assessment" action={<Link href="/assessments"><Button variant="ghost" size="sm">View All</Button></Link>} />
          </CardHeader>
          <CardContent>
            {assessments.filter((a) => a.status === "completed").slice(0, 2).map((a) => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.title}</p>
                  <p className="text-xs text-gray-500">Score: {a.score}% · {a.completedAt}</p>
                </div>
                <Badge variant={a.passed ? "success" : "error"}>{a.passed ? "Passed" : "Failed"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insight */}
      <Card>
        <CardHeader>
          <SectionHeader title="AI Insight" action={<Link href="/ai-tutor"><Button variant="ghost" size="sm">Ask AI Tutor</Button></Link>} />
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-gray-700">
              <strong>Critical Gap:</strong> Your AI/ML competency is at 24% while your role requires 60%. This is your highest-priority skill gap. Consider starting with &quot;Introduction to Machine Learning for Government&quot; on iGOT Karmayogi.
            </p>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
