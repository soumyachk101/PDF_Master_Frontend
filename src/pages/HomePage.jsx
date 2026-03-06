import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { CATEGORIES, getToolsByCategory } from '../utils/tools';

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const displayedTools = getToolsByCategory(activeCategory);

    return (
        <div className="flex flex-col w-full min-h-screen">

            {/* ── HERO SECTION ── */}
            <section className="relative overflow-hidden bg-primary-light dark:bg-surface-deeper animate-fade-in pt-32 pb-24 px-4 sm:px-6">
                <div className="absolute inset-0 bg-white/20 dark:bg-black/10 z-0"></div>
                <div className="max-w-[900px] mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-ink-primary dark:text-white leading-[1.1] mb-6 animate-fade-up">
                        Every tool you need to work with PDFs <span className="text-primary italic font-serif z-10 tracking-normal">in one place</span>
                    </h1>
                    <p className="text-lg md:text-xl font-body text-ink-secondary dark:text-ink-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks. <strong>100% Free. No limits. No signup required.</strong>
                    </p>
                    <div className="flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <a href="#tools" className="font-display font-semibold text-lg bg-primary text-white hover:bg-primary-hover px-8 py-4 rounded-btn shadow-btn-red transition-all hover:-translate-y-1">
                            Explore All Tools
                        </a>
                        <a href="#features" className="font-display font-semibold text-lg bg-white dark:bg-surface-dark text-ink-primary dark:text-white hover:border-primary border border-transparent dark:border-border-dark px-8 py-4 rounded-btn shadow-card transition-all hover:-translate-y-1">
                            How it works
                        </a>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            </section>

            {/* ── TRUST STRIP ── */}
            <section className="border-y border-border dark:border-border-dark bg-white dark:bg-surface-dark overflow-hidden">
                <div className="flex gap-8 justify-center py-6 px-4 flex-wrap max-w-content mx-auto">
                    {[
                        { icon: 'ShieldCheck', text: 'Secure Encryption Validated' },
                        { icon: 'Zap', text: 'Lightning Fast Processing' },
                        { icon: 'ServerCrash', text: 'Zero Data Retention Policy' },
                        { icon: 'HeartHandshake', text: '100% Free Forever' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 whitespace-nowrap text-ink-muted dark:text-ink-secondary font-body text-sm font-medium">
                            <DynamicIcon name={item.icon} size={18} className="text-primary/70" />
                            {item.text}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MAIN TOOLS GRID ── */}
            <section id="tools" className="py-24 px-4 sm:px-6 max-w-content mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-ink-primary dark:text-white mb-4">Unleash Your Documents</h2>
                    <p className="font-body text-ink-secondary dark:text-ink-muted text-lg max-w-xl mx-auto">
                        Select an action below to instantly process your file. No accounts, no watermarks, no limits.
                    </p>
                </div>

                {/* Categories Carousel */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`font-body font-semibold text-sm px-6 py-2.5 rounded-pill transition-all ${activeCategory === category.id
                                ? 'bg-ink-primary text-white dark:bg-primary dark:text-white shadow-md'
                                : 'bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-ink-secondary dark:text-ink-muted hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary'
                                }`}
                        >
                            {category.label}
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-pill ${activeCategory === category.id ? 'bg-white/20' : 'bg-black/5 dark:bg-white/5'}`}>
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedTools.map((tool, idx) => (
                        <Link
                            key={tool.slug}
                            to={`/tool/${tool.slug}`}
                            className="group bg-white dark:bg-surface-dark border border-border dark:border-border-dark rounded-card p-6 flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1 animate-fade-in"
                            style={{ animationDelay: `${idx * 0.02}s` }}
                        >
                            <div
                                className="w-14 h-14 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                            >
                                <DynamicIcon name={tool.icon} size={28} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-[17px] text-ink-primary dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                    {tool.name}
                                    {tool.isNew && <span className="bg-primary/10 text-primary text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>}
                                </h3>
                                <p className="font-body text-sm text-ink-secondary dark:text-ink-muted mt-1.5 leading-relaxed line-clamp-2" title={tool.desc}>
                                    {tool.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── FEATURES / WHY US ── */}
            <section id="features" className="py-24 bg-surface dark:bg-surface-deeper border-y border-border dark:border-border-dark px-4 sm:px-6 overflow-hidden">
                <div className="max-w-content mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-3xl rotate-3 blur-sm"></div>
                        <div className="relative bg-white dark:bg-surface-dark border border-border dark:border-border-dark p-8 rounded-3xl shadow-xl flex flex-col gap-6">
                            {/* Fake UI Element representation */}
                            <div className="h-12 w-full bg-surface dark:bg-bg rounded-lg flex items-center px-4 gap-3 border border-border dark:border-border-dark">
                                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center"><Icons.FileText size={14} className="text-primary" /></div>
                                <div className="h-2.5 w-32 bg-ink-muted/30 rounded-full"></div>
                                <div className="h-2.5 w-12 bg-ink-muted/20 rounded-full ml-auto"></div>
                            </div>
                            <div className="h-[200px] w-full border-2 border-dashed border-primary/40 bg-primary/5 rounded-xl flex flex-col items-center justify-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-btn-red animate-bounce-in">
                                    <Icons.ArrowUp size={28} strokeWidth={3} />
                                </div>
                                <span className="font-display font-bold text-primary">Drop files here</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl font-display font-bold text-ink-primary dark:text-white mb-6">Built for speed, privacy, and simplicity.</h2>
                        <div className="flex flex-col gap-8">
                            {[
                                { title: 'Zero Data Retention', desc: 'Your files are processed securely and immediately deleted from our servers permanently after 30 minutes.', icon: 'Shield' },
                                { title: 'Works on All Devices', desc: 'Whether you use Mac, Windows, iOS, or Android, PDFKit works flawlessly in your browser.', icon: 'MonitorSmartphone' },
                                { title: 'No Account Needed', desc: "We firmly believe core utilities shouldn't be gated behind a login screen. Start converting instantly.", icon: 'UserX' }
                            ].map((f, i) => (
                                <div key={i} className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 shrink-0 bg-primary/10 text-primary rounded-xl flex items-center justify-center mt-1">
                                        <DynamicIcon name={f.icon} size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-xl text-ink-primary dark:text-white mb-2">{f.title}</h4>
                                        <p className="font-body text-ink-secondary dark:text-ink-muted leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
