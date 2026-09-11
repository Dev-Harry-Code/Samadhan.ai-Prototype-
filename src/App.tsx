import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenId, Issue, Role } from './types';
import { PRIMARY_ISSUE, NEARBY_ISSUES } from './data/mockData';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';

import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ReportIssueScreen } from './components/screens/ReportIssueScreen';
import { AIAnalysisScreen } from './components/screens/AIAnalysisScreen';
import { AIConfirmationScreen } from './components/screens/AIConfirmationScreen';
import { IssuesFeedScreen } from './components/screens/IssuesFeedScreen';
import { IssueDetailsScreen } from './components/screens/IssueDetailsScreen';
import { UserProfileScreen } from './components/screens/UserProfileScreen';
import { LanguageSelectorModal } from './components/common/LanguageSelectorModal';

export const App: React.FC = () => {
  const [currentScreen, setScreen] = useState<ScreenId>('auth');
  const [previousScreen, setPreviousScreen] = useState<ScreenId | null>(null);
  const [feedIssues, setFeedIssues] = useState<Issue[]>([PRIMARY_ISSUE, ...NEARBY_ISSUES]);
  const [selectedIssue, setSelectedIssue] = useState<Issue>(PRIMARY_ISSUE);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<Role>('citizen');

  // Navigation controller with previous screen tracker
  const navigateTo = (newScreen: ScreenId) => {
    setPreviousScreen(currentScreen);
    setScreen(newScreen);
  };

  // Prepend newly confirmed report to public feed
  const handleAddNewReport = () => {
    const newIssue: Issue = {
      id: `LOK-9428`,
      title: '4-inch Fractured PVC Community Drinking Water Pipe',
      category: 'Water Resources',
      description: 'The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water.',
      location: 'Village X, Ranchi, Jharkhand (Ward 14)',
      distance: '0.1 km away',
      peopleAffected: 50,
      severity: 'High',
      status: 'Under review',
      reportedBy: 'You (Citizen Reporter)',
      reportedDaysAgo: 0,
      imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      upvotes: 1,
      commentsCount: 0,
      updatesCount: 1,
      assignedUniversity: 'BIT Mesra Hydrology',
      matchScore: 97,
    };

    setFeedIssues(prev => [newIssue, ...prev.filter(i => i.id !== newIssue.id)]);
    setSelectedIssue(newIssue);
  };

  // Dynamic transition parameters based on UX requirements
  const getVariants = () => {
    // 1. Splash -> Home: Horizontal slide-left page transition (x: '100%' to x: 0)
    if (previousScreen === 'auth' && currentScreen === 'home') {
      return {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
        transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
      };
    }

    // 2. Home -> Report Issue: Modal slide-up transition from bottom (y: '100%')
    if (currentScreen === 'report') {
      return {
        initial: { y: '100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
      };
    }

    // 3. Report Issue -> AI Analysis: Fade transition to Screen 4
    if (currentScreen === 'ai_analysis') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4, ease: 'easeInOut' }
      };
    }

    // 4. AI Analysis -> AI Confirmation: Smooth cross-fade animation
    if (currentScreen === 'ai_confirmation') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4, ease: 'easeInOut' }
      };
    }

    // 5. AI Confirmation -> Public Feed: Smooth enter with new report prepended
    if (currentScreen === 'issues_feed') {
      return {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
        transition: { duration: 0.35, ease: 'easeOut' }
      };
    }

    // Default cross-fade
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3, ease: 'easeInOut' }
    };
  };

  const variants = getVariants();

  // Screen Dispatcher
  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return (
          <AuthScreen
            setScreen={navigateTo}
            onLogin={(role) => {
              setIsAuthenticated(true);
              setUserRole(role);
              navigateTo('home');
            }}
          />
        );
      case 'home':
        return (
          <HomeScreen
            setScreen={navigateTo}
            setSelectedIssue={setSelectedIssue}
            isMobileFrame={isMobileFrame}
          />
        );
      case 'report':
        return <ReportIssueScreen setScreen={navigateTo} />;
      case 'ai_analysis':
        return <AIAnalysisScreen setScreen={navigateTo} />;
      case 'ai_confirmation':
        return (
          <AIConfirmationScreen
            setScreen={navigateTo}
            onSubmitReport={handleAddNewReport}
          />
        );
      case 'issues_feed':
        return (
          <IssuesFeedScreen
            setScreen={navigateTo}
            setSelectedIssue={setSelectedIssue}
            isMobileFrame={isMobileFrame}
            feedIssues={feedIssues}
          />
        );
      case 'issue_details':
        return (
          <IssueDetailsScreen
            setScreen={navigateTo}
            selectedIssue={selectedIssue}
          />
        );
      case 'profile':
        return <UserProfileScreen setScreen={navigateTo} isMobileFrame={isMobileFrame} />;
      default:
        return (
          <HomeScreen
            setScreen={navigateTo}
            setSelectedIssue={setSelectedIssue}
            isMobileFrame={isMobileFrame}
          />
        );
    }
  };

  // Screens where the persistent bottom navigation bar is active
  const isBottomNavVisible = ['home', 'report', 'ai_confirmation', 'issues_feed', 'issue_details', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-300 relative selection:bg-teal-100 selection:text-teal-900">
      {/* Language Selector Modal */}
      <LanguageSelectorModal />

      {/* Top Application Shell Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={navigateTo}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex justify-center items-start p-2 sm:p-4 lg:p-6 w-full">
        <div
          className={`w-full transition-all duration-300 flex flex-col ${
            isMobileFrame
              ? 'max-w-[430px] rounded-[2.5rem] shadow-xl border border-slate-200 bg-white min-h-[760px] overflow-hidden relative my-2'
              : 'max-w-7xl rounded-3xl min-h-[780px] border border-slate-200 bg-white shadow-xs overflow-hidden'
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

          {/* Screen Content Wrapped with Framer Motion AnimatePresence mode='wait' */}
          <div className="flex-1 overflow-y-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={variants.transition}
                className="w-full h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Global Persistent Bottom Navigation across Screens 2, 3, 5, and 6 */}
          {isBottomNavVisible && (
            <div className={isMobileFrame ? 'w-full' : 'w-full border-t border-slate-100 bg-white'}>
              <BottomNav
                currentScreen={currentScreen}
                setScreen={navigateTo}
              />
            </div>
          )}
        </div>
      </main>

      {/* Sub-footer with prompt view controls & branding */}
      <footer className="py-4 text-center text-xs border-t transition-colors duration-300 bg-white border-slate-200 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <strong className="text-slate-900 font-bold">
              Samadhan<span className="text-teal-600">.AI</span> Connected Prototype
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
