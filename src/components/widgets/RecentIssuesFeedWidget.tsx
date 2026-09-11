import React, { useState } from 'react';
import { NEARBY_ISSUES, PRIMARY_ISSUE } from '../../data/mockData';
import { Issue, ScreenId, ThemeMode } from '../../types';

interface RecentIssuesFeedWidgetProps {
  theme: ThemeMode;
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
}

export const RecentIssuesFeedWidget: React.FC<RecentIssuesFeedWidgetProps> = ({
  theme,
  setScreen,
  setSelectedIssue,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  const cardBgClass = isDark
    ? 'glass-widget-dark'
    : isEmerald
    ? 'glass-widget-emerald'
    : 'glass-widget-light';

  const issues = [PRIMARY_ISSUE, ...NEARBY_ISSUES.slice(0, 2)];

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className={`${cardBgClass} p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[390px] box-border`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-base font-black tracking-tight ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              Recent Issues
            </h3>
            <span className="text-[10px] bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
              Live Feed
            </span>
          </div>
          <p className={`text-xs mt-0.5 truncate ${isDark || isEmerald ? 'text-slate-400' : 'text-slate-500'}`}>
            Click any issue to inspect details & comment
          </p>
        </div>

        <button
          onClick={() => setScreen('issues_feed')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1 flex-shrink-0 ${
            isDark || isEmerald
              ? 'border-white/10 hover:bg-white/[0.08] text-slate-300'
              : 'border-slate-200 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <span>All Issues</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>

      {/* Issues Mini List with spacious layout */}
      <div className="space-y-2.5 my-auto">
        {issues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => {
              setSelectedIssue(issue);
              setScreen('issue_details');
            }}
            className={`p-3 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-200 group ${
              isDark || isEmerald
                ? 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-neon-purple/40'
                : 'bg-slate-50 hover:bg-slate-100/80 border border-slate-100'
            }`}
          >
            {/* Thumbnail with reliable error fallback */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-slate-800 border border-white/10 flex items-center justify-center">
              {!imageErrors[issue.id] ? (
                <img
                  src={issue.imageUrl}
                  alt={issue.title}
                  onError={() => handleImageError(issue.id)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-brand-900 to-brand-600 text-neon-cyan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-neon-purple px-1.5 py-0.5 rounded bg-neon-purple/10">
                  {issue.category}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                  issue.status === 'Resolved'
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : issue.status === 'In progress'
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-cyan-400 bg-cyan-500/10'
                }`}>
                  {issue.status}
                </span>
              </div>
              <h4 className={`text-xs sm:text-sm font-bold truncate group-hover:text-neon-fuchsia transition-colors ${
                isDark || isEmerald ? 'text-white' : 'text-slate-900'
              }`}>
                {issue.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {issue.location} • {issue.distance || '1.4 km'}
              </p>
            </div>

            {/* Upvotes Pill */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-300 group-hover:text-neon-cyan group-hover:border-neon-cyan/30 transition-all flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              <span>{issue.upvotes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
