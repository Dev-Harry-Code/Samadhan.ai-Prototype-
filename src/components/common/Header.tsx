import React from 'react';
import { motion } from 'framer-motion';
import { ScreenId } from '../../types';
import { MapPin, Bell, User, Monitor, Smartphone, Sparkles } from 'lucide-react';

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
        {/* Brand Identity & Location */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setScreen('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-all duration-200 relative">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Samadhan<span className="text-teal-600">.AI</span>
              </span>
            </div>
          </motion.div>

          {/* Location Badge */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Pune Division</span>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5">
          {[
            { id: 'home', label: 'Overview' },
            { id: 'issues_feed', label: 'Issues Feed', match: ['issues_feed', 'issue_details'] },
            { id: 'report', label: 'Report Problem' },
            { id: 'profile', label: 'Profile & XP' },
            { id: 'auth', label: 'Sign In / Register' },
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

        {/* Right Action Controls: Device Viewport Switcher & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Desktop vs Mobile Viewport Switcher */}
          <div className="flex items-center p-1 rounded-2xl border bg-slate-100 border-slate-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileFrame(false)}
              title="Switch to Full Desktop SaaS Dashboard view"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                !isMobileFrame
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileFrame(true)}
              title="Switch to Mobile Mockup Frame view"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                isMobileFrame
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
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
