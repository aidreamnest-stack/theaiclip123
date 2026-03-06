export default function FAQPage() {
    const faqs = [
        {
            q: "How are the wallpapers generated?",
            a: "All our wallpapers are generated using state-of-the-art AI models, specifically trained and fine-tuned for high-quality digital background generation."
        },
        {
            q: "Are the wallpapers free to use?",
            a: "Yes, currently all wallpapers on theAIclip are free to download and use for personal devices. For commercial usage, please refer to our Terms of Service."
        },
        {
            q: "What resolutions are available?",
            a: "We offer wallpapers in popular resolutions including 4K for desktop (16:9) and high-resolution vertical formats (9:16) optimized for modern smartphones."
        },
        {
            q: "Can I request a custom wallpaper?",
            a: "We are working on a feature that will allow users to prompt and generate their own custom wallpapers directly on our platform. Stay tuned!"
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
                        <p className="text-white/60">Everything you need to know about theAIclip.</p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
