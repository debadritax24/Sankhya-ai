"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const assessments = [
  { id: "ta-001", title: "Sampling Methods Quiz", questions: 15, status: "Published", generated: "2026-09-08" },
  { id: "ta-002", title: "Python Basics Assessment", questions: 20, status: "Draft", generated: "2026-09-10" },
  { id: "ta-003", title: "Data Analysis Practice", questions: 12, status: "Review", generated: "2026-09-09" },
];

export default function TrainerAssessmentsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Trainer", href: "/trainer" }, { label: "Assessments" }]} role="trainer">
      <PageHeader title="Assessment Management" description="Create, review, and publish AI-generated assessments" actions={<Link href="/trainer/assessments/create"><Button>Create Assessment</Button></Link>} />

      <div className="grid gap-4">
        {assessments.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#080D2B]">{a.title}</h3>
                <p className="text-sm text-[#77746F]">{a.questions} questions · Generated: {a.generated}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={a.status === "Published" ? "success" : a.status === "Review" ? "warning" : "secondary"}>{a.status}</Badge>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
