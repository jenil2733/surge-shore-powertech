import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Zap, 
  ShieldCheck, 
  Share2, 
  Table as TableIcon,
  Layers, 
  Phone,
  MessageSquare,
  Printer,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Minus,
  Sliders,
  Send,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../types';
import { ProductPhotoview } from './ProductPhotoview';
import { COMPANY_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenContact,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<'3-Phase' | '1-Phase'>('3-Phase');
  const [selectedMounting, setSelectedMounting] = useState<'foot-mounted' | 'flange-mounted'>('foot-mounted');
  const [activeTab, setActiveTab] = useState<'specs' | 'subcategories' | 'features' | 'applications' | 'standards'>('specs');
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inquiryHp, setInquiryHp] = useState('Standard');
  const [inquiryQty, setInquiryQty] = useState('1');

  // Sync phase with product
  useEffect(() => {
    if (product) {
      if (product.phase === '1-Phase') {
        setSelectedPhase('1-Phase');
      } else {
        setSelectedPhase('3-Phase');
      }
      if (product.subCategories && product.subCategories.length > 0) {
        setSelectedMounting(product.subCategories[0].id);
      }
    }
  }, [product]);

  // Keyboard shortcut: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const currentSpecs = selectedPhase === '3-Phase' ? product.specs3Phase : product.specs1Phase;
  const currentSubCategory = product.subCategories?.find(s => s.id === selectedMounting) || product.subCategories?.[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const mountingNote = currentSubCategory ? `Type/Model: ${currentSubCategory.name}` : '';
    const msg = `*Product Inquiry from Website*%0A*Product:* ${encodeURIComponent(product.name)}%0A*Phase:* ${encodeURIComponent(selectedPhase)}%0A*Rating/Frame:* ${encodeURIComponent(inquiryHp)}%0A*Quantity:* ${encodeURIComponent(inquiryQty)}%0A*${encodeURIComponent(mountingNote)}*%0A*Status:* Quotation Requested`;
    window.open(`https://wa.me/919173959019?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* macOS Frosted Dim Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* MacBook Window Container */}
        <motion.div
          layout
          initial={{ 
            opacity: 0, 
            scale: 0.84, 
            y: 40, 
            filter: 'blur(10px)' 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: {
              type: "spring",
              stiffness: 340,
              damping: 26,
              mass: 0.85
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.88, 
            y: 20, 
            filter: 'blur(6px)',
            transition: {
              duration: 0.2,
              ease: [0.32, 0, 0.67, 0]
            }
          }}
          className={`relative bg-white border border-slate-300/80 shadow-[0_25px_80px_rgba(0,0,0,0.4)] z-10 overflow-hidden flex flex-col transition-all duration-300 ${
            isMaximized 
              ? 'w-[98vw] h-[96vh] rounded-2xl' 
              : 'w-full max-w-5xl max-h-[92vh] h-auto rounded-3xl'
          }`}
        >
          {/* macOS Title Bar Header */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-slate-100 to-slate-200/90 border-b border-slate-300/80 select-none shrink-0">
            {/* Left: Close button */}
            <div className="flex items-center gap-2">
              {/* Red - Close */}
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[#4C0000] hover:brightness-90 transition-all cursor-pointer shadow-xs"
                title="Close (Esc)"
              >
                <X className="w-2.5 h-2.5 stroke-[3]" />
              </button>
            </div>

            {/* Center: Window Title with App Tag */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight font-display truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400">
                — Surge Shore Pro
              </span>
            </div>

            {/* Right: macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-300/60 transition-all cursor-pointer"
                title="Print Technical Spec Sheet"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-300/60 transition-all cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-300/60 transition-all hidden sm:flex items-center justify-center cursor-pointer"
                title={isMaximized ? "Restore Size" : "Full Screen"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* macOS Sub-Toolbar / Segmented Tabs */}
          <div className="bg-slate-50/95 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'bg-white text-[#0B2559] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Technical Specs</span>
              </button>

              {product.subCategories && product.subCategories.length > 0 && (
                <button
                  onClick={() => setActiveTab('subcategories')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'subcategories'
                      ? 'bg-white text-[#0B2559] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Sub-Categories (Flange / Foot)</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('features')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'features'
                    ? 'bg-white text-[#0B2559] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Features ({product.features.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'applications'
                    ? 'bg-white text-[#0B2559] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#0B2559]" />
                <span>Applications</span>
              </button>
              <button
                onClick={() => setActiveTab('standards')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'standards'
                    ? 'bg-white text-[#0B2559] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B2559]" />
                <span>IS 325 Certified</span>
              </button>
            </div>

            {/* Direct Quick WhatsApp Inquiry */}
            <a
              href={`https://wa.me/919173959019?text=Hello%20Surge%20Shore%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}.`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Scrollable Main Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Top Showcase: High-Res Interactive Viewport + Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200/80">
              <div className="lg:col-span-6">
                <ProductPhotoview
                  product={product}
                  size="modal"
                  interactive={true}
                  mountingType={selectedMounting}
                  onMountingChange={setSelectedMounting}
                />
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div>
                  {product.id !== 'electrical-panels' && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B2559]/10 text-[#0B2559] text-[11px] font-bold font-mono uppercase tracking-wider mb-2">
                      <Zap className="w-3 h-3 text-[#FF6B00]" />
                      <span>
                        {product.type === 'stabilizer'
                          ? (selectedMounting === 'relay-type' ? '1-Phase Only (230V AC)' : '1-Phase & 3-Phase Both Available')
                          : (product.phase === 'Both' ? '1-Phase & 3-Phase Available' : product.phase)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B2559] font-display">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#FF6B00] mt-0.5">
                    {product.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    {product.description}
                  </p>
                </div>

                {/* Sub-Category Switcher */}
                {product.subCategories && product.subCategories.length > 0 && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span>{product.type === 'stabilizer' ? 'Stabilizer Type:' : 'Mounting Sub-Category:'}</span>
                      <span className="font-mono text-[#FF6B00]">
                        {currentSubCategory ? currentSubCategory.name : 'Standard'}
                      </span>
                    </div>
                    <div className={`grid ${product.subCategories.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                      {product.subCategories.map((sub, idx) => {
                        const isSelected = selectedMounting === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => setSelectedMounting(sub.id)}
                            className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left border flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#0B2559] text-white border-[#0B2559] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-0.5 gap-1">
                              <span className="truncate">{idx + 1}. {sub.name.split(' (')[0]}</span>
                            </div>
                            <span className={`text-[10px] font-semibold ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                              {sub.phaseLabel || (sub.id === 'relay-type' ? '230V 1-Phase' : '230V & 415V Both')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Key Technical Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-slate-500 text-[10px] block font-mono">WINDING</span>
                    <strong className="text-[#0B2559] text-xs">100% Copper</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-slate-500 text-[10px] block font-mono">INSULATION</span>
                    <strong className="text-[#0B2559] text-xs">Class F (155°C)</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-slate-500 text-[10px] block font-mono">PROTECTION</span>
                    <strong className="text-emerald-600 text-xs">IP55 Rating</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-slate-500 text-[10px] block font-mono">DUTY CYCLE</span>
                    <strong className="text-[#0B2559] text-xs">S1 Continuous</strong>
                  </div>
                </div>

                {/* Inline Quick Quotation Box */}
                <form onSubmit={handleQuickInquiry} className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Instant Price Quotation Generator</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={inquiryHp}
                      onChange={(e) => setInquiryHp(e.target.value)}
                      placeholder="Rating (e.g. 2 HP, 5 HP)"
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#0B2559]"
                    />
                    <input
                      type="text"
                      value={inquiryQty}
                      onChange={(e) => setInquiryQty(e.target.value)}
                      placeholder="Qty (e.g. 5 Units)"
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#0B2559]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#0B2559] hover:bg-[#123887] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3 h-3 text-[#FF6B00]" />
                      <span>Get Quote</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Tab Specific Content */}
            <div className="pt-2">
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  {/* Phase Switcher if both supported */}
                  {product.type === 'motor' && product.specs3Phase && product.specs1Phase && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-100/80 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#0B2559]" />
                        Select Motor Electrical Operating Range:
                      </span>
                      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                        <button
                          onClick={() => setSelectedPhase('3-Phase')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            selectedPhase === '3-Phase'
                              ? 'bg-[#0B2559] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          3-Phase (415V ±10%, 50Hz)
                        </button>
                        <button
                          onClick={() => setSelectedPhase('1-Phase')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            selectedPhase === '1-Phase'
                              ? 'bg-[#0B2559] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          1-Phase (230V ±10%, 50Hz)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Comprehensive Motor Engineering Table */}
                  {currentSpecs && currentSpecs.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B2559] text-white uppercase text-[10px] font-mono tracking-wider">
                          <tr>
                            <th className="py-3 px-3.5">HP</th>
                            <th className="py-3 px-3.5">kW</th>
                            <th className="py-3 px-3.5">Frame</th>
                            <th className="py-3 px-3.5">RPM</th>
                            <th className="py-3 px-3.5">Current (A)</th>
                            <th className="py-3 px-3.5">Torque %</th>
                            <th className="py-3 px-3.5">Efficiency %</th>
                            <th className="py-3 px-3.5">P.F. (cos φ)</th>
                            {selectedPhase === '1-Phase' && (
                              <th className="py-3 px-3.5">Capacitor (μF)</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {currentSpecs.map((spec, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/50 hover:bg-slate-100/80'}
                            >
                              <td className="py-2.5 px-3.5 font-bold text-[#0B2559]">{spec.hp} HP</td>
                              <td className="py-2.5 px-3.5 font-mono">{spec.kw} kW</td>
                              <td className="py-2.5 px-3.5 font-mono font-semibold">{spec.frame}</td>
                              <td className="py-2.5 px-3.5 font-mono">{spec.rpm}</td>
                              <td className="py-2.5 px-3.5 font-bold text-[#FF6B00]">{spec.current} A</td>
                              <td className="py-2.5 px-3.5 font-mono">{spec.torquePercent}%</td>
                              <td className="py-2.5 px-3.5 font-mono font-bold text-emerald-600">
                                {spec.efficiencyPercent}%
                              </td>
                              <td className="py-2.5 px-3.5 font-mono">{spec.powerFactor}</td>
                              {selectedPhase === '1-Phase' && (
                                <td className="py-2.5 px-3.5 font-mono text-slate-600 font-semibold">
                                  {spec.runningCapacitor} μF
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : product.pumpSpecs && product.pumpSpecs.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0B2559] text-white uppercase text-[10px] font-mono tracking-wider">
                          <tr>
                            <th className="py-3 px-3.5">Model</th>
                            <th className="py-3 px-3.5">HP (kW)</th>
                            <th className="py-3 px-3.5">Pipe Size</th>
                            <th className="py-3 px-3.5">Head Range</th>
                            <th className="py-3 px-3.5">Discharge Capacity</th>
                            <th className="py-3 px-3.5">Phase</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {product.pumpSpecs.map((pspec, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                              <td className="py-3 px-3.5 font-bold text-[#0B2559]">{pspec.modelName}</td>
                              <td className="py-3 px-3.5 font-mono font-semibold">
                                {pspec.hp} HP ({pspec.kw} kW)
                              </td>
                              <td className="py-3 px-3.5 font-mono">{pspec.pipeSize}</td>
                              <td className="py-3 px-3.5 font-bold text-[#FF6B00]">{pspec.headRangeMtr}</td>
                              <td className="py-3 px-3.5 font-mono font-bold text-emerald-600">
                                {pspec.dischargeRangeLphOrLpm}
                              </td>
                              <td className="py-3 px-3.5">{pspec.phase}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : product.type === 'stabilizer' && currentSubCategory?.dimensions ? (
                    /* Voltage Stabilizer Technical Specification Table */
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
                        <span className="font-bold text-[#0B2559]">
                          {currentSubCategory.name} — Technical Rating & Parameter Matrix
                        </span>
                        <span className="sm:hidden text-[10px] text-[#FF6B00] font-bold">
                          ← Swipe table horizontally →
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#0B2559] text-white uppercase text-[10px] font-mono tracking-wider">
                            <tr>
                              <th className="py-2.5 px-3 font-bold">Rating Capacity</th>
                              <th className="py-2.5 px-3 font-bold">Operating Phase</th>
                              <th className="py-2.5 px-3 font-bold">Input Range & Output</th>
                              <th className="py-2.5 px-3 font-bold">Enclosure / Mounting</th>
                              <th className="py-2.5 px-3 font-bold">Speed</th>
                              <th className="py-2.5 px-3 font-bold">Standard</th>
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
                                <td className="py-2.5 px-3 font-bold text-[#0B2559] font-mono">
                                  {dim.frame}
                                </td>
                                <td className="py-2.5 px-3">
                                  {dim.phase === '1-Phase' ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-300 whitespace-nowrap">
                                      ⚡ 1-Phase (230V)
                                    </span>
                                  ) : dim.phase === '3-Phase' ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-[#0B2559] border border-blue-300 whitespace-nowrap">
                                      ⚡ 3-Phase (415V)
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 whitespace-nowrap">
                                      1-PH & 3-PH
                                    </span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 font-mono font-bold text-[#FF6B00]">
                                  {dim.mountingSpec}
                                </td>
                                <td className="py-2.5 px-3 text-slate-700">
                                  {dim.shaftDiameter}
                                </td>
                                <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">
                                  {selectedMounting === 'servo-type' ? '< 10ms' : '< 15ms'}
                                </td>
                                <td className="py-2.5 px-3 font-mono text-slate-600">
                                  {dim.standard}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p className="font-semibold text-slate-800">Custom Engineering & Turnkey Fabrication Available</p>
                      <p>Surge Shore manufactures custom panels and regulators according to exact plant load calculation, single-line diagrams (SLD), and utility requirements.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'subcategories' && product.subCategories && product.subCategories.length > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-100/80 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-700">
                      {product.type === 'stabilizer' ? 'Available Voltage Stabilizer Topologies & Models:' : 'Standard Mechanical Mounting Sub-Categories (IS 1231 / IS 2223):'}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {product.subCategories.map((sub, idx) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedMounting(sub.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            selectedMounting === sub.id
                              ? 'bg-[#0B2559] text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {idx + 1}. {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.subCategories.map((sub, idx) => {
                      const isSelected = selectedMounting === sub.id;
                      return (
                        <div
                          key={sub.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isSelected
                              ? 'bg-white border-[#0B2559] ring-2 ring-[#0B2559]/20 shadow-sm'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-mono font-bold text-[#FF6B00]">Type {idx + 1}</span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0B2559] text-white">{sub.code}</span>
                              </div>
                              <h4 className="text-sm font-black text-[#0B2559] mt-0.5">{sub.name}</h4>
                            </div>
                            <button
                              onClick={() => setSelectedMounting(sub.id)}
                              className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                                isSelected ? 'bg-[#FF6B00] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              {isSelected ? 'Selected' : 'Select'}
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{sub.description}</p>

                          <div className="mt-3 space-y-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Features:</span>
                            {sub.features.slice(0, 3).map((f, fi) => (
                              <div key={fi} className="flex items-start gap-1.5 text-xs text-slate-700">
                                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>

                          {sub.dimensions && (
                            <div className="mt-3 pt-2 border-t border-slate-200 overflow-x-auto">
                              <table className="w-full text-left text-[11px]">
                                <thead className="bg-slate-100 text-slate-700 font-mono text-[10px]">
                                  <tr>
                                    <th className="py-1 px-1.5">{product.type === 'stabilizer' ? 'Rating' : 'Frame'}</th>
                                    <th className="py-1 px-1.5">{product.type === 'stabilizer' ? 'Phase' : 'HP'}</th>
                                    <th className="py-1 px-1.5">{product.type === 'stabilizer' ? 'Voltage Range' : 'Mounting Spec'}</th>
                                    <th className="py-1 px-1.5">Standard</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {sub.dimensions.map((d, di) => (
                                    <tr key={di}>
                                      <td className="py-1 px-1.5 font-mono font-bold text-[#0B2559]">{d.frame}</td>
                                      <td className="py-1 px-1.5 font-mono">{d.hp}</td>
                                      <td className="py-1 px-1.5 font-mono font-bold text-[#FF6B00]">
                                        {d.mountingSpec}
                                      </td>
                                      <td className="py-1 px-1.5 font-mono">
                                        {d.standard}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <Layers className="w-4 h-4 text-[#0B2559] shrink-0" />
                      <span className="text-xs text-slate-700 font-semibold">{app}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'standards' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div className="text-xs font-bold text-[#0B2559]">IS 325 / IEC 60034</div>
                    <p className="text-[11px] text-slate-600">Compliant with Bureau of Indian Standards for 3-phase induction motors.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div className="text-xs font-bold text-[#0B2559]">IS 996 Standard</div>
                    <p className="text-[11px] text-slate-600">Single-phase small AC motors standard certification and dynamic balance.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div className="text-xs font-bold text-[#0B2559]">100% Factory Routine Test</div>
                    <p className="text-[11px] text-slate-600">No-load test, locked rotor test, high voltage test (2kV), and insulation resistance.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* macOS Bottom Status Bar */}
          <div className="px-4 sm:px-6 py-3 bg-gradient-to-t from-slate-100 to-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Surge Shore Powertech LLP</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Rajkot, Gujarat, India</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-[#0B2559] hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Call Factory</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-[#0B2559] hover:bg-[#123887] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
