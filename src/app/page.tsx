import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const stats = [
  { label: "Competency Domains", value: "4" },
  { label: "Skills Tracked", value: "50+" },
  { label: "Learning Paths", value: "AI-Powered" },
  { label: "Assessment Types", value: "Adaptive" },
];

const flowSteps = [
  { step: "01", title: "Profile", desc: "Complete your professional profile" },
  { step: "02", title: "Assess", desc: "AI evaluates your current skills" },
  { step: "03", title: "Identify Gaps", desc: "Find priority skill gaps" },
  { step: "04", title: "Recommend", desc: "Get personalized learning paths" },
  { step: "05", title: "Learn", desc: "Access iGOT & TPAC courses" },
  { step: "06", title: "Assess Again", desc: "Measure improvement" },
];

const features = [
  { step: "01", title: "Skill DNA", desc: "Complete competency fingerprint across all domains." },
  { step: "02", title: "AI Assessment", desc: "Adaptive quizzes from official training documents via RAG." },
  { step: "03", title: "Smart Recommendations", desc: "Personalized learning paths based on your gaps and role." },
  { step: "04", title: "AI Learning Copilot", desc: "Context-aware assistant grounded in approved content." },
  { step: "05", title: "iGOT Integration", desc: "Access iGOT Karmayogi course catalogue." },
  { step: "06", title: "TPAC Training", desc: "NSSTA/TPAC official training programmes." },
  { step: "07", title: "Workforce Analytics", desc: "Organization-wide competency intelligence for admins." },
  { step: "08", title: "Career Pathways", desc: "Future skill requirements and career readiness." },
];

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FCFBF8] to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#080D2B] sm:text-5xl md:text-6xl">
            <span className="text-[#080D2B]">AI-Powered Skill Intelligence</span>
            <br />
            <span className="text-[#080D2B]">for Official Statistics</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#77746F]">
            Personalized competency assessment, skill-gap analysis and learning pathways for a future-ready statistical workforce.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up"><Button size="lg">Get Started</Button></Link>
            <Link href="/how-it-works"><Button variant="outline" size="lg">Explore Platform</Button></Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[#DDDAD4] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-[#080D2B]">{s.value}</div>
                <div className="mt-1 text-sm text-[#77746F]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Flow */}
      <section className="py-16 bg-[#FCFBF8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#080D2B]">How the Platform Works</h2>
            <p className="mt-4 text-lg text-[#77746F]">A continuous learning loop from assessment to competency update</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {flowSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#080D2B] text-text-inverse font-bold">{s.step}</div>
                <h3 className="font-semibold text-[#080D2B] text-sm">{s.title}</h3>
                <p className="mt-1 text-xs text-[#77746F]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#080D2B]">Key Capabilities</h2>
            <p className="mt-4 text-lg text-[#77746F]">Built for India&apos;s official statistics ecosystem</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <span className="eyebrow mb-2">{f.step}</span>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-[#77746F]">{f.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080D2B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-inverse">Ready to Build Your Skill DNA?</h2>
          <p className="mt-4 text-lg text-[#DDDAD4] max-w-2xl mx-auto">Join the platform designed for India&apos;s official statistics workforce.</p>
          <div className="mt-8"><Link href="/sign-up"><Button variant="accent" size="lg">Start Your Journey</Button></Link></div>
        </div>
      </section>
    </MainLayout>
  );
}
