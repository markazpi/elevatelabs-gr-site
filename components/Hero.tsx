import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Subtle content fade/move
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        contentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 700)}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden flex items-center justify-center min-h-[85vh]">
      {/* 
         Removed local blobs to allow Global App Background to show through 
         Added transparent background 
      */}
      
      <div 
        ref={contentRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center will-change-transform"
      >
        {/* Adjusted font size for mobile (text-4xl) to fit narrow screens better */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-bold text-white tracking-tight mb-8 leading-[1.1] sm:leading-tight drop-shadow-2xl">
          Πες αντίο στις διαδικασίες <br className="hidden sm:block" />
          που σου τρώνε χρόνο <span className="waving-hand">👋</span>
        </h1>

        <p className="mt-6 sm:mt-8 max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10 sm:mb-12 leading-relaxed font-medium">
          Καθημερινές εργασίες, επαναλήψεις και καθυστερήσεις κρατούν την επιχείρησή σου απασχολημένη αντί αποδοτική. Η αυτοματοποίηση, όταν εφαρμόζεται σωστά, απλώς κάνει τη δουλειά να κυλάει.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto">
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 bg-[#5227FF] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:bg-[#411edb] hover:shadow-[0_0_30px_rgba(82,39,255,0.4)] hover:-translate-y-1 border border-white/10 w-full sm:w-auto"
          >
            Αυτοματοποίησε τις διαδικασίες σου
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#process"
            className="text-white font-bold text-lg hover:text-[#5227FF] transition-colors px-6 py-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 w-full sm:w-auto"
          >
            Δες πώς δουλεύει στην πράξη
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;