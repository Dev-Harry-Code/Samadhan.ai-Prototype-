import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  Loader2, 
  CheckCircle2, 
  IndianRupee 
} from 'lucide-react';

interface PlatformStatsWidgetProps {
  isMobileFrame?: boolean;
  compact?: boolean;
  className?: string;
}

export const PlatformStatsWidget: React.FC<PlatformStatsWidgetProps> = ({ 
  isMobileFrame = false,
  compact = false,
  className = ''
}) => {
  const { t } = useLanguage();

  // 6 Multi-color Bento Metric Cards directly modeled on Screen 1 of Reference Image
  const stats = [
    {
      id: 'total',
      title: t('metricTotalIssues', 'Total Issues'),
      value: '48',
      growth: '+12%',
      subtext: t('metricVsLast7Days', 'vs last 7 days'),
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      bgCard: 'bg-emerald-50/70 border-emerald-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      accentColor: 'text-emerald-700',
    },
    {
      id: 'high_priority',
      title: t('metricHighPriority', 'High Priority'),
      value: '7',
      growth: '+2%',
      subtext: t('metricNeedAttention', 'needs attention'),
      icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
      bgCard: 'bg-rose-50/70 border-rose-200/80 hover:border-rose-300',
      iconBg: 'bg-rose-100 text-rose-700',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      accentColor: 'text-rose-700',
    },
    {
      id: 'pending',
      title: t('metricPending', 'Pending'),
      value: '18',
      growth: '+5%',
      subtext: t('metricNeedAssignment', 'need assignment'),
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      bgCard: 'bg-amber-50/70 border-amber-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-100 text-amber-700',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      accentColor: 'text-amber-700',
    },
    {
      id: 'in_progress',
      title: t('metricInProgress', 'In Progress'),
      value: '14',
      growth: '+8%',
      subtext: t('metricOnGoing', 'on going'),
      icon: <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />,
      bgCard: 'bg-sky-50/70 border-sky-200/80 hover:border-sky-300',
      iconBg: 'bg-sky-100 text-sky-700',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
      accentColor: 'text-sky-700',
    },
    {
      id: 'resolved',
      title: t('metricResolved', 'Resolved'),
      value: '16',
      growth: '+20%',
      subtext: t('metricThisWeek', 'this week'),
      icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
      bgCard: 'bg-teal-50/70 border-teal-200/80 hover:border-teal-300',
      iconBg: 'bg-teal-100 text-teal-700',
      badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
      accentColor: 'text-teal-700',
    },
    {
      id: 'impact',
      title: t('metricRevenueImpact', 'Community Impact'),
      value: '₹24,500',
      growth: '+18%',
      subtext: 'this month',
      icon: <IndianRupee className="w-4 h-4 text-purple-600" />,
      bgCard: 'bg-purple-50/70 border-purple-200/80 hover:border-purple-300',
      iconBg: 'bg-purple-100 text-purple-700',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      accentColor: 'text-purple-700',
    },
  ];

  if (compact) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 ${className}`}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            whileHover={{ scale: 1.02 }}
            className={`border p-2.5 rounded-2xl flex items-center gap-2.5 shadow-2xs backdrop-blur-sm ${stat.bgCard}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-slate-500 truncate leading-none">
                {stat.title}
              </div>
              <div className="text-sm font-black text-slate-900 leading-tight mt-0.5">
                {stat.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${isMobileFrame ? 'grid-cols-2 gap-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4'} ${className}`}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          whileHover={{ scale: 1.03, boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)' }}
          whileTap={{ scale: 0.98 }}
          className={`border p-4 rounded-2xl relative overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-200 shadow-2xs ${stat.bgCard}`}
        >
          <div className="flex items-center justify-between gap-1 mb-2 relative z-10">
            <span className="text-[11px] font-extrabold uppercase tracking-wider truncate text-slate-700">
              {stat.title}
            </span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xs ${stat.iconBg}`}>
              {stat.icon}
            </div>
          </div>

          <div className="my-1">
            <div className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-slate-900">
              {stat.value}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${stat.badgeBg}`}>
                {stat.growth}
              </span>
              <span className="text-[10px] text-slate-500 truncate">
                {stat.subtext}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
