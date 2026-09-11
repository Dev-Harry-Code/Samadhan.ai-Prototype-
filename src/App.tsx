import React, { useState } from 'react';
import { ScreenId, Issue, ThemeMode, Role } from './types';
import { PRIMARY_ISSUE } from './data/mockData';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';

import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { IssuesFeedScreen } from './components/screens/IssuesFeedScreen';
import { IssueDetailsScreen } from './components/screens/IssueDetailsScreen';
import { ReportIssueScreen } from './components/screens/ReportIssueScreen';
import { UserProfileScreen } from './components/screens/UserProfileScreen';

export const App: React.FC = () => {
  const [currentScreen, setScreen] = useState<ScreenId>('auth');
  const [selectedIssue, setSelectedIssue] = useState<Issue>(PRIMARY_ISSUE);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false); // Can toggle between desktop and mobile frame
  const [theme, setTheme] = useState<ThemeMode>('light'); // Default to clean, modern Light Mode
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<Role>('citizen');

  const themeClass = theme === 'dark' ? 'theme-dark' : theme === 'emerald' ? 'theme-emerald' : 'theme-light';

  // Helper to render active screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return (
          <AuthScreen
            setScreen={setScreen}
            onLogin={(role) => {
              setIsAuthenticated(true);
              setUserRole(role);
              setScreen('home');
            }}
          />
        );
      case 'home':
        return (
          <HomeScreen
            setScreen={setScreen}
            setSelectedIssue={setSelectedIssue}
            theme={theme}
            isMobileFrame={isMobileFrame}
          />
        );
      case 'issues_feed':
        return (
          <IssuesFeedScreen
            setScreen={setScreen}
            setSelectedIssue={setSelectedIssue}
            isMobileFrame={isMobileFrame}
          />
        );
      case 'issue_details':
        return (
          <IssueDetailsScreen
            setScreen={setScreen}
            selectedIssue={selectedIssue}
          />
        );
      case 'report':
        return <ReportIssueScreen setScreen={setScreen} />;
      case 'profile':
        return <UserProfileScreen setScreen={setScreen} isMobileFrame={isMobileFrame} />;
      default:
        return (
          <HomeScreen
            setScreen={setScreen}
            setSelectedIssue={setSelectedIssue}
            theme={theme}
            isMobileFrame={isMobileFrame}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${themeClass} flex flex-col font-sans transition-colors duration-300 relative`}>
      {/* Top Application Shell Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setScreen}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex justify-center items-start p-2 sm:p-4 lg:p-6 w-full">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? `max-w-[430px] rounded-[2.5rem] shadow-2xl border min-h-[760px] flex flex-col overflow-hidden relative my-2 ${
                  theme === 'dark'
                    ? 'bg-[#0b0e14] border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
                    : theme === 'emerald'
                    ? 'bg-[#031514] border-emerald-500/30'
                    : 'bg-white border-slate-200 shadow-xl'
                }`
              : `max-w-7xl rounded-3xl min-h-[780px] p-2 sm:p-6 border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-white/[0.06] bg-[#080a0f]/60 backdrop-blur-xl'
                    : theme === 'emerald'
                    ? 'border-emerald-500/20 bg-[#031514]/70 backdrop-blur-xl'
                    : 'border-slate-200 bg-white shadow-sm'
                }`
          }`}
        >
          {/* Mobile frame speaker/status bar indicator in mobile frame mode */}
          {isMobileFrame && (
            <div className={`w-full px-6 py-2 border-b flex items-center justify-between text-[11px] font-medium select-none z-20 ${
              theme === 'dark' || theme === 'emerald'
                ? 'bg-black/40 border-white/[0.08] text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className={`font-semibold ${theme === 'dark' || theme === 'emerald' ? 'text-white' : 'text-slate-900'}`}>9:41</span>
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto -mt-0.5"></div>
              <div className="flex items-center gap-1.5 text-xs">
                <span>5G</span>
                <span className="w-3.5 h-2 border border-slate-500 rounded-xs inline-block relative before:content-[''] before:absolute before:inset-0.5 before:bg-slate-700"></span>
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto relative">
            {renderScreen()}
          </div>

          {/* Bottom Navigation for mobile-view experience */}
          {isMobileFrame && (
            <BottomNav
              currentScreen={currentScreen}
              setScreen={setScreen}
              theme={theme}
            />
          )}
        </div>
      </main>

      {/* Sub-footer with prompt view controls & branding */}
      <footer className={`py-4 text-center text-xs border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#06080d] border-white/[0.06] text-slate-500'
          : theme === 'emerald'
          ? 'bg-[#02100e] border-emerald-500/20 text-emerald-400/60'
          : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-fuchsia animate-pulse"></span>
            <strong className={theme === 'dark' || theme === 'emerald' ? 'text-slate-200 font-bold' : 'text-slate-900 font-bold'}>
              Samadhan.AI Bento Dashboard
            </strong>
            <span>•</span>
            <span>Inspired by Finfoco / Boltshift Glassmorphism</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Active Screen: <strong className="text-neon-purple uppercase">{currentScreen}</strong></span>
            <span>•</span>
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className="text-neon-fuchsia hover:underline font-bold"
            >
              Toggle to {isMobileFrame ? 'Desktop Wide Screen' : 'Mobile Phone Frame'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
