import React, { useState } from 'react';
import { Issue, ScreenId } from '../../types';
import { PlatformStatsWidget } from '../widgets/PlatformStatsWidget';
import { CommunityImpactChart } from '../widgets/CommunityImpactChart';
import { CategoryGaugeWidget } from '../widgets/CategoryGaugeWidget';
import { TopVolunteersWidget } from '../widgets/TopVolunteersWidget';
import { RecentIssuesFeedWidget } from '../widgets/RecentIssuesFeedWidget';

interface HomeScreenProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
  isMobileFrame: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setScreen,
  setSelectedIssue,
  isMobileFrame,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'volunteers' | 'funds'>('overview');

  return (
    <div className="relative pb-36 pt-2 overflow-hidden min-h-full bg-slate-50">
      {/* Subtle soft ambient light glow */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-96 right-[-10%] w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="relative z-10 px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
        
        {/* Hero Section */}
        <div className="text-center pt-4 pb-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-teal-50 border border-teal-200 text-teal-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-medium">
              AI-Powered Civic Problem Solving
            </span>
            <span className="text-teal-400">•</span>
            <span className="text-teal-700 font-bold">Samadhan 2.0</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            Crowdsource Real Solutions for <br className="hidden sm:inline" />
            <span className="text-teal-600">
              Society Challenges
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed text-slate-600">
            Connecting proactive citizens, verified NGOs, and CSR entities with autonomous AI triage to detect, fund, and solve community issues with verifiable impact.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setScreen('report')}
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <span>Report Issue with AI</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>

            <button
              onClick={() => setScreen('issues_feed')}
              className="px-5 py-3 rounded-2xl text-sm font-semibold border bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm hover:border-slate-300 transition-all duration-200 flex items-center gap-2"
            >
              <span>Explore Public Feed</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
          </div>
        </div>

        {/* Bento Dashboard Container Header with Tabs */}
        <div className="p-2 rounded-2xl flex flex-wrap items-center justify-between gap-3 border bg-white border-slate-200 shadow-sm">
          {/* Navigation Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <div className="flex items-center gap-2 px-3 py-1 mr-2 border-r border-slate-200">
              <div className="w-5 h-5 rounded-md bg-teal-100 flex items-center justify-center text-teal-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <span className="text-xs font-bold text-slate-900">
                Samadhan Hub
              </span>
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setScreen('issues_feed')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Issues Feed
            </button>
            <button
              onClick={() => setActiveTab('volunteers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'volunteers'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Leaderboard
            </button>
          </div>

          {/* Live Sync Status */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-teal-700 font-semibold flex items-center gap-1.5 bg-teal-50 border border-teal-200 px-2 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        {/* Bento Box Grid Item 1: 4 Key Metric Cards */}
        <PlatformStatsWidget isMobileFrame={isMobileFrame} />

        {/* Bento Box Grid Item 2: Community Impact Chart + Category Gauge */}
        <div className={`grid gap-5 ${isMobileFrame ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={isMobileFrame ? '' : 'lg:col-span-2'}>
            <CommunityImpactChart />
          </div>
          <div className={isMobileFrame ? '' : 'lg:col-span-1'}>
            <CategoryGaugeWidget />
          </div>
        </div>

        {/* Bento Box Grid Item 3: Top Volunteers + Recent Issues Mini-Feed */}
        <div className={`grid gap-5 ${isMobileFrame ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          <TopVolunteersWidget />
          <RecentIssuesFeedWidget
            setScreen={setScreen}
            setSelectedIssue={setSelectedIssue}
          />
        </div>

        {/* Impact Numbers Ticker Strip */}
        <div className="p-5 rounded-3xl border bg-white border-slate-200 shadow-sm flex flex-wrap items-center justify-around gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              24+
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Municipal Wards</div>
          </div>
          <div className="text-orange-500 font-bold">✦</div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              130K+
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Active Citizens</div>
          </div>
          <div className="text-orange-500 font-bold">✦</div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              42K+
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Verified Solved</div>
          </div>
          <div className="text-orange-500 font-bold">✦</div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              76+
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">NGOs & CSR Partners</div>
          </div>
        </div>

      </div>
    </div>
  );
};
