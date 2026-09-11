import React, { useState } from 'react';
import { ThemeMode } from '../../types';

interface CommunityImpactChartProps {
  theme: ThemeMode;
}

export const CommunityImpactChart: React.FC<CommunityImpactChartProps> = ({ theme }) => {
  const [activeRange, setActiveRange] = useState<'month' | 'quarter' | 'year'>('month');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4);

  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  const cardBgClass = isDark
    ? 'glass-widget-dark'
    : isEmerald
    ? 'glass-widget-emerald'
    : 'glass-widget-light';

  // Monthly trends data
  const data = [
    { month: 'Apr', submitted: 45, resolved: 32 },
    { month: 'May', submitted: 65, resolved: 50 },
    { month: 'Jun', submitted: 88, resolved: 72 },
    { month: 'Jul', submitted: 110, resolved: 94 },
    { month: 'Aug', submitted: 145, resolved: 128 },
    { month: 'Sep', submitted: 190, resolved: 175 },
    { month: 'Oct', submitted: 220, resolved: 205 },
  ];

  const maxVal = 240;

  return (
    <div className={`${cardBgClass} p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[390px] box-border`}>
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-52 h-52 bg-neon-purple/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Title & Filter controls (Vertical stack on mobile, horizontal on desktop to prevent truncation) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-base sm:text-lg font-black tracking-tight whitespace-normal ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              Community Impact Analytics
            </h3>
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}`}>
            Civic challenges submitted vs. verified solutions
          </p>
        </div>

        {/* Time range selector */}
        <div className={`flex items-center p-1 rounded-xl text-xs font-semibold self-start sm:self-auto flex-shrink-0 ${isDark || isEmerald ? 'bg-white/[0.05] border border-white/10' : 'bg-slate-100'}`}>
          <button
            onClick={() => setActiveRange('month')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeRange === 'month' ? (isDark ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-sm' : 'bg-white shadow text-slate-900') : (isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-500')}`}
          >
            This Month
          </button>
          <button
            onClick={() => setActiveRange('quarter')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeRange === 'quarter' ? (isDark ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-sm' : 'bg-white shadow text-slate-900') : (isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-500')}`}
          >
            Quarter
          </button>
          <button
            onClick={() => setActiveRange('year')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeRange === 'year' ? (isDark ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-sm' : 'bg-white shadow text-slate-900') : (isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-500')}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Legend & Ratio */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-fuchsia shadow-[0_0_8px_rgba(217,70,239,0.8)]"></span>
            <span className={isDark || isEmerald ? 'text-slate-300' : 'text-slate-600'}>
              Resolved ({hoveredIndex !== null ? data[hoveredIndex].resolved : 175})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
            <span className={isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}>
              Submitted ({hoveredIndex !== null ? data[hoveredIndex].submitted : 190})
            </span>
          </div>
        </div>
        <div className={`font-mono text-xs font-bold ${isDark || isEmerald ? 'text-neon-cyan' : 'text-brand-600'}`}>
          Resolution Rate: 92.1%
        </div>
      </div>

      {/* Custom Bounded Bar Chart with plenty of padding so Oct is never cut off */}
      <div className="h-44 w-full flex items-end justify-between gap-1 sm:gap-3 pt-3 px-1 sm:px-3 relative z-10">
        {data.map((item, idx) => {
          const resolvedHeight = Math.min(100, Math.max(12, (item.resolved / maxVal) * 100));
          const submittedHeight = Math.min(100, Math.max(12, (item.submitted / maxVal) * 100));
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer max-w-[42px]"
            >
              {/* Tooltip on active */}
              <div className="h-6 flex items-center justify-center">
                {isHovered ? (
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg ${isDark || isEmerald ? 'bg-white text-slate-950' : 'bg-slate-900 text-white'}`}>
                    {item.resolved} fixed
                  </span>
                ) : null}
              </div>

              {/* Bars container */}
              <div className="w-full flex items-end justify-center gap-1 h-28 relative">
                {/* Submitted Bar */}
                <div
                  style={{ height: `${submittedHeight}%` }}
                  className={`w-2 sm:w-3 rounded-t-md transition-all duration-300 ${
                    isDark || isEmerald
                      ? 'bg-slate-700/50 group-hover:bg-slate-600'
                      : 'bg-slate-200 group-hover:bg-slate-300'
                  }`}
                ></div>

                {/* Resolved Bar */}
                <div
                  style={{ height: `${resolvedHeight}%` }}
                  className={`w-2 sm:w-3 rounded-t-md transition-all duration-300 relative ${
                    isHovered
                      ? 'bg-gradient-to-t from-neon-purple to-neon-fuchsia shadow-[0_0_16px_rgba(217,70,239,0.8)]'
                      : 'bg-gradient-to-t from-neon-purple/70 to-neon-fuchsia/90'
                  }`}
                >
                  <div className="w-full h-0.5 bg-white/80 rounded-full"></div>
                </div>
              </div>

              {/* Month label */}
              <span className={`text-[10px] sm:text-[11px] font-bold mt-2 transition-colors ${
                isHovered
                  ? (isDark || isEmerald ? 'text-white font-extrabold' : 'text-slate-950 font-extrabold')
                  : (isDark || isEmerald ? 'text-slate-400' : 'text-slate-500')
              }`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
