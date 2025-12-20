import React from 'react';
import { SERVICES } from '../constants';

const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <span className="text-[#5227FF] font-semibold tracking-wider uppercase text-sm mb-2 block">Οι Λύσεις Μας</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ολοκληρωμένες υπηρεσίες <br />AI Αυτοματισμού
            </h2>
          </div>
          <a href="#contact" className="text-[#5227FF] font-semibold hover:text-[#411edb] flex items-center gap-2 transition-colors">
            Δείτε όλες τις υπηρεσίες <span>→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl shadow-sm hover:bg-slate-900/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#5227FF]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#5227FF]/20 transition-colors border border-[#5227FF]/20">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#5227FF] transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;