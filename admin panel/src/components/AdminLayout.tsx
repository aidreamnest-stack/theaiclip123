import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <AdminSidebar />
            <div className="p-4 sm:ml-64 min-h-screen">
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-2xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
