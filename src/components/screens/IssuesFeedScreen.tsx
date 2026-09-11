import React, { useState } from 'react';
import { ScreenId, Issue } from '../../types';
import { NEARBY_ISSUES, PRIMARY_ISSUE } from '../../data/mockData';
import { ThumbsUp, MapPin, Share2, MessageSquare, AlertTriangle, Clock } from 'lucide-react';

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
    <div className="p-3.5 sm:p-6 pb-36 max-w-7xl mx-auto bg-slate-50">
      {/* Header & Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Civic Issues Feed
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-teal-50 text-teal-700 border border-teal-200">
              {filteredIssues.length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real community challenges submitted with GPS coordinates and photographic evidence
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
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
            className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all"
          >
            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
              <img
                src={issue.imageUrl}
                alt={issue.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Urgency Pill in Energetic Warm Orange */}
              <div className="absolute top-3 left-3 bg-orange-500 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
                High Urgency
              </div>

              {/* Status pill on top right */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-800 shadow-xs">
                {issue.status}
              </div>

              {/* Distance pill */}
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{issue.distance || '1.2 km away'}</span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider mb-1.5">
                  {issue.category}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors">
                  {issue.title}
                </h3>
                <p className="text-slate-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                  {issue.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-600 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-teal-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-bold">{issue.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MessageSquare className="w-4 h-4" />
                    <span>{issue.commentsCount}</span>
                  </div>
                  <button 
                    title="Share Issue"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-slate-400 hover:text-teal-600 transition-colors p-0.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{issue.reportedDaysAgo}d ago</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
