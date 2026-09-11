import React from 'react';
import { motion } from 'framer-motion';
import { ScreenId } from '../../types';
import { Home, Search, Plus, Clock, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BottomNavProps {
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setScreen }) => {
  const { t } = useLanguage();

  const getTabClass = (screens: ScreenId[]) => {
    const isActive = screens.includes(currentScreen);
    return `flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all ${
      isActive
        ? 'text-teal-600 font-bold'
        : 'text-slate-500 hover:text-slate-900'
    }`;
  };

  return (
    <div className="h-16 border-t flex items-center justify-between px-2 pb-1 relative z-50 backdrop-blur-xl transition-colors duration-300 bg-white/95 border-slate-200 shadow-lg">
      {/* 2 left items: Home, Search */}
      <div className="flex flex-1 justify-around">
        <motion.button 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setScreen('home')} 
          className={getTabClass(['home'])}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('navHome', 'Home')}</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setScreen('issues_feed')} 
          className={getTabClass(['issues_feed', 'issue_details'])}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('navSearch', 'Search')}</span>
        </motion.button>
      </div>

      {/* Floating Action Button for Report (Centered Plus) */}
      <div className="relative flex-shrink-0 w-16 h-16 flex justify-center">
        <motion.button 
          whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(249, 115, 22, 0.65)' }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setScreen('report')} 
          title={t('reportWithAI', 'Report Civic Issue')}
          className={`absolute -top-5 w-14 h-14 rounded-2xl flex items-center justify-center text-white fab-breathing fab-pulse z-10 transition-all ${
            currentScreen === 'report'
              ? 'bg-orange-600 ring-4 ring-orange-300 scale-105 shadow-[0_6px_25px_rgba(249,115,22,0.6)]'
              : 'bg-orange-500 hover:bg-orange-600 shadow-[0_4px_20px_rgba(249,115,22,0.45)]'
          }`}
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* 2 right items: Clock (Activity/Recent), User (Profile) */}
      <div className="flex flex-1 justify-around">
        <motion.button 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setScreen('ai_confirmation')} 
          className={getTabClass(['ai_confirmation', 'ai_analysis'])}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('navActivity', 'Activity')}</span>
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setScreen('profile')} 
          className={getTabClass(['profile'])}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('navProfile', 'Profile')}</span>
        </motion.button>
      </div>

    </div>
  );
};
