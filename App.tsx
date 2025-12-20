import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import Solutions from './components/Solutions';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';
import CookiesModal from './components/CookiesModal';
import CookieBanner from './components/CookieBanner';
import CookiePreferencesModal from './components/CookiePreferencesModal';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Modal States
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);
  const [isCookiePreferencesOpen, setIsCookiePreferencesOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    website: '' // honeypot
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);

  // Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    // Map 'website-honeypot' id to state key 'website'
    if (id === 'website-honeypot') {
      setFormData(prev => ({ ...prev, website: value }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Spam protection: Honeypot
    // If the hidden field has value, it's a bot. Silently abort.
    if (formData.website) return;

    // 2. Cooldown check
    if (isCooldown) {
      setSubmitStatus('error');
      setFeedbackMessage('Παρακαλώ περιμένετε 30 δευτερόλεπτα πριν στείλετε ξανά.');
      return;
    }

    setSubmitStatus('submitting');
    setFeedbackMessage('');

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    
    // Check if URL is configured
    if (!webhookUrl) {
      console.error("VITE_N8N_WEBHOOK_URL is missing.");
      setSubmitStatus('error');
      setFeedbackMessage('Σφάλμα συστήματος: Η φόρμα δεν είναι συνδεδεμένη.');
      return;
    }

    const payload = {
      source: "elevatelabs.gr",
      event: "lead.created",
      timestamp: new Date().toISOString(),
      lead: {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        automation_goal: formData.interest,
        message: formData.message
      },
      page: {
        url: window.location.href,
        referrer: document.referrer
      }
    };

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      const secret = import.meta.env.VITE_WEBHOOK_SECRET;
      if (secret) {
        headers['X-Webhook-Secret'] = secret;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Success
      setSubmitStatus('success');
      setFeedbackMessage('Το μήνυμά σας ελήφθη! Θα επικοινωνήσουμε σύντομα.');
      // Clear form but keep cooldown
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
        website: ''
      });
      
      // Activate Cooldown
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 30000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setFeedbackMessage('Παρουσιάστηκε πρόβλημα κατά την αποστολή. Δοκιμάστε ξανά.');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Function to set canvas size explicitly
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    // Configuration - Mobile Optimized
    // Reduce particle count on mobile for 60FPS performance in Meta in-app browsers
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 90; 
    const connectionDistance = isMobile ? 100 : 150; // Shorter connections on small screens
    const mouseDistance = isMobile ? 120 : 200; // Smaller interactive radius on mobile
    
    // Mouse/Touch state
    const input = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      colorRgb: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slower, smoother movement
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1.5; // Bigger particles (1.5px to 3.5px)
        
        // Use Bright Neon Colors for visibility on dark bg
        // Cyan (#00F2FF) or Purple (#5227FF)
        this.colorRgb = Math.random() > 0.6 ? '0, 242, 255' : '82, 39, 255'; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // High opacity for dots
        ctx.fillStyle = `rgba(${this.colorRgb}, 0.8)`; 
        ctx.fill();
      }
    }

    // Initialize particles
    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    // Animation Loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Particles
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            const opacity = 0.2 * (1 - dist / connectionDistance);
            ctx.strokeStyle = `rgba(${p.colorRgb}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to Mouse/Touch (Human-AI Connection)
        const dx = p.x - input.x;
        const dy = p.y - input.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance) {
          ctx.beginPath();
          // Stronger connection to user input
          const opacity = 0.5 * (1 - dist / mouseDistance);
          ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`; // Always Cyan for user interaction
          ctx.lineWidth = 1.5; 
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(input.x, input.y);
          ctx.stroke();
          
          // Gentle attraction to input
          if (dist > 50) { 
             p.x -= dx * 0.02; 
             p.y -= dy * 0.02;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      input.x = e.clientX - rect.left;
      input.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches.length > 0) {
        input.x = e.touches[0].clientX - rect.left;
        input.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleResize = () => {
      setSize();
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true }); // Add touch support
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen relative text-slate-200 font-sans selection:bg-[#5227FF] selection:text-white overflow-x-hidden">
      
      {/* GLOBAL ANIMATED BACKGROUND layer at z-0 */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        {/* Solid dark background to ensure contrast */}
        <div className="absolute inset-0 bg-[#020617]"></div>
        
        {/* The Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block opacity-100"
        />
        
        {/* Subtle Gradient Overlay for depth (optional, lighter than before) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/30 to-[#020617]/90 pointer-events-none"></div>
      </div>

      <Navbar />
      
      {/* Content Layer at z-10 to sit ON TOP of canvas */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Process />
        <Results />
        <Testimonials />
        <Solutions />
        <FAQ />
        
        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                Ας δούμε ποιες διαδικασίες <br />
                αξίζει να αυτοματοποιηθούν.
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-2">
                Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας μέσα σε 24 ώρες 
                για μια σύντομη, πρακτική συζήτηση χωρίς καμία δέσμευση.
              </p>
              <p className="text-[#5227FF] font-medium">
                Θα επικοινωνήσουμε προσωπικά μαζί σας.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot Field - Visually Hidden */}
                <input 
                  type="text" 
                  name="website" 
                  id="website-honeypot"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex={-1} 
                  autoComplete="off"
                  className="opacity-0 absolute top-0 left-0 w-0 h-0 -z-50 pointer-events-none"
                />

                <div>
                   <label htmlFor="name" className="block text-sm font-bold text-slate-200 mb-2">
                     Ονοματεπώνυμο *
                   </label>
                   <input 
                    id="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Το ονοματεπώνυμό σας" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#5227FF] focus:border-transparent transition-all placeholder:text-slate-600 appearance-none"
                  />
                </div>

                <div>
                   <label htmlFor="email" className="block text-sm font-bold text-slate-200 mb-2">
                     Email *
                   </label>
                   <input 
                    id="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@company.gr" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#5227FF] focus:border-transparent transition-all placeholder:text-slate-600 appearance-none"
                  />
                </div>

                <div>
                   <label htmlFor="phone" className="block text-sm font-bold text-slate-200 mb-2">
                     Τηλέφωνο (προαιρετικό)
                   </label>
                   <input 
                    id="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="π.χ. 69XXXXXXXX" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#5227FF] focus:border-transparent transition-all placeholder:text-slate-600 appearance-none"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-bold text-slate-200 mb-2">
                    Τι θέλετε να αυτοματοποιήσετε;
                  </label>
                  <div className="relative">
                    <select 
                      id="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#5227FF] focus:border-transparent transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-slate-900">Επιλέξτε μία επιλογή</option>
                      <option value="appointments" className="bg-slate-900">Ραντεβού & κρατήσεις</option>
                      <option value="leads" className="bg-slate-900">Διαχείριση leads & follow-up</option>
                      <option value="crm" className="bg-slate-900">Email / CRM αυτοματοποίηση</option>
                      <option value="support" className="bg-slate-900">Εξυπηρέτηση πελατών (chat / WhatsApp)</option>
                      <option value="internal" className="bg-slate-900">Εσωτερικές διαδικασίες & reports</option>
                      <option value="unsure" className="bg-slate-900">Δεν είμαι σίγουρος — θέλω προτάσεις</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div>
                   <label htmlFor="message" className="block text-sm font-bold text-slate-200 mb-2">
                     Μήνυμα *
                   </label>
                   <textarea 
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Περιγράψτε με λίγα λόγια πού χάνεται χρόνος στην επιχείρησή σας&#10;(π.χ. τηλεφωνήματα, καθυστερήσεις, χειροκίνητες εργασίες)." 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#5227FF] focus:border-transparent transition-all placeholder:text-slate-600 resize-y appearance-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex flex-col items-center">
                  <button 
                    type="submit" 
                    disabled={submitStatus === 'submitting'}
                    className={`w-full sm:w-auto bg-[#5227FF] text-white font-bold py-4 px-12 rounded-lg hover:bg-[#411edb] transition-all shadow-lg shadow-[#5227FF]/20 text-lg border border-white/10 ${
                      submitStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitStatus === 'submitting' ? 'Αποστολή...' : 'Ας το δούμε μαζί — χωρίς καμία δέσμευση'}
                  </button>

                  {feedbackMessage && (
                    <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium w-full animate-fade-in ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {feedbackMessage}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 mt-4 text-center">
                    Χωρίς πωλήσεις. Χωρίς τεχνικούς όρους. Μόνο ξεκάθαρες απαντήσεις.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>
      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        onOpenCookies={() => setIsCookiesOpen(true)}
        onOpenPreferences={() => setIsCookiePreferencesOpen(true)}
      />
      
      {/* Modals Layer */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <CookiesModal isOpen={isCookiesOpen} onClose={() => setIsCookiesOpen(false)} />
      <CookiePreferencesModal isOpen={isCookiePreferencesOpen} onClose={() => setIsCookiePreferencesOpen(false)} />
      
      {/* Cookie Banner (Fixed Bottom) */}
      <CookieBanner 
        onOpenPreferences={() => setIsCookiePreferencesOpen(true)} 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookiesPolicy={() => setIsCookiesOpen(true)}
      />
    </div>
  );
}

export default App;