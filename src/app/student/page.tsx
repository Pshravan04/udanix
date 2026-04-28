'use client';

import { motion } from 'framer-motion';
import { DashboardStats } from '@/components/dashboard/stat-cards';
import { UpcomingSessions } from '@/components/dashboard/upcoming-sessions';
import { StudentSidebar } from '@/components/dashboard/student-sidebar';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex p-5 gap-8">
      {/* Sidebar - Fixed/Sticky */}
      <StudentSidebar />

      {/* Main Content Area */}
      <main className="flex-1 space-y-10 pr-4">
        {/* Header Section */}
        <section className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <h1 className="text-[32px] font-black text-[#111827] tracking-tight flex items-center gap-3">
              Good morning, Aryan! 👋
            </h1>
            <p className="text-[#9CA3AF] text-base font-semibold">
              Your next session is Tomorrow, 4:00 PM
            </p>
          </div>

          <button className="bg-udanix-blue text-white px-10 py-4 rounded-[20px] text-base font-black shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Book Session
          </button>
        </section>

        {/* Stats Row */}
        <section>
          <DashboardStats />
        </section>

        {/* Upcoming Sessions Box */}
        <section className="max-w-[1000px]">
          <UpcomingSessions />
        </section>
      </main>
    </div>
  );
}
