import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="About SANKHYA AI" description="AI-enabled Skill Intelligence and Learning Platform for India's Official Statistical System" />

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-lg">The Problem</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-[#77746F]">
              <p>India&apos;s official statistical workforce lacks a unified system to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Understand current competency levels across departments</li>
                <li>Identify skill gaps against role requirements</li>
                <li>Access personalized learning recommendations</li>
                <li>Track competency improvement over time</li>
                <li>Connect iGOT Karmayogi and NSSTA/TPAC training</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Our Solution</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-[#77746F]">
              <p>SANKHYA AI provides an AI-powered platform that:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Builds evidence-based competency profiles using multi-signal scoring</li>
                <li>Identifies and prioritizes skill gaps with intelligent ranking</li>
                <li>Recommends personalized learning paths from iGOT and TPAC</li>
                <li>Generates AI assessments from official training documents</li>
                <li>Provides workforce analytics for administrators</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Target Users</CardTitle></CardHeader>
            <CardContent className="text-sm text-[#77746F] space-y-2">
              <p><strong>Statistical Officials:</strong> Take assessments, view recommendations, complete courses</p>
              <p><strong>Training Administrators:</strong> Create assessments, manage content, view engagement</p>
              <p><strong>Department Heads:</strong> View department-wide skill gaps, plan training budgets</p>
              <p><strong>System Administrators:</strong> Manage users, configure system, view analytics</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Platform Vision</CardTitle></CardHeader>
            <CardContent className="text-sm text-[#77746F] space-y-2">
              <p>A continuous competency-to-workforce intelligence loop:</p>
              <p className="font-mono text-xs bg-[#FCFBF8] p-3 rounded">
                Profile → Competency → Skill Gap → Recommendation → Learning → Assessment → Performance → Competency Update → New Recommendation
              </p>
              <p>This closed learning loop is the core differentiator — not just a course catalogue, but a personal trainer for professional skills.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader><CardTitle className="text-lg">Role in Capacity Building</CardTitle></CardHeader>
            <CardContent className="text-sm text-[#77746F]">
              <p>SANKHYA AI supports India&apos;s official statistics capacity building by providing a data-driven approach to workforce development. It connects individual competency growth with organizational capability requirements, ensuring that training investments are targeted, measurable, and aligned with future skill demands.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
