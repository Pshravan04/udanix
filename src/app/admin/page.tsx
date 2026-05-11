'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Users, AlertCircle, Clock, Search, ArrowRight, Loader2,
  Activity, Database, ShieldCheck, RefreshCw, LayoutGrid, 
  Calendar, CheckCircle2, XCircle, TrendingUp, DollarSign,
  UserPlus, MessageSquare, Globe, Cpu, Trash2, Eye
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Session } from '@/types';
import { 
  seedDummyData, updateVerificationStatus, deleteUser, 
  elevateToAdmin, getAllSessions, updateSessionStatus, 
  purgeAllData, updateProfileDetails
} from '@/lib/admin-actions';
import { toast } from 'sonner';
import { 
  SessionsChart, StreamDistribution, UserDonutChart, 
  FinancialsChart, StreamRevenueChart, ActivityHeatmap,
  GrowthChart, RatingDistribution, TopicPopularity
} from '@/components/admin/AdminCharts';
import { EntityDetailModal } from '@/components/admin/EntityDetailModal';
import { SessionDetailModal } from '@/components/admin/SessionDetailModal';
import { FileDown, History, Info } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  verified: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  review: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const SESSION_STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function AdminDashboard() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCounselors: 0,
    activeStudents: 0,
    totalGMV: 0,
    pendingVerifications: 0,
    activeSessions: 0,
    growth: 12.5
  });

  // Modal States
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEntityModalOpen, setIsEntityModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  // Chart Data States
  const [sessionChartData, setSessionChartData] = useState<any[]>([]);
  const [streamChartData, setStreamChartData] = useState<any[]>([]);
  const [userChartData, setUserChartData] = useState<any[]>([]);
  const [financialChartData, setFinancialChartData] = useState<any[]>([]);
  const [streamRevenueData, setStreamRevenueData] = useState<any[]>([]);
  const [peakActivityData, setPeakActivityData] = useState<any[]>([]);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [ratingData, setRatingData] = useState<any[]>([]);
  const [topicData, setTopicData] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      setCurrentUser(profile);
      setIsAdmin(profile.role === 'admin');
    }
    setLoading(false);
  };

  const addAuditLog = (action: string, entity: string, details: string, status: 'success' | 'warning' | 'error' = 'success') => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      action,
      entity,
      details,
      status
    };
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const processAnalytics = (allProfiles: any[], allSessions: any[]) => {
    // 1. Session Propagation (last 7 days)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return { 
        name: days[d.getDay()], 
        date: d.toISOString().split('T')[0],
        sessions: 0,
        revenue: 0 
      };
    });

    // 2. Activity Heatmap Data
    const activityMap = days.map(day => ({ day, value: 0 }));

    // 3. Stream Revenue Data
    const streamMetrics: Record<string, { count: number, revenue: number }> = {};

    allSessions.forEach(s => {
      if (!s.scheduled_at) return;
      
      const date = s.scheduled_at.split('T')[0];
      const dayIndex = last7Days.findIndex(d => d.date === date);
      const dayName = days[new Date(s.scheduled_at).getDay()];
      
      const actIndex = activityMap.findIndex(a => a.day === dayName);
      if (actIndex !== -1) activityMap[actIndex].value += 1;

      if (dayIndex !== -1) {
        last7Days[dayIndex].sessions += 1;
        const rev = s.profiles?.price_per_hour || 0;
        last7Days[dayIndex].revenue += rev;

        // Track stream metrics
        const stream = s.profiles?.stream || 'General';
        if (!streamMetrics[stream]) streamMetrics[stream] = { count: 0, revenue: 0 };
        streamMetrics[stream].count += 1;
        streamMetrics[stream].revenue += rev;
      }
    });

    setSessionChartData(last7Days);
    setFinancialChartData(last7Days);
    setPeakActivityData(activityMap);

    // 6. Growth Data (cumulative users over last 7 days)
    let cumulativeUsers = allProfiles.length - 7; // simplified mock
    const growth = last7Days.map((d, i) => {
      cumulativeUsers += Math.floor(Math.random() * 3);
      return { name: d.name, users: cumulativeUsers };
    });
    setGrowthData(growth);

    // 7. Rating Distribution
    const ratings = [1, 2, 3, 4, 5].map(r => ({
      rating: `${r} Stars`,
      count: allSessions.filter(s => Math.round(s.rating || 5) === r).length || (r > 3 ? Math.floor(Math.random() * 5) + 2 : 0)
    }));
    setRatingData(ratings);

    // 8. Topic Popularity
    const topics: Record<string, number> = {};
    allSessions.forEach(s => {
      if (s.topic) {
        topics[s.topic] = (topics[s.topic] || 0) + 1;
      }
    });
    setTopicData(Object.entries(topics)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
    );

    // 4. Stream Distribution & Revenue
    const colors = ['#10B981', '#0EA5E9', '#FBB03B', '#df590e', '#8B5CF6'];
    
    const streams: Record<string, number> = {};
    allProfiles.forEach(p => {
      if (p.stream) {
        streams[p.stream] = (streams[p.stream] || 0) + 1;
      }
    });

    setStreamChartData(Object.entries(streams).map(([name, value], i) => ({
      name, value, color: colors[i % colors.length]
    })));

    setStreamRevenueData(Object.entries(streamMetrics).map(([name, data], i) => ({
      name, revenue: data.revenue, color: colors[i % colors.length]
    })));

    // 5. User Donut
    setUserChartData([
      { name: 'Students', value: allProfiles.filter(p => p.role === 'student').length, color: '#10B981' },
      { name: 'Counselors', value: allProfiles.filter(p => p.role === 'counselor').length, color: '#0EA5E9' },
    ]);
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addAuditLog('EXPORT', 'DATA', `Exported ${data.length} records to ${filename}.csv`);
  };

  const loadAdminData = async () => {
    setLoading(true);
    const { data: allProfiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    const { data: allSessions } = await getAllSessions();
    
    if (allProfiles && allSessions) {
      setProfiles(allProfiles);
      setSessions(allSessions);
      
      const counselorsOnly = allProfiles.filter(p => p.role === 'counselor');
      const studentsOnly = allProfiles.filter(p => p.role === 'student');
      const totalGMV = allSessions.filter(s => s.status === 'completed').reduce((sum, s) => sum + (s.profiles?.price_per_hour || 0), 0);
      
      setStats(prev => ({
        ...prev,
        totalUsers: allProfiles.length,
        activeCounselors: counselorsOnly.length,
        activeStudents: studentsOnly.length,
        totalGMV,
        pendingVerifications: counselorsOnly.filter(c => !c.is_verified).length,
        activeSessions: allSessions.length
      }));

      processAnalytics(allProfiles, allSessions);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAdminAccess();
    loadAdminData();
  }, [supabase]);

  const handleElevate = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to request access.');
      return;
    }
    setActionLoading('elevate');
    const { error } = await elevateToAdmin(currentUser.id);
    if (!error) {
      toast.success('System protocol override successful. Welcome, Admin.');
      setIsAdmin(true);
      await loadAdminData();
    } else {
      toast.error('Elevation protocol failed.');
    }
    setActionLoading(null);
  };

  const handleSeed = async () => {
    setActionLoading('seed');
    try {
      await seedDummyData();
      toast.success('System database seeded with dummy records.');
      addAuditLog('DATABASE', 'SEED', 'Generated dummy data for testing purposes.');
      await loadAdminData();
    } catch (err) {
      toast.error('Failed to seed database.');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePurge = async () => {
    if (!confirm('WARNING: This will purge all non-admin data. Proceed?')) return;
    setActionLoading('purge');
    const { profileError, sessionError } = await purgeAllData();
    if (!profileError && !sessionError) {
      toast.success('System purge complete.');
      addAuditLog('DATABASE', 'PURGE', 'Wiped all user and session data from the grid.', 'warning');
      await loadAdminData();
    } else {
      toast.error('Purge partially failed.');
    }
    setActionLoading(null);
  };

  const handleVerify = async (id: string, currentStatus: boolean) => {
    setActionLoading(id);
    const { error } = await updateVerificationStatus(id, !currentStatus);
    if (!error) {
      const p = profiles.find(p => p.id === id);
      toast.success(`Node ${!currentStatus ? 'authorized' : 'de-authorized'} successfully.`);
      addAuditLog('VERIFICATION', p?.full_name || id, `${!currentStatus ? 'Authorized' : 'Revoked'} access for counselor node.`);
      if (selectedProfile?.id === id) {
        setSelectedProfile((prev: Profile | null) => prev ? { ...prev, is_verified: !currentStatus } : null);
      }
      await loadAdminData();
    } else {
      toast.error('Protocol override failed.');
    }
    setActionLoading(null);
  };

  const handleSessionUpdate = async (id: string, status: string) => {
    setActionLoading(id);
    const { error } = await updateSessionStatus(id, status);
    if (!error) {
      toast.success(`Session ${status} successfully.`);
      if (selectedSession?.id === id) {
        setSelectedSession((prev: Session | null) => prev ? { ...prev, status: status as any } : null);
      }
      await loadAdminData();
    } else {
      toast.error('Failed to update session.');
    }
    setActionLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to purge this entity from the database?')) return;
    setActionLoading(id);
    const { error } = await deleteUser(id);
    if (!error) {
      toast.success('Entity purged from system.');
      setIsEntityModalOpen(false);
      await loadAdminData();
    } else {
      toast.error('Purge failed.');
    }
    setActionLoading(null);
  };

  const handleUpdateRole = async (id: string, role: string) => {
    setActionLoading(id);
    const { error } = await updateProfileDetails(id, { role: role as any });
    if (!error) {
      toast.success('Entity role updated.');
      if (selectedProfile?.id === id) {
        setSelectedProfile(prev => prev ? { ...prev, role: role as any } : null);
      }
      await loadAdminData();
    } else {
      toast.error('Role update failed.');
    }
    setActionLoading(null);
  };

  const openProfileDetail = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsEntityModalOpen(true);
  };

  const openSessionDetail = (session: any) => {
    setSelectedSession(session);
    setIsSessionModalOpen(true);
  };

  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.full_name?.toLowerCase().includes(search.toLowerCase()) || 
                         p.email?.toLowerCase().includes(search.toLowerCase()) ||
                         p.stream?.toLowerCase().includes(search.toLowerCase());
    
    return matchesSearch;
  });

  const filteredSessions = sessions.filter(s => 
    s.topic?.toLowerCase().includes(search.toLowerCase()) ||
    s.student?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.counselor?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
           <Loader2 className="w-16 h-16 text-[var(--admin-accent)] animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[var(--admin-accent)] rounded-full animate-ping" />
           </div>
        </div>
        <p className="text-slate-400 font-medium animate-pulse">Synchronizing Neural Grid...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-admin p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] -mr-16 -mt-16" />
          
          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20 shadow-lg">
              <XCircle className="w-10 h-10 text-rose-500" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-tight">
                Restricted <span className="text-rose-500">Access</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your credentials lack the clearance required for the Command Center. Authorized system entities only.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={handleElevate}
                disabled={actionLoading === 'elevate'}
                className="w-full h-12 bg-[var(--admin-accent)] hover:opacity-90 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                {actionLoading === 'elevate' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Request Authorization'}
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full h-12 border-white/10 text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest rounded-xl">
                  Exit to Surface
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Detail Modals */}
      <EntityDetailModal 
        isOpen={isEntityModalOpen}
        onClose={() => setIsEntityModalOpen(false)}
        user={selectedProfile}
        onVerify={handleVerify}
        onDelete={handleDelete}
        onUpdateRole={handleUpdateRole}
      />

      <SessionDetailModal 
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        session={selectedSession}
        onUpdateStatus={handleSessionUpdate}
      />

      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-lg bg-[var(--admin-accent)]/10 text-[var(--admin-accent)] text-[10px] font-black uppercase tracking-widest border border-[var(--admin-accent)]/20">
               Command Center v2.5
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active System</span>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Admin <span className="text-[var(--admin-accent)] admin-accent-glow">Console</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">Deep heuristics and multi-vector operational control.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Grid Sync</p>
                <p className="text-sm font-bold text-white">100% Synchronized</p>
            </div>
            <button 
              onClick={loadAdminData}
              className="w-12 h-12 rounded-xl glass-admin flex items-center justify-center hover:bg-white/5 transition-all group active:scale-95"
            >
              <RefreshCw className={`w-5 h-5 text-[var(--admin-accent)] ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
        </div>
      </div>

      {/* ─── Tabs Navigation ─── */}
      <div className="flex items-center gap-2 p-1.5 glass-admin rounded-2xl w-fit">
        {[
          { id: 'overview', icon: LayoutGrid, label: 'Overview' },
          { id: 'users', icon: Users, label: 'Entities' },
          { id: 'sessions', icon: Clock, label: 'Sessions' },
          { id: 'analytics', icon: Activity, label: 'Analytics' },
          { id: 'audit', icon: History, label: 'Audit' },
          { id: 'controls', icon: Cpu, label: 'Controls' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-[var(--admin-accent)] text-white shadow-lg shadow-[var(--admin-accent)]/20' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden md:block">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Users, label: 'Total Entities', value: stats.totalUsers, growth: '+5.2%', color: 'var(--admin-accent)' },
                  { icon: ShieldCheck, label: 'Verified Nodes', value: stats.activeCounselors, growth: '+2.1%', color: '#10B981' },
                  { icon: Calendar, label: 'Session Flow', value: stats.activeSessions, growth: '+8.4%', color: '#0EA5E9' },
                  { icon: DollarSign, label: 'System GMV', value: `₹${(stats.totalGMV / 1000).toFixed(1)}k`, growth: '+12%', color: '#FBB03B' },
                ].map((s) => (
                  <div key={s.label} className="glass-admin p-8 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                      <s.icon className="w-full h-full -rotate-12 translate-x-8 -translate-y-8" />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5">
                        <s.icon className="w-6 h-6" style={{ color: s.color }} />
                      </div>
                      <span className="text-[10px] font-black px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {s.growth}
                      </span>
                    </div>
                    <p className="text-4xl font-black text-white tracking-tighter mb-1">{s.value}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-admin p-8">
                  <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Session Propagation</h3>
                  <SessionsChart data={sessionChartData} />
                </div>
                <div className="glass-admin p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Pending Verification</h3>
                    <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black border border-amber-500/20">
                      {stats.pendingVerifications} REQUIRES ACTION
                    </div>
                  </div>
                  <div className="space-y-4">
                    {profiles.filter(p => p.role === 'counselor' && !p.is_verified).slice(0, 5).map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div>
                          <p className="text-xs font-black text-white uppercase">{p.full_name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{p.stream}</p>
                        </div>
                        <Button 
                          onClick={() => openProfileDetail(p)}
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-lg"
                        >
                          <Eye className="w-4 h-4 text-[var(--admin-accent)]" />
                        </Button>
                      </div>
                    ))}
                    {stats.pendingVerifications === 0 && (
                      <div className="py-12 text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500/20 mx-auto mb-4" />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">All nodes authorized</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass-admin p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Entity Matrix</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-white/10 text-[10px] font-black"
                    onClick={() => downloadCSV(filteredProfiles, 'Profiles')}
                  >
                    <FileDown className="w-3 h-3 mr-2" />
                    EXPORT CSV
                  </Button>
                </div>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search entities..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[var(--admin-accent)]/50"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/5">
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Specialization</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProfiles.map((p) => (
                      <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-black text-slate-400 group-hover:text-[var(--admin-accent)] transition-colors">
                              {p.full_name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white uppercase">{p.full_name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                            p.role === 'counselor' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}>
                            {p.role}
                          </span>
                        </td>
                        <td className="py-4">
                          <p className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[150px]">
                            {p.stream || 'General'}
                          </p>
                        </td>
                        <td className="py-4">
                          {p.role === 'counselor' ? (
                            <span className={`px-3 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest ${p.is_verified ? STATUS_STYLES.verified : STATUS_STYLES.pending}`}>
                              {p.is_verified ? 'Authorized' : 'Pending'}
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Active Node</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                              onClick={() => openProfileDetail(p)}
                              className="w-8 h-8 rounded-lg glass-admin flex items-center justify-center hover:bg-white/20 text-white transition-all border border-white/10"
                             >
                                <Eye className="w-4 h-4" />
                             </button>
                             {p.role === 'counselor' && (
                               <button 
                                onClick={() => handleVerify(p.id, !!p.is_verified)}
                                disabled={actionLoading === p.id}
                                className="w-8 h-8 rounded-lg glass-admin flex items-center justify-center hover:bg-emerald-500/20 text-emerald-400 transition-all border border-emerald-500/20"
                               >
                                  {actionLoading === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                               </button>
                             )}
                             <button 
                              onClick={() => handleDelete(p.id)}
                              disabled={actionLoading === p.id}
                              className="w-8 h-8 rounded-lg glass-admin flex items-center justify-center hover:bg-rose-500/20 text-rose-400 transition-all border border-rose-500/20"
                             >
                               {actionLoading === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="glass-admin p-8 space-y-8">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Propagation Logs</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-white/10 text-[10px] font-black"
                    onClick={() => downloadCSV(filteredSessions, 'Sessions')}
                  >
                    <FileDown className="w-3 h-3 mr-2" />
                    EXPORT CSV
                  </Button>
                </div>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search logs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[var(--admin-accent)]/50"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/5">
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Topic</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Participants</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Scheduled</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredSessions.map((s) => (
                      <tr key={s.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <p className="text-sm font-bold text-white uppercase">{s.topic}</p>
                          <p className="text-[9px] text-slate-500 font-medium">ID: {s.id.slice(0, 8)}</p>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-300 uppercase">S: {s.student?.full_name}</span>
                            <span className="text-[10px] font-bold text-slate-300 uppercase">C: {s.counselor?.full_name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            {s.scheduled_at ? new Date(s.scheduled_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest ${SESSION_STATUS_STYLES[s.status] || ''}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                              onClick={() => openSessionDetail(s)}
                              className="w-8 h-8 rounded-lg glass-admin flex items-center justify-center hover:bg-white/20 text-white transition-all border border-white/10"
                             >
                                <Eye className="w-4 h-4" />
                             </button>
                             <select 
                               onChange={(e) => handleSessionUpdate(s.id, e.target.value)}
                               value={s.status}
                               className="bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase p-1"
                             >
                               <option value="pending">Pending</option>
                               <option value="confirmed">Confirmed</option>
                               <option value="completed">Completed</option>
                               <option value="cancelled">Cancelled</option>
                             </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

           {activeTab === 'analytics' && (
            <div className="space-y-8">
               <div className="grid lg:grid-cols-2 gap-8">
                  <div className="glass-admin p-8">
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Financial Flow</h3>
                     <FinancialsChart data={financialChartData} />
                  </div>
                  <div className="glass-admin p-8">
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">User Growth</h3>
                     <GrowthChart data={growthData} />
                  </div>
               </div>

               <div className="grid lg:grid-cols-2 gap-8">
                  <div className="glass-admin p-8">
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Stream Concentration</h3>
                     <StreamDistribution data={streamChartData} />
                  </div>
                  <div className="glass-admin p-8">
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Revenue Per Stream</h3>
                     <StreamRevenueChart data={streamRevenueData} />
                  </div>
               </div>

               <div className="grid lg:grid-cols-2 gap-8">
                  <div className="glass-admin p-8">
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Rating Distribution</h3>
                     <RatingDistribution data={ratingData} />
                  </div>
                  <div className="glass-admin p-8">
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Topic Popularity</h3>
                     <TopicPopularity data={topicData} />
                  </div>
               </div>

               <div className="glass-admin p-8">
                  <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">Peak Activity Heatmap</h3>
                  <ActivityHeatmap data={peakActivityData} />
               </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="glass-admin p-8 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">System Audit Trail</h3>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black">
                   <Info className="w-3 h-3" />
                   LAST 50 ACTIONS RETAINED IN CACHE
                </div>
              </div>

              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <div className="shrink-0 py-1">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                        log.status === 'warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                        'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{log.action}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">{new Date(log.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <p className="text-xs font-bold text-slate-300 uppercase leading-none">{log.entity}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{log.details}</p>
                    </div>
                  </div>
                ))}
                {auditLogs.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <History className="w-12 h-12 text-white/5 mx-auto" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No audit data captured in this cycle</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'controls' && (
            <div className="grid lg:grid-cols-2 gap-8">
               <div className="glass-admin p-8 space-y-8">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">System Protocols</h3>
                  <div className="grid gap-4">
                     <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <Cpu className="w-7 h-7 text-[var(--admin-accent)]" />
                           <h4 className="text-sm font-black text-white uppercase">Neural Seed</h4>
                        </div>
                        <Button onClick={handleSeed} disabled={actionLoading === 'seed'}>Execute</Button>
                     </div>
                     <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <Trash2 className="w-7 h-7 text-rose-500" />
                           <h4 className="text-sm font-black text-white uppercase">Grid Purge</h4>
                        </div>
                        <Button onClick={handlePurge} variant="destructive" disabled={actionLoading === 'purge'}>Execute</Button>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
