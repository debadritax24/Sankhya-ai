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
                  <Radar name="Current" dataKey="current" stroke="#0c2340" fill="#0c2340" fillOpacity={0.3} />
                  <Radar name="Required" dataKey="required" stroke="#ff9933" fill="#ff9933" fillOpacity={0.15} />
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
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Overall Readiness</p>
              <p className="text-4xl font-bold text-primary">68%</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Skills</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">At/Above Required</span>
                <span className="font-medium text-success">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Below Required</span>
                <span className="font-medium text-warning">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Critical Gaps</span>
                <span className="font-medium text-error">2</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Evidence Sources</p>
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
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: `${c.currentScore}%` }} />
                      </div>
                      <div className="absolute top-0 h-2 border-r-2 border-dashed border-accent" style={{ left: `${c.requiredScore}%` }} />
                    </div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm">
                  <span className="font-medium">{c.currentScore}</span>
                  <span className="text-gray-400"> / {c.requiredScore}</span>
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
