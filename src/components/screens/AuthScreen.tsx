import React, { useState } from 'react';
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
            <Sparkles className="w-8 h-8 text-white" />
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
                
                <button type="submit" className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>Send {loginMethod === 'mobile' ? 'SMS OTP' : 'Verification Code'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => onLogin('citizen')}
                  className="text-xs text-slate-500 hover:text-teal-700 transition-colors font-semibold flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Skip login and explore as Guest</span>
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
                
                <button type="submit" className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transform transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>Verify & Select Role</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
                    <User className="w-4 h-4" />
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
                    <Shield className="w-4 h-4" />
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
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Company / CSR Sponsor</h3>
                    <p className="text-[11px] text-slate-600">Fund civic projects & track ESG impact</p>
                  </div>
                </div>
              </div>
              
              <button onClick={handleComplete} className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transform transition-all active:scale-95 flex items-center justify-center gap-2">
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
