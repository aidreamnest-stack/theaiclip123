import { MetadataRoute } from 'next';

const BASE_URL = 'https://theaiclip.com';
const API_URL = 'https://api.theaiclip.com/api'; // Production API URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/about',
        '/contact',
        '/terms',
        '/faq',
        '/mobile',
        '/desktop',
        '/blogs',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Wallpapers
    let wallpaperRoutes: MetadataRoute.Sitemap = [];
    try {
        const response = await fetch(`${API_URL}/wallpapers`);
        const wallpapers = await response.json();
        wallpaperRoutes = wallpapers.map((wp: any) => ({
            url: `${BASE_URL}/wallpaper/${wp.id}`,
            lastModified: new Date(wp.created_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap: Failed to fetch wallpapers', error);
    }

    // 3. Dynamic Blogs
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const response = await fetch(`${API_URL}/posts`);
        const posts = await response.json();
        blogRoutes = posts.map((post: any) => ({
            url: `${BASE_URL}/blogs/${post.slug}`,
            lastModified: new Date(post.created_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.6,
        }));
    } catch (error) {
        console.error('Sitemap: Failed to fetch blog posts', error);
    }

    return [...staticRoutes, ...wallpaperRoutes, ...blogRoutes];
}
