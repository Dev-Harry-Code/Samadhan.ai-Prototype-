"use client";

import { useState } from "react";
import { Building2, Check, Globe2, KeyRound, Loader2, Power, Timer, Wallet } from "lucide-react";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/i18n/translations";
import { useLang } from "@/lib/i18n/language-context";
import { COMPANY_ACCOUNTS, COMPANY_USER } from "@/lib/data/company-mock";
import { DocumentUploader } from "@/components/ui/document-uploader";

const currencies = ["₹ INR", "$ USD", "€ EUR", "£ GBP"];
const timezones = ["Asia/Kolkata (GMT+5:30)", "UTC", "Asia/Dubai (GMT+4)", "America/New_York (GMT-5)"];

export function CompanySettingsPage() {
  const { lang, setLang } = useLang();
  const [currency, setCurrency] = useState(currencies[0]);
  const [timezone, setTimezone] = useState(timezones[0]);
  const [twoFA, setTwoFA] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const [hours, setHours] = useState([
    { day: "Monday", start: "9am", end: "6pm" },
    { day: "Tuesday", start: "9am", end: "6pm" },
    { day: "Wednesday", start: "9am", end: "6pm" },
    { day: "Thursday", start: "9am", end: "6pm" },
    { day: "Friday", start: "9am", end: "6pm" },
    { day: "Weekend", start: "10am", end: "1pm" },
  ]);

  const save = (area: string) => {
    setSaving(area);
    setTimeout(() => setSaving(null), 800);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-6">
      <PortalPageHeader
        icon={<Building2 size={20} />}
        iconBg="bg-gradient-to-br from-slate-700 to-emerald-900 text-white shadow-md shadow-slate-700/20"
        title="Settings"
        subtitle={`${COMPANY_USER.company} workspace configuration`}
        action={
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 ring-1 ring-emerald-200">
            <Check size={12} strokeWidth={3} /> Growth plan eligibility
          </span>
        }
      />

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Globe2 size={16} className="text-primary-600" /> Language
        </p>
        <p className="text-xs text-slate-700">Portals can be localized for multilingual rollouts.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-bold transition",
                lang === l.code
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <Wallet size={16} className="text-amber-500" /> Workspace preferences
          </p>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-700">Currency</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-bold transition",
                      currency === c
                        ? "bg-primary-500 text-white shadow-sm"
                        : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-700">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-primary-500"
              >
                {timezones.map((tz) => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <Button size="sm" onClick={() => save("prefs")} disabled={saving !== null}>
              {saving === "prefs" ? <Loader2 size={14} className="animate-spin" /> : null}
              {saving === "prefs" ? "Saving…" : "Save preferences"}
            </Button>
          </div>
        </div>

        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <KeyRound size={16} className="text-emerald-500" /> Security
          </p>
          <div className="mt-3 space-y-3">
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
              <span>
                <span className="block text-sm font-bold text-slate-800">Two-factor auth</span>
                <span className="block text-xs text-slate-700">Require OTP on admin logins</span>
              </span>
              <button
                onClick={() => setTwoFA((v) => !v)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition",
                  twoFA ? "bg-primary-500" : "bg-slate-300",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
                    twoFA ? "left-[22px]" : "left-0.5",
                  )}
                />
              </button>
            </label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
              <span>
                <span className="block text-sm font-bold text-slate-800">Session timeout</span>
                <span className="block text-xs text-slate-700">Auto-logout after 30 min idle</span>
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-200">
                30 min
              </span>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => save("sec")} disabled={saving !== null}>
                Change password
              </Button>
              <Button size="sm" variant="danger" onClick={() => save("sec")} disabled={saving !== null}>
                <Power size={14} /> Sign out everywhere
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Timer size={16} className="text-violet-500" /> Worked hours
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {hours.map((h, idx) => (
            <div key={h.day} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5">
              <span className="text-sm font-bold text-slate-700">{h.day}</span>
              <div className="flex items-center gap-1.5">
                <input
                  value={h.start}
                  onChange={(e) =>
                    setHours((p) => p.map((x, i) => (i === idx ? { ...x, start: e.target.value } : x)))
                  }
                  className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs font-bold text-slate-700 outline-none focus:border-primary-500"
                />
                <span className="text-slate-700">→</span>
                <input
                  value={h.end}
                  onChange={(e) =>
                    setHours((p) => p.map((x, i) => (i === idx ? { ...x, end: e.target.value } : x)))
                  }
                  className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs font-bold text-slate-700 outline-none focus:border-primary-500"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 ring-1 ring-primary-600/20">
            Workload formula aware
          </span>
          <Button size="sm" onClick={() => save("hours")} disabled={saving !== null}>
            {saving === "hours" ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving === "hours" ? "Saving…" : "Save hours"}
          </Button>
        </div>
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="text-sm font-bold text-slate-900">Manage your organizations</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {COMPANY_ACCOUNTS.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
              <div>
                <p className="text-sm font-bold text-slate-800">{a.name}</p>
                <p className="text-xs text-slate-700">
                  {a.plan} · {a.issues} issues · score {a.score}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold ring-1",
                  a.status === "active"
                    ? "bg-emerald-50 text-emerald-600 ring-emerald-200"
                    : "bg-rose-50 text-rose-500 ring-rose-200",
                )}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="text-sm font-bold text-slate-900">Compliance & Tax Documents</p>
        <p className="mt-1 text-xs text-slate-700">Upload your latest CSR exemption certificates and audit logs.</p>
        <div className="mt-4">
          <DocumentUploader
            label="Upload Document"
            hint="Supports PDF, JPG. Max 15MB."
            accept=".pdf,.jpg,.jpeg"
            maxSizeMB={15}
          />
        </div>
      </div>
    </div>
  );
}
