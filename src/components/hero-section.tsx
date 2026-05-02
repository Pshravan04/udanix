'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Play, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden">
      {/* ─── BRAND COLOR DYNAMIC BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Dark (Navy) to Bottom Light (White) Gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0e399a 0%, #0274c1 60%, #ffffff 100%)' }} />
        
        {/* Navy blue orb — top left */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[800px] h-[800px] rounded-full blur-[120px]" 
          style={{ background: 'rgba(14, 57, 154, 0.25)' }}
        />
        
        {/* Orange orb accent — bottom right */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px]" 
          style={{ background: 'rgba(223, 89, 14, 0.15)' }}
        />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Elite Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-udanix-navy bg-white overflow-hidden shadow-sm">
                  <div className="w-full h-full bg-slate-200 animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <span className="text-white text-[11px] font-black uppercase tracking-[0.25em]">
              Trusted by <span className="text-udanix-orange">50k+</span> Students
            </span>
            <Sparkles className="w-4 h-4 text-udanix-orange animate-pulse" />
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter uppercase"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              Design Your <br />
              <span className="bg-gradient-to-r from-udanix-orange via-white to-white bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(223,89,14,0.4)]">Dream Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-3xl mx-auto text-sm sm:text-lg lg:text-xl text-white/90 font-bold leading-relaxed uppercase tracking-wide px-4"
            >
             Personalized guidance for stream selection, entrance exams, and future-ready career paths. Empowering students to make informed decisions.
            </motion.p>
          </div>

          {/* Buttons - Improved Responsiveness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto px-4"
          >
            <Link href="/register" className="flex-1">
              <button className="group relative w-full bg-white text-udanix-navy text-[13px] font-black py-6 px-12 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Assessment <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <button className="group flex-1 flex items-center justify-center gap-4 bg-white/10 text-white text-[13px] font-black py-6 px-12 rounded-3xl border border-white/20 hover:bg-white/20 transition-all uppercase tracking-[0.2em] backdrop-blur-xl">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              Talk to Mentor
            </button>
          </motion.div>

          {/* Stats Section - Bento Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-16 sm:pt-20 border-t border-slate-100"
          >
            {[
              { label: 'Successful Placements', value: '50k+', sub: 'Students Reached' },
              { label: 'Certified Mentors', value: '200+', sub: 'Global Experts' },
              { label: 'Platform Rating', value: '4.9/5', sub: 'Verified Reviews' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group cursor-default">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 mb-2 tracking-tighter group-hover:text-udanix-blue transition-colors">
                  {stat.value}
                </span>
                <div className="flex flex-col items-center text-center">
                  <span className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                  <span className="text-slate-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mt-1">
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
