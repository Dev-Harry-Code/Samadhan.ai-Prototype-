import React, { useState } from 'react';
import { ScreenId, Issue, Role } from './types';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<Role>('citizen');

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
            isMobileFrame={isMobileFrame}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-300 relative selection:bg-teal-100 selection:text-teal-900">
      {/* Top Application Shell Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setScreen}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex justify-center items-start p-2 sm:p-4 lg:p-6 w-full">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-[430px] rounded-[2.5rem] shadow-xl border border-slate-200 bg-white min-h-[760px] flex flex-col overflow-hidden relative my-2'
              : 'max-w-7xl rounded-3xl min-h-[780px] p-2 sm:p-6 border border-slate-200 bg-white shadow-xs'
          }`}
        >
          {/* Mobile frame speaker/status bar indicator in mobile frame mode */}
          {isMobileFrame && (
            <div className="w-full px-6 py-2 border-b flex items-center justify-between text-[11px] font-medium select-none z-20 bg-slate-50 border-slate-200 text-slate-700">
              <span className="font-semibold text-slate-900">9:41</span>
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
            />
          )}
        </div>
      </main>

      {/* Sub-footer with prompt view controls & branding */}
      <footer className="py-4 text-center text-xs border-t transition-colors duration-300 bg-white border-slate-200 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <strong className="text-slate-900 font-bold">
              Samadhan.AI Bento Dashboard
            </strong>
            <span>•</span>
            <span>Civic Problem Crowdsourcing Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Active Screen: <strong className="text-teal-700 uppercase font-bold">{currentScreen}</strong></span>
            <span>•</span>
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className="text-teal-600 hover:text-teal-700 hover:underline font-bold"
            >
              Toggle to {isMobileFrame ? 'Desktop Wide Screen' : 'Mobile Phone Frame'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
