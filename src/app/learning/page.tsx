import { getCourses } from "@/lib/data";
import { LearningClient } from "./client";

export default async function LearningPage() {
  const courses = await getCourses();
  return <LearningClient courses={courses} />;
}
