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
    <div className="pb-24 max-w-4xl mx-auto bg-slate-50">
      {/* Hero Image & Back Button */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md mb-6 bg-slate-100">
        <img src={selectedIssue.imageUrl} alt={selectedIssue.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => setScreen('issues_feed')} 
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-full text-slate-800 flex items-center justify-center hover:bg-white transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        {/* Floating details over image */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex flex-wrap gap-2 mb-2.5">
            <span className="bg-teal-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs">
              {selectedIssue.category}
            </span>
            <span className="bg-orange-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs">
              High Urgency
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/30 text-white">
              {selectedIssue.distance || '2.4 km away'}
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black leading-tight drop-shadow-md">
            {selectedIssue.title}
          </h1>
        </div>
      </div>

      <div className="space-y-6 px-2">
        {/* Metadata Strip */}
        <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span className="text-slate-800 font-medium">{selectedIssue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Reported {selectedIssue.reportedDaysAgo} days ago by <strong className="text-slate-900">{selectedIssue.reportedBy}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-700 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
            <span>Affects ~{selectedIssue.peopleAffected} citizens</span>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-3xl">
          <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            Detailed Problem Statement
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            {selectedIssue.description}
          </p>

          {/* Action Bar */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
            <button
              onClick={handleToggleUpvote}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                hasUpvoted
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={hasUpvoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              <span>{hasUpvoted ? 'Upvoted' : 'Upvote Issue'} ({upvoteCount})</span>
            </button>

            <button className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comments / Discussion Widget */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Community Discussion</h3>
              <span className="text-xs bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-semibold border border-teal-200">
                {comments.length}
              </span>
            </div>
            <span className="text-xs text-slate-500">Verifiable Solutions & Updates</span>
          </div>

          {/* Comment Input */}
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-xs">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" alt="Avatar" />
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share a local update, photo or proposal..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
              />
              <button
                onClick={handlePostComment}
                className="px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl flex items-center justify-center transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                  <img src={comment.avatarUrl || 'https://ui-avatars.com/api/?name=User&background=0d9488&color=fff'} alt={comment.authorName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{comment.authorName}</span>
                      <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">{comment.authorRole}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{comment.daysAgo}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{comment.text}</p>
                  {comment.imageUrl && (
                    <img src={comment.imageUrl} alt="attachment" className="mt-2.5 rounded-xl w-full max-h-48 object-cover border border-slate-200" />
                  )}
                  <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-500 font-semibold">
                    <button className="hover:text-teal-700 flex items-center gap-1 transition-colors">
                      ▲ Upvote ({comment.upvotes})
                    </button>
                    <button className="hover:text-slate-900 transition-colors">
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
