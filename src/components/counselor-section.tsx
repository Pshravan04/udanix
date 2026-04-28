'use client';

import { motion } from 'framer-motion';
import { Star, MessageSquare, Video, ArrowRight } from 'lucide-react';
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
        <section className="py-28 bg-white">
            <div className="max-w-[1280px] mx-auto px-8">

                {/* Header Row */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                            Expert Career Counselors
                        </h2>
                        <p className="text-[#4B5563] text-base">
                            Connect with certified professionals for personalized guidance
                        </p>
                    </div>
                    <Link href="/student/directory">
                        <button className="px-6 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] text-sm font-bold hover:bg-[#F9FAFB] transition-all flex items-center gap-2">
                            View All Counselors
                        </button>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {COUNSELORS.map((c) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                        >
                            <div className="flex items-start gap-6">
                                {/* Avatar + Status */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F3F4F6] group-hover:border-udanix-blue/10 transition-colors">
                                        <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                                    </div>
                                    {c.online && (
                                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col gap-1 mb-3">
                                        <h3 className="text-xl font-bold text-[#111827] group-hover:text-udanix-blue transition-colors truncate">
                                            {c.name}
                                        </h3>
                                        <p className="text-sm font-medium text-[#6B7280]">{c.role}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs font-semibold mb-4">
                                        <div className="flex items-center gap-1.5 text-amber-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>{c.rating} <span className="text-[#9CA3AF] font-medium">({c.reviews})</span></span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-[#E5E7EB]" />
                                        <div className="text-[#4B5563]">
                                            <span className="text-[#111827]">{c.sessions}</span> sessions
                                        </div>
                                    </div>

                                    <p className="text-sm font-bold text-[#111827] mb-4">
                                        {c.exp} years experience
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {c.specialties.map(s => (
                                            <span key={s} className="px-3 py-1 rounded-lg bg-[#F3F4F6] text-[#4B5563] text-[11px] font-bold">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E5E7EB] text-[#4B5563] text-sm font-bold hover:bg-[#F9FAFB] transition-all">
                                    <MessageSquare className="w-4 h-4" />
                                    Chat
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-udanix-blue text-white text-sm font-bold hover:shadow-lg hover:shadow-udanix-blue/20 transition-all">
                                    <Video className="w-4 h-4" />
                                    Book Session
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
