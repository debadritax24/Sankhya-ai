/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCompetencies } from "@/lib/data";
import { SkillDNAClient } from "./client";

export default async function SkillDNAPage() {
  const competencies = await getCompetencies();
  const radarData = competencies.slice(0, 8).map((c: any) => ({ 
    skill: c.name, current: c.currentScore, required: c.requiredScore 
  }));
  return <SkillDNAClient competencies={competencies} radarData={radarData} />;
}
