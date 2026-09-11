import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, Check, X, Sparkles } from 'lucide-react';

export const LanguageSelectorModal: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    allLanguages, 
    isLanguageModalOpen, 
    setIsLanguageModalOpen,
    t 
  } = useLanguage();

  if (!isLanguageModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => setIsLanguageModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
        >
          {/* Modal Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shadow-xs">
                <Globe className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                  <span>{t('multiLanguageTitle', 'Multi-Language / भाषा')}</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  {t('chooseLanguageDesc', 'Select your preferred language for instant platform translation.')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLanguageModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Language Indicator Bar */}
          <div className="px-6 py-3 bg-teal-50/60 border-b border-teal-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-teal-900">{t('currentLanguageLabel', 'Current Language')}</span>
            <span className="font-mono font-bold text-teal-700 bg-white border border-teal-200 px-2.5 py-0.5 rounded-full shadow-2xs">
              {allLanguages.find(l => l.code === language)?.nativeName} ({language.toUpperCase()})
            </span>
          </div>

          {/* Language Options List */}
          <div className="p-4 sm:p-6 space-y-2 max-h-[380px] overflow-y-auto">
            {allLanguages.map((lang) => {
              const isSelected = language === lang.code;

              return (
                <motion.div
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLanguage(lang.code);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/80 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{lang.nativeName}</span>
                        <span className="text-xs font-medium text-slate-500 font-sans">({lang.name})</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        ISO Code: {lang.code}
                      </span>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Live instant translation applied
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsLanguageModalOpen(false)}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
            >
              {t('applyLanguage', 'Done')}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
