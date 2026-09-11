"use client";

import { conversations } from "@/lib/constants/mock-data";
import { AITutorClient } from "./client";

export default function AITutorPage() {
  return <AITutorClient conversations={conversations} />;
}
