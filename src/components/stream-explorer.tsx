'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Calculator, Palette, ArrowRight, Sparkles } from 'lucide-react';

const STREAMS = [
    {
        title: 'Science Stream',
        desc: 'Explore careers in STEM fields with cutting-edge technology and research opportunities',
        icon: FlaskConical,
        accentBg: 'rgba(0, 62, 138, 0.05)',
        accentIcon: 'var(--udanix-blue)',
        accentBtn: 'bg-brand-gradient',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
        stat: '150+ Career Options',
        tag: 'STEM',
    },
    {
        title: 'Commerce Stream',
        desc: 'Master business, finance, and economics to build a successful career in corporate world',
        icon: Calculator,
        accentBg: 'rgba(223, 89, 14, 0.05)',
        accentIcon: 'var(--udanix-orange)',
        accentBtn: 'bg-udanix-orange',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Finance'],
        stat: '120+ Career Options',
        tag: 'Business',
    },
    {
        title: 'Arts & Humanities',
        desc: 'Pursue creative and analytical careers in media, design, law, and social sciences',
        icon: Palette,
        accentBg: 'rgba(124, 58, 237, 0.05)',
        accentIcon: '#7C3AED',
        accentBtn: 'bg-purple-600',
        subjects: ['History', 'Political Science', 'Psychology', 'Literature'],
        stat: '100+ Career Options',
        tag: 'Creative',
    }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export function StreamExplorer() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20 space-y-6 max-w-3xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-white/60 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-udanix-orange" />
                        Academic Pathways
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[48px] sm:text-[56px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.9]"
                    >
                        Explore Your <span className="text-brand-gradient">Stream</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-xl leading-relaxed font-semibold italic"
                    >
                        "Choose your path based on your interests, skills, and career goals. Each stream opens doors to unique opportunities."
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {STREAMS.map((s, i) => (
                        <motion.div
                            key={s.title}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="glass-premium p-10 rounded-[3rem] flex flex-col border border-white/50 shadow-premium hover:shadow-premium-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Icon + Tag */}
                            <div className="flex items-start justify-between mb-10">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" style={{ background: s.accentBg }}>
                                    <s.icon className="w-8 h-8" style={{ color: s.accentIcon }} />
                                </div>
                                <span
                                    className="text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm border border-white/40"
                                    style={{ background: s.accentBg, color: s.accentIcon }}
                                >
                                    {s.tag}
                                </span>
                            </div>

                            {/* Title + Description */}
                            <div className="space-y-4 mb-10">
                                <h3 className="font-black text-udanix-navy text-2xl tracking-tight uppercase">{s.title}</h3>
                                <p className="text-slate-500 text-base leading-relaxed font-semibold">{s.desc}</p>
                            </div>

                            {/* Key Subjects */}
                            <div className="mb-10 flex-1">
                                <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-4 opacity-70">Key Subjects</p>
                                <div className="flex flex-wrap gap-2.5">
                                    {s.subjects.map(sub => (
                                        <span
                                            key={sub}
                                            className="text-[11px] font-bold px-4 py-2 rounded-xl glass-premium border border-white/60 text-slate-600 shadow-sm hover:bg-white transition-colors"
                                        >
                                            {sub}
                                        </span>
                                    ))}
                                    <span className="text-[11px] font-bold px-4 py-2 rounded-xl bg-slate-50/50 text-slate-400 border border-slate-100">
                                        +2 more
                                    </span>
                                </div>
                            </div>

                            {/* Footer: Stat + CTA */}
                            <div className="pt-8 border-t border-slate-100/50 flex items-center justify-between">
                                <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{s.stat}</p>
                                <button
                                    className={`inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3.5 rounded-2xl text-white transition-all hover:scale-105 active:scale-95 shadow-premium ${s.accentBtn}`}
                                >
                                    Explore <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
