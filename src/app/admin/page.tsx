'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Target,
  Zap,
  Globe,
  PieChart as PieChartIcon,
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  Bell,
  Settings,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';
import { 
  SessionAnalytics, 
  RevenueDistribution, 
  StudentGrowth,
  ActivityHeatmap
} from '@/components/admin/AdminCharts';
import { LiveActivityFeed } from '@/components/admin/LiveActivityFeed';
import { SystemHealthMonitor } from '@/components/admin/SystemHealthMonitor';
import { EntityPreviewCard } from '@/components/admin/EntityPreviewCard';
import { EntityDetailModal } from '@/components/admin/EntityDetailModal';

const StatCard = ({ title, value, change, icon: Icon, color, detail }: any) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.01 }}
    className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group shadow-2xl shadow-black/50"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.05] to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
    
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform shadow-inner`}>
        <Icon className="w-6 h-6" />
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${change >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      )}
    </div>

    <div className="relative z-10">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1.5">{title}</p>
      <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums">{value}</h3>
      {detail && <p className="text-[10px] text-slate-600 mt-3 font-bold uppercase tracking-widest flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-slate-700" />
        {detail}
      </p>}
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const { 
    stats, loading, loadAdminData, profiles,
    handleVerify, handleDelete, handleUpdateRole 
  } = useAdminData();

  const [selectedProfile, setSelectedProfile] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openProfileDetail = (profile: any) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
            <div className="absolute inset-0 border-4 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Udanix Command Center</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mt-2 animate-pulse">Establishing secure link...</p>
          </div>
        </div>
      </div>
    );
  }

  const mainStats = [
    {
      title: "Operational GMV",
      value: `₹${stats.totalGMV.toLocaleString()}`,
      change: stats.growthMetrics.revenue,
      icon: DollarSign,
      color: "emerald",
      detail: `${stats.completedSessions} Settlements`
    },
    {
      title: "Total Intelligence",
      value: stats.totalUsers,
      change: stats.userGrowthWoW,
      icon: Users,
      color: "blue",
      detail: `${stats.activeCounselors} Active Agents`
    },
    {
      title: "Session Density",
      value: stats.totalSessions,
      change: stats.growthMetrics.sessions,
      icon: Calendar,
      color: "amber",
      detail: `${stats.activeSessions} Parallel Streams`
    },
    {
      title: "Fulfillment Rate",
      value: `${stats.sessionSuccessRate}%`,
      change: 4,
      icon: Target,
      color: "purple",
      detail: "Operational Efficiency"
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20 animate-in fade-in zoom-in-95 duration-1000 ease-out px-4 md:px-0">
      <EntityDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedProfile}
        onVerify={handleVerify}
        onDelete={handleDelete}
        onUpdateRole={handleUpdateRole}
      />
      {/* ─── Superior Header ─── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 bg-white/[0.02] backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--admin-accent)]/5 blur-[120px] -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="px-4 py-1.5 rounded-full bg-[var(--admin-accent)]/10 border border-[var(--admin-accent)]/20 shadow-lg">
                <span className="text-[10px] font-black text-[var(--admin-accent)] uppercase tracking-[0.25em]">Central Command v2.4</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Network Online</span>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">
            Executive <span className="text-slate-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2 flex items-center gap-3">
            Platform Orchestration & Real-time Analytics Hub
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-white/10 pr-6">
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Uptime</p>
                <p className="text-sm font-bold text-white tabular-nums">99.998%</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Latency</p>
                <p className="text-sm font-bold text-emerald-400 tabular-nums">24ms</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={loadAdminData}
              className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all group active:scale-95 shadow-xl"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            </button>
            <button className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Bell className="w-5 h-5" />
            </button>
            <button className="px-8 h-12 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95">
              Sync Node
            </button>
          </div>
        </div>
      </div>

      {/* ─── Global Stats Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* ─── Primary Intelligence Core ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Analytics Engine */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] -mr-48 -mt-48" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-[var(--admin-accent)] rounded-full shadow-[0_0_20px_rgba(var(--admin-accent-rgb),0.6)]" />
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase">Session Velocity</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Platform engagement index</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                {['Day', 'Week', 'Month', 'Year'].map((period) => (
                  <button 
                    key={period}
                    className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${period === 'Week' ? 'bg-[var(--admin-accent)] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[400px] relative z-10">
              <SessionAnalytics data={stats.sessionChartData} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">Growth Delta</h3>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Student onboarding rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-400">+{stats.growthMetrics.students}%</p>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">WoW Index</p>
                  </div>
                </div>
                <div className="h-[280px]">
                   <StudentGrowth data={stats.studentGrowthData} />
                </div>
             </div>

             <div className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">Platform Pulse</h3>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Operational Intensity</p>
                    </div>
                  </div>
                </div>
                <div className="h-[280px]">
                   <ActivityHeatmap data={stats.activityHeatmap} />
                </div>
             </div>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50 h-full">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <PieChartIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Resource Allocation</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Revenue Distribution Mix</p>
                  </div>
                </div>
              </div>
              
              <div className="h-[350px] mb-8">
                 <RevenueDistribution data={stats.streamRevenue} />
              </div>

              <div className="space-y-4">
                 {stats.streamRevenue.map((stream: any, i: number) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-2 h-10 rounded-full" style={{ backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][i % 5] }} />
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stream.name}</p>
                            <p className="text-sm font-bold text-white">₹{stream.value.toLocaleString()}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-white">{Math.round((stream.value / stats.totalGMV) * 100)}%</p>
                         <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Platform Share</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* ─── Operational Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SystemHealthMonitor />
        <LiveActivityFeed />
        
        {/* Elite Counselor Grid */}
        <div className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Vanguard Agents</h3>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Top Performing Experts</p>
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer">
               <List className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {stats.topCounselors.map((counselor: any, idx: number) => (
              <EntityPreviewCard 
                key={counselor.id}
                user={counselor}
                variant="compact"
                rank={idx + 1}
                onView={openProfileDetail}
              />
            ))}
          </div>

          <button 
            onClick={() => window.location.href = '/admin/counselors'}
            className="mt-8 w-full py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-[1.25rem] text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.3em] transition-all"
          >
            Open Global Directory
          </button>
        </div>
      </div>

      {/* ─── Global Reach Heatmap (New Addition for Fidelity) ─── */}
      <div className="bg-[#0A0B10]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl shadow-black/50 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -mr-64 -mt-64" />
         
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
            <div className="max-w-md space-y-6">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Geographic <br/>Presence</h3>
               </div>
               <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-widest">
                  Analyzing student distribution across Indian states. 
                  <span className="text-white font-black"> Maharashtra</span> leads with 40% total platform density.
               </p>
               
               <div className="space-y-6 pt-6">
                  {stats.geoDistribution?.slice(0, 4).map((region: any, i: number) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-500">{region.name}</span>
                          <span className="text-white">{Math.round((region.value / stats.totalUsers) * 100)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${(region.value / stats.totalUsers) * 100}%` }}
                             className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex-1 w-full lg:w-auto h-[400px] bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 opacity-20 grayscale invert contrast-125 group-hover:scale-105 transition-transform duration-[20s] ease-linear">
                   <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto animate-pulse">
                        <Globe className="w-10 h-10 text-blue-400" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Interactive Matrix Terminal</p>
                    <p className="text-2xl font-black text-white tracking-tighter uppercase">58 Nodes Active</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
