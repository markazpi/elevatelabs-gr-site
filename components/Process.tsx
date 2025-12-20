import React, { useEffect, useRef, useState } from 'react';
import { PROCESS } from '../constants';

const Process: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 relative overflow-hidden">
        {/* Transparent background to show global animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Η Διαδικασία μας</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Μια απλή και διαφανής προσέγγιση για να φέρουμε την τεχνητή νοημοσύνη στην επιχείρησή σας.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS.map((item, index) => (
            <div 
              key={index} 
              className={`relative group transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {index !== PROCESS.length - 1 && (
                <div 
                  className={`hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-700 -z-10 origin-left transition-transform duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              )}
              
              <div className="glass w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-[#5227FF] mb-6 border border-white/10 mx-auto z-10 relative shadow-lg shadow-[#5227FF]/20 group-hover:scale-110 group-hover:border-[#5227FF] transition-all duration-300">
                {item.step}
              </div>
              
              <div className="text-center px-2">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#5227FF] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;