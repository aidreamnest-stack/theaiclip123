import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                        <p className="text-white/60">Have questions? We're here to help.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">Email Us</h3>
                                    <p className="text-white/60 text-sm">support@theaiclip.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">Location</h3>
                                    <p className="text-white/60 text-sm">Global HQ, AI Valley</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-green-500/20 rounded-lg text-green-500">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">Phone</h3>
                                    <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 transition-colors"
                                    ></textarea>
                                </div>
                                <button className="w-full flex items-center justify-center space-x-2 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
                                    <Send size={20} />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
