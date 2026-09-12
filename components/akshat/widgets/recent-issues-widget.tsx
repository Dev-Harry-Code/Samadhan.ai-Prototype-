"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, MapPin, Radio, ThumbsUp } from "lucide-react";

import type { Issue, ScreenId } from "@/lib/akshat-types";
import { NEARBY_ISSUES, PRIMARY_ISSUE } from "@/lib/data/akshat-mock";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import {
  categoryText,
  issueField,
  statusText,
} from "@/components/akshat/localize-helpers";

interface RecentIssuesFeedWidgetProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
}

export const RecentIssuesFeedWidget = ({
  setScreen,
  setSelectedIssue,
}: RecentIssuesFeedWidgetProps) => {
  const { t } = useAkshat();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const issues = [PRIMARY_ISSUE, ...NEARBY_ISSUES.slice(0, 2)];

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative box-border flex h-full min-h-[390px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black tracking-tight text-slate-900">
              {t("recentIssues", "Recent Issues")}
            </h3>
            <span className="flex items-center gap-1 whitespace-nowrap rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">
              <Radio className="h-2.5 w-2.5 animate-pulse text-teal-600" />
              {t("liveFeed", "Live Feed")}
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {t("recentIssuesSub", "Click any issue to inspect details & comment")}
          </p>
        </div>

        <button
          onClick={() => setScreen("issues_feed")}
          className="flex flex-shrink-0 items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
        >
          <span>{t("allIssues", "All Issues")}</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="my-auto space-y-2.5">
        {issues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => {
              setSelectedIssue(issue);
              setScreen("issue_details");
            }}
            className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-all duration-200 hover:border-teal-300 hover:bg-slate-100/90"
          >
            <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-16 sm:w-16">
              {!imageErrors[issue.id] ? (
                <Image
                  src={issue.imageUrl}
                  alt={issueField(t, issue, "title", issue.title)}
                  fill
                  sizes="64px"
                  onError={() => handleImageError(issue.id)}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-teal-50 text-teal-700">
                  <MapPin className="h-5 w-5 text-teal-600" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span className="rounded border border-teal-100 bg-teal-50 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-teal-700">
                  {categoryText(t, issue.category)}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                    issue.status === "Resolved"
                      ? "border border-teal-200 bg-teal-50 text-teal-700"
                      : issue.status === "In progress"
                        ? "border border-amber-200 bg-amber-50 text-amber-800"
                        : "border border-orange-200 bg-orange-50 text-orange-800",
                  )}
                >
                  {statusText(t, issue.status)}
                </span>
              </div>
              <h4 className="truncate text-xs font-bold text-slate-900 transition-colors group-hover:text-teal-700 sm:text-sm">
                {issueField(t, issue, "title", issue.title)}
              </h4>
              <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-500">
                <MapPin className="h-3 w-3 flex-shrink-0 text-slate-600" />
                <span className="truncate">{issueField(t, issue, "location", issue.location)} • {issue.distance || "1.4 km"}</span>
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-xs transition-all group-hover:border-teal-300 group-hover:text-teal-700">
              <ThumbsUp className="h-3.5 w-3.5 text-teal-600" />
              <span>{issue.upvotes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};