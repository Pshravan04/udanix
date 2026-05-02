-- ============================================================
-- UDANIX TEST ACCOUNTS SEED SCRIPT
-- Run this in Supabase Dashboard → SQL Editor
-- All passwords: Udanix@123
-- ============================================================

-- ── STUDENTS ──────────────────────────────────────────────

INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role, instance_id, confirmation_token, recovery_token
) VALUES
(
  'a1000000-0000-0000-0000-000000000001',
  'rahul.student@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Rahul Sharma", "role": "student"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
),
(
  'a1000000-0000-0000-0000-000000000002',
  'priya.student@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Priya Patel", "role": "student"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
),
(
  'a1000000-0000-0000-0000-000000000003',
  'arjun.student@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Arjun Reddy", "role": "student"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
)
ON CONFLICT (id) DO NOTHING;

-- ── COUNSELORS ────────────────────────────────────────────

INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role, instance_id, confirmation_token, recovery_token
) VALUES
(
  'b2000000-0000-0000-0000-000000000001',
  'arvind.counselor@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Dr. Arvind Menon", "role": "counselor"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
),
(
  'b2000000-0000-0000-0000-000000000002',
  'sarah.counselor@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Sarah Jenkins", "role": "counselor"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
),
(
  'b2000000-0000-0000-0000-000000000003',
  'meera.counselor@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Meera Deshmukh", "role": "counselor"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
)
ON CONFLICT (id) DO NOTHING;

-- ── ADMIN ─────────────────────────────────────────────────

INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role, instance_id, confirmation_token, recovery_token
) VALUES
(
  'c3000000-0000-0000-0000-000000000001',
  'admin@udanix.com',
  crypt('Udanix@123', gen_salt('bf')),
  now(),
  '{"full_name": "Udanix Admin", "role": "admin"}'::jsonb,
  now(), now(), 'authenticated', 'authenticated',
  '00000000-0000-0000-0000-000000000000', '', ''
)
ON CONFLICT (id) DO NOTHING;

-- ── PROFILES (auto-created by trigger, but we upsert full data) ──

INSERT INTO public.profiles (
  id, email, full_name, role,
  school, class, stream, bio, interests, avatar_url, created_at, updated_at
) VALUES
-- Students
(
  'a1000000-0000-0000-0000-000000000001',
  'rahul.student@udanix.com', 'Rahul Sharma', 'student',
  'Delhi Public School', '12th', 'Science (PCM)',
  'Aspiring software engineer with a passion for coding and problem-solving.',
  '["Computer Science", "AI", "Robotics"]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
  now(), now()
),
(
  'a1000000-0000-0000-0000-000000000002',
  'priya.student@udanix.com', 'Priya Patel', 'student',
  'St. Xavier''s High School', '11th', 'Commerce',
  'Future business leader interested in sustainable finance and social impact.',
  '["Economics", "Finance", "Entrepreneurship"]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  now(), now()
),
(
  'a1000000-0000-0000-0000-000000000003',
  'arjun.student@udanix.com', 'Arjun Reddy', 'student',
  'Oakridge International', '12th', 'Science (PCB)',
  'Aspiring doctor with a love for classical music and genetics.',
  '["Medicine", "Biotechnology", "Music"]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
  now(), now()
),
-- Counselors
(
  'b2000000-0000-0000-0000-000000000001',
  'arvind.counselor@udanix.com', 'Dr. Arvind Menon', 'counselor',
  NULL, NULL, 'Psychology & Behavioral Science',
  'Expert in adolescent psychology and career transition coaching with 15+ years of experience.',
  '["Career Counseling", "Psychology"]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind',
  now(), now()
),
(
  'b2000000-0000-0000-0000-000000000002',
  'sarah.counselor@udanix.com', 'Sarah Jenkins', 'counselor',
  NULL, NULL, 'Engineering & Technology',
  'Ex-Google Engineer helping students navigate the world of tech careers and overseas education.',
  '["Engineering", "Tech Careers", "Abroad Studies"]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  now(), now()
),
(
  'b2000000-0000-0000-0000-000000000003',
  'meera.counselor@udanix.com', 'Meera Deshmukh', 'counselor',
  NULL, NULL, 'Design & Creative Arts',
  'NID Alumna with a focus on portfolio building and entrance preparation for top design schools.',
  '["Design", "Portfolio", "NID", "NIFT"]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
  now(), now()
),
-- Admin
(
  'c3000000-0000-0000-0000-000000000001',
  'admin@udanix.com', 'Udanix Admin', 'admin',
  NULL, NULL, NULL, 'Platform administrator.',
  '[]'::jsonb,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  now(), now()
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  stream = EXCLUDED.stream,
  updated_at = now();

-- ── UPDATE COUNSELOR EXTRA FIELDS ─────────────────────────

UPDATE public.profiles SET price_per_hour = 1200, rating = 4.9, total_sessions = 450, is_verified = true
  WHERE id = 'b2000000-0000-0000-0000-000000000001';

UPDATE public.profiles SET price_per_hour = 2500, rating = 5.0, total_sessions = 120, is_verified = true
  WHERE id = 'b2000000-0000-0000-0000-000000000002';

UPDATE public.profiles SET price_per_hour = 1500, rating = 4.7, total_sessions = 85,  is_verified = false
  WHERE id = 'b2000000-0000-0000-0000-000000000003';

-- ── DONE ──────────────────────────────────────────────────
-- Verify with:
-- SELECT id, email, role FROM public.profiles ORDER BY role;
