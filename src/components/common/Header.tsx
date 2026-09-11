import React from 'react';
import { ScreenId, ThemeMode } from '../../types';

interface HeaderProps {
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  setScreen,
  isMobileFrame,
  setIsMobileFrame,
  theme,
  setTheme,
}) => {
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? 'bg-[#090c12]/80 border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : isEmerald
          ? 'bg-[#041a17]/80 border-emerald-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-white/80 border-slate-200/80 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand Identity */}
        <div
          onClick={() => setScreen('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-neon-purple via-neon-violet to-neon-cyan p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-neon-fuchsia">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <div>
            <span className={`text-lg font-black tracking-tight ${isDark || isEmerald ? 'text-white' : 'text-slate-950'}`}>
              Samadhan<span className="text-neon-purple">.AI</span>
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setScreen('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'home'
                ? 'bg-white/[0.1] text-white shadow-sm'
                : isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setScreen('issues_feed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              ['issues_feed', 'issue_details'].includes(currentScreen)
                ? 'bg-white/[0.1] text-white shadow-sm'
                : isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Issues Feed
          </button>
          <button
            onClick={() => setScreen('report')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'report'
                ? 'bg-white/[0.1] text-white shadow-sm'
                : isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Report Problem
          </button>
          <button
            onClick={() => setScreen('profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'profile'
                ? 'bg-white/[0.1] text-white shadow-sm'
                : isDark || isEmerald ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Profile & XP
          </button>
          <button
            onClick={() => setScreen('auth')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'auth'
                ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-sm'
                : isDark || isEmerald ? 'text-neon-fuchsia hover:text-white' : 'text-neon-purple hover:text-slate-950'
            }`}
          >
            Sign In / Register
          </button>
        </nav>

        {/* Right Action Controls: Device Mode Toggle & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Prominent Desktop vs Mobile Viewport Switcher */}
          <div className={`flex items-center p-1 rounded-2xl border ${
            isDark
              ? 'bg-white/[0.05] border-white/10'
              : isEmerald
              ? 'bg-emerald-950/60 border-emerald-500/20'
              : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setIsMobileFrame(false)}
              title="Switch to Full Desktop SaaS Dashboard view"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                !isMobileFrame
                  ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setIsMobileFrame(true)}
              title="Switch to Mobile Mockup Frame view"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                isMobileFrame
                  ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Theme Switcher: Dark / Light / Emerald */}
          <div className={`flex items-center p-1 rounded-2xl border ${
            isDark
              ? 'bg-white/[0.05] border-white/10'
              : isEmerald
              ? 'bg-emerald-950/60 border-emerald-500/20'
              : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setTheme('dark')}
              title="Neon Dark Mode (Finfoco style)"
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all ${
                theme === 'dark'
                  ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌙
            </button>
            <button
              onClick={() => setTheme('light')}
              title="Clean Light Mode"
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ☀️
            </button>
            <button
              onClick={() => setTheme('emerald')}
              title="Cyber Emerald Theme"
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all ${
                theme === 'emerald'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌲
            </button>
          </div>

          {/* Notification Icon */}
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center relative cursor-pointer border ${
            isDark || isEmerald
              ? 'bg-white/[0.06] border-white/10 text-slate-300 hover:bg-white/[0.1]'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-neon-fuchsia rounded-full shadow-[0_0_6px_rgba(217,70,239,0.8)]"></span>
          </div>

          {/* User Profile Avatar */}
          <div
            onClick={() => setScreen('profile')}
            className="w-8 h-8 rounded-xl overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-105 transition-transform"
          >
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" alt="Avatar" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </header>
  );
};
