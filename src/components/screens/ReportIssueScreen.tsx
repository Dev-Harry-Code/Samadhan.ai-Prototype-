import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ReportIssueScreenProps {
  setScreen: (screen: ScreenId) => void;
}

export const ReportIssueScreen: React.FC<ReportIssueScreenProps> = ({ setScreen }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water Resources');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoClick = () => {
    setPhoto('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setScreen('issues_feed');
    }, 900);
  };

  return (
    <div className="p-4 sm:p-6 pb-24 max-w-2xl mx-auto min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/[0.12] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Report Civic Issue</h2>
            <p className="text-xs text-slate-400">AI triage will verify & categorize automatically</p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-neon-purple/20 text-neon-fuchsia border border-neon-purple/30">
          AI Assist Active
        </span>
      </div>

      <div className="space-y-5">
        {/* Photo Upload Area */}
        <div className="glass-widget-dark p-5 rounded-3xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Photographic Evidence
          </label>
          {photo ? (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg border border-white/20">
              <img src={photo} alt="Issue" className="w-full h-full object-cover" />
              <button 
                onClick={() => setPhoto(null)} 
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                GPS EXIF Verified
              </div>
            </div>
          ) : (
            <div 
              onClick={handlePhotoClick}
              className="w-full h-48 border-2 border-dashed border-neon-purple/40 bg-neon-purple/[0.04] hover:bg-neon-purple/[0.08] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all text-neon-purple group"
            >
              <div className="w-12 h-12 bg-white/[0.08] border border-white/15 rounded-2xl shadow-sm flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </div>
              <span className="font-bold text-sm text-white">Tap to capture or upload photo</span>
              <span className="text-xs text-slate-400 mt-1">Automatic location tagging enabled</span>
            </div>
          )}
        </div>

        {/* Location Detected */}
        <div className="glass-widget-dark p-5 rounded-3xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Auto-Detected GPS Location
          </label>
          <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-cyan"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span className="font-medium text-white">Village X, Ranchi, Jharkhand (Ward 14)</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Accuracy: 4m</span>
          </div>
        </div>

        {/* Category selector */}
        <div className="glass-widget-dark p-5 rounded-3xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                    ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white border-transparent shadow-neon-purple'
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Description textarea */}
        <div className="glass-widget-dark p-5 rounded-3xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Problem Description
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all min-h-[110px] resize-none"
            placeholder="Describe what's happening, e.g., Community drinking tap fractured for 3 weeks..."
          ></textarea>
        </div>

        {/* Submit CTA */}
        <button 
          onClick={handleSubmit}
          disabled={!photo || description.length < 4 || isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-neon-purple via-neon-violet to-neon-fuchsia text-white font-extrabold rounded-2xl shadow-neon-purple hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>AI Analyzing & Routing...</span>
            </>
          ) : (
            <>
              <span>Submit Issue with AI Verification</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
