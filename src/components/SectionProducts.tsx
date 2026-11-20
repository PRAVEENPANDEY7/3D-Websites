import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShoppingBag, 
  Check,
  Leaf,
  Flame,
  Sun
} from 'lucide-react';

interface ProductItem {
  id: string;
  num: string;
  shortName: string;
  icon: React.ReactNode;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  glowColor: string;
  pricing: {
    '250g': number;
    '500g': number;
    '1kg': number;
  };
  signatureQuality: string;
}

interface SectionProductsProps {
  onOpenInquiry: (productName?: string) => void;
}

export const SectionProducts: React.FC<SectionProductsProps> = ({ onOpenInquiry }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('500g');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const products: ProductItem[] = [
    {
      id: 'premium-ctc',
      num: '01',
      shortName: 'CTC',
      icon: <Leaf className="w-4 h-4" />,
      name: 'Shanker Premium CTC Tea',
      tagline: 'RICH • STRONG • AROMATIC',
      description: 'Whole-grain CTC blended with golden tips for a brisk, rich morning brew.',
      image: '/assets/images/product-premium-ctc.png',
      accentColor: '#F7CE68',
      glowColor: 'rgba(42, 90, 59, 0.55)',
      pricing: {
        '250g': 140,
        '500g': 270,
        '1kg': 520,
      },
      signatureQuality: '100% First-Flush Whole Grain CTC & Golden Orthodox Tips',
    },
    {
      id: 'kadak-chai',
      num: '02',
      shortName: 'Kadak',
      icon: <Flame className="w-4 h-4" />,
      name: 'Shanker Kadak Chai Patti',
      tagline: 'EXTRA STRONG BLEND',
      description: 'High-grown granular leaves crafted for an intense, full-bodied kadak chai.',
      image: '/assets/images/product-kadak-chai.png',
      accentColor: '#C26A41',
      glowColor: 'rgba(122, 32, 33, 0.55)',
      pricing: {
        '250g': 125,
        '500g': 240,
        '1kg': 460,
      },
      signatureQuality: 'High-Altitude Granular Leaves for an Intense Malty Kick',
    },
    {
      id: 'adrak-chai',
      num: '03',
      shortName: 'Adrak',
      icon: <Sun className="w-4 h-4" />,
      name: 'Shanker Adrak Chai Patti',
      tagline: 'WITH NATURAL GINGER',
      description: 'Sun-dried ginger root infused with brisk mountain tea for spicy warmth.',
      image: '/assets/images/product-adrak-chai.png',
      accentColor: '#F7CE68',
      glowColor: 'rgba(184, 122, 30, 0.55)',
      pricing: {
        '250g': 160,
        '500g': 310,
        '1kg': 590,
      },
      signatureQuality: 'Real Sun-Dried Mountain Ginger for Deep Digestive Warmth',
    },
    {
      id: 'elaichi-chai',
      num: '04',
      shortName: 'Elaichi',
      icon: <Sparkles className="w-4 h-4" />,
      name: 'Shanker Elaichi Chai Patti',
      tagline: 'WITH NATURAL CARDAMOM',
      description: 'Crushed green cardamom pods giving a sweet, royal aroma to brisk leaves.',
      image: '/assets/images/product-elaichi-chai.png',
      accentColor: '#68B984',
      glowColor: 'rgba(63, 116, 76, 0.55)',
      pricing: {
        '250g': 180,
        '500g': 350,
        '1kg': 680,
      },
      signatureQuality: 'Crushed Green Cardamom Pods for Royal Fragrant Sweetness',
    },
  ];

  const currentProduct = products[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  // 3D Card Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 18), y: x * 18 });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Smooth Animate Showcase on Index Change
  useEffect(() => {
    if (!showcaseRef.current) return;
    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0.35, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [currentIdx]);

  return (
    <section
      id="products"
      className="relative w-full py-16 md:py-24 bg-[#0E2015] text-[#F5F0E5] overflow-hidden"
    >
      {/* Inline Floating Animation Style Sheet */}
      <style>{`
        @keyframes pouchFloatEffect {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(0.8deg);
          }
        }
        @keyframes shadowFloatEffect {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(0.82);
            opacity: 0.35;
          }
        }
        .pouch-floating-animation {
          animation: pouchFloatEffect 4.5s ease-in-out infinite;
        }
        .shadow-pulsing-animation {
          animation: shadowFloatEffect 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Dynamic Atmospheric Glow */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentProduct.glowColor }}
      />

      <div className="w-full max-w-[96vw] xl:max-w-[94vw] 2xl:max-w-[90vw] mx-auto px-4 sm:px-8 md:px-12 xl:px-16 relative z-10">
        
        {/* =========================================================================
            HEADER - CODED IN PURE HTML/CSS (SPACIOUS & ELEGANT)
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-5 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-[#F7CE68] mb-2 font-semibold">
              <span>THE SHANKER TEA RANGE</span>
              <span className="w-10 h-[1px] bg-[#F7CE68]/60" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-[#F5F0E5] leading-tight">
              A CHAI FOR <span style={{ color: '#F7CE68' }}>EVERY MOOD</span>
            </h2>
          </div>

          <div className="lg:border-l lg:border-[#F7CE68]/30 lg:pl-6 max-w-sm">
            <p className="font-editorial italic text-sm sm:text-base text-[#F5F0E5]/80 font-light leading-relaxed">
              “From the boldness of Kadak to the warmth of Adrak, explore our specially crafted tea blends.”
            </p>
          </div>
        </div>

        {/* =========================================================================
            3D FLOATING SHOWCASE:
            LEFT: VARIETY ICONS + COUNTER + 3D POUCH
            RIGHT: CLEAN REFINED DETAILS & PRICING
            ========================================================================= */}
        <div
          ref={showcaseRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center"
        >
          {/* =======================================================================
              LEFT SIDE: VARIETY SELECTOR + 3D FLOATING TRANSPARENT POUCH
              ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col md:flex-row items-center justify-center gap-6 relative select-none">
            
            {/* Variety Switcher Tabs: Placed on the LEFT of the packet */}
            <div className="flex flex-row md:flex-col items-center gap-2 sm:gap-2.5 z-20 shrink-0">
              {products.map((p, idx) => {
                const isActive = currentIdx === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`group relative flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F7CE68] to-[#E5B544] text-[#0E2015] font-bold shadow-lg shadow-[#F7CE68]/25 scale-105'
                        : 'bg-white/[0.04] text-[#F5F0E5]/75 hover:bg-white/[0.08] hover:text-[#F7CE68] border border-white/[0.07]'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#0E2015]/15 text-[#0E2015]' : 'bg-black/40 text-[#F7CE68]'
                    }`}>
                      {p.icon}
                    </div>
                    
                    {/* Compact Label */}
                    <div className="flex flex-col text-left">
                      <span className={`text-[9px] font-mono tracking-widest ${
                        isActive ? 'text-[#0E2015]/70' : 'text-white/40'
                      }`}>
                        {p.num}
                      </span>
                      <span className="text-xs sm:text-sm font-serif tracking-wider font-semibold whitespace-nowrap">
                        {p.shortName}
                      </span>
                    </div>

                    {/* Active Accent Pointer on Desktop */}
                    {isActive && (
                      <span className="hidden md:block absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-[#F7CE68] rounded-full shadow-[0_0_8px_#F7CE68]" />
                    )}
                  </button>
                );
              })}

              {/* INTEGRATED NAVIGATION CONTROLS (< 4 / 4 >) UNDER BUTTONS */}
              <div className="flex items-center justify-center gap-2.5 pt-2.5 md:pt-3 md:mt-1 border-t border-white/[0.08] w-full">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Tea Variety"
                  className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-[#F7CE68] hover:text-[#0E2015] text-[#F5F0E5] flex items-center justify-center transition-all duration-200 border border-white/10 shadow-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="font-mono text-xs uppercase tracking-widest text-[#F7CE68] font-bold px-1">
                  {currentIdx + 1} / {products.length}
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next Tea Variety"
                  className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-[#F7CE68] hover:text-[#0E2015] text-[#F5F0E5] flex items-center justify-center transition-all duration-200 border border-white/10 shadow-sm"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pouch Container & 3D Tilt */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* 3D Interactive Perspective Wrapper */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-grab active:cursor-grabbing flex flex-col items-center justify-center"
                style={{ perspective: '1100px' }}
              >
                {/* Floating Transparent Pouch */}
                <div
                  className={`relative w-full max-w-[250px] sm:max-w-[280px] md:max-w-[310px] xl:max-w-[340px] transition-transform ${
                    isHovered ? '' : 'pouch-floating-animation'
                  }`}
                  style={{
                    transform: isHovered 
                      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                      : undefined,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                  }}
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                    loading="eager"
                  />

                  {/* Soft Color Halo directly behind pouch */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-35 blur-2xl pointer-events-none transition-colors duration-700 -z-10"
                    style={{ backgroundColor: currentProduct.glowColor }}
                  />
                </div>

                {/* Pulsing Floor Shadow for Pure Levitation */}
                <div 
                  className="w-44 sm:w-52 h-4 sm:h-5 bg-black/60 rounded-full blur-md mt-4 shadow-pulsing-animation pointer-events-none"
                />
              </div>
            </div>

          </div>

          {/* =======================================================================
              RIGHT SIDE: CLEAN, SOPHISTICATED PRODUCT DETAILS & PRICING
              ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3826] text-[#F7CE68] text-[10px] uppercase tracking-[0.2em] font-bold w-fit shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>{currentProduct.tagline}</span>
            </div>

            {/* Product Title */}
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F0E5] tracking-wide leading-tight">
              {currentProduct.name}
            </h3>

            {/* Crisp Short Narrative (Clean 1-liner) */}
            <p className="text-base sm:text-lg text-[#F5F0E5]/80 font-light leading-relaxed max-w-xl">
              {currentProduct.description}
            </p>

            {/* Standout Signature Quality (Clean Single Highlight - Replaces Tiny Chips) */}
            <div className="flex items-center gap-2.5 pt-1 text-sm font-medium text-[#F7CE68]">
              <Sparkles className="w-4 h-4 shrink-0 text-[#F7CE68]" />
              <span className="tracking-wide">{currentProduct.signatureQuality}</span>
            </div>

            {/* ===================================================================
                CLEAN WEIGHT SELECTOR & DYNAMIC PRICING BAR
                =================================================================== */}
            <div className="pt-6 mt-2 border-t border-white/[0.08] space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Weight Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F7CE68] font-bold mr-1">
                    Pack:
                  </span>
                  {(['250g', '500g', '1kg'] as const).map((wt) => {
                    const isSelected = selectedWeight === wt;
                    return (
                      <button
                        key={wt}
                        onClick={() => setSelectedWeight(wt)}
                        className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#F7CE68] text-[#0E2015] font-bold shadow-md'
                            : 'bg-black/30 text-[#F5F0E5]/70 hover:bg-black/50 hover:text-white border border-white/5'
                        }`}
                      >
                        {wt}
                      </button>
                    );
                  })}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl sm:text-4xl text-[#F7CE68] font-bold">
                    ₹{currentProduct.pricing[selectedWeight]}
                  </span>
                  <span className="font-mono text-xs text-white/50">
                    / {selectedWeight}
                  </span>
                </div>
              </div>

              {/* Order Button Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                  <span className="flex items-center gap-1 text-[#F7CE68]">
                    <Check className="w-3.5 h-3.5" /> Fresh Harvest
                  </span>
                  <span className="flex items-center gap-1 text-[#F7CE68]">
                    <Check className="w-3.5 h-3.5" /> All Taxes Inc.
                  </span>
                </div>

                <button
                  onClick={() => onOpenInquiry(`${currentProduct.name} (${selectedWeight})`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#F7CE68] hover:bg-[#FFE18E] text-[#0E2015] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Inquire / Order Now</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
