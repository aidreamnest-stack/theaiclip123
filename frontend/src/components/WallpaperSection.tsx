import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';

interface WallpaperSectionProps {
    title: string;
    type: 'vertical' | 'horizontal';
    count: number;
}

export default function WallpaperSection({ title, type, count }: WallpaperSectionProps) {
    const verticalIds = [
        'photo-1506744038136-46273834b3fb', 'photo-1470071459604-3b5ec3a7fe05', 'photo-1441974231531-c6227db76b6e',
        'photo-1501785888041-af3ef285b470', 'photo-1493246507139-91e8bef99c1a', 'photo-1464822759023-fed622ff2c3b'
    ];

    const horizontalIds = [
        'photo-1472214103451-9374bd1c798e', 'photo-1469474968028-56623f02e42e', 'photo-1511300636408-a63a89df3482',
        'photo-1541701494587-cb58502866ab', 'photo-1516245834210-c4c142787335', 'photo-1447752875215-b2761acb3c5d'
    ];

    const wallpapers = Array.from({ length: count }).map((_, i) => {
        const id = type === 'vertical' ? verticalIds[i % verticalIds.length] : horizontalIds[i % horizontalIds.length];
        return {
            id,
            url: `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${type === 'vertical' ? '1080' : '1920'}`,
            downloads: Math.floor(Math.random() * 5000) + 1000
        };
    });

    return (
        <section>
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-8">
                <h2 className="section-title mb-0 text-white font-bold text-2xl">{title}</h2>
                <Link href={type === 'vertical' ? '/mobile' : '/desktop'} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">View All</Link>
            </div>

            <div className={type === 'vertical' ? 'wallpaper-grid' : 'desktop-grid'}>
                {wallpapers.map((wallpaper, i) => (
                    <Link
                        key={`${wallpaper.id}-${i}`}
                        href={`/wallpaper/${wallpaper.id}`}
                        className="group relative overflow-hidden rounded-xl bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                        <div className={type === 'vertical' ? 'relative aspect-[9/16]' : 'relative aspect-video'}>
                            <Image
                                src={wallpaper.url}
                                alt={`${title} image ${wallpaper.id}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                            />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <div className="flex justify-between items-center text-white">
                                <div className="flex items-center space-x-2">
                                    <Download size={16} className="text-blue-400" />
                                    <span className="text-sm font-bold">{wallpaper.downloads}</span>
                                </div>
                                <div className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-lg transition-colors">
                                    <Download size={20} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
