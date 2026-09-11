import { getConversations } from "@/lib/data";
import { AITutorClient } from "./client";

export default async function AITutorPage() {
  const conversations = await getConversations();
  return <AITutorClient conversations={conversations} />;
}
