'use client';

import { motion } from 'framer-motion';
import { 
    Beaker, Palette, Calculator, 
    ArrowRight, Sparkles, TrendingUp, Target
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const STREAMS = [
    {
        id: 'science',
        title: 'Science Stream',
        desc: 'Explore careers in STEM fields with cutting-edge technology and research opportunities.',
        icon: Beaker,
        color: 'text-[#007AFF] bg-white',
        btnColor: 'bg-[#007AFF] hover:bg-[#0066CC]',
        careerCount: '150+ Career Options',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', '+2 more'],
        image: '/images/science-stream.png',
    },
    {
        id: 'commerce',
        title: 'Commerce Stream',
        desc: 'Master business, finance, and economics to build a successful career in the corporate world.',
        icon: Calculator,
        color: 'text-[#34C759] bg-white',
        btnColor: 'bg-[#34C759] hover:bg-[#2EAF4E]',
        careerCount: '120+ Career Options',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Finance', '+2 more'],
        image: '/images/commerce-stream.png',
    },
    {
        id: 'arts',
        title: 'Arts & Humanities',
        desc: 'Pursue creative and analytical careers in media, design, law, and social sciences.',
        icon: Palette,
        color: 'text-[#FF2D55] bg-white',
        btnColor: 'bg-[#FF2D55] hover:bg-[#E0264A]',
        careerCount: '100+ Career Options',
        subjects: ['History', 'Political Science', 'Psychology', 'Literature', '+2 more'],
        image: '/images/arts-stream.png',
    }
];

export function StreamExplorer() {
    const { user, setLoginModalOpen } = useAuth();
    const router = useRouter();

    const handleCTA = (e: React.MouseEvent, target: string) => {
        e.preventDefault();
        if (!user) {
            setLoginModalOpen(true);
        } else {
            router.push(target);
        }
    };

    return (
        <section id="streams" className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-[#d2d2d7]">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 sm:mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-slate-200"
                    >
                        <Sparkles className="w-4 h-4 text-[#86868b]" />
                        <span className="text-[#515154] text-xs font-medium">Academic Ecosystem</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight"
                    >
                        Explore Your Stream
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#515154] max-w-2xl mx-auto text-lg font-medium px-4"
                    >
                        Choose your path based on your interests, skills, and career goals. Each stream opens doors to unique opportunities.
                    </motion.p>
                </div>

                {/* Stream Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {STREAMS.map((stream, idx) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative flex flex-col h-full bg-[#f5f5f7] rounded-[2rem] overflow-hidden border border-[#d2d2d7] shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Image Area */}
                            <div className="relative h-56 w-full overflow-hidden bg-white">
                                <Image 
                                    src={stream.image}
                                    alt={stream.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/5" />
                                
                                {/* Icon Badge */}
                                <div className="absolute bottom-4 left-6">
                                    <div className={`w-14 h-14 rounded-2xl ${stream.color} flex items-center justify-center border border-slate-200 shadow-sm`}>
                                        <stream.icon className="w-7 h-7" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 sm:p-8 pt-6 flex flex-col flex-1">
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                                            {stream.title}
                                        </h3>
                                        <TrendingUp className="w-5 h-5 text-[#86868b]" />
                                    </div>
                                    <p className="text-[#515154] text-sm leading-relaxed font-medium">
                                        {stream.desc}
                                    </p>
                                </div>

                                {/* Subjects List */}
                                <div className="space-y-3 mb-8">
                                    <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider flex items-center gap-2">
                                        <Target className="w-3 h-3" />
                                        Core Subjects
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {stream.subjects.map(subject => (
                                            <span 
                                                key={subject}
                                                className="px-3 py-1.5 rounded-lg bg-white text-xs font-medium text-[#1d1d1f] border border-[#d2d2d7]"
                                            >
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#d2d2d7]">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-[#86868b]">Exploration Scope</span>
                                        <span className="text-sm font-semibold text-[#1d1d1f]">{stream.careerCount}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => handleCTA(e, '/assessment')}
                                        className={`p-3 rounded-full ${stream.btnColor} text-white shadow-sm transition-transform hover:scale-105 active:scale-95`}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
