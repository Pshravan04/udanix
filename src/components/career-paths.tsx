'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Clock, IndianRupee, Users, ExternalLink,
    Code, Stethoscope, BarChart, HardHat, Calculator, Landmark, LineChart,
    Megaphone, PenTool, Pen, Scale, Brain
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['Science', 'Commerce', 'Arts'];

const CAREERS = {
    'Science': [
        {
            title: 'Software Engineer',
            demand: 'High Demand',
            stream: 'Science',
            desc: 'Design, develop, and maintain software applications and systems for various industries',
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
            desc: 'Diagnose and treat patients, perform surgeries, and provide healthcare services',
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
            desc: 'Analyze complex data to help organizations make better decisions using AI and ML',
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
            desc: 'Design and oversee construction of infrastructure projects like buildings and bridges',
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
            desc: 'Provide expert financial advice, auditing, and taxation services to businesses',
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
            desc: 'Help corporations raise capital and provide financial advisory services',
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
            desc: 'Analyze business processes and recommend improvements using data insights',
            growth: '19% annually',
            salary: '₹7-22 LPA',
            duration: '4 years',
            skills: 'Data Analysis, SQL',
            icon: LineChart
        },
        {
            title: 'Digital Marketing Manager',
            demand: 'High Demand',
            stream: 'Commerce',
            desc: 'Plan and execute online marketing campaigns to grow business presence',
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
            desc: 'Create user-friendly and visually appealing digital product designs',
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
            desc: 'Create engaging written content for websites, blogs, and marketing materials',
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
            desc: 'Represent clients in legal matters and provide legal counsel and advice',
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
            desc: 'Study human behavior and mental processes to help improve mental health',
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

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-udanix-blue/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-udanix-orange/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                
                {/* ─── HEADER ─── */}
                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-udanix-orange text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm"
                    >
                        <TrendingUp className="w-3.5 h-3.5" />
                        Trending Careers
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight uppercase"
                    >
                        Popular <span className="text-brand-gradient">Career</span> Paths
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-bold uppercase tracking-wide"
                    >
                        Explore trending careers across different streams with detailed insights on growth, salary, and skills required.
                    </motion.p>
                </div>

                {/* ─── TABS ─── */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex p-2 bg-slate-200/50 backdrop-blur-xl rounded-[2rem] border border-white shadow-inner">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as Category)}
                                className={`relative px-12 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-500 ${
                                    activeTab === tab 
                                    ? 'text-white' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabCareer"
                                        className="absolute inset-0 bg-brand-gradient rounded-[1.5rem] shadow-lg shadow-udanix-blue/20"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── CAREER GRID ─── */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {CAREERS[activeTab].map((career, idx) => (
                                <motion.div
                                    key={`${activeTab}-${career.title}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="group relative h-full"
                                >
                                    <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200 hover:border-udanix-blue/30 shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-2 overflow-hidden">
                                        {/* Hover Glow Effect */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        {/* Header: Icon & Demand */}
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-udanix-blue group-hover:bg-brand-gradient group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-inner">
                                                <career.icon className="w-7 h-7" />
                                            </div>
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                                                career.demand.includes('High') 
                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                                            }`}>
                                                {career.demand}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-950 leading-tight mb-4 group-hover:text-udanix-blue transition-all duration-300 uppercase">
                                            {career.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                            {career.desc}
                                        </p>

                                        {/* Stats Grid */}
                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 backdrop-blur-sm">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Salary Range</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <IndianRupee className="w-3.5 h-3.5 text-udanix-blue" />
                                                        <span className="text-xs font-bold text-slate-950">{career.salary}</span>
                                                    </div>
                                                </div>
                                                <div className="w-[1px] h-8 bg-slate-200" />
                                                <div className="flex flex-col gap-1 text-right">
                                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Growth</span>
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span className="text-xs font-bold text-emerald-600">{career.growth.split(' ')[0]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between px-2">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{career.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-slate-400" />
                                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">In-Demand</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="mt-auto w-full py-4 px-6 bg-slate-100 hover:bg-slate-950 text-slate-950 hover:text-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                            View Details
                                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ─── BOTTOM CTA ─── */}
                <div className="mt-24 text-center">
                    <Link href="/careers">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-14 py-6 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 shadow-xl"
                        >
                            <span className="relative z-10">Explore All Careers (500+)</span>
                            <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-gradient" />
                            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                Explore All Careers (500+)
                            </span>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
