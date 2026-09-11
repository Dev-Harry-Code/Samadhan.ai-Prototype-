import React from 'react';
import { ThemeMode } from '../../types';

interface CategoryGaugeWidgetProps {
  theme: ThemeMode;
}

export const CategoryGaugeWidget: React.FC<CategoryGaugeWidgetProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  const cardBgClass = isDark
    ? 'glass-widget-dark'
    : isEmerald
    ? 'glass-widget-emerald'
    : 'glass-widget-light';

  const categories = [
    { label: 'Water', count: '524', pct: 42, color: '#a855f7' },
    { label: 'Health', count: '274', pct: 28, color: '#d946ef' },
    { label: 'Civic Roads', count: '225', pct: 18, color: '#06b6d4' },
    { label: 'Energy', count: '148', pct: 12, color: '#10b981' },
  ];

  return (
    <div className={`${cardBgClass} p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[380px] box-border`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className={`text-sm sm:text-base font-bold truncate ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
            Sector Breakdown
          </h3>
          <p className={`text-xs ${isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}`}>
            Distribution of challenges
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-neon-purple flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
        </div>
      </div>

      {/* Responsive, Mathematically Contained SVG Arc Gauge */}
      <div className="flex flex-col items-center justify-center my-auto py-2 w-full">
        <div className="relative w-48 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
            {/* Background Arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Active Segments with glowing gradients */}
            <path
              d="M 10 50 A 40 40 0 0 1 45 12"
              fill="none"
              stroke="#a855f7"
              strokeWidth="10"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
            />
            <path
              d="M 45 12 A 40 40 0 0 1 75 22"
              fill="none"
              stroke="#d946ef"
              strokeWidth="10"
              className="drop-shadow-[0_0_8px_rgba(217,70,239,0.7)]"
            />
            <path
              d="M 75 22 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="10"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]"
            />
          </svg>

          {/* Central Counter Display */}
          <div className="absolute bottom-0 text-center flex flex-col items-center">
            <span className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              1,247
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}`}>
              Total Reports
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills: Bounded Grid */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.08] w-full">
        {categories.map((c, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl border flex items-center justify-between gap-1.5 ${
              isDark || isEmerald
                ? 'bg-white/[0.02] border-white/[0.06]'
                : 'bg-slate-50 border-slate-100'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }}></span>
              <span className={`text-[11px] font-bold truncate ${isDark || isEmerald ? 'text-slate-300' : 'text-slate-700'}`}>
                {c.label}
              </span>
            </div>
            <span className="text-[11px] font-mono font-extrabold text-neon-fuchsia flex-shrink-0">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
