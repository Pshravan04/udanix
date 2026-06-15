'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Clock, IndianRupee, Users, ExternalLink,
    Code, Stethoscope, BarChart, HardHat, Calculator, Landmark, LineChart,
    Megaphone, PenTool, Pen, Scale, Brain
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Science', 'Commerce', 'Arts'];

const CAREERS = {
    'Science': [
        {
            title: 'Software Engineer',
            demand: 'High Demand',
            stream: 'Science',
            desc: 'Design, develop, and maintain software applications and systems for various industries.',
            growth: '22% annually',
            salary: '₹8-25 LPA',
            duration: '4 years',
            skills: 'Programming, Problem Solving',
            icon: Code
        },
        {
            title: 'Medical Doctor',
            demand: 'High Demand',
            stream: 'Science',
            desc: 'Diagnose and treat patients, perform surgeries, and provide healthcare services.',
            growth: '15% annually',
            salary: '₹10-50 LPA',
            duration: '5.5 years',
            skills: 'Medical Knowledge, Patient Care',
            icon: Stethoscope
        },
        {
            title: 'Data Scientist',
            demand: 'High Demand',
            stream: 'Science',
            desc: 'Analyze complex data to help organizations make better decisions using AI and ML.',
            growth: '28% annually',
            salary: '₹12-30 LPA',
            duration: '4 years',
            skills: 'Statistics, Python',
            icon: BarChart
        },
        {
            title: 'Civil Engineer',
            demand: 'Medium Demand',
            stream: 'Science',
            desc: 'Design and oversee construction of infrastructure projects like buildings and bridges.',
            growth: '12% annually',
            salary: '₹6-20 LPA',
            duration: '4 years',
            skills: 'AutoCAD, Structural Design',
            icon: HardHat
        }
    ],
    'Commerce': [
        {
            title: 'Chartered Accountant',
            demand: 'High Demand',
            stream: 'Commerce',
            desc: 'Provide expert financial advice, auditing, and taxation services to businesses.',
            growth: '18% annually',
            salary: '₹8-40 LPA',
            duration: '5 years',
            skills: 'Accounting, Taxation',
            icon: Calculator
        },
        {
            title: 'Investment Banker',
            demand: 'High Demand',
            stream: 'Commerce',
            desc: 'Help corporations raise capital and provide financial advisory services.',
            growth: '20% annually',
            salary: '₹15-60 LPA',
            duration: '4 years + MBA',
            skills: 'Financial Modeling, Valuation',
            icon: Landmark
        },
        {
            title: 'Business Analyst',
            demand: 'High Demand',
            stream: 'Commerce',
            desc: 'Analyze business processes and recommend improvements using data insights.',
            growth: '19% annually',
            salary: '₹7-22 LPA',
            duration: '4 years',
            skills: 'Data Analysis, SQL',
            icon: LineChart
        },
        {
            title: 'Digital Marketing',
            demand: 'High Demand',
            stream: 'Commerce',
            desc: 'Plan and execute online marketing campaigns to grow business presence.',
            growth: '25% annually',
            salary: '₹6-18 LPA',
            duration: '3 years',
            skills: 'SEO, Social Media',
            icon: Megaphone
        }
    ],
    'Arts': [
        {
            title: 'UX/UI Designer',
            demand: 'High Demand',
            stream: 'Arts',
            desc: 'Create user-friendly and visually appealing digital product designs.',
            growth: '24% annually',
            salary: '₹5-20 LPA',
            duration: '3-4 years',
            skills: 'Figma, User Research',
            icon: PenTool
        },
        {
            title: 'Content Writer',
            demand: 'High Demand',
            stream: 'Arts',
            desc: 'Create engaging written content for websites, blogs, and marketing materials.',
            growth: '16% annually',
            salary: '₹3-12 LPA',
            duration: '3 years',
            skills: 'Writing, SEO',
            icon: Pen
        },
        {
            title: 'Lawyer',
            demand: 'Medium Demand',
            stream: 'Arts',
            desc: 'Represent clients in legal matters and provide legal counsel and advice.',
            growth: '14% annually',
            salary: '₹8-50 LPA',
            duration: '5 years',
            skills: 'Legal Research, Argumentation',
            icon: Scale
        },
        {
            title: 'Psychologist',
            demand: 'High Demand',
            stream: 'Arts',
            desc: 'Study human behavior and mental processes to help improve mental health.',
            growth: '17% annually',
            salary: '₹5-18 LPA',
            duration: '5 years',
            skills: 'Counseling, Research',
            icon: Brain
        }
    ]
};

export function CareerPaths() {
    type Category = keyof typeof CAREERS;
    const [activeTab, setActiveTab] = useState<Category>('Science');
    const { user, setLoginModalOpen } = useAuth();
    const router = useRouter();

    const handleCTA = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        if (!user) {
            setLoginModalOpen(true);
        } else {
            router.push(href);
        }
    };

    return (
        <section id="paths" className="py-24 sm:py-32 relative overflow-hidden bg-[#f5f5f7] border-t border-[#d2d2d7]">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                
                {/* ─── HEADER ─── */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
                    >
                        <TrendingUp className="w-3.5 h-3.5 text-[#007AFF]" />
                        <span className="text-[#515154] text-xs font-medium">Trending Careers</span>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight"
                    >
                        Popular Career Paths
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#515154] max-w-2xl mx-auto text-lg font-medium px-4"
                    >
                        Explore trending careers across different streams with detailed insights on growth, salary, and skills required.
                    </motion.p>
                </div>

                {/* ─── TABS ─── */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 bg-[#e5e5ea] rounded-full">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as Category)}
                                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                                    activeTab === tab 
                                    ? 'text-[#1d1d1f]' 
                                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabCareer"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── CAREER GRID ─── */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {CAREERS[activeTab].map((career, idx) => (
                                <motion.div
                                    key={`${activeTab}-${career.title}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#007AFF]">
                                            <career.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                            career.demand.includes('High') 
                                            ? 'bg-[#E3F8E9] text-[#34C759]' 
                                            : 'bg-[#FFF0E6] text-[#FF9500]'
                                        }`}>
                                            {career.demand}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                                        {career.title}
                                    </h3>

                                    <p className="text-[#515154] text-sm leading-relaxed mb-6 flex-1">
                                        {career.desc}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between p-3 bg-[#f5f5f7] rounded-xl">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-[#86868b] font-medium">Salary</span>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <IndianRupee className="w-3 h-3 text-[#007AFF]" />
                                                    <span className="text-sm font-semibold text-[#1d1d1f]">{career.salary}</span>
                                                </div>
                                            </div>
                                            <div className="w-[1px] h-6 bg-slate-200" />
                                            <div className="flex flex-col text-right">
                                                <span className="text-xs text-[#86868b] font-medium">Growth</span>
                                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                                    <TrendingUp className="w-3 h-3 text-[#34C759]" />
                                                    <span className="text-sm font-semibold text-[#34C759]">{career.growth.split(' ')[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between px-1">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-[#86868b]" />
                                                <span className="text-xs text-[#515154] font-medium">{career.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-[#86868b]" />
                                                <span className="text-xs text-[#515154] font-medium">In-Demand</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={(e) => handleCTA(e, `/careers/${career.title.toLowerCase().replace(/ /g, '-')}`)}
                                        className="w-full py-3 bg-[#f5f5f7] hover:bg-[#e5e5ea] text-[#007AFF] rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        View Details
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ─── BOTTOM CTA ─── */}
                <div className="mt-16 text-center">
                    <button 
                        onClick={(e) => handleCTA(e, '/careers')}
                        className="px-8 py-3.5 bg-[#1d1d1f] text-white rounded-full text-sm font-medium shadow-sm hover:bg-[#333336] transition-colors"
                    >
                        Explore All Careers (500+)
                    </button>
                </div>
            </div>
        </section>
    );
}
