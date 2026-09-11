import React, { useState } from 'react';
import { ScreenId, Issue } from '../../types';
import { NEARBY_ISSUES, PRIMARY_ISSUE } from '../../data/mockData';

interface IssuesFeedScreenProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
  isMobileFrame?: boolean;
}

export const IssuesFeedScreen: React.FC<IssuesFeedScreenProps> = ({ setScreen, setSelectedIssue, isMobileFrame = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const allIssues = [PRIMARY_ISSUE, ...NEARBY_ISSUES];

  const categories = ['All', 'Water Resources', 'Sanitation', 'Infrastructure'];

  const filteredIssues = selectedCategory === 'All'
    ? allIssues
    : allIssues.filter(i => i.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(i.category.toLowerCase()));

  return (
    <div className={`p-3.5 sm:p-6 pb-36 max-w-7xl mx-auto`}>
      {/* Header & Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Civic Issues Feed
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-neon-purple/20 text-neon-fuchsia border border-neon-purple/30">
              {filteredIssues.length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real community challenges submitted with GPS coordinates and photographic evidence
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Issues (Responsive: 1 col on mobile, 2 or 3 on desktop) */}
      <div className={`grid gap-5 ${isMobileFrame ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredIssues.map((issue) => (
          <div 
            key={issue.id} 
            onClick={() => { setSelectedIssue(issue); setScreen('issue_details'); }}
            className="glass-widget-dark glass-widget-dark-hover rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={issue.imageUrl}
                alt={issue.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              
              {/* Status pill */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  issue.status === 'Resolved' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                  issue.status === 'In progress' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' :
                  'bg-neon-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                }`}></span>
                {issue.status}
              </div>

              {/* Distance pill */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neon-fuchsia"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{issue.distance || '1.2 km away'}</span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-extrabold text-neon-purple uppercase tracking-wider mb-1.5">
                  {issue.category}
                </div>
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-neon-fuchsia transition-colors">
                  {issue.title}
                </h3>
                <p className="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed">
                  {issue.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
                  <div className="flex items-center gap-1 text-neon-fuchsia">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span>{issue.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span>{issue.commentsCount} comments</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {issue.reportedDaysAgo}d ago
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
