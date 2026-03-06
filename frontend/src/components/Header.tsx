'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, Sun, Moon } from 'lucide-react';

export default function Header() {
    const [isDark, setIsDark] = useState(true);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo and Name */}
                <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                        <Camera className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white sm:inline-block">
                        theAI<span className="text-blue-500">clip</span>
                    </span>
                </Link>

                {/* Navigation Buttons */}
                <nav className="absolute left-1/2 hidden -translate-x-1/2 space-x-1 md:flex">
                    {['Home', 'Mobile', 'Desktop', 'Blogs'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Theme Toggle */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all hover:bg-white/10"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <Moon className="text-white transition-transform group-hover:rotate-12" size={20} />
                        ) : (
                            <Sun className="text-yellow-400 transition-transform group-hover:rotate-90" size={20} />
                        )}
                        <div className="absolute inset-0 rounded-xl border border-white/0 transition-colors group-hover:border-white/20"></div>
                    </button>
                </div>
            </div>
        </header>
    );
}
