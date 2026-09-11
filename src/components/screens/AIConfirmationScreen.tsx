import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenId } from '../../types';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PlatformStatsWidget } from '../widgets/PlatformStatsWidget';

interface AIConfirmationScreenProps {
  setScreen: (screen: ScreenId) => void;
  onSubmitReport: () => void;
}

export const AIConfirmationScreen: React.FC<AIConfirmationScreenProps> = ({
  setScreen,
  onSubmitReport,
}) => {
  const { t } = useLanguage();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    onSubmitReport();
    setShowSuccessModal(true);
    // Auto transition to public feed after celebratory modal display
    setTimeout(() => {
      setScreen('issues_feed');
    }, 2400);
  };

  return (
    <div className="p-4 sm:p-6 pb-28 max-w-2xl mx-auto min-h-full bg-transparent relative z-10">
      {/* Multi-Color Platform Stats Strip */}
      <div className="mb-4">
        <PlatformStatsWidget compact={true} columns={3} />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)' }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('confirmedTitle', 'AI Verification Confirmation')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('confirmedDesc', 'Validated with 96.8% confidence • Ready for dispatch')}
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full font-bold bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          {t('statusVerified', 'Pre-Approved')}
        </span>
      </div>

      {/* Main Confirmation Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-sm"
          >
            <CheckCircle2 className="w-9 h-9 text-teal-600" />
          </motion.div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            {t('statusVerified', 'Verified & Dispatched')}
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {t('confirmedTitle', 'Issue Confirmed: #LOK-9428')}
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
            {t('confirmedDesc', 'Your report has been validated with 96.8% AI confidence. Work orders and community volunteer alerts have been drafted.')}
          </p>
        </div>

        {/* Confirmation Receipt Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">{t('trackingRef', 'Tracking Reference')}</span>
            <span className="font-mono font-bold text-slate-900">#LOK-9428-RANCHI</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">{t('assignedUrgency', 'Assigned Urgency')}</span>
            <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">{t('urgencyHigh', 'High Urgency')}</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">{t('assignedDept', 'Assigned Department')}</span>
            <span className="font-semibold text-slate-800">{t('deptWaterBoard', 'Water Supply & Sanitation Board')}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">{t('karmaEarned', 'Citizen Karma Earned')}</span>
            <span className="font-bold text-teal-700 font-mono">+120 XP Points</span>
          </div>
        </div>

        {/* Primary Action Button: 'Submit Report' */}
        <div className="space-y-2.5 pt-2">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 btn-breathing"
          >
            <Send className="w-4 h-4" />
            <span>{t('submitReport', 'Submit Report')}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen('home')}
            className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold text-xs rounded-xl shadow-xs transition-all"
          >
            {t('backToDashboard', 'Cancel & Return to Dashboard')}
          </motion.button>
        </div>
      </div>

      {/* Success Checkmark Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center relative overflow-hidden"
            >
              {/* Decorative accent glow */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none"></div>

              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-3xl bg-teal-50 border-2 border-teal-500/30 flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-md"
              >
                <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
              </motion.div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                {t('submissionSuccess', 'Submission Successful')}
              </span>

              <h4 className="text-xl font-black text-slate-900 mt-3 mb-1">
                {t('reportDispatched', 'Report Dispatched!')}
              </h4>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Issue <strong className="text-slate-900">#LOK-9428</strong> has been logged to the public ledger. <span className="text-teal-700 font-bold">+120 Karma XP</span> added to your citizen profile!
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setScreen('issues_feed')}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
              >
                <span>{t('viewFeedNow', 'View on Public Feed Now')}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
