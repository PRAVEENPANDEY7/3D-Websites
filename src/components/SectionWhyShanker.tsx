import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BenefitStep {
  id: number;
  heading: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

export const SectionWhyShanker: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textStageRef = useRef<HTMLDivElement>(null);

  // Exact 3 Core Steps with synced image transitions for each:
  const benefits: BenefitStep[] = [
    {
      id: 1,
      heading: 'Sustained Mountain Vitality & Focus',
      subtitle: '“Hours of calm, clean energy — with zero caffeine jitters or mid-day crashes.”',
      description: 'Whole high-altitude tea leaves deliver slow-release natural caffeine balanced by L-Theanine, fueling steady physical stamina and effortless morning mental clarity.',
      image: '/assets/images/tea-leaf-wellness-new.png',
      alt: 'Shanker Tea Whole Leaf Botanical Science',
    },
    {
      id: 2,
      heading: 'Pure Cellular Longevity & Immunity',
      subtitle: '“Nature’s daily defense shield against environmental stress, fatigue, and aging.”',
      description: 'Tender morning flushes preserve peak concentrations of bioactive catechins, EGCG, and protective plant flavonoids that fortify your cells from within.',
      image: '/assets/images/benefit-immunity-longevity.png',
      alt: 'Pure Cellular Longevity and Immunity Bioactive Brew',
    },
    {
      id: 3,
      heading: 'Cardiovascular & Digestive Harmony',
      subtitle: '“Gentle circulatory warmth and soothing metabolic balance in every sip.”',
      description: 'Active tea polyphenols promote arterial elasticity and healthy blood flow, while gentle thermogenic warmth harmonizes your natural digestive equilibrium.',
      image: '/assets/images/benefit-digestive-harmony.png',
      alt: 'Cardiovascular and Digestive Harmony with Indian Terroir Herbs',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    const textStage = textStageRef.current;

    if (!section || !track || !stage || !textStage) return;

    const ctx = gsap.context(() => {
      const textItems = gsap.utils.toArray<HTMLElement>('.benefit-slide-text');
      const imageItems = gsap.utils.toArray<HTMLElement>('.benefit-slide-image');
      const totalSteps = textItems.length; // 3 steps

      // Pin the stage while user scrolls through the track
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Initial state: Step 0 visible, others hidden
      textItems.forEach((item, i) => {
        if (i === 0) {
          gsap.set(item, { opacity: 1, y: 0, pointerEvents: 'auto', display: 'flex' });
        } else {
          gsap.set(item, { opacity: 0, y: 25, pointerEvents: 'none', display: 'flex' });
        }
      });

      imageItems.forEach((img, i) => {
        if (i === 0) {
          gsap.set(img, { opacity: 1, scale: 1, pointerEvents: 'auto' });
        } else {
          gsap.set(img, { opacity: 0, scale: 0.96, pointerEvents: 'none' });
        }
      });

      // Cross-fade sequential animation for 3 steps (both image & text simultaneously)
      const stepDuration = 1 / (totalSteps - 1); // 0.5 per transition

      for (let i = 0; i < totalSteps - 1; i++) {
        const startTime = i * stepDuration;
        const currentText = textItems[i];
        const nextText = textItems[i + 1];
        const currentImg = imageItems[i];
        const nextImg = imageItems[i + 1];

        // Current item fades out smoothly
        tl.to(
          currentText,
          {
            opacity: 0,
            y: -20,
            pointerEvents: 'none',
            duration: stepDuration * 0.45,
            ease: 'power2.inOut',
          },
          startTime + stepDuration * 0.08
        );

        tl.to(
          currentImg,
          {
            opacity: 0,
            scale: 1.04,
            pointerEvents: 'none',
            duration: stepDuration * 0.45,
            ease: 'power2.inOut',
          },
          startTime + stepDuration * 0.08
        );

        // Next item fades in smoothly into the exact same spot
        tl.fromTo(
          nextText,
          { opacity: 0, y: 25, pointerEvents: 'none' },
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: stepDuration * 0.45,
            ease: 'power2.out',
          },
          startTime + stepDuration * 0.42
        );

        tl.fromTo(
          nextImg,
          { opacity: 0, scale: 0.96, pointerEvents: 'none' },
          {
            opacity: 1,
            scale: 1,
            pointerEvents: 'auto',
            duration: stepDuration * 0.45,
            ease: 'power2.out',
          },
          startTime + stepDuration * 0.42
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative w-full bg-[#0E2015] text-[#F5F0E5] overflow-hidden"
    >
      {/* Golden Ambient Gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#315B3B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          PINNED SCROLL-READING TRACK (STRETCHED TO FULL VIEWPORT WIDTH)
          3 STEPS ONLY — FAST, CRISP, AND UNCLUTTERED!
          Photo & Text cross-fade in sync on scroll.
          ========================================================================= */}
      <div ref={trackRef} className="relative w-full h-[240vh]">
        
        {/* Pinned Stage - Locked full screen utilizing all screen space */}
        <div 
          ref={stageRef}
          className="h-screen w-full flex flex-col justify-center px-4 sm:px-8 md:px-12 xl:px-16 2xl:px-20 overflow-hidden z-20"
        >
          {/* Integrated Editorial Section Header - Full Wide Stretched */}
          <div className="w-full max-w-[96vw] xl:max-w-[94vw] 2xl:max-w-[92vw] mx-auto mb-2 sm:mb-4 md:mb-6 pt-2 sm:pt-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-[#1A3826] text-[#F7CE68] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-1 sm:mb-2 font-medium shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Philosophy & Botanical Science</span>
            </div>

            <h2 className="font-serif text-xl sm:text-3xl md:text-5xl xl:text-6xl font-light text-[#F5F0E5] tracking-wide mb-1 leading-tight">
              Why Choose Shanker Tea?
            </h2>

            <p 
              className="font-editorial italic text-sm sm:text-lg md:text-2xl xl:text-3xl font-medium"
              style={{ color: '#F7CE68', textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}
            >
              “Because every cup should feel worth remembering.”
            </p>
          </div>

          {/* Grand Showcase Row: 7-5 Balanced Grid */}
          <div className="w-full max-w-[96vw] xl:max-w-[94vw] 2xl:max-w-[92vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-10 xl:gap-14 items-center">
            
            {/* =====================================================================
                LEFT SIDE: DYNAMIC BENEFITS IMAGE STAGE (CROSS-FADES ON SCROLL)
                ===================================================================== */}
            <div className="lg:col-span-7 xl:col-span-7 flex items-center justify-center lg:justify-start relative">
              <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-2xl xl:max-w-[680px] 2xl:max-w-[740px] max-h-[28vh] sm:max-h-[35vh] lg:max-h-none aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                {benefits.map((benefit) => (
                  <div
                    key={`img-${benefit.id}`}
                    className="benefit-slide-image absolute inset-0 flex items-center justify-center transition-opacity"
                  >
                    <img
                      src={benefit.image}
                      alt={benefit.alt}
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-[1.04]"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================================
                RIGHT SIDE: PURE EDITORIAL TEXT STAGE (CROSS-FADES IN SYNC WITH IMAGE)
                ===================================================================== */}
            <div 
              ref={textStageRef}
              className="lg:col-span-5 xl:col-span-5 relative h-[180px] sm:h-[220px] md:h-[260px] xl:h-[300px] flex items-center pl-1 sm:pl-2 lg:pl-4 xl:pl-8"
            >
              {benefits.map((benefit) => {
                return (
                  <div
                    key={`txt-${benefit.id}`}
                    className="benefit-slide-text absolute inset-0 flex flex-col justify-center"
                  >
                    {/* Main Clean Heading (NO annoying 01/03 badge) */}
                    <h3 className="font-serif text-lg sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-light text-[#F5F0E5] tracking-wide mb-1.5 sm:mb-2.5 leading-tight">
                      {benefit.heading}
                    </h3>

                    {/* Golden Italic Subtitle Explaining the Benefit */}
                    <p 
                      className="font-editorial italic text-xs sm:text-base md:text-lg xl:text-xl 2xl:text-2xl mb-1.5 sm:mb-2.5 font-medium leading-snug"
                      style={{ color: '#F7CE68', textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}
                    >
                      {benefit.subtitle}
                    </p>

                    {/* Clean 2-Liner Explanation */}
                    <p className="text-xs sm:text-sm md:text-base xl:text-lg text-[#F5F0E5]/80 font-light leading-relaxed max-w-lg">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
