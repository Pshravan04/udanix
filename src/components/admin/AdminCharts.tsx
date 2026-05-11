'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartProps {
  data?: any[];
}

export function SessionsChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }} 
            itemStyle={{ color: 'var(--admin-accent)', fontWeight: 'bold' }}
            cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="sessions" 
            stroke="var(--admin-accent)" 
            fillOpacity={1} 
            fill="url(#colorSessions)" 
            strokeWidth={3}
            animationDuration={2000}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StreamDistribution({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            width={80}
          />
          <Tooltip 
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              fontSize: '12px'
            }} 
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#10B981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function UserDonutChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={8}
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#10B981'} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              fontSize: '12px'
            }} 
          />
          <Legend 
            iconType="circle" 
            verticalAlign="bottom" 
            wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FinancialsChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FBB03B" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#FBB03B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '12px'
            }} 
            itemStyle={{ color: '#FBB03B', fontWeight: 'bold' }}
            formatter={(value) => [`₹${value}`, 'Revenue']}
          />
          <Area 
            type="stepAfter" 
            dataKey="revenue" 
            stroke="#FBB03B" 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            strokeWidth={3}
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StreamRevenueChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              fontSize: '12px'
            }} 
            formatter={(value) => [`₹${value}`, 'Revenue']}
          />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]} barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#FBB03B'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActivityHeatmap({ data = [] }: ChartProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="min-w-[600px]">
        <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] mb-6 text-center">Neural Activity Propagation Grid</p>
        <div className="flex gap-2">
          {/* Days labels */}
          <div className="flex flex-col gap-2 pr-4 pt-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <span key={day} className="text-[8px] font-bold text-slate-600 uppercase h-8 flex items-center">{day}</span>
            ))}
          </div>
          
          <div className="flex-1 grid grid-cols-12 gap-2">
            {Array.from({ length: 84 }).map((_, i) => {
              const val = data[i]?.value || Math.floor(Math.random() * 10);
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className="w-full aspect-square rounded-sm cursor-help relative group"
                  style={{ 
                    backgroundColor: val === 0 ? 'rgba(255,255,255,0.02)' : `rgba(16, 185, 129, ${0.1 + (val / 10) * 0.8})`,
                    boxShadow: val > 7 ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none'
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity rounded-sm flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">{val}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GrowthChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
          <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }} 
            itemStyle={{ color: '#8b5cf6' }}
          />
          <Area type="monotone" dataKey="users" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RatingDistribution({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
          <XAxis dataKey="rating" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }} 
          />
          <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopicPopularity({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis dataKey="topic" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={100} />
          <Tooltip 
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }} 
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
