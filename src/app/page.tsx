'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  GraduationCap, ArrowRight, Star, MessageSquare, Calendar, Sparkles,
  Users, Clock, Video, Zap, Shield, BookOpen, ChevronDown,
  TrendingUp, Award, Globe, Layers, Search, User
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
  { icon: TrendingUp, color: '#EFF6FF', iconColor: '#0056D2', title: 'Clarity on Career Paths', desc: 'Thousands of students lack proper guidance. Our platform simplifies your decision, enabling faster, smarter choices.' },
  { icon: Globe, color: '#ECFDF5', iconColor: '#059669', title: 'Access Expert Network', desc: 'Finding a verified counselor is hard. Our system connects you to trusted experts instantly without the hassle.' },
  { icon: Layers, color: '#F5F3FF', iconColor: '#7C3AED', title: 'Missed Growth Insights', desc: 'Without the right tools, your potential goes untapped. UDANIX surfaces growth data and opportunities you never saw.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111827] overflow-x-hidden">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]/70">
        <div className="max-w-[1440px] mx-auto h-[72px] px-8 flex items-center justify-between gap-8">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img src="/logo.png" alt="Udaanix" className="h-10 w-auto" />
            </Link>

            <nav className="hidden xl:flex items-center gap-2">
              {[
                'Explore Streams',
                'Counselors',
                'Resources',
                'Career Paths',
                'Assessment'
              ].map((label) => (
                <button key={label} className="text-[14px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors px-3 py-2 rounded-lg whitespace-nowrap">
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Search + Profile + CTA */}
          <div className="flex items-center gap-5 flex-1 justify-end max-w-2xl">
            <div className="relative group flex-1 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#9CA3AF] group-focus-within:text-[#0056D2] transition-colors" />
              <input
                type="text"
                placeholder="Search careers, courses..."
                className="w-full bg-[#F3F4F6] border-none rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#0056D2]/10 transition-all placeholder:text-[#9CA3AF]"
              />
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <StudentLoginModal />

              <Link href="/register">
                <button className="bg-gradient-to-r from-[#0052FF] to-[#6E00FF] text-white text-sm font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                  Book Counseling
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        {/* Dreamy background — sky radial gradient */}
        <div className="absolute inset-0 -z-10" style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% -10%, #C7E2FF 0%, #E8F4FF 30%, #F0F9FF 55%, #ffffff 80%)'
        }} />

        {/* Floating light orbs */}
        <div className="absolute top-24 left-[10%] w-72 h-72 rounded-full bg-blue-200/30 blur-[80px] -z-10" />
        <div className="absolute top-32 right-[8%] w-56 h-56 rounded-full bg-sky-200/30 blur-[60px] -z-10" />
        <div className="absolute top-16 left-[40%] w-40 h-40 rounded-full bg-blue-100/40 blur-[50px] -z-10" />

        <div className="max-w-[1280px] mx-auto px-8 text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#BFDBFE] text-[#0056D2] text-[11px] font-bold uppercase tracking-[0.15em] shadow-float">
              <Sparkles className="w-3 h-3" />
              Next-Gen Student Counselling
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[56px] sm:text-[68px] lg:text-[80px] font-extrabold text-[#111827] leading-[1.05] tracking-[-0.03em] max-w-4xl mx-auto"
          >
            Your Career Journey
            <br /> <span className="gradient-text-blue">Starts Here</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed"
          >
            Get expert guidance on stream selection, career paths, entrance exams, and future opportunities.
            Make informed decisions with personalized counseling.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/register">
              <button className="bg-white text-[#0056D2] text-sm font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest border-b-4 border-slate-100">
                Take Free Assessment
              </button>
            </Link>
            <Link href="/student/directory">
              <button className="inline-flex items-center gap-2 text-sm font-bold text-[#111827] bg-white/40 backdrop-blur-md border border-white/40 px-8 py-4 rounded-2xl shadow-float hover:shadow-float-lg hover:-translate-y-0.5 transition-all uppercase tracking-widest">
                Talk to Counselor
              </button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-[#9CA3AF] font-medium"
          >
            No credit card required · Free to explore · 200+ verified experts
          </motion.p>

          {/* ── Floating App Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            {/* Browser frame */}
            <div className="bg-white rounded-[20px] shadow-float-xl border border-[#E5E7EB] overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] px-5 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-white border border-[#E5E7EB] rounded-lg px-4 py-1.5 mx-4 text-xs text-[#9CA3AF] font-medium text-left">
                  app.udanix.com/dashboard
                </div>
              </div>

              {/* Dashboard content simulation */}
              <div className="bg-[#F8FAFC] p-6 min-h-[340px]">
                <div className="flex gap-4 h-full">
                  {/* Sidebar */}
                  <div className="w-52 bg-white rounded-xl border border-[#E5E7EB] p-4 flex flex-col gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                       <img src="/logo.png" alt="Udaanix" className="h-6 w-auto" />
                    </div>
                    {['Dashboard', 'Counselors', 'Sessions', 'Progress', 'Settings'].map((item, i) => (
                      <div key={item} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-[#EFF6FF] text-[#0056D2]' : 'text-[#9CA3AF] hover:text-[#4B5563]'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#0056D2]' : 'bg-[#E5E7EB]'}`} />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Main dashboard */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-[#111827]">Good morning, Aryan! 👋</p>
                        <p className="text-xs text-[#9CA3AF]">Your next session is Tomorrow, 4:00 PM</p>
                      </div>
                      <button className="btn-primary text-xs py-2 px-4">Book Session</button>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Sessions Done', value: '12', delta: '+3 this month', color: '#EFF6FF', icon: '🎯' },
                        { label: 'Avg. Rating', value: '4.9', delta: 'Excellent', color: '#ECFDF5', icon: '⭐' },
                        { label: 'Goals Met', value: '68%', delta: 'On track', color: '#F5F3FF', icon: '📈' },
                      ].map(card => (
                        <div key={card.label} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#9CA3AF] font-medium">{card.label}</span>
                            <span className="text-base">{card.icon}</span>
                          </div>
                          <p className="text-2xl font-extrabold text-[#111827]">{card.value}</p>
                          <p className="text-xs text-emerald-600 font-semibold mt-0.5">{card.delta}</p>
                        </div>
                      ))}
                    </div>

                    {/* Upcoming sessions */}
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                      <p className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3">Upcoming Sessions</p>
                      <div className="space-y-2">
                        {[
                          { name: 'Dr. Sarah Jenkins', topic: 'Career Roadmap', time: 'Tomorrow 4:00 PM', online: true },
                          { name: 'Michael Chen', topic: 'Resume Review', time: 'Friday 11:00 AM', online: false },
                        ].map(session => (
                          <div key={session.name} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#0056D2] text-xs font-bold">
                                {session.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#111827]">{session.name}</p>
                                <p className="text-[10px] text-[#9CA3AF]">{session.topic}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-semibold text-[#4B5563]">{session.time}</p>
                              <span className={`text-[9px] font-bold ${session.online ? 'text-emerald-500' : 'text-[#9CA3AF]'}`}>
                                {session.online ? '● Video' : '○ Pending'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ─── WHY UDANIX ─── */}
      <section className="py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-14">
              <div className="space-y-2">
                <motion.p variants={fadeUp} className="text-[#0056D2] text-xs font-bold uppercase tracking-[0.2em]">Why Udanix</motion.p>
                <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-[#111827] tracking-tight max-w-sm leading-tight">
                  The Challenge Every Student Faces
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="flex flex-col gap-1 md:text-right max-w-xs">
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Turning confusion into clarity is a challenge for every student. Our platform simplifies your journey, enabling faster, smarter decisions.
                </p>
                <button className="text-[#0056D2] text-xs font-bold mt-2 self-start md:self-end hover:underline">
                  How It Works →
                </button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {WHY_CARDS.map((c, i) => (
                <motion.div key={c.title} variants={fadeUp} className="bento-card p-8 group">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6" style={{ background: c.color }}>
                    <c.icon className="w-5 h-5" style={{ color: c.iconColor }} />
                  </div>
                  <h3 className="font-bold text-[#111827] text-base mb-3 tracking-tight">{c.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STREAM EXPLORER ─── */}
      <StreamExplorer />

      {/* ─── CAREER PATHS ─── */}
      <CareerPaths />

      {/* ─── COUNSELORS ─── */}
      <CounselorSection />

      {/* ─── STATS ─── */}
      <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((s) => (
              <motion.div variants={fadeUp} key={s.label} className="text-center">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#EFF6FF] mb-4">
                  <s.icon className="w-5 h-5 text-[#0056D2]" />
                </div>
                <p className="text-4xl font-extrabold text-[#111827] tracking-tight">{s.value}</p>
                <p className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider mt-2">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ALL THE TOOLS ─── */}
      <section className="py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14 space-y-3">
            <motion.p variants={fadeUp} className="text-[#0056D2] text-xs font-bold uppercase tracking-[0.2em]">Platform Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-[#111827] tracking-tight">
              All the Tools You Need for<br />Powerful Guidance.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4B5563] text-base max-w-lg mx-auto leading-relaxed">
              Everything in one place — from expert matching to progress tracking and seamless communication.
            </motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="bento-card p-7 group">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-5 group-hover:bg-[#0056D2] transition-colors duration-200">
                  <f.icon className="w-5 h-5 text-[#0056D2] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-bold text-[#111827] text-base mb-2 tracking-tight">{f.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-28" style={{ background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-[#0056D2] text-xs font-bold uppercase tracking-[0.2em] mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-[#111827] tracking-tight">
              Up and running in minutes.
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <motion.div key={s.step} variants={fadeUp}>
                <span className="text-6xl font-extrabold text-[#F3F4F6] tracking-tighter block mb-3">{s.step}</span>
                <h3 className="font-bold text-[#111827] text-base mb-2">{s.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="py-24" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #C7E2FF 0%, #E8F4FF 30%, #F0F9FF 55%, #ffffff 100%)' }}>
        <div className="max-w-[720px] mx-auto px-8 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.h2 variants={fadeUp} className="text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
              Ready to design<br />your future?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4B5563] text-lg leading-relaxed">
              Join thousands of students already shaping their futures with Udanix.
              Start free, upgrade anytime.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
              <Link href="/register"><button className="btn-primary">Try for Free</button></Link>
              <StudentLoginModal />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111827] text-white">
        <div className="max-w-[1280px] mx-auto px-8 py-14">
          <div className="flex flex-col md:flex-row items-start justify-between gap-14">
            <div className="space-y-4 max-w-xs">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Udaanix" className="h-8 w-auto invert brightness-0" />
              </Link>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                Empowering the next generation of thinkers and leaders through precision guidance.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-10">
              {[
                { title: 'Platform', links: ['Pathways', 'Counselors', 'Pricing', 'Labs'] },
                { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] },
              ].map(col => (
                <div key={col.title}>
                  <p className="text-white font-semibold text-xs uppercase tracking-widest mb-4">{col.title}</p>
                  <ul className="space-y-2.5">
                    {col.links.map(l => (
                      <li key={l}><Link href="#" className="text-[#6B7280] hover:text-white text-sm transition-colors">{l}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#6B7280] text-xs">© 2026 Udanix Technologies. All rights reserved.</p>
            <p className="text-[#6B7280] text-xs">Built for the infinite future.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
