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
  { title: "Skill DNA", icon: "🧬", desc: "Complete competency fingerprint across all domains." },
  { title: "AI Assessment", icon: "📊", desc: "Adaptive quizzes from official training documents via RAG." },
  { title: "Smart Recommendations", icon: "🎯", desc: "Personalized learning paths based on your gaps and role." },
  { title: "AI Learning Copilot", icon: "🤖", desc: "Context-aware assistant grounded in approved content." },
  { title: "iGOT Integration", icon: "📚", desc: "Access iGOT Karmayogi course catalogue." },
  { title: "TPAC Training", icon: "🏛️", desc: "NSSTA/TPAC official training programmes." },
  { title: "Workforce Analytics", icon: "📈", desc: "Organization-wide competency intelligence for admins." },
  { title: "Career Pathways", icon: "🚀", desc: "Future skill requirements and career readiness." },
];

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="text-primary">AI-Powered Skill Intelligence</span>
            <br />
            <span className="text-gray-900">for Official Statistics</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Personalized competency assessment, skill-gap analysis and learning pathways for a future-ready statistical workforce.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up"><Button size="lg">Get Started</Button></Link>
            <Link href="/how-it-works"><Button variant="outline" size="lg">Explore Platform</Button></Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Flow */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How the Platform Works</h2>
            <p className="mt-4 text-lg text-gray-600">A continuous learning loop from assessment to competency update</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {flowSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-text-inverse font-bold">{s.step}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Capabilities</h2>
            <p className="mt-4 text-lg text-gray-600">Built for India&apos;s official statistics ecosystem</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-gray-600">{f.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-inverse">Ready to Build Your Skill DNA?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Join the platform designed for India&apos;s official statistics workforce.</p>
          <div className="mt-8"><Link href="/sign-up"><Button variant="accent" size="lg">Start Your Journey</Button></Link></div>
        </div>
      </section>
    </MainLayout>
  );
}
