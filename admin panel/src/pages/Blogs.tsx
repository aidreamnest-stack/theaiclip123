import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    Eye,
    FileText,
    Calendar,
    User
} from 'lucide-react';

interface Post {
    id: string | number;
    title: string;
    author?: string;
    date?: string;
    views?: string | number;
    status?: string;
    published?: boolean;
    created_at?: string;
}

export default function Blogs() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        try {
            const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPosts(posts.filter(post => post.id !== id));
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An error occurred while deleting');
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Blog Management</h1>
                    <p className="text-white/40">Write, edit, and schedule articles for your community.</p>
                </div>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 border-none cursor-pointer">
                    <Plus size={20} />
                    <span>Write Article</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="Search articles..."
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
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest">Article Title</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest hidden md:table-cell">Author</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest hidden lg:table-cell">Details</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest">Views</th>
                            <th className="p-5 text-sm font-bold text-white/40 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-white/20">Loading articles...</td>
                            </tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-white/20">No articles found</td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 bg-blue-600/10 text-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileText size={20} />
                                            </div>
                                            <div className="font-bold text-white truncate max-w-[200px] md:max-w-xs">{post.title}</div>
                                        </div>
                                    </td>
                                    <td className="p-5 hidden md:table-cell">
                                        <div className="flex items-center space-x-2 text-white/60">
                                            <User size={14} className="text-purple-500" />
                                            <span className="text-sm font-medium">{post.author || 'Admin'}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 hidden lg:table-cell">
                                        <div className="flex items-center space-x-2 text-white/40 mb-1">
                                            <Calendar size={14} />
                                            <span className="text-xs font-bold">
                                                {post.created_at ? new Date(post.created_at).toLocaleDateString() : (post.date || 'N/A')}
                                            </span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${post.published !== false ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                            }`}>
                                            {post.published !== false ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="text-sm font-bold text-white flex items-center space-x-1">
                                            <Eye size={14} className="text-white/20" />
                                            <span>{post.views || 0}</span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all border-none cursor-pointer" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
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
