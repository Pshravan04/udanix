import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Settings, 
  User, 
  Video,
  FileText,
  TrendingUp,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CounselorDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Counselor Console</h1>
          <p className="text-slate-500 font-light">Welcome back, Dr. Jenkins. Here is your overview for today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-700">
            <Settings className="w-4 h-4 mr-2" />
            Profile Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Go Live
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<TrendingUp className="text-blue-600" />} label="Total Earnings" value="$1,240" trend="+12% this month" />
        <StatCard icon={<User className="text-green-600" />} label="Active Clients" value="48" trend="+4 new this week" />
        <StatCard icon={<Clock className="text-purple-600" />} label="Hours Consulted" value="124h" trend="8.5h per week avg" />
        <StatCard icon={<Award className="text-amber-600" />} label="Avg Rating" value="4.9" trend="From 124 reviews" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-white/50 py-4">
            <CardTitle className="text-lg font-medium">Upcoming Sessions</CardTitle>
            <CardDescription className="text-xs">Your confirmed appointments for today</CardDescription>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100">
            <SessionItem name="Alex Rivera" time="10:00 AM - 11:00 AM" type="Video Call" status="Confirmed" />
            <SessionItem name="Jessica Wu" time="01:30 PM - 02:00 PM" type="Quick Chat" status="Confirmed" />
            <SessionItem name="Theodore Vance" time="04:00 PM - 05:00 PM" type="Voice Consultation" status="Pending Approval" />
          </CardContent>
        </Card>

        {/* Quick Actions / Notifications */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-lg font-medium">Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium">Google Calendar</span>
                </div>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Synced</Badge>
              </div>
              <Button variant="secondary" className="w-full text-xs font-medium">
                Update Weekly Slots
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-blue-600 text-white">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <h4 className="font-semibold italic">Udanix Academy</h4>
                <p className="text-xs text-blue-100 font-light">New certification course available: "Distance Learning Emotional Support Patterns"</p>
              </div>
              <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-slate-50 border-none">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <Card className="border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
      <CardContent className="pt-6 flex flex-col items-center text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
          <p className="text-2xl font-light text-slate-900">{value}</p>
          <p className="text-[10px] font-medium text-slate-500">{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SessionItem({ name, time, type, status }: { name: string, time: string, type: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-900">{name}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
            <span className="text-slate-300">•</span>
            <span>{type}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant={status === 'Confirmed' ? 'outline' : 'secondary'} className={
          status === 'Confirmed' 
          ? 'text-blue-600 bg-blue-50 border-blue-100' 
          : 'text-amber-600 bg-amber-50 border-amber-100'
        }>
          {status}
        </Badge>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600">
            <Video className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600">
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600">
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
