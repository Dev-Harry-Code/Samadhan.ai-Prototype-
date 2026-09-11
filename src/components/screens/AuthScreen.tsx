import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenId, Role } from '../../types';
import { 
  Sparkles, 
  Smartphone, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Shield, 
  Building2 
} from 'lucide-react';
import { SamadhanLogo } from '../common/SamadhanLogo';
import { useLanguage } from '../../context/LanguageContext';

interface AuthScreenProps {
  setScreen: (screen: ScreenId) => void;
  onLogin: (role: Role) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, setScreen }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [inputValue, setInputValue] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('4281');
  const [selectedRole, setSelectedRole] = useState<Role>('citizen');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.length > 4) setStep(2);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) setStep(3);
  };

  const handleComplete = () => {
    onLogin(selectedRole);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[640px] px-4 py-10 relative overflow-hidden bg-slate-50">
      {/* Project Background: Civic Community & Society Infrastructure */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" 
          alt="Civic Infrastructure" 
          className="w-full h-full object-cover object-center scale-105 filter blur-[0.5px] opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white/80 to-slate-50/95 backdrop-blur-[1.5px]"></div>
        
        {/* Soft ambient light glow accents */}
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-teal-500/15 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-500/15 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Brand Header with Project Tag & Logo (Replaces 3D model) */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 flex flex-col items-center"
        >
          {/* Civic Crowdsourcing Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-teal-200 text-teal-800 text-xs font-bold mb-3 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Civic Crowdsourcing & AI Resolution</span>
          </div>

          <SamadhanLogo size="lg" showText={true} showTagline={true} className="mt-1 mb-1" />
        </motion.div>

        {/* Pure White Card Container */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl relative">
          
          {/* Step 1: Input method */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 text-center">Citizen Gateway</h2>
              <p className="text-xs text-slate-600 text-center mb-4">Empowering grassroots civic problem solving</p>

              {/* Primary 'Get Started' Button */}
              <motion.button
                type="button"
                onClick={() => onLogin('citizen')}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 28px -4px rgba(13, 148, 136, 0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg flex items-center justify-center gap-2.5 btn-breathing mb-4"
              >
                <span>{t('getStarted', 'Get Started')}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </motion.button>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400">or sign in with credentials</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              
              <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-2xl mb-5">
                <button 
                  onClick={() => setLoginMethod('mobile')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'mobile'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile Phone</span>
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'email'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Gmail / Email</span>
                </button>
              </div>

              <form onSubmit={handleSendCode}>
                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {loginMethod === 'mobile' ? 'Mobile Number (with OTP)' : 'Email ID (with Code)'}
                  </label>
                  <input 
                    type={loginMethod === 'mobile' ? 'tel' : 'email'} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-sm transition-all" 
                    placeholder={loginMethod === 'mobile' ? '+91 98765 43210' : 'you@example.com'} 
                    required 
                  />
                </div>
                
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 btn-breathing"
                >
                  <span>Send {loginMethod === 'mobile' ? 'SMS OTP' : 'Verification Code'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => onLogin('citizen')}
                  className="text-xs text-slate-500 hover:text-teal-700 transition-colors font-semibold flex items-center justify-center gap-1 mx-auto"
                >
                  <span>{t('skipGuest', 'Skip login and explore as Guest')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Verification Code / OTP */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 text-center">Security Verification</h2>
              <p className="text-xs text-slate-600 text-center mb-5">
                We sent a 4-digit code to <br/><strong className="text-teal-700">{inputValue}</strong>
              </p>

              <form onSubmit={handleVerify}>
                <div className="mb-5 flex justify-center">
                   <input
                     type="text"
                     maxLength={4}
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     className="w-48 text-center text-3xl tracking-[0.6em] font-mono font-black py-3 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all"
                     placeholder="----"
                     required
                     autoFocus
                   />
                </div>
                
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transform transition-all active:scale-95 flex items-center justify-center gap-2 btn-breathing"
                >
                  <span>Verify & Select Role</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <button type="button" onClick={() => setStep(1)} className="w-full mt-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to phone/email</span>
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Register as Citizen, NGO, or Company */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 text-center">Select Profile Role</h2>
              <p className="text-xs text-slate-600 text-center mb-4">
                Choose how you want to participate in the civic platform
              </p>

              <div className="space-y-2.5 mb-5">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('citizen')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedRole === 'citizen'
                      ? 'border-teal-600 bg-teal-50/70 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedRole === 'citizen' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Citizen / Volunteer</h3>
                    <p className="text-[11px] text-slate-600">Report local problems, vote & volunteer</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('ngo')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedRole === 'ngo'
                      ? 'border-teal-600 bg-teal-50/70 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedRole === 'ngo' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">NGO / Civil Society</h3>
                    <p className="text-[11px] text-slate-600">Mobilize ground execution & verify solutions</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('company')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedRole === 'company'
                      ? 'border-orange-500 bg-orange-50/70 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedRole === 'company' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Company / CSR Sponsor</h3>
                    <p className="text-[11px] text-slate-600">Fund civic projects & track ESG impact</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -4px rgba(13, 148, 136, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete} 
                className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transform transition-all active:scale-95 flex items-center justify-center gap-2 btn-breathing"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
