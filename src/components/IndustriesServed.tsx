import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Factory, 
  Wheat, 
  Fan, 
  Droplets, 
  Fuel, 
  Utensils, 
  SunMedium, 
  Flame, 
  Cpu,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { INDUSTRIES_SERVED } from '../data/products';
import { playRelayClick } from '../utils/soundEffects';

interface IndustriesServedProps {
  onSelectIndustry: (industryTitle: string) => void;
}

export const IndustriesServed: React.FC<IndustriesServedProps> = ({
  onSelectIndustry,
}) => {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES_SERVED[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Wheat': return <Wheat className="w-5 h-5" />;
      case 'Fan': return <Fan className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Fuel': return <Fuel className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'SunMedium': return <SunMedium className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const currentIndustry = INDUSTRIES_SERVED.find((i) => i.id === activeId) || INDUSTRIES_SERVED[0];

  return (
    <section id="industries" className="py-24 px-4 sm:px-8 relative bg-[#040e26] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2559] border border-[#204ca0] text-[#00E5FF] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Industrial Reach & Applications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            ENGINEERED FOR <br />
            <span className="text-[#FF6B00]">DIVERSE INDUSTRIAL SECTORS</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4">
            From precision diamond polishing benches in Surat to massive agro-irrigation networks and CNC machine tool manufacturing in Rajkot, Surge Shore delivers uncompromising torque and energy efficiency.
          </p>
        </div>

        {/* Interactive Industry Grid & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Hex-style industry selector cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {INDUSTRIES_SERVED.map((ind) => {
              const isSelected = activeId === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => {
                    setActiveId(ind.id);
                    playRelayClick();
                  }}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between min-h-[120px] group ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#0B2559] to-[#07193b] border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                      : 'bg-[#061533] border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-[#081d45]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl w-fit mb-2 ${isSelected ? 'bg-[#FF6B00] text-white' : 'bg-[#040e26] text-[#00E5FF] group-hover:text-white'}`}>
                    {getIcon(ind.iconName)}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold font-display uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {ind.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Industry Deep Dive Card */}
          <div className="lg:col-span-5 bg-[#061533] rounded-3xl border-2 border-[#163a82] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#0B2559] text-[#FF6B00] border border-[#204ca0]">
                {getIcon(currentIndustry.iconName)}
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00E5FF]">
                  Target Sector
                </span>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  {currentIndustry.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {currentIndustry.description}
            </p>

            {/* Typical Equipment Deployed */}
            <div className="mb-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-display">
                Typical Surge Shore Equipment Deployed:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentIndustry.typicalEquipment.map((eq, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030917] border border-slate-800 text-xs text-white"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications List */}
            <div className="mb-8">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-display">
                Key Machine Applications:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {currentIndustry.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs rounded-lg bg-[#0B2559]/50 text-slate-200 border border-[#204ca0]"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectIndustry(currentIndustry.title)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF851A] hover:from-[#FF851A] hover:to-[#FF6B00] text-white text-xs font-bold uppercase font-display tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,0,0.4)] cursor-pointer"
            >
              <span>Inquire For {currentIndustry.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
