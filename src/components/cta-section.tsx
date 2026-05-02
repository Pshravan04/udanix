'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section className="py-40 relative overflow-hidden bg-slate-950">
      {/* ─── ENHANCED BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[#020617]" />
          
          {/* Animated Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-udanix-blue/20 rounded-full blur-[160px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.3, 1, 1.3],
              opacity: [0.1, 0.3, 0.1],
              x: [0, -80, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-udanix-orange/10 rounded-full blur-[140px]" 
          />
          
          {/* Noise & Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="relative group">
          {/* Main Closer Card */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative glass-dark rounded-[5rem] border border-white/10 p-16 sm:p-24 lg:p-40 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            {/* Dynamic Inner Glow */}
            <div className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] bg-brand-gradient opacity-10 blur-[140px] rounded-full group-hover:opacity-20 transition-opacity duration-1000" />
            <div className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] bg-udanix-blue/10 blur-[140px] rounded-full group-hover:opacity-20 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-16">
              {/* Premium Tag */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl backdrop-blur-xl"
              >
                  <Sparkles className="w-4 h-4 text-udanix-orange animate-pulse" />
                  Your Future is Ready
              </motion.div>

              {/* Mega Heading */}
              <div className="space-y-8">
                <h2 style={{ fontFamily: 'var(--font-plus-jakarta)' }} className="text-[55px] sm:text-[90px] lg:text-[130px] font-black text-white leading-[0.85] tracking-tighter uppercase">
                  Stop <span className="text-white/20">Guessing</span>.<br />
                  <span className="text-brand-gradient drop-shadow-[0_0_40px_rgba(14,57,154,0.4)]">Start Growing.</span>
                </h2>
                <p className="text-slate-400 text-xl sm:text-2xl font-bold max-w-3xl mx-auto leading-relaxed uppercase tracking-wider">
                  The gap between potential and success is a <span className="text-white">Strategic Flight Plan.</span> Secure your orbit with AI-precision guidance.
                </p>
              </div>

              {/* High-Impact CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-3xl">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="group relative w-full bg-white text-slate-950 text-[14px] font-black py-8 px-20 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      Launch Career <Rocket className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>

                <Link href="/counselors" className="w-full sm:w-auto">
                  <button className="group w-full bg-white/5 text-white text-[14px] font-black py-8 px-20 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-[0.2em] backdrop-blur-md flex items-center justify-center gap-3">
                    Talk to Expert <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Elite Social Proof */}
              <div className="flex flex-col items-center gap-8 pt-16 border-t border-white/5 w-full max-w-2xl">
                 <div className="flex flex-col items-center gap-4">
                    <div className="flex -space-x-4">
                        {[1,2,3,4,5,6].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] bg-slate-800 overflow-hidden relative z-[i] shadow-2xl">
                            <Image 
                              src={`https://i.pravatar.cc/100?img=${i+30}`} 
                              alt="Success Story" 
                              width={48} 
                              height={48} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-4 border-[#020617] bg-brand-gradient flex items-center justify-center text-[11px] font-black text-white relative z-10 shadow-2xl">
                          +50k
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 mb-2">
                            {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-3 h-3 text-udanix-gold fill-udanix-gold" />)}
                        </div>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">
                        Join the <span className="text-white">Elite Network</span> of future leaders
                        </p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Background Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10 rounded-tl-[5rem] m-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10 rounded-br-[5rem] m-10" />
          </motion.div>

          {/* Exterior Floating Accents */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-udanix-blue/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gradient opacity-10 blur-[100px] rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
}
