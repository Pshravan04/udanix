'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Calculator, Palette, ArrowRight } from 'lucide-react';

const STREAMS = [
    {
        title: 'Science Stream',
        desc: 'Explore careers in STEM fields with cutting-edge technology and research opportunities',
        icon: FlaskConical,
        accentBg: '#E0F2FE',
        accentIcon: '#0284C7',
        accentBtn: '#00B4D8',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
        stat: '150+ Career Options',
        tag: 'STEM',
    },
    {
        title: 'Commerce Stream',
        desc: 'Master business, finance, and economics to build a successful career in corporate world',
        icon: Calculator,
        accentBg: '#DCFCE7',
        accentIcon: '#059669',
        accentBtn: '#10B981',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Finance'],
        stat: '120+ Career Options',
        tag: 'Business',
    },
    {
        title: 'Arts & Humanities',
        desc: 'Pursue creative and analytical careers in media, design, law, and social sciences',
        icon: Palette,
        accentBg: '#F5F3FF',
        accentIcon: '#7C3AED',
        accentBtn: '#D946EF',
        subjects: ['History', 'Political Science', 'Psychology', 'Literature'],
        stat: '100+ Career Options',
        tag: 'Creative',
    }
];

export function StreamExplorer() {
    return (
        <section className="py-28 bg-white">
            <div className="max-w-[1280px] mx-auto px-8">

                {/* Header */}
                <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
                    <p className="text-[#0056D2] text-xs font-bold uppercase tracking-[0.2em] mb-1">Career Pathways</p>
                    <h2 className="text-4xl font-extrabold text-[#111827] tracking-tight">
                        Explore Your Stream
                    </h2>
                    <p className="text-[#4B5563] text-base leading-relaxed max-w-2xl mx-auto">
                        Choose your path based on your interests, skills, and career goals. Each stream opens doors to unique opportunities.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {STREAMS.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94], duration: 0.6 }}
                            className="bento-card p-8 flex flex-col justify-between group"
                        >
                            {/* Icon + Tag */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: s.accentBg }}>
                                    <s.icon className="w-5.5 h-5.5" style={{ color: s.accentIcon }} />
                                </div>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                    style={{ background: s.accentBg, color: s.accentIcon }}
                                >
                                    {s.tag}
                                </span>
                            </div>

                            {/* Title + Description */}
                            <div className="space-y-3 mb-6">
                                <h3 className="font-bold text-[#111827] text-xl tracking-tight">{s.title}</h3>
                                <p className="text-[#4B5563] text-sm leading-relaxed">{s.desc}</p>
                            </div>

                            {/* Key Subjects */}
                            <div className="mb-7">
                                <p className="text-[11px] text-[#9CA3AF] font-semibold uppercase tracking-wider mb-3">Key Subjects</p>
                                <div className="flex flex-wrap gap-2">
                                    {s.subjects.map(sub => (
                                        <span
                                            key={sub}
                                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563]"
                                        >
                                            {sub}
                                        </span>
                                    ))}
                                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#9CA3AF]">
                                        +2 more
                                    </span>
                                </div>
                            </div>

                            {/* Footer: Stat + CTA */}
                            <div className="border-t border-[#E5E7EB] pt-6 flex items-center justify-between">
                                <p className="text-xs text-[#9CA3AF] font-semibold">{s.stat}</p>
                                <button
                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-6 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90 shadow-lg shadow-black/5"
                                    style={{ background: s.accentBtn }}
                                >
                                    Explore Stream <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
