'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Video, Calendar } from "lucide-react";
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
}

export function CounselorCard({
  name,
  specialty,
  rating,
  reviews,
  languages,
  isOnline,
  price,
}: CounselorProps) {
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-slate-100">
          {/* Placeholder for counselor image */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <span className="text-4xl font-light">{name.charAt(0)}</span>
          </div>
          {isOnline && (
            <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600 border-none px-2 py-0.5 text-[10px] uppercase tracking-wider">
              Online
            </Badge>
          )}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-slate-900 border border-slate-200">
            {price}/hr
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">{name}</h3>
          <p className="text-sm font-medium text-blue-600">{specialty}</p>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-900">{rating}</span>
          <span>({reviews} reviews)</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 rounded px-2 py-0 font-normal text-[11px]">
              {lang}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 grid grid-cols-2 gap-3">
        <Button variant="outline" size="sm" className="w-full text-slate-700 border-slate-200">
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat
        </Button>
        <BookingDialog 
          counselorName={name} 
          trigger={
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Book
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
