import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/tools';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-white dark:bg-bg-dark pt-20 pb-10 transition-colors duration-300 overflow-hidden">
            {/* Subtle top gradient border effect */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border dark:via-border-dark to-transparent opacity-50"></div>

            <div className="max-w-content mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-glow group-hover:-rotate-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            </div>
                            <span className="font-display font-extrabold text-2xl tracking-tight text-ink-primary dark:text-white">
                                <span className="text-primary font-black">PDF</span>Kit
                            </span>
                        </Link>
                        <p className="font-body text-ink-secondary dark:text-ink-muted leading-relaxed max-w-sm text-base">
                            Every PDF tool you'll ever need. <strong>100% Free. No limits. No signup required.</strong> We believe essential document utilities should be accessible, secure, and beautiful to use.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            {/* Social mock placeholders */}
                            {['Twitter', 'GitHub', 'Discord'].map((social, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-surface dark:bg-surface-dark border border-border dark:border-border-dark flex items-center justify-center text-ink-secondary hover:text-primary hover:border-primary/50 transition-all font-display text-xs font-bold">
                                    {social.charAt(0)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Categories Columns */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-display font-bold text-lg text-ink-primary dark:text-white tracking-wide">Tools</h4>
                        <ul className="flex flex-col gap-3">
                            {CATEGORIES.filter(c => c.id !== 'all').slice(0, 4).map(cat => (
                                <li key={cat.id}>
                                    <Link to="/" className="relative font-body font-medium text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors group py-1 inline-block">
                                        {cat.label}
                                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="font-display font-bold text-lg text-ink-primary dark:text-white tracking-wide">More Tools</h4>
                        <ul className="flex flex-col gap-3">
                            {CATEGORIES.filter(c => c.id !== 'all').slice(4).map(cat => (
                                <li key={cat.id}>
                                    <Link to="/" className="relative font-body font-medium text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors group py-1 inline-block">
                                        {cat.label}
                                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal / Company */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-display font-bold text-lg text-ink-primary dark:text-white tracking-wide">Legal</h4>
                        <ul className="flex flex-col gap-3">
                            {['Privacy Policy', 'Terms of Service', 'About Us', 'Contact'].map((link, i) => (
                                <li key={i}>
                                    <Link to="/" className="relative font-body font-medium text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors group py-1 inline-block">
                                        {link}
                                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 dark:border-border-dark/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="font-body text-[15px] font-medium text-ink-muted">
                        © {currentYear} <span className="text-ink-primary dark:text-white font-bold">PDFKit</span>. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <span className="font-display text-sm font-bold tracking-wide uppercase px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border border-green-500/20 shadow-sm">
                            Always Free
                        </span>
                    </div>
                </div>

            </div>

            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none -z-10"></div>
        </footer>
    );
}
