import type { Metadata } from "next";

import { AuthGate } from "@/components/auth/auth-gate";

export const metadata: Metadata = {
  title: "Funder / CSR — Samadhan Corporation",
  description:
    "AI Samadhan for Business — municipal issue operations, CSR funding, analytics and AI insights.",
};

export default function FunderLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate storageKey="samadhan.company" redirectTo="/login?tab=company">
      {children}
    </AuthGate>
  );
}