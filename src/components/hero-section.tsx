'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Play, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden bg-slate-950">
      {/* ─── ENHANCED DYNAMIC BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />
        
        {/* Animated Mesh Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-udanix-blue/30 rounded-full blur-[140px]" 
        />
        
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[120px]" 
        />

        {/* Noise & Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Elite Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={24} height={24} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
              Trusted by <span className="text-white">50k+</span> Students
            </span>
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              Elevate Your <br />
              <span className="text-brand-gradient drop-shadow-[0_0_30px_rgba(14,57,154,0.3)]">Career Orbit.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-400 font-bold leading-relaxed uppercase tracking-wide"
            >
              Bypass the uncertainty. Get <span className="text-white">AI-precision guidance</span> and expert counseling to navigate your future with absolute clarity.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <button className="group relative w-full bg-white text-slate-900 text-[13px] font-black py-6 px-12 rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Free Assessment <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 text-white text-[13px] font-black py-6 px-12 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest backdrop-blur-sm shadow-xl">
              <div className="w-8 h-8 rounded-full bg-udanix-blue flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              Talk to Counselor
            </button>
          </motion.div>

          {/* Stats Section - Bento Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-20 border-t border-white/5"
          >
            {[
              { label: 'Successful Placements', value: '50k+', sub: 'Students Reached' },
              { label: 'Certified Mentors', value: '200+', sub: 'Global Experts' },
              { label: 'Platform Rating', value: '4.9/5', sub: 'Verified Reviews' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group cursor-default">
                <span className="text-4xl font-black text-white mb-2 tracking-tighter group-hover:text-udanix-blue transition-colors">
                  {stat.value}
                </span>
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                  <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">
                    {stat.sub}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-brand-gradient opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-udanix-blue opacity-10 blur-3xl animate-float" />
    </section>
  );
}
