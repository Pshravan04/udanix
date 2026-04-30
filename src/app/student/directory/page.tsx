'use client';

import { useState, useEffect } from 'react';
import { CounselorCard } from '@/components/counselor-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Sparkles, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { StudentSidebar } from '@/components/dashboard/student-sidebar';

import { Profile } from '@/types';

export default function CounselorDirectory() {
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [counselors, setCounselors] = useState<Profile[]>([]);

  useEffect(() => {
    async function loadCounselors() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'counselor');

      if (data) {
        setCounselors(data);
      }
      setLoading(false);
    }
    loadCounselors();
  }, [supabase]);

  const filteredCounselors = counselors.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.stream?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex p-5 gap-8">
      <StudentSidebar />

      <main className="flex-1 space-y-12 pr-4 overflow-x-hidden">
        {/* Header Area */}
        <div className="relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 p-12 shadow-2xl shadow-slate-200/50 group">
          {/* Background Glitch/Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-udanix-blue/[0.03] to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-udanix-blue/10 blur-[120px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />

          <div className="absolute top-10 right-10 p-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <Sparkles className="w-48 h-48 text-slate-900" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-udanix-blue rounded-full" />
              <span className="bg-udanix-blue/10 text-udanix-blue px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                Neural Expert Network
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
              Find Your <br />
              <span className="text-udanix-blue/30">Vector Mentor</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg">
              Connect with 200+ certified professional nodes dedicated to your personalized career journey.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-5 z-40 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-slate-200/40 rounded-[2rem] p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 mx-2">
          <div className="relative flex-1 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-udanix-blue transition-colors" />
            </div>
            <Input
              placeholder="SEARCH_BY_SPECIALTY_OR_NAME..."
              className="pl-14 h-14 border-2 border-slate-50 bg-slate-50/50 rounded-2xl focus-visible:ring-0 focus-visible:border-udanix-blue/30 focus-visible:bg-white transition-all font-black text-[10px] uppercase tracking-widest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-14 px-8 border-2 border-slate-50 bg-white rounded-2xl text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-200 gap-3 transition-all active:scale-95 shadow-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Adaptive Filters
            </Button>
            <div className="w-px h-8 bg-slate-100 hidden md:block" />
            <div className="hidden lg:flex flex-col items-end px-2">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Active Nodes</p>
              <p className="text-[10px] font-bold text-udanix-blue uppercase tracking-widest leading-none">
                {filteredCounselors.length} Experts Ready
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center p-24">
            <Loader2 className="w-12 h-12 text-udanix-blue animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-2">
            {filteredCounselors.map((c) => (
              <CounselorCard
                key={c.id}
                id={c.id}
                name={c.full_name || 'Expert Counselor'}
                specialty={c.stream || 'Expert Consultant'}
                rating={c.rating || 5.0}
                languages={['English']}
                isOnline={true}
                price={`$${c.price_per_hour || 50}`}
                experience={c.experience || '10'}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
