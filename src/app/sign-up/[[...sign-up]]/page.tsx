import { SignUp } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";

export default function SignUpPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <SignUp
          routing="path"
          path="/sign-up"
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
