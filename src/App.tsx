import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutSection } from './components/AboutSection';
import { QualityStandards } from './components/QualityStandards';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_DATA } from './data/products';
import { ProductItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentView, setCurrentView] = useState<'home' | 'product-detail'>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Sync state with browser hash routing (supports direct links e.g. #/product/ci-induction-motors)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/product/') || hash.startsWith('#product-')) {
        const productId = hash.replace('#/product/', '').replace('#product-', '');
        const found = PRODUCTS_DATA.find((p) => p.id === productId);
        if (found) {
          setSelectedProduct(found);
          setCurrentView('product-detail');
          return;
        }
      }

      // If hash is a section like #products or #/products or empty
      if (hash === '' || hash === '#' || hash === '#/' || hash === '#hero') {
        setCurrentView('home');
        setActiveSection('hero');
      } else {
        const cleanSection = hash.replace('#/', '').replace('#', '');
        const validSections = ['products', 'about', 'quality', 'contact'];
        if (validSections.includes(cleanSection)) {
          setCurrentView('home');
          setActiveSection(cleanSection);
          setTimeout(() => {
            const elem = document.getElementById(cleanSection);
            if (elem) {
              elem.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.location.hash = `#/product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    window.location.hash = `#/products`;
    setTimeout(() => {
      const elem = document.getElementById('products');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView === 'product-detail') {
      setCurrentView('home');
      window.location.hash = `#/${sectionId}`;
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      setActiveSection(sectionId);
      window.location.hash = `#/${sectionId}`;
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-[#FF6B00] selection:text-white">
      {/* Professional Fixed Header */}
      <Header
        activeSection={currentView === 'product-detail' ? 'products' : activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content: Animated View Transition */}
      <AnimatePresence mode="wait">
        {currentView === 'product-detail' && selectedProduct ? (
          <motion.div
            key={`product-${selectedProduct.id}`}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 28,
                mass: 0.8
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.96, 
              y: 16,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="w-full origin-top"
          >
            <ProductDetailPage
              product={selectedProduct}
              onBackToCatalog={handleBackToCatalog}
              onSelectProduct={handleSelectProduct}
              onOpenContact={() => scrollToSection('contact')}
            />
          </motion.div>
        ) : (
          <motion.main
            key="home-main"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.28, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.98,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="relative"
          >
            {/* 1. Hero Overview */}
            <Hero
              onExploreCatalog={() => scrollToSection('products')}
              onOpenContact={() => scrollToSection('contact')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 2. Comprehensive Product Catalog & Technical Photos */}
            <ProductCatalog
              onOpenContact={() => scrollToSection('contact')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 3. Company Story & Digital Visiting Card */}
            <AboutSection
              onOpenContact={() => scrollToSection('contact')}
            />

            {/* 4. Manufacturing Standards & Testing Protocol */}
            <QualityStandards />

            {/* 5. Factory Location & Direct Inquiries */}
            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Quick WhatsApp Chat Trigger (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href={`https://wa.me/919173959019?text=Hello%20Surge%20Shore%20Powertech%2C%20I%20would%20like%20to%20inquire%20about%20your%20motors%20and%20panels.`}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg hover:scale-105 transition-all flex items-center justify-center cursor-pointer group"
          title="Direct WhatsApp Chat with Factory"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold ml-0 group-hover:ml-2">
            WhatsApp Direct
          </span>
        </a>
      </div>
    </div>
  );
}
