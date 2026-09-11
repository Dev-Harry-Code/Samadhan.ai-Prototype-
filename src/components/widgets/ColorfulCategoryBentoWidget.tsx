import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Droplet, Navigation, Zap, Trash2, Bus, MoreHorizontal, ArrowRight } from 'lucide-react';
import { ScreenId } from '../../types';

interface ColorfulCategoryBentoWidgetProps {
  onSelectCategory?: (category: string) => void;
  setScreen: (screen: ScreenId) => void;
}

export const ColorfulCategoryBentoWidget: React.FC<ColorfulCategoryBentoWidgetProps> = ({
  onSelectCategory,
  setScreen,
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'water',
      name: t('catWater', 'Water & Sanitation'),
      count: 12,
      icon: <Droplet className="w-5 h-5 text-sky-600" />,
      bgCard: 'bg-sky-50/80 border-sky-200/90 hover:border-sky-300',
      iconBg: 'bg-sky-100 text-sky-700',
      badgeColor: 'text-sky-700 bg-sky-100/80',
      catQuery: 'Water Resources',
    },
    {
      id: 'road',
      name: t('catRoad', 'Road & Infrastructure'),
      count: 10,
      icon: <Navigation className="w-5 h-5 text-emerald-600" />,
      bgCard: 'bg-emerald-50/80 border-emerald-200/90 hover:border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700',
      badgeColor: 'text-emerald-700 bg-emerald-100/80',
      catQuery: 'Infrastructure',
    },
    {
      id: 'electricity',
      name: t('catElectricity', 'Electricity & Street Light'),
      count: 8,
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      bgCard: 'bg-amber-50/80 border-amber-200/90 hover:border-amber-300',
      iconBg: 'bg-amber-100 text-amber-700',
      badgeColor: 'text-amber-700 bg-amber-100/80',
      catQuery: 'Electricity',
    },
    {
      id: 'garbage',
      name: t('catGarbage', 'Garbage & Cleanliness'),
      count: 6,
      icon: <Trash2 className="w-5 h-5 text-teal-600" />,
      bgCard: 'bg-teal-50/80 border-teal-200/90 hover:border-teal-300',
      iconBg: 'bg-teal-100 text-teal-700',
      badgeColor: 'text-teal-700 bg-teal-100/80',
      catQuery: 'Sanitation',
    },
    {
      id: 'transport',
      name: t('catTransport', 'Public Transport'),
      count: 5,
      icon: <Bus className="w-5 h-5 text-purple-600" />,
      bgCard: 'bg-purple-50/80 border-purple-200/90 hover:border-purple-300',
      iconBg: 'bg-purple-100 text-purple-700',
      badgeColor: 'text-purple-700 bg-purple-100/80',
      catQuery: 'Transport',
    },
    {
      id: 'other',
      name: t('catOther', 'Other'),
      count: 7,
      icon: <MoreHorizontal className="w-5 h-5 text-slate-600" />,
      bgCard: 'bg-slate-50 border-slate-200 hover:border-slate-300',
      iconBg: 'bg-slate-200 text-slate-700',
      badgeColor: 'text-slate-700 bg-slate-200/80',
      catQuery: 'All',
    },
  ];

  const handleCardClick = (catQuery: string) => {
    if (onSelectCategory) {
      onSelectCategory(catQuery);
    }
    setScreen('issues_feed');
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Issue Categories (Bento Grid)
          </h3>
          <p className="text-xs text-slate-500">
            Select a department domain to filter civic challenges
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('issues_feed')}
          className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.08)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleCardClick(cat.catQuery)}
            className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between h-32 transition-all ${cat.bgCard}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs ${cat.iconBg}`}>
              {cat.icon}
            </div>

            <div>
              <div className="text-xs font-black text-slate-900 line-clamp-2 leading-tight">
                {cat.name}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md ${cat.badgeColor}`}>
                  {cat.count} Issues
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
