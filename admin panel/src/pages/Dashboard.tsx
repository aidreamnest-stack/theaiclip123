import {
    TrendingUp,
    Download,
    Image as ImageIcon,
    FileText,
    ArrowUpRight,
    Search
} from 'lucide-react';

const stats = [
    { name: 'Total Wallpapers', value: '48', icon: ImageIcon, change: '+5', changeType: 'increase' },
    { name: 'Total Downloads', value: '24.5k', icon: Download, change: '+12%', changeType: 'increase' },
    { name: 'Blog Posts', value: '12', icon: FileText, change: '+2', changeType: 'increase' },
    { name: 'Engagement Rate', value: '18.2%', icon: TrendingUp, change: '+2.1%', changeType: 'increase' },
];

export default function Dashboard() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Overview</h1>
                    <p className="text-white/40">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search stats..."
                            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all w-full md:w-64 text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm group hover:border-blue-500/30 transition-all shadow-xl shadow-black/20">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
                                <stat.icon size={24} />
                            </div>
                            <span className={`flex items-center space-x-1 text-xs font-bold ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                                <span>{stat.change}</span>
                                <ArrowUpRight size={14} />
                            </span>
                        </div>
                        <h3 className="text-white/40 text-sm font-medium mb-1">{stat.name}</h3>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8 text-white">
                        <h2 className="text-xl font-bold">Trending Performance</h2>
                        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium bg-transparent border-none cursor-pointer">Download Report</button>
                    </div>
                    <div className="h-[300px] flex items-end justify-between gap-4 px-4 pt-4">
                        {[40, 70, 45, 90, 65, 85, 55, 100, 75, 40, 60, 80].map((height, i) => (
                            <div key={i} className="flex-1 space-y-2 group">
                                <div
                                    className="bg-blue-600/40 group-hover:bg-blue-600 transition-all rounded-t-lg"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <div className="text-[10px] text-center text-white/20 group-hover:text-white transition-colors">D{i + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        <button
                            className="w-full flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 group border-none cursor-pointer"
                            onClick={() => window.location.href = '/wallpapers/add'}
                        >
                            <span>Upload New Wallpaper</span>
                            <ImageIcon size={20} className="group-hover:rotate-12 transition-transform" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all group border-none cursor-pointer">
                            <span>Write New Blog Post</span>
                            <FileText size={20} className="text-purple-500 group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
