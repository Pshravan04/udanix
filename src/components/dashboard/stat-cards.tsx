'use client';

import { motion } from 'framer-motion';
import { Target, Star, Calendar } from 'lucide-react';

const STATS = [
  { 
    label: 'Sessions Done', 
    value: '12', 
    trend: '+3 this month', 
    icon: Target, 
    color: '#F43F5E', // Rose like in image
    bgColor: '#FFF1F2' 
  },
  { 
    label: 'Avg. Rating', 
    value: '4.9', 
    trend: 'Excellent', 
    icon: Star, 
    color: '#FBBF24', // Amber
    bgColor: '#FFFBEB' 
  },
  { 
    label: 'Goals Met', 
    value: '68%', 
    trend: 'On track', 
    icon: Calendar, 
    color: '#6366F1', // Indigo
    bgColor: '#EEF2FF' 
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
        >
          {/* Label & Icon Row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9CA3AF] text-sm font-bold uppercase tracking-wider">
              {stat.label}
            </span>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: stat.bgColor }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
          </div>

          {/* Value */}
          <div className="flex flex-col items-center justify-center py-2">
            <p className="text-[44px] font-black text-[#111827] leading-none mb-2">
              {stat.value}
            </p>
            <p className={stat.label === 'Sessions Done' ? "text-emerald-500 font-bold text-sm" : "text-emerald-500 font-bold text-sm"}>
              {stat.trend}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
