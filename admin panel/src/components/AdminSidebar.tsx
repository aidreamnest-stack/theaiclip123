import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    FileText,
    Settings,
    LogOut,
    ChevronLeft,
    Camera
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Wallpapers', icon: ImageIcon, href: '/wallpapers' },
    { name: 'Blog Posts', icon: FileText, href: '/blogs' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl transition-transform">
            <div className="flex h-full flex-col px-3 py-4">
                {/* Logo */}
                <Link to="/" className="mb-10 flex items-center ps-2.5 space-x-2 no-underline">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                        <Camera className="text-white" size={18} />
                    </div>
                    <span className="self-center whitespace-nowrap text-xl font-bold text-white">
                        theAI<span className="text-blue-500">clip</span>
                        <span className="ml-1 text-[10px] uppercase tracking-widest text-white/40">Admin</span>
                    </span>
                </Link>

                {/* Navigation */}
                <ul className="space-y-2 font-medium flex-1 list-none p-0">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={`flex items-center rounded-xl p-3 transition-all group no-underline ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-white' : 'text-blue-500 transition-colors group-hover:text-white'} />
                                    <span className="ms-3">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                    <button
                        className="flex w-full items-center rounded-xl p-3 text-white/60 hover:bg-white/5 hover:text-white transition-all group border-none bg-transparent cursor-pointer"
                        onClick={() => window.location.href = 'http://localhost:3000'} // Mock link back to frontend
                    >
                        <ChevronLeft size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        <span className="ms-3 text-sm">Main Website</span>
                    </button>
                    <button
                        className="flex w-full items-center rounded-xl p-3 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all group border-none bg-transparent cursor-pointer"
                    >
                        <LogOut size={20} className="transition-colors" />
                        <span className="ms-3 text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
