'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Download, Share2, Heart, Tag, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getWallpaperById, getRelatedWallpapers } from '@/utils/wallpaperData';
import WallpaperSection from '@/components/WallpaperSection';
import { useEffect, useState } from 'react';

export default function WallpaperDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const wallpaper = getWallpaperById(id);

    if (!wallpaper) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white p-4">
                <div className="text-center bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl">
                    <h1 className="text-4xl font-bold mb-4">Wallpaper Not Found</h1>
                    <p className="text-white/60 mb-8">The wallpaper you're looking for doesn't exist or has been removed.</p>
                    <Link href="/" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">Return Home</Link>
                </div>
            </div>
        );
    }

    const isVertical = wallpaper.type === 'vertical';
    const relatedWallpapers = getRelatedWallpapers(id, wallpaper.type);

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href={isVertical ? "/mobile" : "/desktop"}
                    className="inline-flex items-center space-x-2 text-white/60 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to {isVertical ? 'Mobile' : 'Desktop'}</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    {/* Image Preview */}
                    <div className="lg:col-span-8">
                        <div className={`relative ${isVertical ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'} overflow-hidden rounded-3xl bg-white/5 shadow-2xl shadow-blue-500/10 group`}>
                            <Image
                                src={wallpaper.url}
                                alt={wallpaper.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Content Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {wallpaper.category}
                                </span>
                                <span className="text-white/40 text-xs flex items-center space-x-1">
                                    <Download size={12} />
                                    <span>{wallpaper.downloads.toLocaleString()}</span>
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{wallpaper.title}</h1>
                            <p className="text-white/60 leading-relaxed italic">"{wallpaper.description}"</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-4">
                            <button className="flex items-center justify-center space-x-3 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20">
                                <Download size={24} />
                                <span>Download Original 4K</span>
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors">
                                    <Heart size={20} />
                                    <span>Like</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors">
                                    <Share2 size={20} />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-white/80 font-bold mb-2">
                                    <Tag size={18} className="text-blue-500" />
                                    <span>Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {wallpaper.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs rounded-lg transition-colors cursor-pointer capitalize">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6 flex justify-between items-center text-sm font-medium">
                                <div className="flex items-center space-x-2 text-white/40">
                                    <Info size={16} />
                                    <span>Aspect Ratio</span>
                                </div>
                                <span className="text-white">{isVertical ? '9:16' : '16:9'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Wallpapers */}
                <div className="pt-20 border-t border-white/10">
                    <WallpaperSection
                        title="More Like This"
                        type={wallpaper.type}
                        count={4}
                    />
                </div>
            </div>
        </main>
    );
}
