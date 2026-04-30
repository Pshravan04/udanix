'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Zap, ArrowRight, Star } from 'lucide-react';
import { fadeUp, staggerContainer as stagger } from '@/lib/animations';

export function HeroSection({ user }: { user: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 px-6">
      {/* Background Layer: Vibrant Gradient & Mesh */}
      <div className="absolute inset-0 -z-10 bg-[#0A0118]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1E0B4B] via-[#0A0118] to-[#0D0B1E]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-udanix-blue/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]" />
        
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-12"
        >
          {/* Tagline */}
          <motion.div variants={fadeUp} className="px-6 py-2 rounded-full glass-premium border border-white/10 text-white/80 text-[12px] font-bold uppercase tracking-[0.3em] backdrop-blur-xl">
            Your Future, Engineered
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={fadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight max-w-5xl"
          >
            Your Career Journey <br />
            <span className="text-brand-gradient bg-clip-text text-transparent bg-gradient-to-r from-udanix-blue to-cyan-400">Starts Here</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={fadeUp}
            className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed font-medium"
          >
            Get expert guidance on stream selection, career paths, entrance exams, and future opportunities. 
            Make informed decisions with personalized counseling.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <Link href="/assessment">
              <button className="bg-white text-udanix-blue text-[14px] font-black py-5 px-10 rounded-2xl shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-wider">
                Take Free Assessment
              </button>
            </Link>
            <Link href="/counselors">
              <button className="glass-premium text-white text-[14px] font-black py-5 px-10 rounded-2xl border border-white/20 hover:bg-white/10 transition-all uppercase tracking-wider">
                Talk to Counselor
              </button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24 pt-20"
          >
            {[
              { val: '50,000+', label: 'Students Guided' },
              { val: '200+', label: 'Expert Counselors' },
              { val: '95%', label: 'Success Rate' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <span className="text-4xl sm:text-5xl font-black text-white">{stat.val}</span>
                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
