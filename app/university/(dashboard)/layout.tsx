import { UniversityShell } from "@/components/university/university-shell";

export default function UniversityDashboardLayout({ children }: { children: React.ReactNode }) {
  return <UniversityShell>{children}</UniversityShell>;
}