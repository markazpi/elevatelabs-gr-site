import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface CookiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiesModal: React.FC<CookiesModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      {/* Dark Blurred Background */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-700 bg-slate-900/95 sticky top-0 z-10 backdrop-blur-md">
          <h2 className="text-lg md:text-xl font-bold text-white">Πολιτική Cookies – ElevateLabs</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 space-y-6 text-sm leading-relaxed">
          <h3 className="text-xl font-bold text-white mb-4">Πολιτική Cookies – ElevateLabs</h3>

          <div className="space-y-4">
            <p>Η ElevateLabs χρησιμοποιεί cookies και παρόμοιες τεχνολογίες (π.χ. pixels, tags) για την ορθή λειτουργία του ιστότοπου, τη μέτρηση της απόδοσης και, μόνο με τη συγκατάθεσή σας, για διαφημιστικούς σκοπούς.</p>
            <p>Η παρούσα Πολιτική εξηγεί τι είναι τα cookies, ποιες κατηγορίες χρησιμοποιούμε και πώς μπορείτε να ελέγχετε τις προτιμήσεις σας.</p>
            <p>Η Πολιτική Cookies συμπληρώνει την Πολιτική Απορρήτου της ElevateLabs.</p>

            <div>
              <h4 className="font-bold text-white text-base mb-2">Τι είναι τα cookies</h4>
              <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε έναν ιστότοπο. Ορισμένα τοποθετούνται από εμάς (cookies πρώτου μέρους) και άλλα από τρίτους παρόχους (cookies τρίτων).</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">Κατηγορίες cookies που χρησιμοποιούμε</h4>
              
              <h5 className="font-semibold text-white text-sm mt-3 mb-1">Απαραίτητα cookies</h5>
              <p>Είναι απαραίτητα για τη βασική λειτουργία και την ασφάλεια του ιστότοπου και δεν απαιτούν συγκατάθεση.</p>

              <h5 className="font-semibold text-white text-sm mt-3 mb-1">Cookies ανάλυσης (analytics)</h5>
              <p>Μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείται ο ιστότοπος (π.χ. επισκέψεις και βασικές αλληλεπιδράσεις), ώστε να βελτιώνουμε την εμπειρία χρήστη.</p>

              <h5 className="font-semibold text-white text-sm mt-3 mb-1">Διαφημιστικά / marketing cookies</h5>
              <p>Χρησιμοποιούνται μόνο με τη συγκατάθεσή σας για τη μέτρηση της απόδοσης καμπανιών, τη δημιουργία κοινών (audiences) και την προβολή σχετικών διαφημίσεων μέσω πλατφορμών όπως Google και Meta (Facebook/Instagram).</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">Νομική βάση και συγκατάθεση</h4>
              <p>Τα απαραίτητα cookies λειτουργούν χωρίς συγκατάθεση.</p>
              <p>Όλα τα υπόλοιπα cookies ενεργοποιούνται μόνο μετά από τη ρητή συγκατάθεσή σας μέσω του cookie banner.</p>
              <p>Μπορείτε να αλλάξετε ή να ανακαλέσετε τη συγκατάθεσή σας οποιαδήποτε στιγμή από τις Ρυθμίσεις Cookies.</p>
              <p>Η πρόσβαση στον ιστότοπο δεν εξαρτάται από τη συγκατάθεση (no cookie walls).</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">Τρίτοι πάροχοι</h4>
              <p>Ενδέχεται να χρησιμοποιούμε υπηρεσίες τρίτων παρόχων, όπως Google και Meta, αποκλειστικά για τους παραπάνω σκοπούς και μόνο εφόσον έχετε συναινέσει.</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">Διαχείριση cookies</h4>
              <p>Μπορείτε να αλλάξετε τις προτιμήσεις σας από τις Ρυθμίσεις Cookies ή να διαγράψετε cookies από τις ρυθμίσεις του φυλλομετρητή σας.</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">Επικοινωνία</h4>
              <p>Για απορίες σχετικά με την παρούσα Πολιτική Cookies μπορείτε να επικοινωνήσετε στο <a href="mailto:info@elevatelabs.gr" className="text-[#5227FF] hover:underline">info@elevatelabs.gr</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesModal;