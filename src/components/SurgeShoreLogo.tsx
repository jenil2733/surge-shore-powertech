import React from 'react';
import logoPng from '../assets/images/surge-shore-logo.png';
import emblemPng from '../assets/images/surge-shore-emblem.png';

interface LogoProps {
  variant?: 'full' | 'icon' | 'responsive' | 'horizontal' | 'compact' | 'stacked';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  theme?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export const SurgeShoreLogo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'light',
  className = '',
}) => {
  const heightClasses = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-18',
    '2xl': 'h-20 sm:h-24',
  };

  const emblemHeightClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10 sm:h-11 sm:w-11',
    lg: 'h-12 w-12 sm:h-14 sm:w-14',
    xl: 'h-16 w-16 sm:h-18 sm:w-18',
    '2xl': 'h-20 w-20 sm:h-24 sm:w-24',
  };

  const selectedHeight = heightClasses[size] || heightClasses.md;
  const selectedEmblemHeight = emblemHeightClasses[size] || emblemHeightClasses.md;

  // Sub-logo (Emblem) with suitable background
  if (variant === 'icon' || variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center justify-center p-1.5 rounded-xl transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-800/80 border border-slate-700/60 shadow-xs'
            : 'bg-white/90 border border-slate-200/80 shadow-xs'
        } ${className}`}
      >
        <img
          src={emblemPng}
          alt="Surge Shore Emblem"
          className={`${selectedEmblemHeight} object-contain select-none`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Responsive mode: shows sub-logo on compact mobile screens, full logo on sm+
  if (variant === 'responsive') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        {/* Mobile Sub-logo (Emblem) */}
        <div className="flex sm:hidden items-center justify-center p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <img
            src={emblemPng}
            alt="Surge Shore Emblem"
            className={`${selectedEmblemHeight} object-contain`}
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Desktop / Tablet Full Logo */}
        <img
          src={theme === 'dark' ? '/surge-shore-logo-white.png' : logoPng}
          alt="Surge Shore Powertech LLP"
          className={`hidden sm:block ${selectedHeight} w-auto object-contain`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Full Logo (Default)
  return (
    <img
      src={theme === 'dark' ? '/surge-shore-logo-white.png' : logoPng}
      alt="Surge Shore Powertech LLP"
      className={`${selectedHeight} w-auto object-contain select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};
