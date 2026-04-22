'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Calendar, GraduationCap, Clock } from "lucide-react";
import { BookingDialog } from "./booking-dialog";

interface CounselorProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  languages: string[];
  isOnline: boolean;
  imageUrl?: string;
  price: string;
  experience?: string;
}

export function CounselorCard({
  name,
  specialty,
  rating,
  reviews,
  languages,
  isOnline,
  price,
  experience = "10+",
}: CounselorProps) {
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all duration-300 group bg-white">
      <CardHeader className="p-0">
        <div className="relative h-44 bg-slate-50 overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white shadow-sm">
              <span className="text-2xl font-semibold">{name.charAt(0)}</span>
            </div>
          </div>
          
          {isOnline && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-slate-100 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Live</span>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
            {price}/session
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">{name}</h3>
            <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {rating}
            </div>
          </div>
          <p className="text-xs font-medium text-blue-600 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {specialty}
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-[11px] text-slate-500 border-y border-slate-50 py-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-700">{experience} yrs</span> exp.
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-700">{reviews}</span> reviews
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-[44px] content-start">
          {languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="bg-slate-50 text-slate-500 hover:bg-slate-100 rounded px-2 py-0 font-normal text-[10px] border-slate-100 italic">
              {lang}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button variant="outline" size="sm" className="flex-1 text-xs font-bold text-slate-600 border-slate-200 hover:bg-slate-50 h-9">
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          Chat
        </Button>
        <BookingDialog 
          counselorName={name} 
          trigger={
            <Button size="sm" className="flex-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 h-9 shadow-md shadow-blue-100">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Book
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
