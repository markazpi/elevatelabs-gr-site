import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
          <h2 className="text-lg md:text-xl font-bold text-white">Πολιτική Απορρήτου</h2>
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
          <h3 className="text-xl font-bold text-white mb-4">Πολιτική Απορρήτου – ElevateLabs</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white text-base mb-2">1. Ποιοι είμαστε</h4>
              <p>Η ElevateLabs είναι agency αυτοματισμών και λύσεων AI για επιχειρήσεις.</p>
              <p>Υπεύθυνος επεξεργασίας των προσωπικών δεδομένων είναι η ElevateLabs.</p>
              <p className="mt-2 text-[#5227FF] font-medium">Email επικοινωνίας: info@elevatelabs.gr</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">2. Ποια δεδομένα συλλέγουμε</h4>
              <p className="mb-2">Συλλέγουμε μόνο τα απολύτως απαραίτητα δεδομένα, ανάλογα με τον τρόπο που επικοινωνείτε μαζί μας:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Στοιχεία επικοινωνίας (όνομα, email, τηλέφωνο – εφόσον δοθεί).</li>
                <li>Περιεχόμενο μηνυμάτων που αποστέλλονται μέσω της φόρμας επικοινωνίας.</li>
                <li>Βασικά τεχνικά δεδομένα χρήσης του ιστότοπου (π.χ. IP, τύπος συσκευής/φυλλομετρητή), μόνο για λόγους ασφάλειας και ορθής λειτουργίας.</li>
              </ul>
              <p className="mt-2 italic">Δεν συλλέγουμε ειδικές κατηγορίες προσωπικών δεδομένων.</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">3. Για ποιο σκοπό τα χρησιμοποιούμε</h4>
              <p className="mb-2">Τα δεδομένα χρησιμοποιούνται αποκλειστικά για:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Επικοινωνία σχετικά με το αίτημά σας.</li>
                <li>Αξιολόγηση των αναγκών της επιχείρησής σας.</li>
                <li>Παροχή σχετικών πληροφοριών κατόπιν επικοινωνίας.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">4. Νομική βάση επεξεργασίας</h4>
              <p>Η επεξεργασία βασίζεται στη συγκατάθεση μέσω της φόρμας επικοινωνίας και στο έννομο συμφέρον της εταιρείας.</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">5. Διαβίβαση δεδομένων</h4>
              <p>Δεν πωλούμε ούτε διαβιβάζουμε δεδομένα σε τρίτους, πέραν παρόχων που υποστηρίζουν τη λειτουργία μας (π.χ. email).</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">6. Χρόνος διατήρησης</h4>
              <p>Τα δεδομένα διατηρούνται μόνο για όσο απαιτείται για τον σκοπό της επικοινωνίας και έπειτα διαγράφονται.</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">7. Τα δικαιώματά σας</h4>
              <p>Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής και εναντίωσης στην επεξεργασία.</p>
              <p>Για άσκηση δικαιωμάτων επικοινωνήστε στο <a href="mailto:info@elevatelabs.gr" className="text-[#5227FF] hover:underline">info@elevatelabs.gr</a>.</p>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-2">8. Επικοινωνία</h4>
              <p>Για οποιαδήποτε απορία σχετικά με την παρούσα Πολιτική Απορρήτου μπορείτε να επικοινωνήσετε στο <a href="mailto:info@elevatelabs.gr" className="text-[#5227FF] hover:underline">info@elevatelabs.gr</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;