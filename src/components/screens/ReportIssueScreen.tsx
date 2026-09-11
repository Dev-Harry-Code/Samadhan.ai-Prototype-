import React, { useState } from 'react';
import { ScreenId } from '../../types';

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
  const [urgency, setUrgency] = useState<'High Urgency' | 'Moderate' | 'Critical'>('High Urgency');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handlePhotoClick = () => {
    setPhoto('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80');
  };

  const handleStartAnalysis = () => {
    setStep('analysis');
    setAnalysisProgress(15);
    
    setTimeout(() => setAnalysisProgress(45), 350);
    setTimeout(() => setAnalysisProgress(82), 700);
    setTimeout(() => {
      setAnalysisProgress(100);
      setTimeout(() => setStep('confirmation'), 500);
    }, 1100);
  };

  return (
    <div className="p-4 sm:p-6 pb-28 max-w-2xl mx-auto min-h-full bg-slate-50">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
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
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          High Urgency
        </span>
      </div>

      {/* SCREEN 3: REPORT ISSUE FORM */}
      {step === 'form' && (
        <div className="space-y-5">
          {/* Photographic Evidence Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Photographic Evidence
              </label>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                AI Vision Ready
              </span>
            </div>

            {photo ? (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={photo} alt="Issue" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhoto(null)} 
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-teal-800 border border-slate-200 flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  GPS EXIF Verified
                </div>
              </div>
            ) : (
              <div 
                onClick={handlePhotoClick}
                className="w-full h-48 border-2 border-dashed border-teal-300 bg-teal-50/50 hover:bg-teal-50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all text-teal-700 group"
              >
                <div className="w-12 h-12 bg-white border border-teal-200 rounded-2xl shadow-sm flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </div>
                <span className="font-bold text-sm text-slate-900">Tap to capture or upload photo</span>
                <span className="text-xs text-slate-500 mt-1">Automatic location tagging enabled</span>
              </div>
            )}
          </div>

          {/* Location Detected */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Auto-Detected GPS Location
            </label>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="font-medium text-slate-900">Village X, Ranchi, Jharkhand (Ward 14)</span>
              </div>
              <span className="text-xs text-teal-700 font-mono font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Accuracy: 4m</span>
            </div>
          </div>

          {/* Category Selector */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Water Resources', 'Sanitation', 'Roads', 'Healthcare'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    category === cat
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
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
          <button 
            onClick={handleStartAnalysis}
            disabled={!photo || description.length < 4}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
          >
            <span>Proceed to AI Autonomous Analysis</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      )}

      {/* SCREEN 4: AI ANALYSIS */}
      {step === 'analysis' && (
        <div className="space-y-5">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mx-auto flex items-center justify-center text-teal-600 shadow-sm">
              <svg className="animate-spin h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>

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
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
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

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setScreen('issues_feed')}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View on Public Feed</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </button>
              <button
                onClick={() => setScreen('home')}
                className="w-full py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-xl shadow-xs transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
