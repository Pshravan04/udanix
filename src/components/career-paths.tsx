'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, DollarSign, Clock, BookOpen,
    ExternalLink, Code, Stethoscope, BarChart,
    HardHat, Calculator, Landmark, LineChart,
    Megaphone, PenTool, Pen, Scale, Brain, Sparkles
} from 'lucide-react';

const CATEGORIES = ['Science', 'Commerce', 'Arts'];

const CAREERS = {
    'Science': [
        {
            title: 'Software Engineer',
            demand: 'High Demand',
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-amber-50 text-amber-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
            demandColor: 'bg-amber-50 text-amber-600',
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
            demandColor: 'bg-emerald-50 text-emerald-600',
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
    const [activeTab, setActiveTab] = useState('Science');

    return (
        <section className="py-32 relative overflow-hidden bg-slate-50/30">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="max-w-[1280px] mx-auto px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-white/60 text-udanix-blue text-[11px] font-black uppercase tracking-[0.2em] shadow-sm"
                    >
                        <TrendingUp className="w-3.5 h-3.5 text-udanix-orange" />
                        Market Insights
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[48px] sm:text-[56px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.9]"
                    >
                        Popular <span className="text-brand-gradient">Career Paths</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-xl leading-relaxed font-semibold italic max-w-2xl mx-auto"
                    >
                        "Explore trending careers across different streams with detailed insights on growth, salary, and skills required."
                    </motion.p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex items-center glass-premium p-2 rounded-[2rem] border border-white/60 shadow-premium">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-12 py-3.5 rounded-[1.5rem] text-[12px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab
                                        ? 'bg-brand-gradient text-white shadow-premium'
                                        : 'text-slate-500 hover:text-udanix-blue hover:bg-white/50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {(CAREERS as any)[activeTab].map((career: any, i: number) => (
                                <motion.div
                                    key={career.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-premium border border-white/50 rounded-[2.5rem] p-8 flex flex-col hover:shadow-premium-xl hover:-translate-y-2 transition-all duration-500 group"
                                >
                                    {/* Icon Header */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                            <career.icon className="w-7 h-7 text-udanix-blue" />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-white ${career.demandColor}`}>
                                            {career.demand}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <div className="space-y-2 mb-6">
                                        <h3 className="font-black text-udanix-navy text-xl leading-tight group-hover:text-udanix-blue transition-colors uppercase tracking-tight">
                                            {career.title}
                                        </h3>
                                        <span className="inline-block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60">
                                            {career.stream}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-500 text-[13px] leading-relaxed mb-8 font-semibold line-clamp-2">
                                        {career.desc}
                                    </p>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-1 gap-5 mb-8 bg-white/40 p-5 rounded-3xl border border-white/40">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5 text-slate-400">
                                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">Growth</span>
                                            </div>
                                            <p className="text-[12px] font-black text-udanix-navy uppercase">{career.growth}</p>
                                        </div>
                                        <div className="w-full h-px bg-white/60" />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5 text-slate-400">
                                                <DollarSign className="w-4 h-4 text-udanix-blue" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">Salary</span>
                                            </div>
                                            <p className="text-[12px] font-black text-udanix-navy uppercase">{career.salary}</p>
                                        </div>
                                    </div>

                                    {/* Duration + Skills */}
                                    <div className="mt-auto space-y-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl glass-premium border border-white flex items-center justify-center shadow-sm">
                                                <Clock className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Duration</p>
                                                <p className="text-[12px] font-black text-udanix-navy uppercase tracking-tight">{career.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl glass-premium border border-white flex items-center justify-center shadow-sm flex-shrink-0">
                                                <BookOpen className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Core Skills</p>
                                                <p className="text-[12px] font-black text-udanix-navy uppercase tracking-tight leading-tight">{career.skills}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Link */}
                                    <div className="mt-8 pt-6 border-t border-slate-100/50">
                                        <button className="group/btn flex items-center justify-center gap-3 w-full py-2 text-[12px] font-black text-slate-400 hover:text-udanix-blue uppercase tracking-[0.2em] transition-all">
                                            View Roadmap
                                            <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Button */}
                <div className="mt-20 text-center">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-4 px-10 py-5 glass-premium border border-white text-udanix-navy text-[13px] font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-premium hover:shadow-premium-xl transition-all"
                    >
                        Explore 500+ Careers
                        <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-sm">
                            <Sparkles className="w-4 h-4" />
                        </div>
                    </motion.button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>
    );
}
