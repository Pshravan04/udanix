'use client';

import React from 'react';
import { 
  TrendingUp, DollarSign, Activity, Users, Star, 
  Target, Zap, Globe, RefreshCw, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { 
  FinancialsChart, StreamRevenueChart, ActivityHeatmap,
  RatingDistribution, TopicPopularity, UserDonutChart
} from '@/components/admin/AdminCharts';

export default function AnalyticsAdminPage() {
  const { 
    loading, isAdmin, stats, loadAdminData
  } = useAdminData();

  // Mock data for analytics
  const financialChartData = [
    { name: 'Mon', revenue: 4500 },
    { name: 'Tue', revenue: 5200 },
    { name: 'Wed', revenue: 4800 },
    { name: 'Thu', revenue: 6100 },
    { name: 'Fri', revenue: 7500 },
    { name: 'Sat', revenue: 8900 },
    { name: 'Sun', revenue: 8200 },
  ];

  const streamRevenueData = [
    { name: 'Eng', revenue: 12000, color: '#0EA5E9' },
    { name: 'Med', revenue: 8500, color: '#10B981' },
    { name: 'Comm', revenue: 5600, color: '#FBB03B' },
  ];

  const peakActivityData = [
    { day: 'Mon', value: 8 }, { day: 'Tue', value: 12 }, { day: 'Wed', value: 15 },
    { day: 'Thu', value: 10 }, { day: 'Fri', value: 25 }, { day: 'Sat', value: 30 }, { day: 'Sun', value: 28 },
  ];

  const ratingData = [
    { rating: '5 Star', count: 120 },
    { rating: '4 Star', count: 45 },
    { rating: '3 Star', count: 12 },
    { rating: '2 Star', count: 5 },
    { rating: '1 Star', count: 2 },
  ];

  const topicData = [
    { topic: 'Entrance Exams', count: 85 },
    { topic: 'Career Path', count: 64 },
    { topic: 'College Selection', count: 42 },
    { topic: 'Scholarships', count: 31 },
    { topic: 'Study Abroad', count: 25 },
  ];

  if (loading) return null;
  if (!isAdmin) return null;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
            System <span className="text-blue-500">Heuristics</span>
          </h1>
          <p className="text-slate-400 font-medium">Deep-vector analysis of platform growth and performance.</p>
        </div>
        <div className="flex gap-4">
           <Button 
             onClick={loadAdminData}
             variant="outline" 
             className="glass-admin border-white/5 text-white gap-2"
           >
             <RefreshCw className="w-4 h-4" />
             Refresh Stats
           </Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 text-xs font-black uppercase tracking-widest px-6 rounded-xl">
             <Filter className="w-4 h-4" />
             Timeframe: 7D
           </Button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Platform GMV', value: `₹${(stats.totalGMV / 1000).toFixed(1)}k`, sub: '+12.5% vs LW', icon: DollarSign, color: 'text-emerald-500' },
          { label: 'Avg Session Rating', value: '4.85', sub: '98% Positive', icon: Star, color: 'text-amber-400' },
          { label: 'Conversion Rate', value: '3.2%', sub: '+0.4% Improvement', icon: Target, color: 'text-blue-500' },
          { label: 'System Uptime', value: '99.99%', sub: 'No outages detected', icon: Zap, color: 'text-purple-500' },
        ].map((s) => (
          <div key={s.label} className="glass-admin p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
               <s.icon className="w-full h-full -rotate-12 translate-x-4 -translate-y-4" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-3xl font-black text-white mb-1">{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Trends */}
        <div className="glass-admin p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center justify-between">
            Financial Propagation
            <span className="text-[10px] text-emerald-400">Live Forecast</span>
          </h3>
          <FinancialsChart data={financialChartData} />
        </div>

        {/* Stream Performance */}
        <div className="glass-admin p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Stream Revenue distribution</h3>
          <StreamRevenueChart data={streamRevenueData} />
        </div>

        {/* Activity Grid */}
        <div className="glass-admin p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Peak Load Analysis</h3>
          <ActivityHeatmap data={peakActivityData} />
        </div>

        {/* Rating Spread */}
        <div className="glass-admin p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Satisfaction Heuristics</h3>
          <RatingDistribution data={ratingData} />
        </div>

        {/* Topic Popularity */}
        <div className="glass-admin p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Knowledge Vectors</h3>
          <TopicPopularity data={topicData} />
        </div>

        {/* System Load */}
        <div className="glass-admin p-8 flex flex-col justify-center text-center">
           <Globe className="w-16 h-16 text-blue-500/20 mx-auto mb-6 animate-pulse" />
           <h3 className="text-xl font-black text-white uppercase tracking-tighter">Global Node Network</h3>
           <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
             Traffic is currently distributed across 12 edge nodes with average latency of 42ms.
           </p>
           <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5">
                 <p className="text-lg font-black text-white">42ms</p>
                 <p className="text-[8px] text-slate-500 uppercase font-black">Latency</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5">
                 <p className="text-lg font-black text-white">0.02%</p>
                 <p className="text-[8px] text-slate-500 uppercase font-black">Error Rate</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5">
                 <p className="text-lg font-black text-white">12.4k</p>
                 <p className="text-[8px] text-slate-500 uppercase font-black">Req/Min</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
