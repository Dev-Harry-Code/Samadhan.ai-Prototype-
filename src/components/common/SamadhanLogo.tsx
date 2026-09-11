import React from 'react';

interface SamadhanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  horizontal?: boolean;
}

export const SamadhanLogoIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 48, 
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
    >
      {/* 1. Academic Mortarboard Cap (Top) */}
      {/* Cap Diamond */}
      <polygon 
        points="50,11 86,22 50,33 14,22" 
        fill="#0D9488" 
      />
      {/* Under-cap Skull Arc */}
      <path 
        d="M 28,27.5 L 28,34 C 28,40 72,40 72,34 L 72,27.5" 
        fill="#0B7268" 
      />
      {/* Cap Center Button */}
      <circle cx="50" cy="22" r="2.2" fill="#09534B" />
      {/* Tassel String & Orange Accent Tassel */}
      <path 
        d="M 50,22 Q 74,23 74,32" 
        stroke="#F97316" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      <circle cx="74" cy="33.5" r="2.5" fill="#F97316" />

      {/* 2. Three Circular Heads of Community */}
      {/* Left Citizen (Light Mint Teal) */}
      <circle cx="32" cy="46" r="6.8" fill="#5EEAD4" />

      {/* Center Citizen (Deep Teal) */}
      <circle cx="50" cy="42" r="7.5" fill="#0D9488" />

      {/* Right Citizen (Energetic Warm Orange) */}
      <circle cx="68" cy="46" r="6.8" fill="#F97316" />

      {/* 3. Uplifting Petals / Open Book / Figures' Bodies (Sprouting Leaves) */}
      {/* Center Upright Sprout */}
      <path
        d="M 50,52 C 45.5,58 44,70 50,86 C 56,70 54.5,58 50,52 Z"
        fill="#0D9488"
      />

      {/* Left Center Wing */}
      <path
        d="M 44,57 C 38,62 38,72 48,84 C 42,75 40,64 44,57 Z"
        fill="#0F766E"
      />

      {/* Right Center Wing */}
      <path
        d="M 56,57 C 62,62 62,72 52,84 C 58,75 60,64 56,57 Z"
        fill="#0F766E"
      />

      {/* Outer Left Leaf / Sprout Body */}
      <path
        d="M 23,56 C 26,67 36,80 47,87 C 37,81 29,71 23,56 Z"
        fill="#0D9488"
      />

      {/* Outer Right Leaf / Sprout Body */}
      <path
        d="M 77,56 C 74,67 64,80 53,87 C 63,81 71,71 77,56 Z"
        fill="#0D9488"
      />

      {/* Foundation Base Ground Curve */}
      <path
        d="M 38,89 C 45,92 55,92 62,89"
        stroke="#0B7268"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const SamadhanLogo: React.FC<SamadhanLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = true,
  className = '',
  horizontal = false,
}) => {
  const iconSizes = {
    sm: 36,
    md: 52,
    lg: 72,
    xl: 96,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-xs sm:text-sm',
    lg: 'text-sm sm:text-base',
    xl: 'text-base sm:text-lg',
  };

  const iconPx = iconSizes[size];

  if (horizontal) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <SamadhanLogoIcon size={iconPx} />
        {showText && (
          <div className="flex flex-col">
            <h2 className={`${textSizes[size]} font-black tracking-tight text-slate-900 leading-none`}>
              Samadhan<span className="text-teal-600">.ai</span>
            </h2>
            {showTagline && (
              <p className={`${taglineSizes[size]} text-teal-700 font-medium tracking-wide mt-1`}>
                Together for a Better Tomorrow
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <SamadhanLogoIcon size={iconPx} />
      {showText && (
        <div className="mt-2">
          <h2 className={`${textSizes[size]} font-black tracking-tight text-slate-900 leading-tight`}>
            Samadhan<span className="text-teal-600">.ai</span>
          </h2>
          {showTagline && (
            <p className={`${taglineSizes[size]} text-teal-700 font-semibold tracking-wide mt-0.5`}>
              Together for a Better Tomorrow
            </p>
          )}
        </div>
      )}
    </div>
  );
};
