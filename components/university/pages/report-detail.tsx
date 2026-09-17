"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CalendarCheck,
  Camera,
  Check,
  Download,
  MapPin,
  Share2,
  ThumbsUp,
} from "lucide-react";

import { UniversityStatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { DocumentUploader } from "@/components/ui/document-uploader";
import { cn } from "@/lib/utils";
import { universityReportFromDetail } from "@/lib/university-mapper";
import { useApiGet } from "@/lib/api/client";
import type { ApiIssueDetail } from "@/lib/api/models";
import {
  UNIVERSITY_AI_RECOMMENDATIONS,
  UNIVERSITY_REPORTS,
  UNIVERSITY_REPORT_STEPS,
  UNIVERSITY_USER,
} from "@/lib/data/university-mock";

export function UniversityReportDetailPage({ id }: { id: string }) {
  const mockReport = UNIVERSITY_REPORTS.find((r) => r.id === id) ?? UNIVERSITY_REPORTS[0];
  const { data: detail } = useApiGet<ApiIssueDetail>(`/api/issues/${encodeURIComponent(id)}`);
  const report = useMemo(() => (detail ? universityReportFromDetail(detail) : mockReport), [detail, mockReport]);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  const stepIndex = report.progressStep;

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/university/reports"
          className="inline-flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:text-primary-600"
        >
          <ArrowLeft size={15} /> All reports
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShared(true)}>
            <Share2 size={14} /> {shared ? "Copied link!" : "Share"}
          </Button>
          <Button size="sm">
            <Download size={14} /> Download report
          </Button>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-3xl shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-slate-900 to-teal-900 sm:h-64">
          <Image
            src={report.banner}
            alt={report.title}
            width={1024}
            height={384}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          <div className="relative z-10 w-full p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <UniversityStatusBadge status={report.status} />
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold text-white ring-1 ring-white/20 backdrop-blur">
                {report.urgency} urgency
              </span>
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold text-white ring-1 ring-white/20 backdrop-blur">
                {report.category}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">{report.title}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-50/90">
              <MapPin size={13} /> {report.location} · {report.updatedAgo}
            </p>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Reported by</p>
            <p className="mt-0.5 text-sm font-bold text-slate-800">{UNIVERSITY_USER.name}</p>
            <p className="text-[11px] font-medium text-slate-700">{UNIVERSITY_USER.title}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Assigned to</p>
            <p className="mt-0.5 text-sm font-bold text-primary-600">{report.assignedTo}</p>
            <p className="text-[11px] font-medium text-slate-700">{report.assignedTeam}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Updated</p>
            <p className="mt-0.5 text-sm font-bold text-slate-800">{report.updatedAgo}</p>
            <p className="text-[11px] font-medium text-slate-700">on Samadhan workboard</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <h2 className="text-sm font-bold text-slate-900">Issue Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{report.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setLiked((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition",
                  liked ? "bg-primary-500 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                )}
              >
                <ThumbsUp size={13} /> {liked ? "Supported" : "Support issue"}
              </button>
            </div>
          </div>

          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <CalendarCheck size={15} className="text-primary-600" /> Progress
              </h2>
              <span className="text-xs font-bold text-primary-600">
                Step {Math.min(stepIndex + 1, UNIVERSITY_REPORT_STEPS.length)}/{UNIVERSITY_REPORT_STEPS.length}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between px-0.5">
              {UNIVERSITY_REPORT_STEPS.map((step, i) => {
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={step} className="flex flex-1 flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ring-2 transition",
                        done && "bg-primary-500 text-white ring-primary-500",
                        active && "bg-white text-primary-600 ring-primary-500 shadow-md",
                        !done && !active && "bg-slate-50 text-slate-700 ring-slate-200",
                      )}
                    >
                      {done ? <Check size={16} strokeWidth={3} /> : i + 1}
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-center text-[10px] font-bold sm:text-[11px]",
                        done ? "text-primary-600" : active ? "text-slate-900" : "text-slate-700",
                      )}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3">
              {report.timeline.map((item, i) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ring-1",
                        item.done
                          ? "bg-primary-50 text-primary-600 ring-primary-200"
                          : "bg-slate-50 text-slate-700 ring-slate-200",
                      )}
                    >
                      {i + 1}
                    </span>
                    {i < report.timeline.length - 1 && (
                      <div className={cn("w-0.5 flex-1", item.done ? "bg-primary-100" : "bg-slate-100")} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={cn("text-sm font-bold", item.done ? "text-slate-800" : "text-slate-700")}>
                      {item.title}
                    </p>
                    <p className="text-xs font-medium text-slate-700">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <Camera size={15} className="text-sky-500" /> Site photos
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {report.sitePhotos.map((src, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-900/5">
                  <Image
                    src={src}
                    alt={`${report.title} site photo ${i + 1}`}
                    width={320}
                    height={240}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* New Section for Resolution Proof */}
          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <h2 className="text-sm font-bold text-slate-900">Submit Resolution Proof</h2>
            <p className="mt-1 text-xs text-slate-700">Upload &quot;After&quot; photos or completion certificates once the issue is resolved.</p>
            <div className="mt-4">
              <DocumentUploader
                label="Upload Resolution Proof"
                hint="Supports JPG, PNG, PDF. Max 10MB."
                accept="image/*,.pdf"
                maxSizeMB={10}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60">
                <Bot size={16} />
              </span>
              AI Recommendations
            </p>
            <div className="mt-3.5 space-y-2.5">
              {UNIVERSITY_AI_RECOMMENDATIONS.map((r) => (
                <div key={r.num} className="flex gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
                    {r.num}
                  </span>
                  <p className="text-xs leading-relaxed text-slate-700">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <p className="text-sm font-bold text-slate-900">Community support</p>
            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
                <span>Local residents</span>
                <span className="font-bold text-primary-600">120</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
                <span>University supporters</span>
                <span className="font-bold text-primary-600">64</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
                <span>Municipal verification</span>
                <span className="font-bold text-emerald-600">Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
