import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const domains = [
  {
    name: "Statistical Methods",
    color: "bg-[#080D2B]",
    skills: ["Survey Design", "Sampling", "National Accounts", "Price Statistics", "Labour Statistics", "Agricultural Statistics", "Industrial Statistics", "SDG Indicators", "Metadata Standards", "Data Quality Frameworks"],
  },
  {
    name: "Technical & Digital",
    color: "bg-[#080D2B]",
    skills: ["Python", "R", "SQL", "Stata", "SPSS", "SAS", "GIS", "Data Visualization", "AI/ML", "Cloud Computing", "APIs", "Open Data"],
  },
  {
    name: "Digital Governance",
    color: "bg-accent",
    skills: ["Cybersecurity", "Data Privacy", "Digital Signatures", "Government Cloud", "Digital Public Infrastructure"],
  },
  {
    name: "Behavioural & Managerial",
    color: "bg-[#4A7C59]",
    skills: ["Leadership", "Communication", "Project Management", "Ethics", "Decision Making", "Change Management"],
  },
];

export default function CompetencyFrameworkPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader title="Competency Framework" description="Official Statistics competency domains and skills" />

        <div className="grid gap-6 md:grid-cols-2">
          {domains.map((domain) => (
            <Card key={domain.name}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${domain.color}`} />
                  <CardTitle className="text-lg">{domain.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
