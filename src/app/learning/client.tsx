/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";

import Link from "next/link";
import { useState } from "react";

const tabs = [
  { name: "All", value: "all" },
  { name: "Recommended", value: "recommended" },
  { name: "iGOT", value: "iGOT" },
  { name: "TPAC", value: "TPAC" },
  { name: "Internal", value: "INTERNAL" },
];

export function LearningClient({ courses }: { courses: any[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    if (activeTab !== "all" && c.provider !== activeTab) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Learning" }]}>
      <PageHeader title="Learning Hub" description="Access courses from iGOT, TPAC, and internal training" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput placeholder="Search courses..." value={search} onChange={setSearch} className="flex-1" />
        <div className="flex gap-1 bg-[#F7F6F3] p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === tab.value ? "bg-white text-[#080D2B] shadow-sm" : "text-[#77746F] hover:text-[#77746F]"}`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={c.provider === "iGOT" ? "default" : c.provider === "TPAC" ? "accent" : "secondary"}>{c.provider}</Badge>
                <span className="text-xs text-[#77746F]">{c.duration}</span>
                <span className="text-xs text-[#77746F]">· {c.level}</span>
              </div>
              <h3 className="font-semibold text-[#080D2B] mb-1">{c.title}</h3>
              <p className="text-sm text-[#77746F] mb-3 line-clamp-2">{c.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {c.competencyNames.map((n: string) => <Badge key={n} variant="secondary" className="text-xs">{n}</Badge>)}
              </div>
              {c.whyRecommended && <p className="text-xs text-[#77746F] italic mb-3">{c.whyRecommended}</p>}
              <Link href={`/learning/${c.id}`}><Button variant="outline" size="sm" className="w-full">View Course</Button></Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
