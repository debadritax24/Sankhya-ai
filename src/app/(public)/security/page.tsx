import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const securityFeatures = [
  { title: "Clerk Authentication", desc: "Secure OAuth2 authentication with session management and MFA support.", status: "Active" },
  { title: "Role-Based Access Control", desc: "LEARNER, TRAINER, ADMIN, SUPER_ADMIN roles with route-level protection.", status: "Active" },
  { title: "Secure API Communication", desc: "HTTPS enforcement, CORS configuration, and request validation.", status: "Architecture Ready" },
  { title: "Data Privacy", desc: "PII minimization, audit logging, and data protection compliance.", status: "Architecture Ready" },
  { title: "Input Validation", desc: "Client and server-side validation using Zod schemas.", status: "Active" },
  { title: "Audit Logging", desc: "Insert-only audit trail for all critical operations.", status: "Architecture Ready" },
  { title: "Secure Environment Variables", desc: "Secrets managed via environment variables, never committed to source.", status: "Active" },
  { title: "Cloud-Ready Architecture", desc: "Docker containerization with scalable deployment path.", status: "Architecture Ready" },
];

export default function SecurityPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="Security & Governance" description="Enterprise-grade security for government digital services" />

        <div className="grid gap-4 sm:grid-cols-2">
          {securityFeatures.map((f) => (
            <Card key={f.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#080D2B]">{f.title}</h3>
                    <p className="mt-1 text-sm text-[#77746F]">{f.desc}</p>
                  </div>
                  <Badge variant={f.status === "Active" ? "success" : "secondary"}>{f.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
