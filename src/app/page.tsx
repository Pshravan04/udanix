'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import {
  GraduationCap, ArrowRight, Star, MessageSquare, Calendar, Sparkles,
  Users, Clock, Video, Zap, Shield, BookOpen, Search, 
  TrendingUp, Globe, Layers
} from 'lucide-react';
import { StreamExplorer } from '@/components/stream-explorer';
import { CareerPaths } from '@/components/career-paths';
import { CounselorSection } from '@/components/counselor-section';
import { StudentLoginModal } from '@/components/auth/student-login-modal';
import { CareerAssessment } from '@/components/career-assessment';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const FEATURES = [
  { icon: Video, title: 'HD Video Sessions', desc: 'Crystal-clear consultations with built-in recording and notes.' },
  { icon: Shield, title: 'Verified Experts', desc: 'Every counselor is credential-verified before joining.' },
  { icon: Zap, title: 'Instant Booking', desc: 'Schedule sessions in under 60 seconds with live availability.' },
  { icon: BookOpen, title: 'Progress Tracking', desc: 'Monitor growth with session summaries and goal tracking.' },
  { icon: MessageSquare, title: 'Async Chat', desc: 'Message your counselor between sessions, any time.' },
  { icon: Calendar, title: 'Smart Scheduling', desc: 'AI-powered schedule matching across time zones.' },
];

const STATS = [
  { value: '50,000+', label: 'Students Guided', icon: GraduationCap },
  { value: '200+', label: 'Expert Counselors', icon: Users },
  { value: '95%', label: 'Success Rate', icon: Star },
];

const STEPS = [
  { step: '01', title: 'Create Your Profile', desc: 'Tell us your goals, interests, and the kind of guidance you need.' },
  { step: '02', title: 'Match With Experts', desc: 'Our algorithm connects you with the best-fit counselors.' },
  { step: '03', title: 'Book & Connect', desc: 'Schedule a session via video, audio, or chat.' },
  { step: '04', title: 'Grow Continuously', desc: 'Track progress, revisit notes, and keep moving forward.' },
];

const WHY_CARDS = [
  { icon: TrendingUp, color: '#EFF6FF', iconColor: 'var(--udanix-blue)', title: 'Clarity on Career Paths', desc: 'Thousands of students lack proper guidance. Our platform simplifies your decision, enabling faster, smarter choices.' },
  { icon: Globe, color: '#ECFDF5', iconColor: '#059669', title: 'Access Expert Network', desc: 'Finding a verified counselor is hard. Our system connects you to trusted experts instantly without the hassle.' },
  { icon: Layers, color: '#F5F3FF', iconColor: '#7C3AED', title: 'Missed Growth Insights', desc: 'Without the right tools, your potential goes untapped. UDANIX surfaces growth data and opportunities you never saw.' },
];

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-white text-[#111827] overflow-x-hidden selection:bg-udanix-blue/10 selection:text-udanix-blue">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 glass-premium border-b border-white/20 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto h-[80px] flex items-center justify-between gap-8">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="Udaanix" className="h-10 w-auto" />
            </Link>

            <nav className="hidden xl:flex items-center gap-2">
              {[
                { label: 'Explore Streams', href: '#streams' },
                { label: 'Counselors', href: '#counselors' },
                { label: 'Career Paths', href: '#paths' },
                { label: 'Assessment', href: '/register' }
              ].map((link) => (
                <Link key={link.label} href={link.href}>
                  <button className="text-[13px] font-bold text-slate-500 hover:text-udanix-blue transition-all px-4 py-2 rounded-xl hover:bg-udanix-blue/5 whitespace-nowrap uppercase tracking-wider">
                    {link.label}
                  </button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5 flex-1 justify-end max-w-2xl">
            <div className="relative group flex-1 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-udanix-blue transition-colors" />
              <input
                type="text"
                placeholder="Search careers, courses..."
                className="w-full bg-slate-100/50 border border-slate-200/50 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold focus:ring-4 focus:ring-udanix-blue/5 focus:bg-white focus:border-udanix-blue/20 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/student/profile">
                    <button className="text-[12px] font-black text-slate-500 hover:text-udanix-blue uppercase tracking-widest transition-all px-4 py-2 rounded-xl hover:bg-slate-50">
                      Profile
                    </button>
                  </Link>
                  <Link href="/student">
                    <button className="bg-brand-gradient text-white text-[13px] font-black py-3.5 px-8 rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                      Dashboard
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="hidden sm:block">
                    <StudentLoginModal />
                  </div>
                  <Link href="/register">
                    <button className="bg-brand-gradient text-white text-[13px] font-black py-3.5 px-8 rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                      Join Now
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
           {/* ─── HERO ─── */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-mesh-blue">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-udanix-blue/20 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-udanix-orange/15 blur-[120px]" 
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 text-left space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-premium border border-white/60 text-udanix-blue text-[13px] font-black uppercase tracking-[0.25em] shadow-premium"
              >
                <Sparkles className="w-4 h-4 text-udanix-orange animate-pulse" />
                Empowering 50k+ Future Leaders
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[64px] sm:text-[90px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.85] filter drop-shadow-sm"
                >
                  Your Career,<br /> 
                  <span className="text-brand-gradient">Precision</span> Engineered.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-500 text-2xl leading-relaxed font-bold italic max-w-2xl"
                >
                  "The gap between who you are and who you want to be is bridged by the right guidance. Connect with world-class experts today."
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <Link href="/register">
                  <button className="bg-brand-gradient text-white text-[15px] font-black py-6 px-14 rounded-[2rem] shadow-premium-xl hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.3em] flex items-center gap-4">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <div className="scale-125 origin-center ml-4">
                  <StudentLoginModal />
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-12 pt-12 border-t border-slate-100/50"
              >
                {STATS.map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-3xl font-black text-udanix-navy tracking-tighter uppercase">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Visual Bento */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* Main Dashboard Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute inset-0 glass-premium rounded-[4rem] border border-white/60 shadow-premium-xl overflow-hidden p-10 z-10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-gradient p-0.5">
                        <div className="w-full h-full rounded-[0.9rem] bg-white flex items-center justify-center">
                          <img src="/logo.jpg" alt="" className="w-8 h-auto" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-black text-udanix-navy uppercase">Student Portal</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Session</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                       <Users className="w-5 h-5 text-udanix-blue" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 rounded-3xl bg-udanix-blue/5 border border-udanix-blue/10 p-5">
                         <TrendingUp className="w-5 h-5 text-udanix-blue mb-2" />
                         <div className="h-3 w-1/2 bg-udanix-blue/10 rounded-full" />
                      </div>
                      <div className="h-24 rounded-3xl bg-udanix-orange/5 border border-udanix-orange/10 p-5">
                         <Zap className="w-5 h-5 text-udanix-orange mb-2" />
                         <div className="h-3 w-1/2 bg-udanix-orange/10 rounded-full" />
                      </div>
                    </div>
                    <div className="h-40 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 border-dashed flex items-center justify-center">
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Growth Map Loading...</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 glass-premium p-6 rounded-3xl border border-white/60 shadow-premium z-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                      <Star className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-udanix-navy uppercase">Verified Expert</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -left-10 glass-premium p-6 rounded-3xl border border-white/60 shadow-premium z-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-udanix-blue flex items-center justify-center text-white">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-udanix-navy uppercase">Live Guidance</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">34 Students Online</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ─── WHY UDANIX ─── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-udanix-orange/5 blur-[180px] rounded-full animate-pulse" />
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-24">
              <div className="space-y-6 max-w-2xl">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-white/60 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-udanix-orange fill-udanix-orange" />
                  Our Impact
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-[56px] sm:text-[72px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.85]">
                  Clarity Over <br /><span className="text-brand-gradient">Confusion</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-slate-500 text-xl leading-relaxed font-semibold italic max-w-xl">
                  "Turning uncertainty into an unfair advantage. We provide the tools you need to outpace the competition."
                </motion.p>
              </div>
              <motion.div variants={fadeUp} className="pb-4">
                 <Link href="/register">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-4 text-udanix-blue font-black uppercase tracking-[0.2em] text-[12px] bg-white shadow-premium px-8 py-4 rounded-2xl hover:shadow-premium-xl transition-all border border-slate-100"
                    >
                       Explore platform
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                 </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHY_CARDS.map((c, i) => (
                <motion.div key={c.title} variants={fadeUp} className="group relative">
                  <div className="relative glass-premium p-12 rounded-[3.5rem] border border-white/60 shadow-premium hover:shadow-premium-xl transition-all duration-500 h-full flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border border-white shadow-premium group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" style={{ background: c.color }}>
                      <c.icon className="w-8 h-8" style={{ color: c.iconColor }} />
                    </div>
                    <h3 className="font-black text-udanix-navy text-2xl mb-5 tracking-tight uppercase leading-tight">{c.title}</h3>
                    <p className="text-slate-500 text-[15px] leading-relaxed font-semibold">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CAREER ASSESSMENT ─── */}
      <CareerAssessment />

      {/* ─── STREAM EXPLORER ─── */}
      <div id="streams" className="relative py-12">
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-udanix-blue/5 blur-[120px] rounded-full" />
         <StreamExplorer />
      </div>

      {/* ─── CAREER PATHS ─── */}
      <div id="paths" className="py-12">
         <CareerPaths />
      </div>

      {/* ─── COUNSELORS ─── */}
      <div id="counselors" className="relative py-12">
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-udanix-orange/5 blur-[150px] rounded-full" />
         <CounselorSection />
      </div>

      {/* ─── CTA BAND ─── */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-blue -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--udanix-blue)_0%,transparent_70%)] animate-float" />
        </div>
        
        <div className="max-w-[940px] mx-auto px-8 text-center relative">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-premium border border-white/60 text-udanix-blue text-[12px] font-black uppercase tracking-[0.3em] shadow-premium">
              Final Step
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[64px] sm:text-[80px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.9]">
              Ready to design<br /><span className="text-brand-gradient">your future?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-2xl leading-relaxed font-bold italic max-w-2xl mx-auto">
              "Join thousands of students already shaping their futures with Udanix. Start free, upgrade anytime."
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 justify-center pt-8">
              <Link href="/register">
                 <button className="bg-brand-gradient text-white text-[15px] font-black py-6 px-14 rounded-[2.5rem] shadow-premium-xl hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.25em]">
                    Try for Free
                 </button>
              </Link>
              <div className="scale-125 origin-center ml-4">
                 <StudentLoginModal />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-udanix-navy text-white relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-10 max-w-md">
              <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform origin-left">
                <img src="/logo.jpg" alt="Udaanix" className="h-12 w-auto invert brightness-0 underline-offset-8" />
              </Link>
              <p className="text-slate-400 text-2xl leading-relaxed font-semibold italic">
                "Empowering the next generation of thinkers and leaders through precision guidance."
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <Globe className="w-5 h-5 text-slate-400" />
                   </div>
                 ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-20">
              {[
                { title: 'Platform', links: ['Pathways', 'Counselors', 'Pricing', 'Labs'] },
                { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] },
              ].map(col => (
                <div key={col.title} className="space-y-10">
                  <p className="text-white font-black text-xs uppercase tracking-[0.3em] opacity-50">{col.title}</p>
                  <ul className="space-y-6">
                    {col.links.map(l => (
                      <li key={l}><Link href="#" className="text-slate-400 hover:text-udanix-orange text-sm transition-all font-bold uppercase tracking-widest">{l}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.25em]">© 2026 Udanix Technologies. All rights reserved.</p>
            <div className="flex items-center gap-6">
               <p className="text-slate-600 text-[11px] font-black tracking-widest uppercase italic opacity-60">Built for the infinite future.</p>
               <div className="w-2 h-2 rounded-full bg-udanix-orange animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
