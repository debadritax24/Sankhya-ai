"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionHeader } from "@/components/ui/section-header";
import { Target, TrendingDown, BookOpen, ClipboardCheck, Bot } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/components/providers/user-provider";
import { competencyStats, competencyDomainSummaries, skillGaps, courses, assessments } from "@/lib/constants/mock-data";

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

      {/* Competency Domains */}
      <SectionHeader title="Competency Domains" description="Your skill levels across key areas" className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {competencyDomainSummaries.map((d) => (
          <Card key={d.domain}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">{d.name}</h3>
                {d.criticalGaps > 0 && <Badge variant="error">{d.criticalGaps} Critical</Badge>}
              </div>
              <ProgressBar value={d.averageScore} />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Current: {d.averageScore}%</span>
                <span>Required: {d.requiredScore}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skill Gaps */}
      <SectionHeader title="Top Skill Gaps" description="Priority areas for improvement" action={<Link href="/skill-gap"><Button variant="ghost" size="sm">View All</Button></Link>} className="mb-4" />
      <Card className="mb-8">
        <CardContent>
          <div className="space-y-3">
            {skillGaps.slice(0, 5).map((g) => (
              <div key={g.id} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-900">{g.skillName}</div>
                <div className="flex-1"><ProgressBar value={g.currentLevel} /></div>
                <div className="w-24 text-right text-xs text-gray-500">{g.currentLevel}% → {g.requiredLevel}%</div>
                <Badge variant={g.priority === "CRITICAL" ? "error" : g.priority === "HIGH" ? "warning" : "accent"}>
                  {g.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Courses */}
      <SectionHeader title="Recommended For You" description="Personalized learning based on your skill gaps" action={<Link href="/learning"><Button variant="ghost" size="sm">Browse All</Button></Link>} className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {courses.slice(0, 3).map((c) => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs">{c.provider}</Badge>
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{c.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{c.duration} · {c.level}</p>
              <Button variant="outline" size="sm" className="w-full">Start Learning</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assessments */}
      <SectionHeader title="Recent Assessments" description="Your latest assessment results" action={<Link href="/assessments"><Button variant="ghost" size="sm">View All</Button></Link>} className="mb-4" />
      <Card>
        <CardContent>
          <div className="space-y-3">
            {assessments.filter((a) => a.status === "completed").slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.competencyName} · {a.difficulty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{a.score}%</span>
                  <Badge variant={a.passed ? "success" : "error"}>{a.passed ? "Passed" : "Failed"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Tutor CTA */}
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" /> AI Learning Copilot
            </h3>
            <p className="text-sm text-gray-600 mt-1">Get personalized help with concepts, practice questions, and learning guidance.</p>
          </div>
          <Link href="/ai-tutor"><Button>Start Chat</Button></Link>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
