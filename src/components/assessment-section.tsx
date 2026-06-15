"use client";

import { motion } from "framer-motion";
import { 
  Clock, 
  ClipboardList, 
  Users, 
  BarChart, 
  ArrowRight,
  Sparkles,
  Target,
  BrainCircuit,
  UserCheck
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: string;
  completed: string;
  level: string;
  icon: React.ReactNode;
}

const assessments: Assessment[] = [
  {
    id: "interest",
    title: "Career Interest",
    description: "Discover your interests and find careers that match your personality and passions.",
    duration: "15 mins",
    questions: "50 Qs",
    completed: "45k+",
    level: "Beginner",
    icon: <Target className="w-6 h-6" />
  },
  {
    id: "stream",
    title: "Stream Selection",
    description: "Determine which stream (Science/Commerce/Arts) is best suited for your skills.",
    duration: "20 mins",
    questions: "40 Qs",
    completed: "38k+",
    level: "Beginner",
    icon: <BrainCircuit className="w-6 h-6" />
  },
  {
    id: "aptitude",
    title: "Aptitude & Skills",
    description: "Evaluate your analytical, logical, and creative skills to identify core strengths.",
    duration: "30 mins",
    questions: "60 Qs",
    completed: "28k+",
    level: "Intermediate",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: "personality",
    title: "Personality Profile",
    description: "Understand your personality type and how it influences your career preferences.",
    duration: "25 mins",
    questions: "45 Qs",
    completed: "32k+",
    level: "Intermediate",
    icon: <UserCheck className="w-6 h-6" />
  }
];

export function AssessmentSection() {
  const { user, setLoginModalOpen } = useAuth();
  const router = useRouter();

  const handleCTA = (e: React.MouseEvent, testId: string) => {
    e.preventDefault();
    if (!user) {
      setLoginModalOpen(true);
    } else {
      router.push(`/student/assessment?type=${testId}`);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-white border-t border-[#d2d2d7]">
      <div className="max-w-6xl relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mb-16 text-center sm:text-left mx-auto sm:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-slate-200"
            >
              <Sparkles className="w-4 h-4 text-[#007AFF]" />
              <span className="text-[#515154] text-xs font-medium">Scientific Methods</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              Career Assessments
            </h2>
            <p className="text-lg text-[#515154] font-medium max-w-2xl sm:mr-auto mx-auto sm:mx-0 px-4 sm:px-0">
              Discover your true potential with scientifically designed tests backed by psychological research and industry data.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assessments.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className="bg-[#f5f5f7] rounded-3xl p-6 sm:p-8 border border-[#d2d2d7] shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                
                {/* Icon Header */}
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#007AFF] mb-6 shadow-sm">
                  {test.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-[#1d1d1f] tracking-tight">
                  {test.title}
                </h3>
                
                <p className="text-sm text-[#515154] mb-8 leading-relaxed font-medium">
                  {test.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Duration</span>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#515154]" />
                        <span className="text-xs font-semibold text-[#1d1d1f]">{test.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Format</span>
                    <div className="flex items-center gap-1.5">
                        <ClipboardList className="w-3.5 h-3.5 text-[#515154]" />
                        <span className="text-xs font-semibold text-[#1d1d1f]">{test.questions}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Students</span>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#515154]" />
                        <span className="text-xs font-semibold text-[#1d1d1f]">{test.completed}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Level</span>
                    <div className="flex items-center gap-1.5">
                        <BarChart className="w-3.5 h-3.5 text-[#515154]" />
                        <span className="text-xs font-semibold text-[#1d1d1f]">{test.level}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={(e) => handleCTA(e, test.id)}
                    className="w-full h-12 bg-white hover:bg-[#e5e5ea] text-[#007AFF] border border-slate-200 rounded-full transition-colors font-medium text-sm flex items-center justify-center gap-2"
                  >
                    Start Assessment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
