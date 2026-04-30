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
        <section className="py-32 relative overflow-hidden bg-[#fafafa]">
            {/* Mesh Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-udanix-blue/5 blur-[140px] rounded-full -mr-64 -mt-64 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-udanix-orange/5 blur-[120px] rounded-full -ml-32 -mb-32" />
            </div>

            <div className="max-w-[1440px] mx-auto px-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-sm mb-6 w-fit"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-udanix-orange" />
                        Explore Frontiers
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[56px] sm:text-[80px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.85] mb-4"
                    >
                        Discover Your <br />
                        <span className="text-brand-gradient">Academic Universe</span>
                    </motion.h2>
                    <p className="text-slate-500 font-medium max-w-xl text-lg leading-relaxed">
                        Navigate through high-growth career paths and emerging technologies designed to help you thrive in the future.
                    </p>
                </div>

                {/* Fluid Accordion Container */}
                <div className="flex flex-col lg:flex-row gap-4 h-[650px] w-full">
                    {STREAMS.map((stream) => (
                        <motion.div
                            key={stream.id}
                            onMouseEnter={() => setHoveredId(stream.id)}
                            animate={{
                                flex: hoveredId === stream.id ? 2.5 : 1,
                                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                            }}
                            className="relative rounded-[2.5rem] overflow-hidden cursor-pointer group"
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
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-udanix-navy shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                        <stream.icon className="w-7 h-7 stroke-[2.5]" />
                                    </div>
                                    <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                            <TrendingUp className="w-3.5 h-3.5 text-white" />
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">{stream.growth}</span>
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
                                                        <span key={tag} className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                                    <div className="flex flex-col">
                                                        <span className="text-xl font-black text-white">{stream.stats}</span>
                                                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Active Roles</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-udanix-navy">
                                                        <ArrowRight className="w-5 h-5" />
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
                                    <span className="text-2xl font-black text-white/30 uppercase tracking-[0.3em] rotate-[-90deg] whitespace-nowrap">
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
