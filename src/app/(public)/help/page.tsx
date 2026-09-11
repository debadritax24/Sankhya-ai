import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HelpPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="Help & Support" description="Get assistance with using the SANKHYA AI platform" />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-lg">Frequently Asked Questions</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
              <div><p className="font-medium text-gray-900">What is SANKHYA AI?</p><p>An AI-powered skill intelligence platform for India&apos;s official statistics workforce.</p></div>
              <div><p className="font-medium text-gray-900">How do I get started?</p><p>Sign up, complete your profile, and the system will assess your competencies.</p></div>
              <div><p className="font-medium text-gray-900">Are the courses real?</p><p>The platform connects to iGOT Karmayogi and TPAC. During prototype phase, mock data is used.</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Contact Support</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">For technical assistance or feedback, reach out to the development team.</p>
              <Link href="/contact"><Button variant="outline">Contact Us</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
