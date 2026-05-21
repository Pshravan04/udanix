import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartProps {
  data?: any[];
}

const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--admin-card)] backdrop-blur-3xl border border-[var(--admin-border)] p-6 rounded-[2rem] shadow-2xl ring-1 ring-[var(--admin-border-subtle)]">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{label}</p>
        <div className="space-y-3">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.1)]" style={{ backgroundColor: item.color }} />
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.name}</p>
              </div>
              <p className="text-sm font-black text-[var(--admin-text-main)] tabular-nums">
                {prefix}{item.value.toLocaleString()}{suffix}
              </p>
            </div>
          ))}
        </div>
        {payload[0].payload.growth !== undefined && (
          <div className="mt-4 pt-4 border-t border-[var(--admin-border-subtle)]">
            <p className={`text-[10px] font-black flex items-center justify-center gap-2 py-1.5 rounded-xl bg-[var(--admin-item-bg)] ${payload[0].payload.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {payload[0].payload.growth >= 0 ? '↗' : '↘'} {Math.abs(payload[0].payload.growth)}% <span className="text-slate-500">GROWTH</span>
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function SessionAnalytics({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0}/>
            </linearGradient>
            <filter id="shadow" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
              <feOffset in="blur" dx="0" dy="10" result="offsetBlur" />
              <feFlood floodColor="var(--admin-accent)" floodOpacity="0.3" result="offsetColor" />
              <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-charts-grid)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#475569" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            dy={15}
            fontFamily="inherit"
            fontWeight={800}
            tick={{ fill: '#64748b', fontSize: 10 }}
          />
          <YAxis 
            stroke="#475569" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            fontFamily="inherit"
            fontWeight={800}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="sessions" 
            stroke="var(--admin-accent)" 
            fillOpacity={1} 
            fill="url(#colorSessions)" 
            strokeWidth={4}
            animationDuration={2500}
            filter="url(#shadow)"
          />
          <Bar 
            dataKey="sessions" 
            barSize={4} 
            fill="var(--admin-item-bg)" 
            radius={[4, 4, 0, 0]} 
          />
          <Line 
            type="monotone" 
            dataKey="sessions" 
            stroke="var(--admin-text-main)" 
            strokeWidth={1} 
            dot={false} 
            strokeOpacity={0.1} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueDistribution({ data = [] }: ChartProps) {
  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={8}
            dataKey="value"
            animationDuration={2000}
            animationEasing="ease-out"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip prefix="₹" />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StudentGrowth({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-charts-grid)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#475569" 
            fontSize={9} 
            tickLine={false} 
            axisLine={false} 
            dy={10} 
            fontWeight={700}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="users" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorGrowth)" 
            strokeWidth={3} 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActivityHeatmap({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full grid grid-cols-7 gap-2">
        {Array.from({ length: 49 }).map((_, i) => {
          const val = data[i]?.value || Math.floor(Math.random() * 10);
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className="w-full aspect-square rounded-lg cursor-help relative group"
              style={{ 
                backgroundColor: val === 0 ? 'var(--admin-item-bg)' : `rgba(14, 57, 154, ${0.15 + (val / 10) * 0.85})`,
                boxShadow: val > 8 ? '0 0 20px var(--admin-accent-glow)' : 'none'
              }}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl opacity-0 group-hover:opacity-100 transition-all z-50 pointer-events-none shadow-2xl scale-90 group-hover:scale-100">
                <p className="text-[10px] font-black text-[var(--admin-text-main)] whitespace-nowrap uppercase tracking-widest">{val} Interactions</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Alias exports for consistency across pages
export { StudentGrowth as GrowthChart };
export { RevenueDistribution as StreamDistribution };
export { RevenueDistribution as StreamRevenueChart };
export { SessionAnalytics as SessionsChart };

export function FinancialsChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-charts-grid)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#475569" 
            fontSize={9} 
            tickLine={false} 
            axisLine={false} 
            dy={10} 
            fontWeight={700}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip prefix="₹" />} />
          <Bar 
            dataKey="revenue" 
            fill="var(--admin-accent)" 
            radius={[4, 4, 0, 0]} 
            animationDuration={2000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RatingDistribution({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 30, right: 30 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="star" 
            type="category" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            fontWeight={800}
          />
          <Tooltip content={<CustomTooltip suffix=" Counselors" />} cursor={{ fill: 'transparent' }} />
          <Bar 
            dataKey="count" 
            fill="#f59e0b" 
            radius={[0, 4, 4, 0]} 
            barSize={12}
            animationDuration={2000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fillOpacity={0.4 + (index * 0.15)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopicPopularity({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-charts-grid)" vertical={false} />
          <XAxis 
            dataKey="topic" 
            stroke="#64748b" 
            fontSize={9} 
            tickLine={false} 
            axisLine={false} 
            dy={10} 
            fontWeight={700}
            interval={0}
            tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip suffix=" Sessions" />} />
          <Bar 
            dataKey="count" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
            animationDuration={2000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function UserDonutChart({ data = [] }: ChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={10}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            content={({ payload }) => (
              <div className="flex justify-center gap-6 mt-4">
                {payload?.map((entry: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


