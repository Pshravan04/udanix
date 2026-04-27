# UDANIX - Integrated Counseling Platform

UDANIX is a professional, production-ready counseling platform built with Next.js 15, Tailwind CSS, and Supabase. It features distinct portals for Students, Counselors, and Administrators, with real-time data synchronization and live session management.

## 🚀 Deployment to Vercel

The platform is designed to be hosted on Vercel. Follow these steps to go live:

1. **GitHub Integration**: Push your changes to your GitHub repository.
2. **Import Project**: In the Vercel Dashboard, select "Add New" > "Project" and choose your UDANIX repository.
3. **Environment Variables**: Add these keys from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**: Click "Deploy". Vercel will handle the build and hosting automatically.

## 🛠️ Project Setup

### Supabase Integration
The platform uses Supabase for Authentication and PostgreSQL database services. To initialize your database:
1. Copy the contents of `supabase_setup.sql` (located in the project root).
2. Go to your Supabase Project > **SQL Editor**.
3. Paste and **Run** the script to create the `profiles`, `sessions`, and `achievements` tables with Row Level Security (RLS) policies.

### Local Development
```bash
npm install
npm run dev
```

## 🏗️ Architecture

- **Next.js App Router**: Provides high-performance layouts and routing.
- **Supabase Auth**: Handles secure user registration, login, and Google OAuth.
- **Middleware (RBAC)**: Enforces server-side role-based access control for Student, Counselor, and Admin portals.
- **Framer Motion**: Delivers smooth, "SaaS-Light" user experience with micro-animations.
- **Dynamic Portals**: All dashboards and directory listings consume live database data via Supabase client.

## 👨‍💻 Key Portals

- `/student`: Search counselors, book sessions, and track progress.
- `/counselor`: Manage session requests, set rates, and update profile.
- `/admin`: Platform-wide oversight and analytics.

---
Built with UDANIX Production Intelligence.
