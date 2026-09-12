"use client";

import { useState } from "react";
import { Download, FileBarChart, FileText, FileSpreadsheet, Plus, Trash2 } from "lucide-react";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_EMPLOYEES } from "@/lib/data/company-mock";

const TEMPLATES = [
  { title: "Monthly CSR impact report", scope: "Company-wide · Sep 2026", size: "2.1 MB" },
  { title: "Issue ageing report", scope: "Older than 7 days", size: "640 KB" },
  { title: "Geospatial heatmap data", scope: "Map layers · 7 areas", size: "3.4 MB" },
];

const REPORTS = [
  {
    id: "RPT-2026-09-01",
    title: "Weekly operations snapshot",
    kind: "Auto",
    date: "Sep 6, 2026",
    pages: 8,
  },
  {
    id: "RPT-2026-08-31",
    title: "August quarterly insight pack",
    kind: "Manual",
    date: "Aug 31, 2026",
    pages: 22,
  },
  {
    id: "RPT-2026-08-24",
    title: "Critical backlog deep-dive",
    kind: "Manual",
    date: "Aug 24, 2026",
    pages: 14,
  },
  {
    id: "RPT-2026-08-17",
    title: "Duplicates & merge analysis",
    kind: "Auto",
    date: "Aug 17, 2026",
    pages: 6,
  },
];

const KIND_STYLE: Record<string, string> = {
  Auto: "bg-violet-50 text-violet-600 ring-violet-200",
  Manual: "bg-sky-50 text-sky-600 ring-sky-200",
};

export function CompanyReportsPage() {
  const [local, setLocal] = useState<typeof REPORTS>([]);
  const [busyTitle, setBusyTitle] = useState<string | null>(null);

  const generate = (t: (typeof TEMPLATES)[number], index: number) => {
    setBusyTitle(t.title);
    setTimeout(() => {
      setLocal((p) => [
        {
          id: `RPT-2026-09-${String(index + 1).padStart(2, "0")}-GEN`,
          title: `${t.title} (generated)`,
          kind: "Auto",
          date: "Sep 12, 2026",
          pages: 10,
        },
        ...p,
      ]);
      setBusyTitle(null);
    }, 900);
  };

  const all = [...local, ...REPORTS];

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<FileBarChart size={20} />}
        iconBg="bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
        title="Reports &amp; exports"
        subtitle={`${all.length} reports available for download`}
        action={
          <Button variant="secondary" size="sm">
            <Plus size={15} /> New report
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {TEMPLATES.map((t, idx) => (
          <div key={t.title} className="glass flex flex-col justify-between rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                idx === 0 ? "bg-amber-50 text-amber-600" : idx === 1 ? "bg-teal-50 text-teal-600" : "bg-violet-50 text-violet-600",
              )}
            >
              {idx === 0 ? <FileSpreadsheet size={19} /> : <FileText size={19} />}
            </div>
            <p className="mt-3 text-sm font-bold text-slate-900">{t.title}</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-600">{t.scope}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-600">{t.size}</span>
              <Button size="sm" variant={busyTitle === t.title ? "secondary" : "primary"} disabled={busyTitle !== null} onClick={() => generate(t, idx)}>
                {busyTitle === t.title ? "Generating…" : "Generate"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="text-sm font-bold text-slate-900">Recent reports</p>
        <div className="mt-3 grid gap-2">
          {all.map((r) => (
            <div
              key={r.id}
              className="group flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5 transition hover:bg-white hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 ring-1 ring-slate-900/5">
                <FileText size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{r.title}</p>
                <p className="text-[11px] font-medium text-slate-600">
                  {r.id} · {r.date} · {r.pages} pages
                </p>
              </div>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1", KIND_STYLE[r.kind])}>
                {r.kind}
              </span>
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-slate-600 transition hover:bg-primary-50 hover:text-primary-600">
                  <Download size={16} />
                </button>
                {r.kind === "Auto" && (
                  <button
                    onClick={() => setLocal((p) => p.filter((x) => x.id !== r.id))}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-rose-50 hover:text-rose-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-900 p-5 text-white shadow-lg shadow-slate-900/10 ring-1 ring-white/10">
        <p className="text-sm font-bold">Scheduled exports</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
          <span className="rounded-full bg-white/10 px-3 py-1">Weekly ops digest</span>
          <span className="rounded-full bg-white/10 px-3 py-1">CSR impact (monthly)</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Real-time API pushes</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Sends to <span className="font-bold text-sky-300">{COMPANY_EMPLOYEES[4].name}</span> ({COMPANY_EMPLOYEES[4].dept}) automatically every Friday 6 PM.
        </p>
      </div>
    </div>
  );
}