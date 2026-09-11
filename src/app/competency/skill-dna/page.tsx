"use client";

import { competencies } from "@/lib/constants/mock-data";
import { SkillDNAClient } from "./client";

export default function SkillDNAPage() {
  const radarData = competencies.slice(0, 8).map((c) => ({ 
    skill: c.name, current: c.currentScore, required: c.requiredScore 
  }));
  return <SkillDNAClient competencies={competencies} radarData={radarData} />;
}
