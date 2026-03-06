import Image from 'next/image';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function BlogSection() {
    const posts = [
        {
            id: 1,
            title: "How AI is Revolutionizing Digital Art",
            excerpt: "Explore the cutting-edge intersections of artificial intelligence and creative expression...",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Top 10 Minimalist Wallpapers for Productivity",
            excerpt: "Sometimes less is more. Discover our pick of the best minimalist wallpapers to keep you focused...",
            date: "Oct 20, 2024",
            image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "The Future of Desktop Customization",
            excerpt: "From dynamic widgets to 3D parity effects, see what's next for your workspace...",
            date: "Oct 15, 2024",
            image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section>
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-8">
                <h2 className="section-title mb-0">Latest from the Blog</h2>
                <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Read All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="group flex flex-col bg-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-2"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center text-xs text-gray-400 space-x-4">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {post.date}
                                </span>
                                <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    Articles
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <button className="flex items-center gap-2 text-blue-400 text-sm font-bold group/btn pt-2">
                                Read More
                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
