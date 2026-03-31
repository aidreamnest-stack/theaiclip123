import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Wallpaper {
    id: string | number;
    title: string;
    category?: { name: string };
    resolution?: string;
    downloads?: string | number;
    status: string;
    url: string;
    type: string;
}

export default function Wallpapers() {
    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWallpapers();
    }, []);

    const fetchWallpapers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/wallpapers');
            const data = await response.json();
            setWallpapers(data);
        } catch (error) {
            console.error('Failed to fetch wallpapers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!window.confirm('Are you sure you want to delete this wallpaper?')) return;

        try {
            const response = await fetch(`http://localhost:8080/api/wallpapers/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWallpapers(wallpapers.filter(wp => wp.id !== id));
            } else {
                alert('Failed to delete wallpaper');
            }
        } catch (error) {
            console.error('Error deleting wallpaper:', error);
            alert('An error occurred while deleting');
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Wallpaper Management</h1>
                    <p className="text-white/40">Browse, edit, and manage your AI-generated wallpaper collection.</p>
                </div>
                <Link
                    to="/wallpapers/add"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 no-underline"
                >
                    <Plus size={20} />
                    <span>Upload New</span>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or ID..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all text-white placeholder:text-white/20"
                    />
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02] border-b border-white/10">
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest">Wallpaper</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest hidden md:table-cell">Category</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest hidden lg:table-cell">Info</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest">Type</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-white/20">Loading wallpapers...</td>
                            </tr>
                        ) : wallpapers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-white/20">No wallpapers found</td>
                            </tr>
                        ) : (
                            wallpapers.map((wp) => (
                                <tr key={wp.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 flex-shrink-0">
                                                <img
                                                    src={wp.url}
                                                    alt={wp.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white mb-1">{wp.title}</div>
                                                <div className="text-xs text-white/30 font-medium">ID: {wp.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 hidden md:table-cell">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/60">
                                            {wp.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="p-5 hidden lg:table-cell">
                                        <div className="text-sm font-medium text-white/60">{wp.resolution || 'N/A'}</div>
                                        <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{wp.status || 'Published'}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="text-sm font-bold text-white uppercase">{wp.type}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all border-none cursor-pointer" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-blue-400 rounded-lg transition-all border-none cursor-pointer" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(wp.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 rounded-lg transition-all border-none cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
