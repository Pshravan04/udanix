'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Clock, IndianRupee, Users, ExternalLink,
    Code, Stethoscope, BarChart, HardHat, Calculator, Landmark, LineChart,
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
        <section className="py-24 relative bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800">Popular Career Paths</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Explore trending careers across different streams with detailed insights on growth, salary, and skills required
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 bg-slate-100 rounded-full">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as Category)}
                                className={`px-10 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab 
                                    ? 'bg-white text-slate-900 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="wait">
                        {CAREERS[activeTab].map((career, idx) => (
                            <motion.div
                                key={`${activeTab}-${career.title}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                            >
                                {/* Header: Title & Demand */}
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-slate-900">{career.title}</h3>
                                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                                        career.demand.includes('High') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                        {career.demand}
                                    </span>
                                </div>

                                {/* Stream Badge */}
                                <div className="mb-4">
                                    <span className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded text-[11px] font-semibold border border-slate-100">
                                        {career.stream}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                                    {career.desc}
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-8">
                                    {/* Growth */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-emerald-500">
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-medium">Growth Rate</p>
                                            <p className="text-[13px] font-semibold text-slate-700">{career.growth}</p>
                                        </div>
                                    </div>

                                    {/* Salary */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-blue-500">
                                            <IndianRupee className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-medium">Salary Range</p>
                                            <p className="text-[13px] font-semibold text-slate-700">{career.salary}</p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-purple-500">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-medium">Duration</p>
                                            <p className="text-[13px] font-semibold text-slate-700">{career.duration}</p>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-orange-500">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-medium">4 Skills</p>
                                            <p className="text-[13px] font-semibold text-slate-700 truncate max-w-[100px]">{career.skills}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="mt-auto w-full py-2.5 px-4 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    View Details
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Explore All Careers Button */}
                <div className="mt-16 text-center">
                    <Link href="/careers">
                        <button className="px-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-sm">
                            Explore All Careers (500+)
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
