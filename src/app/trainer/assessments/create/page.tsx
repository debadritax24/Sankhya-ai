"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const generatedQuestions = [
  { id: "q1", text: "What is the primary advantage of stratified sampling?", options: ["Faster", "Better representation", "Less data", "Cheaper"], correct: 1, explanation: "Stratified sampling ensures all subgroups are represented.", source: "Sampling Guide, p.18", confidence: 0.92, status: "pending" },
  { id: "q2", text: "Which Python library is used for data manipulation?", options: ["NumPy", "pandas", "matplotlib", "scikit-learn"], correct: 1, explanation: "pandas provides DataFrame for data manipulation.", source: "Python Tutorial, p.5", confidence: 0.95, status: "approved" },
  { id: "q3", text: "What does RAG stand for?", options: ["Random Access", "Retrieval-Augmented", "Rapid Algorithm", "Relational"], correct: 1, explanation: "RAG combines retrieval with generation.", source: "AI Architecture, p.23", confidence: 0.88, status: "pending" },
];

export default function TrainerCreateAssessmentPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Trainer", href: "/trainer" }, { label: "Assessments", href: "/trainer/assessments" }, { label: "Create" }]} role="trainer">
      <PageHeader title="AI Assessment Generator" description="Generate questions from uploaded learning materials" />

      {/* Configuration */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg">Generation Settings</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-[#77746F] block mb-1">Source Document</label>
              <select className="w-full rounded-md border border-[#8D837A] px-3 py-2 text-sm">
                <option>Sampling Methods Guide.pdf</option>
                <option>Python Tutorial.pptx</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#77746F] block mb-1">Topic</label>
              <select className="w-full rounded-md border border-[#8D837A] px-3 py-2 text-sm">
                <option>Survey Design</option>
                <option>Python</option>
                <option>SQL</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#77746F] block mb-1">Difficulty</label>
              <select className="w-full rounded-md border border-[#8D837A] px-3 py-2 text-sm">
                <option>Medium</option>
                <option>Easy</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#77746F] block mb-1">Questions</label>
              <input type="number" defaultValue={10} className="w-full rounded-md border border-[#8D837A] px-3 py-2 text-sm" />
            </div>
          </div>
          <Button className="mt-4">Generate Questions</Button>
        </CardContent>
      </Card>

      {/* Generated Questions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#080D2B]">Generated Questions</h2>
        {generatedQuestions.map((q) => (
          <Card key={q.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={q.status === "approved" ? "success" : "warning"}>{q.status}</Badge>
                <span className="text-xs text-[#77746F]">Confidence: {Math.round(q.confidence * 100)}%</span>
              </div>
              <p className="font-medium text-[#080D2B] mb-3">{q.text}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, i) => (
                  <div key={i} className={`p-2 rounded text-sm ${i === q.correct ? "bg-[#4A7C59]/10 border border-[#4A7C59]/20" : "bg-[#FCFBF8]"}`}>
                    {String.fromCharCode(65 + i)}. {opt} {i === q.correct && "✓"}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#77746F] mb-2">Source: {q.source}</p>
              <p className="text-sm text-[#77746F] italic mb-3">{q.explanation}</p>
              <div className="flex gap-2">
                <Button variant="success" size="sm">Approve</Button>
                <Button variant="outline" size="sm">Reject</Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
