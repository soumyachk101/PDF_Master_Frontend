import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';
import { CATEGORIES, getToolsByCategory } from '../utils/tools';

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="fixed top-0 w-full z-50 transition-colors duration-300 bg-white/95 dark:bg-[#1A1A2E]/95 backdrop-blur-md border-b border-border dark:border-border-dark h-[64px]">
            <div className="max-w-content mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

                {/* Logo Left */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        alt="PDFKit Logo"
                        className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                    />
                    <span className="font-display font-bold text-xl tracking-tight text-ink-primary dark:text-white">
                        <span className="text-primary">PDF</span>Kit
                    </span>
                </Link>

                {/* Desktop Center Links */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-1 font-body font-medium text-ink-primary dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Tools <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mega Menu Dropdown */}
                        {isMenuOpen && (
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] bg-white dark:bg-surface-dark rounded-[16px] shadow-modal border border-border dark:border-border-dark p-7 grid grid-cols-4 gap-6 animate-fade-in">
                                {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                                    <div key={category.id} className="flex flex-col gap-2">
                                        <h4 className={`font-display font-bold text-sm`} style={{ color: getToolsByCategory(category.id)[0]?.color }}>
                                            {category.label}
                                        </h4>
                                        <div className="flex flex-col gap-1">
                                            {getToolsByCategory(category.id).map(tool => (
                                                <Link
                                                    key={tool.slug}
                                                    to={`/tool/${tool.slug}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="font-body text-[13px] text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"
                                                >
                                                    • {tool.name}
                                                    {tool.isNew && <span className="bg-primary-light text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <a href="#features" className="font-body font-medium text-ink-primary dark:text-white hover:text-primary transition-colors">Features</a>
                    <a href="#about" className="font-body font-medium text-ink-primary dark:text-white hover:text-primary transition-colors">About</a>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-surface dark:hover:bg-surface-deeper text-ink-primary dark:text-white transition-colors">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <a href="#tools" className="font-body font-semibold text-sm px-5 py-2.5 rounded-btn border border-border dark:border-border-dark text-ink-primary dark:text-white hover:border-primary hover:text-primary transition-colors">
                        All Tools
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleDarkMode} className="text-ink-primary dark:text-white">
                        {isDark ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-ink-primary dark:text-white">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white dark:bg-[#1A1A2E] overflow-y-auto z-40 animate-slide-down border-t border-border dark:border-border-dark p-6">
                    <div className="flex flex-col gap-6">
                        <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-xl text-ink-primary dark:text-white">Features</a>
                        <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-xl text-ink-primary dark:text-white">About</a>
                        <a href="#tools" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-xl text-primary">Explore All Tools →</a>

                        <div className="h-px bg-border dark:bg-border-dark my-2" />

                        {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                            <div key={category.id} className="flex flex-col gap-3">
                                <h4 className="font-display font-bold text-lg" style={{ color: getToolsByCategory(category.id)[0]?.color }}>
                                    {category.label}
                                </h4>
                                <div className="flex flex-col gap-3 pl-2 border-l-2 border-border dark:border-border-dark">
                                    {getToolsByCategory(category.id).map(tool => (
                                        <Link
                                            key={tool.slug}
                                            to={`/tool/${tool.slug}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="font-body text-base text-ink-secondary dark:text-ink-muted"
                                        >
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
