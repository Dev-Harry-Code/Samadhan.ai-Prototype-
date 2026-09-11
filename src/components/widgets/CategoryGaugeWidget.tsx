import React from 'react';
import { ThemeMode } from '../../types';

interface CategoryGaugeWidgetProps {
  theme: ThemeMode;
}

export const CategoryGaugeWidget: React.FC<CategoryGaugeWidgetProps> = () => {
  const categories = [
    { label: 'Water', count: '524', pct: 42, color: '#0D9488' },
    { label: 'Health', count: '274', pct: 28, color: '#F97316' },
    { label: 'Civic Roads', count: '225', pct: 18, color: '#0284C7' },
    { label: 'Energy', count: '148', pct: 12, color: '#10B981' },
  ];

  return (
    <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[380px] box-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold truncate text-slate-900">
            Sector Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Distribution of challenges
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
        </div>
      </div>

      {/* Responsive SVG Arc Gauge */}
      <div className="flex flex-col items-center justify-center my-auto py-2 w-full">
        <div className="relative w-48 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
            {/* Background Arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Active Segments with Teal and Orange */}
            <path
              d="M 10 50 A 40 40 0 0 1 45 12"
              fill="none"
              stroke="#0D9488"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 45 12 A 40 40 0 0 1 75 22"
              fill="none"
              stroke="#F97316"
              strokeWidth="10"
            />
            <path
              d="M 75 22 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#0284C7"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>

          {/* Central Counter Display */}
          <div className="absolute bottom-0 text-center flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-slate-900">
              1,247
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider mt-1 text-slate-500">
              Total Reports
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 w-full">
        {categories.map((c, i) => (
          <div
            key={i}
            className="p-2 rounded-xl border bg-slate-50 border-slate-200 flex items-center justify-between gap-1.5"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              ></span>
              <span className="text-[11px] font-semibold truncate text-slate-700">
                {c.label}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-900 flex-shrink-0">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
