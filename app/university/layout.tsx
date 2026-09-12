import type { Metadata } from "next";

import { AuthGate } from "@/components/auth/auth-gate";

export const metadata: Metadata = {
  title: "University Portal — Samadhan.ai",
  description:
    "Municipal–university collaboration: assign universities, manage teams, track civic reports and showcase community impact.",
};

export default function UniversityLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate storageKey="samadhan.university" redirectTo="/login?tab=university">
      {children}
    </AuthGate>
  );
}