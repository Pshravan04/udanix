import { 
  Search, 
  MessageSquare, 
  Calendar, 
  Video, 
  ArrowRight,
  Sparkles,
  Clock,
  History
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-10 mt-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-light text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-light text-lg">Hello, Find the support you need today.</p>
        </div>
        <Link href="/student/directory">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 rounded-xl text-lg font-light shadow-lg shadow-blue-200">
            <Search className="w-5 h-5 mr-3" />
            Find Counselor
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Support Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Active Session
            </div>
            <Card className="border-none bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Video className="w-32 h-32" />
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-light">Session with Dr. Sarah Jenkins</h3>
                  <p className="text-blue-100 font-light italic">Started 12 minutes ago</p>
                </div>
                <div className="flex gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 border-none font-medium px-6">
                    Join Call
                  </Button>
                  <Button variant="link" className="text-white hover:text-blue-200 p-0 font-light text-sm">
                    Open Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                <Calendar className="w-3.5 h-3.5" />
                Upcoming Bookings
              </div>
              <Button variant="ghost" className="text-xs text-blue-600 font-medium p-0 h-auto">View All</Button>
            </div>
            <div className="space-y-4">
              <BookingItem 
                name="Michael Chen" 
                specialty="Career Guidance" 
                date="Tomorrow, April 23" 
                time="2:00 PM" 
                type="Consultation" 
              />
              <BookingItem 
                name="Elena Rodriguez" 
                specialty="Relationship Counseling" 
                date="Monday, April 26" 
                time="11:30 AM" 
                type="Follow-up" 
              />
            </div>
          </section>
        </div>

        {/* Side Panel: Quick Stats & History */}
        <div className="space-y-8">
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
              <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Your Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 divide-x divide-slate-100">
                <div className="p-6 text-center space-y-1">
                  <p className="text-2xl font-light text-slate-900">12</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Total Hours</p>
                </div>
                <div className="p-6 text-center space-y-1">
                  <p className="text-2xl font-light text-slate-900">3</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Active Plan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="py-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                <History className="w-3.5 h-3.5" />
                Recent History
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-100 px-6 pb-6">
              <HistoryItem name="Dr. Sarah Jenkins" date="Apr 18" price="$80" />
              <HistoryItem name="Michael Chen" date="Apr 15" price="$65" />
              <HistoryItem name="Aisha Khan" date="Apr 10" price="$85" />
              <Button variant="ghost" className="w-full text-slate-400 text-xs font-light mt-4 hover:bg-slate-50 border border-dashed border-slate-200 group">
                Full Session History
                <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function BookingItem({ name, specialty, date, time, type }: { name: string, specialty: string, date: string, time: string, type: string }) {
  return (
    <Card className="border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
              {name.charAt(0)}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</h4>
              <p className="text-xs text-slate-500">{specialty}</p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <Clock className="w-4 h-4 text-slate-400" />
              {date} · {time}
            </div>
            <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-normal text-[10px] uppercase">
              {type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HistoryItem({ name, date, price }: { name: string, date: string, price: string }) {
  return (
    <div className="flex items-center justify-between py-4 first:pt-2 last:pb-0">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-slate-800">{name}</p>
        <p className="text-[10px] text-slate-500 font-light">{date}</p>
      </div>
      <p className="text-sm font-light text-slate-900">{price}</p>
    </div>
  );
}
