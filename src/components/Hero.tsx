import React from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  Building2
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_DATA } from '../data/products';
import { ProductItem } from '../types';
import { Motor3DCanvas } from './Motor3DCanvas';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenContact: () => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenContact,
  onSelectProduct,
}) => {
  const keyBadges = [
    { label: '100% Pure Copper Winding', desc: 'Electrolytic Class F (155°C)' },
    { label: 'Heavy Cast Iron & Aluminium', desc: 'Minimal Vibration & Fast Cooling' },
    { label: 'Continuous Duty S1 Rated', desc: 'Engineered for 24/7 Factory Shifts' },
    { label: 'Rajkot Gujarat Hub', desc: 'Direct Manufacturer Pricing & Supply' },
  ];

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-3 sm:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 technical-grid border-b border-slate-200 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-10">
        {/* Main Grid: Value Proposition + 3D 360 Motor Studio Model */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          {/* Left Column: Corporate Heading, Value Proposition & Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-5 text-left relative z-20 pointer-events-auto w-full"
          >
            {/* Verification pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#00205B]/5 border border-[#00205B]/15 text-[#00205B] text-[10.5px] sm:text-xs font-bold font-mono uppercase tracking-wider shadow-xs min-w-0"
            >
              <Building2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
              <span className="truncate max-w-[260px] sm:max-w-none">Surge Shore Powertech LLP • Rajkot</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl xl:text-[2.6rem] font-black text-[#0B2559] tracking-tight leading-[1.2] font-display"
            >
              INDUSTRIAL MOTORS, VIBRATOR MOTORS, <br className="hidden sm:inline" />
              STABILIZERS & <span className="text-[#FF6B00]">ELECTRICAL AUTOMATION</span>
            </motion.h1>

            {/* Descriptive Body */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed max-w-xl font-normal"
            >
              Direct manufacturer of high-efficiency <strong>1-Phase & 3-Phase Induction Motors</strong>, heavy-duty <strong>Vibrator Motors</strong>, 
              precision <strong>Servo Voltage Stabilizers</strong>, <strong>Coolant & Self-Priming Pumps</strong>, and <strong>Custom Electrical Automation Panels</strong>.
            </motion.p>

            {/* Key Quality Pillars Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1"
            >
              {keyBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#FF6B00]/40 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#0B2559] truncate">{badge.label}</div>
                    <div className="text-[10.5px] text-slate-500 line-clamp-1">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Direct Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full"
            >
              {/* Primary CTA: Products & Catalog */}
              <button
                onClick={onExploreCatalog}
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-[#0B2559] hover:bg-[#123887] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] group"
              >
                <Layers className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Explore Products Catalog</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Secondary CTA: Quick Factory Quote */}
              <button
                onClick={onOpenContact}
                className="min-h-[48px] px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0B2559] border border-slate-300 hover:border-slate-400 text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Request Custom Quote</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive 3D 360° Real-Time Motor Studio */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-center relative z-10 overflow-visible w-full"
          >
            <div className="w-full overflow-visible">
              <Motor3DCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
