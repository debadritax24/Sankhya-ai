import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/constants/mock-data";
import Link from "next/link";

const typeIcons: Record<string, string> = {
  course_recommendation: "📚",
  assessment_result: "📊",
  competency_update: "🎯",
  new_training: "🏛️",
  system: "⚙️",
};

export default function NotificationsPage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notifications" }]}>
      <PageHeader title="Notifications" description="Stay updated on recommendations, assessments, and platform updates" />

      <div className="space-y-3">
        {notifications.map((n) => (
          <Link key={n.id} href={n.actionUrl || "#"}>
            <Card className={`hover:shadow-md transition-shadow cursor-pointer ${!n.read ? "border-l-4 border-l-accent" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{typeIcons[n.type]}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                      {!n.read && <Badge variant="accent" className="text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(n.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
