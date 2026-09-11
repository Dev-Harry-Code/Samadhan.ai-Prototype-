import React, { useState } from 'react';
import { ScreenId, Issue, DiscussionComment } from '../../types';
import { INITIAL_COMMENTS } from '../../data/mockData';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  ThumbsUp, 
  Share2, 
  MessageSquare, 
  Send, 
  ArrowBigUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

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
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Floating details over image */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex flex-wrap gap-2 mb-2.5">
            <span className="bg-teal-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs">
              {selectedIssue.category}
            </span>
            <span className="bg-orange-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              High Urgency
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/30 text-white flex items-center gap-1">
              <MapPin className="w-3 h-3" />
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
            <MapPin className="w-4 h-4 text-teal-600" />
            <span className="text-slate-800 font-medium">{selectedIssue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Reported {selectedIssue.reportedDaysAgo} days ago by <strong className="text-slate-900">{selectedIssue.reportedBy}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-700 font-bold bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
            <Users className="w-3.5 h-3.5 text-orange-600" />
            <span>Affects ~{selectedIssue.peopleAffected} citizens</span>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-3xl">
          <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
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
              <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'fill-current' : ''}`} />
              <span>{hasUpvoted ? 'Upvoted' : 'Upvote Issue'} ({upvoteCount})</span>
            </button>

            <button className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comments / Discussion Widget */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" />
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
                <Send className="w-4 h-4" />
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
                      <ArrowBigUp className="w-4 h-4 text-teal-600" />
                      <span>Upvote ({comment.upvotes})</span>
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
