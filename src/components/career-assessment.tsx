'use client';

import { motion } from 'framer-motion';
import { 
  ClipboardCheck, Clock, BookOpen, UserCircle, 
  ArrowRight, Sparkles, TrendingUp, Layers, Zap
} from 'lucide-react';

const ASSESSMENTS = [
  {
    id: 'interest',
    icon: ClipboardCheck,
    title: 'Interest Discovery',
    desc: 'Uncover your hidden passions and map them to high-growth career paths.',
    duration: '15 min',
    questions: '50 Qs',
    completed: '45K+ Students',
    difficulty: 'Foundational',
    accent: 'var(--udanix-blue)',
    bg: 'bg-blue-50/50'
  },
  {
    id: 'stream',
    icon: Layers,
    title: 'Stream Precision',
    desc: 'Scientific matching for Science, Commerce, or Arts based on skill-aptitude.',
    duration: '20 min',
    questions: '40 Qs',
    completed: '38K+ Students',
    difficulty: 'Core',
    accent: '#059669',
    bg: 'bg-emerald-50/50'
  },
  {
    id: 'aptitude',
    icon: TrendingUp,
    title: 'Elite Aptitude',
    desc: 'Measure analytical horsepower and cognitive strengths for top-tier roles.',
    duration: '30 min',
    questions: '60 Qs',
    completed: '28K+ Students',
    difficulty: 'Advanced',
    accent: 'var(--udanix-orange)',
    bg: 'bg-orange-50/50'
  },
  {
    id: 'personality',
    icon: UserCircle,
    title: 'Persona Mapping',
    desc: 'Understand your behavioral DNA and how it fits into professional cultures.',
    duration: '25 min',
    questions: '45 Qs',
    completed: '32K+ Students',
    difficulty: 'Insight',
    accent: '#7C3AED',
    bg: 'bg-purple-50/50'
  }
];

export function CareerAssessment() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-udanix-blue/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-udanix-orange/5 blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-white/60 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-sm mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-udanix-orange fill-udanix-orange" />
            AI-Powered Analysis
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[48px] sm:text-[64px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.9] mb-8"
          >
            Elite Career <span className="text-brand-gradient">Assessments</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-xl leading-relaxed font-semibold italic"
          >
            "Take precision-engineered tests to unlock your professional potential and find your perfect fit."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ASSESSMENTS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-premium border border-white/50 rounded-[3rem] p-10 hover:shadow-premium-xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${test.bg} flex items-center justify-center mb-10 border border-white/60 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <test.icon className="w-8 h-8" style={{ color: test.accent }} />
              </div>

              {/* Header */}
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block italic">
                  {test.difficulty}
                </span>
                <h3 className="text-2xl font-black text-udanix-navy group-hover:text-udanix-blue transition-colors uppercase tracking-tight leading-none">
                  {test.title}
                </h3>
              </div>

              <p className="text-sm text-slate-500 font-semibold leading-relaxed mb-10 h-12 line-clamp-2">
                {test.desc}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10 pt-8 border-t border-slate-100/50">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      Duration
                   </div>
                   <p className="text-[13px] font-black text-udanix-navy uppercase">{test.duration}</p>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                      <BookOpen className="w-3 h-3" />
                      Content
                   </div>
                   <p className="text-[13px] font-black text-udanix-navy uppercase">{test.questions}</p>
                </div>
              </div>

              <div className="mt-auto">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-udanix-blue uppercase tracking-widest italic">{test.completed}</span>
                 </div>

                <button className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-brand-gradient text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-premium-xl active:scale-95 transition-all group/btn">
                  Start Test
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
