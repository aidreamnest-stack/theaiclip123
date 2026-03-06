import {
    Upload,
    Check,
    ChevronLeft,
    Tag as TagIcon,
    Type,
    Layout,
    Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AddWallpaper() {
    const [dragActive, setDragActive] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-10">
            {/* Header */}
            <div>
                <Link
                    to="/wallpapers"
                    className="inline-flex items-center space-x-2 text-white/40 hover:text-white mb-6 transition-colors group no-underline"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Wallpapers</span>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Upload New Wallpaper</h1>
                <p className="text-white/40">Add a new AI-generated masterpiece to your collection.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-6 text-white">
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2 text-sm font-bold text-white/60">
                                <Type size={16} className="text-blue-500" />
                                <span>Wallpaper Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Ethereal Nebula Dream"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 text-white">
                                <label className="flex items-center space-x-2 text-sm font-bold text-white/60">
                                    <Layout size={16} className="text-purple-500" />
                                    <span>Category</span>
                                </label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                                    <option className="bg-black">Mobile (9:16)</option>
                                    <option className="bg-black">Desktop (16:9)</option>
                                    <option className="bg-black">Abstract</option>
                                    <option className="bg-black">Nature</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-2 text-sm font-bold text-white/60">
                                    <TagIcon size={16} className="text-green-500" />
                                    <span>Tags (Comma separated)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="space, nebula, blue, 4k"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center space-x-2 text-sm font-bold text-white/60">
                                <Info size={16} className="text-yellow-500" />
                                <span>Short Description</span>
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Tell us about this artwork..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 border-none cursor-pointer">
                            Save as Draft
                        </button>
                        <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 border-none cursor-pointer">
                            <Check size={20} />
                            <span>Publish Wallpaper</span>
                        </button>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="space-y-6">
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        className={`relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 text-center group ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                    >
                        <div className="p-5 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={32} className="text-blue-500" />
                        </div>
                        <h3 className="text-white font-bold mb-2">Click or Drag Image</h3>
                        <p className="text-white/30 text-xs leading-relaxed">
                            Support PNG, JPG, WEBP<br />Max size 20MB
                        </p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-white font-bold text-sm mb-4">Guidelines</h4>
                        <ul className="space-y-3 p-0 list-none">
                            <li className="flex items-start space-x-2 text-xs text-white/40">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                                <span>Recommended resolution: 3840x2160 or higher for Desktop.</span>
                            </li>
                            <li className="flex items-start space-x-2 text-xs text-white/40">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                                <span>For Mobile, ensure a 9:16 aspect ratio.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
