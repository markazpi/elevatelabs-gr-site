import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Τι λένε οι επιχειρήσεις που μας εμπιστεύτηκαν
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Πραγματικά αποτελέσματα από αυτοματισμούς που δουλεύουν στην πράξη.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className={`group relative h-auto md:h-[400px] glass rounded-2xl overflow-hidden shadow-lg transition-all duration-500 md:cursor-pointer transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Default State (Front) */}
              {/* Mobile: Relative position to stack naturally. Desktop: Absolute to allow hover/flip effects. */}
              <div className="relative md:absolute inset-0 p-5 md:p-8 flex flex-col justify-between transition-all duration-500 md:group-hover:opacity-10 md:group-hover:scale-95">
                
                {/* Top Section: Quote & Client */}
                <div>
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#5227FF]/50 mb-3 md:mb-0" />
                  
                  <div className="mt-2 md:mt-auto">
                    <p className="text-base md:text-xl font-medium text-slate-200 italic leading-snug md:leading-relaxed mb-3 md:mb-6">
                      "{item.quote}"
                    </p>
                    <p className="text-xs md:text-sm font-bold text-[#5227FF] uppercase tracking-wide">
                      {item.client}
                    </p>
                  </div>
                </div>

                {/* Bottom Section: Metric */}
                <div className="border-t border-white/10 pt-3 md:pt-6 mt-4 md:mt-0">
                  <span className="block text-3xl md:text-5xl font-bold text-white tracking-tight mb-1 text-shadow-glow">
                    {item.metric}
                  </span>
                  <span className="text-xs md:text-base text-slate-400 font-medium">
                    {item.metricLabel}
                  </span>
                </div>
              </div>

              {/* Hover/Tap State (Overlay) - HIDDEN on Mobile to keep cards compact and static */}
              <div className="hidden md:flex absolute inset-0 bg-[#5227FF]/90 backdrop-blur-md p-8 flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-white">
                <h3 className="text-xl font-bold text-white mb-6">Αποτελέσματα</h3>
                <ul className="space-y-4 mb-6">
                  {item.results.map((result, rIndex) => (
                    <li key={rIndex} className="flex items-start gap-3 text-base text-slate-100 leading-snug">
                      <span className="text-white font-bold mt-0.5">•</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer of section */}
        <div className={`text-center transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-xs text-slate-500 mb-6 md:mb-8 italic px-4">
            Τα αποτελέσματα διαφέρουν ανάλογα με τον κλάδο και τις διαδικασίες.
          </p>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#5227FF] font-bold text-base md:text-lg hover:text-[#411edb] transition-colors group"
          >
            Δες πώς μπορεί να δουλέψει για τη δική σου επιχείρηση
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;