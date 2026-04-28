'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, GraduationCap, BookOpen, Star, Calendar,
  Edit3, Camera, CheckCircle2, Award, Target, Clock, Upload, Save, ArrowRight,
  Globe, Bell, Shield, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

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
  const supabase = createClient();
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
      const { data: { user } } = await supabase.auth.getUser();u
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
      }
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
    <div className="space-y-8 pb-16">
      {/* ─── Header Banner ─── */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-[#0056D2] to-[#1A7AF8] p-8 text-white">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-[20px] bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl font-extrabold text-white backdrop-blur-sm">
                AS
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-float">
                <Camera className="w-4 h-4 text-[#0056D2]" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-extrabold tracking-tight">{form.name}</h1>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/20 border border-white/30 uppercase tracking-wider">
                  ✓ Verified Student
                </span>
              </div>
              <p className="text-white/70 text-sm mt-1">{form.school} · {form.stream} · {form.class}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-white/80 flex-wrap">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{form.location}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{form.email}</span>
              </div>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0056D2] rounded-xl text-sm font-bold shadow-float hover:shadow-float-lg transition-all"
            >
              <Edit3 className="w-4 h-4" />
              {editing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ─── Stats Row ─── */}
      <motion.div initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i + 1} className="bento-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color }}>
                <s.icon className="w-4.5 h-4.5" style={{ color: s.iconColor }} />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#111827] tracking-tight">{s.value}</p>
            <p className="text-[#9CA3AF] text-xs font-semibold mt-1">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── Tabs ─── */}
      <div className="flex gap-1 border-b border-[#E5E7EB] pb-0">
        {([['overview', 'Overview'], ['settings', 'Settings & Preferences']] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === id
              ? 'border-[#0056D2] text-[#0056D2]'
              : 'border-transparent text-[#9CA3AF] hover:text-[#4B5563]'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About / Goal Editor */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="bento-card p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#111827] text-base">About Me & Career Goal</h2>
              </div>
              {editing ? (
                <textarea
                  className="w-full h-28 text-sm text-[#4B5563] leading-relaxed bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2]"
                  value={form.goal}
                  onChange={e => setForm({ ...form, goal: e.target.value })}
                />
              ) : (
                <p className="text-[#4B5563] text-sm leading-[1.7]">{form.goal}</p>
              )}
              <div className="mt-5">
                <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Interests & Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {form.interests.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-[#EFF6FF] text-[#0056D2] rounded-lg border border-[#BFDBFE]">
                      {tag}
                    </span>
                  ))}
                  {editing && (
                    <button className="text-xs font-semibold px-3 py-1.5 bg-[#F9FAFB] text-[#9CA3AF] rounded-lg border border-dashed border-[#E5E7EB] hover:border-[#0056D2] hover:text-[#0056D2] transition-colors">
                      + Add Interest
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Personal Details Editor */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="bento-card p-7">
              <h2 className="font-bold text-[#111827] text-base mb-5">Personal Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', field: 'name' as const, icon: User },
                  { label: 'Email Address', field: 'email' as const, icon: Mail },
                  { label: 'Phone Number', field: 'phone' as const, icon: Phone },
                  { label: 'Location', field: 'location' as const, icon: MapPin },
                  { label: 'Stream', field: 'stream' as const, icon: BookOpen },
                  { label: 'School / College', field: 'school' as const, icon: GraduationCap },
                ].map(({ label, field, icon: Icon }) => (
                  <div key={field}>
                    <label className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1.5">{label}</label>
                    {editing ? (
                      <input
                        value={form[field]}
                        onChange={e => setForm({ ...form, [field]: e.target.value })}
                        className="w-full text-sm text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2]"
                      />
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-[#4B5563] font-medium py-2.5">
                        <Icon className="w-4 h-4 text-[#9CA3AF]" /> {form[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="mt-6 flex gap-3">
                  <div className="mt-6 flex gap-3">
                    <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setEditing(false)} className="btn-secondary text-sm py-2.5">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Recent Sessions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="bento-card p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#111827] text-base">Recent Sessions</h2>
                <button className="text-xs text-[#0056D2] font-semibold hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-4">
                {RECENT_SESSIONS.map(session => (
                  <div key={session.topic} className="flex items-start justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#0056D2] text-xs font-bold flex-shrink-0">
                        {session.counselor.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#111827]">{session.counselor}</p>
                        <p className="text-xs text-[#9CA3AF]">{session.topic}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-[#9CA3AF]">{session.date}</p>
                      <div className="flex gap-0.5 mt-1 justify-end">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < session.rating ? 'fill-amber-400 text-amber-400' : 'text-[#E5E7EB]'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Upload Documents */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="bento-card p-6">
              <h2 className="font-bold text-[#111827] text-sm mb-4">Documents & Verification</h2>
              <div className="space-y-3">
                {[
                  { label: 'Student ID Card', status: 'Verified', color: 'green' },
                  { label: 'School Certificate', status: 'Pending', color: 'amber' },
                  { label: 'Profile Photo', status: 'Missing', color: 'red' },
                ].map(doc => (
                  <div key={doc.label} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                    <p className="text-xs font-semibold text-[#4B5563]">{doc.label}</p>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${doc.color === 'green' ? 'bg-green-50 text-green-600' : doc.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'}`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
                <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[#0056D2]/30 rounded-xl text-[#0056D2] text-xs font-bold hover:bg-[#EFF6FF] transition-colors">
                  <Upload className="w-3.5 h-3.5" /> Upload Document
                </button>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="bento-card p-6">
              <h2 className="font-bold text-[#111827] text-sm mb-4">Achievements</h2>
              <div className="space-y-3">
                {ACHIEVEMENTS.map(a => (
                  <div key={a.title} className={`flex items-start gap-3 p-3 rounded-xl ${a.earned ? 'bg-[#F0FDF4] border border-green-100' : 'bg-[#F9FAFB] border border-[#E5E7EB] opacity-60'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.earned ? 'bg-green-100' : 'bg-[#E5E7EB]'}`}>
                      <Award className={`w-4 h-4 ${a.earned ? 'text-green-600' : 'text-[#9CA3AF]'}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${a.earned ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>{a.title}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5 leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="bento-card p-6">
              <h2 className="font-bold text-[#111827] text-sm mb-4">Social & Links</h2>
              <div className="space-y-2.5">
                {[
                  { icon: Linkedin, label: form.linkedin, color: '#0077B5' },
                  { icon: Globe, label: 'portfolio.aryan.dev', color: '#059669' },
                ].map((link, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                    <link.icon className="w-4 h-4" style={{ color: link.color }} />
                    <p className="text-xs font-medium text-[#4B5563] flex-1 truncate">{link.label}</p>
                    <Edit3 className="w-3.5 h-3.5 text-[#9CA3AF]" />
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
    </div>
  );
}
