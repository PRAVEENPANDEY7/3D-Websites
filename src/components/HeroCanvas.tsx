import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroCanvasProps {
  onProgressUpdate?: (progress: number) => void;
  onInitialReady?: () => void;
}

const TOTAL_FRAMES = 190;

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ onProgressUpdate, onInitialReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Images cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // 3D Parallax Tilt State
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Get frame image URL
  const getFrameUrl = (index: number) => {
    const frameNumber = String(index + 1).padStart(4, '0');
    return `/assets/tea-sequence/frame_${frameNumber}.jpg`;
  };

  // High-Quality Native Retina Render
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    const img = imagesRef.current[clampedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Direct Physical Pixels for Maximum 1080p Sharpness
    const width = canvas.width;
    const height = canvas.height;

    // Calculate Cover Fit with physical pixels
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);

    // Highest Quality Image Interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.save();
    // Parallax Tilt in physical coordinates
    const tiltOffsetX = mouseRef.current.x * 12;
    const tiltOffsetY = mouseRef.current.y * 8;
    ctx.translate(tiltOffsetX, tiltOffsetY);

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Window Resize & High DPI Canvas setup
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set internal buffer to full device resolution
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      renderFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Subtle Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Progressive Image Preloader & Cache
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Load Frame 1 immediately
    const frame1 = new Image();
    frame1.src = getFrameUrl(0);
    frame1.onload = () => {
      if (isCancelled) return;
      images[0] = frame1;
      loadedCount++;
      setInitialFrameReady(true);
      onInitialReady?.();
      renderFrame(0);

      // Preload next frames in parallel batches for instant scrubbing
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          images[i] = img;
          loadedCount++;
          const percent = (loadedCount / TOTAL_FRAMES) * 100;
          onProgressUpdate?.(percent);
        };
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [onInitialReady, onProgressUpdate, renderFrame]);

  // GSAP ScrollTrigger Sequence Controller - 2.5-3s Cinematic Scroll (200vh)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          targetFrameRef.current = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, progress * (TOTAL_FRAMES - 1))
          );
        },
      });
    }, container);

    // Continuous Animation Loop with Smooth Kinetic Interpolation
    const tick = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.35;
        renderFrame(Math.round(currentFrameRef.current));
      } else if (Math.abs(mouseRef.current.targetX - mouseRef.current.x) > 0.005) {
        renderFrame(Math.round(currentFrameRef.current));
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      ctx.revert();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[200vh] bg-[#0E2015]"
      style={{ isolation: 'isolate' }}
    >
      {/* Sticky Canvas Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* The Primary Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none"
          style={{ opacity: initialFrameReady ? 1 : 0 }}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-black/15 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0E2015] via-[#0E2015]/60 to-transparent pointer-events-none" />

        {/* =========================================================================
            HERO NARRATIVE OVERLAY (Positioned in the Sweet Spot, Refined & Bolder)
            ========================================================================= */}
        <div 
          className="absolute top-28 sm:top-32 md:top-36 left-0 right-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none z-10 transition-all duration-500"
          style={{
            opacity: scrollProgress > 0.18 ? Math.min(1, (scrollProgress - 0.18) * 3) : 0,
            transform: `translateY(${Math.max(0, (0.7 - scrollProgress) * 12)}px)`
          }}
        >
          {/* Main Shanker Tea Brand Headline (Smaller, Refined & Slightly Bolder) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-medium tracking-[0.1em] text-[#F5F0E5] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] mb-1.5 sm:mb-2 leading-none">
            Shanker Tea
          </h1>

          {/* Radiant Yellowish Gold Quote (Crisp, Slightly Bolder & Perfectly Proportioned) */}
          <p 
            className="font-editorial italic text-sm sm:text-xl md:text-2xl max-w-xl sm:max-w-2xl font-semibold leading-relaxed tracking-wide"
            style={{ 
              color: '#F7CE68', 
              textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 22px rgba(247,206,104,0.35)' 
            }}
          >
            “When leaves dance and clay breathes, tea becomes poetry.”
          </p>
        </div>
      </div>
    </section>
  );
};
