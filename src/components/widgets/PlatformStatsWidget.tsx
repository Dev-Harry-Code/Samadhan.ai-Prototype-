import React from 'react';
import { PLATFORM_STATS } from '../../data/mockData';
import { ThemeMode } from '../../types';

interface PlatformStatsWidgetProps {
  theme: ThemeMode;
  isMobileFrame?: boolean;
}

export const PlatformStatsWidget: React.FC<PlatformStatsWidgetProps> = ({ isMobileFrame = false }) => {
  const stats = [
    {
      title: 'Resolved Issues',
      value: PLATFORM_STATS.totalResolved,
      growth: PLATFORM_STATS.resolvedGrowth,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      iconBg: 'bg-teal-50 border border-teal-100',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      title: 'Active Volunteers',
      value: PLATFORM_STATS.activeVolunteers,
      growth: PLATFORM_STATS.volunteersGrowth,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      iconBg: 'bg-orange-50 border border-orange-100',
      badgeColor: 'text-orange-700 bg-orange-50 border-orange-200'
    },
    {
      title: 'CSR Deployed',
      value: PLATFORM_STATS.csrFundsMobilized,
      growth: PLATFORM_STATS.fundsGrowth,
      icon: (
        <span className="text-teal-700 font-black text-base leading-none">₹</span>
      ),
      iconBg: 'bg-teal-50 border border-teal-100',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      title: 'AI Accuracy',
      value: PLATFORM_STATS.aiAccuracy,
      growth: PLATFORM_STATS.accuracyGrowth,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      iconBg: 'bg-teal-50 border border-teal-100',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    }
  ];

  return (
    <div className={`grid ${isMobileFrame ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 p-4 sm:p-5 rounded-2xl relative overflow-hidden group transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate text-slate-500">
              {stat.title}
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
              {stat.icon}
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-1 relative z-10 mt-1 flex-wrap">
            <div className="text-lg sm:text-2xl font-black tracking-tight leading-tight truncate text-slate-900">
              {stat.value}
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${stat.badgeColor} flex-shrink-0`}>
              {stat.growth}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate">Updated via CivicAI</span>
            <span className="font-semibold text-teal-600">96.8%</span>
          </div>
        </div>
      ))}
    </div>
  );
};
