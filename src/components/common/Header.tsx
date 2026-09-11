import React from 'react';
import { motion } from 'framer-motion';
import { ScreenId } from '../../types';
import { MapPin, Bell, User, Monitor, Smartphone, Globe } from 'lucide-react';
import { SamadhanLogoIcon } from './SamadhanLogo';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t, currentLanguageInfo, setIsLanguageModalOpen } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 border-slate-200/80 backdrop-blur-xl shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand Identity & Location */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setScreen('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <SamadhanLogoIcon size={36} />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                Samadhan<span className="text-teal-600">.ai</span>
              </span>
              <span className="text-[9px] text-teal-700 font-semibold tracking-tight hidden sm:inline leading-none mt-0.5">
                {t('tagline', 'Together for a Better Tomorrow')}
              </span>
            </div>
          </motion.div>

          {/* Location Badge */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Lucknow / Ranchi</span>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs with i18n */}
        <nav className="hidden md:flex items-center gap-1.5">
          {[
            { id: 'home', label: t('navOverview', 'Overview') },
            { id: 'issues_feed', label: t('navFeed', 'Issues Feed'), match: ['issues_feed', 'issue_details'] },
            { id: 'report', label: t('navReport', 'Report') },
            { id: 'profile', label: t('navProfile', 'Profile') },
            { id: 'auth', label: t('getStarted', 'Sign In') },
          ].map((tab) => {
            const isActive = tab.match ? tab.match.includes(currentScreen) : currentScreen === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen(tab.id as ScreenId)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? tab.id === 'auth'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                    : tab.id === 'auth'
                    ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </nav>

        {/* Right Action Controls: Language Switcher, Device Switcher, Notifications & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Multi-Language Selector Trigger Button (Matches Screen 8) */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLanguageModalOpen(true)}
            title="Change Platform Language / भाषा बदलें"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold transition-all shadow-2xs"
          >
            <span className="text-sm" role="img" aria-label="flag">{currentLanguageInfo.flag}</span>
            <span className="font-semibold hidden sm:inline">{currentLanguageInfo.nativeName}</span>
            <span className="font-mono sm:hidden">{currentLanguageInfo.code.toUpperCase()}</span>
            <Globe className="w-3.5 h-3.5 text-teal-600 ml-0.5" />
          </motion.button>

          {/* Desktop vs Mobile Viewport Switcher */}
          <div className="flex items-center p-1 rounded-2xl border bg-slate-100 border-slate-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileFrame(false)}
              title="Switch to Full Desktop SaaS Dashboard view"
              className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold transition-all ${
                !isMobileFrame
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Desk</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileFrame(true)}
              title="Switch to Mobile Mockup Frame view"
              className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold transition-all ${
                isMobileFrame
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Mob</span>
            </motion.button>
          </div>

          {/* Notification Icon with Warm Orange Badge */}
          <motion.div 
            whileHover={{ scale: 1.1, boxShadow: '0 4px 14px rgba(249, 115, 22, 0.25)' }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center relative cursor-pointer border bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
          </motion.div>

          {/* User Profile Avatar */}
          <motion.div
            whileHover={{ scale: 1.1, boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setScreen('profile')}
            className="w-8 h-8 rounded-xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer bg-teal-50 flex items-center justify-center"
          >
            <User className="w-4 h-4 text-teal-700" />
          </motion.div>

        </div>
      </div>
    </header>
  );
};
