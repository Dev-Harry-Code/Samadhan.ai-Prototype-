import React from 'react';
import { TOP_VOLUNTEERS } from '../../data/mockData';
import { ThemeMode } from '../../types';

interface TopVolunteersWidgetProps {
  theme: ThemeMode;
}

export const TopVolunteersWidget: React.FC<TopVolunteersWidgetProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  const cardBgClass = isDark
    ? 'glass-widget-dark'
    : isEmerald
    ? 'glass-widget-emerald'
    : 'glass-widget-light';

  return (
    <div className={`${cardBgClass} p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[390px] box-border`}>
      {/* Header with clean separation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-base font-black tracking-tight ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              Top Volunteers
            </h3>
            <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
              Live Karma
            </span>
          </div>
          <p className={`text-xs mt-0.5 truncate ${isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}`}>
            Citizens leading ground implementation
          </p>
        </div>

        <button className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors flex-shrink-0 ${
          isDark || isEmerald
            ? 'border-white/10 hover:bg-white/[0.08] text-slate-300'
            : 'border-slate-200 hover:bg-slate-100 text-slate-700'
        }`}>
          View All
        </button>
      </div>

      {/* Volunteers list with spacious, un-crowded alignment */}
      <div className="space-y-2.5 my-auto">
        {TOP_VOLUNTEERS.map((vol) => (
          <div
            key={vol.id}
            className={`p-3 rounded-2xl flex items-center justify-between gap-3 transition-all duration-200 ${
              isDark || isEmerald
                ? 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05]'
                : 'bg-slate-50 hover:bg-slate-100/80 border border-slate-100'
            }`}
          >
            {/* Left Zone: Rank, Avatar, Identity */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {/* Rank Badge */}
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] flex-shrink-0 ${
                vol.rank === 1
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : vol.rank === 2
                  ? 'bg-slate-300/20 text-slate-200 border border-slate-300/30'
                  : vol.rank === 3
                  ? 'bg-amber-700/20 text-amber-500 border border-amber-600/30'
                  : 'text-slate-500 bg-white/[0.04]'
              }`}>
                #{vol.rank}
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 relative shadow-sm flex-shrink-0">
                <img src={vol.avatar} alt={vol.name} className="w-full h-full object-cover" />
              </div>

              {/* Name & Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs sm:text-sm font-bold truncate ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
                    {vol.name}
                  </span>
                  <span className="text-[9px] font-bold text-neon-purple px-1.5 py-0.5 rounded bg-neon-purple/10 whitespace-nowrap flex-shrink-0">
                    {vol.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate mt-0.5">
                  <span className="truncate">{vol.role}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold flex-shrink-0">{vol.solvedCount} solved</span>
                </div>
              </div>
            </div>

            {/* Right Zone: XP points and Progress Bar */}
            <div className="text-right flex-shrink-0">
              <div className={`text-xs sm:text-sm font-black ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
                {vol.xp.toLocaleString()} <span className="text-[10px] text-neon-fuchsia font-bold">XP</span>
              </div>
              <div className="w-16 sm:w-20 bg-slate-700/40 rounded-full h-1.5 mt-1 overflow-hidden ml-auto">
                <div
                  className="bg-gradient-to-r from-neon-purple to-neon-fuchsia h-full rounded-full"
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
