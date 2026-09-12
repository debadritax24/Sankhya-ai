import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="Contact Us" description="Reach out for support or feedback" />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-lg">Technical Support</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-[#77746F]">
              <p>For issues with the platform, authentication, or assessments.</p>
              <p className="font-medium">Email: support@sankhya-ai.gov.in</p>
              <p className="text-xs text-[#8D837A]">This is a prototype for SIH 2026. Support email is for demonstration purposes.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Feedback</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-[#77746F]">
              <p>We welcome your feedback on improving the platform.</p>
              <p className="font-medium">Email: feedback@sankhya-ai.gov.in</p>
              <Button variant="outline" className="mt-4">Send Feedback</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
