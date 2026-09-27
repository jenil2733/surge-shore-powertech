import React from 'react';
import { SurgeShoreLogo } from './SurgeShoreLogo';
import { COMPANY_INFO, PRODUCTS_DATA } from '../data/products';
import { Phone, Mail, MapPin, Clock, ArrowUp, MessageSquare, Download } from 'lucide-react';
import { downloadCatalogDirectly } from '../utils/catalogPdfData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-700 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <SurgeShoreLogo variant="full" size="md" theme="light" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Surge Shore Powertech LLP is a premier manufacturer of high-efficiency 1-Phase & 3-Phase induction motors, coolant pumps, and industrial electrical panels in Rajkot, Gujarat.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 rounded-lg text-[#0B2559] border border-slate-200">
                IS 325 Compliant
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 rounded-lg text-[#0B2559] border border-slate-200">
                100% Pure Copper
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2559] font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  Product Catalog & Specs
                </button>
              </li>
              <li>
                <a
                  href="/downloads/Surge-Shore-Product-Catalog.pdf"
                  download="Surge-Shore-Product-Catalog.pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadCatalogDirectly();
                  }}
                  className="hover:text-[#FF6B00] transition-colors font-bold text-[#FF6B00] flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Download Catalog (PDF)</span>
                  <span className="text-[10px] bg-[#FF6B00]/10 px-1.5 py-0.5 rounded border border-[#FF6B00]/30 uppercase font-mono">12P PDF</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  Company Profile & Visiting Card
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quality')}
                  className="hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  Quality & Testing Rigor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  Factory Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Facility Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2559] font-display">
              Manufacturing Works
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="font-bold text-[#0B2559] hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>SURGE SHORE POWERTECH LLP</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
