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
    content: "Udanix didn't just give me a list of careers; it gave me a roadmap to my dream job in AI.",
    image: "/images/student-1.png",
    size: 'large'
  },
  {
    id: 2,
    type: 'stat',
    label: "Success Rate",
    value: "98%",
    desc: "Placement Achievement",
    icon: TrendingUp,
    size: 'small'
  },
  {
    id: 3,
    type: 'testimonial',
    name: "Meera Kapoor",
    role: "UX Designer @ Microsoft",
    content: "The counseling sessions were transformative. I found my passion for design here.",
    image: "/images/student-2.png",
    size: 'medium'
  },
  {
    id: 4,
    type: 'image',
    image: "/images/campus-scene.png",
    size: 'large',
    label: 'Campus Recruitment Day'
  },
  {
    id: 5,
    type: 'testimonial',
    name: "Rahul Verma",
    role: "Data Scientist @ Meta",
    content: "Precision guidance is what sets Udanix apart. Every session was high-value.",
    image: "/images/student-3.png",
    size: 'small'
  },
  {
    id: 6,
    type: 'stat',
    label: "Expert Mentors",
    value: "500+",
    desc: "Industry Professionals",
    icon: Users,
    size: 'small'
  },
  {
    id: 7,
    type: 'testimonial',
    name: "Sneha Patel",
    role: "Product Manager @ Amazon",
    content: "I went from confused to confident in just three sessions. Simply world-class.",
    image: "/images/student-4.png",
    size: 'medium'
  },
  {
    id: 8,
    type: 'image',
    image: "/images/workshop-scene.png",
    size: 'medium',
    label: 'Interactive Workshop Session'
  },
  {
    id: 9,
    type: 'testimonial',
    name: "Vikram Malhotra",
    role: "AI Researcher @ OpenAI",
    content: "The depth of career mapping at Udanix is unmatched in the industry.",
    image: "/images/student-5.png",
    size: 'large'
  },
  {
    id: 10,
    type: 'stat',
    label: "Global Reach",
    value: "15k+",
    desc: "Student Community",
    icon: GraduationCap,
    size: 'small'
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
        className={cn(
          "bg-white rounded-3xl p-6 sm:p-8 border border-[#d2d2d7] shadow-sm mb-6 flex flex-col justify-between",
          item.size === 'large' ? 'min-h-[350px]' : item.size === 'medium' ? 'min-h-[280px]' : 'min-h-[220px]'
        )}
      >
        <div className="flex gap-4 items-center mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-[#f5f5f7]">
            <Image src={item.image!} width={48} height={48} className="w-full h-full object-cover" alt={item.name!} />
          </div>
          <div>
            <p className="text-[#1d1d1f] font-semibold text-sm">{item.name}</p>
            <p className="text-[#86868b] font-medium text-xs mt-0.5">{item.role}</p>
          </div>
        </div>

        <div className="relative flex-1">
          <Quote className="w-8 h-8 text-[#f5f5f7] absolute -top-2 -left-2 -z-10" />
          <p className="text-[#1d1d1f] font-medium leading-relaxed text-sm sm:text-base tracking-tight">
            "{item.content}"
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-[#FF9500] fill-[#FF9500]" />)}
          </div>
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
        className="bg-[#f5f5f7] rounded-3xl p-8 border border-[#d2d2d7] shadow-sm flex flex-col items-center justify-center text-center gap-3 mb-6"
      >
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#007AFF] shadow-sm mb-2">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-4xl font-semibold text-[#1d1d1f] tracking-tight">{item.value}</p>
          <p className="text-[#1d1d1f] font-medium text-sm">{item.label}</p>
          <p className="text-[#86868b] font-medium text-xs">{item.desc}</p>
        </div>
      </motion.div>
    );
  }

  if (item.type === 'image') {
    return (
      <motion.div 
        ref={cardRef}
        style={{ y }}
        className={cn(
          "relative rounded-3xl overflow-hidden shadow-sm mb-6 border border-[#d2d2d7]",
          item.size === 'large' ? 'h-[400px]' : 'h-[300px]'
        )}
      >
        <Image src={item.image!} fill className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-[#1d1d1f] font-medium text-xs bg-white/90 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-[#d2d2d7]">
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
    <div className="relative flex flex-col h-[800px] overflow-hidden">
      <motion.div 
        animate={{ 
          y: direction === 'up' ? [-800, 0] : [0, -800]
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex flex-col gap-6"
      >
        {[...items, ...items].map((item, idx) => (
          <SuccessCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
      
      {/* Fades */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#f5f5f7] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f5f5f7] to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export function SuccessGallery() {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: "-10%" });

  const col1 = [SUCCESS_STORIES[0], SUCCESS_STORIES[1], SUCCESS_STORIES[2], SUCCESS_STORIES[9]];
  const col2 = [SUCCESS_STORIES[3], SUCCESS_STORIES[4], SUCCESS_STORIES[5]];
  const col3 = [SUCCESS_STORIES[6], SUCCESS_STORIES[7], SUCCESS_STORIES[8]];

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative overflow-hidden bg-[#f5f5f7] border-t border-[#d2d2d7]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <span className="text-[#515154] text-xs font-medium">The Impact Wall</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            Real Results. <br />
            Unlimited Potential.
          </h2>
          
          <p className="text-[#515154] text-lg font-medium">
            Join a network of high-achievers who transformed their professional trajectory.
          </p>
        </div>

        {/* Masonry Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
          <div className="px-2 md:px-0">
            <MarqueeColumn items={col1} speed={40} direction="up" />
          </div>
          <div className="hidden md:block">
            <MarqueeColumn items={col2} speed={30} direction="down" />
          </div>
          <div className="hidden lg:block">
            <MarqueeColumn items={col3} speed={50} direction="up" />
          </div>
        </div>

      </div>
    </section>
  );
}