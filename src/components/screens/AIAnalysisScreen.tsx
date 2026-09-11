import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScreenId } from '../../types';
import { AISphereCanvas } from '../3d/AISphereCanvas';
import { CheckCircle, Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface AIAnalysisScreenProps {
  setScreen: (screen: ScreenId) => void;
}

export const AIAnalysisScreen: React.FC<AIAnalysisScreenProps> = ({ setScreen }) => {
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Dynamic 3-second progress timer that auto-triggers on mount and auto-pushes to Screen 5
  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3000ms = 3 seconds dynamic timer

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setAnalysisProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        // Auto-push to Screen 5 (AI Confirmation) upon completion
        setTimeout(() => {
          setScreen('ai_confirmation');
        }, 500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [setScreen]);

  return (
    <div className="p-4 sm:p-6 pb-28 max-w-2xl mx-auto min-h-full bg-slate-50">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)' }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen('report')}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              AI Autonomous Triage
            </h2>
            <p className="text-xs text-slate-500">
              Computer vision inspecting damage severity & dispatching orders
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full font-bold bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
          High Urgency
        </span>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-5">
        {/* 3D Glowing AI Sphere floating mesh reacting to progress */}
        <AISphereCanvas progress={analysisProgress} />

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            AI Triage Running ({analysisProgress}%)
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-3">
            Analyzing Structural Defect & Impact
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
            Deep neural vision is verifying leak signature, estimating affected population, and matching local engineering faculties.
          </p>
        </div>

        {/* Deep Teal Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
          <div 
            className="bg-teal-600 h-full rounded-full transition-all duration-75"
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>

        {/* AI Analysis Status Checklist - Sequentially animated with spring physics */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
          {[
            {
              id: 'step-image',
              title: 'Image Processing & Damage Segmentation',
              isDone: analysisProgress >= 30,
              statusText: analysisProgress >= 30 ? 'Verified' : 'Processing...'
            },
            {
              id: 'step-location',
              title: 'Location Analysis & GPS EXIF Verification',
              isDone: analysisProgress >= 60,
              statusText: analysisProgress >= 60 ? 'Passed' : 'Triaging...'
            },
            {
              id: 'step-classification',
              title: 'Issue Classification & CSR Impact Match',
              isDone: analysisProgress >= 90,
              statusText: analysisProgress >= 90 ? 'Matched' : 'Queueing...'
            }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 24,
                delay: index * 0.18
              }}
              className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                {item.isDone ? (
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 text-orange-500 animate-spin flex-shrink-0" />
                )}
                <span className="font-semibold text-slate-800">{item.title}</span>
              </div>
              <span className={`text-[11px] font-mono font-bold ${item.isDone ? 'text-teal-700' : 'text-orange-600'}`}>
                {item.statusText}
              </span>
            </motion.div>
          ))}
        </div>

        {/* AI Findings Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Identified Object</span>
            <span className="text-xs font-bold text-slate-900 mt-0.5 block">4-inch Fractured PVC Pipe</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Estimated Impact</span>
            <span className="text-xs font-bold text-orange-600 mt-0.5 block">50+ Families Cut Off</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">AI Match Partner</span>
            <span className="text-xs font-bold text-teal-700 mt-0.5 block">BIT Mesra Hydrology</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1.5 pt-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
          Auto-forwarding to verification receipt in 3 seconds...
        </div>
      </div>
    </div>
  );
};
