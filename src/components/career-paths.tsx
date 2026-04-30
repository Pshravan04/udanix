'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Clock,
    Code, Stethoscope, BarChart,
    HardHat, Calculator, Landmark, LineChart,
    Megaphone, PenTool, Pen, Scale, Brain, Sparkles, ArrowRight,
    LucideIcon
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

interface Career {
    title: string;
    demand: string;
    demandColor: string;
    stream: string;
    desc: string;
    growth: string;
    salary: string;
    duration: string;
    skills: string;
    icon: LucideIcon;
}

export function CareerPaths() {
    type Category = keyof typeof CAREERS;
    const [activeTab, setActiveTab] = useState<Category>('Science');

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
                        &quot;Explore trending careers across different streams with detailed insights on growth, salary, and skills required.&quot;
                    </motion.p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex items-center glass-premium p-2 rounded-[2rem] border border-white/60 shadow-premium">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as Category)}
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
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8"
                        >
                            {CAREERS[activeTab].map((career: Career, i: number) => {
                                // Dynamic grid spans for asymmetrical look
                                const spans = [
                                    'md:col-span-3 lg:col-span-4 lg:row-span-2', // Card 1: Large
                                    'md:col-span-3 lg:col-span-4',               // Card 2: Medium
                                    'md:col-span-3 lg:col-span-4',               // Card 3: Medium
                                    'md:col-span-3 lg:col-span-8',               // Card 4: Wide
                                ];
                                const spanClass = spans[i % spans.length];

                                return (
                                    <motion.div
                                        key={career.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`glass-card-premium rounded-[3rem] p-10 flex flex-col hover:shadow-premium-xl transition-all duration-700 group border-beam ${spanClass}`}
                                    >
                                        {/* Background Decoration */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gradient/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gradient/10 transition-colors" />

                                        {/* Icon Header */}
                                        <div className="flex items-start justify-between mb-10 relative z-10">
                                            <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-xl border border-slate-50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                                <career.icon className="w-8 h-8 text-udanix-blue" />
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full border border-white shadow-sm text-[10px] font-black uppercase tracking-widest ${career.demandColor}`}>
                                                {career.demand}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-4 mb-8 relative z-10">
                                            <h3 className="text-2xl font-black text-udanix-navy leading-none tracking-tight group-hover:text-udanix-blue transition-colors uppercase">
                                                {career.title}
                                            </h3>
                                            <p className="text-slate-500 text-[14px] leading-relaxed font-semibold">
                                                {career.desc}
                                            </p>
                                        </div>

                                        {/* Feature Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
                                            <div className="p-5 rounded-[2rem] bg-white/40 border border-white/60">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth</p>
                                                <p className="text-[14px] font-black text-udanix-navy uppercase">{career.growth}</p>
                                            </div>
                                            <div className="p-5 rounded-[2rem] bg-white/40 border border-white/60">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Salary</p>
                                                <p className="text-[14px] font-black text-udanix-navy uppercase">{career.salary}</p>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-white">
                                                    <Clock className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span className="text-[11px] font-black text-udanix-navy uppercase tracking-tight">{career.duration}</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-[11px] font-black text-udanix-blue uppercase tracking-widest group/btn transition-all">
                                                Roadmap
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
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
