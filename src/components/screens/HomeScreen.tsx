import React, { useState } from 'react';
import { Issue, ScreenId, ThemeMode } from '../../types';
import { PlatformStatsWidget } from '../widgets/PlatformStatsWidget';
import { CommunityImpactChart } from '../widgets/CommunityImpactChart';
import { CategoryGaugeWidget } from '../widgets/CategoryGaugeWidget';
import { TopVolunteersWidget } from '../widgets/TopVolunteersWidget';
import { RecentIssuesFeedWidget } from '../widgets/RecentIssuesFeedWidget';

interface HomeScreenProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
  theme: ThemeMode;
  isMobileFrame: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setScreen,
  setSelectedIssue,
  theme,
  isMobileFrame,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'volunteers' | 'funds'>('overview');
  const isDark = theme === 'dark';
  const isEmerald = theme === 'emerald';

  return (
    <div className="relative pb-36 pt-2 overflow-hidden min-h-full">
      {/* Ambient Glowing Orbs directly inspired by Finfoco reference */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-neon-purple/25 via-neon-fuchsia/20 to-neon-cyan/15 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute top-96 right-[-10%] w-[380px] h-[380px] bg-neon-purple/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-[-10%] w-[350px] h-[350px] bg-neon-cyan/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
        
        {/* Hero Section (Finfoco inspired Headline & Action buttons) */}
        <div className="text-center pt-4 pb-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r from-neon-purple/15 to-neon-cyan/15 border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-neon-fuchsia animate-pulse"></span>
            <span className={isDark || isEmerald ? 'text-slate-200' : 'text-slate-700'}>
              AI-Powered Civic Problem Solving
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-neon-cyan font-bold">Samadhan 2.0</span>
          </div>

          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isDark || isEmerald ? 'text-white' : 'text-slate-900'
          }`}>
            Crowdsource Real Solutions for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-fuchsia to-neon-cyan">
              Society Challenges
            </span>
          </h1>

          <p className={`mt-3 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
            isDark || isEmerald ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Connecting proactive citizens, verified NGOs, and CSR entities with autonomous AI triage to detect, fund, and solve community issues with verifiable impact.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setScreen('report')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-neon-purple via-neon-violet to-neon-fuchsia hover:opacity-95 text-white font-bold text-sm shadow-neon-purple hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <span>Report Issue with AI</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>

            <button
              onClick={() => setScreen('issues_feed')}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold border transition-all duration-200 flex items-center gap-2 ${
                isDark || isEmerald
                  ? 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-slate-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <span>Explore Public Feed</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
          </div>
        </div>

        {/* Bento Dashboard Container Header with Tabs (matching Boltshift bar in image) */}
        <div className={`p-2 rounded-2xl flex flex-wrap items-center justify-between gap-3 border ${
          isDark
            ? 'bg-slate-900/70 border-white/[0.08] backdrop-blur-xl'
            : isEmerald
            ? 'bg-[#051f1c]/80 border-emerald-500/20 backdrop-blur-xl'
            : 'bg-white/90 border-slate-200 backdrop-blur-md shadow-sm'
        }`}>
          {/* Navigation Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <div className="flex items-center gap-2 px-3 py-1 mr-2 border-r border-white/10">
              <div className="w-5 h-5 rounded-md bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <span className={`text-xs font-bold ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
                Samadhan Hub
              </span>
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setScreen('issues_feed')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-400 hover:text-white transition-all"
            >
              Issues Feed
            </button>
            <button
              onClick={() => setActiveTab('volunteers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'volunteers'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Leaderboard
            </button>
          </div>

          {/* Quick actions on right */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync: 9.41 AM
            </span>
          </div>
        </div>

        {/* Bento Box Grid Item 1: 4 Key Metric Cards */}
        <PlatformStatsWidget theme={theme} isMobileFrame={isMobileFrame} />

        {/* Bento Box Grid Item 2: Community Impact Chart + Category Gauge */}
        <div className={`grid gap-5 ${isMobileFrame ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={isMobileFrame ? '' : 'lg:col-span-2'}>
            <CommunityImpactChart theme={theme} />
          </div>
          <div className={isMobileFrame ? '' : 'lg:col-span-1'}>
            <CategoryGaugeWidget theme={theme} />
          </div>
        </div>

        {/* Bento Box Grid Item 3: Top Volunteers + Recent Issues Mini-Feed */}
        <div className={`grid gap-5 ${isMobileFrame ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          <TopVolunteersWidget theme={theme} />
          <RecentIssuesFeedWidget
            theme={theme}
            setScreen={setScreen}
            setSelectedIssue={setSelectedIssue}
          />
        </div>

        {/* Impact Numbers Ticker Strip (matching bottom of Finfoco image) */}
        <div className={`p-5 rounded-3xl border flex flex-wrap items-center justify-around gap-6 ${
          isDark
            ? 'glass-widget-dark'
            : isEmerald
            ? 'glass-widget-emerald'
            : 'glass-widget-light'
        }`}>
          <div className="text-center">
            <div className={`text-2xl sm:text-3xl font-black ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              24+
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">Municipal Wards</div>
          </div>
          <div className="text-neon-fuchsia opacity-40">✦</div>
          <div className="text-center">
            <div className={`text-2xl sm:text-3xl font-black ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              130K+
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">Active Citizens</div>
          </div>
          <div className="text-neon-fuchsia opacity-40">✦</div>
          <div className="text-center">
            <div className={`text-2xl sm:text-3xl font-black ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              42K+
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">Verified Solved</div>
          </div>
          <div className="text-neon-fuchsia opacity-40">✦</div>
          <div className="text-center">
            <div className={`text-2xl sm:text-3xl font-black ${isDark || isEmerald ? 'text-white' : 'text-slate-900'}`}>
              76+
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">NGOs & CSR Partners</div>
          </div>
        </div>

      </div>
    </div>
  );
};
