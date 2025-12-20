import React, { useEffect, useState } from 'react';
import { shouldShowBanner, saveConsent, defaultConsent } from '../utils/cookieConsent';

interface CookieBannerProps {
  onOpenPreferences: () => void;
  onOpenPrivacy: () => void;
  onOpenCookiesPolicy: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ 
  onOpenPreferences, 
  onOpenPrivacy, 
  onOpenCookiesPolicy 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent is already stored
    if (shouldShowBanner()) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString()
    });
    setIsVisible(false);
  };

  const handleReject = () => {
    saveConsent({
      ...defaultConsent,
      updatedAt: new Date().toISOString()
    });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[90] bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Text Content */}
        <div className="text-slate-300 text-sm leading-relaxed text-center lg:text-left max-w-3xl">
          <p>
            Χρησιμοποιούμε cookies για τη σωστή λειτουργία του site και, με τη συγκατάθεσή σας, για ανάλυση επισκεψιμότητας και προβολή σχετικών διαφημίσεων. 
            Δείτε την{' '}
            <button onClick={onOpenCookiesPolicy} className="text-[#5227FF] hover:text-white underline decoration-[#5227FF]/30 hover:decoration-white transition-all">
              Πολιτική Cookies
            </button>
            {' '}και την{' '}
            <button onClick={onOpenPrivacy} className="text-[#5227FF] hover:text-white underline decoration-[#5227FF]/30 hover:decoration-white transition-all">
              Πολιτική Απορρήτου
            </button>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
           <button 
            onClick={onOpenPreferences}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-slate-300 font-medium text-sm hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            Ρυθμίσεις cookies
          </button>
          
          <button 
            onClick={handleReject}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-semibold text-sm hover:bg-white/5 hover:text-white hover:border-white/20 transition-all"
          >
            Απόρριψη
          </button>

          <button 
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#5227FF] text-white font-bold text-sm shadow-lg shadow-[#5227FF]/20 hover:bg-[#411edb] transition-all"
          >
            Αποδοχή όλων
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;