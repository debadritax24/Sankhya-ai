import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { num: "01", title: "Official Profile", desc: "Complete your professional profile including designation, department, education, and experience.", detail: "These attributes influence competency requirements and learning recommendations." },
  { num: "02", title: "Competency Mapping", desc: "The system maps your profile against the competency framework for your role.", detail: "Each role has specific competency requirements across statistical, technical, governance, and managerial domains." },
  { num: "03", title: "Skill Gap Analysis", desc: "AI identifies gaps between your current skills and role requirements.", detail: "Gaps are prioritized by role importance, future demand, and career relevance." },
  { num: "04", title: "Recommendation Engine", desc: "Hybrid algorithm recommends courses based on your gaps, role, and career goals.", detail: "Deterministic ranking + semantic search + LLM explanation (LLM explains, does not decide)." },
  { num: "05", title: "iGOT / TPAC Learning", desc: "Access courses from iGOT Karmayogi and NSSTA/TPAC training catalogues.", detail: "The platform connects you to the right learning resources at the right time." },
  { num: "06", title: "Learning & Practice", desc: "Complete courses, practice with quizzes, and build your skills.", detail: "AI Tutor provides context-aware assistance throughout your learning journey." },
  { num: "07", title: "AI Assessment", desc: "Take AI-generated assessments from official training documents.", detail: "Questions are generated using RAG technology and validated through a quality guard pipeline." },
  { num: "08", title: "Performance Analysis", desc: "Review your performance, strengths, and areas for improvement.", detail: "Detailed analytics show competency impact and learning effectiveness." },
  { num: "09", title: "Competency Update", desc: "Your competency profile is updated based on assessment results.", detail: "Multi-signal scoring combines assessments, training, and experience data." },
];

export default function HowItWorksPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="How It Works" description="A 9-step closed learning loop from profile to competency update" />

        <div className="space-y-6">
          {steps.map((step) => (
            <Card key={step.num}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#080D2B] text-text-inverse font-bold text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#080D2B]">{step.title}</h3>
                    <p className="mt-1 text-[#77746F]">{step.desc}</p>
                    <p className="mt-2 text-sm text-[#77746F]">{step.detail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
