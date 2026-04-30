'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-40 relative overflow-hidden bg-white">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-extreme rounded-[6rem] border border-white/60 p-20 sm:p-32 overflow-hidden text-center"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 mesh-gradient-premium opacity-40" />
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-udanix-blue/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-udanix-orange/10 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            <motion.div 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full glass-premium border border-white shadow-premium"
            >
              <Sparkles className="w-5 h-5 text-udanix-orange animate-pulse" />
              <span className="text-udanix-blue text-[13px] font-black uppercase tracking-[0.4em]">
                Limited Availability for 2024
              </span>
            </motion.div>
 
            <h2 className="text-[64px] sm:text-[100px] lg:text-[130px] font-black text-udanix-navy leading-[0.75] tracking-[-0.05em] uppercase">
              Stop Guessing.<br />
              <span className="text-brand-gradient drop-shadow-sm">Start Growing.</span>
            </h2>

            <p className="text-slate-500 text-2xl sm:text-3xl font-bold italic max-w-3xl mx-auto leading-tight">
              &quot;Your career is the most important project you&apos;ll ever lead. Don&apos;t leave it to chance.&quot;
            </p>

            <div className="flex flex-wrap justify-center gap-10 pt-8">
              <Link href="/register">
                <button className="bg-brand-gradient text-white text-[16px] font-black py-10 px-24 rounded-[3.5rem] shadow-premium-xl hover:scale-[1.08] active:scale-[0.95] transition-all uppercase tracking-[0.4em] group relative overflow-hidden border-glow-blue">
                  <span className="relative z-10 flex items-center gap-6">
                    Launch My Future <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </Link>
              <button className="glass-premium text-udanix-navy text-[16px] font-black py-10 px-16 rounded-[3.5rem] border border-white/60 hover:bg-white hover:shadow-premium-xl transition-all uppercase tracking-[0.4em]">
                Meet The Mentors
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
