import React from 'react';
import { ScreenId, ThemeMode } from '../../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
  theme?: ThemeMode;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setScreen, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  const getTabClass = (screens: ScreenId[]) => {
    const isActive = screens.includes(currentScreen);
    return `flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all ${
      isActive
        ? !isDark && !isEmerald
          ? 'text-teal-600 font-bold'
          : 'text-neon-fuchsia font-bold'
        : isDark || isEmerald
        ? 'text-slate-400 hover:text-slate-200'
        : 'text-slate-500 hover:text-slate-900'
    }`;
  };

  return (
    <div
      className={`h-16 border-t flex items-center justify-between px-2 pb-1 relative z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? 'bg-[#090c12]/90 border-white/[0.08]'
          : isEmerald
          ? 'bg-[#041a17]/90 border-emerald-500/20'
          : 'bg-white/95 border-slate-200 shadow-lg'
      }`}
    >
      {/* 2 left items */}
      <div className="flex flex-1 justify-around">
        <button onClick={() => setScreen('home')} className={getTabClass(['home'])}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={currentScreen === 'home' ? (!isDark && !isEmerald ? 'stroke-teal-600' : 'stroke-neon-fuchsia drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]') : ''}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button onClick={() => setScreen('issues_feed')} className={getTabClass(['issues_feed', 'issue_details'])}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={['issues_feed', 'issue_details'].includes(currentScreen) ? (!isDark && !isEmerald ? 'stroke-teal-600' : 'stroke-neon-fuchsia drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]') : ''}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span className="text-[10px] mt-0.5">Feed</span>
        </button>
      </div>

      {/* Floating Action Button for Report (Centered) */}
      <div className="relative flex-shrink-0 w-16 h-16 flex justify-center">
        <button 
          onClick={() => setScreen('report')} 
          className={`absolute -top-5 w-14 h-14 rounded-2xl flex items-center justify-center text-white hover:scale-105 transition-transform fab-pulse z-10 ${
            !isDark && !isEmerald
              ? 'bg-orange-500 hover:bg-orange-600 shadow-[0_4px_20px_rgba(249,115,22,0.45)]'
              : 'bg-gradient-to-tr from-neon-purple via-neon-violet to-neon-fuchsia shadow-neon-purple'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      {/* 2 right items */}
      <div className="flex flex-1 justify-around">
        <button onClick={() => setScreen('issues_feed')} className="flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all text-slate-500 hover:text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span className="text-[10px] mt-0.5">Chat</span>
        </button>
        
        <button onClick={() => setScreen('profile')} className={getTabClass(['profile'])}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={currentScreen === 'profile' ? (!isDark && !isEmerald ? 'stroke-teal-600' : 'stroke-neon-fuchsia drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]') : ''}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="text-[10px] mt-0.5">Profile</span>
        </button>
      </div>

    </div>
  );
};
