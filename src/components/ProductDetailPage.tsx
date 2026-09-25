import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  Zap, 
  Download, 
  ShieldCheck, 
  Share2, 
  Table as TableIcon, 
  Layers, 
  FileText, 
  Phone, 
  MessageSquare, 
  Printer, 
  CheckCircle2, 
  Sliders, 
  Compass, 
  Sparkles, 
  Cpu, 
  ChevronRight, 
  Grid, 
  ListFilter,
  Send,
  Building2,
  HelpCircle,
  ExternalLink,
  Home
} from 'lucide-react';
import { ProductItem, ProductCategory } from '../types';
import { PRODUCTS_DATA, COMPANY_INFO } from '../data/products';
import { ProductPhotoview } from './ProductPhotoview';
import { SurgeShoreLogo } from './SurgeShoreLogo';

interface ProductDetailPageProps {
  product: ProductItem;
  onBackToCatalog: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onOpenContact: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCatalog,
  onSelectProduct,
  onOpenContact,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<'3-Phase' | '1-Phase'>('3-Phase');
  const [selectedMounting, setSelectedMounting] = useState<'foot-mounted' | 'flange-mounted'>('foot-mounted');
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications' | 'testing'>('specs');
  const [viewFormat, setViewFormat] = useState<'table' | 'cards'>('table');
  const [copied, setCopied] = useState(false);
  const [activePhotoAngle, setActivePhotoAngle] = useState<'photo' | 'exploded' | 'blueprint' | 'wiring'>('photo');

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product.phase === '1-Phase') {
      setSelectedPhase('1-Phase');
    } else {
      setSelectedPhase('3-Phase');
    }
    if (product.subCategories && product.subCategories.length > 0) {
      setSelectedMounting(product.subCategories[0].id);
    }
  }, [product.id]);

  const currentSpecs = selectedPhase === '3-Phase' ? product.specs3Phase : product.specs1Phase;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentSubCategory = product.subCategories?.find(s => s.id === selectedMounting) || product.subCategories?.[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-[120px] sm:pt-[148px] pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8">
      {/* Print-Only Header Banner */}
      <div className="hidden print:flex items-center justify-between pb-6 border-b-2 border-[#00205B] mb-6">
        <SurgeShoreLogo variant="full" size="md" theme="light" />
        <div className="text-right text-xs text-slate-600 font-mono">
          <div className="font-bold text-[#00205B] text-sm">SURGE SHORE POWERTECH LLP</div>
          <div>IS 325 / IS 9815 / IEC 60034 Certified Standard Specifications</div>
          <div>Contact: {COMPANY_INFO.phone} | {COMPANY_INFO.email}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-xs mb-6 sm:mb-8">
          {/* Breadcrumb Links */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-slate-600 flex-wrap px-2">
            <button
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[#00205B] font-medium transition-all cursor-pointer"
              title="Return to Home"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <button
              onClick={onBackToCatalog}
              className="px-2.5 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[#00205B] font-medium transition-all cursor-pointer"
            >
              Catalog
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <span className="font-bold text-[#00205B] text-xs sm:text-sm truncate max-w-[220px] sm:max-w-none px-1.5 py-1">
              {product.name}
            </span>
          </div>

          {/* Actions: Back to Catalog */}
          <div className="flex items-center gap-2 px-1">
            <button
              onClick={onBackToCatalog}
              className="group min-h-[38px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Catalog</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Interactive Photorised Studio */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-3.5 sm:p-6 rounded-3xl border border-slate-200 card-shadow space-y-4">
              {/* Product Visual Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] sm:text-xs font-black bg-[#0B2559] text-white rounded-lg uppercase tracking-wider">
                    {product.phase === 'Both' ? '1-PH & 3-PH' : product.phase}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-1 text-[11px] sm:text-xs font-bold bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 rounded-lg">
                      {product.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {product.type === 'stabilizer' ? 'IS 8448 / IS 9815' : 'IS 325'}
                </span>
              </div>

              {/* Photorised Multi-Angle Canvas Gallery */}
              <div className="relative">
                <ProductPhotoview
                  product={product}
                  size="hero"
                  interactive={true}
                  mountingType={selectedMounting}
                  onMountingChange={setSelectedMounting}
                />
              </div>

              {/* View Angle Switcher Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[9.5px] sm:text-[10px] uppercase font-bold text-slate-400">
                    {product.type === 'stabilizer' ? 'Winding' : 'Shaft Type'}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#0B2559] truncate">
                    {product.type === 'stabilizer' ? '99.9% Cu' : 'EN8E Steel'}
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[9.5px] sm:text-[10px] uppercase font-bold text-slate-400">
                    {product.type === 'stabilizer' ? 'Type' : 'Mounting'}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#FF6B00] truncate">
                    {currentSubCategory ? currentSubCategory.code : (product.subCategories ? (selectedMounting === 'flange-mounted' ? 'Flange (B5/B14)' : 'Foot (B3)') : 'Standard')}
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[9.5px] sm:text-[10px] uppercase font-bold text-slate-400">
                    {product.type === 'stabilizer' ? 'Regulation' : 'Thermal Class'}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-emerald-600 truncate">
                    {product.type === 'stabilizer' ? (selectedMounting === 'servo-type' ? '±1% Precision' : '±8% Stepped') : 'Class F (155°C)'}
                  </div>
                </div>
              </div>

              {/* Manufacturer Certification Footnote */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">100% In-House Tested for High-Pot Dielectric, Load Regulation & Calibration at Rajkot Plant.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Details, Quick Specs & Direct Inquiries */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Title & Subtitle */}
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 card-shadow space-y-4">
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">
                  Surge Shore Powertech LLP • Model Overview
                </span>
                <h1 className="text-xl sm:text-3xl xl:text-4xl font-black text-[#0B2559] tracking-tight font-display">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Power Rating Strip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B2559]/5 border border-[#0B2559]/15 text-[#0B2559] text-xs sm:text-sm font-bold font-mono">
                <Zap className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Standard Range: {product.powerRange}</span>
              </div>

              {/* Sub-Category Interactive Selection (Flange Mounted vs Foot Mounted OR Relay type vs Servo type) */}
              {product.subCategories && product.subCategories.length > 0 && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border-2 border-[#0B2559]/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B2559] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{product.type === 'stabilizer' ? 'Available Stabilizer Types:' : 'Available Sub-Categories / Mounting:'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Select to preview
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.subCategories.map((sub, idx) => {
                      const isSelected = selectedMounting === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setSelectedMounting(sub.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0B2559] text-white border-[#0B2559] shadow-md ring-2 ring-[#FF6B00]/40 scale-[1.02]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-[#0B2559]/40 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-[#FF6B00]' : 'text-slate-500'}`}>
                              {idx + 1}. {sub.name}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-black ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {sub.code || sub.name}
                            </span>
                          </div>
                          <div className="font-extrabold text-xs sm:text-sm">
                            {sub.name}
                          </div>
                          <div className={`text-[10px] line-clamp-2 mt-1 leading-snug ${
                            isSelected ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {sub.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sub-Category selection grid */}
                </div>
              )}

              {/* In-depth Product Summary */}
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specification Parameters Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium">Stator Winding</span>
                  <strong className="text-[11px] sm:text-sm text-[#0B2559] block truncate">100% Copper</strong>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium">Rated Voltage</span>
                  <strong className="text-[11px] sm:text-sm text-[#0B2559] block truncate">415V / 230V</strong>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium">Enclosure</span>
                  <strong className="text-[11px] sm:text-sm text-emerald-600 block truncate">IP55 Standard</strong>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium">Duty Cycle</span>
                  <strong className="text-[11px] sm:text-sm text-[#0B2559] block truncate">Continuous S1</strong>
                </div>
              </div>

              {/* Direct Primary Factory Inquiries */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href={`https://wa.me/919173959019?text=Hello%20Surge%20Shore%20Powertech%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}%20${encodeURIComponent(product.subCategories ? (selectedMounting === 'flange-mounted' ? '[Flange Mounted B5/B14]' : '[Foot Mounted B3]') : '')}%20(${encodeURIComponent(product.powerRange)}).%20Please%20provide%20quotation%20and%20technical%20drawing.`}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="min-h-[44px] py-3 px-4 rounded-xl bg-[#0B2559] hover:bg-[#123887] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Phone className="w-4 h-4 text-[#FF6B00]" />
                  <span>Call Factory</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Technical Specs, Features, Applications, Testing */}
        <div className="bg-white rounded-3xl border border-slate-200 card-shadow overflow-hidden">
          {/* Tab Navigation Strip */}
          <div className="flex items-center gap-2 px-4 sm:px-6 pt-4 border-b border-slate-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#FF6B00] text-[#0B2559] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <TableIcon className="w-4 h-4 text-[#FF6B00]" />
              <span>Full Engineering Datasheet</span>
            </button>

            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'features'
                  ? 'border-[#FF6B00] text-[#0B2559] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span>Engineering Highlights ({product.features.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'applications'
                  ? 'border-[#FF6B00] text-[#0B2559] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-[#FF6B00]" />
              <span>Machine Applications ({product.applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testing')}
              className={`px-4 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'testing'
                  ? 'border-[#FF6B00] text-[#0B2559] font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              <span>Quality Rigor & Testing</span>
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="p-4 sm:p-8">
            {/* Tab 1: Engineering Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                {/* Voltage & Phase Controls */}
                {product.type === 'motor' && product.specs3Phase && product.specs1Phase && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">
                        Operating Voltage / Phase Selection:
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPhase('3-Phase')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedPhase === '3-Phase'
                            ? 'bg-[#0B2559] text-white shadow-sm'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        3-Phase (415V ±10%, 50Hz)
                      </button>

                      <button
                        onClick={() => setSelectedPhase('1-Phase')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedPhase === '1-Phase'
                            ? 'bg-[#0B2559] text-white shadow-sm'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        1-Phase (230V ±10%, 50Hz)
                      </button>
                    </div>
                  </div>
                )}

                {/* Motor Specs Table (Fully Mobile Responsive with Scroll indicator) */}
                {currentSpecs && currentSpecs.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Standard 4-Pole 1440 RPM Performance Data (IS 325 Reference)</span>
                      <span className="sm:hidden text-[11px] text-[#FF6B00] font-bold">
                        ← Swipe table horizontally →
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#0B2559] text-white uppercase text-[10px] sm:text-xs font-mono tracking-wider">
                          <tr>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Power (HP)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Power (kW)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Frame</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Speed (RPM)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Current (A)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Torque (%)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Efficiency (%)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">P.F. (cos φ)</th>
                            {selectedPhase === '1-Phase' && (
                              <>
                                <th className="py-3.5 px-3 sm:px-4 font-bold">Run Cap (μF)</th>
                                <th className="py-3.5 px-3 sm:px-4 font-bold">Start Cap (μF)</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {currentSpecs.map((spec, idx) => (
                            <tr
                              key={idx}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                              }`}
                            >
                              <td className="py-3 px-3 sm:px-4 font-extrabold text-[#0B2559]">
                                {spec.hp} HP
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-medium text-slate-700">
                                {spec.kw} kW
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-800">
                                {spec.frame}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono text-slate-600">
                                {spec.rpm}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-black text-[#FF6B00]">
                                {spec.current} A
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono text-slate-600">
                                {spec.torquePercent}%
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-bold text-emerald-600">
                                {spec.efficiencyPercent}%
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono text-slate-600">
                                {spec.powerFactor}
                              </td>
                              {selectedPhase === '1-Phase' && (
                                <>
                                  <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-700">
                                    {spec.runningCapacitor} μF
                                  </td>
                                  <td className="py-3 px-3 sm:px-4 font-mono text-slate-500">
                                    {spec.startingCapacitor || 'N/A'}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : product.pumpSpecs && product.pumpSpecs.length > 0 ? (
                  /* Pump Specification Table */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Performance Curve & Discharge Parameters</span>
                      <span className="sm:hidden text-[11px] text-[#FF6B00] font-bold">
                        ← Swipe table horizontally →
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#0B2559] text-white uppercase text-[10px] sm:text-xs font-mono tracking-wider">
                          <tr>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Model Name</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Power (HP / kW)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Pipe Size (Suction × Del)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Total Head (Mtrs)</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Discharge Capacity</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Operating Phase</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {product.pumpSpecs.map((pspec, idx) => (
                            <tr
                              key={idx}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                              }`}
                            >
                              <td className="py-3 px-3 sm:px-4 font-extrabold text-[#0B2559]">
                                {pspec.modelName}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-semibold">
                                {pspec.hp} HP ({pspec.kw} kW)
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-700">
                                {pspec.pipeSize}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-black text-[#FF6B00]">
                                {pspec.headRangeMtr}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-bold text-emerald-600">
                                {pspec.dischargeRangeLphOrLpm}
                              </td>
                              <td className="py-3 px-3 sm:px-4 text-slate-700">
                                {pspec.phase}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : product.type === 'stabilizer' && currentSubCategory?.dimensions ? (
                  /* Voltage Stabilizer Technical Specification Table */
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="font-bold text-[#0B2559]">
                        {currentSubCategory.name} — Technical Rating & Parameter Matrix
                      </span>
                      <span className="sm:hidden text-[11px] text-[#FF6B00] font-bold">
                        ← Swipe table horizontally →
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#0B2559] text-white uppercase text-[10px] sm:text-xs font-mono tracking-wider">
                          <tr>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Rating Capacity</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Input Voltage Range & Output</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Enclosure & Mounting</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Correction Speed</th>
                            <th className="py-3.5 px-3 sm:px-4 font-bold">Standard</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {currentSubCategory.dimensions.map((dim, idx) => (
                            <tr
                              key={idx}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                              }`}
                            >
                              <td className="py-3 px-3 sm:px-4 font-extrabold text-[#0B2559] font-mono">
                                {dim.frame}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-bold text-[#FF6B00]">
                                {dim.mountingSpec}
                              </td>
                              <td className="py-3 px-3 sm:px-4 text-slate-700 font-medium">
                                {dim.shaftDiameter}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono font-bold text-emerald-600">
                                {selectedMounting === 'servo-type' ? '< 10ms (Continuous)' : '< 15ms (Relay Step)'}
                              </td>
                              <td className="py-3 px-3 sm:px-4 font-mono text-slate-600 font-semibold">
                                {dim.standard}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-600 leading-relaxed">
                    Custom electrical automation panels are fabricated according to engineering schematics, ingress protection specifications (IP55/IP65), PLC controller requirements, and VFD drive integrations.
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Key Features */}
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B2559]">
                        {feat}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Applications */}
            {activeTab === 'applications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.applications.map((app, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#0B2559]/10 text-[#0B2559] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-[#FF6B00]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#0B2559]">{app}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Quality & Testing */}
            {activeTab === 'testing' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#0B2559] font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                    <span>2.0 kV Dielectric High-Pot Insulation Test</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stators undergo 2000V high-potential testing to guarantee complete zero leakage current and extreme insulation resistance.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#0B2559] font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                    <span>ISO 1940 Grade G2.5 Dynamic Balancing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dual-plane computerized dynamic balancing eliminates radial vibrations and prolongs bearing life under continuous industrial load.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#0B2559] font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                    <span>Thermal Class F (155°C) Continuous S1 Duty</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Class F insulated copper winding with vacuum varnish impregnation guarantees thermal stability even during high ambient Gujarat summer shifts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#0B2559] font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                    <span>Locked Rotor & Starting Torque Profiling</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Strict measurement of starting torque percentage, power factor, and locked-rotor current ensures smooth equipment startup without electrical trips.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
