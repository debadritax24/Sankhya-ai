import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { learningProgress } from "@/lib/constants/mock-data";

export default function LearningProgressPage() {
  const totalHours = learningProgress.reduce((sum, lp) => sum + lp.timeSpentMinutes, 0) / 60;
  const completed = learningProgress.filter((lp) => lp.completedAt).length;

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Learning", href: "/learning" }, { label: "Progress" }]}>
      <PageHeader title="Learning Progress" description="Track your learning journey and achievements" />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{Math.round(totalHours)}</p><p className="text-xs text-gray-500">Total Hours</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{completed}</p><p className="text-xs text-gray-500">Completed</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{learningProgress.length}</p><p className="text-xs text-gray-500">In Progress</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Course Progress</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningProgress.map((lp) => (
              <div key={lp.courseId}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{lp.courseName}</h4>
                    <p className="text-xs text-gray-500">{lp.provider} · Last accessed: {lp.lastAccessedAt}</p>
                  </div>
                  <span className="text-sm font-medium">{lp.progressPercent}%</span>
                </div>
                <ProgressBar value={lp.progressPercent} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
