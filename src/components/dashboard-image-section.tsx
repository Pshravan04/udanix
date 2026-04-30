'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function DashboardImageSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]"
          >
            Experience the <span className="text-udanix-blue">Student Command Center</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg font-medium max-w-2xl mx-auto"
          >
            A powerful, all-in-one dashboard designed to track your progress, manage sessions, and unlock your full potential.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,62,138,0.2)] border border-slate-100"
        >
          <Image 
            src="/dashboard-mockup.png" 
            alt="Udanix Student Dashboard Mockup" 
            width={1400} 
            height={800} 
            className="w-full h-auto object-cover"
            priority
          />
          
          {/* Subtle Overlay Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-udanix-blue/5 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-udanix-blue/5 blur-[120px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-udanix-orange/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
