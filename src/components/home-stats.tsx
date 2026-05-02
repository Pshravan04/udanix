'use client';

import { motion } from 'framer-motion';

export function HomeStats() {
  const stats = [
    { label: 'Students Guided', value: '50,000+' },
    { label: 'Expert Counselors', value: '200+' },
    { label: 'Success Rate', value: '95%' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center space-y-2 group"
            >
              <div className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-udanix-blue transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
