'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
    Star, ArrowRight, Sparkles, 
    Award, TrendingUp, Users, UserCheck
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const COUNSELORS = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        role: 'PhD in Career Counseling',
        rating: 4.9,
        reviews: 2345,
        sessions: 5000,
        exp: 12,
        specialties: ['Career Planning', 'Stream Selection', 'Abroad'],
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
        role: 'MA Psychology',
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
    const { user, setLoginModalOpen } = useAuth();
    const router = useRouter();

    const handleAuthClick = (e: React.MouseEvent, target: string) => {
        e.preventDefault();
        if (!user) {
            setLoginModalOpen(true);
        } else {
            router.push(target);
        }
    };

    return (
        <section id="counselors" ref={containerRef} className="py-24 sm:py-32 relative overflow-hidden bg-white border-t border-[#d2d2d7]">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-slate-200 mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
                            <span className="text-[#515154] text-xs font-medium">Elite Mentorship</span>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-[#1d1d1f]"
                        >
                            Expert Career Counselors
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#515154] text-lg font-medium max-w-xl leading-relaxed"
                        >
                            Get direct access to certified professionals. Bypass the guesswork with mentors who have shaped thousands of successful careers.
                        </motion.p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <button 
                            onClick={(e) => handleAuthClick(e, '/student/mentors')}
                            className="bg-[#007AFF] hover:bg-[#0066CC] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors flex items-center gap-2"
                        >
                            Explore All Experts <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>

                {/* Counselor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {COUNSELORS.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-[#f5f5f7] rounded-3xl p-4 border border-[#d2d2d7] shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
                        >
                            {/* Visual Image Container */}
                            <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/5] bg-white border border-slate-200">
                                <Image 
                                    src={c.avatar} 
                                    alt={c.name} 
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover" 
                                />
                                
                                {/* Badges */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-slate-200">
                                    <Award className="w-3 h-3 text-[#007AFF]" />
                                    <span className="text-[10px] font-semibold text-[#1d1d1f]">{c.badge}</span>
                                </div>

                                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-slate-200">
                                    <div className={`w-2 h-2 rounded-full ${c.online ? 'bg-[#34C759]' : 'bg-[#86868b]'}`} />
                                    <span className="text-[10px] font-semibold text-[#1d1d1f]">{c.status}</span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="px-2 pb-2 space-y-4 flex-grow flex flex-col">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                                            {c.name}
                                        </h3>
                                        <p className="text-xs font-medium text-[#86868b] mt-1">
                                            {c.role}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200">
                                        <Star className="w-3.5 h-3.5 fill-[#FF9500] text-[#FF9500]" />
                                        <span className="text-xs font-semibold text-[#1d1d1f]">{c.rating}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {c.specialties.map(s => (
                                        <span key={s} className="px-2 py-1 rounded-md bg-white text-[#515154] text-[10px] font-medium border border-slate-200">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 mt-auto">
                                    <div>
                                        <p className="text-[10px] font-medium text-[#86868b] mb-1">Sessions</p>
                                        <p className="text-sm font-semibold text-[#1d1d1f]">{c.sessions}+</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium text-[#86868b] mb-1">Experience</p>
                                        <p className="text-sm font-semibold text-[#1d1d1f]">{c.exp} Years</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button 
                                        onClick={(e) => handleAuthClick(e, `/student/mentors?chat=${c.id}`)}
                                        className="flex-1 bg-white hover:bg-[#e5e5ea] text-[#1d1d1f] border border-slate-200 rounded-full font-medium text-xs py-2.5 transition-colors"
                                    >
                                        Message
                                    </button>
                                    <button 
                                        onClick={(e) => handleAuthClick(e, `/student/mentors?book=${c.id}`)}
                                        className="flex-[2] bg-[#1d1d1f] hover:bg-[#333336] text-white rounded-full font-medium text-xs py-2.5 transition-colors shadow-sm"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Summary Bento Row */}
                <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Verified Mentors', value: '500+', icon: UserCheck, color: 'text-[#007AFF]' },
                        { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'text-[#34C759]' },
                        { label: 'Available Paths', value: '1,200+', icon: Sparkles, color: 'text-[#FF9500]' },
                        { label: 'Student Network', value: '1M+', icon: Users, color: 'text-[#5856D6]' }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#f5f5f7] p-8 rounded-3xl border border-[#d2d2d7] shadow-sm flex flex-col items-center text-center sm:items-start sm:text-left"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <p className="text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">{stat.value}</p>
                            <p className="text-sm font-medium text-[#515154]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
