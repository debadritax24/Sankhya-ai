"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/constants/mock-data";
import { notFound } from "next/navigation";
import { use } from "react";

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const course = courses.find((c) => c.id === courseId);
  if (!course) return notFound();

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Learning", href: "/learning" }, { label: course.title }]}>
      <PageHeader title={course.title} description={course.description} actions={<Button>Start Learning</Button>} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Course Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Provider</p><p className="font-medium">{course.provider}</p></div>
              <div><p className="text-gray-500">Duration</p><p className="font-medium">{course.duration}</p></div>
              <div><p className="text-gray-500">Level</p><p className="font-medium">{course.level}</p></div>
              <div><p className="text-gray-500">Language</p><p className="font-medium">{course.language}</p></div>
              <div><p className="text-gray-500">Rating</p><p className="font-medium">{course.rating}/5</p></div>
              <div><p className="text-gray-500">Enrolled</p><p className="font-medium">{course.enrolledCount.toLocaleString()}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Skills Developed</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.competencyNames.map((n) => <Badge key={n}>{n}</Badge>)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {course.whyRecommended && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Why This Course?</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p>{course.whyRecommended}</p>
                {course.skillImpact && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-900">Skill Impact: {course.skillImpact}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
