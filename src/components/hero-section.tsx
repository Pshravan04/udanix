'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Zap, ArrowRight, Star } from 'lucide-react';
import { fadeUp, staggerContainer as stagger } from '@/lib/animations';

export function HeroSection({ user }: { user: any }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-udanix-orange/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] bg-purple-100/40 rounded-full blur-[80px]" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Tagline */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-widest mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Empowering Your Future
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={fadeUp}
            className="text-6xl sm:text-7xl lg:text-[100px] font-black text-slate-900 leading-[0.85] tracking-tight max-w-6xl mb-8"
          >
            Your Career Journey <br />
            <span className="text-udanix-blue">Starts Here.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={fadeUp}
            className="text-slate-500 text-lg sm:text-xl max-w-3xl leading-relaxed font-medium mb-12"
          >
            Expert guidance on stream selection, career paths, and entrance exams. 
            Bridge the gap between your potential and your dream career with elite mentorship.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <Link href="/assessment">
              <button className="bg-udanix-blue text-white text-[15px] font-black py-5 px-12 rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-wider">
                Take Free Assessment
              </button>
            </Link>
            <Link href="/counselors">
              <button className="bg-white text-slate-700 text-[15px] font-black py-5 px-12 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all uppercase tracking-wider">
                Talk to Counselor
              </button>
            </Link>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            variants={fadeUp}
            className="relative w-full max-w-5xl mx-auto group"
          >
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-2xl overflow-hidden">
               <Image 
                 src="/images/dashboard-preview.png" 
                 alt="Udanix Student Dashboard" 
                 width={1200} 
                 height={800} 
                 className="rounded-[2rem] w-full h-auto"
                 priority
               />
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-8 hidden lg:block glass-premium p-6 rounded-2xl border border-white/60 shadow-xl backdrop-blur-xl z-20"
            >
               <p className="text-3xl font-black text-udanix-blue">95%</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Success Rate</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-8 hidden lg:block glass-premium p-6 rounded-2xl border border-white/60 shadow-xl backdrop-blur-xl z-20"
            >
               <div className="flex -space-x-2 mb-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                     <Image src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" width={32} height={32} />
                   </div>
                 ))}
               </div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">50,000+ Guided</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
