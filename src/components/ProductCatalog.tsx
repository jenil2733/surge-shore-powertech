import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  ArrowUpRight,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { ProductItem } from '../types';
import { ProductPhotoview } from './ProductPhotoview';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  onOpenContact: () => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenContact,
  onSelectProduct,
}) => {
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);

  const handleProductClick = (product: ProductItem) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setSelectedProductForModal(product);
    }
  };

  return (
    <section id="products" className="py-16 sm:py-24 px-3 sm:px-8 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#0B2559_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 relative z-10">
        
        {/* =========================================================
            1. SECTION HEADER
           ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6"
        >
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0B2559]/10 text-[#0B2559] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Surge Shore Product Lineup</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2559] tracking-tight font-display">
              TECHNICAL CATALOG & <span className="text-[#FF6B00]">PRODUCT GALLERY</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Precision-manufactured electric motors, machine coolant pumps, and industrial panels built with heavy-duty EN8E shafts, low-loss CRNO stators, and Class F copper insulation.
            </p>
          </div>

          {/* Quick WhatsApp PDF Catalog Request */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919173959019?text=Hello%20Surge%20Shore%2C%20please%20send%20me%20your%20full%20PDF%20technical%20catalog%20and%20OEM%20price%20sheet."
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Full PDF Catalog</span>
            </a>
          </div>
        </motion.div>

        {/* =========================================================
            2. PRODUCT CARDS GRID (Animated on load & scroll)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {PRODUCTS_DATA.map((product, index) => {
            const staggerDelay = (index % 3) * 0.08 + Math.floor(index / 3) * 0.04;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: staggerDelay,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#0B2559]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                {/* Subtle Ambient Radial Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FF6B00]/10 via-[#0B2559]/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                {/* Top Photographic Chamber */}
                <div className="p-3 sm:p-5 pb-1 sm:pb-2 relative">
                  {/* Canvas Stage */}
                  <div 
                    onClick={() => handleProductClick(product)}
                    className="cursor-pointer relative overflow-hidden rounded-2xl group/canvas"
                  >
                    <ProductPhotoview
                      product={product}
                      size="card"
                      interactive={false}
                      className="transition-transform duration-500 group-hover/canvas:scale-[1.03]"
                    />
                    
                    {/* Floating Inspect Pill */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-[#0B2559] text-xs font-bold shadow-md opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B00]" />
                    </div>
                  </div>
                </div>

                {/* Minimalist, Clean Product Info Chamber */}
                <div className="p-4 sm:p-6 pt-2 sm:pt-3 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
                  <div className="space-y-1">
                    <h3
                      onClick={() => handleProductClick(product)}
                      className="text-lg sm:text-xl font-bold text-[#0B2559] font-display hover:text-[#FF6B00] transition-colors cursor-pointer tracking-tight"
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleProductClick(product)}
                      className="min-h-[44px] flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-[#0B2559] hover:bg-[#11357f] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn active:scale-98"
                    >
                      <span>View Full Specs & Photos</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00] group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={`https://wa.me/919173959019?text=Hello%20Surge%20Shore%2C%20I%20would%20like%20a%20price%20quotation%20for%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-slate-100 hover:bg-[#25D366] text-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
                      title="Direct WhatsApp Quotation"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal Fallback */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onOpenContact={() => {
          setSelectedProductForModal(null);
          onOpenContact();
        }}
      />
    </section>
  );
};
