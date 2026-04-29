'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { 
    Rocket, 
    Target, 
    Zap, 
    ArrowRight, 
    Sparkles, 
    Play, 
    ShieldCheck, 
    Star, 
    Users, 
    CheckCircle2, 
    Trophy,
    GraduationCap,
    TrendingUp,
    MapPin,
    Twitter,
    Linkedin,
    Github,
    Instagram,
    Quote
} from 'lucide-react';
import { StreamExplorer } from '@/components/stream-explorer';
import { CareerPaths } from '@/components/career-paths';
import { CounselorSection } from '@/components/counselor-section';
import { StudentLoginModal } from '@/components/auth/student-login-modal';
import { CareerAssessment } from '@/components/career-assessment';
import { SuccessGallery } from '@/components/success-gallery';
import { ProcessJourney } from '@/components/process-journey';

import { fadeUp, staggerContainer as stagger } from '@/lib/animations';

const FEATURES = [
  { icon: Zap, title: 'HD Video Sessions', desc: 'Crystal-clear consultations with built-in recording and notes.' },
  { icon: ShieldCheck, title: 'Verified Experts', desc: 'Every counselor is credential-verified before joining.' },
  { icon: Target, title: 'Instant Booking', desc: 'Schedule sessions in under 60 seconds with live availability.' },
  { icon: GraduationCap, title: 'Progress Tracking', desc: 'Monitor growth with session summaries and goal tracking.' },
  { icon: Users, title: 'Async Chat', desc: 'Message your counselor between sessions, any time.' },
  { icon: TrendingUp, title: 'Smart Scheduling', desc: 'AI-powered schedule matching across time zones.' },
];

const STATS = [
  { value: '50,000+', label: 'Students Guided', icon: GraduationCap },
  { value: '200+', label: 'Expert Counselors', icon: Users },
  { value: '95%', label: 'Success Rate', icon: Star },
];

const WHY_CARDS = [
  { icon: TrendingUp, color: '#EFF6FF', iconColor: 'var(--udanix-blue)', title: 'Clarity on Career Paths', desc: 'Thousands of students lack proper guidance. Our platform simplifies your decision, enabling faster, smarter choices.' },
  { icon: MapPin, color: '#ECFDF5', iconColor: '#059669', title: 'Access Expert Network', desc: 'Finding a verified counselor is hard. Our system connects you to trusted experts instantly without the hassle.' },
  { icon: Trophy, color: '#F5F3FF', iconColor: '#7C3AED', title: 'Missed Growth Insights', desc: 'Without the right tools, your potential goes untapped. UDANIX surfaces growth data and opportunities you never saw.' },
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
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background Layer: Mesh & Noise */}
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh-blue opacity-40" />
          <div className="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-udanix-blue/10 rounded-full blur-[160px] animate-mesh-blue" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-udanix-orange/5 rounded-full blur-[140px] animate-mesh-orange" />
          
          {/* Parallax Background Text */}
          <motion.div 
            style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, 400]) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          >
            <h2 className="text-[25vw] font-black text-slate-50 uppercase tracking-tighter opacity-50 leading-none">
              Future
            </h2>
          </motion.div>
          
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content: The "Integrated" Focus */}
            <motion.div 
              variants={stagger} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              className="lg:col-span-7 space-y-12"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-premium border border-white/60 text-udanix-blue text-[12px] font-black uppercase tracking-[0.4em] shadow-premium mb-4 group cursor-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-udanix-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-udanix-orange shadow-[0_0_10px_rgba(223,89,14,0.5)]"></span>
                </span>
                Precision Career Engineering
                <div className="h-4 w-px bg-slate-200 mx-2" />
                <span className="text-slate-400 group-hover:text-udanix-blue transition-colors">V4.0</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-[90px] sm:text-[120px] lg:text-[140px] font-black text-udanix-navy leading-[0.75] tracking-[-0.06em] uppercase">
                Forge<br />
                <span className="text-brand-gradient text-glow-blue">The Path.</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-12 max-w-3xl">
                <div className="space-y-6 flex-1">
                  <p className="text-slate-500 text-2xl sm:text-3xl leading-[1.1] font-bold italic border-l-8 border-udanix-orange pl-8">
                    "Stop wandering. Start building a legacy that reflects your true potential."
                  </p>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                    We combine AI-driven insights with elite mentorship to bridge the gap between where you are and where you belong.
                  </p>
                </div>

                {/* Floating Metrics */}
                <div className="hidden sm:flex flex-col gap-8 pt-4">
                  <div className="glass-premium p-6 rounded-[2.5rem] border border-white/80 shadow-premium-xl -rotate-3 hover:rotate-0 transition-transform cursor-default">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Success</p>
                    <p className="text-3xl font-black text-udanix-navy">98.2%</p>
                  </div>
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-premium hover:-translate-y-2 transition-transform">
                        <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-8 pt-8">
                <Link href="/register">
                  <button className="bg-brand-gradient text-white text-[15px] font-black py-8 px-20 rounded-[3rem] shadow-premium-xl hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.35em] group relative overflow-hidden border-glow-blue">
                    <span className="relative z-10 flex items-center gap-4">
                      Initialize Path <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </Link>
                <button className="glass-premium text-udanix-navy text-[15px] font-black py-8 px-14 rounded-[3rem] border border-white/60 hover:bg-white hover:shadow-premium-xl transition-all uppercase tracking-[0.35em]">
                  The Science
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side: Interactive Visual Engine */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative group">
                {/* Main Visual Card */}
                <div className="relative z-10 glass-extreme rounded-[5rem] border border-white/40 p-2 overflow-hidden shadow-premium-xl aspect-[4/5] flex items-center justify-center">
                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-brand-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                   
                   {/* Centered Interactive Element */}
                   <div className="relative w-full h-full p-12 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="w-20 h-20 rounded-3xl bg-white shadow-premium flex items-center justify-center">
                          <Rocket className="w-10 h-10 text-udanix-blue" />
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
                          <p className="text-udanix-blue font-black text-lg">OPERATIONAL</p>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-2">
                           <div className="flex justify-between items-end">
                              <p className="text-4xl font-black text-udanix-navy">9.8</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precision Score</p>
                           </div>
                           <div className="h-3 bg-white/50 rounded-full overflow-hidden p-0.5">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "98%" }}
                                transition={{ duration: 2, delay: 0.5 }}
                                className="h-full bg-brand-gradient rounded-full shadow-[0_0_15px_rgba(0,62,138,0.5)]" 
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Latency', val: '12ms' },
                            { label: 'Uptime', val: '99.9%' }
                          ].map((m, idx) => (
                            <div key={idx} className="glass-premium p-6 rounded-[2rem] border border-white/60">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                              <p className="text-xl font-black text-udanix-navy">{m.val}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>
                </div>

                {/* Floating "Spells" */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-16 -right-16 z-20 glass-premium p-8 rounded-[3rem] border border-white/80 shadow-premium-xl backdrop-blur-3xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-udanix-orange flex items-center justify-center text-white shadow-orange-glow mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Peak Flow</p>
                  <p className="text-2xl font-black text-udanix-navy">Enabled</p>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-12 -left-12 z-20 glass-premium p-8 rounded-[3.5rem] border border-white/80 shadow-premium-xl backdrop-blur-3xl max-w-[240px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-udanix-blue/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-udanix-blue" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Industry Rating</p>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-udanix-orange fill-udanix-orange" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-500 font-bold italic leading-tight">
                    "The most precise guidance platform I've ever used."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── THE JOURNEY (Process) ─── */}
      <ProcessJourney />

      {/* ─── IMPACT SECTION (Dynamic Dashboard) ─── */}
      <section className="py-64 relative overflow-hidden bg-[#fafafa]">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-udanix-blue rounded-full blur-[160px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -45, 0],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-[1000px] h-[1000px] bg-udanix-orange rounded-full blur-[200px]" 
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Left Column: Narrative & Primary Metrics */}
            <div className="lg:col-span-5 space-y-16 lg:sticky lg:top-40">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-4 text-udanix-blue font-black uppercase tracking-[0.6em] text-[10px]"
                >
                  <div className="w-12 h-[2px] bg-udanix-blue/30" />
                  Impact Report 2024
                </motion.div>
                
                <h2 className="text-[70px] sm:text-[90px] font-black text-udanix-navy tracking-[-0.05em] uppercase leading-[0.8] mb-8">
                  Data-Driven <br />
                  <span className="text-brand-gradient text-glow-blue">Destiny.</span>
                </h2>
                
                <p className="text-slate-500 text-2xl font-bold italic leading-tight max-w-lg border-l-8 border-udanix-orange/20 pl-8">
                  "Traditional counseling is broken. We rebuilt it with precision, empathy, and absolute accountability."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {STATS.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-premium p-8 rounded-[3rem] border border-white shadow-premium hover:shadow-premium-xl transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-all">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <p className="text-4xl font-black text-udanix-navy mb-1">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: The "Project Board" Layout */}
            <div className="lg:col-span-7 relative">
              <div className="space-y-12">
                
                {/* Large Featured Card (The Dashboard) */}
                <motion.div 
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="glass-extreme rounded-[5rem] border border-white/60 p-12 shadow-premium-xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-full h-full bg-brand-gradient opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row gap-12 items-center">
                    <div className="w-full sm:w-1/2 aspect-square rounded-[3.5rem] overflow-hidden border-8 border-white shadow-premium relative">
                       <img 
                         src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                         alt="Success Story" 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-brand-gradient opacity-20" />
                       <div className="absolute bottom-8 left-8 right-8 glass-premium p-6 rounded-[2rem] border border-white shadow-xl">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Student Spotlight</p>
                          <p className="text-xl font-black text-udanix-navy">Sarah Jenkins</p>
                          <p className="text-[12px] text-udanix-blue font-bold">Ivy League Admit '24</p>
                       </div>
                    </div>

                    <div className="w-full sm:w-1/2 space-y-8 text-center sm:text-left">
                       <h3 className="text-4xl font-black text-udanix-navy uppercase leading-none tracking-tight">
                         From Uncertainty to <span className="text-udanix-orange">Excellence.</span>
                       </h3>
                       <p className="text-slate-500 text-lg font-medium leading-relaxed italic">
                         "Udanix didn't just give me advice; they gave me a roadmap. The precision of their data matching was uncanny."
                       </p>
                       <div className="flex justify-center sm:justify-start gap-4 pt-4">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-udanix-orange fill-udanix-orange" />)}
                       </div>
                       <button className="bg-udanix-navy text-white text-[11px] font-black py-4 px-10 rounded-2xl uppercase tracking-[0.25em] hover:bg-udanix-orange transition-colors shadow-lg">
                         Read Her Journey
                       </button>
                    </div>
                  </div>
                </motion.div>

                {/* Secondary Grid (Offset) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {WHY_CARDS.map((card, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className={`glass-premium p-10 rounded-[4rem] border border-white shadow-premium flex flex-col gap-8 group relative ${i === 1 ? 'sm:mt-12' : ''}`}
                    >
                      <div className="absolute top-8 right-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                        <card.icon className="w-24 h-24" />
                      </div>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/60 bg-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <card.icon className="w-8 h-8 text-udanix-blue" style={{ color: card.iconColor }} />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-2xl font-black text-udanix-navy uppercase tracking-tight">{card.title}</h4>
                        <p className="text-slate-500 font-bold text-[15px] leading-relaxed opacity-80 italic">"{card.desc}"</p>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-auto">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-brand-gradient" 
                        />
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Bonus Callout Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-brand-gradient p-10 rounded-[4rem] shadow-premium-xl flex flex-col justify-between items-start text-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
                    <Sparkles className="w-10 h-10 mb-8" />
                    <div className="space-y-6">
                      <h4 className="text-3xl font-black uppercase leading-[0.9]">Join the <br/>Top 1%.</h4>
                      <p className="text-white/80 font-bold text-sm leading-relaxed">
                        Access exclusive resources only available to our community.
                      </p>
                      <button className="bg-white text-udanix-blue text-[10px] font-black py-4 px-8 rounded-xl uppercase tracking-widest hover:bg-udanix-orange hover:text-white transition-all shadow-xl">
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─── CAREER ASSESSMENT ─── */}
      <div className="overflow-x-auto pb-12 hide-scrollbar lg:overflow-x-hidden">
        <CareerAssessment />
      </div>

      {/* ─── STREAM EXPLORER ─── */}
      <div id="streams" className="relative py-12 overflow-x-auto pb-20 hide-scrollbar lg:overflow-x-hidden">
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-udanix-blue/5 blur-[120px] rounded-full" />
         <StreamExplorer />
      </div>

      {/* ─── CAREER PATHS ─── */}
      <div id="paths" className="py-12">
         <CareerPaths />
      </div>

      {/* ─── COUNSELORS ─── */}
      <div id="counselors" className="relative py-12 overflow-x-auto pb-20 hide-scrollbar lg:overflow-x-hidden">
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-udanix-orange/5 blur-[150px] rounded-full" />
         <CounselorSection />
      </div>

      {/* ─── STUDENT COMMUNITY GALLERY ─── */}
      <SuccessGallery />

      {/* ─── CTA SECTION (Glass Command Center) ─── */}
      <section className="py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-udanix-navy -z-20" />
        
        {/* Decorative Grid & Glow */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-udanix-blue rounded-full blur-[200px] opacity-30 -z-10" />
        
        <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-extreme rounded-[6rem] border border-white/20 p-24 sm:p-32 relative overflow-hidden"
          >
            {/* Animated Border Beam */}
            <div className="absolute inset-0 border-beam opacity-40" />

            <div className="max-w-4xl mx-auto space-y-12 relative z-20">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 mx-auto rounded-full border border-white/20 flex items-center justify-center backdrop-blur-3xl mb-12"
              >
                <div className="w-24 h-24 rounded-full bg-brand-gradient flex items-center justify-center shadow-orange-glow">
                  <ArrowRight className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <h2 className="text-6xl sm:text-9xl font-black text-white uppercase tracking-[-0.04em] leading-[0.8]">
                Your Future, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-udanix-orange to-udanix-gold text-glow-orange">Reimagined.</span>
              </h2>

              <p className="text-white/60 text-xl sm:text-2xl font-bold italic leading-relaxed max-w-2xl mx-auto">
                "Stop guessing. Start growing. The world's most advanced career engineering platform is one click away."
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
                <Link href="/auth/register">
                  <button className="group relative bg-white text-udanix-navy text-[12px] font-black py-8 px-16 rounded-3xl uppercase tracking-[0.3em] hover:bg-udanix-orange hover:text-white transition-all duration-500 shadow-2xl overflow-hidden">
                    <span className="relative z-10">Initialize Career Path</span>
                    <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </Link>
                <div className="scale-125 origin-center sm:ml-4">
                  <StudentLoginModal />
                </div>
              </div>

              {/* Social Proof / Users Active */}
              <div className="pt-24 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-12">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-2xl border-4 border-udanix-navy overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-2xl border-4 border-udanix-navy bg-udanix-orange flex items-center justify-center text-white text-[10px] font-black">
                    +2k
                  </div>
                </div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  Join 12,000+ Students Already Pioneering Their Careers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SUCCESS STORIES MARQUEE ─── */}
      <section className="py-24 border-y border-slate-100 bg-slate-50/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,57,154,0.03)_0%,transparent_70%)]" />
        
        <div className="flex flex-col gap-12 relative z-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-4 text-udanix-blue font-black uppercase tracking-[0.4em] text-[10px]">
               <div className="w-8 h-px bg-udanix-blue/20" />
               Live Success Stream
               <div className="w-8 h-px bg-udanix-blue/20" />
            </div>
            <div className="flex items-center gap-2 glass-premium px-4 py-1.5 rounded-full border border-white shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black text-udanix-navy uppercase tracking-widest">Updating in real-time</span>
            </div>
          </div>
          
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-10 py-6">
              {[
                { name: "Aryan Singh", role: "SDE @ Google", desc: "Precision guidance found me the perfect role.", img: "https://i.pravatar.cc/150?img=11" },
                { name: "Meera Kapoor", role: "UX @ Microsoft", desc: "The mentors here are truly exceptional.", img: "https://i.pravatar.cc/150?img=22" },
                { name: "Rahul Verma", role: "DS @ Meta", desc: "Transformed my career trajectory completely.", img: "https://i.pravatar.cc/150?img=33" },
                { name: "Sneha Patel", role: "PM @ Amazon", desc: "Udanix is the gold standard for counseling.", img: "https://i.pravatar.cc/150?img=44" },
                { name: "Aman Jain", role: "Web3 @ Coinbase", desc: "Clarity is the greatest gift Udanix gave me.", img: "https://i.pravatar.cc/150?img=55" },
                { name: "Riya Mallik", role: "Architect @ Foster", desc: "Finally a platform that understands my goals.", img: "https://i.pravatar.cc/150?img=66" }
              ].map((story, i) => (
                <div 
                  key={i} 
                  className="glass-premium px-10 py-8 rounded-[2.5rem] border border-white shadow-premium flex flex-col gap-4 min-w-[380px] group hover:shadow-blue-glow transition-all hover:-rotate-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                        <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-udanix-navy uppercase tracking-tight">{story.name}</p>
                        <p className="text-[10px] text-udanix-blue font-black uppercase tracking-widest">{story.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-udanix-orange fill-udanix-orange" />)}
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-500 font-semibold italic leading-relaxed">
                    "{story.desc}"
                  </p>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: "Aryan Singh", role: "SDE @ Google", desc: "Precision guidance found me the perfect role.", img: "https://i.pravatar.cc/150?img=11" },
                { name: "Meera Kapoor", role: "UX @ Microsoft", desc: "The mentors here are truly exceptional.", img: "https://i.pravatar.cc/150?img=22" },
                { name: "Rahul Verma", role: "DS @ Meta", desc: "Transformed my career trajectory completely.", img: "https://i.pravatar.cc/150?img=33" },
                { name: "Sneha Patel", role: "PM @ Amazon", desc: "Udanix is the gold standard for counseling.", img: "https://i.pravatar.cc/150?img=44" },
                { name: "Aman Jain", role: "Web3 @ Coinbase", desc: "Clarity is the greatest gift Udanix gave me.", img: "https://i.pravatar.cc/150?img=55" },
                { name: "Riya Mallik", role: "Architect @ Foster", desc: "Finally a platform that understands my goals.", img: "https://i.pravatar.cc/150?img=66" }
              ].map((story, i) => (
                <div 
                  key={i} 
                  className="glass-premium px-10 py-8 rounded-[2.5rem] border border-white shadow-premium flex flex-col gap-4 min-w-[380px] group hover:shadow-blue-glow transition-all hover:-rotate-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                        <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-udanix-navy uppercase tracking-tight">{story.name}</p>
                        <p className="text-[10px] text-udanix-blue font-black uppercase tracking-widest">{story.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-udanix-orange fill-udanix-orange" />)}
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-500 font-semibold italic leading-relaxed">
                    "{story.desc}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
