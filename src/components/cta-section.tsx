'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Rocket } from 'lucide-react';
import Image from 'next/image';

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-900">
      {/* ─── ENHANCED BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[#020617]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-udanix-blue/20 rounded-full blur-[160px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px]" 
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="relative group">
          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative glass-dark rounded-[4rem] border border-white/10 p-12 sm:p-24 lg:p-32 overflow-hidden shadow-2xl"
          >
            {/* Animated Gradient Glow */}
            <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-brand-gradient opacity-20 blur-[120px] rounded-full group-hover:opacity-30 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-12">
              {/* Tag */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-udanix-blue text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
              >
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  Your Future is Calling
              </motion.div>

              {/* Heading */}
              <div className="space-y-6">
                <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-[50px] sm:text-[80px] lg:text-[100px] font-black text-white leading-[0.9] tracking-tighter uppercase">
                  Stop <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700 opacity-50">Guessing</span>.<br />
                  <span className="text-brand-gradient drop-shadow-2xl">Start Growing.</span>
                </h2>
                <p className="text-slate-400 text-lg sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
                  The gap between potential and success is a <span className="text-white">Strategic Flight Plan.</span> Secure your future with AI-precision guidance.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl pt-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="group relative w-full bg-white text-slate-900 text-[13px] font-black py-7 px-16 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Launch Career <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>

                <Link href="/counselors" className="w-full sm:w-auto">
                  <button className="w-full bg-white/5 text-white text-[13px] font-black py-7 px-16 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest backdrop-blur-sm">
                    Talk to Counselor
                  </button>
                </Link>
              </div>

              {/* Social Proof Mini */}
              <div className="flex flex-col items-center gap-6 pt-12 border-t border-white/5 w-full max-w-xl mx-auto">
                 <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden relative z-[i]">
                        <Image 
                          src={`https://i.pravatar.cc/100?img=${i+20}`} 
                          alt="User" 
                          width={40} 
                          height={40} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-brand-gradient flex items-center justify-center text-[10px] font-black text-white relative z-10">
                      +10k
                    </div>
                 </div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                   Trusted by students from <span className="text-white">Global Institutions</span>
                 </p>
              </div>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-udanix-blue/10 blur-[80px] rounded-full" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-gradient opacity-10 blur-[80px] rounded-full" />
        </div>
      </div>
    </section>
  );
}
