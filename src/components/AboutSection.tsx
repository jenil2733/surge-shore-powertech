import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Zap, 
  Award, 
  Users, 
  Clock, 
  ShieldCheck, 
  Target, 
  Compass, 
  Sparkles,
  Factory,
  Wheat,
  Fan,
  Droplets,
  Fuel,
  Utensils,
  SunMedium,
  Flame,
  ArrowRight,
  ChevronRight,
  Shield,
  Layers,
  Cpu,
  Gauge
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface AboutSectionProps {
  onOpenContact: () => void;
}

// Smooth Animated Number Counter Component
interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  suffix = '+',
  prefix = '',
  duration = 2000,
  label,
  sublabel,
  icon
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#FF6B00]/10 via-[#0B2559]/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-[#0B2559]/5 border border-[#0B2559]/10 text-[#0B2559] flex items-center justify-center group-hover:bg-[#0B2559] group-hover:text-white transition-all duration-300 shadow-xs">
          {icon}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
          {sublabel}
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-black text-[#0B2559] font-display tracking-tight">
          {prefix}{count}{suffix}
        </span>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
        {label}
      </p>
    </motion.div>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  // Industries list directly from PDF Brochure page 3
  const brochureIndustries = [
    { name: 'Manufacturing', icon: <Factory className="w-5 h-5" />, desc: 'CNCs, Lathes, Machine Tools & Automation' },
    { name: 'Agriculture', icon: <Wheat className="w-5 h-5" />, desc: 'Pumping Sets, Grain Mills & Irrigation' },
    { name: 'HVAC & Ventilation', icon: <Fan className="w-5 h-5" />, desc: 'Industrial Blowers, Cooling Towers & AHU' },
    { name: 'Water Treatment', icon: <Droplets className="w-5 h-5" />, desc: 'Effluent Aerators, RO Pumps & Agitators' },
    { name: 'Oil and Gas', icon: <Fuel className="w-5 h-5" />, desc: 'Refinery Process Pumps & Fuel Transfer' },
    { name: 'Food Processing', icon: <Utensils className="w-5 h-5" />, desc: 'Sanitary Mixers, Dairy Lines & Conveyors' },
    { name: 'Renewable Energy', icon: <SunMedium className="w-5 h-5" />, desc: 'Solar Pump Drives & Biomass Systems' },
    { name: 'Heat Treatment', icon: <Flame className="w-5 h-5" />, desc: 'Furnace Blowers & Quenching Circulation' },
  ];

  // Key engineering pillars
  const engineeringPillars = [
    { 
      title: 'Since 2020 Legacy', 
      desc: 'Proven industrial electric motor & automation manufacturing excellence in Rajkot.',
      icon: <Clock className="w-5 h-5 text-[#FF6B00]" />
    },
    { 
      title: '100% Electrolytic Copper', 
      desc: 'Dual-coated copper winding wire with Class F (155°C) thermal margin endurance.',
      icon: <Zap className="w-5 h-5 text-[#FF6B00]" />
    },
    { 
      title: '100% In-House Testing', 
      desc: 'Strict routine High Voltage (2kV), locked rotor, and dynamic balancing verification on all units.',
      icon: <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
    },
    { 
      title: 'Precision CNC Machining', 
      desc: 'EN8E steel shafts, pre-packed shielded bearings, and rigid cast iron housings.',
      icon: <Cpu className="w-5 h-5 text-[#FF6B00]" />
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-3 sm:px-8 bg-slate-50 border-b border-slate-200 overflow-hidden relative">
      {/* Background Subtle Hex Pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#0B2559_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20 relative z-10">
        
        {/* =========================================================
            1. SECTION HEADER (Corporate Presentation)
           ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0B2559]/10 text-[#0B2559] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Company Profile & Engineering Legacy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2559] tracking-tight font-display">
            POWERING INDUSTRY <br className="hidden sm:inline" />
            <span className="text-[#FF6B00]">DRIVING PERFORMANCE</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Headquartered in Rajkot, Gujarat, Surge Shore Powertech LLP manufactures high-efficiency 
            electric induction motors, coolant pumps, and automation systems trusted across major industrial hubs.
          </p>
        </motion.div>

        {/* =========================================================
            2. ANIMATED KEY PERFORMANCE COUNTERS GRID (Brochure Page 2)
           ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatedCounter
            target={6}
            suffix="+"
            sublabel="SINCE 2020"
            label="Years of Industry Experience"
            icon={<Clock className="w-5 h-5 text-[#FF6B00]" />}
          />
          <AnimatedCounter
            target={20}
            suffix="+"
            sublabel="TECHNICAL TEAM"
            label="Employees & Engineers"
            icon={<Users className="w-5 h-5 text-[#FF6B00]" />}
          />
          <AnimatedCounter
            target={125}
            suffix="+"
            sublabel="CLIENTS"
            label="Satisfied Industrial Clients"
            icon={<Award className="w-5 h-5 text-[#FF6B00]" />}
          />
          <AnimatedCounter
            target={100}
            suffix="%"
            sublabel="IS 325 / 996"
            label="Routine Factory Tested"
            icon={<ShieldCheck className="w-5 h-5 text-[#FF6B00]" />}
          />
        </div>

        {/* =========================================================
            3. CORE PHILOSOPHY BANNER
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B2559] via-[#0E347A] to-[#0B2559] text-white shadow-xl border border-blue-900/50 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8"
        >
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center lg:text-left z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FF6B00] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Driving Philosophy</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold font-display text-white tracking-tight">
              “We believe that Innovation is the driving force behind progress.”
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Surge Shore Manufacturing Standard — Delivering precision-engineered 1-Phase & 3-Phase motors built to conquer demanding continuous duty cycles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenContact}
              className="min-h-[44px] w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E56000] text-white text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Partner With Factory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* =========================================================
            4. COMPANY PROFILE & EXECUTIVE OVERVIEW (Full Showcase Grid)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-5 sm:space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#FF6B00]">
                <Clock className="w-4 h-4" />
                <span>Since 2020 Legacy</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-[#0B2559] font-display">
                A Leading Manufacturer of High-Quality Pumps and Motors
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Surge Shore Powertech LLP</strong> is a premier engineering concern specializing in the design, tooling, and mass fabrication of high-torque, energy-efficient electric induction motors and industrial pumps.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                With a legacy of manufacturing excellence since <strong>2020</strong>, we have established ourselves as a trusted partner in the machinery manufacturing ecosystem. Our commitment to <strong>continuous innovation, precision CNC engineering, and uncompromising customer satisfaction</strong> makes us the preferred OEM vendor for machine builders across Gujarat and all over India.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
              {engineeringPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-[#0B2559]/30 hover:bg-slate-100/70 transition-all flex items-start gap-3"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0B2559]">{pillar.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Digital Visiting Card & Headquarters Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#0B2559] via-[#0F3277] to-[#081A3E] text-white rounded-3xl p-5 sm:p-8 shadow-xl border border-[#214ea3] relative overflow-hidden flex flex-col justify-between space-y-5 sm:space-y-6">
              {/* Top Card Bar */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Company Card
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#FF6B00]/20 text-[#FF6B00] px-2.5 py-1 rounded-full font-bold border border-[#FF6B00]/30 shadow-xs">
                  Official Profile
                </span>
              </div>

              {/* Middle Info */}
              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="text-base sm:text-lg font-bold font-display text-white">
                  SURGE SHORE POWERTECH LLP
                </h4>
                <p className="text-[11px] sm:text-xs text-[#FF6B00] font-medium font-mono uppercase tracking-wider">
                  Industrial Motors • Coolant Pumps • Custom Automation
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Precision engineered in the industrial capital of Saurashtra — Rajkot, Gujarat. Built according to Indian & International BIS standards.
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-3 text-xs text-slate-200 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-mono">DIRECT FACTORY LINE</span>
                    <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="font-mono font-bold hover:text-white transition-colors block truncate">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-mono">OFFICIAL INQUIRY EMAIL</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="font-medium hover:text-white transition-colors block truncate">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">MANUFACTURING WORKS</span>
                    <span className="text-[11px] text-slate-300 leading-snug">{COMPANY_INFO.address}</span>
                  </div>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300 font-mono">
                <span>Rajkot, Gujarat</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  IS 325 Certified
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            5. VISION & MISSION CARDS (Direct Side-by-Side Architectural Presentation)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0B2559] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Compass className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#FF6B00] px-3 py-1 bg-[#FF6B00]/10 rounded-full">
                  Strategic Horizon
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[#0B2559] font-display">
                  Our Vision
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">PURSUIT OF CONTINUOUS INNOVATION</p>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-700 font-medium italic border-l-4 border-[#FF6B00] pl-4 py-1 leading-relaxed bg-slate-50 rounded-r-xl">
                “We believe that innovation is the driving force behind progress. We are dedicated to pushing the boundaries of what's possible, continually seeking new solutions, and embracing change with open arms.”
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We envision being the benchmark manufacturer for ultra-reliable electric drives, setting industry standards in thermal endurance, rotor balancing, and magnetic core optimization.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0B2559]">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span>Next-Gen Electromagnetic Stator Geometries</span>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0B2559] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Target className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#0B2559] px-3 py-1 bg-[#0B2559]/10 rounded-full">
                  Engineering Mission
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[#0B2559] font-display">
                  Our Mission
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">PRECISION • EFFICIENCY • CLIENT PARTNERSHIP</p>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-700 font-medium italic border-l-4 border-[#0B2559] pl-4 py-1 leading-relaxed bg-slate-50 rounded-r-xl">
                “Our mission is to design and produce the most efficient & reliable 1 Phase & 3 Phase Induction motors in the industry. We are dedicated to driving technological advancements, promoting sustainability & serving unique needs of clients.”
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-[#0B2559] block font-bold">1. Efficiency</strong>
                  <span className="text-[11px] text-slate-500">Low Watt-loss CRNO silicon stampings.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-[#0B2559] block font-bold">2. S1 Duty Cycle</strong>
                  <span className="text-[11px] text-slate-500">Continuous 24/7 industrial loading.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-[#0B2559] block font-bold">3. OEM Custom</strong>
                  <span className="text-[11px] text-slate-500">Tailored shafts, flanges & windings.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0B2559]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Commitment to Plant Uptime & Safety</span>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            6. INDUSTRIES WE SERVED (8 Major Domain Visual Grid)
           ========================================================= */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold font-mono uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Brochure Application Matrix</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2559] font-display">
              INDUSTRIES WE SERVE
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Supplying custom-built electric drives and control infrastructure across 8+ major industrial domains across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {brochureIndustries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#FF6B00] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#0B2559]/5 text-[#0B2559] group-hover:bg-[#0B2559] group-hover:text-[#FF6B00] flex items-center justify-center transition-all duration-300 shadow-xs">
                    {ind.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#FF6B00] transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#0B2559] font-display group-hover:text-[#FF6B00] transition-colors">
                    {ind.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
