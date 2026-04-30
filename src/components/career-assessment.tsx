'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Sparkles, TrendingUp, Zap,
  Trophy, Target, Binary
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const MATCHES = [
  { role: 'AI Research Scientist', match: '98%', color: 'text-udanix-blue' },
  { role: 'Product Designer', match: '92%', color: 'text-udanix-orange' },
  { role: 'Quantitative Analyst', match: '87%', color: 'text-purple-600' }
];

const STEPS = [
  { id: 1, title: 'Psychometric Profiling', desc: 'Deep dive into behavioral DNA' },
  { id: 2, title: 'Aptitude Benchmarking', desc: 'Measuring analytical horsepower' },
  { id: 3, title: 'AI Recommendation', desc: 'Predictive career path mapping' }
];

export function CareerAssessment() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="assessment" ref={containerRef} className="py-40 relative overflow-hidden bg-white">
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 mesh-gradient-premium opacity-50" />
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: Content & Interactive Steps */}
          <div className="max-w-xl">

            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[64px] sm:text-[90px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.8] mb-10"
            >
              Decode Your <br />
              <span className="text-brand-gradient">DNA Profile</span>
            </motion.h2>
            
            <p className="text-slate-500 font-medium text-xl leading-relaxed mb-16">
              Our proprietary AI-driven assessments don&apos;t just test your knowledge; they map your cognitive potential to the world&apos;s most lucrative career paths.
            </p>

            <div className="space-y-8">
              {STEPS.map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative pl-12 group cursor-pointer transition-all duration-500 ${activeStep === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={`absolute left-0 top-0 w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-black transition-all duration-500 ${activeStep === idx ? 'bg-udanix-navy text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                    {step.id}
                  </div>
                  <div className={`absolute left-[15px] top-8 bottom-[-32px] w-0.5 bg-slate-100 ${idx === STEPS.length - 1 ? 'hidden' : 'block'}`}>
                    <motion.div 
                      className="w-full bg-udanix-orange origin-top"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: activeStep === idx ? 1 : 0 }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  </div>
                  <h3 className="text-2xl font-black text-udanix-navy uppercase tracking-tight mb-2 group-hover:text-udanix-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 group relative inline-flex items-center gap-4 px-12 py-6 rounded-full bg-udanix-navy text-white text-[12px] font-black uppercase tracking-[0.25em] shadow-premium-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
              <span className="relative z-10">Start Your Analysis</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            </motion.button>
          </div>

          {/* Right Side: AI Analysis Mockup */}
          <div className="relative">
            {/* The Main "Dashboard" Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 extreme-glass rounded-[4rem] p-4 border border-white/80 shadow-premium-2xl"
            >
              <div className="bg-white/40 rounded-[3rem] p-10 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/40">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/40 flex items-center justify-center shadow-premium">
                      <Target className="w-7 h-7 text-udanix-blue" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-udanix-navy uppercase tracking-tighter">Analysis Engine</h4>
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] italic">Real-time Matching</p>
                    </div>
                  </div>
                  <div className="px-5 py-2.5 rounded-xl glass-premium border-white text-[10px] font-black text-udanix-blue uppercase tracking-widest shadow-sm">
                    v4.2 PRO
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-8 mb-10">
                  {[
                    { label: 'Analytical Reasoning', value: 92, color: 'bg-udanix-blue' },
                    { label: 'Creative Synthesis', value: 78, color: 'bg-udanix-orange' },
                    { label: 'Strategic Planning', value: 85, color: 'bg-purple-500' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] font-black text-udanix-navy/60 uppercase tracking-[0.2em]">{stat.label}</span>
                        <span className="text-sm font-black text-udanix-navy">{stat.value}%</span>
                      </div>
                      <div className="h-3 bg-white/40 rounded-full overflow-hidden border border-white/40">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          transition={{ duration: 2, delay: 0.5 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full ${stat.color} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visual Radar/Circle Mockup */}
                <div className="relative flex justify-center py-10">
                    <div className="w-56 h-56 rounded-full border-[12px] border-white/40 relative flex items-center justify-center shadow-inner bg-white/20">
                        <div className="absolute inset-[-20px] border-[1px] border-dashed border-udanix-blue/30 animate-spin-slow rounded-full" />
                        <div className="w-36 h-36 rounded-full bg-brand-gradient/10 border border-brand-gradient/20 flex flex-col items-center justify-center p-6 text-center shadow-premium">
                            <Binary className="w-10 h-10 text-udanix-orange mb-3" />
                            <span className="text-[10px] font-black text-udanix-navy uppercase tracking-tighter leading-none">Scanning <br/> Behavioral Vibe</span>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Result Cards */}
            <AnimatePresence>
              {MATCHES.map((match, idx) => (
                <motion.div
                  key={match.role}
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1 + (idx * 0.3), duration: 0.8 }}
                  whileHover={{ scale: 1.1, zIndex: 50 }}
                  className={`absolute z-20 glass-premium px-8 py-5 rounded-[2rem] border border-white/60 shadow-premium-xl flex items-center gap-6 whitespace-nowrap cursor-default
                    ${idx === 0 ? '-top-12 -right-12' : idx === 1 ? 'top-1/3 -right-24' : 'bottom-12 -right-16'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${idx === 0 ? 'bg-udanix-blue/10' : idx === 1 ? 'bg-udanix-orange/10' : 'bg-purple-100'}`}>
                    {idx === 0 ? <Trophy className="w-6 h-6 text-udanix-blue" /> : <TrendingUp className="w-6 h-6 text-udanix-orange" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Match</p>
                    <h5 className="text-sm font-black text-udanix-navy uppercase">{match.role}</h5>
                  </div>
                  <div className={`text-xl font-black ${match.color}`}>{match.match}</div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Decorative Glows */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-udanix-blue/20 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-udanix-orange/20 blur-[120px] animate-pulse" />
          </div>

        </div>

        {/* Global Impact Grid */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { title: 'Academic Excellence', val: '45K+', desc: 'Students mapped to Ivy League & Tier-1 institutions.', icon: Trophy },
                { title: 'Lucrative Paths', val: '$150K', desc: 'Average starting salary of recommended profiles.', icon: Zap },
                { title: 'Scientific Depth', val: '250+', desc: 'Behavioral parameters analyzed per session.', icon: Binary }
            ].map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group glass-premium p-12 rounded-[3.5rem] border-white/60 hover:shadow-premium-xl transition-all duration-700 bg-white/40 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                    <div className="w-16 h-16 rounded-2xl bg-white border border-white flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-premium">
                        <item.icon className="w-8 h-8 text-udanix-blue" />
                    </div>
                    <h4 className="text-[11px] font-black text-udanix-orange uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        {item.title}
                    </h4>
                    <p className="text-5xl font-black text-udanix-navy uppercase tracking-tighter mb-4">{item.val}</p>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed uppercase tracking-tight italic opacity-70">
                        {item.desc}
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
