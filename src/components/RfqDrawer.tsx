import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Printer, 
  FileText, 
  MessageSquare, 
  CheckCircle,
  Zap,
  Phone,
  Building,
  User,
  Mail
} from 'lucide-react';
import { RfqItem } from '../types';
import { COMPANY_INFO } from '../data/products';
import { LightningButton } from './LightningButton';
import { playRelayClick, playSuccessChime } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface RfqDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: RfqItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
}

export const RfqDrawer: React.FC<RfqDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `*RFQ INQUIRY - SURGE SHORE POWERTECH LLP*%0A`;
    msg += `---------------------------------------%0A`;
    if (customerName) msg += `*Client Name:* ${encodeURIComponent(customerName)}%0A`;
    if (customerCompany) msg += `*Company:* ${encodeURIComponent(customerCompany)}%0A`;
    if (customerPhone) msg += `*Phone:* ${encodeURIComponent(customerPhone)}%0A`;
    if (customerCity) msg += `*City/Location:* ${encodeURIComponent(customerCity)}%0A`;
    msg += `---------------------------------------%0A`;
    msg += `*REQUESTED PRODUCTS / MOTORS:*%0A`;
    
    items.forEach((item, idx) => {
      msg += `%0A${idx + 1}. *${encodeURIComponent(item.product.name)}*%0A`;
      if (item.selectedSpec) msg += `   - Spec: ${encodeURIComponent(item.selectedSpec)}%0A`;
      msg += `   - Qty: ${item.quantity} Units%0A`;
      if (item.customNotes) msg += `   - Custom Req: ${encodeURIComponent(item.customNotes)}%0A`;
    });

    if (additionalNotes) {
      msg += `%0A*Additional Requirements:*%0A${encodeURIComponent(additionalNotes)}%0A`;
    }
    msg += `%0APlease provide official price quotation & delivery timeline. Thank you!`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    playSuccessChime();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF6B00', '#25D366', '#00E5FF'],
    });

    const msg = generateWhatsAppMessage();
    const cleanPhone = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${msg}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrintQuotation = () => {
    playRelayClick();
    window.print();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setIsSubmitted(false);
      onClearAll();
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl bg-[#051333] border-l-2 border-[#163a82] shadow-2xl h-full flex flex-col z-10 text-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-[#040e26] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0B2559] text-[#FF6B00] border border-[#204ca0]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white font-display">
                    RFQ Quotation Cart
                  </h3>
                  <span className="text-xs text-[#00E5FF] font-mono">
                    {totalItemCount} Items Selected
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isSubmitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white font-display">
                    Quotation Request Sent!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    Thank you, {customerName || 'valued client'}. Our engineering team at Rajkot will review your specifications and contact you shortly.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="p-4 rounded-full bg-[#0B2559]/50 text-slate-400 w-fit mx-auto border border-slate-800">
                    <Zap className="w-8 h-8 text-[#FF6B00]" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Your RFQ Cart is Empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Browse our product catalog or use the Motor Sizer tool to add motors, pumps, or control panels to your inquiry list.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold font-display uppercase tracking-wider"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected Items List */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
                      Selected Equipment ({items.length})
                    </h5>
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#030917] border border-slate-800 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white font-display">
                              {item.product.name}
                            </h4>
                            {item.selectedSpec && (
                              <p className="text-xs text-[#00E5FF] font-mono mt-0.5">
                                {item.selectedSpec}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Adjuster */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                          <span className="text-xs text-slate-400">Order Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm text-white font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Form */}
                  <form onSubmit={handleSubmitForm} className="space-y-4 pt-4 border-t border-slate-800">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
                      Your Business Information
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Contact Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Patel"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#030917] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#030917] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Company / Industry</label>
                        <input
                          type="text"
                          placeholder="e.g. Apex Engineering Works"
                          value={customerCompany}
                          onChange={(e) => setCustomerCompany(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#030917] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Delivery City / State</label>
                        <input
                          type="text"
                          placeholder="e.g. Rajkot, Gujarat"
                          value={customerCity}
                          onChange={(e) => setCustomerCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#030917] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Custom Engineering Notes</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Require B5 flange mounting, 415V, class F insulation, delivery by next week..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#030917] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Drawer Footer Actions */}
            {items.length > 0 && !isSubmitted && (
              <div className="p-6 bg-[#040e26] border-t border-slate-800 space-y-3">
                {/* Instant WhatsApp Dispatch Button */}
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase font-display tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Instant RFQ via WhatsApp</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSubmitForm}
                    className="py-2.5 px-3 rounded-xl bg-[#FF6B00] hover:bg-[#FF851A] text-white text-xs font-bold uppercase font-display tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.3)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>

                  <button
                    onClick={handlePrintQuotation}
                    className="py-2.5 px-3 rounded-xl bg-[#0B2559] hover:bg-[#123887] text-slate-200 hover:text-white text-xs font-bold border border-[#204ca0] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Print Quotation</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
