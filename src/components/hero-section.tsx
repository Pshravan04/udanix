'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Play, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden bg-hero-light">
      {/* ─── BRAND COLOR DYNAMIC BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #F2F5FF 0%, #FFFAF7 50%, #F5F8FF 100%)' }} />
        
        {/* Navy blue orb — top left (matches logo navy #0e399a) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.50, 0.35],
            x: [0, 40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[130px]" 
          style={{ background: 'rgba(14, 57, 154, 0.13)' }}
        />
        
        {/* Orange orb — top right (matches logo orange #df590e) */}
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.20, 0.35, 0.20],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px]" 
          style={{ background: 'rgba(223, 89, 14, 0.12)' }}
        />

        {/* Blue accent orb — bottom right (#0274c1) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, -20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[110px]" 
          style={{ background: 'rgba(2, 116, 193, 0.10)' }}
        />

        {/* Noise & Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.025] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e399a08_1px,transparent_1px),linear-gradient(to_bottom,#0e399a08_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Elite Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 backdrop-blur-md shadow-xl"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                  <Image src={`/images/student-${i}.png`} alt="User" width={24} height={24} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="h-4 w-[1px] bg-slate-200 mx-1" />
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Trusted by <span className="text-slate-950">50k+</span> Students
            </span>
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 leading-[0.9] tracking-tighter uppercase"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              Your Career Journey <br />
              <span className="text-brand-gradient drop-shadow-[0_0_30px_rgba(14,57,154,0.3)]">Starts Here</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto text-sm sm:text-lg text-slate-400 font-bold leading-relaxed uppercase tracking-wide px-4"
            >
             Get expert guidance on stream selection, career paths, entrance exams, and future opportunities. Make informed decisions with personalized counseling.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <button className="group relative w-full bg-slate-950 text-white text-[11px] sm:text-[13px] font-black py-5 sm:py-6 px-8 sm:px-12 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Free Assessment <Rocket className="w-4 h-4 sm:w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-50 text-slate-950 text-[11px] sm:text-[13px] font-black py-5 sm:py-6 px-8 sm:px-12 rounded-2xl border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all uppercase tracking-widest backdrop-blur-sm shadow-sm">
              <div className="w-7 h-7 sm:w-8 h-8 rounded-full bg-udanix-blue flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <Play className="w-3 h-3 sm:w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              Talk to Counselor
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
