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
    <div className="flex-1 flex flex-col items-center justify-center min-h-[640px] px-4 py-8 relative overflow-hidden bg-slate-50">
      {/* Subtle soft ambient light glow */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-orange-500/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-600 shadow-md mb-3 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-white shadow-sm"></span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Samadhan<span className="text-teal-600">.AI</span>
          </h1>
          <p className="text-slate-600 mt-1 text-xs">Crowdsource society challenges with verified AI impact</p>
        </div>

        {/* Pure White Card Container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl relative">
          
          {/* Step 1: Input method */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 text-center">Citizen Sign In</h2>
              <p className="text-xs text-slate-600 text-center mb-5">Sign in or register to join the civic network</p>
              
              <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-2xl mb-5">
                <button 
                  onClick={() => setLoginMethod('mobile')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    loginMethod === 'mobile'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📱 Mobile Phone
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    loginMethod === 'email'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ✉️ Gmail / Email
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
                
                <button type="submit" className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transform transition-all active:scale-95">
                  Send {loginMethod === 'mobile' ? 'SMS OTP' : 'Verification Code'} →
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => onLogin('citizen')}
                  className="text-xs text-slate-500 hover:text-teal-700 transition-colors font-semibold"
                >
                  Skip login and explore as Guest →
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
                
                <button type="submit" className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transform transition-all active:scale-95">
                  Verify & Select Role →
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full mt-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                  ← Back to phone/email
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
                <div 
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Citizen / Volunteer</h3>
                    <p className="text-[11px] text-slate-600">Report local problems, vote & volunteer</p>
                  </div>
                </div>

                <div 
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">NGO / Civil Society</h3>
                    <p className="text-[11px] text-slate-600">Mobilize ground execution & verify solutions</p>
                  </div>
                </div>

                <div 
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Company / CSR Sponsor</h3>
                    <p className="text-[11px] text-slate-600">Fund civic projects & track ESG impact</p>
                  </div>
                </div>
              </div>
              
              <button onClick={handleComplete} className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transform transition-all active:scale-95">
                Launch Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
