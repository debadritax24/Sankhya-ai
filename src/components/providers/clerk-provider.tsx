"use client";

import { ClerkProvider as ClerkReactProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ClerkProviderProps {
  children: ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  return (
    <ClerkReactProvider
      appearance={{
        variables: {
          colorPrimary: "#080D2B",
          colorBackground: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-primary text-text-inverse hover:bg-primary-light",
          card: "shadow-sm border border-[#DDDAD4]",
        },
      }}
    >
      {children}
    </ClerkReactProvider>
  );
}
