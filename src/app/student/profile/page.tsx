'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, GraduationCap, BookOpen, Star, Calendar,
  Edit3, Camera, CheckCircle2, Award, Target, Clock, Upload, Save, ArrowRight,
  Globe, Bell, Shield, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

import { StudentSidebar } from '@/components/dashboard/student-sidebar';
import { fadeUpStagger as fadeUp } from '@/lib/animations';
import { Profile, Session } from '@/types';

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"                                                                                                                                                                              
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const STATS = [
  { label: 'Sessions Done', value: '12', icon: Calendar, color: '#EFF6FF', iconColor: '#0056D2' },
  { label: 'Avg. Rating', value: '4.9', icon: Star, color: '#FEF9C3', iconColor: '#B45309' },
  { label: 'Goals Met', value: '68%', icon: Target, color: '#F0FDF4', iconColor: '#059669' },
  { label: 'Hours Guided', value: '18h', icon: Clock, color: '#FAF5FF', iconColor: '#7C3AED' },
];

const ACHIEVEMENTS = [
  { title: 'First Session', desc: 'Completed your first counseling session', earned: true },
  { title: 'Goal Setter', desc: 'Set 3+ career goals in your profile', earned: true },
  { title: 'Consistent Learner', desc: 'Attended 5 sessions in a row', earned: false },
  { title: 'Top Rated', desc: 'Maintained a 5-star session average', earned: false },
];

const RECENT_SESSIONS = [
  { counselor: 'Dr. Sarah Jenkins', topic: 'Career Roadmap Planning', date: 'Apr 22, 2026', rating: 5 },
  { counselor: 'Michael Chen', topic: 'Resume & LinkedIn Review', date: 'Apr 18, 2026', rating: 5 },
  { counselor: 'Aisha Khan', topic: 'College Application Strategy', date: 'Apr 10, 2026', rating: 4 },
];

export default function StudentProfile() {
  const supabase = useMemo(() => createClient(), []);
  const [studentStats, setStudentStats] = useState({ sessions: 0, rating: 5.0, goals: '0%' });
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    stream: '',
    class: '',
    school: '',
    linkedin: '',
    goal: '',
    interests: [] as string[],
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;              

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setForm({
          name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          stream: data.stream || '',
          class: data.class || '',
          school: data.school || '',
          linkedin: data.linkedin || '',
          goal: data.bio || '',
          interests: data.interests || [],
        });
        
        // Update stats with real data
        setStudentStats({
          sessions: data.sessions_count || 0,
          rating: data.rating || 5.0,
          goals: '72%' // Placeholder for now
        });
      }

      // Fetch Recent Sessions
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*, profiles:counselor_id(full_name)')
        .eq('student_id', user.id)
        .order('start_time', { ascending: false })
        .limit(3);
      if (sessionData) setRecentSessions(sessionData);

      setLoading(false);
    }
    loadProfile();
  }, [supabase]);


  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: form.name,
        email: form.email,
        location: form.location,
        stream: form.stream,
        class: form.class,
        school: form.school,
        linkedin: form.linkedin,
        bio: form.goal,
        interests: form.interests,
        updated_at: new Date().toISOString(),
      });

    if (!error) {
      setEditing(false);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#0056D2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex p-5 gap-8">
      <StudentSidebar />

      <main className="flex-1 space-y-8 pb-16 pr-4 overflow-x-hidden">
        {/* ─── Header Banner ─── */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-udanix-blue to-[#1A7AF8] p-10 text-white shadow-2xl shadow-blue-900/10">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-[2rem] bg-white/20 border-4 border-white/40 flex items-center justify-center text-4xl font-black text-white backdrop-blur-md shadow-2xl">
                  {form.name?.charAt(0) || 'S'}
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-udanix-blue" />
                </button>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-[34px] font-black tracking-tighter uppercase leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{form.name}</h1>
                  <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-emerald-400 text-[#064E3B] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 italic">
                    ✓ Verified Student
                  </span>
                </div>
                <p className="text-white/70 text-base font-bold uppercase tracking-widest">{form.school} · {form.stream} · {form.class}</p>
                <div className="flex items-center gap-6 text-sm text-white/80 font-medium">
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10"><MapPin className="w-4 h-4 text-emerald-300" />{form.location}</span>
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10"><Mail className="w-4 h-4 text-emerald-300" />{form.email}</span>
                </div>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-3 px-8 py-4 bg-white text-udanix-blue rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ─── Stats Row ─── */}
        <motion.div initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Sessions Done', value: studentStats.sessions.toString(), icon: Calendar, color: '#F43F5E', bgColor: '#FFF1F2' },
            { label: 'Avg. Rating', value: studentStats.rating.toFixed(1), icon: Star, color: '#FBBF24', bgColor: '#FFFBEB' },
            { label: 'Goals Met', value: studentStats.goals, icon: Target, color: '#059669', bgColor: '#F0FDF4' },
            { label: 'Hours Guided', value: `${studentStats.sessions * 1.5}h`, icon: Clock, color: '#6366F1', bgColor: '#EEF2FF' },
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i + 1} className="bg-white border border-[#E5E7EB] rounded-[32px] p-7 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: s.bgColor }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{s.label}</span>
              </div>
              <p className="text-[34px] font-black text-[#111827] tracking-tighter leading-none">{s.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Tabs ─── */}
        <div className="flex gap-8 border-b border-slate-100 pb-0">
          {([['overview', 'Core Intelligence'], ['settings', 'Network Tuning']] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-4 text-[11px] font-black uppercase tracking-[0.25em] transition-all relative ${activeTab === id
                ? 'text-udanix-blue'
                : 'text-[#9CA3AF] hover:text-[#4B5563]'
                }`}
            >
              {label}
              {activeTab === id && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-udanix-blue rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About / Goal Editor */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[#111827] text-sm font-black uppercase tracking-[0.2em]">Profile Strategy & Core DNA</h2>
                </div>
                {editing ? (
                  <textarea
                    className="w-full h-32 text-sm text-[#4B5563] font-medium leading-relaxed bg-[#F9FAFB] border-2 border-slate-100 rounded-2xl p-5 resize-none focus:outline-none focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue/30 transition-all font-mono italic"
                    value={form.goal}
                    onChange={e => setForm({ ...form, goal: e.target.value })}
                  />
                ) : (
                  <p className="text-[#4B5563] text-sm font-medium leading-[1.8] italic">{form.goal || 'Define your primary objective to optimize neural matching.'}</p>
                )}
                <div className="mt-8 pt-8 border-t border-slate-50">
                  <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] mb-4">Domain Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {form.interests.map(tag => (
                      <span key={tag} className="text-[10px] font-black px-4 py-2 bg-slate-50 text-udanix-blue rounded-xl border border-slate-100 uppercase tracking-widest group cursor-pointer hover:bg-udanix-blue hover:text-white transition-all">
                        {tag}
                      </span>
                    ))}
                    {editing && (
                      <button className="text-[10px] font-black px-4 py-2 bg-transparent text-slate-300 rounded-xl border-2 border-dashed border-slate-100 hover:border-udanix-blue hover:text-udanix-blue transition-all uppercase tracking-widest">
                        + Add Node
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Personal Details Editor */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
                <h2 className="text-[#111827] text-sm font-black uppercase tracking-[0.2em] mb-8">Personal Specification</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { label: 'Full Identity', field: 'name' as const, icon: User },
                    { label: 'Hyper-Mail', field: 'email' as const, icon: Mail },
                    { label: 'Comms Link', field: 'phone' as const, icon: Phone },
                    { label: 'Geo Location', field: 'location' as const, icon: MapPin },
                    { label: 'Academic Stream', field: 'stream' as const, icon: BookOpen },
                    { label: 'Base Institution', field: 'school' as const, icon: GraduationCap },
                  ].map(({ label, field, icon: Icon }) => (
                    <div key={field} className="space-y-2">
                      <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] block">{label}</label>
                      {editing ? (
                        <input
                          value={form[field]}
                          onChange={e => setForm({ ...form, [field]: e.target.value })}
                          className="w-full text-sm font-bold text-[#111827] bg-[#F9FAFB] border-2 border-slate-50 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue/30 transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-3 bg-slate-50 px-5 py-3.5 rounded-xl border border-slate-100/50">
                          <Icon className="w-4 h-4 text-udanix-blue" />
                          <span className="text-sm text-[#111827] font-black tracking-tight">{form[field] || 'NOT_SET'}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {editing && (
                  <div className="mt-10 flex gap-4 pt-8 border-t border-slate-50">
                    <button onClick={handleSave} disabled={saving} className="flex-1 bg-udanix-blue text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {saving ? 'UPDATING...' : 'SYNC_PROFILE'}
                    </button>
                    <button onClick={() => setEditing(false)} className="px-10 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">
                      ABORT
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Recent Sessions */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[#111827] text-sm font-black uppercase tracking-[0.2em]">Recent Interaction History</h2>
                  <button className="text-[10px] font-black text-udanix-blue uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                    FULL LOGS <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentSessions.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic italic">No active syncs found.</p>
                    </div>
                  ) : recentSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-udanix-blue/5 flex items-center justify-center text-udanix-blue text-sm font-black border border-udanix-blue/10 group-hover:bg-udanix-blue group-hover:text-white transition-all">
                          {session.profiles?.full_name?.charAt(0) || 'C'}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-black text-[#111827] text-sm tracking-tight uppercase">{session.profiles?.full_name || 'Counselor'}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{session.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-slate-900 mb-1">
                          {new Date(session.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                        </p>
                        <div className="flex gap-0.5 justify-end">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < (session.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-8 flex flex-col items-stretch">
              {/* Document Upload Card - High Fidelity */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/10 h-fit">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-all duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-udanix-blue flex items-center justify-center shadow-lg shadow-udanix-blue/20">
                     <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Verification Cloud</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Security ID', status: 'VERIFIED', color: '#10B981' },
                      { label: 'Academic.cert', status: 'PENDING', color: '#F59E0B' },
                      { label: 'Profile.node', status: 'ABSENT', color: '#EF4444' },
                    ].map(doc => (
                      <div key={doc.label} className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{doc.label}</span>
                        <span className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full border" style={{ borderColor: `${doc.color}50`, color: doc.color }}>{doc.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-udanix-blue hover:text-white transition-all shadow-xl active:scale-95">
                    UPLOAD_DOC
                  </button>
                </div>
              </div>

              {/* Achievements - High Fidelity */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
                <h2 className="text-[#111827] text-sm font-black uppercase tracking-[0.2em] mb-8">Node Milestones</h2>
                <div className="space-y-4">
                  {ACHIEVEMENTS.map(a => (
                    <div key={a.title} className={`flex items-start gap-4 p-4 rounded-2xl transition-all ${a.earned ? 'bg-emerald-50/50 border border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/5' : 'bg-slate-50/50 border border-slate-100 opacity-60'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.earned ? 'bg-white shadow-sm' : 'bg-slate-200/50'}`}>
                        <Award className={`w-5 h-5 ${a.earned ? 'text-emerald-500' : 'text-slate-400'}`} />
                      </div>
                      <div className="space-y-0.5 pt-0.5">
                        <p className={`text-[11px] font-black uppercase tracking-widest ${a.earned ? 'text-[#111827]' : 'text-slate-400'}`}>{a.title}</p>
                        <p className="text-[11px] font-medium text-slate-400 leading-tight">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Preferences */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bento-card p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                <Bell className="w-4.5 h-4.5 text-[#0056D2]" />
              </div>
              <h2 className="font-bold text-[#111827] text-base">Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Session Reminders', sub: 'Get notified 30 mins before a session', on: true },
                { label: 'New Messages', sub: 'When a counselor sends a message', on: true },
                { label: 'Weekly Report', sub: 'Your weekly progress digest', on: false },
                { label: 'Platform Updates', sub: 'New features and announcements', on: false },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.sub}</p>
                  </div>
                  <button className={`w-11 h-6 rounded-full transition-colors relative ${item.on ? 'bg-[#0056D2]' : 'bg-[#E5E7EB]'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="bento-card p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-green-600" />
              </div>
              <h2 className="font-bold text-[#111827] text-base">Privacy & Security</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Change Password', icon: Shield },
                { label: 'Manage Connected Accounts', icon: Globe },
                { label: 'Download My Data', icon: Upload },
                { label: 'Delete Account', icon: User, danger: true },
              ].map(item => (
                <button key={item.label} className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${item.danger ? 'border-red-100 bg-red-50 text-red-500 hover:bg-red-100' : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]'}`}>
                  <span className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4" /> {item.label}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </main>
    </div>
  );
}
