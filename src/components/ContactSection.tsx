import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productOfInterest: 'Induction Motors (C.I. Body)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate direct WhatsApp inquiry message
    const msg = `*Inquiry from Website*%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Product:* ${encodeURIComponent(formData.productOfInterest)}%0A*Details:* ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/919173959019?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-8 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2559]/10 text-[#0B2559] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Factory Location & Direct Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B2559] tracking-tight font-display">
            CONTACT FACTORY & <span className="text-[#FF6B00]">GET IN TOUCH</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Reach out directly to the manufacturer for dealer distribution, custom OEM electric motor requirements, and technical specifications.
          </p>
        </motion.div>

        {/* 2-Column Grid: Contact Cards & Clean Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Direct Contact Info & Factory Map */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-3.5 sm:space-y-4"
          >
            {/* Call Direct */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 sm:gap-4 hover:border-[#FF6B00]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0B2559]/10 text-[#0B2559] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phone & Mobile Contact
                </h4>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-extrabold text-[#0B2559] hover:text-[#FF6B00] transition-colors block mt-0.5 font-mono truncate"
                >
                  {COMPANY_INFO.phone}
                </a>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Direct Factory Call / Technical Support
                </p>
              </div>
            </div>

            {/* WhatsApp Quick Chat */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 sm:gap-4 hover:border-emerald-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  WhatsApp Direct
                </h4>
                <a
                  href="https://wa.me/919173959019?text=Hello%20Surge%20Shore%20Powertech%2C%20I%20am%20inquiring%20about%20your%20motors%20and%20products."
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm sm:text-base font-extrabold text-emerald-600 hover:underline block mt-0.5 font-mono truncate"
                >
                  Chat on WhatsApp (+91 91739 59019)
                </a>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Instant catalog sharing & quick price estimates
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 sm:gap-4 hover:border-[#FF6B00]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0B2559]/10 text-[#0B2559] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email Address
                </h4>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-xs sm:text-sm font-bold text-[#0B2559] hover:text-[#FF6B00] transition-colors block mt-0.5 truncate"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Factory Address */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5 sm:gap-4 hover:border-[#FF6B00]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0B2559]/10 text-[#0B2559] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Manufacturing Works Address
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold mt-1">
                  {COMPANY_INFO.address}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2559] hover:text-[#FF6B00] mt-3 underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Simple Direct Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 card-shadow"
          >
            <div className="border-b border-slate-100 pb-4 mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2559] font-display">
                SEND DIRECT FACTORY INQUIRY
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                Fill out your details below to directly communicate your technical specifications to our team.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 sm:p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base sm:text-lg font-bold text-emerald-800">
                  Inquiry Dispatched Successfully!
                </h4>
                <p className="text-xs text-emerald-700">
                  Your details have been forwarded to our technical sales team. We will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5">
                      Your Name / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Patel / Precision Tools"
                      className="min-h-[42px] w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0B2559] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="min-h-[42px] w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0B2559] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="min-h-[42px] w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0B2559] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5">
                      Product of Interest
                    </label>
                    <select
                      value={formData.productOfInterest}
                      onChange={(e) => setFormData({ ...formData, productOfInterest: e.target.value })}
                      className="min-h-[42px] w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0B2559] focus:bg-white transition-all font-medium text-slate-800"
                    >
                      <option value="INDUCTION MOTOR (C.I. BODY)">INDUCTION MOTOR (C.I. BODY)</option>
                      <option value="INDUCTION MOTOR ( ALUMINIUM BODY)">INDUCTION MOTOR ( ALUMINIUM BODY)</option>
                      <option value="VIBRATOR MOTOR">VIBRATOR MOTOR</option>
                      <option value="VOLTAGE STABILIZER">VOLTAGE STABILIZER</option>
                      <option value="ELECTRICAL AUTOMATION & CONTROL PANEL">ELECTRICAL AUTOMATION & CONTROL PANEL</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5">
                    Requirement Specifications / Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify HP / kW rating, RPM (1440/2880), mounting type (B3 foot / B5 flange), quantities, or application..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0B2559] focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="min-h-[44px] w-full py-3.5 px-6 rounded-xl bg-[#0B2559] hover:bg-[#123887] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-[#FF6B00]" />
                    <span>Send Technical Inquiry via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
