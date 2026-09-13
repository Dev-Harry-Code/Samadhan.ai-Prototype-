import { ButtonHTMLAttributes } from "react";

export function EmptyState({
  icon,
  title,
  note,
}: {
  icon?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-12 text-center">
      {icon && <span className="text-3xl">{icon}</span>}
      <p className="mt-3 text-sm font-semibold text-slate-700">{title}</p>
      {note && <p className="mt-1 max-w-xs text-xs text-slate-700">{note}</p>}
    </div>
  );
}

export function Chip({
  active = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-700 ring-1 ring-slate-900/10 hover:bg-slate-50"
      } ${className}`}
      {...props}
    />
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

export function inputClass(extra = "") {
  return `w-full rounded-xl border-0 bg-white ring-1 ring-slate-900/10 placeholder:text-slate-700 focus:ring-2 focus:ring-primary-500 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-shadow ${extra}`;
}
