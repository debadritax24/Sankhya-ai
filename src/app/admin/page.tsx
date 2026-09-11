/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDepartments, getCompetencyDomainSummaries } from "@/lib/data";
import { AdminClient } from "./client";

export default async function AdminDashboardPage() {
  const departments = await getDepartments();
  const competencyDomainSummaries = await getCompetencyDomainSummaries();
  const deptData = departments.map((d: any) => ({ name: d.code, avgCompetency: d.avgCompetency, officials: d.officialCount }));
  return <AdminClient departments={departments} competencyDomainSummaries={competencyDomainSummaries} deptData={deptData} />;
}
