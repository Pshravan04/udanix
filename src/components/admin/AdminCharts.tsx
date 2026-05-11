'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';

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
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '12px'
            }} 
            itemStyle={{ color: '#10B981' }}
          />
          <Area 
            type="monotone" 
            dataKey="sessions" 
            stroke="#10B981" 
            fillOpacity={1} 
            fill="url(#colorSessions)" 
            strokeWidth={2}
            animationDuration={1500}
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
              <stop offset="5%" stopColor="#FBB03B" stopOpacity={0.3}/>
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
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '12px'
            }} 
            formatter={(value) => [`₹${value}`, 'Revenue']}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#FBB03B" 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            strokeWidth={2}
            animationDuration={1500}
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
  // data expected: { day: 'Mon', hour: 10, value: 5 }
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
       <div className="text-center">
          <p className="text-slate-500 text-xs uppercase font-black tracking-widest mb-4">Peak Activity Grid</p>
          <div className="grid grid-cols-7 gap-2">
             {data.map((d, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 cursor-help"
                  style={{ 
                    backgroundColor: `rgba(16, 185, 129, ${Math.min(d.value / 10, 1)})`,
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    color: d.value > 5 ? 'white' : '#64748b'
                  }}
                  title={`${d.day}: ${d.value} sessions`}
                >
                   {d.value}
                </div>
             ))}
          </div>
          <div className="mt-4 flex justify-between text-[8px] text-slate-500 font-black uppercase tracking-widest">
             <span>Sun</span>
             <span>Mon</span>
             <span>Tue</span>
             <span>Wed</span>
             <span>Thu</span>
             <span>Fri</span>
             <span>Sat</span>
          </div>
       </div>
    </div>
  );
}

