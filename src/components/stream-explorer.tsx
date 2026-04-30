'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, Beaker, Landmark, Palette, GraduationCap, 
    ArrowRight, Sparkles, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const STREAMS = [
    {
        id: 'engineering',
        title: 'Engineering & Tech',
        desc: 'Pioneering the next era of AI and automation.',
        icon: Cpu,
        color: 'from-blue-600 to-indigo-500',
        stats: '4.2M Roles',
        growth: '+18%',
        tags: ['AI/ML', 'Web3'],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'medical',
        title: 'Medical Sciences',
        desc: 'Advancing human longevity through biotech.',
        icon: Beaker,
        color: 'from-emerald-600 to-teal-500',
        stats: '1.8M Roles',
        growth: '+12%',
        tags: ['BioTech', 'Neuro'],
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'humanities',
        title: 'Humanities',
        desc: 'Decoding the patterns of society and mind.',
        icon: GraduationCap,
        color: 'from-indigo-600 to-blue-500',
        stats: '1.2M Roles',
        growth: '+8%',
        tags: ['Psych', 'Media'],
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop'
    }
];

export function StreamExplorer() {
    const [hoveredId, setHoveredId] = useState<string | null>(STREAMS[0].id);

    return (
        <section className="py-40 relative overflow-hidden bg-white">
            {/* Premium Background Architecture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 mesh-gradient-premium opacity-60" />
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                
                {/* Decorative Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-udanix-blue/10 rounded-full blur-[120px] animate-mesh-blue" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-udanix-orange/5 rounded-full blur-[140px] animate-mesh-orange" />
            </div>

            <div className="max-w-[1440px] mx-auto px-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col mb-24 relative">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-white/60 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-premium mb-8 w-fit"
                    >
                        <Sparkles className="w-4 h-4 text-udanix-orange animate-pulse" />
                        <span className="bg-gradient-to-r from-udanix-blue to-udanix-blue-mid bg-clip-text text-transparent">Explore Frontiers</span>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[64px] sm:text-[90px] font-black text-udanix-navy tracking-[ -0.05em] uppercase leading-[0.8] mb-8"
                    >
                        Discover Your <br />
                        <span className="text-brand-gradient drop-shadow-sm">Academic Universe</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-slate-500 font-medium max-w-2xl text-xl leading-relaxed text-balance"
                    >
                        Navigate through high-growth career paths and emerging technologies designed to help you thrive in the future digital economy.
                    </motion.p>
                </div>

                {/* Fluid Accordion Container */}
                <div className="flex flex-col lg:flex-row gap-4 h-[650px] w-full">
                    {STREAMS.map((stream) => (
                        <motion.div
                            key={stream.id}
                            onMouseEnter={() => setHoveredId(stream.id)}
                            animate={{
                                flex: hoveredId === stream.id ? 3.2 : 1,
                                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                            }}
                            className="relative rounded-[3.5rem] overflow-hidden cursor-pointer group border border-white/20 hover:border-white/60 transition-colors duration-700 shadow-premium glass-premium"
                        >
                            <Link href={`/streams/${stream.id}`} className="absolute inset-0 z-20" />
                            
                            {/* Background Image */}
                            <Image 
                                src={stream.image}
                                alt={stream.title}
                                fill
                                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                            />

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-udanix-navy via-udanix-navy/40 to-transparent z-10" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${stream.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-10`} />

                            {/* Content */}
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-16 h-16 rounded-3xl glass-premium flex items-center justify-center text-udanix-navy shadow-premium group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border border-white/60`}>
                                        <stream.icon className="w-8 h-8 stroke-[2]" />
                                    </div>
                                    <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                                        <div className="flex items-center gap-2 extreme-glass px-4 py-2 rounded-full border border-white/40 shadow-premium-xl">
                                            <TrendingUp className="w-4 h-4 text-white" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{stream.growth}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                                        {stream.title}
                                    </h3>
                                    
                                    <AnimatePresence>
                                        {hoveredId === stream.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-6 pt-2"
                                            >
                                                <p className="text-white/80 font-medium text-lg leading-tight line-clamp-2">
                                                    {stream.desc}
                                                </p>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {stream.tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1.5 rounded-xl glass-premium border border-white/20 text-[10px] font-black text-white uppercase tracking-widest shadow-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                                    <div className="flex flex-col">
                                                        <span className="text-2xl font-black text-white leading-none mb-1 tracking-tight">{stream.stats}</span>
                                                        <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.25em]">Market Saturation</span>
                                                    </div>
                                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-udanix-navy shadow-premium group-hover:rotate-12 transition-transform duration-500">
                                                        <ArrowRight className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Vertical Title (when collapsed) */}
                            {hoveredId !== stream.id && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <span className="text-2xl font-black text-white/20 uppercase tracking-[0.4em] rotate-[-90deg] whitespace-nowrap drop-shadow-lg">
                                        {stream.title}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
