import React, { useState } from 'react';
import { ScreenId, Issue, DiscussionComment } from '../../types';
import { INITIAL_COMMENTS } from '../../data/mockData';

interface IssueDetailsScreenProps {
  setScreen: (screen: ScreenId) => void;
  selectedIssue: Issue;
}

export const IssueDetailsScreen: React.FC<IssueDetailsScreenProps> = ({ setScreen, selectedIssue }) => {
  const [comments, setComments] = useState<DiscussionComment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(selectedIssue.upvotes);

  const handleToggleUpvote = () => {
    if (hasUpvoted) {
      setUpvoteCount(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvoteCount(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment: DiscussionComment = {
      id: `c-${Date.now()}`,
      authorName: 'Aarav Mehta',
      authorRole: 'Verified Citizen',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      daysAgo: 'Just now',
      text: newComment,
      upvotes: 0,
      repliesCount: 0
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="pb-24 max-w-4xl mx-auto">
      {/* Hero Image & Back Button */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl mb-6">
        <img src={selectedIssue.imageUrl} alt={selectedIssue.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/40 to-transparent"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => setScreen('issues_feed')} 
          className="absolute top-4 left-4 w-10 h-10 bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-full text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        {/* Floating details over image */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex flex-wrap gap-2 mb-2.5">
            <span className="bg-neon-purple/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-neon-purple">
              {selectedIssue.category}
            </span>
            <span className="bg-emerald-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
              {selectedIssue.status}
            </span>
            <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/20">
              {selectedIssue.distance || '2.4 km away'}
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black leading-tight drop-shadow-lg">
            {selectedIssue.title}
          </h1>
        </div>
      </div>

      <div className="space-y-6 px-2">
        {/* Metadata Strip */}
        <div className="glass-widget-dark p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-cyan"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>{selectedIssue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-fuchsia"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Reported {selectedIssue.reportedDaysAgo} days ago by <strong className="text-white">{selectedIssue.reportedBy}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>Affects ~{selectedIssue.peopleAffected} citizens</span>
          </div>
        </div>

        {/* Description Card */}
        <div className="glass-widget-dark p-6 rounded-3xl">
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-purple"></span>
            Detailed Problem Statement
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {selectedIssue.description}
          </p>

          {/* Action Bar */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
            <button
              onClick={handleToggleUpvote}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                hasUpvoted
                  ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-neon-purple scale-[1.02]'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={hasUpvoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              <span>{hasUpvoted ? 'Upvoted' : 'Upvote Issue'} ({upvoteCount})</span>
            </button>

            <button className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 flex items-center justify-center gap-2 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comments / Discussion Widget */}
        <div className="glass-widget-dark p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">Community Discussion</h3>
              <span className="text-xs bg-white/[0.08] text-slate-300 px-2.5 py-0.5 rounded-full font-semibold border border-white/10">
                {comments.length}
              </span>
            </div>
            <span className="text-xs text-slate-400">Verifiable Solutions & Updates</span>
          </div>

          {/* Comment Input */}
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 shadow-sm">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share a local update, photo or proposal..."
                className="flex-1 bg-white/[0.05] border border-white/15 rounded-2xl px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
              />
              <button
                onClick={handlePostComment}
                className="px-4 bg-gradient-to-r from-neon-purple to-neon-fuchsia hover:opacity-95 text-white font-bold rounded-2xl flex items-center justify-center transition-all shadow-neon-purple"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex gap-3.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={comment.avatarUrl || 'https://ui-avatars.com/api/?name=User&background=a855f7&color=fff'} alt={comment.authorName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{comment.authorName}</span>
                      <span className="text-[11px] text-neon-purple font-medium">{comment.authorRole}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{comment.daysAgo}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{comment.text}</p>
                  {comment.imageUrl && (
                    <img src={comment.imageUrl} alt="attachment" className="mt-2.5 rounded-xl w-full max-h-48 object-cover border border-white/10" />
                  )}
                  <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-400 font-semibold">
                    <button className="hover:text-neon-fuchsia flex items-center gap-1 transition-colors">
                      ▲ Upvote ({comment.upvotes})
                    </button>
                    <button className="hover:text-white transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
