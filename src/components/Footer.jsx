import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/tools';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-surface-dark border-t border-border dark:border-border-dark pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-content mx-auto px-4 sm:px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-8 h-8 rounded-icon bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-ink-primary dark:text-white">
                                <span className="text-primary">PDF</span>Kit
                            </span>
                        </Link>
                        <p className="font-body text-ink-secondary dark:text-ink-muted leading-relaxed max-w-sm">
                            Every PDF tool you'll ever need. 100% Free. No limits. No signup required. We believe essential document tools should be accessible to everyone.
                        </p>
                    </div>

                    {/* Categories Columns */}
                    <div className="flex flex-col gap-5">
                        <h4 className="font-display font-bold text-ink-primary dark:text-white">Tools</h4>
                        <ul className="flex flex-col gap-3">
                            {CATEGORIES.filter(c => c.id !== 'all').slice(0, 4).map(cat => (
                                <li key={cat.id}>
                                    <Link to="/" className="font-body text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h4 className="font-display font-bold text-ink-primary dark:text-white">More Tools</h4>
                        <ul className="flex flex-col gap-3">
                            {CATEGORIES.filter(c => c.id !== 'all').slice(4).map(cat => (
                                <li key={cat.id}>
                                    <Link to="/" className="font-body text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors">
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal / Company */}
                    <div className="flex flex-col gap-5">
                        <h4 className="font-display font-bold text-ink-primary dark:text-white">Legal</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/" className="font-body text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/" className="font-body text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link to="/" className="font-body text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors">About Us</Link></li>
                            <li><a href="mailto:contact@pdfkit.fun" className="font-body text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border dark:border-border-dark flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-body text-sm text-ink-muted">
                        © {currentYear} PDFKit. All rights reserved. Made with ❤️ for the world.
                    </p>

                    <div className="flex items-center gap-6">
                        <span className="font-body text-sm font-semibold px-3 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            All tools are Free
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
