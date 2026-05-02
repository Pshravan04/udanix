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
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e81b?q=80&w=1200&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop',
    }
];

export function StreamExplorer() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
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
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
                    >
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Academic Ecosystem</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter"
                    >
                        Find Your <span className="text-brand-gradient">Academic</span> Path
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-bold uppercase tracking-wide leading-relaxed"
                    >
                        Precision-engineered streams to align your passion with industry-leading careers.
                    </motion.p>
                </div>

                {/* Stream Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {STREAMS.map((stream, idx) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col h-full"
                        >
                            <div className="relative flex flex-col h-full bg-[#0a1120]/80 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-blue-500/10">
                                {/* Image Area */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image 
                                        src={stream.image}
                                        alt={stream.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/20 to-transparent" />
                                    
                                    {/* Icon Badge Overlay */}
                                    <div className="absolute bottom-6 left-8">
                                        <div className={`w-16 h-16 rounded-2xl ${stream.color} flex items-center justify-center shadow-2xl transform group-hover:-rotate-6 transition-transform duration-500 border border-white/20 backdrop-blur-md`}>
                                            <stream.icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 pt-6 flex flex-col flex-1">
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-udanix-blue transition-colors">
                                                {stream.title}
                                            </h3>
                                            <TrendingUp className="w-5 h-5 text-white/20" />
                                        </div>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                            {stream.desc}
                                        </p>
                                    </div>

                                    {/* Subjects List */}
                                    <div className="space-y-4 mb-8">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Target className="w-3 h-3 text-udanix-blue" />
                                            Core Intelligence
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {stream.subjects.map(subject => (
                                                <span 
                                                    key={subject}
                                                    className="px-4 py-2 rounded-xl bg-white/5 text-[11px] font-bold text-white/60 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.1em]">Exploration Scope</span>
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
