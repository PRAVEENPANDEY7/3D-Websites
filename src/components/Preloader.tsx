import React from 'react';

interface PreloaderProps {
  progress: number;
  isReady: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isReady }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#163D2B] transition-all duration-1000 ease-out ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Soft Gold Ring Spinner */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border border-[#C7A66A]/20"></div>
          <div
            className="absolute inset-0 rounded-full border-t-2 border-[#C7A66A] animate-spin"
            style={{ animationDuration: '2.5s' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl select-none">🍃</span>
          </div>
        </div>

        {/* Brand Wordmark */}
        <h1 className="font-serif text-2xl tracking-[0.3em] uppercase text-[#F5F0E5] font-light mb-2">
          Shanker Tea
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-[#C7A66A] font-medium mb-6">
          The Art Of Kulhad Chai
        </p>

        {/* Progress Bar & Counter */}
        <div className="w-48 h-[2px] bg-[#242821] rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-gradient-to-r from-[#C7A66A] to-[#F5F0E5] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between w-48 text-[11px] font-mono text-[#F5F0E5]/60 tracking-wider">
          <span>INFUSING FRAMES</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
