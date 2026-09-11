import React from 'react';
import { TOP_VOLUNTEERS } from '../../data/mockData';
import { ThemeMode } from '../../types';

interface TopVolunteersWidgetProps {
  theme: ThemeMode;
}

export const TopVolunteersWidget: React.FC<TopVolunteersWidgetProps> = () => {
  return (
    <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[390px] box-border">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-black tracking-tight text-slate-900">
              Top Volunteers
            </h3>
            <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
              Live Karma
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate text-slate-500">
            Citizens leading ground implementation
          </p>
        </div>

        <button className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex-shrink-0">
          View All
        </button>
      </div>

      {/* Volunteers list */}
      <div className="space-y-2.5 my-auto">
        {TOP_VOLUNTEERS.map((vol) => (
          <div
            key={vol.id}
            className="p-3 rounded-2xl flex items-center justify-between gap-3 transition-all duration-200 bg-slate-50 hover:bg-slate-100 border border-slate-200"
          >
            {/* Left Zone: Rank, Avatar, Identity */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {/* Rank Badge */}
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] flex-shrink-0 ${
                vol.rank === 1
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : vol.rank === 2
                  ? 'bg-slate-200 text-slate-700 border border-slate-300'
                  : vol.rank === 3
                  ? 'bg-orange-100 text-orange-800 border border-orange-300'
                  : 'text-slate-500 bg-slate-100'
              }`}>
                #{vol.rank}
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-300 relative shadow-xs flex-shrink-0">
                <img src={vol.avatar} alt={vol.name} className="w-full h-full object-cover" />
              </div>

              {/* Name & Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold truncate text-slate-900">
                    {vol.name}
                  </span>
                  <span className="text-[9px] font-bold text-teal-800 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 whitespace-nowrap flex-shrink-0">
                    {vol.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate mt-0.5">
                  <span className="truncate">{vol.role}</span>
                  <span>•</span>
                  <span className="text-teal-700 font-bold flex-shrink-0">{vol.solvedCount} solved</span>
                </div>
              </div>
            </div>

            {/* Right Zone: XP points and Progress Bar */}
            <div className="text-right flex-shrink-0">
              <div className="text-xs sm:text-sm font-black text-slate-900">
                {vol.xp.toLocaleString()} <span className="text-[10px] text-teal-600 font-bold">XP</span>
              </div>
              <div className="w-16 sm:w-20 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden ml-auto">
                <div
                  className="bg-teal-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (vol.xp / 5000) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
