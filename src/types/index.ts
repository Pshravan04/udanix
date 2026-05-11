export interface Profile {
  id: string;
  full_name: string | null;
  email?: string | null;
  role: 'student' | 'counselor' | 'admin' | null;
  stream: string | null;
  class: string | null;
  school: string | null;
  linkedin: string | null;
  bio: string | null;
  interests: string[] | null;
  sessions_count: number | null;
  price_per_hour: number | null;
  is_verified: boolean | null;
  rating: number | null;
  avatar_url?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  progress?: string | null;
  experience?: string | null;
}

export interface Session {
  id: string;
  student_id: string;
  counselor_id: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed' | 'pending';
  topic: string;
  type: 'video' | 'audio' | 'chat';
  rating?: number | null;
  profiles?: Partial<Profile>;
  student?: Partial<Profile>;
  counselor?: Partial<Profile>;
  scheduled_at?: string;
}

export interface AdminStats {
  totalUsers: number;
  students: number;
  counselors: number;
  totalSessions: number;
  completedSessions: number;
  activeSessions: number;
  totalGMV: number;
  avgSessionPrice: number;
  sessionChartData: { name: string; sessions: number }[];
  studentGrowthData: { name: string; users: number }[];
  revenueChartData: { name: string; revenue: number }[];
  growthMetrics: {
    revenue: number;
    sessions: number;
    students: number;
  };
  streamData: { name: string; value: number }[];
  streamRevenue: { name: string; value: number }[];
  topicPopularity: { topic: string; count: number }[];
  ratingDistribution: { star: string; count: number }[];
  userTypeData: { name: string; value: number; color: string }[];
  recentActivity: { type: string; date: string | undefined; label: string }[];
  topCounselors: any[];
  activeCounselors: number;
  pendingVerifications: number;
  verificationRate: number;
  userGrowthWoW: number;
  sessionSuccessRate: number;
  activityHeatmap: { name: string; value: number }[];
  geoDistribution: { name: string; value: number }[];
}


