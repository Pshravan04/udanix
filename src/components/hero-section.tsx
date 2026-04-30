'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer as stagger } from '@/lib/animations';


export function HeroSection() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden bg-white">
      {/* ─── ENHANCED BACKGROUND ─── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Animated Mesh Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-100/30 rounded-full blur-[120px]" 
        />
        
        {/* Grid & Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Tagline */}
          <motion.div 
            variants={fadeUp} 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-slate-200"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Empowering Your Future
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={fadeUp}
            className="text-6xl sm:text-8xl lg:text-[110px] font-black text-slate-900 leading-[0.82] tracking-[-0.04em] max-w-[1000px] mb-10"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Your Career Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-udanix-blue via-blue-600 to-indigo-600">
              Starts Here.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={fadeUp}
            className="text-slate-500 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium mb-14"
          >
            Expert guidance on stream selection, career paths, and entrance exams. 
            Join 50,000+ students bridging the gap between potential and success.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <Link href="/counselors">
              <button className="bg-slate-900 text-white text-[13px] font-black py-6 px-14 rounded-2xl shadow-2xl shadow-slate-200 hover:scale-[1.05] active:scale-[0.98] transition-all uppercase tracking-widest">
                Talk to Counselor
              </button>
            </Link>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}

