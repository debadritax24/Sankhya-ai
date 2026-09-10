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
          colorPrimary: "#0c2340",
          colorBackground: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-primary text-text-inverse hover:bg-primary-light",
          card: "shadow-sm border border-gray-200",
        },
      }}
    >
      {children}
    </ClerkReactProvider>
  );
}
