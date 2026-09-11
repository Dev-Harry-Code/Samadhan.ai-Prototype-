import React, { useState } from 'react';
import { ScreenId, Role } from '../../types';

interface AuthScreenProps {
  setScreen: (screen: ScreenId) => void;
  onLogin: (role: Role) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, setScreen }) => {
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
    <div className="flex-1 flex flex-col items-center justify-center min-h-[640px] px-4 py-8 relative overflow-hidden">
      {/* Background neon ambient orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-neon-purple/25 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-neon-cyan/25 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-neon-purple via-neon-violet to-neon-fuchsia p-[1px] shadow-neon-purple mb-3">
            <div className="w-full h-full bg-[#090c12] rounded-[15px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-neon-fuchsia">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Samadhan<span className="text-neon-purple">.AI</span>
          </h1>
          <p className="text-slate-400 mt-1 text-xs">Empowering communities with verifiable civic impact</p>
        </div>

        <div className="glass-widget-dark p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
          
          {/* Step 1: Input method */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1 text-center">Welcome</h2>
              <p className="text-xs text-slate-400 text-center mb-5">Sign in or register to join the civic network</p>
              
              <div className="flex bg-white/[0.05] border border-white/10 p-1 rounded-2xl mb-5">
                <button 
                  onClick={() => setLoginMethod('mobile')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    loginMethod === 'mobile'
                      ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📱 Mobile Phone
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    loginMethod === 'email'
                      ? 'bg-gradient-to-r from-neon-purple to-neon-fuchsia text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ✉️ Gmail / Email
                </button>
              </div>

              <form onSubmit={handleSendCode}>
                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {loginMethod === 'mobile' ? 'Mobile Number (with OTP)' : 'Email ID (with Code)'}
                  </label>
                  <input 
                    type={loginMethod === 'mobile' ? 'tel' : 'email'} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple text-sm transition-all" 
                    placeholder={loginMethod === 'mobile' ? '+91 98765 43210' : 'you@example.com'} 
                    required 
                  />
                </div>
                
                <button type="submit" className="w-full py-3.5 px-4 bg-gradient-to-r from-neon-purple via-neon-violet to-neon-fuchsia hover:opacity-95 text-white rounded-xl font-bold text-sm shadow-neon-purple transform transition-all active:scale-95">
                  Send {loginMethod === 'mobile' ? 'SMS OTP' : 'Verification Code'} →
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={() => onLogin('citizen')}
                  className="text-xs text-slate-400 hover:text-neon-fuchsia transition-colors font-medium"
                >
                  Skip login and explore as Guest →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Verification Code / OTP */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1 text-center">Security Verification</h2>
              <p className="text-xs text-slate-400 text-center mb-5">
                We sent a 4-digit code to <br/><strong className="text-neon-cyan">{inputValue}</strong>
              </p>

              <form onSubmit={handleVerify}>
                <div className="mb-5 flex justify-center">
                   <input
                     type="text"
                     maxLength={4}
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     className="w-48 text-center text-3xl tracking-[0.6em] font-mono font-black py-3 rounded-2xl border border-white/20 bg-white/[0.06] text-white focus:outline-none focus:border-neon-fuchsia focus:ring-1 focus:ring-neon-fuchsia transition-all"
                     placeholder="----"
                     required
                     autoFocus
                   />
                </div>
                
                <button type="submit" className="w-full py-3.5 px-4 bg-gradient-to-r from-neon-purple to-neon-fuchsia hover:opacity-95 text-white rounded-xl font-bold text-sm shadow-neon-purple transform transition-all active:scale-95">
                  Verify & Select Role →
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full mt-2.5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                  ← Back to phone/email
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Register as Citizen, NGO, or Company */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1 text-center">Select Profile Role</h2>
              <p className="text-xs text-slate-400 text-center mb-4">
                Choose how you want to participate in the civic platform
              </p>

              <div className="space-y-2.5 mb-5">
                <div 
                  onClick={() => setSelectedRole('citizen')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedRole === 'citizen'
                      ? 'border-neon-purple bg-neon-purple/[0.12] shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-neon-purple/20 text-neon-purple flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs">Citizen / Volunteer</h3>
                    <p className="text-[11px] text-slate-400">Report local problems, vote & volunteer</p>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedRole('ngo')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedRole === 'ngo'
                      ? 'border-emerald-500 bg-emerald-500/[0.12] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs">NGO / Civil Society</h3>
                    <p className="text-[11px] text-slate-400">Mobilize ground execution & verify solutions</p>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedRole('company')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedRole === 'company'
                      ? 'border-neon-cyan bg-neon-cyan/[0.12] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-neon-cyan/20 text-neon-cyan flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs">Company / CSR Sponsor</h3>
                    <p className="text-[11px] text-slate-400">Fund civic projects & track ESG impact</p>
                  </div>
                </div>
              </div>
              
              <button onClick={handleComplete} className="w-full py-3.5 px-4 bg-gradient-to-r from-neon-purple to-neon-fuchsia hover:opacity-95 text-white rounded-xl font-bold text-sm shadow-neon-purple transform transition-all active:scale-95">
                Launch Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
