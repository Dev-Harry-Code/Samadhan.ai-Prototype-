import { FunderShell } from "@/components/funder/funder-shell";

export default function FunderDashboardLayout({ children }: { children: React.ReactNode }) {
  return <FunderShell>{children}</FunderShell>;
}