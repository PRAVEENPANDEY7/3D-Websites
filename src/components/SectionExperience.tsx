import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Sun, Droplets, Wind, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SectionExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const showcase = showcaseRef.current;
    if (!section || !showcase) return;

    const ctx = gsap.context(() => {
      // 1. Header smoothly slides up and fades in on scroll, and reverses on scroll up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Fully Bidirectional Scrubbed Timeline:
      // When scrolling down -> Center Kulhad and Side Texts fly into view.
      // When scrolling up (reverse) -> Center Kulhad and Side Texts smoothly retreat back out!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.8,
        },
      });

      // Center Kulhad Cup zooms in and fades in
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 0.65, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        );
      }

      // Left texts slide in from the left
      if (leftColRef.current) {
        const leftNotes = gsap.utils.toArray<HTMLElement>(leftColRef.current.children);
        tl.fromTo(
          leftNotes,
          { x: -110, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0
        );
      }

      // Right texts slide in from the right
      if (rightColRef.current) {
        const rightNotes = gsap.utils.toArray<HTMLElement>(rightColRef.current.children);
        tl.fromTo(
          rightNotes,
          { x: 110, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#0E2015] text-[#F5F0E5] overflow-hidden"
    >
      {/* Full Width Container utilizing side spaces (max-w-[95vw]) */}
      <div className="w-full max-w-[95vw] xl:max-w-[92vw] mx-auto px-4 sm:px-8 md:px-12 xl:px-16 relative z-10">
        
        {/* =========================================================================
            HEADER - Editorial & Centered
            ========================================================================= */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3826] text-[#F7CE68] text-xs uppercase tracking-[0.25em] mb-6 font-medium shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sensory Experience</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide text-[#F5F0E5] leading-[1.15] mb-5">
            More Than Just A Cup Of Tea.
          </h2>

          <p 
            className="font-editorial italic text-2xl md:text-3xl mb-6 font-medium"
            style={{ color: '#F7CE68', textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}
          >
            “Some moments deserve to be experienced, not rushed.”
          </p>

          <p className="text-base md:text-lg text-[#F5F0E5]/80 font-light leading-relaxed max-w-2xl mx-auto">
            From the freshness of tea gardens to the warmth of your kulhad, discover the little details that make every cup special.
          </p>
        </div>

        {/* =========================================================================
            SHOWCASE: GRAND TEA CUP + SYNCHRONIZED LEFT & RIGHT TEXTS
            ========================================================================= */}
        <div 
          ref={showcaseRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center w-full"
        >
          {/* Left Side: 2 Unboxed Elegant Texts pushed towards left */}
          <div 
            ref={leftColRef} 
            className="lg:col-span-3 xl:col-span-3 space-y-12 lg:space-y-20 flex flex-col justify-center text-left"
          >
            {/* Note 01 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#F7CE68]">
                <Flame className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-bold">
                  SENSORY NOTE 01
                </span>
              </div>
              <h3 className="font-serif text-2xl xl:text-3xl font-normal text-[#F5F0E5] leading-snug">
                Earthen Kulhad Porosity
              </h3>
              <p className="text-xs uppercase font-mono tracking-wider text-[#F7CE68]/90 font-semibold">
                Mitti Ki Khushboo
              </p>
              <p className="text-sm xl:text-base text-[#F5F0E5]/80 font-light leading-relaxed">
                Unglazed clay pores breathe organic minerals into hot tea, releasing the timeless nostalgic warmth of summer rain on Indian soil.
              </p>
            </div>

            {/* Note 02 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#F7CE68]">
                <Sun className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-bold">
                  SENSORY NOTE 02
                </span>
              </div>
              <h3 className="font-serif text-2xl xl:text-3xl font-normal text-[#F5F0E5] leading-snug">
                First Flush Shoots
              </h3>
              <p className="text-xs uppercase font-mono tracking-wider text-[#F7CE68]/90 font-semibold">
                Tender High-Altitude Leaves
              </p>
              <p className="text-sm xl:text-base text-[#F5F0E5]/80 font-light leading-relaxed">
                Tender two-leaves-and-a-bud hand-plucked in dawn mountain mist, preserving delicate muscatel floral sweetness and golden amber liquor.
              </p>
            </div>
          </div>

          {/* Center: Grand, Large Cup commanding the center stage */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative my-4 lg:my-0">
            <img
              ref={imageRef}
              src="/assets/images/steaming-chai-leaf-swirl.png"
              alt="Steaming Chai with Leaf Swirl"
              className="w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
              loading="lazy"
            />
          </div>

          {/* Right Side: 2 Unboxed Elegant Texts pushed towards right */}
          <div 
            ref={rightColRef} 
            className="lg:col-span-3 xl:col-span-3 space-y-12 lg:space-y-20 flex flex-col justify-center text-left"
          >
            {/* Note 03 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#F7CE68]">
                <Droplets className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-bold">
                  SENSORY NOTE 03
                </span>
              </div>
              <h3 className="font-serif text-2xl xl:text-3xl font-normal text-[#F5F0E5] leading-snug">
                Slow Simmer Alchemy
              </h3>
              <p className="text-xs uppercase font-mono tracking-wider text-[#F7CE68]/90 font-semibold">
                Artisanal Spiced Milk
              </p>
              <p className="text-sm xl:text-base text-[#F5F0E5]/80 font-light leading-relaxed">
                A patient rolling boil where whole milk gently marries crushed green cardamom pods, fresh ginger root, and robust malty leaves.
              </p>
            </div>

            {/* Note 04 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#F7CE68]">
                <Wind className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-bold">
                  SENSORY NOTE 04
                </span>
              </div>
              <h3 className="font-serif text-2xl xl:text-3xl font-normal text-[#F5F0E5] leading-snug">
                Mindful Presence
              </h3>
              <p className="text-xs uppercase font-mono tracking-wider text-[#F7CE68]/90 font-semibold">
                Slow Chai Meditation
              </p>
              <p className="text-sm xl:text-base text-[#F5F0E5]/80 font-light leading-relaxed">
                Holding warm unglazed terracotta with both hands creates an instant sensory grounding pause in the midst of everyday rush.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
