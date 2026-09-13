"use client";

import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  Angry,
  ArrowLeft,
  BadgeCheck,
  Bot,
  CalendarClock,
  Camera,
  Check,
  CheckCircle2,
  FileText,
  Frown,
  MapPin,
  Meh,
  MessageSquare,
  Smile,
  ThumbsUp,
  User,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { CompanySeverityBadge, CompanyStatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/stat-card";
import { cn } from "@/lib/utils";
import { COMPANY_ISSUES, COMPANY_ISSUE_STEPS } from "@/lib/data/company-mock";

const STEP_ICON: Record<string, LucideIcon> = {
  Reported: FileText,
  "AI Verified": Bot,
  Assigned: Users,
  "In progress": Wrench,
  "Resolution proof": Camera,
  Closed: CheckCircle2,
};

const SENTIMENT_ICON: Record<string, LucideIcon> = {
  Angry: Angry,
  Frustrated: Frown,
  Scared: AlertTriangle,
  Worried: Frown,
  Concerned: AlertCircle,
  Annoyed: Meh,
  Neutral: Meh,
  Satisfied: Smile,
  Thankful: Smile,
};

function StepIcon({ label }: { label: string }) {
  const Icon = STEP_ICON[label] ?? FileText;
  return <Icon size={15} />;
}

export function CompanyIssueDetailsPage({ id }: { id: string }) {
  const issue = COMPANY_ISSUES.find((i) => i.id === id) ?? COMPANY_ISSUES[0];

  return (
    <div className="mx-auto max-w-4xl pb-6">
      <Link
        href="/funder/issues"
        className="mb-4 inline-flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:text-primary-600"
      >
        <ArrowLeft size={15} /> All issues
      </Link>

      <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-primary-600">{issue.id}</p>
            <h1 className="mt-0.5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {issue.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <CompanyStatusBadge status={issue.status} />
              <CompanySeverityBadge severity={issue.priority ?? issue.severity} />
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                {issue.category}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                {issue.department}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-900/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              {issue.beforeImage ? <issue.beforeImage size={16} /> : <MapPin size={16} />}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Revenue estimate</p>
              <p className="text-sm font-extrabold text-slate-900">₹{issue.revenueEstimate.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 text-[12px] font-medium text-slate-700 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-primary-500" /> {issue.area}
          </div>
          <div className="flex items-center gap-2">
            <User size={15} className="shrink-0 text-primary-500" /> Reported by {issue.reportedBy}
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock size={15} className="shrink-0 text-primary-500" /> {issue.reportedAt}
          </div>
        </div>

        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-900/5">
          {issue.description}
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5">
            <ThumbsUp size={16} className="shrink-0 text-primary-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Upvotes</p>
              <p className="text-sm font-extrabold text-slate-900">{issue.upvotes}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5">
            <MessageSquare size={16} className="shrink-0 text-primary-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">AI confidence</p>
              <p className="text-sm font-extrabold text-slate-900">{Math.round(issue.confidence * 100)}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5">
            <BadgeCheck size={16} className="shrink-0 text-primary-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Sentiment</p>
              <p className="text-sm font-extrabold text-slate-900">{issue.sentiment}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-700">Resolution progress</p>
          <ProgressBar
            value={issue.status === "resolved" ? 100 : issue.status === "in_progress" ? 66 : 33}
            className="bg-slate-100"
          />
          <p className="mt-1.5 text-xs font-semibold text-slate-700">{issue.resolutionETA}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-900">Lifecycle</h2>
          <div className="mt-4 space-y-0">
            {COMPANY_ISSUE_STEPS.map((step, idx) => {
              const last = idx === COMPANY_ISSUE_STEPS.length - 1;
              return (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm ring-2",
                        step.done
                          ? "bg-primary-50 text-primary-600 ring-primary-500/40"
                          : "bg-slate-50 text-slate-700 ring-slate-200",
                      )}
                    >
                      {step.done ? <Check size={15} strokeWidth={3} /> : <StepIcon label={step.label} />}
                    </div>
                    {!last && <div className={cn("w-0.5 flex-1", step.done ? "bg-primary-200" : "bg-slate-200")} />}
                  </div>
                  <div className={cn("pb-5", last && "pb-0")}>
                    <p className={cn("text-sm font-bold", step.done ? "text-slate-800" : "text-slate-700")}>
                      {step.label}
                    </p>
                    <p className="text-xs font-medium text-slate-700">{step.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <Bot size={15} className="text-primary-600" /> AI summary
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">
              {issue.aiSummary ?? "No AI summary available for this issue yet."}
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-700">
              <span>AI confidence</span>
              <span>{Math.round(issue.confidence * 100)}%</span>
            </div>
            <ProgressBar value={Math.round(issue.confidence * 100)} className="mt-1 bg-slate-200" />
          </div>

          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <p className="text-sm font-bold text-slate-900">Sentiment analysis</p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                {(() => {
                  const Icon = SENTIMENT_ICON[issue.sentiment] ?? Smile;
                  return <Icon size={22} />;
                })()}
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">{issue.sentiment}</p>
                <p className="text-[11px] font-medium text-slate-700">Dominant citizen emotion</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/funder/assignments">
              <Button className="w-full" size="lg">
                {issue.assignee === "Unassigned" ? "Assign this issue" : `Manage · ${issue.assignee}`}
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full">
              Download resolution report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
