import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Eye
} from 'lucide-react';
import { playSparkSound, playRelayClick } from '../utils/soundEffects';

export const InteractiveExplorer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'motor' | 'panel'>('motor');
  const [selectedPart, setSelectedPart] = useState<string>('winding');

  const motorParts = [
    {
      id: 'winding',
      name: 'Class "F" Electrolytic Copper Winding',
      subtitle: '99.9% Pure Electrolytic Grade Copper Wire',
      description: 'Double polyurethane coated electrolytic copper wire with vacuum pressure impregnation (VPI). Class F thermal insulation withstands temperatures up to 155°C while operating within Class B temperature rise limit for extended insulation lifespan.',
      specs: [
        { label: 'Insulation Class', value: 'Class F (155°C)' },
        { label: 'Wire Purity', value: '99.9% Electrolytic Copper' },
        { label: 'Varnish Type', value: 'High Dielectric Solventless Resin' },
        { label: 'Dielectric Strength', value: '> 2.5 kV Breakdown Test' },
      ],
    },
    {
      id: 'stator',
      name: 'CRNO Electrical Silicon Steel Stator',
      subtitle: 'Cold-Rolled Non-Grain Oriented Laminations',
      description: 'Precision progressive die-stamped laminations with low core loss (W/kg). Inter-lamination insulation minimizes eddy currents and hysteresis loss, elevating electrical efficiency to IE2/IE3 performance standards.',
      specs: [
        { label: 'Steel Grade', value: 'High Permeability CRNO Steel' },
        { label: 'Lamination Thickness', value: '0.50 mm Stamped Sheets' },
        { label: 'Stacking Process', value: 'Hydraulic Auto-Indexing Clamp' },
        { label: 'Eddy Loss Factor', value: 'Ultra-low Core Loss' },
      ],
    },
    {
      id: 'shaft',
      name: 'EN8E High-Tensile Steel Rotor Shaft',
      subtitle: 'Precision Ground Alloy Steel with Keyway',
      description: 'Machined from hardened EN8E steel, ultrasonically tested for micro-defects, and dynamically balanced to ISO 1940 Grade G2.5 for whisper-quiet vibration-free operation at full load.',
      specs: [
        { label: 'Material Grade', value: 'EN8E (Carbon Alloy Steel)' },
        { label: 'Dynamic Balance', value: 'ISO 1940 Grade G2.5' },
        { label: 'Concentricity Runout', value: '< 0.005 mm Precision' },
        { label: 'Keyway Milling', value: 'IS 2048 Standard Tolerances' },
      ],
    },
    {
      id: 'bearings',
      name: 'Shielded Deep-Groove Bearings',
      subtitle: 'Pre-Lubricated High-Speed Bearings',
      description: 'Fitted with 2Z/2RS shielded deep groove ball bearings pre-packed with high temperature polyurea synthetic grease, providing up to 40,000 continuous operating hours without maintenance.',
      specs: [
        { label: 'Bearing Type', value: '6200 / 6300 Deep Groove Series' },
        { label: 'Lubricant Life', value: 'Synthetic Polyurea Grease (-30°C to +160°C)' },
        { label: 'Radial Clearance', value: 'C3 Internal Clearance' },
        { label: 'Dust Protection', value: 'Dual Contact Rubber/Steel Seals' },
      ],
    },
    {
      id: 'housing',
      name: 'Heavy-Duty Cast Iron / Aluminium Frame',
      subtitle: 'TEFC Aerodynamic Cooling Enclosure',
      description: 'Engineered with optimal external cooling ribs for fast convective thermal dissipation. IP55 protected terminal box with multi-directional entry gland plates and dual external ground bolts.',
      specs: [
        { label: 'Ingress Protection', value: 'IP55 Standard (Dust & Water Jet)' },
        { label: 'Cooling Method', value: 'IC411 (TEFC Surface Cooled)' },
        { label: 'Casing Options', value: 'Cast Iron (FG200) or Die-Cast Al' },
        { label: 'Coating Finish', value: 'Anti-corrosion Polyurethane Enamel' },
      ],
    },
  ];

  const panelParts = [
    {
      id: 'apfc',
      name: 'APFC Intelligent Power Factor Controller',
      subtitle: 'Microprocessor Controlled Multi-Step Capacitor Switching',
      description: 'Continuously measures load inductive current and automatically triggers heavy-duty MPP capacitors via harmonic-rated detuned reactors to maintain PF > 0.99, eliminating utility penalties.',
      specs: [
        { label: 'Target Power Factor', value: '0.99 Lagging to Unity' },
        { label: 'Step Switching', value: '6 / 8 / 12 / 16 Step Auto Stages' },
        { label: 'Capacitor Tech', value: 'Self-Healing Heavy Duty MPP Cells' },
        { label: 'Reactor Rating', value: '7% / 14% Detuned Harmonic Filters' },
      ],
    },
    {
      id: 'busbars',
      name: 'Electrolytic Grade Copper Busbars',
      subtitle: 'Heat-Shrink Insulated Phase Color Coded Distribution',
      description: 'Sized for continuous full-load ampacity and 50kA short-circuit withstand capacity. Insulated with fire-retardant cross-linked polyolefin heat shrink sleeves with phase colored RYB indicator bands.',
      specs: [
        { label: 'Busbar Material', value: '99.9% Electrolytic ETP Copper' },
        { label: 'Short Circuit Rating', value: '50 kA for 1 Second (IS 8623)' },
        { label: 'Sleeve Insulation', value: '1.1 kV Grade Heat-Shrink Polyolefin' },
        { label: 'Joint Plating', value: 'Silver / Tin Plated Contact Faces' },
      ],
    },
    {
      id: 'vfd',
      name: 'Variable Frequency Drive (VFD) Inverter System',
      subtitle: 'Dynamic Speed & Torque Precision Automation',
      description: 'Integrated Schneider, ABB, or Siemens industrial drives featuring sensorless vector control, electronic thermal overload, DC dynamic braking units, and RS-485 Modbus telemetry.',
      specs: [
        { label: 'Control Method', value: 'Sensorless Flux Vector Control' },
        { label: 'Overload Capacity', value: '150% for 60s / 200% for 3s' },
        { label: 'Communications', value: 'Modbus RTU, Ethernet/IP, Profinet' },
        { label: 'Harmonic Compliance', value: 'Built-in DC Choke & EMC Filter' },
      ],
    },
    {
      id: 'enclosure',
      name: 'CRCA 14/16 Gauge Sheet Steel Enclosure',
      subtitle: '7-Tank Phosphated & Epoxy Powder Coated Body',
      description: 'Modular compartmentalized Form 3b/4b design fabricated on CNC turret punch presses. Gasketed doors provide IP54/IP55 ingress seal with concealed hinges and 3-point cam lock mechanisms.',
      specs: [
        { label: 'Sheet Thickness', value: '2.0 mm (14G) Frame / 1.6 mm (16G) Doors' },
        { label: 'Pre-Treatment', value: '7-Tank Chemical Hot Degreasing & Zinc' },
        { label: 'Powder Coat Color', value: 'RAL 7032 / RAL 7035 Structured Finish' },
        { label: 'Gasket Material', value: 'Neoprene / EPDM Continuous Seal' },
      ],
    },
  ];

  const currentList = activeMode === 'motor' ? motorParts : panelParts;
  const currentPartData = currentList.find((p) => p.id === selectedPart) || currentList[0];

  return (
    <section id="interactive-teardown" className="py-24 px-4 sm:px-8 relative circuit-grid-dense overflow-hidden bg-[#030917]">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2559] border border-[#204ca0] text-[#00E5FF] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Interactive Engineering Teardown</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            PRECISION ANATOMY & <br />
            <span className="text-[#FF6B00]">INTERNAL ARCHITECTURE</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4">
            Explore what lies beneath the surface of Surge Shore induction motors and automated electrical panels. 
            Click components below to inspect materials, thermal ratings, and manufacturing standards.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex rounded-2xl bg-[#061533] p-1.5 border border-[#163a82] mt-6 shadow-xl">
            <button
              onClick={() => {
                setActiveMode('motor');
                setSelectedPart('winding');
                playRelayClick();
              }}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-display uppercase tracking-wider transition-all cursor-pointer ${
                activeMode === 'motor'
                  ? 'bg-[#FF6B00] text-white shadow-[0_0_20px_rgba(255,107,0,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Induction Motor Anatomy
            </button>
            <button
              onClick={() => {
                setActiveMode('panel');
                setSelectedPart('apfc');
                playRelayClick();
              }}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-display uppercase tracking-wider transition-all cursor-pointer ${
                activeMode === 'panel'
                  ? 'bg-[#00E5FF] text-[#030917] font-extrabold shadow-[0_0_20px_rgba(0,229,255,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Electrical Panel Anatomy
            </button>
          </div>
        </div>

        {/* Interactive Teardown Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Component Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {currentList.map((part) => {
              const isSelected = selectedPart === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => {
                    setSelectedPart(part.id);
                    playSparkSound();
                  }}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0B2559] to-[#07193b] border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.3)]'
                      : 'bg-[#061533]/80 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-[#061533]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${isSelected ? 'bg-[#FF6B00] animate-ping' : 'bg-slate-600'}`} />
                      <h4 className={`text-sm font-bold font-display tracking-wide ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {part.name}
                      </h4>
                    </div>
                    {isSelected && <Sparkles className="w-4 h-4 text-[#00E5FF]" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 pl-6">
                    {part.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Engineering Spec Card with Live Schematic Highlights */}
          <div className="lg:col-span-7 bg-[#061533] rounded-3xl border-2 border-[#163a82] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPartData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2559] text-[#00E5FF] text-xs font-mono font-bold uppercase mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Industrial Build Quality</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {currentPartData.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mt-1">
                    {currentPartData.subtitle}
                  </p>
                </div>

                {/* Description Body */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentPartData.description}
                </p>

                {/* Technical Metric Spec Grid */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-display">
                    Quality Benchmarks & Laboratory Test Ratings:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentPartData.specs.map((sp, idx) => (
                      <div
                        key={idx}
                        className="bg-[#030917] p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between"
                      >
                        <span className="text-[11px] text-slate-400 block mb-1">
                          {sp.label}
                        </span>
                        <span className="text-sm font-bold text-[#00E5FF] font-mono">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Guarantee Banner */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Quality Checked before dispatch</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                Rajkot Manufacturing Unit
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
