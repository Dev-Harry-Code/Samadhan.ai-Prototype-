import React from 'react';
import { PLATFORM_STATS } from '../../data/mockData';
import { ThemeMode } from '../../types';

interface PlatformStatsWidgetProps {
  theme: ThemeMode;
  isMobileFrame?: boolean;
}

export const PlatformStatsWidget: React.FC<PlatformStatsWidgetProps> = ({ theme, isMobileFrame = false }) => {
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  const cardBgClass = isDark
    ? 'glass-widget-dark glass-widget-dark-hover'
    : isEmerald
    ? 'glass-widget-emerald'
    : 'glass-widget-light hover:shadow-md';

  const stats = [
    {
      title: 'Resolved Issues',
      value: PLATFORM_STATS.totalResolved,
      growth: PLATFORM_STATS.resolvedGrowth,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neon-fuchsia">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25',
      glow: 'from-fuchsia-500/20 to-purple-500/0'
    },
    {
      title: 'Active Volunteers',
      value: PLATFORM_STATS.activeVolunteers,
      growth: PLATFORM_STATS.volunteersGrowth,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      badgeColor: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
      glow: 'from-amber-500/20 to-orange-500/0'
    },
    {
      title: 'CSR Deployed',
      value: PLATFORM_STATS.csrFundsMobilized,
      growth: PLATFORM_STATS.fundsGrowth,
      icon: (
        <span className="text-neon-cyan font-black text-base leading-none">₹</span>
      ),
      badgeColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/25',
      glow: 'from-cyan-500/20 to-blue-500/0'
    },
    {
      title: 'AI Accuracy',
      value: PLATFORM_STATS.aiAccuracy,
      growth: PLATFORM_STATS.accuracyGrowth,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      badgeColor: 'text-purple-400 bg-purple-500/15 border-purple-500/25',
      glow: 'from-purple-500/20 to-indigo-500/0'
    }
  ];

  return (
    <div className={`grid ${isMobileFrame ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`${cardBgClass} p-4 sm:p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 flex flex-col justify-between`}
        >
          {/* Subtle hover gradient top glow */}
          <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${stat.glow} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>

          <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
            <span className={`text-[11px] font-bold uppercase tracking-wider truncate ${isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}`}>
              {stat.title}
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark || isEmerald ? 'bg-white/[0.06] border border-white/10' : 'bg-slate-100'}`}>
              {stat.icon}
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-1 relative z-10 mt-1 flex-wrap">
            <div className={`text-lg sm:text-2xl font-black tracking-tight leading-tight truncate ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              {stat.value}
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${stat.badgeColor} flex-shrink-0`}>
              {stat.growth}
            </span>
          </div>

          <div className={`text-[10px] mt-2 relative z-10 font-medium ${isDark || isEmerald ? 'text-slate-500' : 'text-slate-400'}`}>
            <span>Verified community impact</span>
          </div>
        </div>
      ))}
    </div>
  );
};
