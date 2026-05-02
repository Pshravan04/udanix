'use client';

import { motion } from 'framer-motion';
import { 
    Cpu, Beaker, Landmark, Palette, GraduationCap, 
    ArrowRight, Sparkles, TrendingUp, ChevronRight,
    Target, Activity, Globe, Calculator
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const STREAMS = [
    {
        id: 'science',
        title: 'Science Stream',
        desc: 'Explore careers in STEM fields with cutting-edge technology and research opportunities',
        icon: Beaker,
        color: 'text-blue-500 bg-white',
        btnColor: 'bg-[#00AEEF] hover:bg-blue-500',
        careerCount: '150+ Career Options',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', '+2 more'],
        image: '/images/science-stream.png',
    },
    {
        id: 'commerce',
        title: 'Commerce Stream',
        desc: 'Master business, finance, and economics to build a successful career in corporate world',
        icon: Calculator,
        color: 'text-green-500 bg-white',
        btnColor: 'bg-[#00C853] hover:bg-green-600',
        careerCount: '120+ Career Options',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Finance', '+2 more'],
        image: '/images/commerce-stream.png',
    },
    {
        id: 'arts',
        title: 'Arts & Humanities',
        desc: 'Pursue creative and analytical careers in media, design, law, and social sciences',
        icon: Palette,
        color: 'text-pink-500 bg-white',
        btnColor: 'bg-[#D81B60] hover:bg-pink-600',
        careerCount: '100+ Career Options',
        subjects: ['History', 'Political Science', 'Psychology', 'Literature', '+2 more'],
        image: '/images/arts-stream.png',
    }
];

export function StreamExplorer() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-udanix-blue/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-slate-200 backdrop-blur-md shadow-sm"
                    >
                        <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                        <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Academic Ecosystem</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter"
                    >
                        Explore Your <span className="text-brand-gradient">Stream</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-bold uppercase tracking-wide leading-relaxed px-4"
                    >
                        Choose your path based on your interests, skills, and career goals. Each stream opens doors to unique opportunities.
                    </motion.p>
                </div>

                {/* Stream Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {STREAMS.map((stream, idx) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -12 }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className="relative flex flex-col h-full bg-white rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-udanix-blue/30 hover:shadow-[0_40px_80px_-15px_rgba(14,57,154,0.12)]">
                                {/* Image Area */}
                                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                                    <Image 
                                        src={stream.image}
                                        alt={stream.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                                    
                                    {/* Icon Badge Overlay */}
                                    <div className="absolute bottom-6 left-8">
                                        <div className={`w-14 h-14 sm:w-16 h-16 rounded-2xl ${stream.color} flex items-center justify-center shadow-2xl transform group-hover:-rotate-6 transition-transform duration-500 border border-slate-100 backdrop-blur-md`}>
                                            <stream.icon className="w-6 h-6 sm:w-8 h-8" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 sm:p-8 pt-6 flex flex-col flex-1">
                                    <div className="space-y-4 mb-6 sm:mb-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight group-hover:text-udanix-blue transition-colors">
                                                {stream.title}
                                            </h3>
                                            <TrendingUp className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <p className="text-slate-600 text-[13px] sm:text-sm font-medium leading-relaxed">
                                            {stream.desc}
                                        </p>
                                    </div>

                                    {/* Subjects List */}
                                    <div className="space-y-4 mb-8">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Target className="w-3 h-3 text-udanix-blue" />
                                            Core Intelligence
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {stream.subjects.map(subject => (
                                                <span 
                                                    key={subject}
                                                    className="px-4 py-2 rounded-xl bg-slate-50 text-[11px] font-bold text-slate-600 border border-slate-100 transition-all hover:bg-white hover:text-udanix-blue hover:border-udanix-blue/30"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Exploration Scope</span>
                                            <span className="text-[12px] font-black text-udanix-blue uppercase tracking-widest">{stream.careerCount}</span>
                                        </div>
                                        <Link href={`/assessment`}>
                                            <button className={`p-4 rounded-2xl ${stream.btnColor} text-white shadow-xl shadow-blue-500/10 transition-all hover:scale-110 active:scale-95 group-hover:shadow-orange-glow`}>
                                                <ArrowRight className="w-6 h-6" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
