'use client';

import { useMemo, useId, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
    Star, MessageSquare, ArrowRight, Sparkles, 
    ShieldCheck, Globe, Award, Zap,
    TrendingUp, Users, CheckCircle2, Clock
} from 'lucide-react';
import Image from 'next/image';


const COUNSELORS = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        role: 'PhD in Career Counseling',
        rating: 4.9,
        reviews: 2345,
        sessions: 5000,
        exp: 12,
        specialties: ['Abroad Education', 'Psychology'],
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
        online: true,
        size: 'large',
        badge: 'Top 1% Mentor',
        status: 'Available Today'
    },
    {
        id: 2,
        name: 'Dr. Marcus Sterling',
        role: 'Ivy League Specialist',
        rating: 5.0,
        reviews: 1876,
        sessions: 4200,
        exp: 15,
        specialties: ['Stanford Admissions', 'Leadership'],
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&h=400&auto=format&fit=crop',
        online: true,
        size: 'medium',
        badge: 'Ex-Admissions Dean',
        status: '3 Slots Left'
    },
    {
        id: 3,
        name: 'Anjali Verma',
        role: 'MA Psychology',
        rating: 4.9,
        reviews: 2567,
        sessions: 3800,
        exp: 10,
        specialties: ['Creative Arts', 'UI/UX'],
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop',
        online: false,
        size: 'medium',
        badge: 'Design Expert',
        status: 'Next: Monday'
    },
    {
        id: 4,
        name: 'Prof. Vikram Singh',
        role: 'MBA, Career Coach',
        rating: 4.7,
        reviews: 1654,
        sessions: 6100,
        exp: 18,
        specialties: ['Finance', 'Business'],
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop',
        online: true,
        size: 'large',
        badge: 'Global Strategist',
        status: 'Online Now'
    },
    {
        id: 5,
        name: 'Sarah Jenkins',
        role: 'Global Education Consultant',
        rating: 5.0,
        reviews: 1200,
        sessions: 2500,
        exp: 8,
        specialties: ['Ivy League', 'Scholarships'],
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f01?q=80&w=400&h=400&auto=format&fit=crop',
        online: true,
        size: 'small',
        badge: 'UK/EU Expert',
        status: 'Live Session'
    },
    {
        id: 6,
        name: 'David Miller',
        role: 'Tech Career Strategist',
        rating: 4.9,
        reviews: 980,
        sessions: 3100,
        exp: 14,
        specialties: ['Silicon Valley', 'FAANG'],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
        online: true,
        size: 'medium',
        badge: 'Tech Insider',
        status: 'Available'
    }
];


function FloatingBadge({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
    const id = useId();
    const randomDuration = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = (hash << 5) - hash + id.charCodeAt(i);
            hash |= 0;
        }
        return 3 + (Math.abs(hash) % 2000 / 1000);
    }, [id]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0],
            }}
            transition={{ 
                delay,
                y: {
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            className={`absolute z-20 pointer-events-none px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-udanix-navy ${className}`}
        >
            {children}
        </motion.div>
    );
}

export function CounselorSection() {
    const containerRef = useRef(null);
    useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [activeTab, setActiveTab] = useState('All');
    const categories = ['All', 'Ivy League', 'Tech', 'Business', 'Abroad'];

    return (
        <section id="counselors" ref={containerRef} className="py-40 relative overflow-hidden bg-white">
            {/* High-End Background architecture */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-udanix-blue/5 blur-[180px] rounded-full -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-udanix-orange/5 blur-[160px] rounded-full -ml-64 -mb-64" />
                
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.02]" 
                     style={{ backgroundImage: 'radial-gradient(circle, #003E8A 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="max-w-[1440px] mx-auto px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-udanix-navy/5 border border-udanix-navy/10 text-udanix-blue text-[11px] font-black uppercase tracking-[0.3em] shadow-sm mb-10"
                    >
                        <Sparkles className="w-4 h-4 text-udanix-orange" />
                        Elite Expert Network
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[64px] sm:text-[100px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.8] mb-10"
                    >
                        Learn from <br />
                        <span className="text-brand-gradient">The Masters</span>
                    </motion.h2>
                    
                    <p className="text-slate-500 font-medium max-w-2xl text-xl leading-relaxed mb-16">
                        Bypass the trial and error. Get direct access to the consultants who have placed students in the world&apos;s top 0.1% institutions and tech firms.
                    </p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                                    activeTab === cat 
                                    ? 'bg-udanix-navy text-white shadow-xl scale-105' 
                                    : 'bg-white border border-slate-100 text-slate-400 hover:border-udanix-blue/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Wall Grid with Bento-feel */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                    {COUNSELORS.map((c, i) => (
                        <motion.div
                            key={c.id}
                            layout
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="break-inside-avoid relative group"
                        >
                            <div className="glass-premium rounded-[4rem] p-10 border border-white/80 hover:shadow-[0_40px_100px_-20px_rgba(0,62,138,0.15)] hover:-translate-y-4 transition-all duration-700 bg-white/60 backdrop-blur-3xl overflow-hidden">
                                {/* Visual Section */}
                                <div className="relative mb-10 group/img">
                                    <div className="relative w-full aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                        <Image 
                                            src={c.avatar} 
                                            alt={c.name} 
                                            width={400}
                                            height={500}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-udanix-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>

                                    {/* Floating Badges */}
                                    <FloatingBadge className="-top-4 -right-4 bg-udanix-orange text-white border-udanix-orange/20 shadow-orange-glow" delay={0.2}>
                                        <Award className="w-3.5 h-3.5" />
                                        {c.badge}
                                    </FloatingBadge>

                                    <FloatingBadge className="bottom-8 -left-6" delay={0.5}>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        Verified
                                    </FloatingBadge>

                                    <FloatingBadge className="top-1/2 -right-8" delay={0.8}>
                                        <Users className="w-3.5 h-3.5 text-udanix-blue" />
                                        {c.sessions}+ Sessions
                                    </FloatingBadge>

                                    {/* Status Pulse */}
                                    <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white shadow-lg flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${c.online ? 'bg-emerald-500 pulse-orange' : 'bg-slate-300'}`} />
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-udanix-navy">{c.status}</span>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black text-udanix-navy tracking-tighter leading-none group-hover:text-udanix-blue transition-colors duration-500">
                                                {c.name}
                                            </h3>
                                            <p className="text-[11px] font-black text-udanix-orange uppercase tracking-[0.2em] mt-2 italic flex items-center gap-2">
                                                <TrendingUp className="w-3 h-3" />
                                                {c.role}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                                            <Star className="w-4 h-4 fill-udanix-gold text-udanix-gold" />
                                            <span className="text-sm font-black text-udanix-navy">{c.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {c.specialties.map(s => (
                                            <span key={s} className="px-5 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest group-hover:bg-udanix-blue/5 group-hover:text-udanix-blue transition-all duration-500">
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats Row */}
                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-udanix-navy/5 flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-udanix-blue" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                                                <p className="text-sm font-black text-udanix-navy uppercase">{c.exp} Years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-udanix-orange/5 flex items-center justify-center">
                                                <MessageSquare className="w-5 h-5 text-udanix-orange" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reviews</p>
                                                <p className="text-sm font-black text-udanix-navy uppercase">{c.reviews}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="w-full group/btn relative overflow-hidden py-6 rounded-[2rem] bg-udanix-navy text-white text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl hover:shadow-udanix-blue/20 transition-all duration-500 active:scale-[0.98]">
                                        <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            Secure Session
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-500" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}


                </div>

                {/* Performance Stats */}
                <div className="mt-40 pt-20 border-t border-slate-100">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: 'Global Experts', value: '500+', icon: Globe, sub: 'Vetted & Verified' },
                            { label: 'Network Power', value: '25+', icon: Zap, sub: 'Countries Represented' },
                            { label: 'Outcome Rate', value: '99.4%', icon: ShieldCheck, sub: 'Proven Success' },
                            { label: 'Community', value: '1M+', icon: Users, sub: 'Active Aspirants' }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center lg:items-start text-center lg:text-left"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-udanix-blue/5 transition-colors">
                                    <stat.icon className="w-6 h-6 text-udanix-blue" />
                                </div>
                                <p className="text-5xl font-black text-udanix-navy mb-2 tracking-tighter uppercase">{stat.value}</p>
                                <p className="text-[11px] font-black text-udanix-navy uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

