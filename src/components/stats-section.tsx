'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Star, TrendingUp, MapPin, Trophy } from 'lucide-react';

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

export function StatsSection() {
  return (
    <section className="py-64 relative overflow-hidden bg-[#fafafa]">
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 mesh-gradient-premium opacity-40" />
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
          
          {/* Decorative Glows */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-udanix-blue/10 rounded-full blur-[140px] animate-mesh-blue" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-udanix-orange/5 rounded-full blur-[160px] animate-mesh-orange" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Left Column: Narrative & Primary Metrics */}
          <div className="lg:col-span-5 space-y-16 lg:sticky lg:top-40">
            <div className="space-y-8">

              
              <h2 className="text-[64px] sm:text-[90px] font-black text-udanix-navy tracking-[-0.05em] uppercase leading-[0.8] mb-8">
                Data-Driven <br />
                <span className="text-brand-gradient drop-shadow-sm">Destiny.</span>
              </h2>
              
              <p className="text-slate-500 text-2xl font-bold italic leading-tight max-w-lg border-l-8 border-udanix-orange/20 pl-8">
                &quot;Traditional counseling is broken. We rebuilt it with precision, empathy, and absolute accountability.&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {STATS.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-premium p-8 rounded-[3rem] border border-white/60 shadow-premium hover:shadow-premium-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl glass-premium border border-white/60 flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-all">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-4xl font-black text-udanix-navy mb-1 tracking-tighter">{stat.value}</p>
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
                     <Image 
                       src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                       alt="Success Story" 
                       width={600}
                       height={600}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-brand-gradient opacity-20" />
                     <div className="absolute bottom-8 left-8 right-8 glass-premium p-6 rounded-[2rem] border border-white shadow-xl">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Student Spotlight</p>
                        <p className="text-xl font-black text-udanix-navy">Sarah Jenkins</p>
                        <p className="text-[12px] text-udanix-blue font-bold">Ivy League Admit &apos;24</p>
                     </div>
                  </div>

                  <div className="w-full sm:w-1/2 space-y-8 text-center sm:text-left">
                     <h3 className="text-4xl font-black text-udanix-navy uppercase leading-none tracking-tight">
                       From Uncertainty to <span className="text-udanix-orange">Excellence.</span>
                     </h3>
                     <p className="text-slate-500 text-lg font-medium leading-relaxed italic">
                       &quot;Udanix didn&apos;t just give me advice; they gave me a roadmap. The precision of their data matching was uncanny.&quot;
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
                      <p className="text-slate-500 font-bold text-[15px] leading-relaxed opacity-80 italic">&quot;{card.desc}&quot;</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
