import BlogSection from '@/components/BlogSection';

export default function BlogsPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Explore the latest trends in AI art, wallpaper design, and technology.
                        Stay updated with our community.
                    </p>
                </div>

                <BlogSection />
            </div>
        </main>
    );
}
