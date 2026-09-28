import React, { useState, useEffect, useRef } from 'react';
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
  Info,
  UploadCloud,
  ImagePlus
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
  const [imgSrc, setImgSrc] = useState<string>('');

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (currentPhoto?.url) {
      // Clear stale duplicate cache if stored for flng_3 or foot_alu
      if (currentPhoto.url.includes('flng_3')) {
        try {
          localStorage.removeItem('ss_photo_/flng_3.png');
          localStorage.removeItem('ss_photo_/flng_3.png'.toLowerCase());
        } catch {
          // ignore
        }
      }
      if (currentPhoto.url.includes('foot_alu') || currentPhoto.url.includes('regenerated_image_1790584799192')) {
        try {
          localStorage.removeItem('ss_photo_/foot_alu.png');
          localStorage.removeItem('ss_photo_/foot_alu.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/regenerated_image_1790584799192.png');
          localStorage.removeItem('ss_photo_/regenerated_image_1790584799192.png'.toLowerCase());
        } catch {
          // ignore
        }
      }
      if (currentPhoto.url.includes('relay_vtlg') || currentPhoto.url.includes('white_blank') || currentPhoto.url.includes('relay_1') || currentPhoto.url.includes('ee06c767')) {
        try {
          localStorage.removeItem('ss_photo_/relay_vtlg.png');
          localStorage.removeItem('ss_photo_/relay_vtlg.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/white_blank.png');
          localStorage.removeItem('ss_photo_/white_blank.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/relay_1.png');
          localStorage.removeItem('ss_photo_/relay_1.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/ee06c767-4ce5-484f-aba4-71677d4dde8d.png');
          localStorage.removeItem('ss_photo_/553cb61f-e729-483c-92ed-e3fa1ba3b685.png');
        } catch {
          // ignore
        }
      }
      if (currentPhoto.url.includes('servo_blank') || currentPhoto.url.includes('9ae0') || currentPhoto.url.includes('2a1c')) {
        try {
          localStorage.removeItem('ss_photo_/servo_blank.png');
          localStorage.removeItem('ss_photo_/servo_blank.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/servo_blank_1.png');
          localStorage.removeItem('ss_photo_/servo_blank_1.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/servo_blank_2.png');
          localStorage.removeItem('ss_photo_/servo_blank_2.png'.toLowerCase());
          localStorage.removeItem('ss_photo_/9ae02810-d66d-4f0c-9480-f2716c93962d.png');
          localStorage.removeItem('ss_photo_/2a1c323c-b154-47a7-9d30-e69f1953bc88.png');
        } catch {
          // ignore
        }
      }

      const stored = 
        localStorage.getItem('ss_photo_' + currentPhoto.url) ||
        localStorage.getItem('ss_photo_' + currentPhoto.url.toLowerCase());
      if (stored) {
        setImgSrc(stored);
        setImageError(false);
      } else {
        setImgSrc(currentPhoto.url);
        setImageError(false);
      }
    }
  }, [currentPhoto?.url, activePhotoIndex]);

  const saveImageFile = async (file: File, targetUrl?: string) => {
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      if (!base64) {
        setIsUploading(false);
        return;
      }
      
      const key = targetUrl || currentPhoto.url;
      try {
        localStorage.setItem('ss_photo_' + key, base64);
        localStorage.setItem('ss_photo_' + key.toLowerCase(), base64);
      } catch (err) {
        console.warn('Storage quota note:', err);
      }
      
      if (!targetUrl || targetUrl === currentPhoto.url) {
        setImgSrc(base64);
        setImageError(false);
      }

      // Persist to server /public directory
      try {
        const cleanFilename = (targetUrl || currentPhoto.url).replace(/^\//, '');
        await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: cleanFilename, base64 })
        });
      } catch (err) {
        console.warn('Server upload notice:', err);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const lower = file.name.toLowerCase();
        if (lower.includes('flng_3') || lower.includes('flng-3') || lower.includes('flng3') || lower.includes('5525')) {
          saveImageFile(file, '/flng_3.png');
        } else if (lower.includes('flange_1_phase') || lower.includes('flange-1-phase') || lower.includes('flange_1') || lower.includes('flange-1') || lower.includes('5524')) {
          saveImageFile(file, '/flange_1_phase.png');
          saveImageFile(file, '/flange_1.png');
        } else if (lower.includes('flange_3') || lower.includes('flange-3')) {
          saveImageFile(file, '/flange_3.png');
        } else if (lower.includes('5521') || lower.includes('flange')) {
          saveImageFile(file, '/surge-shore-aluminium-flange-mounted.png');
          saveImageFile(file, '/IMG_5521.PNG');
        } else if (lower.includes('foot_alu') || lower.includes('foot-alu') || lower.includes('foot_al') || lower.includes('chatgpt') || lower.includes('alum') || lower.includes('03_13_19') || lower.includes('1790584799192')) {
          saveImageFile(file, '/foot_alu.png');
          saveImageFile(file, '/regenerated_image_1790584799192.png');
          saveImageFile(file, '/surge-shore-aluminium-foot-mounted.png');
        } else if (lower.includes('3df1') || lower.includes('3500') || lower.includes('orange')) {
          saveImageFile(file, '/3df1fd38-0c74-49ec-b7d8-3e3cc594ad94.png');
        } else if (lower.includes('876f') || lower.includes('6000') || lower.includes('silver') || lower.includes('tested')) {
          saveImageFile(file, '/876fd32f-ba7f-4e51-ab42-f144e0f32fc5.png');
        } else if (lower.includes('wa0002') || lower.includes('lineup') || lower.includes('range')) {
          saveImageFile(file, '/IMG-20260724-WA0002.jpg.jpeg');
        } else if (lower.includes('553c') || lower.includes('vertical') || lower.includes('wall')) {
          saveImageFile(file, '/553cb61f-e729-483c-92ed-e3fa1ba3b685.png');
        } else if (lower.includes('vtlg') || lower.includes('relay_vtlg') || lower.includes('white_blank') || lower.includes('white-blank') || lower.includes('blank') || lower.includes('relay_1') || lower.includes('relay-1') || lower.includes('ee06') || lower.includes('horizontal') || (lower.includes('relay') && !lower.includes('wall') && !lower.includes('vertical'))) {
          saveImageFile(file, '/relay_vtlg.png');
          saveImageFile(file, '/white_blank.png');
          saveImageFile(file, '/relay_1.png');
          saveImageFile(file, '/ee06c767-4ce5-484f-aba4-71677d4dde8d.png');
        } else if (lower.includes('2a1c') || lower.includes('1phase') || (lower.includes('servo') && !lower.includes('3phase') && !lower.includes('smart'))) {
          saveImageFile(file, '/servo_blank_2.png');
          saveImageFile(file, '/2a1c323c-b154-47a7-9d30-e69f1953bc88.png');
        } else if (lower.includes('9ae0') || lower.includes('3phase') || lower.includes('smart') || lower.includes('cabinet') || lower.includes('wheel') || lower.includes('servo')) {
          saveImageFile(file, '/servo_blank.png');
          saveImageFile(file, '/servo_blank_1.png');
          saveImageFile(file, '/9ae02810-d66d-4f0c-9480-f2716c93962d.png');
        } else if (lower.includes('f7c4') || lower.includes('s7-1200') || (lower.includes('automation') && lower.includes('panel') && !lower.includes('wall'))) {
          saveImageFile(file, '/f7c4b342-52a5-421b-aa77-56a0a4aeca0a.png');
        } else if (lower.includes('3e75') || (lower.includes('automation') && (lower.includes('wall') || lower.includes('tank')))) {
          saveImageFile(file, '/3e75ecb7-6855-4c5e-aaec-e619bc54f722.png');
        } else if (lower.includes('4226') || lower.includes('feeder') || lower.includes('distribution') || lower.includes('pcc')) {
          saveImageFile(file, '/4226810a-b806-4864-84b1-560112372c31.png');
        } else if (i < activeGallery.length) {
          saveImageFile(file, activeGallery[i].url);
        }
      }
    } else {
      const file = files[0];
      const lower = file.name.toLowerCase();
      if (lower.includes('flng_3') || lower.includes('flng-3') || lower.includes('flng3') || lower.includes('5525')) {
        saveImageFile(file, '/flng_3.png');
      } else if (lower.includes('flange_1_phase') || lower.includes('flange-1-phase') || lower.includes('flange_1') || lower.includes('flange-1') || lower.includes('5524')) {
        saveImageFile(file, '/flange_1_phase.png');
        saveImageFile(file, '/flange_1.png');
      } else if (lower.includes('flange_3') || lower.includes('flange-3')) {
        saveImageFile(file, '/flange_3.png');
      } else if (lower.includes('5521') || lower.includes('flange')) {
        saveImageFile(file, '/surge-shore-aluminium-flange-mounted.png');
        saveImageFile(file, '/IMG_5521.PNG');
      } else if (lower.includes('foot_alu') || lower.includes('foot-alu') || lower.includes('foot_al') || lower.includes('chatgpt') || lower.includes('alum') || lower.includes('03_13_19') || lower.includes('1790584799192')) {
        saveImageFile(file, '/foot_alu.png');
        saveImageFile(file, '/regenerated_image_1790584799192.png');
        saveImageFile(file, '/surge-shore-aluminium-foot-mounted.png');
      } else if (lower.includes('3df1') || lower.includes('3500') || lower.includes('orange')) {
        saveImageFile(file, '/3df1fd38-0c74-49ec-b7d8-3e3cc594ad94.png');
      } else if (lower.includes('876f') || lower.includes('6000') || lower.includes('silver') || lower.includes('tested')) {
        saveImageFile(file, '/876fd32f-ba7f-4e51-ab42-f144e0f32fc5.png');
      } else if (lower.includes('wa0002') || lower.includes('lineup') || lower.includes('range')) {
        saveImageFile(file, '/IMG-20260724-WA0002.jpg.jpeg');
      } else if (lower.includes('553c') || lower.includes('vertical') || lower.includes('wall-mount')) {
        saveImageFile(file, '/553cb61f-e729-483c-92ed-e3fa1ba3b685.png');
      } else if (lower.includes('vtlg') || lower.includes('relay_vtlg') || lower.includes('white_blank') || lower.includes('white-blank') || lower.includes('blank') || lower.includes('relay_1') || lower.includes('relay-1') || lower.includes('ee06') || lower.includes('horizontal') || (lower.includes('relay') && !lower.includes('wall') && !lower.includes('vertical'))) {
        saveImageFile(file, '/relay_vtlg.png');
        saveImageFile(file, '/white_blank.png');
        saveImageFile(file, '/relay_1.png');
        saveImageFile(file, '/ee06c767-4ce5-484f-aba4-71677d4dde8d.png');
      } else if (lower.includes('2a1c') || lower.includes('1phase') || (lower.includes('servo') && !lower.includes('3phase') && !lower.includes('smart'))) {
        saveImageFile(file, '/servo_blank_2.png');
        saveImageFile(file, '/2a1c323c-b154-47a7-9d30-e69f1953bc88.png');
      } else if (lower.includes('9ae0') || lower.includes('3phase') || lower.includes('smart') || lower.includes('cabinet') || lower.includes('wheel') || lower.includes('servo')) {
        saveImageFile(file, '/servo_blank.png');
        saveImageFile(file, '/servo_blank_1.png');
        saveImageFile(file, '/9ae02810-d66d-4f0c-9480-f2716c93962d.png');
      } else if (lower.includes('f7c4') || lower.includes('s7-1200') || (lower.includes('automation') && lower.includes('panel') && !lower.includes('wall'))) {
        saveImageFile(file, '/f7c4b342-52a5-421b-aa77-56a0a4aeca0a.png');
      } else if (lower.includes('3e75') || (lower.includes('automation') && (lower.includes('wall') || lower.includes('tank')))) {
        saveImageFile(file, '/3e75ecb7-6855-4c5e-aaec-e619bc54f722.png');
      } else if (lower.includes('4226') || lower.includes('feeder') || lower.includes('distribution') || lower.includes('pcc')) {
        saveImageFile(file, '/4226810a-b806-4864-84b1-560112372c31.png');
      } else {
        saveImageFile(file, currentPhoto.url);
      }
    }
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (imageError && e.clipboardData?.files?.length) {
        handleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [imageError, currentPhoto?.url]);

  const handleImageError = () => {
    if (imgSrc.includes(' (1)') || imgSrc.includes(' (2)')) {
      setImgSrc(imgSrc.replace(/\s\(\d\)/, ''));
    } else if (imgSrc.endsWith('.PNG')) {
      setImgSrc(imgSrc.replace(/\.PNG$/, '.png'));
    } else {
      setImageError(true);
    }
  };

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
        className={`relative w-full ${heightClasses} rounded-2xl sm:rounded-3xl overflow-hidden group bg-transparent flex items-center justify-center`}
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
                  sub.id === 'relay-type' ? 'Relay (1-PH Only)' :
                  sub.id === 'servo-type' ? 'Servo (1-PH & 3-PH)' :
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div 
          onClick={() => interactive && size !== 'card' && setIsZoomOpen(true)}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`w-full h-full overflow-hidden relative ${
            interactive && size !== 'card' ? 'cursor-zoom-in' : ''
          }`}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-[#FF6B00]/20 border-2 border-dashed border-[#FF6B00] rounded-xl flex items-center justify-center z-30 pointer-events-none backdrop-blur-xs">
              <span className="px-4 py-2 bg-[#FF6B00] text-white font-bold text-xs rounded-lg shadow-lg">
                Drop Photo to Upload / Update
              </span>
            </div>
          )}
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
                  src={imgSrc || currentPhoto.url}
                  alt={currentPhoto.title}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105 select-none"
                />
              ) : (
                <div 
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className={`w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? 'bg-orange-50/90 border-2 border-dashed border-[#FF6B00]' 
                      : 'bg-gradient-to-b from-slate-50 to-slate-100 hover:bg-slate-200/50 border border-slate-200'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/90 text-[#FF6B00] flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                    {isUploading ? (
                      <div className="w-6 h-6 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-800 mb-0.5">{currentPhoto.title}</p>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Click to load <span className="font-mono text-[#00205B] font-semibold">{currentPhoto.url.replace(/^\//, '')}</span> or drag & drop here
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF6B00] hover:bg-[#E55A00] text-white text-[11px] font-semibold shadow-xs transition-colors">
                    <ImagePlus className="w-3.5 h-3.5" />
                    Select Photo File
                  </span>
                </div>
              )}

              {/* Corner Controls */}
              {interactive && size !== 'card' && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomOpen(true);
                    }}
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-md opacity-75 hover:opacity-100"
                    title="Enlarge Photo"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
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

      {/* Clean Pagination Dot Indicators */}
      {interactive && activeGallery.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-1.5 pb-0.5">
          {activeGallery.map((photo, idx) => {
            const isActive = activePhotoIndex === idx;
            return (
              <button
                key={`${photo.url}-${idx}`}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                aria-label={`View photo ${idx + 1}: ${photo.angleLabel || photo.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  isActive
                    ? 'w-7 h-2 bg-[#FF6B00] shadow-sm'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`${photo.angleLabel || photo.title} (${idx + 1}/${activeGallery.length})`}
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
                  src={imgSrc || currentPhoto.url}
                  alt={currentPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-lg select-none"
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
