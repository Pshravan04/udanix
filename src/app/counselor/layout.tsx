export default function CounselorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-blue-600 text-lg">UDANIX</span>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Counselor Portal</span>
                    </div>
                    <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                        <a href="/counselor" className="hover:text-blue-600">Dashboard</a>
                        <a href="/counselor/availability" className="hover:text-blue-600">Availability</a>
                        <a href="/counselor/sessions" className="hover:text-blue-600">Sessions</a>
                    </nav>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
