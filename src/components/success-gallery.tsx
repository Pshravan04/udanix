'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Users, Star, Quote, ArrowUpRight, TrendingUp, GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SUCCESS_STORIES = [
  {
    id: 1,
    type: 'testimonial',
    name: "Aryan Singh",
    role: "Software Engineer @ Google",
    content: "Udanix didn&apos;t just give me a list of careers; it gave me a roadmap to my dream job in AI.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    size: 'large',
    color: 'blue'
  },
  {
    id: 2,
    type: 'stat',
    label: "Success Rate",
    value: "98%",
    desc: "Placement Achievement",
    icon: TrendingUp,
    size: 'small',
    color: 'orange'
  },
  {
    id: 3,
    type: 'testimonial',
    name: "Meera Kapoor",
    role: "UX Designer @ Microsoft",
    content: "The counseling sessions were transformative. I found my passion for design here.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    size: 'medium',
    color: 'purple'
  },
  {
    id: 4,
    type: 'image',
    image: "https://images.unsplash.com/photo-1523240715639-93f8006798e3?q=80&w=800&auto=format&fit=crop",
    size: 'large',
    label: 'Campus Recruitment Day 2024'
  },
  {
    id: 5,
    type: 'testimonial',
    name: "Rahul Verma",
    role: "Data Scientist @ Meta",
    content: "Precision guidance is what sets Udanix apart. Every session was high-value.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    size: 'small',
    color: 'blue'
  },
  {
    id: 6,
    type: 'stat',
    label: "Expert Mentors",
    value: "500+",
    desc: "Industry Professionals",
    icon: Users,
    size: 'small',
    color: 'blue'
  },
  {
    id: 7,
    type: 'testimonial',
    name: "Sneha Patel",
    role: "Product Manager @ Amazon",
    content: "I went from confused to confident in just three sessions. Simply world-class.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    size: 'medium',
    color: 'green'
  },
  {
    id: 8,
    type: 'image',
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    size: 'medium',
    label: 'Interactive Workshop Session'
  },
  {
    id: 9,
    type: 'testimonial',
    name: "Vikram Malhotra",
    role: "AI Researcher @ OpenAI",
    content: "The depth of career mapping at Udanix is unmatched in the industry.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    size: 'large',
    color: 'navy'
  },
  {
    id: 10,
    type: 'stat',
    label: "Global Reach",
    value: "15k+",
    desc: "Student Community",
    icon: GraduationCap,
    size: 'small',
    color: 'purple'
  }
];

function SuccessCard({ item }: { item: typeof SUCCESS_STORIES[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, item.size === 'large' ? -40 : -20]);

  if (item.type === 'testimonial') {
    return (
      <motion.div 
        ref={cardRef}
        style={{ y }}
        whileHover={{ y: -5, scale: 1.02 }}
        className={cn(
          "relative glass-premium rounded-[3rem] p-8 border border-white/60 shadow-premium-lg group cursor-pointer overflow-hidden mb-8",
          item.size === 'large' ? 'min-h-[400px]' : item.size === 'medium' ? 'min-h-[300px]' : 'min-h-[220px]'
        )}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-udanix-blue/10 to-transparent blur-3xl rounded-full" />
        
        <div className="flex gap-6 items-center mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-premium shrink-0">
            <Image src={item.image!} width={64} height={64} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={item.name!} />
          </div>
          <div>
            <p className="text-udanix-navy font-black uppercase tracking-tight">{item.name}</p>
            <p className="text-udanix-blue font-bold uppercase tracking-widest text-[9px] leading-none">{item.role}</p>
          </div>
        </div>

        <div className="relative">
          <Quote className="w-10 h-10 text-udanix-orange/20 absolute -top-4 -left-4 -z-10" />
          <p className="text-slate-500 font-semibold italic leading-relaxed text-lg">
            &quot;{item.content}&quot;
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-udanix-orange fill-udanix-orange" />)}
          </div>
          <ArrowUpRight className="w-5 h-5 text-udanix-orange opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </motion.div>
    );
  }

  if (item.type === 'stat') {
    const Icon = item.icon!;
    return (
      <motion.div 
        ref={cardRef}
        style={{ y }}
        className="glass-premium rounded-[2.5rem] p-8 border border-white shadow-premium flex flex-col items-center justify-center text-center gap-4 mb-8 bg-gradient-to-br from-white/40 to-slate-50/40"
      >
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-premium mb-2",
          item.color === 'orange' ? 'bg-udanix-orange/10 text-udanix-orange' : 'bg-udanix-blue/10 text-udanix-blue'
        )}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <p className="text-4xl font-black text-udanix-navy tracking-tighter leading-none">{item.value}</p>
          <p className="text-udanix-navy font-bold uppercase tracking-widest text-[10px]">{item.label}</p>
          <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">{item.desc}</p>
        </div>
      </motion.div>
    );
  }

  if (item.type === 'image') {
    return (
      <motion.div 
        ref={cardRef}
        style={{ y }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "relative rounded-[3rem] overflow-hidden shadow-premium-xl group mb-8 border-4 border-white/80",
          item.size === 'large' ? 'h-[500px]' : 'h-[350px]'
        )}
      >
        <Image src={item.image!} fill className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-udanix-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white font-black uppercase tracking-widest text-[10px] bg-udanix-blue/80 backdrop-blur-md px-4 py-2 rounded-full inline-block">
            {item.label}
          </p>
        </div>
      </motion.div>
    );
  }

  return null;
}

function MarqueeColumn({ items, direction = 'up', speed = 20 }: { items: typeof SUCCESS_STORIES, direction?: 'up' | 'down', speed?: number }) {
  return (
    <div className="relative flex flex-col h-[1000px] overflow-hidden">
      <motion.div 
        animate={{ 
          y: direction === 'up' ? [-1000, 0] : [0, -1000]
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex flex-col"
      >
        {[...items, ...items].map((item, idx) => (
          <SuccessCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function SuccessGallery() {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: "-10%" });

  // Divide items into 3 columns for the marquee
  const col1 = [SUCCESS_STORIES[0], SUCCESS_STORIES[1], SUCCESS_STORIES[2], SUCCESS_STORIES[9]];
  const col2 = [SUCCESS_STORIES[3], SUCCESS_STORIES[4], SUCCESS_STORIES[5]];
  const col3 = [SUCCESS_STORIES[6], SUCCESS_STORIES[7], SUCCESS_STORIES[8]];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        
        {/* Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-premium border border-white shadow-premium"
          >
            <div className="w-2 h-2 rounded-full bg-udanix-orange animate-pulse" />
            <span className="text-udanix-blue text-[12px] font-black uppercase tracking-[0.3em]">
              The Impact Wall
            </span>
          </motion.div>
          <h2 className="text-[56px] sm:text-[80px] font-black text-udanix-navy tracking-tighter uppercase leading-[0.85]">
            Real Results. <br />
            <span className="text-brand-gradient">Unlimited</span> Potential.
          </h2>
          
          <p className="text-slate-500 text-xl font-semibold italic">
            &quot;Join the global network of high-achievers who transformed their professional trajectory with Udanix precision counseling.&quot;
          </p>
        </div>

        {/* Infinite Masonry Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MarqueeColumn items={col1} speed={40} direction="up" />
          <div className="hidden md:block">
            <MarqueeColumn items={col2} speed={30} direction="down" />
          </div>
          <div className="hidden lg:block">
            <MarqueeColumn items={col3} speed={50} direction="up" />
          </div>
        </div>

        {/* Floating Achievement Badges Overlay (Optional but premium) */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center gap-4 px-8">
          <div className="glass-premium px-10 py-6 rounded-full border border-white shadow-premium-xl flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} width={40} height={40} alt="" />
                </div>
              ))}
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <p className="text-udanix-navy font-black uppercase tracking-tight text-sm">
              +15,000 Successful Career Shifts
            </p>
          </div>
        </div>

      </div>

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-[40%] h-[40%] bg-udanix-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[30%] h-[30%] bg-udanix-orange/5 blur-[100px] rounded-full" />
      </div>

    </section>
  );
}