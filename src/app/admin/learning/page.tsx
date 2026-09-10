"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { courses } from "@/lib/constants/mock-data";

export default function AdminLearningPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Learning" }]} role="admin">
      <PageHeader title="Training & Learning Analytics" description="Organization-wide learning engagement and effectiveness" />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">74%</p><p className="text-xs text-gray-500">Completion Rate</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">2,840</p><p className="text-xs text-gray-500">Total Learning Hours</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-3xl font-bold text-primary">4.3</p><p className="text-xs text-gray-500">Avg Course Rating</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Course Enrollment</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.provider} · {c.duration}</p>
                  </div>
                  <span className="text-sm text-gray-600">{c.enrolledCount.toLocaleString()} enrolled</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Learning by Department</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[{ name: "NSSO", hours: 820, completion: 78 }, { name: "CSO", hours: 650, completion: 72 }, { name: "DES", hours: 540, completion: 68 }, { name: "CC", hours: 480, completion: 85 }, { name: "SD", hours: 350, completion: 70 }].map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{d.name}</span>
                    <span className="text-xs text-gray-500">{d.hours}h · {d.completion}%</span>
                  </div>
                  <ProgressBar value={d.completion} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
