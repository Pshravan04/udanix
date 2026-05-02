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
          "relative bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-2xl group cursor-pointer overflow-hidden mb-10 transition-all duration-700 hover:border-udanix-blue/30 hover:shadow-blue-500/10",
          item.size === 'large' ? 'min-h-[400px]' : item.size === 'medium' ? 'min-h-[300px]' : 'min-h-[220px]'
        )}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-udanix-blue/10 to-transparent blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="flex gap-6 items-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shrink-0">
            <Image src={item.image!} width={64} height={64} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" alt={item.name!} />
          </div>
          <div>
            <p className="text-slate-950 font-black uppercase tracking-tight text-base">{item.name}</p>
            <p className="text-brand-gradient font-black uppercase tracking-widest text-[9px] mt-1">{item.role}</p>
          </div>
        </div>

        <div className="relative">
          <Quote className="w-12 h-12 text-slate-100 absolute -top-6 -left-6 -z-10" />
          <p className="text-slate-600 font-black italic leading-relaxed text-lg group-hover:text-slate-950 transition-colors duration-500 uppercase tracking-tight">
            &quot;{item.content}&quot;
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-udanix-orange fill-udanix-orange" />)}
          </div>
          <ArrowUpRight className="w-5 h-5 text-udanix-blue opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
        className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-2xl flex flex-col items-center justify-center text-center gap-4 mb-10 group hover:border-udanix-orange/30 hover:shadow-orange-500/10 transition-all duration-700"
      >
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500",
          item.color === 'orange' ? 'bg-udanix-orange/10 text-udanix-orange border border-udanix-orange/20' : 'bg-udanix-blue/10 text-udanix-blue border border-udanix-blue/20'
        )}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <p className="text-5xl font-black text-slate-950 tracking-tighter leading-none">{item.value}</p>
          <p className="text-brand-gradient font-black uppercase tracking-widest text-[10px]">{item.label}</p>
          <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.2em]">{item.desc}</p>
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
          "relative rounded-[2.5rem] overflow-hidden shadow-2xl group mb-10 border border-slate-200 hover:border-udanix-blue/30 transition-all duration-700",
          item.size === 'large' ? 'h-[500px]' : 'h-[350px]'
        )}
      >
        <Image src={item.image!} fill className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          <p className="text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full inline-block border border-slate-200">
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
      
      {/* Gradient Fades */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
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
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-udanix-blue/5 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.01] mix-blend-overlay" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        
        {/* Header Area */}
        <div className="text-center max-w-4xl mx-auto mb-32 space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-udanix-orange animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <span className="text-slate-950 text-[10px] font-black uppercase tracking-[0.4em]">
              The Impact Wall
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-[100px] font-black text-slate-950 tracking-tighter uppercase leading-[0.85]">
            Real Results. <br />
            <span className="text-brand-gradient drop-shadow-sm">Unlimited</span> Potential.
          </h2>
          
          <p className="text-slate-600 text-xl md:text-2xl font-black uppercase tracking-[0.2em] max-w-3xl mx-auto leading-relaxed">
            &quot;Join the <span className="text-slate-950">Elite Network</span> of high-achievers who transformed their professional trajectory.&quot;
          </p>
        </div>

        {/* Infinite Masonry Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <MarqueeColumn items={col1} speed={45} direction="up" />
          <div className="hidden md:block">
            <MarqueeColumn items={col2} speed={35} direction="down" />
          </div>
          <div className="hidden lg:block">
            <MarqueeColumn items={col3} speed={55} direction="up" />
          </div>
        </div>

        {/* Floating Achievement Badges Overlay */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center gap-4 px-8 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white backdrop-blur-2xl px-10 py-8 rounded-[2.5rem] border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] flex items-center gap-8"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-xl">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 20}`} width={48} height={48} alt="" />
                </div>
              ))}
            </div>
            <div className="h-10 w-[1px] bg-slate-200" />
            <p className="text-slate-950 font-black uppercase tracking-[0.1em] text-sm">
              <span className="text-udanix-blue">+15,000</span> Successful Career Shifts
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}