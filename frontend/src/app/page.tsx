import Hero from "@/components/Hero";
import WallpaperSection from "@/components/WallpaperSection";
import BlogSection from "@/components/BlogSection";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pb-24">
            <Hero />

            <div className="container mx-auto px-4 space-y-20 mt-12">
                <div id="trending">
                    <WallpaperSection
                        title="Trending Wallpapers"
                        type="vertical"
                        count={10}
                    />
                </div>

                <div id="newest">
                    <WallpaperSection
                        title="Newest Wallpapers"
                        type="vertical"
                        count={10}
                    />
                </div>

                <div id="desktop">
                    <WallpaperSection
                        title="Desktop Wallpapers"
                        type="horizontal"
                        count={6}
                    />
                </div>

                <div id="blog">
                    <BlogSection />
                </div>
            </div>
        </main>
    );
}
