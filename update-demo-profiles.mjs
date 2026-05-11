import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://bzvltegajwypkhbrzpof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6dmx0ZWdhand5cGtoYnJ6cG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODA0NjcsImV4cCI6MjA5Mjg1NjQ2N30.TrYr6cHlnjFbUYfyFajMMYOi6grZ8CKV36v4HiEKHXU'
);

const dummyUsers = [
  // Students
  {
    email: 'rahul.student@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      school: 'Delhi Public School',
      class: '12th',
      stream: 'Science (PCM)',
      bio: 'Aspiring software engineer with a passion for coding and problem-solving.',
      interests: ['Computer Science', 'AI', 'Robotics'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
    }
  },
  {
    email: 'priya.student@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      school: 'St. Xavier\'s High School',
      class: '11th',
      stream: 'Commerce',
      bio: 'Future business leader interested in sustainable finance and social impact.',
      interests: ['Economics', 'Finance', 'Entrepreneurship'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    }
  },
  {
    email: 'arjun.student@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      school: 'Oakridge International',
      class: '12th',
      stream: 'Science (PCB)',
      bio: 'Aspiring doctor with a love for classical music and genetics.',
      interests: ['Medicine', 'Biotechnology', 'Music'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'
    }
  },
  // Counselors
  {
    email: 'arvind.counselor@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      stream: 'Psychology & Behavioral Science',
      bio: 'Expert in adolescent psychology and career transition coaching with 15+ years of experience.',
      interests: ['Career Counseling', 'Psychology'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind',
      price_per_hour: 1200,
      rating: 4.9,
      sessions_count: 450,
      is_verified: true
    }
  },
  {
    email: 'sarah.counselor@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      stream: 'Engineering & Technology',
      bio: 'Ex-Google Engineer helping students navigate the world of tech careers and overseas education.',
      interests: ['Engineering', 'Tech Careers', 'Abroad Studies'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      price_per_hour: 2500,
      rating: 5.0,
      sessions_count: 120,
      is_verified: true
    }
  },
  {
    email: 'meera.counselor@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      stream: 'Design & Creative Arts',
      bio: 'NID Alumna with a focus on portfolio building and entrance preparation for top design schools.',
      interests: ['Design', 'Portfolio', 'NID', 'NIFT'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
      price_per_hour: 1500,
      rating: 4.7,
      sessions_count: 85,
      is_verified: false
    }
  },
  // Admin
  {
    email: 'admin@udanix.com',
    password: 'Udanix@123',
    profileUpdates: {
      bio: 'Platform administrator.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    }
  }
];

async function updateProfiles() {
  for (const user of dummyUsers) {
    console.log(`Logging in as ${user.email}...`);
    const { data: authData, error: signInErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (signInErr) {
      console.error(`Sign in failed for ${user.email}:`, signInErr.message);
      continue;
    }

    console.log(`Updating profile for ${user.email}...`);
    const { error: profileError } = await supabase
      .from('profiles')
      .update(user.profileUpdates)
      .eq('id', authData.user.id);

    if (profileError) {
      console.error(`Profile update error for ${user.email}:`, profileError);
    } else {
      console.log(`Profile updated successfully for ${user.email}!`);
    }

    await supabase.auth.signOut();
  }
  
  // Let's also check if there are sessions to seed, but right now we'll just do profiles.
  console.log('All profile updates completed!');
}

updateProfiles();
