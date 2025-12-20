import React, { useEffect, useRef, useState } from 'react';
import { STATS } from '../constants';

const Results: React.FC = () => {
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
    <section id="results" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Αποτελέσματα που έχουν πραγματικό αντίκτυπο.
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Οι αυτοματισμοί βελτιώνουν τη λειτουργία της επιχείρησης και μειώνουν σημαντικά τη χειροκίνητη εργασία.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              className={`group glass rounded-2xl p-8 hover:bg-slate-900/40 transition-all duration-300 flex flex-col items-center text-center transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#5227FF]/20 flex items-center justify-center mb-6 group-hover:bg-[#5227FF] transition-colors duration-300 border border-[#5227FF]/20">
                <div className="text-[#5227FF] group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 origin-center">
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none drop-shadow-lg">
                  {stat.value}
                </div>
                {stat.suffix && (
                  <span className="text-lg text-white font-medium mt-1">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <div className="text-slate-300 font-semibold text-sm uppercase tracking-wider mb-3 min-h-[40px] flex items-center justify-center">
                {stat.label}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;