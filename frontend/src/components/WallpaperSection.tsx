import Image from 'next/image';
import { Download } from 'lucide-react';

interface WallpaperSectionProps {
    title: string;
    type: 'vertical' | 'horizontal';
    count: number;
}

export default function WallpaperSection({ title, type, count }: WallpaperSectionProps) {
    const verticalIds = [
        'photo-1621600411688-497721f91f2c', 'photo-1617396900799-f4a235f12360', 'photo-1614850523296-3e0ef6ec5181',
        'photo-1618519764620-7403ab9f7cc1', 'photo-1620641788421-7a1c342ea42e', 'photo-1618005182384-a83a8bd57fbe'
    ];

    const horizontalIds = [
        'photo-1494438639946-1ebd1d20bf85', 'photo-1618005192384-a83a8bd57fbe', 'photo-1541701494587-cb58502866ab',
        'photo-1554147090-e1221a247de2', 'photo-1477346611705-65d1883cee1e', 'photo-1511300636408-a63a89df3482'
    ];

    const wallpapers = Array.from({ length: count }).map((_, i) => {
        const id = type === 'vertical' ? verticalIds[i % verticalIds.length] : horizontalIds[i % horizontalIds.length];
        return {
            id: i,
            url: `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${type === 'vertical' ? '1080&h=1920' : '1920&h=1080'}`,
            downloads: Math.floor(Math.random() * 5000) + 1000
        };
    });

    return (
        <section>
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-8">
                <h2 className="section-title mb-0 text-white font-bold text-2xl">{title}</h2>
                <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">View All</button>
            </div>

            <div className={type === 'vertical' ? 'wallpaper-grid' : 'desktop-grid'}>
                {wallpapers.map((wallpaper) => (
                    <div
                        key={wallpaper.id}
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
                                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-lg transition-colors">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
