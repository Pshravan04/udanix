'use client';

import { motion } from 'framer-motion';
import { Target, Star, Calendar } from 'lucide-react';

interface StatsProps {
  sessionsDone?: number;
  avgRating?: number;
  goalsMet?: string;
}

export function DashboardStats({ sessionsDone = 0, avgRating = 5.0, goalsMet = '0%' }: StatsProps) {
  const STATS = [
    { 
      label: 'Sessions Done', 
      value: sessionsDone.toString(), 
      trend: '+0 this month', // Placeholder for now, could be dynamic
      icon: Target, 
      color: '#F43F5E', 
      bgColor: '#FFF1F2' 
    },
    { 
      label: 'Avg. Rating', 
      value: avgRating.toFixed(1), 
      trend: avgRating >= 4.5 ? 'Excellent' : 'Good', 
      icon: Star, 
      color: '#FBBF24', 
      bgColor: '#FFFBEB' 
    },
    { 
      label: 'Goals Met', 
      value: goalsMet, 
      trend: 'On track', 
      icon: Calendar, 
      color: '#6366F1', 
      bgColor: '#EEF2FF' 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 sm:p-8 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9CA3AF] text-[10px] sm:text-sm font-bold uppercase tracking-wider">
              {stat.label}
            </span>
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
              style={{ background: stat.bgColor }}
            >
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-1 sm:py-2">
            <p className="text-3xl sm:text-[44px] font-black text-[#111827] leading-none mb-1 sm:mb-2 tracking-tighter">
              {stat.value}
            </p>
            <p className="text-emerald-500 font-bold text-[10px] sm:text-sm">
              {stat.trend}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
