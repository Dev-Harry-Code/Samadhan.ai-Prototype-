import React from 'react';
import { ScreenId } from '../../types';

interface UserProfileScreenProps {
  setScreen: (screen: ScreenId) => void;
  isMobileFrame?: boolean;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ setScreen, isMobileFrame = false }) => {
  return (
    <div className="p-3.5 sm:p-6 pb-40 max-w-3xl mx-auto space-y-6 bg-slate-50">
      
      {/* Profile Card Banner */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        {/* Top Cover Header */}
        <div className="h-28 sm:h-36 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 relative">
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
        
        {/* Profile Content Body */}
        <div className="px-5 pb-6 pt-0 relative">
          
          {/* Avatar & Action Button Row */}
          <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md relative bg-slate-100 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Energetic Warm Orange CTA */}
            <button
              onClick={() => setScreen('report')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 mb-1"
            >
              <span>+ New Report</span>
            </button>
          </div>

          {/* User Name & Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Aarav Mehta
              </h2>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <span>🏆</span> Civic Champion
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Verified Community Solver • Ranchi Municipal District
            </p>
          </div>

          {/* XP Level Progress Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-slate-800">Level 7 Contributor</span>
              <span className="text-teal-700 font-mono">4,850 / 5,000 XP</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: '92%' }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>Rank #1 in Ranchi Ward 14</span>
              <span>150 XP to Level 8</span>
            </div>
          </div>

        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center gap-2 px-1">
        <span className="w-2 h-2 rounded-full bg-teal-600"></span>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
          Personal Civic Impact
        </h3>
      </div>
      
      {/* Stats Grid */}
      <div className={`grid gap-3.5 ${isMobileFrame ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">38</div>
            <div className="text-xs text-slate-500 font-semibold">Reported Issues</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">32</div>
            <div className="text-xs text-slate-500 font-semibold">Fixed & Verified</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">1,240</div>
            <div className="text-xs text-slate-500 font-semibold">Karma Upvotes</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">6</div>
            <div className="text-xs text-slate-500 font-semibold">Civic Badges</div>
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3.5">
          Earned Achievements
        </h4>
        
        <div className={`gap-3 ${isMobileFrame ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-3'}`}>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl flex-shrink-0">
              💧
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Water Guardian</div>
              <div className="text-[11px] text-slate-500 mt-0.5">10+ water supply issues resolved</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0">
              ⚡
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">First Responder</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Average resolution response in 48h</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-xl flex-shrink-0">
              🤝
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Community Pillar</div>
              <div className="text-[11px] text-slate-500 mt-0.5">1,000+ peer upvotes received</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button className="flex-1 py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold border border-slate-200 shadow-xs text-xs transition-colors text-center">
          Account & Notifications
        </button>
        <button
          onClick={() => setScreen('auth')}
          className="py-3.5 px-5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl font-bold text-xs transition-colors text-center flex-shrink-0"
        >
          Sign Out
        </button>
      </div>

    </div>
  );
};
