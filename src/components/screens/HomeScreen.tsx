import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Issue, ScreenId } from '../../types';
import { Plus, ArrowUpRight, Sparkles } from 'lucide-react';
import { PlatformStatsWidget } from '../widgets/PlatformStatsWidget';
import { ColorfulCategoryBentoWidget } from '../widgets/ColorfulCategoryBentoWidget';
import { CommunityImpactChart } from '../widgets/CommunityImpactChart';
import { CategoryGaugeWidget } from '../widgets/CategoryGaugeWidget';
import { TopVolunteersWidget } from '../widgets/TopVolunteersWidget';
import { RecentIssuesFeedWidget } from '../widgets/RecentIssuesFeedWidget';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'volunteers' | 'funds'>('overview');

  return (
    <div className="relative pb-36 pt-2 overflow-hidden min-h-full bg-transparent">
      {/* Subtle soft ambient light glow */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-96 right-[-10%] w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="relative z-10 px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
        
        {/* Hero Section */}
        <div className="text-center pt-4 pb-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-teal-50 border border-teal-200 text-teal-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-medium">
              {t('heroTag', 'AI-Powered Civic Problem Solving')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            {t('heroTitlePrefix', 'Crowdsourcing Actionable Solutions for')}{' '}
            <span className="text-teal-600">{t('heroTitleAccent', 'Societal Impact')}</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed text-slate-600">
            {t('heroDesc', 'Connecting proactive citizens, verified NGOs, and CSR entities with autonomous AI triage to detect, fund, and solve community issues with verifiable impact.')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.35)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen('report')}
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 btn-breathing"
            >
              <span>{t('reportWithAI', 'Report Issue with AI')}</span>
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -2px rgba(15, 23, 42, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen('issues_feed')}
              className="px-5 py-3 rounded-2xl text-sm font-semibold border bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <span>{t('exploreFeed', 'Explore Public Feed')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bento Dashboard Container Header with Tabs */}
        <div className="p-2 rounded-2xl flex flex-wrap items-center justify-between gap-3 border bg-white border-slate-200 shadow-sm">
          {/* Navigation Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <div className="flex items-center gap-2 px-3 py-1 mr-2 border-r border-slate-200">
              <div className="w-5 h-5 rounded-md bg-teal-100 flex items-center justify-center text-teal-700">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-900">
                Samadhan Hub
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t('navOverview', 'Overview')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen('issues_feed')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              {t('navFeed', 'Issues Feed')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('volunteers')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'volunteers'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t('navLeaderboard', 'Leaderboard')}
            </motion.button>
          </div>

          {/* Live Sync Status */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-teal-700 font-semibold flex items-center gap-1.5 bg-teal-50 border border-teal-200 px-2 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        {/* Bento Box Grid Item 1: Multi-Color Metric Cards (from Screen 1) */}
        <PlatformStatsWidget isMobileFrame={isMobileFrame} />

        {/* Bento Box Grid Item 2: Colorful Category Bento Grid (from Screen 2) */}
        <ColorfulCategoryBentoWidget setScreen={setScreen} />

        {/* Bento Box Grid Item 3: Community Impact Chart + Category Gauge */}
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
          <Sparkles className="w-4 h-4 text-orange-500" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              130K+
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Active Citizens</div>
          </div>
          <Sparkles className="w-4 h-4 text-orange-500" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              42K+
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Verified Solved</div>
          </div>
          <Sparkles className="w-4 h-4 text-orange-500" />
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
