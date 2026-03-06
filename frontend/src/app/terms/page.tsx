export default function TermsPage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using theAIclip, you agree to be bound by these Terms of Service and all applicable laws and regulations."
        },
        {
            title: "2. License to Use",
            content: "We grant you a personal, non-exclusive, non-transferable license to download and use wallpapers for personal, non-commercial use on your own devices."
        },
        {
            title: "3. Restrictions",
            content: "You may not resell, redistribute, or use our wallpapers as part of another service without explicit written permission. AI-generated content remains property of theAIclip generators."
        },
        {
            title: "4. Disclaimer",
            content: "Wallpapers are provided 'as is'. While we strive for the highest quality, we make no warranties regarding the content's accuracy or suitability for specific purposes."
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
                        <p className="text-white/60">Last updated: March 2026</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-10">
                        {sections.map((section, i) => (
                            <div key={i} className="space-y-4">
                                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                                <p className="text-white/60 text-sm leading-relaxed">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
