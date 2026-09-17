import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthGate } from "@/components/auth/auth-gate";
import { getUserFromSession } from "@/server/auth";

export const metadata: Metadata = {
  title: "Government Command Center — Samadhan.ai",
  description:
    "District Collector dashboard: citizen-reported civic issues, AI-validated pipeline, district heatmap, sector trends and university leaderboards.",
};

export default async function GovernmentLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromSession();
  if (!user || user.role !== "admin") {
    redirect("/login?tab=government");
  }

  return (
    <AuthGate storageKey="samadhan.government" redirectTo="/login?tab=government">
      {children}
    </AuthGate>
  );
}