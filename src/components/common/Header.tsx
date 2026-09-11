import React from 'react';
import { ScreenId } from '../../types';

interface HeaderProps {
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  setScreen,
  isMobileFrame,
  setIsMobileFrame,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 border-slate-200/80 backdrop-blur-xl shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand Identity */}
        <div
          onClick={() => setScreen('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-all duration-200 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Samadhan<span className="text-teal-600">.AI</span>
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => setScreen('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'home'
                ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setScreen('issues_feed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              ['issues_feed', 'issue_details'].includes(currentScreen)
                ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Issues Feed
          </button>
          <button
            onClick={() => setScreen('report')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'report'
                ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Report Problem
          </button>
          <button
            onClick={() => setScreen('profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'profile'
                ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Profile & XP
          </button>
          <button
            onClick={() => setScreen('auth')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'auth'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
            }`}
          >
            Sign In / Register
          </button>
        </nav>

        {/* Right Action Controls: Device Viewport Switcher & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Desktop vs Mobile Viewport Switcher */}
          <div className="flex items-center p-1 rounded-2xl border bg-slate-100 border-slate-200">
            <button
              onClick={() => setIsMobileFrame(false)}
              title="Switch to Full Desktop SaaS Dashboard view"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                !isMobileFrame
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Notification Icon with Warm Orange Badge */}
          <div className="w-8 h-8 rounded-xl flex items-center justify-center relative cursor-pointer border bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
          </div>

          {/* User Profile Avatar */}
          <div
            onClick={() => setScreen('profile')}
            className="w-8 h-8 rounded-xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer hover:scale-105 transition-transform"
          >
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" alt="Avatar" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </header>
  );
};
