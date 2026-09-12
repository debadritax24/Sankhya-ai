"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminSettingsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]} role="admin">
      <PageHeader title="Administrative Settings" description="Platform configuration and system settings" />

      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Organization Settings", desc: "Department structure, roles, and permissions", status: "Configured" },
          { title: "Competency Framework", desc: "Competency domains, skills, and thresholds", status: "Active" },
          { title: "Integration Status", desc: "iGOT and TPAC adapter status", status: "Prototype" },
          { title: "Notification Settings", desc: "Email and in-app notification configuration", status: "Default" },
          { title: "Security Settings", desc: "Authentication, session, and access policies", status: "Active" },
          { title: "Data Management", desc: "Data retention, export, and cleanup policies", status: "Default" },
        ].map((s) => (
          <Card key={s.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#080D2B]">{s.title}</h3>
                  <p className="text-sm text-[#77746F]">{s.desc}</p>
                </div>
                <Badge variant={s.status === "Active" || s.status === "Configured" ? "success" : "secondary"}>{s.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
