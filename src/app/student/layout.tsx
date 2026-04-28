'use client';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* 
        The student dashboard now uses an internal StudentSidebar 
        implemented directly within the pages or via specific page layouts 
        to match the high-fidelity design provided. 
      */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
