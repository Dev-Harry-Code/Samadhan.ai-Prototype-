import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenId, Issue } from '../../types';
import { NEARBY_ISSUES, PRIMARY_ISSUE } from '../../data/mockData';
import { ThumbsUp, MapPin, Share2, MessageSquare, AlertTriangle, Clock } from 'lucide-react';

interface IssuesFeedScreenProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
  isMobileFrame?: boolean;
  feedIssues?: Issue[];
}

export const IssuesFeedScreen: React.FC<IssuesFeedScreenProps> = ({ 
  setScreen, 
  setSelectedIssue, 
  isMobileFrame = false,
  feedIssues
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const allIssues = feedIssues && feedIssues.length > 0 ? feedIssues : [PRIMARY_ISSUE, ...NEARBY_ISSUES];

  // Upvote state management for live dynamic number layout transitions
  const [upvotesState, setUpvotesState] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    allIssues.forEach((issue) => {
      map[issue.id] = issue.upvotes;
    });
    return map;
  });

  const [userUpvoted, setUserUpvoted] = useState<Record<string, boolean>>({});

  const handleToggleUpvote = (e: React.MouseEvent, issueId: string) => {
    e.stopPropagation();
    const isCurrentlyUpvoted = !!userUpvoted[issueId];

    setUserUpvoted((prev) => ({
      ...prev,
      [issueId]: !isCurrentlyUpvoted,
    }));

    setUpvotesState((prev) => ({
      ...prev,
      [issueId]: (prev[issueId] ?? 0) + (isCurrentlyUpvoted ? -1 : 1),
    }));
  };

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
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid of Issues (Staggered Fade-and-Slide-Up Animations) */}
      <div className={`grid gap-5 ${isMobileFrame ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredIssues.map((issue, index) => {
          const currentUpvotes = upvotesState[issue.id] ?? issue.upvotes;
          const isUpvoted = !!userUpvoted[issue.id];

          return (
            <motion.div 
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.12)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedIssue(issue); setScreen('issue_details'); }}
              className="bg-white border border-slate-200 shadow-sm hover:border-slate-300 rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
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
                  <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                    {/* Interactive Upvote Counter with AnimatePresence */}
                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleToggleUpvote(e, issue.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all border ${
                        isUpvoted
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border-slate-200'
                      }`}
                      title={isUpvoted ? 'Remove upvote' : 'Upvote this issue'}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-white stroke-white' : ''}`} />
                      <div className="relative h-4 overflow-hidden min-w-[20px] text-center flex items-center justify-center font-bold font-mono text-xs">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={currentUpvotes}
                            initial={{ y: isUpvoted ? 10 : -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: isUpvoted ? -10 : 10, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="block"
                          >
                            {currentUpvotes}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </motion.button>

                    <div className="flex items-center gap-1 text-slate-500 px-2 py-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{issue.commentsCount}</span>
                    </div>

                    <motion.button 
                      title="Share Issue"
                      whileHover={{ scale: 1.15, color: '#0D9488' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="text-slate-400 hover:text-teal-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{issue.reportedDaysAgo}d ago</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
