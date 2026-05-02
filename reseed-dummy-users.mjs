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
    role: 'student',
    full_name: 'Rahul Sharma',
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
    role: 'student',
    full_name: 'Priya Patel',
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
    role: 'student',
    full_name: 'Arjun Reddy',
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
    role: 'counselor',
    full_name: 'Dr. Arvind Menon',
    profileUpdates: {
      stream: 'Psychology & Behavioral Science',
      bio: 'Expert in adolescent psychology and career transition coaching with 15+ years of experience.',
      interests: ['Career Counseling', 'Psychology'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind',
      price_per_hour: 1200,
      rating: 4.9,
      total_sessions: 450,
      is_verified: true
    }
  },
  {
    email: 'sarah.counselor@udanix.com',
    password: 'Udanix@123',
    role: 'counselor',
    full_name: 'Sarah Jenkins',
    profileUpdates: {
      stream: 'Engineering & Technology',
      bio: 'Ex-Google Engineer helping students navigate the world of tech careers and overseas education.',
      interests: ['Engineering', 'Tech Careers', 'Abroad Studies'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      price_per_hour: 2500,
      rating: 5.0,
      total_sessions: 120,
      is_verified: true
    }
  },
  {
    email: 'meera.counselor@udanix.com',
    password: 'Udanix@123',
    role: 'counselor',
    full_name: 'Meera Deshmukh',
    profileUpdates: {
      stream: 'Design & Creative Arts',
      bio: 'NID Alumna with a focus on portfolio building and entrance preparation for top design schools.',
      interests: ['Design', 'Portfolio', 'NID', 'NIFT'],
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
      price_per_hour: 1500,
      rating: 4.7,
      total_sessions: 85,
      is_verified: false
    }
  },
  // Admin
  {
    email: 'admin@udanix.com',
    password: 'Udanix@123',
    role: 'admin',
    full_name: 'Udanix Admin',
    profileUpdates: {
      bio: 'Platform administrator.',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    }
  }
];

async function reseed() {
  for (const user of dummyUsers) {
    console.log(`Processing ${user.email}...`);
    
    // Attempt sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          full_name: user.full_name,
          role: user.role,
        }
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`User ${user.email} already registered via Auth. Skipping sign up...`);
        // If they already exist, we can't easily sign them up again without deleting first.
        // But if they are broken in auth.users, sign up won't fix it unless we delete them.
        // Let's try signing in.
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: user.password,
        });
        if (signInErr) {
            console.error(`Sign in failed for ${user.email}:`, signInErr.message);
            console.error(`Please delete these dummy users from the Supabase Dashboard first!`);
        } else {
            console.log(`Signed in successfully to update profile for ${user.email}`);
            await updateProfile(user);
        }
      } else {
        console.error(`Sign-up Error for ${user.email}:`, authError);
      }
    } else if (authData.user) {
      console.log(`Sign-up successful for ${user.email}!`);
      // Update the profile (it should have been created by the trigger)
      await updateProfile(user);
    }
    
    // Sign out to clear session
    await supabase.auth.signOut();
  }
}

async function updateProfile(user) {
    // In our trigger, profile is created. Now we update it.
    // We are currently authenticated as the user, so RLS should allow update!
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
        console.error('No current user session to update profile.');
        return;
    }
    
    const { error: profileError } = await supabase
      .from('profiles')
      .update(user.profileUpdates)
      .eq('id', currentUser.id);

    if (profileError) {
      console.error(`Profile update error for ${user.email}:`, profileError);
    } else {
      console.log(`Profile updated successfully for ${user.email}!`);
    }
}

reseed();
