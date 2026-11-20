import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Globe, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionFinalBrandProps {
  onOpenInquiry: () => void;
}

export const SectionFinalBrand: React.FC<SectionFinalBrandProps> = ({ onOpenInquiry }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="brand"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#0F2B1E] text-[#F5F0E5] px-6 md:px-12 lg:px-24 pt-32 pb-12 overflow-hidden"
    >
      {/* Cinematic Golden Mist Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-[#C7A66A]/10 via-[#163D2B]/50 to-[#0F2B1E]" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#0A1D14] to-transparent" />
      </div>

      {/* Decorative Subtle Earthen Ring */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#C7A66A]/10 blur-sm pointer-events-none" />

      {/* Hero Emotional Closing Statement */}
      <div ref={contentRef} className="max-w-4xl mx-auto text-center relative z-10 my-auto py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold text-[#C7A66A] text-xs uppercase tracking-[0.25em] mb-8 font-medium">
          <span>The Closing Ritual</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-wide text-[#F5F0E5] leading-[1.15] mb-6">
          Every Sip Has A Story.
        </h2>

        <p className="font-editorial italic text-2xl md:text-3xl text-[#C7A66A] mb-12 font-light">
          “Make every tea moment a Shanker Tea moment.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-medium text-[#163D2B] bg-[#C7A66A] hover:bg-[#D8BC86] transition-all duration-300 shadow-xl shadow-[#C7A66A]/20"
          >
            <span>Discover Shanker Tea</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href="#hero"
            className="px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-[#F5F0E5]/80 hover:text-[#F5F0E5] glass-panel hover:border-[#C7A66A]/40 transition-all duration-300"
          >
            Replay The Cinematic
          </a>
        </div>
      </div>

      {/* Minimal Brand Footer */}
      <div className="relative z-10 border-t border-[#F5F0E5]/10 pt-12 mt-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <a href="#hero" className="inline-flex items-center space-x-3 mb-4">
              <span className="font-serif text-2xl tracking-[0.25em] uppercase text-[#F5F0E5]">
                Shanker Tea
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C7A66A]"></span>
            </a>
            <p className="text-sm text-[#F5F0E5]/60 font-light max-w-sm leading-relaxed mb-6">
              Rooted in the timeless heritage of Indian tea gardens. Celebrating the purity of tender leaves and the warmth of the earthen kulhad.
            </p>
            <div className="flex items-center space-x-4 text-[#F5F0E5]/60">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C7A66A]">
                Est. Estate Reserve
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#C7A66A] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-[#F5F0E5]/75">
              <li>
                <a href="#hero" className="hover:text-[#C7A66A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#C7A66A] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#why-shanker" className="hover:text-[#C7A66A] transition-colors">
                  Why Shanker Tea
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#C7A66A] transition-colors">
                  Our Products
                </a>
              </li>
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#C7A66A] mb-4">
              Connect
            </h4>
            <div className="flex items-center space-x-3 mb-4">
              <a
                href="#brand"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#C7A66A]/30 flex items-center justify-center text-[#F5F0E5]/80 hover:text-[#C7A66A] hover:border-[#C7A66A] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#brand"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full border border-[#C7A66A]/30 flex items-center justify-center text-[#F5F0E5]/80 hover:text-[#C7A66A] hover:border-[#C7A66A] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#brand"
                aria-label="Heritage Portal"
                className="w-9 h-9 rounded-full border border-[#C7A66A]/30 flex items-center justify-center text-[#F5F0E5]/80 hover:text-[#C7A66A] hover:border-[#C7A66A] transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="#brand"
                aria-label="Share"
                className="w-9 h-9 rounded-full border border-[#C7A66A]/30 flex items-center justify-center text-[#F5F0E5]/80 hover:text-[#C7A66A] hover:border-[#C7A66A] transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="#brand"
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-[#C7A66A]/30 flex items-center justify-center text-[#F5F0E5]/80 hover:text-[#C7A66A] hover:border-[#C7A66A] transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-[#F5F0E5]/50 font-light">
              Crafted with devotion to authentic Indian tea culture.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F5F0E5]/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E5]/40 font-mono">
          <div>© {new Date().getFullYear()} Shanker Tea Co. All rights reserved.</div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-6">
            <span>TERMS</span>
            <span>PRIVACY</span>
            <span>KULHAD HERITAGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
