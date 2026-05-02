'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShieldCheck } from 'lucide-react';
import { BookingDialog } from './booking-dialog';
import Image from 'next/image';

interface CounselorProps {
  name: string;
  specialty: string;
  rating: number;
  languages: string[];
  isOnline: boolean;
  avatarUrl?: string | null;
  price: string;
  id: string;
  experience?: string;
  isVerified?: boolean;
}

export function CounselorCard({
  name,
  specialty,
  rating,
  languages,
  isOnline: initialIsOnline,
  avatarUrl,
  price,
  id,
  experience = '10+',
  isVerified = false,
}: CounselorProps) {
  const [liveStatus, setLiveStatus] = useState(initialIsOnline);

  useEffect(() => {
    const checkStatus = () => {
      if (name.includes('Jenkins') || name.includes('Sharma')) {
        const stored = localStorage.getItem('udanix_jenkins_live');
        if (stored !== null) setLiveStatus(stored === 'true');
      }
    };
    checkStatus();
    window.addEventListener('storage', checkStatus);
    return () => window.removeEventListener('storage', checkStatus);
  }, [name]);

  return (
    <Card className="overflow-hidden border-slate-100 hover:border-udanix-blue/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group bg-white rounded-[2rem]">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-[#F8FAFC] overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {avatarUrl ? (
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center text-slate-900 border border-slate-100 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black">
                    {name.charAt(0)}
                  </span>
                </div>
              )}

              {liveStatus && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-50">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>
              )}
            </div>
          </div>

          {liveStatus && (
            <div className="absolute top-5 left-5 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-slate-100/50 shadow-sm">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Live Node</span>
            </div>
          )}

          {isVerified && (
            <div className="absolute top-5 right-5 flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
            </div>
          )}

          <div className="absolute bottom-5 right-5 bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
            {price}/H
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-7 space-y-5">
        <div className="space-y-1.5">
          <div className="flex justify-between items-start">
            <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-udanix-blue transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 rounded-lg">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-black text-amber-700">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-udanix-blue/30" />
            <p className="text-[10px] font-black uppercase tracking-widest text-udanix-blue">{specialty}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 py-4 border-y border-slate-100">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Experience</p>
            <p className="text-xs font-bold text-slate-900">{experience} Years</p>
          </div>
          <div className="w-px h-6 bg-slate-100" />
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verification</p>
            <p className={`text-xs font-bold ${isVerified ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isVerified ? 'Validated ✓' : 'Pending'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {languages.slice(0, 3).map((lang) => (
            <span key={lang} className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-2 py-1 bg-slate-50 rounded-lg">
              {lang}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-7 pt-0 flex gap-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-slate-100 hover:bg-slate-50 h-11 rounded-xl transition-all"
        >
          Query
        </Button>
        <BookingDialog
          counselorId={id}
          counselorName={name}
          trigger={
            <Button
              size="sm"
              className="flex-[1.5] text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 hover:bg-slate-800 h-11 rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-95 text-white"
            >
              Initialize
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
