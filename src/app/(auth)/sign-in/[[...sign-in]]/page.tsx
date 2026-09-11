import { SignIn } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";

export default function SignInPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center py-12 px-4">
        <SignIn fallbackRedirectUrl="/dashboard" />
      </div>
    </MainLayout>
  );
}
