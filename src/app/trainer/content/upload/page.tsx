"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ScatterChart, Database, Brain, CheckCircle } from "lucide-react";

const pipeline = [
  { icon: Upload, label: "Upload", desc: "PDF, PPTX, DOCX", status: "ready" },
  { icon: FileText, label: "Text Extraction", desc: "PyMuPDF / python-docx", status: "ready" },
  { icon: ScatterChart, label: "Chunking", desc: "512 tokens, 64 overlap", status: "ready" },
  { icon: Database, label: "Embeddings", desc: "text-embedding model", status: "ready" },
  { icon: Brain, label: "Vector Store", desc: "pgvector", status: "ready" },
  { icon: CheckCircle, label: "RAG Ready", desc: "For question generation", status: "ready" },
];

export default function TrainerUploadPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Trainer", href: "/trainer" }, { label: "Content", href: "/trainer/content" }, { label: "Upload" }]} role="trainer">
      <PageHeader title="Upload Learning Material" description="Upload documents for AI-powered assessment generation" />

      {/* Upload area */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500 mt-2">Supports PDF, PPTX, DOCX · Max 50MB</p>
            <Button className="mt-4">Select Files</Button>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline visualization */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {pipeline.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium mt-2">{step.label}</p>
                  <p className="text-[10px] text-gray-500">{step.desc}</p>
                </div>
                {i < pipeline.length - 1 && <span className="text-gray-300 hidden md:inline">→</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
