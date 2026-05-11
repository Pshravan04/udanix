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
