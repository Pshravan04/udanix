import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-slate-900">
      <main className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">
          Welcome to <span className="font-medium text-blue-600">UDANIX</span>
        </h1>
        <p className="text-lg text-slate-600 font-light">
          A centralized portal connecting students with professional counselors for chat, audio, and video consultations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/student" className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
            Student Portal
          </Link>
          <Link href="/counselor" className="px-6 py-3 rounded-md bg-white border border-slate-200 text-slate-800 font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Counselor Portal
          </Link>
          <Link href="/admin" className="px-6 py-3 rounded-md bg-white border border-slate-200 text-slate-800 font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Admin Portal
          </Link>
        </div>
      </main>
    </div>
  );
}
