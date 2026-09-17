import { GovernmentDashboard } from "@/components/government/gov-dashboard";
import { GovernmentShell } from "@/components/government/gov-shell";

export const metadata = {
  title: "Government Command Center | Samadhan AI",
  description:
    "District Collector dashboard: citizen-reported civic issues, AI-validated pipeline, district heatmap, sector trends and university leaderboards.",
};

export default function Page() {
  const allowReset = process.env.NODE_ENV === "development" || process.env.ALLOW_RESET === "true";
  return (
    <GovernmentShell>
      <GovernmentDashboard allowReset={allowReset} />
    </GovernmentShell>
  );
}