import type { Metadata } from "next";

import { CompanyIssueDetailsPage } from "@/components/funder/pages/issue-details";

export const metadata: Metadata = {
  title: "Issue details — Samadhan Corporation",
};

export default async function FunderIssueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CompanyIssueDetailsPage id={id} />;
}