'use client';

import { motion } from 'framer-motion';
import { 
    Cpu, Beaker, Landmark, Palette, GraduationCap, 
    ArrowRight, Sparkles, TrendingUp, ChevronRight,
    Target, Activity, Globe
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const STREAMS = [
    {
        id: 'engineering',
        title: 'Engineering & Tech',
        desc: 'Pioneering the next era of AI, automation, and digital infrastructure.',
        icon: Cpu,
        color: 'from-blue-600 to-indigo-500',
        stats: '4.2M Roles',
        growth: '+18%',
        tags: ['AI/ML', 'Web3', 'Robotics'],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
        gridClass: 'lg:col-span-8 lg:row-span-1'
    },
    {
        id: 'medical',
        title: 'Medical Sciences',
        desc: 'Advancing human longevity through biotech and clinical excellence.',
        icon: Beaker,
        color: 'from-emerald-600 to-teal-500',
        stats: '1.8M Roles',
        growth: '+12%',
        tags: ['BioTech', 'Neuro'],
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop',
        gridClass: 'lg:col-span-4 lg:row-span-1'
    },
    {
        id: 'commerce',
        title: 'Fin & Commerce',
        desc: 'Architecting the global digital economy.',
        icon: Landmark,
        color: 'from-amber-600 to-orange-500',
        stats: '3.5M Roles',
        growth: '+15%',
        tags: ['FinTech', 'Analysis'],
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
        gridClass: 'lg:col-span-4 lg:row-span-1'
    },
    {
        id: 'design',
        title: 'Creative Arts',
        desc: 'Defining the aesthetics of human experience.',
        icon: Palette,
        color: 'from-purple-600 to-pink-500',
        stats: '800K Roles',
        growth: '+22%',
        tags: ['UI/UX', '3D Art'],
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
        gridClass: 'lg:col-span-4 lg:row-span-1'
    },
    {
        id: 'humanities',
        title: 'Humanities',
        desc: 'Decoding patterns of society and mind.',
        icon: GraduationCap,
        color: 'from-indigo-600 to-blue-500',
        stats: '1.2M Roles',
        growth: '+8%',
        tags: ['Psych', 'Media'],
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
        gridClass: 'lg:col-span-4 lg:row-span-1'
    }
];

export function StreamExplorer() {
    return (
        <section className="py-32 relative overflow-hidden bg-white selection:bg-udanix-blue/10">
            {/* Premium Background Architecture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 mesh-gradient-premium opacity-40" />
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                
                {/* Decorative Glows */}
                <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-udanix-blue/5 rounded-full blur-[140px] animate-mesh-blue" />
                <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-udanix-orange/5 rounded-full blur-[140px] animate-mesh-orange" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-left">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
                    <div className="lg:col-span-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl extreme-glass border border-white/60 text-udanix-blue text-[10px] font-black uppercase tracking-[0.3em] shadow-premium mb-8 w-fit"
                        >
                            <Sparkles className="w-4 h-4 text-udanix-orange animate-pulse" />
                            <span className="bg-gradient-to-r from-udanix-blue to-udanix-blue-mid bg-clip-text text-transparent">Vertical Analysis</span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[56px] sm:text-[84px] font-black text-udanix-navy tracking-[-0.05em] uppercase leading-[0.85] mb-8"
                        >
                            The Future of <br />
                            <span className="text-brand-gradient drop-shadow-sm">Global Careers</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-slate-500 font-bold max-w-2xl text-lg uppercase tracking-widest leading-relaxed opacity-70"
                        >
                            Strategic navigation through high-growth pathways designed for the next generation of global leaders.
                        </motion.p>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {STREAMS.map((stream, idx) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`${stream.gridClass} group relative rounded-[3rem] overflow-hidden border border-white/60 bg-white shadow-premium hover:shadow-premium-xl transition-all duration-700 hover:-translate-y-1`}
                        >
                            <Link href={`/streams/${stream.id}`} className="absolute inset-0 z-30" />
                            
                            {/* Visual Header / Image Area */}
                            <div className="relative h-48 lg:h-64 overflow-hidden">
                                <Image 
                                    src={stream.image}
                                    alt={stream.title}
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
                                
                                {/* Icon Overlay */}
                                <div className="absolute bottom-6 left-8 z-20">
                                    <div className="w-14 h-14 rounded-2xl extreme-glass border border-white/60 flex items-center justify-center text-udanix-blue shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                                        <stream.icon className="w-7 h-7 stroke-[2.5]" />
                                    </div>
                                </div>

                                {/* Floating Stat Badge */}
                                <div className="absolute top-6 right-8 z-20">
                                    <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-xl border border-white shadow-sm">
                                        <TrendingUp className="w-3.5 h-3.5 text-udanix-orange" />
                                        <span className="text-[10px] font-black text-udanix-navy uppercase tracking-[0.2em]">{stream.growth}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-udanix-navy uppercase tracking-tight group-hover:text-udanix-blue transition-colors">
                                        {stream.title}
                                    </h3>
                                    <p className="text-slate-500 font-bold text-[13px] uppercase tracking-widest leading-relaxed opacity-70 line-clamp-2">
                                        {stream.desc}
                                    </p>
                                </div>

                                {/* Dynamic Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-white transition-all">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Saturation</p>
                                        <p className="text-lg font-black text-udanix-navy tracking-tight">{stream.stats}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-white transition-all">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</p>
                                        <div className="flex items-center gap-1">
                                            <Activity className="w-3.5 h-3.5 text-emerald-500" />
                                            <p className="text-lg font-black text-udanix-navy tracking-tight">Tier 1</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags & Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex gap-2">
                                        {stream.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-udanix-blue/5 text-[9px] font-black text-udanix-blue uppercase tracking-widest border border-udanix-blue/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white group-hover:bg-brand-gradient transition-all group-hover:rotate-12">
                                        <ChevronRight className="w-5 h-5 stroke-[3]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Placeholder for "Explore All" card to complete bento grid if needed */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 group relative rounded-[3rem] overflow-hidden border border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center hover:border-udanix-blue/50 transition-all cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-udanix-blue/10 group-hover:text-udanix-blue transition-all mb-6">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-2">Explore 500+ Career Verticals</h4>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Unlock the full database of institutional knowledge</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
