'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Play, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* ─── BRAND COLOR DYNAMIC BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Dark (Navy) to Bottom Light (White) Gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #002d52 0%, #0e399a 30%, #0274c1 60%, #ffffff 100%)' }} />
        
        {/* Navy blue orb — top left */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[130px]" 
          style={{ background: 'rgba(14, 57, 154, 0.3)' }}
        />
        
        {/* Orange orb accent — middle right */}
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px]" 
          style={{ background: 'rgba(223, 89, 14, 0.2)' }}
        />

        {/* Noise & Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Elite Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-900 overflow-hidden">
                  <Image src={`/images/student-${i}.png`} alt="User" width={24} height={24} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
              Trusted by <span className="text-udanix-orange">50k+</span> Students
            </span>
            <Sparkles className="w-4 h-4 text-udanix-orange animate-pulse" />
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter uppercase"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              Design Your <br />
              <span className="bg-gradient-to-r from-udanix-orange to-white bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(223,89,14,0.3)]">Dream Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto text-sm sm:text-lg lg:text-xl text-slate-100 font-bold leading-relaxed uppercase tracking-wide px-4 opacity-95"
            >
             Personalized guidance for stream selection, entrance exams, and future-ready career paths. Empowering students to make informed decisions.
            </motion.p>
          </div>

          {/* Buttons - More Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <button className="group relative w-full bg-white text-slate-950 text-[10px] sm:text-[13px] font-black py-4 sm:py-6 px-8 sm:px-12 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.15em] sm:tracking-widest overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Assessment <Rocket className="w-4 h-4 sm:w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform text-udanix-blue" />
                </span>
              </button>
            </Link>
            
            <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 text-white text-[10px] sm:text-[13px] font-black py-4 sm:py-6 px-8 sm:px-12 rounded-2xl border border-white/20 hover:bg-white/10 transition-all uppercase tracking-[0.15em] sm:tracking-widest backdrop-blur-md shadow-sm">
              <div className="w-7 h-7 sm:w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 sm:w-3.5 h-3.5 fill-white text-white ml-0.5" />
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
