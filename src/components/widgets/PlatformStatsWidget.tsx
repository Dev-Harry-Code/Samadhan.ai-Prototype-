import React from 'react';
import { motion } from 'framer-motion';
import { PLATFORM_STATS } from '../../data/mockData';
import { AlertCircle, CheckCircle2, FileText, IndianRupee } from 'lucide-react';

interface PlatformStatsWidgetProps {
  isMobileFrame?: boolean;
}

export const PlatformStatsWidget: React.FC<PlatformStatsWidgetProps> = ({ isMobileFrame = false }) => {
  const stats = [
    {
      title: 'Issues Reported',
      value: '3,120',
      growth: '+18.4%',
      icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
      iconBg: 'bg-orange-50 border border-orange-100',
      badgeColor: 'text-orange-700 bg-orange-50 border-orange-200'
    },
    {
      title: 'Solved',
      value: PLATFORM_STATS.totalResolved,
      growth: PLATFORM_STATS.resolvedGrowth,
      icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
      iconBg: 'bg-teal-50 border border-teal-100',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      title: 'Your Reports',
      value: '14',
      growth: '+4 New',
      icon: <FileText className="w-4 h-4 text-teal-600" />,
      iconBg: 'bg-teal-50 border border-teal-100',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      title: 'Community Impact',
      value: PLATFORM_STATS.csrFundsMobilized,
      growth: PLATFORM_STATS.fundsGrowth,
      icon: <IndianRupee className="w-4 h-4 text-orange-500" />,
      iconBg: 'bg-orange-50 border border-orange-100',
      badgeColor: 'text-orange-700 bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className={`grid ${isMobileFrame ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
          whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.12)' }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-slate-200 shadow-sm hover:border-slate-300 p-4 sm:p-5 rounded-2xl relative overflow-hidden group cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate text-slate-500">
              {stat.title}
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
              {stat.icon}
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-1 relative z-10 mt-1 flex-wrap">
            <div className="text-lg sm:text-2xl font-black tracking-tight leading-tight truncate text-slate-900">
              {stat.value}
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${stat.badgeColor} flex-shrink-0`}>
              {stat.growth}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate">Updated via CivicAI</span>
            <span className="font-semibold text-teal-600">96.8%</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
