"use client";

import { departments, competencyDomainSummaries } from "@/lib/constants/mock-data";
import { AdminClient } from "./client";

export default function AdminDashboardPage() {
  const deptData = departments.map((d) => ({ name: d.code, avgCompetency: d.avgCompetency, officials: d.officialCount }));
  return <AdminClient departments={departments} competencyDomainSummaries={competencyDomainSummaries} deptData={deptData} />;
}
