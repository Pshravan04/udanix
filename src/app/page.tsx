'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import {
  GraduationCap, ArrowRight, Star, MessageSquare, Calendar, Sparkles,
  Users, Clock, Video, Zap, Shield, BookOpen, Search, 
  TrendingUp, Globe, Layers
} from 'lucide-react';
import { StreamExplorer } from '@/components/stream-explorer';
import { CareerPaths } from '@/components/career-paths';
import { CounselorSection } from '@/components/counselor-section';
import { StudentLoginModal } from '@/components/auth/student-login-modal';

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
    <div className="min-h-screen bg-white text-[#111827] overflow-x-hidden">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]/70 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto h-[72px] flex items-center justify-between gap-8">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
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
                  <button className="text-[14px] font-medium text-[#6B7280] hover:text-udanix-blue transition-colors px-3 py-2 rounded-lg whitespace-nowrap">
                    {link.label}
                  </button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Search + Profile + CTA */}
          <div className="flex items-center gap-5 flex-1 justify-end max-w-2xl">
            <div className="relative group flex-1 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#9CA3AF] group-focus-within:text-udanix-blue transition-colors" />
              <input
                type="text"
                placeholder="Search careers, courses..."
                className="w-full bg-[#F3F4F6] border-none rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-udanix-blue/10 transition-all placeholder:text-[#9CA3AF]"
              />
            </div>

            <div className="flex items-center gap-4 flex-shrink-0 font-bold">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/student/profile">
                    <button className="text-[11px] font-black text-slate-500 hover:text-udanix-blue uppercase tracking-widest transition-all px-4 py-2 rounded-xl hover:bg-slate-50">
                      My Profile
                    </button>
                  </Link>
                  <Link href="/student">
                    <button className="bg-udanix-blue text-white text-sm font-black py-3 px-8 rounded-xl shadow-lg shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                      Dashboard
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <StudentLoginModal />
                  <Link href="/register">
                    <button className="bg-udanix-blue text-white text-sm font-black py-3 px-8 rounded-xl shadow-lg shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                      Join Now
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% -10%, #C7E2FF 0%, #E8F4FF 30%, #F0F9FF 55%, #ffffff 80%)'
        }} />

        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#BFDBFE] text-udanix-blue text-[11px] font-black uppercase tracking-[0.15em] shadow-float">
              <Sparkles className="w-3 h-3" />
              Next-Gen Student Counselling
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[56px] sm:text-[68px] lg:text-[80px] font-black text-[#111827] leading-[1.05] tracking-[-0.03em] max-w-4xl mx-auto uppercase"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Your Career Journey
            <br /> <span className="text-udanix-blue">Starts Here</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Get expert guidance on stream selection, career paths, entrance exams, and future opportunities.
            Make informed decisions with personalized counseling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {user ? (
              <Link href="/student">
                <button className="bg-udanix-blue text-white text-sm font-black py-4 px-10 rounded-2xl shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                  Launch Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <button className="bg-udanix-blue text-white text-sm font-black py-4 px-10 rounded-2xl shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                    Start My Journey
                  </button>
                </Link>
                <Link href="/student/directory">
                  <button className="inline-flex items-center gap-2 text-sm font-bold text-[#111827] bg-white/40 backdrop-blur-md border border-white/40 px-10 py-4 rounded-2xl shadow-float hover:shadow-float-lg hover:-translate-y-0.5 transition-all uppercase tracking-widest">
                    Talk to Counselor
                  </button>
                </Link>
              </>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-[#9CA3AF] font-bold uppercase tracking-widest"
          >
            No credit card required · Free to explore · 200+ verified experts
          </motion.p>

          {/* ── Dashboard Simulation ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="bg-white rounded-[2.5rem] shadow-premium-xl border border-[#E5E7EB] overflow-hidden">
               <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] px-5 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-white border border-[#E5E7EB] rounded-lg px-4 py-1.5 mx-4 text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] text-left">
                  network.udanix.com/student/node_01
                </div>
              </div>
              <div className="bg-[#F8FAFC] p-8 min-h-[400px]">
                 <div className="flex gap-6 h-full">
                    {/* Sidebar Sim */}
                    <div className="w-56 bg-white rounded-3xl border border-[#E5E7EB] p-5 flex flex-col gap-4 flex-shrink-0 shadow-sm">
                        <img src="/logo.jpg" alt="Logo" className="h-6 w-fit mb-4" />
                        {['Dashboard', 'Experts', 'Sessions', 'Analytics'].map((item, i) => (
                           <div key={item} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest ${i === 0 ? 'bg-udanix-blue/5 text-udanix-blue border border-udanix-blue/10' : 'text-slate-400 opacity-60'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-udanix-blue' : 'bg-slate-200'}`} />
                              {item}
                           </div>
                        ))}
                    </div>
                    {/* Content Sim */}
                    <div className="flex-1 space-y-6 text-left">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Welcome, Aryan! 👋</h3>
                            <div className="w-10 h-10 rounded-full bg-udanix-blue/10 border border-udanix-blue/20 flex items-center justify-center text-udanix-blue font-black tracking-tighter">AS</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm h-32 flex flex-col justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs">📊</div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metric 0{i}</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase">-- Data --</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ─── WHY UDANIX ─── */}
      <section className="py-28 bg-white border-b border-slate-50">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-14">
              <div className="space-y-2">
                <motion.p variants={fadeUp} className="text-udanix-blue text-xs font-black uppercase tracking-[0.2em]">Our Mission</motion.p>
                <motion.h2 variants={fadeUp} className="text-[42px] font-black text-[#111827] tracking-tighter uppercase leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Clarity Over Confusion
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="flex flex-col gap-1 md:text-right max-w-sm">
                <p className="text-[#4B5563] text-base leading-relaxed font-medium">
                  Turning confusion into clarity is a challenge for every student. Our platform simplifies your journey, enabling faster, smarter decisions.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHY_CARDS.map((c, i) => (
                <motion.div key={c.title} variants={fadeUp} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-udanix-blue/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-sm" style={{ background: c.color }}>
                    <c.icon className="w-7 h-7" style={{ color: c.iconColor }} />
                  </div>
                  <h3 className="font-black text-[#111827] text-xl mb-4 tracking-tight uppercase" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{c.title}</h3>
                  <p className="text-[#6B7280] text-base leading-relaxed font-medium">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STREAM EXPLORER ─── */}
      <div id="streams">
         <StreamExplorer />
      </div>

      {/* ─── CAREER PATHS ─── */}
      <div id="paths">
         <CareerPaths />
      </div>

      {/* ─── COUNSELORS ─── */}
      <div id="counselors">
         <CounselorSection />
      </div>

      {/* ─── CTA BAND ─── */}
      <section className="py-32" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 100%, #C7E2FF 0%, #E8F4FF 30%, #F0F9FF 55%, #ffffff 100%)' }}>
        <div className="max-w-[840px] mx-auto px-8 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.h2 variants={fadeUp} className="text-[52px] font-black text-[#111827] tracking-tighter uppercase leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Ready to design<br />your future?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4B5563] text-xl leading-relaxed font-medium">
              Join thousands of students already shaping their futures with Udanix.
              Start free, upgrade anytime.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/register">
                 <button className="bg-udanix-blue text-white text-sm font-black py-5 px-12 rounded-[2rem] shadow-2xl shadow-blue-900/40 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-widest">
                    Try for Free
                 </button>
              </Link>
              <StudentLoginModal />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row items-start justify-between gap-16">
            <div className="space-y-6 max-w-sm">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Udaanix" className="h-10 w-auto invert brightness-100" />
              </Link>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Empowering the next generation of thinkers and leaders through precision guidance.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              {[
                { title: 'Platform', links: ['Pathways', 'Counselors', 'Pricing', 'Labs'] },
                { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] },
              ].map(col => (
                <div key={col.title} className="space-y-6">
                  <p className="text-white font-black text-xs uppercase tracking-[0.2em]">{col.title}</p>
                  <ul className="space-y-4">
                    {col.links.map(l => (
                      <li key={l}><Link href="#" className="text-slate-500 hover:text-white text-base transition-colors font-semibold uppercase tracking-tight">{l}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">© 2026 Udanix Technologies. All rights reserved.</p>
            <p className="text-slate-600 text-sm font-black tracking-tighter uppercase italic opacity-40">Built for the infinite future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
