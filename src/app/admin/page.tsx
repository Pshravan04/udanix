'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Users, AlertCircle, Clock, Search, ArrowRight, Loader2,
  Lock, Activity, Layers, Database, UserCheck, Trash2, 
  ShieldCheck, RefreshCw, Filter, LayoutGrid, Calendar,
  CheckCircle2, XCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { fadeUpStagger as fadeUp } from '@/lib/animations';
import { Profile } from '@/types';
import { 
  seedDummyData, updateVerificationStatus, deleteUser, 
  elevateToAdmin, getAllSessions, updateSessionStatus, 
  purgeAllData 
} from '@/lib/admin-actions';
import { toast } from 'sonner';

const STATUS_STYLES: Record<string, string> = {
  verified: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  pending: 'bg-amber-50 text-amber-600 border-amber-100',
  review: 'bg-rose-50 text-rose-600 border-rose-100',
};

const SESSION_STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  pending: 'bg-amber-50 text-amber-600 border-amber-100',
  completed: 'bg-blue-50 text-blue-600 border-blue-100',
  cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'counselors', label: 'Counselors', icon: ShieldCheck },
  { id: 'sessions', label: 'Sessions', icon: Calendar },
  { id: 'system', label: 'System Ops', icon: Database },
];

export default function AdminDashboard() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCounselors: 0,
    activeStudents: 0,
    totalGMV: 0,
    pendingVerifications: 0,
    activeSessions: 0
  });

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

  const loadAdminData = async () => {
    setLoading(true);
    const { data: allProfiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    const { data: allSessions } = await getAllSessions();
    
    if (allProfiles) {
      setProfiles(allProfiles);
      const counselorsOnly = allProfiles.filter(p => p.role === 'counselor');
      const studentsOnly = allProfiles.filter(p => p.role === 'student');
      const totalGMV = counselorsOnly.reduce((sum, c) => sum + ((c.sessions_count || 0) * (c.price_per_hour || 500)), 0);
      
      setStats({
        totalUsers: allProfiles.length,
        activeCounselors: counselorsOnly.length,
        activeStudents: studentsOnly.length,
        totalGMV,
        pendingVerifications: counselorsOnly.filter(c => !c.is_verified).length,
        activeSessions: allSessions?.length || 0
      });
    }

    if (allSessions) {
      setSessions(allSessions);
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
      toast.success(`Node ${!currentStatus ? 'authorized' : 'de-authorized'} successfully.`);
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
      await loadAdminData();
    } else {
      toast.error('Purge failed.');
    }
    setActionLoading(null);
  };

  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.full_name?.toLowerCase().includes(search.toLowerCase()) || 
                         p.email?.toLowerCase().includes(search.toLowerCase()) ||
                         p.stream?.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'counselors') return matchesSearch && p.role === 'counselor';
    return matchesSearch;
  });

  const filteredSessions = sessions.filter(s => 
    s.topic?.toLowerCase().includes(search.toLowerCase()) ||
    s.student?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.counselor?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && profiles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
           <Loader2 className="w-16 h-16 text-udanix-blue animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-udanix-blue rounded-full animate-ping" />
           </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[3rem] border border-slate-100 p-12 lg:p-20 text-center shadow-premium relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-udanix-blue/5 rounded-full blur-[100px] -ml-32 -mb-32" />

          <div className="relative z-10 space-y-10">
            <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto border border-rose-100 shadow-inner">
              <Lock className="w-10 h-10 text-rose-500" />
            </div>
            
            <div className="space-y-4">
              <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
                Access <span className="text-rose-500">Denied</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
                This node is restricted to system administrators. Authorized credentials are required to access the neural grid.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/" className="w-full">
                <Button 
                  className="w-full h-12 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center"
                >
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-32 pt-8">
      {/* ─── Header ─── */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-3">
            <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.25em] shadow-premium ring-4 ring-slate-900/5">
               Admin Terminal
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Node</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] flex items-center gap-4"
          >
            System <span className="text-udanix-blue drop-shadow-sm">Node</span>
          </motion.h1>
          <p className="text-slate-500 text-xl font-medium tracking-tight">Enterprise Infrastructure & Global Entity Management.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Last Sync</p>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Just now</p>
            </div>
            <Button 
              onClick={loadAdminData}
              variant="outline" 
              className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center hover:bg-slate-50 transition-all"
            >
              <RefreshCw className={`w-6 h-6 text-udanix-blue ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </div>
      </div>

      {/* ─── Navigation Tabs ─── */}
      <div className="flex flex-wrap items-center gap-3 p-2 bg-slate-100/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/60 sticky top-4 z-50 shadow-xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-udanix-blue shadow-premium translate-y-[-2px]' 
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-udanix-blue' : 'text-slate-400'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Main Content ─── */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, label: 'Expert Nodes', value: stats.activeCounselors.toString(), change: 'Verified Optic', color: 'emerald' },
                { icon: Calendar, label: 'Active Sessions', value: stats.activeSessions.toString(), change: 'Live Pulse', color: 'blue' },
                { icon: AlertCircle, label: 'Pending Ops', value: stats.pendingVerifications.toString(), change: 'Attention Req', color: 'red' },
              ].map((s, i) => (
                <div key={s.label} className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-premium hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all ${
                    s.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    s.color === 'red' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    'bg-udanix-blue/5 text-udanix-blue border-udanix-blue/10'
                  } group-hover:scale-110 shadow-sm`}>
                    <s.icon className="w-8 h-8" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-2">{s.value}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">{s.label}</p>
                    <p className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full ${s.color === 'red' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{s.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-udanix-blue/[0.02] rounded-full translate-x-32 -translate-y-32" />
                  <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-8 flex items-center gap-4">
                    <div className="w-3 h-10 bg-udanix-blue rounded-full" />
                    Recent Activity Pulse
                  </h3>
                  <div className="space-y-6">
                    {profiles.slice(0, 5).map((p, i) => (
                      <div key={p.id} className="flex items-center gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-udanix-blue group-hover:text-white transition-all shrink-0">
                          {p.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 uppercase tracking-tight">{p.full_name}</p>
                          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">{p.role} joined the protocol</p>
                        </div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter shrink-0">{i === 0 ? 'Just now' : `${i * 2}m ago`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20 group-hover:scale-125 transition-transform duration-700" />
                  <LayoutGrid className="w-12 h-12 mb-8 text-udanix-blue" />
                  <h3 className="text-2xl font-black tracking-tight uppercase mb-4 leading-tight">Database<br />Synchronization</h3>
                  <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Initialize system parameters and batch authorize global entities for platform testing.</p>
                  <Button 
                    onClick={handleSeed}
                    disabled={actionLoading === 'seed'}
                    className="w-full py-8 bg-udanix-blue hover:bg-blue-600 text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {actionLoading === 'seed' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Run Seed Protocol'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'counselors' && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-udanix-blue transition-colors" />
              <input
                type="text"
                placeholder={`Search ${activeTab} database (Name, Email, Stream)...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-20 pl-20 pr-10 rounded-[2.5rem] bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-lg outline-none focus:border-udanix-blue focus:ring-8 focus:ring-udanix-blue/5 transition-all font-medium shadow-premium"
              />
            </div>

            <div className="grid gap-6">
              {filteredProfiles.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-slate-100 p-24 text-center shadow-premium">
                   <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Search className="w-10 h-10 text-slate-200" />
                   </div>
                   <p className="text-slate-400 font-black uppercase tracking-widest text-lg">No matching entities found.</p>
                </div>
              ) : filteredProfiles.map((p, i) => (
                <motion.div
                  key={p.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col lg:flex-row items-center gap-10 shadow-premium hover:shadow-2xl transition-all group relative overflow-hidden"
                >
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black text-2xl shadow-inner group-hover:bg-udanix-blue group-hover:text-white transition-all shrink-0">
                    {p.full_name?.charAt(0) || 'U'}
                  </div>
                  
                  <div className="flex-1 min-w-0 text-center lg:text-left space-y-2">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                      <h4 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-udanix-blue transition-colors">
                        {p.full_name}
                      </h4>
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest w-fit mx-auto lg:mx-0">
                        {p.role}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-80 flex flex-wrap justify-center lg:justify-start gap-4">
                      <span>{p.email}</span>
                      <span className="text-slate-200">|</span>
                      <span>{p.stream || 'N/A'}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 shrink-0">
                    {p.role === 'counselor' && (
                      <span className={`text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-[0.2em] border shadow-sm ${p.is_verified ? STATUS_STYLES.verified : STATUS_STYLES.pending}`}>
                        {p.is_verified ? 'verified entity' : 'pending auth'}
                      </span>
                    )}
                    
                    <div className="flex items-center gap-3">
                      {p.role === 'counselor' && (
                        <Button 
                          onClick={() => handleVerify(p.id, !!p.is_verified)}
                          disabled={actionLoading === p.id}
                          size="sm" 
                          variant="outline"
                          className={`h-14 px-8 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            p.is_verified 
                            ? 'border-rose-100 text-rose-500 hover:bg-rose-50' 
                            : 'border-udanix-blue/20 text-udanix-blue hover:bg-udanix-blue/5'
                          }`}
                        >
                          {actionLoading === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (p.is_verified ? 'Revoke' : 'Authorize')}
                        </Button>
                      )}
                      
                      <Button 
                        onClick={() => handleDelete(p.id)}
                        disabled={actionLoading === p.id}
                        size="sm" 
                        variant="outline"
                        className="h-14 w-14 rounded-2xl border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all p-0"
                      >
                        {actionLoading === p.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'sessions' && (
          <motion.div
            key="sessions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-udanix-blue transition-colors" />
              <input
                type="text"
                placeholder="Search sessions database (Topic, Student, Counselor)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-20 pl-20 pr-10 rounded-[2.5rem] bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-lg outline-none focus:border-udanix-blue focus:ring-8 focus:ring-udanix-blue/5 transition-all font-medium shadow-premium"
              />
            </div>

            <div className="grid gap-6">
              {filteredSessions.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-slate-100 p-24 text-center shadow-premium">
                   <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Calendar className="w-10 h-10 text-slate-200" />
                   </div>
                   <p className="text-slate-400 font-black uppercase tracking-widest text-lg">No active sessions found.</p>
                </div>
              ) : filteredSessions.map((s, i) => (
                <motion.div
                  key={s.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col lg:flex-row items-center gap-10 shadow-premium hover:shadow-2xl transition-all group relative overflow-hidden"
                >
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black text-2xl shadow-inner group-hover:bg-udanix-blue group-hover:text-white transition-all shrink-0">
                    <Calendar className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 min-w-0 text-center lg:text-left space-y-2">
                    <h4 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-udanix-blue transition-colors">
                      {s.topic}
                    </h4>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-2 text-slate-900"><Users className="w-3 h-3" /> {s.student?.full_name}</span>
                      <span className="text-slate-200">→</span>
                      <span className="flex items-center gap-2 text-udanix-blue"><ShieldCheck className="w-3 h-3" /> {s.counselor?.full_name}</span>
                      <span className="text-slate-200">|</span>
                      <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {new Date(s.scheduled_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <span className={`text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-[0.2em] border shadow-sm ${SESSION_STATUS_STYLES[s.status as string] || 'bg-slate-50'}`}>
                      {s.status}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {s.status === 'pending' && (
                        <Button 
                          onClick={() => handleSessionUpdate(s.id, 'confirmed')}
                          disabled={actionLoading === s.id}
                          variant="outline"
                          className="w-12 h-12 rounded-xl border-emerald-100 text-emerald-500 hover:bg-emerald-50 p-0"
                        >
                          {actionLoading === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        </Button>
                      )}
                      {(s.status === 'pending' || s.status === 'confirmed') && (
                        <Button 
                          onClick={() => handleSessionUpdate(s.id, 'cancelled')}
                          disabled={actionLoading === s.id}
                          variant="outline"
                          className="w-12 h-12 rounded-xl border-rose-100 text-rose-500 hover:bg-rose-50 p-0"
                        >
                          {actionLoading === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-5 h-5" />}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'system' && (
          <motion.div
            key="system"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 gap-10"
          >
            <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-premium space-y-8">
               <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center">
                  <Database className="w-10 h-10 text-amber-600" />
               </div>
               <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Seed Protocol</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                 Inject high-fidelity dummy data into the production neural network for visual verification and testing of the dashboard components.
               </p>
               <Button 
                 onClick={handleSeed}
                 disabled={actionLoading === 'seed'}
                 className="h-16 px-10 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-2xl w-full shadow-2xl transition-all"
               >
                 {actionLoading === 'seed' ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : null}
                 Execute Database Seed
               </Button>
            </div>

            <div className="bg-white rounded-[3rem] border border-rose-100 p-12 shadow-premium space-y-8">
               <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center">
                  <Trash2 className="w-10 h-10 text-rose-600" />
               </div>
               <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Purge Protocol</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                 Immediately terminate all student, counselor, and session nodes. This action is irreversible and restricted to system administrators.
               </p>
               <Button 
                 onClick={handlePurge}
                 disabled={actionLoading === 'purge'}
                 variant="outline"
                 className="h-16 px-10 border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-black uppercase tracking-widest rounded-2xl w-full"
               >
                 {actionLoading === 'purge' ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : null}
                 Execute System Purge
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
