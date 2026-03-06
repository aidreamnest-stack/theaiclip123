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

const posts = [
    { id: '1', title: 'The Future of AI Art Generation', author: 'Admin', date: 'Mar 5, 2026', views: '1,240', status: 'Published' },
    { id: '2', title: 'Top 10 Vertical Wallpapers for iOS 18', author: 'Admin', date: 'Mar 2, 2026', views: '850', status: 'Published' },
    { id: '3', title: 'Mastering the AI Prompt Engineering', author: 'Admin', date: 'Feb 28, 2026', views: '2,100', status: 'Draft' },
];

export default function Blogs() {
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
                        {posts.map((post) => (
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
                                        <span className="text-sm font-medium">{post.author}</span>
                                    </div>
                                </td>
                                <td className="p-5 hidden lg:table-cell">
                                    <div className="flex items-center space-x-2 text-white/40 mb-1">
                                        <Calendar size={14} />
                                        <span className="text-xs font-bold">{post.date}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${post.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <div className="text-sm font-bold text-white flex items-center space-x-1">
                                        <Eye size={14} className="text-white/20" />
                                        <span>{post.views}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all border-none cursor-pointer">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 rounded-lg transition-all border-none cursor-pointer">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-5 text-center text-white/20 text-xs font-bold uppercase tracking-widest">
                    End of collection
                </div>
            </div>
        </div>
    );
}
