'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, DollarSign, Clock, BookOpen,
    ExternalLink, Code, Stethoscope, BarChart,
    HardHat, Calculator, Landmark, LineChart,
    Megaphone, PenTool, Pen, Scale, Brain
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
        <section className="py-28 bg-[#F9FAFB]/50 border-y border-[#E5E7EB]">
            <div className="max-w-[1280px] mx-auto px-8">

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                        Popular Career Paths
                    </h2>
                    <p className="text-[#4B5563] text-base leading-relaxed max-w-2xl mx-auto">
                        Explore trending careers across different streams with detailed insights on growth, salary, and skills required.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center bg-[#F3F4F6] p-1.5 rounded-2xl border border-[#E5E7EB]">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-10 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                                        ? 'bg-white text-[#111827] shadow-sm ring-1 ring-[#E5E7EB]'
                                        : 'text-[#6B7280] hover:text-[#111827]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="relative min-h-[460px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {(CAREERS as any)[activeTab].map((career: any) => (
                                <div
                                    key={career.title}
                                    className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                                >
                                    {/* Header: Title + Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-[#111827] text-lg leading-tight group-hover:text-[#0056D2] transition-colors">
                                                {career.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${career.demandColor}`}>
                                                    {career.demand}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stream Tag */}
                                    <div className="mb-4">
                                        <span className="text-[10px] font-bold text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5 rounded-md bg-[#F9FAFB]">
                                            {career.stream}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#6B7280] text-[13px] leading-relaxed mb-6 line-clamp-2">
                                        {career.desc}
                                    </p>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-[#6B7280]">
                                                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                                <span className="text-[11px] font-medium">Growth Rate</span>
                                            </div>
                                            <p className="text-[12px] font-bold text-[#111827] pl-5">{career.growth}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-[#6B7280]">
                                                <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                                                <span className="text-[11px] font-medium">Salary Range</span>
                                            </div>
                                            <p className="text-[12px] font-bold text-[#111827] pl-5">{career.salary}</p>
                                        </div>
                                    </div>

                                    {/* Duration + Skills */}
                                    <div className="mt-auto space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-[#4B5563]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">Duration</p>
                                                <p className="text-[12px] font-bold text-[#111827]">{career.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                                                <BookOpen className="w-4 h-4 text-[#4B5563]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wider">Skills</p>
                                                <p className="text-[12px] font-bold text-[#111827] line-clamp-2">{career.skills}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Link */}
                                    <div className="mt-6 pt-5 border-t border-[#F3F4F6]">
                                        <button className="flex items-center justify-center gap-2 w-full text-[13px] font-bold text-[#4B5563] hover:text-[#0056D2] transition-colors">
                                            View Details
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Button */}
                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-[#E5E7EB] text-[#111827] text-sm font-bold rounded-2xl shadow-float hover:shadow-float-lg transition-all hover:-translate-y-0.5">
                        Explore All Careers (500+)
                    </button>
                </div>
            </div>
        </section>
    );
}
