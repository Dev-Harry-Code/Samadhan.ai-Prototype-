import React from 'react';

export const CivicProjectBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Civic Infrastructure & Community Society Challenges Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" 
        alt="Civic Society Infrastructure" 
        className="w-full h-full object-cover object-center scale-105 filter blur-[0.5px] opacity-25"
      />
      {/* Frosted Daylight Gradient Overlay for Maximum Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white/80 to-slate-50/95 backdrop-blur-[1.5px]"></div>
      
      {/* Soft Ambient Light Glow Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-teal-500/15 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-500/15 rounded-full blur-[100px]"></div>
    </div>
  );
};
