'use client';

import { useState } from 'react';
import { CounselorCard } from '@/components/counselor-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

const MOCK_COUNSELORS = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Clinical Psychology",
    rating: 4.9,
    reviews: 124,
    languages: ["English", "Spanish"],
    isOnline: true,
    price: "$80",
    experience: "12",
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Career Guidance",
    rating: 4.8,
    reviews: 89,
    languages: ["English", "Mandarin"],
    isOnline: false,
    price: "$65",
    experience: "8",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    specialty: "Relationship Counseling",
    rating: 4.9,
    reviews: 56,
    languages: ["English", "Spanish", "Portuguese"],
    isOnline: true,
    price: "$75",
    experience: "10",
  },
  {
    id: 4,
    name: "David Wilson",
    specialty: "Stress Management",
    rating: 4.7,
    reviews: 210,
    languages: ["English"],
    isOnline: true,
    price: "$90",
    experience: "15",
  },
  {
    id: 5,
    name: "Aisha Khan",
    specialty: "Child & Adolescent",
    rating: 5.0,
    reviews: 42,
    languages: ["English", "Urdu", "Hindi"],
    isOnline: false,
    price: "$85",
    experience: "7",
  }
];

export default function CounselorDirectory() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-12 pb-20">
      {/* Header Area */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-10 text-white">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge className="bg-blue-500/20 text-blue-300 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
            Expert Network
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find Your Mentor</h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Connect with 200+ certified professional counselors dedicated to your personalized career journey.
          </p>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            placeholder="Search by specialty, library or name..." 
            className="pl-11 h-12 border-none bg-slate-50/50 rounded-xl focus-visible:ring-blue-500/20 focus-visible:bg-white transition-all shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 border-slate-100 bg-white rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50 gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
          <div className="w-px h-6 bg-slate-100 hidden md:block" />
          <p className="text-xs font-bold text-slate-400 px-2 hidden lg:block">
            Showing <span className="text-slate-900">{MOCK_COUNSELORS.length}</span> active experts
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_COUNSELORS.map((counselor) => (
          <CounselorCard key={counselor.id} {...counselor} />
        ))}
      </div>
    </div>
  );
}
