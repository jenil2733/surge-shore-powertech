import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  Camera, 
  Sparkles,
  Layers,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ProductItem, ProductPhoto } from '../types';

interface ProductPhotoviewProps {
  product: ProductItem;
  className?: string;
  size?: 'card' | 'hero' | 'modal';
  interactive?: boolean;
  mountingType?: string;
  onMountingChange?: (type: any) => void;
}

export const ProductPhotoview: React.FC<ProductPhotoviewProps> = ({
  product,
  className = '',
  size = 'card',
  interactive = true,
  mountingType,
  onMountingChange,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine active photos based on mounting or subtype selection
  const isSecondSubCategory = React.useMemo(() => {
    if (!product.subCategories || product.subCategories.length < 2) return false;
    const secondSubId = product.subCategories[1].id;
    return mountingType === secondSubId || mountingType === 'flange-mounted' || mountingType === 'servo-type';
  }, [product.subCategories, mountingType]);

  const activeGallery: ProductPhoto[] = React.useMemo(() => {
    if (product.subCategories && product.subCategories.length > 0) {
      if (isSecondSubCategory && product.galleryFlange && product.galleryFlange.length > 0) {
        return product.galleryFlange;
      }
      if (!isSecondSubCategory && product.galleryFoot && product.galleryFoot.length > 0) {
        return product.galleryFoot;
      }
    }
    if (product.galleryDefault && product.galleryDefault.length > 0) {
      return product.galleryDefault;
    }
    if (product.galleryFoot && product.galleryFoot.length > 0) {
      return product.galleryFoot;
    }
    // Fallback default photos
    return [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        title: `${product.name} - Front Angle`,
        angleLabel: "Main Angle",
        description: product.subtitle
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        title: `${product.name} - Mounting & Shaft View`,
        angleLabel: "Shaft & Base",
        description: "Precision machined components and mounting tolerances."
      },
      {
        url: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
        title: `${product.name} - Terminal & Casing Detail`,
        angleLabel: "Terminal Detail",
        description: "High dielectric terminal block and enclosure housing."
      }
    ];
  }, [product, isSecondSubCategory]);

  // When mounting type or product changes, reset active photo to index 0
  useEffect(() => {
    setActivePhotoIndex(0);
    setImageError(false);
  }, [mountingType, product.id]);

  const currentPhoto = activeGallery[activePhotoIndex] || activeGallery[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === 0 ? activeGallery.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === activeGallery.length - 1 ? 0 : prev + 1));
  };

  const heightClasses =
    size === 'hero'
      ? 'h-[300px] sm:h-[380px] lg:h-[410px]'
      : size === 'modal'
      ? 'h-[250px] sm:h-[300px]'
      : 'h-[180px] sm:h-[210px]';

  return (
    <div className={`relative w-full flex flex-col gap-3 select-none ${className}`}>
      {/* Main Showcase Frame - Full Bleed Photo */}
      <div
        className={`relative w-full ${heightClasses} rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 group bg-slate-100`}
      >
        {/* Top Mounting / SubType Selector (Only shown if interactive with subcategories) */}
        {interactive && product.subCategories && product.subCategories.length > 0 && onMountingChange && (
          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/15 shadow-md">
              {product.subCategories.map((sub) => {
                const isSelected = mountingType 
                  ? mountingType === sub.id 
                  : sub.id === product.subCategories![0].id;
                
                const shortLabel =
                  sub.id === 'foot-mounted' ? 'Foot (B3)' :
                  sub.id === 'flange-mounted' ? 'Flange (B5/B14)' :
                  sub.id === 'relay-type' ? 'Relay Type' :
                  sub.id === 'servo-type' ? 'Servo Type' :
                  sub.name;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onMountingChange(sub.id)}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF6B00] text-white shadow-xs scale-100'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Photographic Image Display - Full Cover */}
        <div 
          onClick={() => interactive && size !== 'card' && setIsZoomOpen(true)}
          className={`w-full h-full overflow-hidden ${
            interactive && size !== 'card' ? 'cursor-zoom-in' : ''
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${product.id}-${mountingType}-${activePhotoIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {!imageError ? (
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-600 p-4 text-center">
                  <Camera className="w-10 h-10 text-[#FF6B00] mb-2" />
                  <p className="text-xs font-bold">{currentPhoto.title}</p>
                </div>
              )}

              {/* Subtle Zoom Button in Corner */}
              {interactive && size !== 'card' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomOpen(true);
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-md opacity-75 hover:opacity-100 z-10"
                  title="Enlarge Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows for multi-photo gallery */}
          {interactive && activeGallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md opacity-70 group-hover:opacity-100 active:scale-95 shadow-md z-10"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md opacity-70 group-hover:opacity-100 active:scale-95 shadow-md z-10"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dot Indicators for Image Pagination */}
      {interactive && activeGallery.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2.5 pb-1">
          {activeGallery.map((photo, idx) => {
            const isActive = activePhotoIndex === idx;
            return (
              <button
                key={`${photo.url}-${idx}`}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                aria-label={`View image ${idx + 1}: ${photo.angleLabel}`}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  isActive
                    ? 'w-7 h-2 bg-[#FF6B00] shadow-sm'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`${photo.angleLabel} (${idx + 1}/${activeGallery.length})`}
              />
            );
          })}
        </div>
      )}

      {/* Lightbox Modal for Fullscreen Photo Inspection */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                    {product.subCategories ? (product.subCategories.find(s => s.id === mountingType)?.name || (isSecondSubCategory ? product.subCategories[1]?.name : product.subCategories[0]?.name)) : product.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activePhotoIndex + 1} / {activeGallery.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Large Image */}
              <div className="relative w-full h-[320px] sm:h-[480px] bg-black flex items-center justify-center p-2">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />

                {activeGallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer with Clean Indicators */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-2">
                {activeGallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`Photo ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'w-7 h-2 bg-[#FF6B00]'
                        : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
