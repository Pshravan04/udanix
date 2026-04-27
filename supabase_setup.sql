-- UDANIX Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- 1. PROFILES TABLE
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  full_name text,
  avatar_url text,
  role text check (role in ('student', 'counselor', 'admin')),
  school text,
  stream text,
  class text,
  interests text[],
  bio text,
  price_per_hour numeric default 0,
  rating numeric default 5.0,
  total_sessions integer default 0,
  is_verified boolean default false,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. SESSIONS TABLE
create table if not exists sessions (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references auth.users(id),
  counselor_id uuid references auth.users(id),
  topic text,
  status text check (status in ('pending', 'confirmed', 'completed', 'cancelled')) default 'pending',
  scheduled_at timestamp with time zone,
  duration_minutes integer default 60,
  meeting_link text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ACHIEVEMENTS TABLE
create table if not exists achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  title text,
  icon text,
  rarity text,
  date timestamp with time zone default timezone('utc'::text, now()),
  points integer default 10
);

-- 4. ROW LEVEL SECURITY (RLS)
alter table profiles enable row level security;
alter table sessions enable row level security;
alter table achievements enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Sessions Policies
create policy "Users can view their own sessions" on sessions
  for select using (auth.uid() = student_id or auth.uid() = counselor_id);

create policy "Students can insert sessions" on sessions
  for insert with check (auth.uid() = student_id);

create policy "Counselors can update session status" on sessions
  for update using (auth.uid() = counselor_id);

-- Achievements Policies
create policy "Users can view their own achievements" on achievements
  for select using (auth.uid() = user_id);

-- 5. FUNCTION TO HANDLE NEW USER SIGNUPS
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  return new;
end;
$$ language plpgsql security definer;

-- 6. TRIGGER FOR AUTOMATIC PROFILE CREATION
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
