import React, { useEffect, useState, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { getConsent, saveConsent, defaultConsent, CookieConsent } from '../utils/cookieConsent';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Toggle: React.FC<{ 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
  disabled?: boolean;
}> = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => !disabled && onChange(!checked)}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5227FF] focus:ring-offset-2 focus:ring-offset-slate-900 ${
      checked ? 'bg-[#5227FF]' : 'bg-slate-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [preferences, setPreferences] = useState<CookieConsent>(defaultConsent);

  // Load current preferences when modal opens
  useEffect(() => {
    if (isOpen) {
      const current = getConsent();
      if (current) {
        setPreferences(current);
      } else {
        setPreferences(defaultConsent);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSave = () => {
    saveConsent({
      ...preferences,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" />

      <div 
        ref={modalRef}
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-700 bg-slate-900/95 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#5227FF]" />
            <h2 className="text-lg md:text-xl font-bold text-white">Ρυθμίσεις cookies</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 space-y-6">
          <p className="text-sm text-slate-400">
            Προσαρμόστε τις προτιμήσεις σας για τα cookies. Τα απαραίτητα cookies είναι πάντα ενεργά καθώς απαιτούνται για τη λειτουργία του ιστότοπου.
          </p>

          {/* Necessary */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <h3 className="font-bold text-white text-base">Απαραίτητα</h3>
              <p className="text-xs text-slate-400 mt-1">
                Απαιτούνται για τη βασική λειτουργία του site. Δεν μπορούν να απενεργοποιηθούν.
              </p>
            </div>
            <Toggle checked={true} onChange={() => {}} disabled={true} />
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <h3 className="font-bold text-white text-base">Analytics</h3>
              <p className="text-xs text-slate-400 mt-1">
                Μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείτε το site για να το βελτιώσουμε (π.χ. Google Analytics).
              </p>
            </div>
            <Toggle 
              checked={preferences.analytics} 
              onChange={(val) => setPreferences(prev => ({ ...prev, analytics: val }))} 
            />
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <h3 className="font-bold text-white text-base">Marketing</h3>
              <p className="text-xs text-slate-400 mt-1">
                Χρησιμοποιούνται για την προβολή εξατομικευμένων διαφημίσεων σε πλατφόρμες όπως η Google και το Facebook.
              </p>
            </div>
            <Toggle 
              checked={preferences.marketing} 
              onChange={(val) => setPreferences(prev => ({ ...prev, marketing: val }))} 
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 md:p-6 border-t border-slate-700 bg-slate-900/50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-slate-300 font-medium hover:text-white hover:bg-white/5 transition-colors"
          >
            Ακύρωση
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 rounded-lg bg-[#5227FF] text-white font-bold shadow-lg shadow-[#5227FF]/20 hover:bg-[#411edb] transition-all"
          >
            Αποθήκευση
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;