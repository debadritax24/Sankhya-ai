import { SignUp } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";

export default function SignUpPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center py-12 px-4">
        <SignUp fallbackRedirectUrl="/dashboard" />
      </div>
    </MainLayout>
  );
}
