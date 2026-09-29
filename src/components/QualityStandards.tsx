import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Flame, 
  Gauge, 
  Shield, 
  Award, 
  Check, 
  Cpu, 
  Layers
} from 'lucide-react';
import { useIsMobile } from '../utils/animations';

export const QualityStandards: React.FC = () => {
  const isMobile = useIsMobile();
  const dur = isMobile ? 0.22 : 0.32;
  const yShift = isMobile ? 8 : 16;
  // 4 Industrial Testing Stages
  const testingStages = [
    {
      step: '01',
      tag: 'DIELECTRIC BREAKDOWN TEST',
      title: 'High-Pot Insulation Breakdown Test',
      standard: 'IS 325 / IEC 60034 Mandate',
      highlight: '2.0 kV AC Flash Test',
      desc: 'Stator windings are subjected to 2,000V high-potential testing to guarantee complete breakdown resistance, eliminate pinhole defects, and verify zero leakage current.',
      icon: <Zap className="w-6 h-6 text-[#FF6B00]" />,
      checks: [
        '2.0 kV AC dielectric flash breakdown verification',
        'Class F (155°C) slot & phase barrier insulation integrity',
        'Zero leakage current automated sensor pass'
      ]
    },
    {
      step: '02',
      tag: 'DYNAMIC VIBRATION ANALYSIS',
      title: 'Precision Dynamic Rotor Balancing',
      standard: 'ISO 1940 Grade G2.5 Rigor',
      highlight: 'Dual-Plane Dynamic Calibration',
      desc: 'Precision computerized dual-plane balancing eliminates micro-eccentricities, suppresses noise (<65 dB), and multiplies drive bearing life under continuous factory load.',
      icon: <Activity className="w-6 h-6 text-[#FF6B00]" />,
      checks: [
        'Computerized dual-plane dynamic balancing algorithm',
        'Calibrated to ISO 1940 Grade G2.5 strict tolerance',
        'Sub-micron radial runout and axial play validation'
      ]
    },
    {
      step: '03',
      tag: 'ELECTRICAL TORQUE & FLUX',
      title: 'No-Load & Locked Rotor Profiling',
      standard: 'Starting Current & PF Verification',
      highlight: 'Multi-Phase Power Analyser',
      desc: 'Comprehensive electrical diagnostics check locked-rotor torque curve, start-to-run current ratios, magnetic flux symmetry across 3 phases, and power factor efficiency.',
      icon: <Gauge className="w-6 h-6 text-[#FF6B00]" />,
      checks: [
        'Phase current balance (deviation strictly ≤ 2%)',
        'Breakdown torque and starting pull-up verification',
        'Locked rotor thermal heating curve compliance'
      ]
    },
    {
      step: '04',
      tag: 'THERMAL ENDURANCE HEAT RUN',
      title: 'Class F Full-Load Heat Run',
      standard: 'Continuous S1 Duty Rating (155°C)',
      highlight: 'Continuous S1 TEFC Heat Soak',
      desc: 'Full continuous load heat soak validates Class F (155°C) copper temperature limits, aerodynamic TEFC fan airflow CFM, and high-ambient 50°C factory stability.',
      icon: <Flame className="w-6 h-6 text-[#FF6B00]" />,
      checks: [
        'Continuous S1 full-load duty temperature soak',
        'Dual-lip IP55 dust & water ingress seal validation',
        'Low temperature rise restricted within Class B limits'
      ]
    },
  ];

  // Official Standards & Compliance Spec Cards
  const complianceStandards = [
    {
      code: 'IS 325 / IEC 60034-1',
      category: 'Three Phase Motors',
      title: 'Standard Specification for 3-Phase Induction Motors',
      points: [
        'Mandated performance, efficiency indices and slip curves',
        'Permissible temperature rise under continuous 415V ±10% variation',
        'Standard mechanical dimensions & frame designations'
      ],
      badge: '3-Phase Standard',
      icon: <Shield className="w-6 h-6 text-emerald-600" />
    },
    {
      code: 'IS 996',
      category: 'Single Phase Motors',
      title: 'Standard Specification for 1-Phase AC Induction Motors',
      points: [
        'Heavy-duty start/run capacitor bank matching',
        'High breakdown and starting torque characteristics',
        'Dynamic balancing for smooth, quiet 230V ±10% domestic & OEM operation'
      ],
      badge: '1-Phase Standard',
      icon: <Cpu className="w-6 h-6 text-blue-600" />
    },
    {
      code: 'IS 12615 / IE2 & IE3',
      category: 'Energy Efficiency',
      title: 'High Efficiency & Low Watt-Loss Stamping Design',
      points: [
        'Non-aging CRNO electrical silicon steel core laminations',
        '100% Electrolytic high-conductivity copper magnet wire',
        'Minimized iron & harmonic losses for sustained power savings'
      ],
      badge: 'Efficiency Class',
      icon: <Award className="w-6 h-6 text-[#FF6B00]" />
    },
    {
      code: 'IS 12065 / IS 12075',
      category: 'Acoustic & Vibration',
      title: 'Permissible Limits of Noise & Vibration Severity',
      points: [
        'Vibration severity calibrated below Grade Normal (ISO 10816)',
        'Low decibel aerodynamic TEFC bi-directional cooling fan',
        'Deep-groove pre-lubricated SKF/equivalent ball bearings'
      ],
      badge: 'Vibration & Sound',
      icon: <Layers className="w-6 h-6 text-amber-600" />
    }
  ];

  return (
    <section id="quality" className="py-16 sm:py-24 px-3 sm:px-8 bg-slate-50 border-b border-slate-200 overflow-hidden relative">
      {/* Subtle Blueprint Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B2559_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        
        {/* =========================================================
            1. SECTION HEADER
           ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: yShift }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "-15px" : "-30px" }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2559]/10 text-[#0B2559] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span>Industrial Quality Framework</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2559] tracking-tight font-display">
            QUALITY ASSURANCE & <span className="text-[#FF6B00]">TESTING RIGOR</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Every motor, pump, and electrical drive produced at our Rajkot manufacturing works undergoes a rigorous 4-stage electrical, thermal, and dynamic inspection protocol compliant with Indian (BIS) and International (IEC) standards.
          </p>
        </motion.div>

        {/* =========================================================
            2. 4-STAGE FACTORY TESTING PROTOCOL (Spacious 2x2 Industrial Grid)
           ========================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider block">
                STAGE-BY-STAGE VALIDATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B2559] font-display mt-1">
                4-Stage In-House Testing Sequence
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Production Tested Before Dispatch</span>
            </div>
          </div>

          {/* 2x2 Grid with Ample Breathing Room */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {testingStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: yShift }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "-15px" : "-30px" }}
                transition={{ duration: dur, delay: isMobile ? 0.02 * (idx % 2) : 0.06 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#FF6B00]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent Watermark / Ambient Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF6B00]/10 via-[#FF6B00]/5 to-transparent rounded-bl-full pointer-events-none" />

                <div className="space-y-6">
                  {/* Top Bar: Large Icon Box on Left, Step Indicator Pill on Right */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Spacious Icon Box */}
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-[#0B2559] text-[#FF6B00] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs shrink-0">
                        {stage.icon}
                      </div>

                      {/* Stage Identifier */}
                      <div>
                        <span className="text-xs font-mono font-extrabold text-[#FF6B00] uppercase tracking-wider block">
                          {stage.tag}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-[#0B2559] font-mono leading-tight">
                          Stage {stage.step}
                        </span>
                      </div>
                    </div>

                    {/* Highlight Spec Badge */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold shrink-0">
                      <span>{stage.highlight}</span>
                    </div>
                  </div>

                  {/* Stage Title and Standard Badge */}
                  <div className="space-y-2.5">
                    <h4 className="text-lg sm:text-xl font-black text-[#0B2559] font-display group-hover:text-[#FF6B00] transition-colors leading-snug">
                      {stage.title}
                    </h4>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0B2559]/5 border border-[#0B2559]/15 text-[#0B2559] text-xs font-mono font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{stage.standard}</span>
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stage.desc}
                  </p>

                  {/* Bullet Checklist with Dedicated Icon Alignment */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {stage.checks.map((c, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700">
                        <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug font-medium">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-800 bg-emerald-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 sm:px-8 py-3 rounded-b-3xl">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    100% In-House Factory Inspection
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-700 text-[11px]">
                    Zero Defect Pass
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================================
            3. BIS & IEC STANDARDS COMPLIANCE (Spacious 4-Grid)
           ========================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider block">
                COMPLIANCE & SPECIFICATIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B2559] font-display mt-1">
                BIS & IEC Standards Compliance
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md sm:text-right">
              Manufactured strictly in accordance with Indian Standards & International Electro-technical Commission guidelines.
            </p>
          </div>

          {/* 4 Standards Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((std, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: yShift }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "-15px" : "-30px" }}
                transition={{ duration: dur, delay: isMobile ? 0.02 * (idx % 2) : 0.05 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon Box and Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {std.icon}
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-[#0B2559]/5 text-[#0B2559] border border-[#0B2559]/15 px-3 py-1 rounded-full">
                      {std.badge}
                    </span>
                  </div>

                  {/* Standard Header */}
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {std.category}
                    </span>
                    <h4 className="text-base font-mono font-black text-[#0B2559] mt-0.5">
                      {std.code}
                    </h4>
                  </div>

                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 font-display leading-snug">
                    {std.title}
                  </h5>

                  <ul className="space-y-2 pt-1 text-xs text-slate-600">
                    {std.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#0B2559] font-mono font-bold">
                  <span>Certified Norm</span>
                  <span className="text-emerald-600">Passed ✓</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================================
            4. MANUFACTURER QA COMMITMENT BANNER
           ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: yShift }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "-15px" : "-30px" }}
          transition={{ duration: dur, delay: isMobile ? 0.03 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-[#0B2559] via-[#0E347A] to-[#0B2559] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-xl font-bold font-display text-white">
                SURGE SHORE POWERTECH QUALITY ASSURANCE & WARRANTY
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Every unit manufactured in our Rajkot works is dynamically balanced to ISO 1940 Grade G2.5, 100% pure electrolytic copper wound, and inspected for full load continuous thermal endurance before customer delivery.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <div className="w-full md:w-auto px-5 py-3.5 bg-[#FF6B00] text-white text-xs sm:text-sm font-bold font-mono rounded-xl shadow-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>IS 325 & IS 996 CERTIFIED</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
