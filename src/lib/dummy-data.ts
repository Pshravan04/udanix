export const DUMMY_STUDENTS = [
  {
    full_name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    role: "student",
    school: "Delhi Public School",
    class: "12th",
    stream: "Science (PCM)",
    interests: ["Computer Science", "Artificial Intelligence", "Robotics"],
    bio: "Aspiring software engineer with a passion for coding and problem-solving.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  },
  {
    full_name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "student",
    school: "St. Xavier's High School",
    class: "11th",
    stream: "Commerce",
    interests: ["Economics", "Finance", "Entrepreneurship"],
    bio: "Future business leader interested in sustainable finance and social impact.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    full_name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    role: "student",
    school: "The Doon School",
    class: "12th",
    stream: "Humanities",
    interests: ["Psychology", "Literature", "International Relations"],
    bio: "Avid reader and debater aiming for a career in diplomacy or clinical psychology.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
  },
  {
    full_name: "Vikram Singh",
    email: "vikram.singh@example.com",
    role: "student",
    school: "Mayo College",
    class: "10th",
    stream: "General",
    interests: ["Astronomy", "Physics", "Photography"],
    bio: "Stargazer and science enthusiast exploring different career paths in STEM.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
  },
  {
    full_name: "Sanya Gupta",
    email: "sanya.gupta@example.com",
    role: "student",
    school: "Modern School",
    class: "12th",
    stream: "Commerce with Math",
    interests: ["Actuarial Science", "Statistics", "Data Analysis"],
    bio: "Numbers person with a knack for logical reasoning and data-driven insights.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanya"
  },
  {
    full_name: "Arjun Reddy",
    email: "arjun.reddy@example.com",
    role: "student",
    school: "Oakridge International",
    class: "12th",
    stream: "Science (PCB)",
    interests: ["Medicine", "Biotechnology", "Music"],
    bio: "Aspiring doctor with a love for classical music and genetics.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
  },
  {
    full_name: "Zoya Khan",
    email: "zoya.khan@example.com",
    role: "student",
    school: "Jamnabai Narsee",
    class: "11th",
    stream: "Humanities",
    interests: ["Fashion Design", "Digital Marketing", "Sociology"],
    bio: "Creative mind exploring the intersection of fashion and social trends.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoya"
  }
];

export const DUMMY_COUNSELORS = [
  {
    full_name: "Dr. Arvind Menon",
    email: "arvind.menon@expert.com",
    role: "counselor",
    stream: "Psychology & Behavioral Science",
    bio: "Expert in adolescent psychology and career transition coaching with 15+ years of experience.",
    price_per_hour: 1200,
    rating: 4.9,
    total_sessions: 450,
    is_verified: true,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind"
  },
  {
    full_name: "Sarah Jenkins",
    email: "sarah.j@expert.com",
    role: "counselor",
    stream: "Engineering & Technology",
    bio: "Ex-Google Engineer helping students navigate the world of tech careers and overseas education.",
    price_per_hour: 2500,
    rating: 5.0,
    total_sessions: 120,
    is_verified: true,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    full_name: "Rajesh Malhotra",
    email: "rajesh.m@expert.com",
    role: "counselor",
    stream: "Finance & Management",
    bio: "Chartered Accountant and MBA from IIM-A. Providing guidance on competitive exams and finance roles.",
    price_per_hour: 1800,
    rating: 4.8,
    total_sessions: 310,
    is_verified: true,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
  },
  {
    full_name: "Meera Deshmukh",
    email: "meera.d@expert.com",
    role: "counselor",
    stream: "Design & Creative Arts",
    bio: "NID Alumna with a focus on portfolio building and entrance preparation for top design schools.",
    price_per_hour: 1500,
    rating: 4.7,
    total_sessions: 85,
    is_verified: false,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera"
  },
  {
    full_name: "Dr. Elena Gilbert",
    email: "elena.g@expert.com",
    role: "counselor",
    stream: "Medical & Life Sciences",
    bio: "Pediatrician and medical educator guiding NEET aspirants and future healthcare professionals.",
    price_per_hour: 2000,
    rating: 4.9,
    total_sessions: 215,
    is_verified: true,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
  },
  {
    full_name: "Michael Chen",
    email: "michael.c@expert.com",
    role: "counselor",
    stream: "Data Science & AI",
    bio: "Data Scientist at Meta helping students build portfolios for high-impact tech roles.",
    price_per_hour: 3000,
    rating: 4.9,
    total_sessions: 56,
    is_verified: true,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  }
];

export const DUMMY_SESSIONS = [
  {
    topic: "Career in AI & Machine Learning",
    status: "completed",
    duration_minutes: 60,
    scheduled_at: new Date(Date.now() - 86400000 * 0).toISOString(),
    notes: "Detailed discussion on roadmap and college selection."
  },
  {
    topic: "MBBS vs BDS: Making the choice",
    status: "completed",
    duration_minutes: 45,
    scheduled_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    notes: "Focus on future prospects and workload."
  },
  {
    topic: "Preparing for CA Foundation",
    status: "completed",
    duration_minutes: 60,
    scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: "Strategy for first attempt."
  },
  {
    topic: "Portfolio Review for Design",
    status: "completed",
    duration_minutes: 90,
    scheduled_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    notes: "Focus on sketching and digital art samples."
  },
  {
    topic: "Studying Engineering Abroad",
    status: "completed",
    duration_minutes: 60,
    scheduled_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    notes: "University shortlisting for US and Germany."
  },
  {
    topic: "Psychology as a Career",
    status: "completed",
    duration_minutes: 45,
    scheduled_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    notes: "Clinical vs Industrial psychology paths."
  },
  {
    topic: "Law Entrance Preparation",
    status: "completed",
    duration_minutes: 60,
    scheduled_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    notes: "CLAT mock test analysis."
  },
  {
    topic: "Economics Honours Roadmap",
    status: "confirmed",
    duration_minutes: 45,
    scheduled_at: new Date(Date.now() + 86400000 * 1).toISOString(),
    notes: "CUET prep and college list."
  }
];
