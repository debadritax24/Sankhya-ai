import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LearningEcosystemPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="Learning Ecosystem" description="How the platform connects officials to learning resources" />

        {/* Flow */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              {["Official", "Skill Profile", "Recommendation Engine", "iGOT Karmayogi + NSSTA/TPAC", "Learning", "Assessment", "Competency Update"].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-lg bg-[#080D2B]/10 text-[#080D2B] font-medium text-sm">{step}</div>
                  {i < 6 && <span className="text-[#8D837A] hidden md:inline">→</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">iGOT Karmayogi</CardTitle>
                <Badge variant="success">Integration Ready</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-[#77746F] space-y-2">
              <p>iGOT Karmayogi is India&apos;s official learning platform for government officials. SANKHYA AI connects to iGOT through an adapter architecture.</p>
              <p className="text-xs text-[#8D837A] mt-2">Prototype: Uses mock course data. Live API integration requires official credentials.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">NSSTA / TPAC</CardTitle>
                <Badge variant="success">Integration Ready</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-[#77746F] space-y-2">
              <p>NSSTA (National Statistical Systems Training Academy) and TPAC provide specialized training programmes for official statistics.</p>
              <p className="text-xs text-[#8D837A] mt-2">Prototype: Uses mock programme data. Live integration requires NSSTA cooperation.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
