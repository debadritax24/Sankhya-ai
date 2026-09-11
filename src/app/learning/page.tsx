"use client";

import { courses } from "@/lib/constants/mock-data";
import { LearningClient } from "./client";

export default function LearningPage() {
  return <LearningClient courses={courses} />;
}
