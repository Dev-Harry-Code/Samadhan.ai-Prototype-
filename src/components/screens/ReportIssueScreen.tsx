import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenId } from '../../types';
import { 
  ArrowLeft, 
  Camera, 
  ImagePlus, 
  MapPin, 
  Loader2, 
  CheckCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  X,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { AISphereCanvas } from '../3d/AISphereCanvas';

interface ReportIssueScreenProps {
  setScreen: (screen: ScreenId) => void;
}

export const ReportIssueScreen: React.FC<ReportIssueScreenProps> = ({ setScreen }) => {
  const [step, setStep] = useState<'form' | 'analysis' | 'confirmation'>('form');
  const [photo, setPhoto] = useState<string | null>(
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80'
  );
  const [description, setDescription] = useState(
    'The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water.'
  );
  const [category, setCategory] = useState('Water Resources');
  const [urgency] = useState<'High Urgency' | 'Moderate' | 'Critical'>('High Urgency');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handlePhotoClick = () => {
    setPhoto('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80');
  };

  const handleStartAnalysis = () => {
    setStep('analysis');
    setAnalysisProgress(20);
    
    setTimeout(() => setAnalysisProgress(50), 400);
    setTimeout(() => setAnalysisProgress(85), 800);
    setTimeout(() => {
      setAnalysisProgress(100);
      setTimeout(() => setStep('confirmation'), 500);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 pb-28 max-w-2xl mx-auto min-h-full bg-slate-50">
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
              {step === 'form' && 'Report Civic Issue'}
              {step === 'analysis' && 'AI Autonomous Triage'}
              {step === 'confirmation' && 'Issue Verified & Logged'}
            </h2>
            <p className="text-xs text-slate-500">
              {step === 'form' && 'AI triage will verify & categorize automatically'}
              {step === 'analysis' && 'Computer vision inspecting damage severity'}
              {step === 'confirmation' && 'Assigned to BIT Mesra & Ranchi Municipal Board'}
            </p>
          </div>
        </div>

        {/* Urgency Badge in Energetic Warm Orange */}
        <span className="text-xs px-3 py-1 rounded-full font-bold bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
          {urgency}
        </span>
      </div>

      {/* SCREEN 3: REPORT ISSUE FORM */}
      {step === 'form' && (
        <div className="space-y-5">
          {/* Photographic Evidence Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                <span>Photographic Evidence</span>
              </label>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-600" />
                AI Vision Ready
              </span>
            </div>

            {photo ? (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-xs border border-slate-200">
                <img src={photo} alt="Issue" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhoto(null)} 
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-teal-800 border border-slate-200 flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  GPS EXIF Verified
                </div>
              </div>
            ) : (
              <div 
                onClick={handlePhotoClick}
                className="w-full h-48 border-2 border-dashed border-teal-300 bg-teal-50/50 hover:bg-teal-50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all text-teal-700 group"
              >
                <div className="w-12 h-12 bg-white border border-teal-200 rounded-2xl shadow-xs flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <ImagePlus className="w-6 h-6 text-teal-600" />
                </div>
                <span className="font-bold text-sm text-slate-900">Tap to capture or upload photo</span>
                <span className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  Automatic location tagging enabled
                </span>
              </div>
            )}
          </div>

          {/* Location Marker & Detected Zone */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Auto-Detected GPS Location</span>
            </label>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="font-medium text-slate-900">Village X, Ranchi, Jharkhand (Ward 14)</span>
              </div>
              <span className="text-xs text-teal-700 font-mono font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Accuracy: 4m</span>
            </div>
          </div>

          {/* Category Selector */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Water Resources', 'Sanitation', 'Roads', 'Healthcare'].map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  whileHover={{ scale: 1.04, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    category === cat
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Problem Description
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all min-h-[100px] resize-none"
              placeholder="Describe what's happening, e.g., Community drinking tap fractured for 3 weeks..."
            ></textarea>
          </div>

          {/* Primary Action Button in Deep Teal */}
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartAnalysis}
            disabled={!photo || description.length < 4}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2 btn-breathing"
          >
            <span>Proceed to AI Autonomous Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {/* SCREEN 4: AI ANALYSIS CHECKLIST */}
      {step === 'analysis' && (
        <div className="space-y-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-5">
            {/* 3D Glowing AI Sphere floating mesh */}
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

            {/* Deep Teal Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="bg-teal-600 h-full rounded-full transition-all duration-300"
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
          </div>
        </div>
      )}

      {/* SCREEN 5: AI CONFIRMATION */}
      {step === 'confirmation' && (
        <div className="space-y-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-teal-600" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Verified & Dispatched
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Issue Confirmed: #LOK-9428
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                Your report has been validated with 96.8% AI confidence. Work orders and community volunteer alerts have been published.
              </p>
            </div>

            {/* Confirmation Receipt Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Tracking Reference</span>
                <span className="font-mono font-bold text-slate-900">#LOK-9428-RANCHI</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Assigned Urgency</span>
                <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">High Urgency</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Department</span>
                <span className="font-semibold text-slate-800">Water Supply & Sanitation Board</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Citizen Karma Earned</span>
                <span className="font-bold text-teal-700 font-mono">+120 XP Points</span>
              </div>
            </div>

            {/* Action Buttons with Framer Motion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setScreen('issues_feed')}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 btn-breathing"
              >
                <span>View on Public Feed</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 6px 18px -2px rgba(15, 23, 42, 0.1)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setScreen('home')}
                className="w-full py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-xl shadow-xs transition-all"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
