import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenId } from '../../types';
import { 
  ArrowLeft, 
  Camera, 
  ImagePlus, 
  MapPin, 
  ArrowRight, 
  X,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PlatformStatsWidget } from '../widgets/PlatformStatsWidget';

interface ReportIssueScreenProps {
  setScreen: (screen: ScreenId) => void;
}

export const ReportIssueScreen: React.FC<ReportIssueScreenProps> = ({ setScreen }) => {
  const { t } = useLanguage();
  const [photo, setPhoto] = useState<string | null>(
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80'
  );
  const [description, setDescription] = useState(
    'The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water.'
  );
  const [category, setCategory] = useState('Water Resources');
  const [urgency] = useState<'High Urgency' | 'Moderate' | 'Critical'>('High Urgency');

  const handlePhotoClick = () => {
    setPhoto('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80');
  };

  const handleConfirmLocation = () => {
    // Transition to Screen 4 (AI Analysis)
    setScreen('ai_analysis');
  };

  return (
    <div className="p-4 sm:p-6 pb-28 max-w-2xl mx-auto min-h-full bg-transparent relative z-10">
      {/* Multi-color platform stats strip */}
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
              {t('reportWithAI', 'Report Civic Issue')}
            </h2>
            <p className="text-xs text-slate-500">
              AI triage will verify & categorize automatically
            </p>
          </div>
        </div>

        {/* Urgency Badge in Energetic Warm Orange */}
        <span className="text-xs px-3 py-1 rounded-full font-bold bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1.5 shadow-2xs">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
          {t('urgencyHigh', urgency)}
        </span>
      </div>

      {/* SCREEN 3: REPORT ISSUE FORM */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'Water Resources', label: t('catWater', 'Water Resources'), bg: 'border-sky-400 bg-sky-50 text-sky-800' },
              { id: 'Sanitation', label: t('catGarbage', 'Sanitation'), bg: 'border-teal-400 bg-teal-50 text-teal-800' },
              { id: 'Roads', label: t('catRoad', 'Roads'), bg: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
              { id: 'Electricity', label: t('catElectricity', 'Electricity'), bg: 'border-amber-400 bg-amber-50 text-amber-800' },
              { id: 'Transport', label: t('catTransport', 'Transport'), bg: 'border-purple-400 bg-purple-50 text-purple-800' },
              { id: 'Healthcare', label: t('catHealthcare', 'Healthcare'), bg: 'border-rose-400 bg-rose-50 text-rose-800' },
            ].map((catItem) => (
              <motion.button
                key={catItem.id}
                type="button"
                whileHover={{ scale: 1.04, boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(catItem.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  category === catItem.id
                    ? `${catItem.bg} ring-2 ring-teal-500 font-extrabold shadow-xs`
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {catItem.label}
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

        {/* Primary Action Button: 'Confirm Location' */}
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: '0 12px 28px -4px rgba(13, 148, 136, 0.45)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirmLocation}
          disabled={!photo || description.length < 4}
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2 btn-breathing"
        >
          <MapPin className="w-5 h-5" />
          <span>{t('confirmLocation', 'Confirm Location')}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </motion.button>
      </div>
    </div>
  );
};
