import React from 'react';
import { Bot, Mail, Database, MessageSquare, Zap, CheckCircle2, Instagram } from 'lucide-react';

const WorkflowNode: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  className: string; 
  color: string;
  delay?: string;
  type?: 'input' | 'output';
}> = ({ icon, label, className, color, delay = '0s', type = 'input' }) => (
  <div 
    className={`absolute ${className} transform -translate-x-1/2 -translate-y-1/2 glass p-2 md:p-3 rounded-xl shadow-lg z-10 flex items-center justify-center gap-2 md:gap-3 animate-fade-in-up w-[120px] sm:w-[140px] md:w-[150px]`}
    style={{ animationDelay: delay }}
  >
    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg ${color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
      {icon}
    </div>
    <span className="font-semibold text-slate-200 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{label}</span>
    
    {/* Connector Dots */}
    {type === 'input' && (
      <>
        <div className="md:hidden absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-slate-900 border-2 border-slate-500 rounded-full z-20"></div>
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-slate-900 border-2 border-slate-500 rounded-full z-20"></div>
      </>
    )}
    {type === 'output' && (
      <>
        <div className="md:hidden absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-slate-900 border-2 border-slate-500 rounded-full z-20"></div>
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-2 border-slate-500 rounded-full z-20"></div>
      </>
    )}
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5227FF]/10 text-[#5227FF] font-semibold text-xs uppercase tracking-wide mb-6 border border-[#5227FF]/20">
              <Zap className="w-3 h-3" />
              Automated Workflows
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Σχεδιάζουμε ροές που <br/>
              <span className="text-[#5227FF]">σκέφτονται</span> για εσάς.
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Φανταστείτε τις εφαρμογές σας να μιλάνε μεταξύ τους. Στην ElevateLabs, δεν φτιάχνουμε απλά κώδικα. Χτίζουμε έξυπνες γέφυρες μεταξύ των εργαλείων που ήδη χρησιμοποιείτε.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Αυτοματοποίηση χωρίς πολύπλοκο κώδικα',
                'Σύνδεση CRM, Email, και Social Media',
                'AI πράκτορες που εκτελούν εργασίες 24/7'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#5227FF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow Automation Diagram */}
          <div className="order-1 lg:order-2 relative h-[450px] md:h-[400px] glass rounded-3xl overflow-hidden shadow-2xl group w-full">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* --- SVG LAYERS --- */}

            <svg className="md:hidden absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 25 21 C 25 30, 50 30, 50 39" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#3b82f6" vectorEffect="non-scaling-stroke">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 25 21 C 25 30, 50 30, 50 39" />
              </circle>

              <path d="M 75 21 C 75 30, 50 30, 50 39" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#ec4899" vectorEffect="non-scaling-stroke">
                <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 75 21 C 75 30, 50 30, 50 39" />
              </circle>

              <path d="M 50 61 C 50 70, 25 70, 25 79" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#22c55e" vectorEffect="non-scaling-stroke">
                <animateMotion dur="3s" begin="0.5s" repeatCount="indefinite" path="M 50 61 C 50 70, 25 70, 25 79" />
              </circle>

              <path d="M 50 61 C 50 70, 75 70, 75 79" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#f59e0b" vectorEffect="non-scaling-stroke">
                <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M 50 61 C 50 70, 75 70, 75 79" />
              </circle>
            </svg>

            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 27.5 25 C 33 25, 33 50, 38.3 50" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#3b82f6" vectorEffect="non-scaling-stroke">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 27.5 25 C 33 25, 33 50, 38.3 50" />
              </circle>

              <path d="M 27.5 75 C 33 75, 33 50, 38.3 50" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#ec4899" vectorEffect="non-scaling-stroke">
                <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 27.5 75 C 33 75, 33 50, 38.3 50" />
              </circle>

              <path d="M 61.7 50 C 67 50, 67 25, 72.5 25" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#22c55e" vectorEffect="non-scaling-stroke">
                <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 61.7 50 C 67 50, 67 25, 72.5 25" />
              </circle>

              <path d="M 61.7 50 C 67 50, 67 75, 72.5 75" fill="none" stroke="#64748b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="1.5" fill="#f59e0b" vectorEffect="non-scaling-stroke">
                <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 61.7 50 C 67 50, 67 75, 72.5 75" />
              </circle>
            </svg>

            {/* --- NODES --- */}
            
            <WorkflowNode 
              icon={<Mail className="w-3 h-3 md:w-4 md:h-4" />} 
              label="New Email" 
              className="left-[25%] top-[15%] md:left-[15%] md:top-[25%]" 
              color="bg-blue-600" 
              delay="0s"
              type="input"
            />

            <WorkflowNode 
              icon={<MessageSquare className="w-3 h-3 md:w-4 md:h-4" />} 
              label="User Request" 
              className="left-[75%] top-[15%] md:left-[15%] md:top-[75%]" 
              color="bg-pink-600" 
              delay="0.2s"
              type="input"
            />

            {/* --- CENTER (PROCESSOR) --- */}
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
               <div className="relative">
                 <div className="absolute inset-0 bg-[#5227FF] blur-xl opacity-40 animate-pulse rounded-full"></div>
                 
                 <div className="glass p-3 md:p-5 rounded-2xl shadow-xl border border-[#5227FF]/50 relative z-10 flex flex-col items-center gap-1 md:gap-2 w-[120px] sm:w-[140px]">
                    <Bot className="w-6 h-6 md:w-8 md:h-8 text-[#5227FF]" />
                    <span className="font-bold text-white text-xs md:text-sm">AI Agent</span>
                    <div className="flex gap-1">
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#5227FF] rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#5227FF] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#5227FF] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                 </div>
                 
                 {/* Desktop Connectors */}
                 <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#5227FF] rounded-full border-2 border-slate-800 z-30"></div>
                 <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-[#5227FF] rounded-full border-2 border-slate-800 z-30"></div>
                 
                 {/* Mobile Connectors */}
                 <div className="md:hidden absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#5227FF] rounded-full border-2 border-slate-800 z-30"></div>
                 <div className="md:hidden absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#5227FF] rounded-full border-2 border-slate-800 z-30"></div>
               </div>
            </div>

            {/* --- OUTPUTS --- */}

            <WorkflowNode 
              icon={<Database className="w-3 h-3 md:w-4 md:h-4" />} 
              label="Update CRM" 
              className="left-[25%] top-[85%] md:left-[85%] md:top-[25%]" 
              color="bg-green-600" 
              delay="0.4s"
              type="output"
            />

            <WorkflowNode 
              icon={<Instagram className="w-3 h-3 md:w-4 md:h-4" />} 
              label="Instagram Post" 
              className="left-[75%] top-[85%] md:left-[85%] md:top-[75%]" 
              color="bg-amber-600" 
              delay="0.6s"
              type="output"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;