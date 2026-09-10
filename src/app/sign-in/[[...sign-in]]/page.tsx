import { SignIn } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";

export default function SignInPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <SignIn
          routing="path"
          path="/sign-in"
          appearance={{
            elements: {
              card: "shadow-sm border border-gray-200",
              formButtonPrimary: "bg-primary text-white hover:bg-primary-light",
            },
          }}
        />
      </div>
    </MainLayout>
  );
}
