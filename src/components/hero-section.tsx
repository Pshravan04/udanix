'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Zap, ArrowRight, Star } from 'lucide-react';
import { fadeUp, staggerContainer as stagger } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background Layer: Mesh & Noise */}
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-mesh-blue opacity-40" />
        <div className="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-udanix-blue/10 rounded-full blur-[160px] animate-mesh-blue" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-udanix-orange/5 rounded-full blur-[140px] animate-mesh-orange" />
        
        {/* Parallax Background Text */}
        <motion.div 
          style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, 400]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          <h2 className="text-[25vw] font-black text-slate-50 uppercase tracking-tighter opacity-50 leading-none">
            Future
          </h2>
        </motion.div>
        
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content: The "Integrated" Focus */}
          <motion.div 
            variants={stagger} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="lg:col-span-7 space-y-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-premium border border-white/60 text-udanix-blue text-[12px] font-black uppercase tracking-[0.4em] shadow-premium mb-4 group cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-udanix-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-udanix-orange shadow-[0_0_10px_rgba(223,89,14,0.5)]"></span>
              </span>
              Precision Career Engineering
              <div className="h-4 w-px bg-slate-200 mx-2" />
              <span className="text-slate-400 group-hover:text-udanix-blue transition-colors">V4.0</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[90px] sm:text-[120px] lg:text-[140px] font-black text-udanix-navy leading-[0.75] tracking-[-0.06em] uppercase">
              Forge<br />
              <span className="text-brand-gradient text-glow-blue">The Path.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-12 max-w-3xl">
              <div className="space-y-6 flex-1">
                <p className="text-slate-500 text-2xl sm:text-3xl leading-[1.1] font-bold italic border-l-8 border-udanix-orange pl-8">
                  &quot;Stop wandering. Start building a legacy that reflects your true potential.&quot;
                </p>
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                  We combine AI-driven insights with elite mentorship to bridge the gap between where you are and where you belong.
                </p>
              </div>

              {/* Floating Metrics */}
              <div className="hidden sm:flex flex-col gap-8 pt-4">
                <div className="glass-premium p-6 rounded-[2.5rem] border border-white/80 shadow-premium-xl -rotate-3 hover:rotate-0 transition-transform cursor-default">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Success</p>
                  <p className="text-3xl font-black text-udanix-navy">98.2%</p>
                </div>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-premium hover:-translate-y-2 transition-transform">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-8 pt-8">
              <Link href="/register">
                <button className="bg-brand-gradient text-white text-[15px] font-black py-8 px-20 rounded-[3rem] shadow-premium-xl hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.35em] group relative overflow-hidden border-glow-blue">
                  <span className="relative z-10 flex items-center gap-4">
                    Initialize Path <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </Link>
              <button className="glass-premium text-udanix-navy text-[15px] font-black py-8 px-14 rounded-[3rem] border border-white/60 hover:bg-white hover:shadow-premium-xl transition-all uppercase tracking-[0.35em]">
                The Science
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Interactive Visual Engine */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group">
              {/* Main Visual Card */}
              <div className="relative z-10 glass-extreme rounded-[5rem] border border-white/40 p-2 overflow-hidden shadow-premium-xl aspect-[4/5] flex items-center justify-center">
                 {/* Background Glow */}
                 <div className="absolute inset-0 bg-brand-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                 
                 {/* Centered Interactive Element */}
                 <div className="relative w-full h-full p-12 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="w-20 h-20 rounded-3xl bg-white shadow-premium flex items-center justify-center">
                        <Rocket className="w-10 h-10 text-udanix-blue" />
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
                        <p className="text-udanix-blue font-black text-lg">OPERATIONAL</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-2">
                         <div className="flex justify-between items-end">
                            <p className="text-4xl font-black text-udanix-navy">9.8</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precision Score</p>
                         </div>
                         <div className="h-3 bg-white/50 rounded-full overflow-hidden p-0.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "98%" }}
                              transition={{ duration: 2, delay: 0.5 }}
                              className="h-full bg-brand-gradient rounded-full shadow-[0_0_15px_rgba(0,62,138,0.5)]" 
                            />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Latency', val: '12ms' },
                          { label: 'Uptime', val: '99.9%' }
                        ].map((m, idx) => (
                          <div key={idx} className="glass-premium p-6 rounded-[2rem] border border-white/60">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                            <p className="text-xl font-black text-udanix-navy">{m.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>

              {/* Floating "Spells" */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 -right-16 z-20 glass-premium p-8 rounded-[3rem] border border-white/80 shadow-premium-xl backdrop-blur-3xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-udanix-orange flex items-center justify-center text-white shadow-orange-glow mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Peak Flow</p>
                <p className="text-2xl font-black text-udanix-navy">Enabled</p>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 z-20 glass-premium p-8 rounded-[3.5rem] border border-white/80 shadow-premium-xl backdrop-blur-3xl max-w-[240px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-udanix-blue/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-udanix-blue" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Industry Rating</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-udanix-orange fill-udanix-orange" />)}
                    </div>
                  </div>
                </div>
                <p className="text-[14px] text-slate-500 font-bold italic leading-tight">
                  &quot;The most precise guidance platform I&apos;ve ever used.&quot;
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
