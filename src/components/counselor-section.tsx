'use client';

import { motion } from 'framer-motion';
import { Star, MessageSquare, Video, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
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
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
        online: true
    },
    {
        id: 2,
        name: 'Mr. Rajesh Kumar',
        role: 'M.Ed, Career Counselor',
        rating: 4.8,
        reviews: 1876,
        sessions: 4200,
        exp: 15,
        specialties: ['Engineering', 'Medical', 'Entrance Exams'],
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
        online: true
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
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
        online: true
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
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
        online: true
    }
];

export function CounselorSection() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-8 relative z-10">

                {/* Header Row */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
                    <div className="space-y-6 max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-white/60 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-sm"
                        >
                            <ShieldCheck className="w-3.5 h-3.5 text-udanix-orange" />
                            Verified Experts
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[48px] sm:text-[56px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.9]"
                        >
                            Connect with <span className="text-brand-gradient">Elite Counselors</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-slate-500 text-xl leading-relaxed font-semibold italic"
                        >
                            "Connect with certified professionals for personalized guidance on your academic and professional journey."
                        </motion.p>
                    </div>
                    <Link href="/student/directory">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-2xl glass-premium border border-white/60 text-udanix-navy text-[12px] font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-premium-xl transition-all flex items-center gap-3"
                        >
                            Directory
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {COUNSELORS.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-premium border border-white/50 rounded-[3rem] p-10 hover:shadow-premium-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex flex-col sm:flex-row items-start gap-10">
                                {/* Avatar + Status */}
                                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-premium group-hover:scale-105 transition-transform duration-500">
                                        <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                                    </div>
                                    {c.online && (
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full shadow-premium flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 w-full">
                                    <div className="flex flex-col gap-2 mb-6 text-center sm:text-left">
                                        <h3 className="text-2xl font-black text-udanix-navy group-hover:text-udanix-blue transition-colors uppercase tracking-tight">
                                            {c.name}
                                        </h3>
                                        <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest opacity-70 italic">{c.role}</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white/40 p-4 rounded-2xl border border-white/60 shadow-sm flex items-center justify-between group-hover:bg-white transition-colors">
                                            <div className="flex items-center gap-2 text-amber-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-[13px] font-black">{c.rating}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase">Rating</span>
                                        </div>
                                        <div className="bg-white/40 p-4 rounded-2xl border border-white/60 shadow-sm flex items-center justify-between group-hover:bg-white transition-colors">
                                            <span className="text-[13px] font-black text-udanix-navy">{c.sessions}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase">Sessions</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="h-px flex-1 bg-slate-100" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{c.exp} Years Expertise</span>
                                        <div className="h-px flex-1 bg-slate-100" />
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                                        {c.specialties.map(s => (
                                            <span key={s} className="px-4 py-2 rounded-xl glass-premium border border-white/60 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-5 mt-10">
                                <button className="group/btn flex items-center justify-center gap-3 py-4 rounded-2xl glass-premium border border-white/60 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-udanix-blue transition-all shadow-sm">
                                    <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    Chat
                                </button>
                                <button className="group/btn flex items-center justify-center gap-3 py-4 rounded-2xl bg-brand-gradient text-white text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-premium-xl hover:scale-105 active:scale-95 transition-all shadow-premium">
                                    <Video className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    Book Live
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
