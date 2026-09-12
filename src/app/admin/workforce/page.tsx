import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { departments } from "@/lib/constants/mock-data";

export default function AdminWorkforcePage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Workforce" }]} role="admin">
      <PageHeader title="Workforce Overview" description="Officials across departments and their competency status" />

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DDDAD4]">
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Department</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Code</th>
                  <th className="text-right py-3 px-2 font-medium text-[#77746F]">Officials</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Avg Competency</th>
                  <th className="text-left py-3 px-2 font-medium text-[#77746F]">Top Gap</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.id} className="border-b border-[#DDDAD4] hover:bg-[#FCFBF8]">
                    <td className="py-3 px-2 font-medium text-[#080D2B]">{d.name}</td>
                    <td className="py-3 px-2 text-[#77746F]">{d.code}</td>
                    <td className="py-3 px-2 text-right">{d.officialCount}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={d.avgCompetency} className="w-24" size="sm" />
                        <span className="text-xs">{d.avgCompetency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2"><Badge variant="warning">{d.topGap}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
