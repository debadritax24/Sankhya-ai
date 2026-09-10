"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/constants/mock-data";

const profileFields = [
  { label: "Name", value: currentUser.name },
  { label: "Email", value: currentUser.email },
  { label: "Designation", value: currentUser.designation },
  { label: "Department", value: currentUser.department },
  { label: "Current Assignment", value: currentUser.currentAssignment },
  { label: "Educational Qualification", value: currentUser.education },
  { label: "Experience", value: currentUser.experience },
  { label: "Previous Training", value: currentUser.previousTraining },
  { label: "Current Role", value: currentUser.currentRole },
  { label: "Career Goal", value: currentUser.careerGoal },
];

export default function ProfilePage() {
  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Profile" }]}>
      <PageHeader
        title="My Profile"
        description="Your professional information influences competency requirements and learning recommendations"
        actions={<Button variant="outline">Update Profile</Button>}
      />

      <Card>
        <CardHeader><CardTitle className="text-lg">Professional Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileFields.map((f) => (
              <div key={f.label}>
                <dt className="text-sm font-medium text-gray-500">{f.label}</dt>
                <dd className="mt-1 text-sm text-gray-900">{f.value}</dd>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">How does my profile affect recommendations?</p>
              <p className="mt-1">Your designation, department, and experience determine which competencies are required for your role. The system uses this to calculate skill gaps and generate personalized learning recommendations. Updating your profile ensures recommendations stay relevant.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
