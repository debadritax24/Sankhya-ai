"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useUser } from "@/components/providers/user-provider";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return <AppLayout>Loading...</AppLayout>;
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="heading-section text-3xl text-[#080D2B]">Profile</h1>
          <p className="text-[#77746F]">Manage your personal information and preferences.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your official details on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF3E6] text-[#080D2B] text-2xl font-medium">
                  {user.name.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="heading-section text-xl text-[#080D2B]">{user.name}</h3>
                  <p className="text-sm text-[#77746F]">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#DDDAD4]">
                <div>
                  <label className="eyebrow">Department</label>
                  <p className="text-[#080D2B]">{user.department}</p>
                </div>
                <div>
                  <label className="eyebrow">Designation</label>
                  <p className="text-[#080D2B]">{user.designation}</p>
                </div>
                <div>
                  <label className="eyebrow">Role</label>
                  <p className="badge-editorial">{user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
