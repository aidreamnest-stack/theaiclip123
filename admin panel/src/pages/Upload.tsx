import { useState } from 'react'
import axios from 'axios'
import { Upload as UploadIcon, X } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('mobile')
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('type', type)

        try {
            await axios.post(`${API_URL}/wallpapers`, formData)
            alert('Wallpaper uploaded successfully!')
            setFile(null)
            setTitle('')
            setDescription('')
        } catch (err) {
            console.error(err)
            alert('Failed to upload wallpaper.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Upload New Wallpaper</h1>

            <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setType('mobile')}
                        className={`py-4 rounded-xl border-2 font-black transition-all transform active:scale-95 ${type === 'mobile' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-[#161618] border-[#27272a] text-gray-500 hover:border-gray-700'}`}
                    >
                        Mobile (9:16)
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('desktop')}
                        className={`py-4 rounded-xl border-2 font-black transition-all transform active:scale-95 ${type === 'desktop' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-[#161618] border-[#27272a] text-gray-500 hover:border-gray-700'}`}
                    >
                        Desktop (16:9)
                    </button>
                </div>

                <div className="border-2 border-dashed border-[#27272a] rounded-2xl p-10 flex flex-col items-center justify-center bg-[#161618]/50 hover:bg-[#161618] transition-colors cursor-pointer relative group">
                    {file ? (
                        <div className="text-center">
                            <p className="text-indigo-500 font-medium mb-2">{file.name}</p>
                            <button onClick={() => setFile(null)} className="text-red-500 text-sm hover:underline flex items-center gap-1 mx-auto">
                                <X size={14} /> Remove
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="bg-indigo-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                <UploadIcon className="text-indigo-500" />
                            </div>
                            <p className="text-gray-400">Click to upload or drag and drop</p>
                            <p className="text-gray-600 text-xs mt-2">PNG, JPG or WebP (Max 10MB)</p>
                        </>
                    )}
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#161618] border border-[#27272a] rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
                            placeholder="e.g. Neon City Sunset"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#161618] border border-[#27272a] rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors h-32"
                            placeholder="Describe this wallpaper..."
                        />
                    </div>
                </div>

                <button
                    disabled={uploading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    {uploading ? 'Uploading...' : 'Publish Wallpaper'}
                </button>
            </form>
        </div>
    )
}
