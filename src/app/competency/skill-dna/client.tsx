/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";

 
 
 
 


export function SkillDNAClient({ competencies, radarData }: { competencies: any[], radarData: any[] }) {
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Skill DNA" }]}>
      <PageHeader title="Skill DNA" description="Complete competency intelligence fingerprint" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Radar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Competency Radar</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e9ecef" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "#495057" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Current" dataKey="current" stroke="#080D2B" fill="#080D2B" fillOpacity={0.3} />
                  <Radar name="Required" dataKey="required" stroke="#F2A65A" fill="#F2A65A" fillOpacity={0.15} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Skill DNA Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-[#FCFBF8] rounded-lg">
              <p className="text-sm text-[#77746F]">Overall Readiness</p>
              <p className="text-4xl font-bold text-[#080D2B]">68%</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#77746F]">Total Skills</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#77746F]">At/Above Required</span>
                <span className="font-medium text-[#4A7C59]">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#77746F]">Below Required</span>
                <span className="font-medium text-warning">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#77746F]">Critical Gaps</span>
                <span className="font-medium text-[#9B3B3B]">2</span>
              </div>
            </div>
            <div className="p-3 bg-[#FCFBF8] rounded-lg text-xs text-[#77746F]">
              <p className="font-medium text-[#080D2B] mb-1">Evidence Sources</p>
              <p>Diagnostic assessments, training history, work experience, profile inference</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competency List */}
      <Card>
        <CardHeader><CardTitle className="text-lg">All Skills</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competencies.map((c) => (
              <div key={c.id} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{c.name}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <div className="h-2 bg-[#DDDAD4] rounded-full">
                        <div className="h-2 bg-[#080D2B] rounded-full" style={{ width: `${c.currentScore}%` }} />
                      </div>
                      <div className="absolute top-0 h-2 border-r-2 border-dashed border-accent" style={{ left: `${c.requiredScore}%` }} />
                    </div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm">
                  <span className="font-medium">{c.currentScore}</span>
                  <span className="text-[#8D837A]"> / {c.requiredScore}</span>
                </div>
                <Badge variant={c.priority === "CRITICAL" ? "error" : c.priority === "HIGH" ? "warning" : c.priority === "MEDIUM" ? "accent" : "success"}>
                  {c.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
