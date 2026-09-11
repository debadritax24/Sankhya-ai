/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Bot, User, Send } from "lucide-react";
import { useState } from "react";

const suggestedPrompts = [
  "Explain my skill gaps",
  "Why was this course recommended?",
  "Create a study plan",
  "Explain SQL joins",
  "Generate practice questions",
];

export function AITutorClient({ conversations }: { conversations: any[] }) {
  const [messages, setMessages] = useState(conversations);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: `msg-${Date.now()}`, role: "user" as const, content: input, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "AI Tutor" }]}>
      <PageHeader title="AI Learning Assistant" description="Get personalized help grounded in approved content" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Context */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Role: Senior Statistical Officer</span>
                <span>·</span>
                <span>Top Gap: AI/ML (CRITICAL)</span>
                <span>·</span>
                <span>Active Learning: Python</span>
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="mb-4">
            <CardContent className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-900"}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.sources && (
                      <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                        {msg.sources.map((s: any, i: number) => <p key={i}>Source: {s.title}, p.{s.page}</p>)}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggested Questions</h3>
              <div className="space-y-2">
                {suggestedPrompts.map((p) => (
                  <button key={p} onClick={() => setInput(p)} className="w-full text-left p-2 text-xs text-gray-600 hover:bg-gray-50 rounded border border-gray-100 transition-colors">
                    {p}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
