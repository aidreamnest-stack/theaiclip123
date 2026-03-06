export interface Wallpaper {
    id: string;
    url: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    downloads: number;
    type: 'vertical' | 'horizontal';
}

const verticalIds = [
    'photo-1506744038136-46273834b3fb', 'photo-1470071459604-3b5ec3a7fe05', 'photo-1441974231531-c6227db76b6e',
    'photo-1501785888041-af3ef285b470', 'photo-1493246507139-91e8bef99c1a', 'photo-1464822759023-fed622ff2c3b',
    'photo-1544197150-b99a580bb7a8', 'photo-1516245834210-c4c142787335'
];

const horizontalIds = [
    'photo-1472214103451-9374bd1c798e', 'photo-1469474968028-56623f02e42e', 'photo-1511300636408-a63a89df3482',
    'photo-1541701494587-cb58502866ab', 'photo-1516245834210-c4c142787335', 'photo-1447752875215-b2761acb3c5d',
    'photo-1465146344425-f00d5f5c8f07', 'photo-1441974231531-c6227db76b6e'
];

export function getWallpaperById(id: string): Wallpaper | null {
    const isVertical = verticalIds.includes(id);
    const isHorizontal = horizontalIds.includes(id);

    if (!isVertical && !isHorizontal) return null;

    return {
        id,
        url: `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${isVertical ? '1080' : '1920'}`,
        title: `AI Art - ${id.split('-')[1]}`,
        description: "Experience the pinnacle of AI-generated art. This high-resolution wallpaper is meticulously crafted to bring life to your digital screens.",
        category: isVertical ? "Mobile" : "Desktop",
        tags: ["AI", "Abstract", "Nature", isVertical ? "9:16" : "16:9"],
        downloads: Math.floor(Math.random() * 5000) + 1000,
        type: isVertical ? 'vertical' : 'horizontal'
    };
}

export function getRelatedWallpapers(currentId: string, type: 'vertical' | 'horizontal', limit: number = 4): Wallpaper[] {
    const pool = type === 'vertical' ? verticalIds : horizontalIds;
    return pool
        .filter(id => id !== currentId)
        .slice(0, limit)
        .map(id => getWallpaperById(id)!); // Non-null because they are from the pool
}
