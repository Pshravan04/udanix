'use client';

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
    Search, BrainCircuit, Users2, Rocket, 
    Sparkles, CheckCircle2, ArrowRight, Zap, Target, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const STEPS = [
    {
        title: "Deep Discovery",
        subtitle: "The Psychometric Blueprint",
        desc: "We go beyond grades. Our advanced psychometric mapping uncovers your cognitive DNA, emotional intelligence, and hidden natural talents.",
        icon: Search,
        image: "https://images.unsplash.com/photo-1541339907198-e08759dfeb3f?w=1200&q=80&fit=crop",
        color: "from-blue-600 to-indigo-600",
        accent: "blue",
        features: ["Neuro-mapping", "Behavioral Audit", "Skill Extraction"]
    },
    {
        title: "Stream Synthesis",
        subtitle: "The AI Matchmaking",
        desc: "Your profile meets our neural network. We map your unique strengths against 500+ global academic streams to find your perfect frequency.",
        icon: BrainCircuit,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&fit=crop",
        color: "from-orange-500 to-rose-500",
        accent: "orange",
        features: ["Global Benchmarking", "Trend Forecasting", "Impact Modeling"]
    },
    {
        title: "Elite Mentorship",
        subtitle: "The Practitioner's Edge",
        desc: "Connect directly with mentors from IVY leagues and top global institutions. Real-world insights from those who've already walked the path.",
        icon: Users2,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80&fit=crop",
        color: "from-udanix-blue to-blue-800",
        accent: "navy",
        features: ["1-on-1 Strategy", "Network Access", "Portfolio Prep"]
    },
    {
        title: "Mission Launch",
        subtitle: "The Final Roadmap",
        desc: "Final delivery of your actionable blueprint. Complete with application strategies, skill-up paths, and a 5-year career projection.",
        icon: Rocket,
        image: "https://images.unsplash.com/photo-1523050853051-f7507011405e?w=1200&q=80&fit=crop",
        color: "from-indigo-600 to-purple-600",
        accent: "purple",
        features: ["Application Support", "Skill Roadmap", "Alumni Connect"]
    }
];

export function ProcessJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const step = Math.min(
                Math.floor(latest * STEPS.length),
                STEPS.length - 1
            );
            setActiveStep(step);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const rotateX = useTransform(scrollYProgress, [0, 1], [2, -2]);
    const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

    return (
        <section ref={containerRef} className="relative bg-white overflow-hidden">
            {/* Premium Background Architecture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="sticky top-0 h-screen w-full">
                    <div className="absolute inset-0 mesh-gradient-premium opacity-60" />
                    <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                    <div className="w-full h-full opacity-20" style={{ 
                        backgroundImage: 'radial-gradient(circle, #003E8A 1px, transparent 1px)', 
                        backgroundSize: '120px 120px' 
                    }} />
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                {/* Section Header */}
                <div className="h-[50vh] flex flex-col items-center justify-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-premium border-white/80 shadow-premium mb-10"
                    >
                        <Zap className="w-4 h-4 text-udanix-orange fill-udanix-orange animate-pulse" />
                        <span className="text-udanix-blue text-[11px] font-black uppercase tracking-[0.4em]">
                            The Methodology
                        </span>
                    </motion.div>
                    
                    <h2 className="text-[64px] sm:text-[90px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.85]">
                        Your <span className="text-brand-gradient">Precision</span> <br />
                        Flight Plan.
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left Side: Content with Progress Indicator */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Vertical Progress Line */}
                        <div className="absolute left-[-40px] top-0 bottom-0 w-[2px] bg-slate-100 hidden lg:block">
                            <motion.div 
                                style={{ scaleY: scaleProgress, transformOrigin: "top" }}
                                className="w-full h-full bg-brand-gradient shadow-[0_0_15px_rgba(0,62,138,0.5)]"
                            />
                        </div>

                        {STEPS.map((step, idx) => (
                            <div key={idx} className="min-h-screen flex flex-col justify-center pb-[20vh] relative">
                                {/* Step Number Overlay */}
                                <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
                                    <motion.div 
                                        animate={{ 
                                            scale: activeStep === idx ? 1.2 : 1,
                                            backgroundColor: activeStep === idx ? '#003E8A' : '#f1f5f9'
                                        }}
                                        className={cn(
                                            "w-12 h-12 rounded-full border-4 border-white shadow-premium flex items-center justify-center font-black text-lg transition-all duration-500",
                                            activeStep === idx ? "text-white" : "text-slate-300"
                                        )}
                                    >
                                        {idx + 1}
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-20% 0px -20% 0px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-premium transition-all duration-500",
                                                activeStep === idx ? "bg-udanix-blue text-white scale-110" : "bg-white text-slate-300"
                                            )}>
                                                <step.icon className="w-7 h-7" />
                                            </div>
                                            <p className="text-udanix-orange font-black uppercase tracking-[0.2em] text-xs">
                                                {step.subtitle}
                                            </p>
                                        </div>
                                        <h3 className="text-5xl sm:text-7xl font-black text-udanix-navy uppercase tracking-tighter leading-none">
                                            {step.title}
                                        </h3>
                                    </div>

                                    <p className="text-slate-500 text-2xl font-bold italic leading-relaxed max-w-xl">
                                        &quot;{step.desc}&quot;
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {step.features.map((feature, fIdx) => (
                                            <motion.div 
                                                key={feature} 
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: fIdx * 0.1 }}
                                                className="flex items-center gap-3 px-6 py-5 rounded-[1.5rem] glass-premium border-white/60 shadow-sm hover:shadow-premium group transition-all duration-500"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:text-white transition-colors duration-500" />
                                                </div>
                                                <span className="text-[11px] font-black text-udanix-navy uppercase tracking-widest">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Sticky Interactive Visuals */}
                    <div className="hidden lg:block w-1/2 sticky top-0 h-screen py-24">
                        <motion.div 
                            style={{ rotateX, y: translateY }}
                            className="relative h-full w-full rounded-[4.5rem] overflow-hidden extreme-glass border-8 border-white/40 shadow-premium-2xl perspective-1000"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-udanix-navy/60 via-transparent to-transparent z-10" />
                                    <Image 
                                        src={STEPS[activeStep].image} 
                                        alt={STEPS[activeStep].title}
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                    
                                    {/* Floating Data Badge */}
                                    <motion.div 
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="absolute top-12 right-12 z-20 extreme-glass px-6 py-5 rounded-[2rem] border border-white/40 flex items-center gap-5"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">Phase Objective</p>
                                            <p className="text-white font-black uppercase text-sm tracking-tight">{STEPS[activeStep].subtitle.split(' ')[0]} Match</p>
                                        </div>
                                    </motion.div>

                                    {/* Status Card */}
                                    <div className="absolute bottom-12 left-12 right-12 z-20">
                                        <div className="extreme-glass p-12 rounded-[3rem] border border-white/40 shadow-2xl overflow-hidden relative group/card">
                                            <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 blur-[80px] -mr-32 -mt-32 group-hover/card:bg-white/20 transition-all duration-700" />
                                            
                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <Layers className="w-4 h-4 text-udanix-orange" />
                                                        <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Navigation Point</span>
                                                    </div>
                                                    <h5 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                                                        {STEPS[activeStep].title}
                                                    </h5>
                                                </div>
                                                <motion.button 
                                                    whileHover={{ scale: 1.1, rotate: 5, backgroundColor: '#003E8A', color: '#fff' }}
                                                    className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-udanix-navy shadow-2xl transition-colors duration-500"
                                                >
                                                    <ArrowRight className="w-9 h-9" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Transition Gradient */}
            <div className="h-[20vh] bg-gradient-to-b from-slate-50 to-white" />
        </section>
    );
}
