"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const uploads = [
  { name: "Sampling Methods Guide.pdf", type: "PDF", size: "2.4 MB", status: "Ready", chunks: 48, questions: 45, uploadedAt: "2026-09-08" },
  { name: "Data Analysis Handbook.pdf", type: "PDF", size: "5.1 MB", status: "Processing", chunks: 0, questions: 0, uploadedAt: "2026-09-10" },
  { name: "Python Tutorial.pptx", type: "PPT", size: "8.3 MB", status: "Ready", chunks: 32, questions: 32, uploadedAt: "2026-09-05" },
  { name: "NSSO Guidelines.docx", type: "DOCX", size: "1.2 MB", status: "Ready", chunks: 18, questions: 12, uploadedAt: "2026-09-03" },
];

export default function TrainerContentPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Trainer", href: "/trainer" }, { label: "Content" }]} role="trainer">
      <PageHeader title="Content Management" description="Upload and manage learning materials" actions={<Link href="/trainer/content/upload"><Button>Upload Material</Button></Link>} />

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DDDAD4]">
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Document</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Type</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Size</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Status</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Chunks</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Questions</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((u) => (
                  <tr key={u.name} className="border-b border-[#DDDAD4] hover:bg-[#FCFBF8]">
                    <td className="py-3 px-2 font-medium text-[#080D2B]">{u.name}</td>
                    <td className="py-3 px-2 text-[#77746F]">{u.type}</td>
                    <td className="py-3 px-2 text-[#77746F]">{u.size}</td>
                    <td className="py-3 px-2"><Badge variant={u.status === "Ready" ? "success" : "secondary"}>{u.status}</Badge></td>
                    <td className="py-3 px-2 text-right">{u.chunks}</td>
                    <td className="py-3 px-2 text-right">{u.questions}</td>
                    <td className="py-3 px-2 text-[#77746F]">{u.uploadedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
