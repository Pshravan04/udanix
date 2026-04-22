import Link from 'next/link';
import { Search, User, Sparkles, FlaskConical, Calculator, Palette, Star, MessageSquare, Calendar, ChevronRight, Clock, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight text-blue-700">UDANIX</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="#" className="hover:text-blue-600">Explore Streams</Link>
              <Link href="/student/directory" className="hover:text-blue-600">Counselors</Link>
              <Link href="#" className="hover:text-blue-600">Resources</Link>
              <Link href="#" className="hover:text-blue-600">Career Paths</Link>
              <Link href="#" className="hover:text-blue-600">Assessment</Link>
            </nav>
          </div>

          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search careers, courses..." className="pl-10 bg-slate-50 border-none h-10 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-600">
              <User className="w-5 h-5" />
            </Button>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-md px-5 h-10">
                Book Counseling
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 -z-10" />
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-32 text-center text-white space-y-8">
          <p className="text-sm font-medium tracking-[0.2em] uppercase opacity-90">Your Career Journey Starts Here</p>
          <h1 className="text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight">
            Get expert guidance on stream selection, career paths, entrance exams, and future opportunities.
          </h1>
          <p className="text-lg font-light opacity-90 max-w-2xl mx-auto">
            Make informed decisions with personalized counseling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button className="bg-white text-blue-600 hover:bg-slate-50 h-12 px-8 rounded-md font-medium">
              Take Free Assessment
            </Button>
            <Link href="/student/directory">
              <Button variant="link" className="text-white hover:text-blue-100 font-medium group">
                Talk to Counselor
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-20 max-w-3xl mx-auto">
            <div className="space-y-1">
              <p className="text-3xl font-semibold">50,000+</p>
              <p className="text-xs font-light tracking-wide uppercase opacity-80">Students Guided</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold">200+</p>
              <p className="text-xs font-light tracking-wide uppercase opacity-80">Expert Counselors</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold">95%</p>
              <p className="text-xs font-light tracking-wide uppercase opacity-80">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Your Stream */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Explore Your Stream</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Choose your path based on your interests, skills, and career goals. Each stream opens doors to unique opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StreamCard 
            title="Science Stream" 
            icon={<FlaskConical className="w-8 h-8" />} 
            color="bg-cyan-500" 
            subjects={['Physics', 'Chemistry', 'Biology', 'Mathematics']}
            description="Explore careers in STEM fields with cutting edge technology and research opportunities"
            options="150+ Career Options"
          />
          <StreamCard 
            title="Commerce Stream" 
            icon={<Calculator className="w-8 h-8" />} 
            color="bg-emerald-500" 
            subjects={['Accountancy', 'Business Studies', 'Economics', 'Finance']}
            description="Master business, finance, and economics to build a successful career in corporate world"
            options="120+ Career Options"
          />
          <StreamCard 
            title="Arts & Humanities" 
            icon={<Palette className="w-8 h-8" />} 
            color="bg-pink-500" 
            subjects={['History', 'Political Science', 'Psychology', 'Literature']}
            description="Pursue creative and analytical careers in media, design, law, and social sciences"
            options="100+ Career Options"
          />
        </div>
      </section>

      {/* Popular Career Paths */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Popular Career Paths</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Explore trending careers across different streams with detailed insights on growth, salary, and skills required</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-slate-100 p-1 rounded-full text-sm font-medium">
              <button className="px-8 py-2 rounded-full bg-white shadow-sm text-slate-900">Science</button>
              <button className="px-8 py-2 rounded-full text-slate-500">Commerce</button>
              <button className="px-8 py-2 rounded-full text-slate-500">Arts</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CareerCard title="Software Engineer" demand="High Demand" growth="22% annually" salary="₹8 - 25 LPA" duration="4 years" skills="Programming, Problem Solving" />
            <CareerCard title="Medical Doctor" demand="High Demand" growth="15% annually" salary="₹10 - 50 LPA" duration="5.5 years" skills="Medical Knowledge, Patient Care" />
            <CareerCard title="Data Scientist" demand="High Demand" growth="28% annually" salary="₹12 - 30 LPA" duration="4 years" skills="Statistics, Python" />
            <CareerCard title="Civil Engineer" demand="Medium Demand" growth="12% annually" salary="₹6 - 20 LPA" duration="4 years" skills="AutoCAD, Structural Design" />
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-8 h-12 text-slate-600 border-slate-200">
              Explore All Careers (500+)
            </Button>
          </div>
        </div>
      </section>

      {/* Expert Career Counselors */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Expert Career Counselors</h2>
            <p className="text-slate-500">Connect with certified professionals for personalized guidance</p>
          </div>
          <Link href="/student/directory">
            <Button variant="outline" className="rounded-md px-6 text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm">
              View All Counselors
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CounselorRowCard 
            name="Dr. Priya Sharma" 
            title="PhD in Career Counseling" 
            rating="4.9" 
            reviews="2345" 
            sessions="5000" 
            exp="12" 
            tags={['Career Planning', 'Stream Selection', 'Abroad Education']} 
          />
          <CounselorRowCard 
            name="Mr. Rajesh Kumar" 
            title="M.Ed. Career Counselor" 
            rating="4.8" 
            reviews="1876" 
            sessions="4200" 
            exp="15" 
            tags={['Engineering', 'Medical', 'Entrance Exams']} 
          />
        </div>
      </section>

      {/* Career Assessment Tests */}
      <section className="py-24 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Career Assessment Tests</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Take scientifically designed tests to discover your interests, aptitude, and ideal career paths</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AssessmentCard 
              title="Psychometric Test" 
              desc="Deep dive into your personality traits and natural inclinations" 
              questions="45" 
              time="20 mins" 
            />
            <AssessmentCard 
              title="Aptitude Test" 
              desc="Evaluate your numerical, logical, and verbal reasoning abilities" 
              questions="60" 
              time="40 mins" 
            />
            <AssessmentCard 
              title="Interest Inventory" 
              desc="Align your career choices with your passion and daily interests" 
              questions="30" 
              time="15 mins" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-white/50 text-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 UDANIX Career Guidance Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function StreamCard({ title, icon, color, subjects, description, options }: any) {
  return (
    <Card className="border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`h-40 ${color} flex items-center justify-center text-white relative`}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center z-10">
          {icon}
        </div>
      </div>
      <CardContent className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-light">{description}</p>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Key Subjects:</p>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s: string) => (
              <Badge key={s} variant="secondary" className="bg-slate-50 text-slate-600 font-normal hover:bg-slate-100">{s}</Badge>
            ))}
            <Badge variant="secondary" className="bg-slate-50 text-slate-600 font-normal hover:bg-slate-100">+2 more</Badge>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{options}</span>
          <Button size="sm" className={`rounded-md px-6 ${color} hover:opacity-90 border-none group`}>
            Explore Stream
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CareerCard({ title, demand, growth, salary, duration, skills }: any) {
  return (
    <Card className="border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-800 leading-tight">{title}</h3>
          <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none text-[10px] font-bold px-2 py-0.5">{demand}</Badge>
        </div>
        <p className="text-xs text-slate-500 font-light leading-relaxed">Design, develop, and maintain software applications and systems for various industries</p>
        <div className="grid grid-cols-2 gap-y-4 pt-2">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-[8px] text-slate-400 uppercase font-bold leading-none">Growth Rate</p>
              <p className="text-xs font-semibold text-slate-700">{growth}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-blue-600 font-bold text-lg">₹</p>
            <div>
              <p className="text-[8px] text-slate-400 uppercase font-bold leading-none">Salary Range</p>
              <p className="text-xs font-semibold text-slate-700">{salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <div>
              <p className="text-[8px] text-slate-400 uppercase font-bold leading-none">Duration</p>
              <p className="text-xs font-semibold text-slate-700">{duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-orange-500" />
            <div>
              <p className="text-[8px] text-slate-400 uppercase font-bold leading-none">4 Skills</p>
              <p className="text-xs font-semibold text-slate-700 truncate max-w-[80px]">{skills}</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" className="w-full text-xs font-light text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 group">
          View Details
          <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

function CounselorRowCard({ name, title, rating, reviews, sessions, exp, tags }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
      <CardContent className="p-8">
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-100 relative">
            <span className="text-2xl font-light text-slate-400">{name.charAt(name.indexOf(' ') + 1)}</span>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-slate-800">{name}</h3>
                <p className="text-sm text-blue-600 font-medium flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {title}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 font-semibold text-slate-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {rating} <span className="text-slate-400 font-normal text-xs">({reviews})</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{sessions} sessions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <p className="font-bold text-slate-900">{exp} years</p>
                <p className="font-light">experience</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t: string) => (
                  <Badge key={t} variant="secondary" className="bg-slate-100 text-slate-600 font-normal text-[10px] hover:bg-slate-200">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Button variant="ghost" className="rounded-md border border-slate-100 text-slate-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-md">
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AssessmentCard({ title, desc, questions, time }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:border-blue-200 transition-colors bg-white">
      <CardContent className="p-8 space-y-6">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 font-light leading-relaxed">{desc}</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {questions} Qs</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {time}</span>
          </div>
          <Button variant="link" className="text-blue-600 text-xs font-bold p-0 h-auto">
            Start Test <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
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
