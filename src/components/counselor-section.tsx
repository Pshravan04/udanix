'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
    Star, MessageSquare, ArrowRight, Sparkles, 
    ShieldCheck, Globe, Award, Zap,
    TrendingUp, Users, CheckCircle2, Clock,
    Search, UserCheck, CalendarDays
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const COUNSELORS = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        role: 'PhD in Career Counseling',
        rating: 4.9,
        reviews: 2345,
        sessions: 5000,
        exp: 12,
        specialties: ['Career Planning', 'Stream Selection', 'Abroad Education'],
        avatar: '/images/counselor-1.png',
        online: true,
        badge: 'Top 1% Mentor',
        status: 'Available Today'
    },
    {
        id: 2,
        name: 'Mr. Rajesh Kumar',
        role: 'M.Ed. Career Counselor',
        rating: 4.8,
        reviews: 1876,
        sessions: 4200,
        exp: 15,
        specialties: ['Engineering', 'Medical', 'Entrance Exams'],
        avatar: '/images/counselor-2.png',
        online: true,
        badge: 'Ex-Board Member',
        status: '3 Slots Left'
    },
    {
        id: 3,
        name: 'Ms. Anjali Verma',
        role: 'MA Psychology, Certified Counselor',
        rating: 4.9,
        reviews: 2567,
        sessions: 3800,
        exp: 10,
        specialties: ['Arts & Design', 'Creative Fields', 'Media'],
        avatar: '/images/counselor-3.png',
        online: false,
        badge: 'Creative Lead',
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
        specialties: ['Business', 'MBA', 'Finance Careers'],
        avatar: '/images/counselor-4.png',
        online: true,
        badge: 'Business Strategist',
        status: 'Online Now'
    }
];

export function CounselorSection() {
    const containerRef = useRef(null);

    return (
        <section id="counselors" ref={containerRef} className="py-32 relative overflow-hidden bg-[#df590e]">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 blur-[140px] rounded-full -mr-96 -mt-96 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -ml-64 -mb-64 animate-float" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                    <div className="max-w-2xl text-left">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm backdrop-blur-md"
                        >
                            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                            Elite Career Mentorship
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9] text-white px-1"
                            style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                        >
                            Expert Career <br />
                            <span className="text-white opacity-80 drop-shadow-sm">Counselors.</span>
                        </motion.h2>
                        
                        <p className="text-sm md:text-lg text-white/90 font-medium font-nunito max-w-xl leading-relaxed px-1">
                            Direct access to <span className="text-white font-bold">Certified Professionals</span>. Bypass the guesswork with mentors who have shaped thousands of successful careers worldwide.
                        </p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <button className="group relative bg-white text-[#df590e] px-10 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden">
                            Explore All Experts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* Counselor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {COUNSELORS.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
                            className="group"
                        >
                            <div className="relative flex flex-col h-full bg-white rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(14,57,154,0.1)] transition-all duration-700 group-hover:-translate-y-2">
                                {/* Visual Image Container */}
                                <div className="relative mb-6 sm:mb-8 rounded-[1.8rem] sm:rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg">
                                    <Image 
                                        src={c.avatar} 
                                        alt={c.name} 
                                        width={400}
                                        height={500}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out brightness-100 group-hover:contrast-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    
                                    {/* Badges */}
                                    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/80 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-2 border border-white">
                                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                                        <span className="text-[8px] sm:text-[9px] font-black text-slate-950 uppercase tracking-widest">{c.badge}</span>
                                    </div>

                                    <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex items-center gap-2 sm:gap-3">
                                        <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${c.online ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                                        <span className="text-[8px] sm:text-[9px] font-black text-white drop-shadow-md uppercase tracking-widest">{c.status}</span>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="px-4 pb-4 space-y-6 flex-grow flex flex-col text-left">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-950 group-hover:text-udanix-blue transition-colors uppercase tracking-tight leading-none">
                                                {c.name}
                                            </h3>
                                            <p className="text-[10px] font-black text-brand-gradient uppercase tracking-[0.1em] mt-2">
                                                {c.role}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-black text-slate-950 leading-none">{c.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {c.specialties.map(s => (
                                            <span key={s} className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-wider border border-slate-100 group-hover:border-slate-200 group-hover:text-slate-700 transition-colors">
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-6 mt-auto">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Sessions</p>
                                            <p className="text-sm font-black text-slate-950">{c.sessions}+</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Industry Exp</p>
                                            <p className="text-sm font-black text-slate-950">{c.exp} Years</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-950 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest py-5 transition-all active:scale-95">
                                            Message
                                        </button>
                                        <button className="flex-[2] bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest py-5 transition-all shadow-lg shadow-slate-200 active:scale-95">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Summary Bento Row */}
                <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Verified Mentors', value: '500+', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                        { label: 'Success Velocity', value: '99.4%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                        { label: 'Available Paths', value: '1,200+', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                        { label: 'Student Network', value: '1M+', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 group transition-all text-left"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <p className="text-4xl font-black text-slate-950 tracking-tighter leading-none mb-3">{stat.value}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

