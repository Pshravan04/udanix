'use client';

import { useState } from 'react';
import { CounselorCard } from '@/components/counselor-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

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
  }
];

export default function CounselorDirectory() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Available Counselors</h1>
          <p className="text-slate-500 font-light">Find and connect with professional counselors that match your needs.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by specialty or name..." 
              className="pl-10 h-10 border-slate-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 border-slate-200 bg-white">
            <Filter className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_COUNSELORS.map((counselor) => (
          <CounselorCard key={counselor.id} {...counselor} />
        ))}
      </div>
    </div>
  );
}
