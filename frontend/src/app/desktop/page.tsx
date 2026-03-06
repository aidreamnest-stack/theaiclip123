import WallpaperSection from '@/components/WallpaperSection';

export default function DesktopPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Desktop Wallpapers</h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Stunning 16:9 horizontal backgrounds for your desktop and laptop.
                        Experience high-resolution AI art.
                    </p>
                </div>

                <div className="space-y-20">
                    <WallpaperSection title="All Desktop Wallpapers" type="horizontal" count={8} />
                </div>
            </div>
        </main>
    );
}
