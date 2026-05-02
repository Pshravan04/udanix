'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, Trophy, Star } from 'lucide-react';

export function HomeStats() {
  const stats = [
    { 
      label: 'Students Guided', 
      value: '50,000+', 
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      label: 'Expert Counselors', 
      value: '200+', 
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    { 
      label: 'Success Rate', 
      value: '95%', 
      icon: <Trophy className="w-6 h-6" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      label: 'Global Partners', 
      value: '150+', 
      icon: <Star className="w-6 h-6" />,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
  ];

  return (
    <section className="py-20 relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="p-8 h-full bg-white rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
