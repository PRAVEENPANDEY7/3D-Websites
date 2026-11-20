import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroCanvas } from './components/HeroCanvas.tsx';
import { SectionExperience } from './components/SectionExperience.tsx';
import { SectionWhyShanker } from './components/SectionWhyShanker.tsx';
import { SectionProducts } from './components/SectionProducts.tsx';
import { SectionFinalBrand } from './components/SectionFinalBrand.tsx';
import { TastingModal } from './components/TastingModal.tsx';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  // Smooth Lenis Scroll setup synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleOpenInquiry = (productName?: string) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#163D2B] text-[#F5F0E5] selection:bg-[#C7A66A]/30 selection:text-[#F5F0E5]">
      {/* Editorial Preloader */}
      <Preloader progress={loadProgress} isReady={isReady} />

      {/* Fixed Luxury Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Main Storytelling Sections */}
      <main className="relative w-full">
        {/* Section 01: The Cinematic Hero (Canvas Scroll Sequence) */}
        <HeroCanvas
          onProgressUpdate={(p) => setLoadProgress(p)}
          onInitialReady={() => setIsReady(true)}
        />

        {/* Section 02: The Experience */}
        <SectionExperience />

        {/* Section 03: Why Shanker Tea? */}
        <SectionWhyShanker />

        {/* Section 04: Our Products & Quality */}
        <SectionProducts onOpenInquiry={handleOpenInquiry} />

        {/* Section 05: The Final Brand Experience & Footer */}
        <SectionFinalBrand onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Interactive Tasting Inquiry Modal */}
      <TastingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProduct={selectedProduct}
      />
    </div>
  );
};

export default App;
