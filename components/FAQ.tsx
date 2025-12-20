import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Συχνές Ερωτήσεις</h2>
          <p className="text-slate-400">
            Απαντήσεις στα πιο κοινά ερωτήματα σχετικά με τις υπηρεσίες μας.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="glass rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-[#5227FF]' : 'text-slate-200'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#5227FF]" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;