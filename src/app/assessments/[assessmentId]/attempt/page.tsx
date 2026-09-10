"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockQuestions = [
  { id: "q1", text: "What is the primary advantage of stratified sampling over simple random sampling?", options: { A: "It is faster to implement", B: "It ensures representation from all subgroups", C: "It requires less data", D: "It is cheaper" }, correctAnswer: "B" as const, explanation: "Stratified sampling divides the population into subgroups and samples from each, ensuring all groups are represented." },
  { id: "q2", text: "In Python, which library is most commonly used for data manipulation and analysis?", options: { A: "NumPy", B: "pandas", C: "matplotlib", D: "scikit-learn" }, correctAnswer: "B" as const, explanation: "pandas provides DataFrame and Series structures specifically designed for data manipulation and analysis." },
  { id: "q3", text: "What does RAG stand for in AI systems?", options: { A: "Random Access Generation", B: "Retrieval-Augmented Generation", C: "Rapid Algorithm Gradient", D: "Relational Analysis Graph" }, correctAnswer: "B" as const, explanation: "RAG combines retrieval of relevant documents with language model generation to produce grounded answers." },
];

export default function AssessmentAttemptPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const question = mockQuestions[currentQ];

  const handleAnswer = (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Assessments", href: "/assessments" }, { label: "Attempt" }]}>
      <PageHeader title="Assessment Attempt" description="Answer each question carefully. You can navigate between questions." />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Question {currentQ + 1} of {mockQuestions.length}</Badge>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-6">{question.text}</p>
              <div className="space-y-3">
                {(Object.entries(question.options) as [string, string][]).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleAnswer(question.id, key)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${answers[question.id] === key ? "border-primary bg-primary/5" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <span className="font-medium mr-2">{key}.</span>
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>Previous</Button>
                {currentQ < mockQuestions.length - 1 ? (
                  <Button onClick={() => setCurrentQ(currentQ + 1)}>Next</Button>
                ) : (
                  <Button variant="success">Submit Assessment</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Progress</h3>
              <div className="flex flex-wrap gap-2">
                {mockQuestions.map((q, i) => (
                  <div key={q.id} className={`h-8 w-8 rounded flex items-center justify-center text-xs font-medium ${i === currentQ ? "bg-primary text-white" : answers[q.id] ? "bg-success/10 text-success" : "bg-gray-100 text-gray-500"}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Timer</p>
              <p>25:00 remaining</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
