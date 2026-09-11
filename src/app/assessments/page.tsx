import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAssessments } from "@/lib/data";


export default async function AssessmentsPage() {
  const assessments = await getAssessments();
  const upcoming = assessments.filter((a) => a.status === "upcoming" || a.status === "recommended");
  const completed = assessments.filter((a) => a.status === "completed");

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Assessments" }]}>
      <PageHeader title="Assessment Centre" description="Take assessments to measure and validate your competencies" />

      {/* Upcoming / Recommended */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Assessments</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((a) => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={a.status === "recommended" ? "accent" : "default"}>{a.status}</Badge>
                  <Badge variant="secondary">{a.difficulty}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{a.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{a.questionCount} questions · {a.durationMinutes} min · {a.competencyName}</p>
                {a.reason && <p className="text-xs text-gray-600 italic mb-3">{a.reason}</p>}
                <Button variant="outline" size="sm" className="w-full">Start Assessment</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Assessments</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {completed.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="success">Completed</Badge>
                  <Badge variant="secondary">{a.difficulty}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{a.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{a.competencyName} · {a.completedAt}</p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">{a.score}%</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                  <Badge variant={a.passed ? "success" : "error"}>{a.passed ? "Passed" : "Failed"}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
