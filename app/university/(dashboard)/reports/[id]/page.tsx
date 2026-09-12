import type { Metadata } from "next";

import { UniversityReportDetailPage } from "@/components/university/pages/report-detail";

export const metadata: Metadata = {
  title: "Report detail — Samadhan.ai",
};

export default async function UniversityReportDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UniversityReportDetailPage id={id} />;
}