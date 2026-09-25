import React from 'react';
import { motion } from 'motion/react';
import { playRelayClick, playSparkSound } from '../utils/soundEffects';

interface LightningButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
}

export const LightningButton: React.FC<LightningButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  id,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (variant === 'primary' || variant === 'glow') {
      playSparkSound();
    } else {
      playRelayClick();
    }
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-5 py-2.5 text-sm font-bold gap-2',
    lg: 'px-7 py-3.5 text-base font-extrabold gap-2.5',
  };

  let variantStyles = '';

  if (variant === 'primary') {
    variantStyles =
      'bg-gradient-to-r from-[#FF6B00] via-[#FF851A] to-[#FF5500] text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.7)] border border-[#FFA040]/50';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-[#0C2454] hover:bg-[#123377] text-white border border-[#2A5AB0] shadow-[0_0_15px_rgba(12,36,84,0.5)]';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-transparent hover:bg-[#FF6B00]/10 text-slate-200 hover:text-white border border-slate-700 hover:border-[#FF6B00] transition-colors';
  } else if (variant === 'glow') {
    variantStyles =
      'bg-[#061838] text-[#00E5FF] border border-[#00E5FF]/60 hover:bg-[#00E5FF]/10 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]';
  }

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`relative group inline-flex items-center justify-center font-display tracking-wider uppercase rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none overflow-hidden ${sizeClasses[size]} ${variantStyles} ${className}`}
    >
      {/* Animated subtle electrical scan line on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};
