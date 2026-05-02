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
        <section className="py-24 relative overflow-hidden bg-white">
            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-slate-800"
                    >
                        Explore Your Stream
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 max-w-3xl mx-auto text-sm leading-relaxed"
                    >
                        Choose your path based on your interests, skills, and career goals. Each stream opens doors to unique opportunities.
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
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl transition-all duration-500"
                        >
                            {/* Image Area */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image 
                                    src={stream.image}
                                    alt={stream.title}
                                    fill
                                    className="object-cover transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-blue-500/0 transition-all duration-500" />
                                
                                {/* Icon Badge */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`w-16 h-16 rounded-full ${stream.color} flex items-center justify-center shadow-lg`}>
                                        <stream.icon className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex flex-col flex-1 space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-slate-800">
                                        {stream.title}
                                    </h3>
                                    <p className="text-slate-500 text-[13px] leading-relaxed">
                                        {stream.desc}
                                    </p>
                                </div>

                                {/* Subjects List */}
                                <div className="space-y-3">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Key Subjects:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {stream.subjects.map(subject => (
                                            <span 
                                                key={subject}
                                                className="px-3 py-1 rounded-full bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-100"
                                            >
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <span className="text-xs font-bold text-slate-400">{stream.careerCount}</span>
                                </div>

                                {/* Footer Button - Full Width */}
                                <Link href={`/assessment`} className="mt-auto">
                                    <button className={`w-full ${stream.btnColor} text-white text-[13px] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2`}>
                                        Explore Stream
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
