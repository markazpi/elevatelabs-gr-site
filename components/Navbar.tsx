import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#hero" className="font-bold text-2xl tracking-tighter text-white flex items-center gap-2">
              Elevate<span className="text-[#5227FF]">Labs</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-white font-semibold transition-all duration-300 text-sm tracking-tight hover:drop-shadow-[0_0_8px_rgba(82,39,255,0.6)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#5227FF] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#411edb] transition-all shadow-lg shadow-[#5227FF]/20 hover:shadow-[#5227FF]/50 border border-white/10"
            >
              Επικοινωνία
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-lg font-semibold tracking-tight text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                className="block w-full text-center bg-[#5227FF] text-white px-5 py-4 rounded-xl font-bold text-lg hover:bg-[#411edb] transition-colors shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Επικοινωνία
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;