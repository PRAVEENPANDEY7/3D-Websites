import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Leaf, 
  Coffee, 
  HeartPulse, 
  ArrowUpRight, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const sections = ['hero', 'experience', 'benefits', 'products', 'brand'];
      const vh = window.innerHeight;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.1) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero', icon: Compass },
    { name: 'Experience', href: '#experience', id: 'experience', icon: Sparkles },
    { name: 'Botanical Science', href: '#benefits', id: 'benefits', icon: HeartPulse },
    { name: 'Our Craft', href: '#why-shanker', id: 'why-shanker', icon: Leaf },
    { name: 'Blends', href: '#products', id: 'products', icon: Coffee },
  ];

  return (
    <>
      {/* Truly Transparent Glass Navbar */}
      <nav 
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300"
      >
        <div 
          className={`flex items-center justify-between px-6 md:px-8 py-3 rounded-2xl transition-all duration-300 ${
            scrolled 
              ? 'bg-black/25 backdrop-blur-md border border-white/15 shadow-xl shadow-black/40' 
              : 'bg-white/[0.04] backdrop-blur-xs border border-white/15 shadow-lg shadow-black/10'
          }`}
        >
          {/* Brand Logo & Name in ONE Single Horizontal Line */}
          <a
            href="#hero"
            className="flex items-center space-x-3.5 group text-[#F5F0E5] flex-shrink-0"
          >
            <img 
              src="/assets/icons/logo.png" 
              alt="Shanker Tea" 
              className="h-9 md:h-10 w-auto object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-serif text-lg md:text-xl font-bold tracking-[0.22em] uppercase text-[#F5F0E5] whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Shanker Tea
            </span>
          </a>

          {/* Desktop Navigation Links - Horizontal, Single Line, Crisp Text */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm md:text-[15px] font-bold tracking-wide whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C7A66A] text-[#102418] shadow-md shadow-[#C7A66A]/30'
                      : 'text-[#F5F0E5] hover:text-[#C7A66A] hover:bg-white/10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#102418]' : 'text-[#C7A66A]'}`} />
                  <span className="whitespace-nowrap">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wider text-[#102418] bg-[#C7A66A] hover:bg-[#D8BC86] active:scale-95 transition-all duration-200 shadow-lg shadow-[#C7A66A]/30 whitespace-nowrap"
            >
              <span>Explore Reserve</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#F5F0E5] hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C7A66A]" /> : <Menu className="w-6 h-6 text-[#C7A66A]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-4 top-20 z-40 bg-[#0A180F]/95 backdrop-blur-2xl rounded-2xl border border-[#C7A66A]/30 p-6 lg:hidden transition-all duration-300 shadow-2xl ${
          mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  isActive
                    ? 'bg-[#C7A66A] text-[#102418]'
                    : 'text-[#F5F0E5] hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#102418]' : 'text-[#C7A66A]'}`} />
                <span className="whitespace-nowrap">{link.name}</span>
              </a>
            );
          })}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-bold text-[#102418] bg-[#C7A66A] flex items-center justify-center gap-2"
            >
              <span>Explore Reserve</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
