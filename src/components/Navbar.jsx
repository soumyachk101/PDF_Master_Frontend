import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, IconButton, Typography, useTheme, Card, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChevronDown, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, getToolsByCategory } from '../utils/tools';
import { useColorMode } from '../contexts/ColorModeContext';

export default function Navbar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { mode, toggleColorMode } = useColorMode();
    const isDark = mode === 'dark';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDarkMode = toggleColorMode;

    return (
        <AppBar
            position="fixed"
            elevation={scrolled ? 2 : 0}
            sx={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                bgcolor: alpha(theme.palette.background.paper, scrolled ? 0.95 : 0.85),
                backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                background: scrolled 
                    ? mode === 'light'
                        ? `linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,244,246,0.95) 100%)`
                        : `linear-gradient(180deg, rgba(39,39,42,0.98) 0%, rgba(24,24,27,0.95) 100%)`
                    : alpha(theme.palette.background.paper, 0.85),
                boxShadow: scrolled
                    ? mode === 'light'
                        ? `
                            inset 0 1px 0 rgba(255,255,255,0.8),
                            0 4px 12px rgba(0,0,0,0.1),
                            0 1px 0 rgba(0,0,0,0.05)
                          `
                        : `
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 8px 24px rgba(0,0,0,0.4),
                            0 1px 0 rgba(0,0,0,0.3)
                          `
                    : 'none',
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    maxWidth: scrolled ? '1024px' : '1200px',
                    width: '100%',
                    margin: '0 auto',
                    borderRadius: scrolled ? '999px' : '0px',
                    height: '64px',
                    minHeight: '64px !important',
                    padding: scrolled ? '0 24px' : '0 16px',
                    background: scrolled 
                        ? mode === 'light' 
                            ? `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(243,244,246,0.9) 100%)`
                            : `linear-gradient(180deg, rgba(39,39,42,0.95) 0%, rgba(24,24,27,0.9) 100%)`
                        : 'transparent',
                    boxShadow: scrolled
                        ? mode === 'light'
                            ? `
                                inset 0 1px 0 rgba(255,255,255,0.7),
                                0 6px 20px rgba(0,0,0,0.1),
                                0 2px 0 rgba(0,0,0,0.05)
                              `
                            : `
                                inset 0 1px 0 rgba(255,255,255,0.1),
                                0 10px 30px rgba(0,0,0,0.5),
                                0 2px 0 rgba(0,0,0,0.3)
                              `
                        : 'none',
                    border: scrolled 
                        ? `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)'}`
                        : 'none',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Logo */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{ position: 'relative', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            style={{ position: 'absolute', inset: 0, backgroundColor: alpha('#22D3EE', 0.2), borderRadius: '12px', transform: 'rotate(6deg)' }}
                        />
                        <img src="/logo.png" alt="PDFKit Logo" style={{ width: 32, height: 32, objectFit: 'contain', position: 'relative', zIndex: 1 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: theme.palette.text.primary }}>
                        <Box component="span" sx={{ color: '#22D3EE', fontWeight: 900 }}>PDF</Box>Kit
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
                    <Box ref={dropdownRef} sx={{ position: 'relative' }}>
                        <Button
                            color="inherit"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            endIcon={<motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}><ChevronDown size={14} /></motion.div>}
                            sx={{ fontWeight: 600, color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main, background: 'transparent' } }}
                        >
                            All Tools
                        </Button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}
                                >
                                    <Card sx={{ width: 800, p: 4, borderRadius: '24px' }}>
                                        <Grid container spacing={4}>
                                            {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                                                <Grid xs={3} key={category.id}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', color: getToolsByCategory(category.id)[0]?.color }}>
                                                        {category.label}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                        {getToolsByCategory(category.id).map(tool => (
                                                            <Button
                                                                key={tool.slug}
                                                                variant="text"
                                                                onClick={() => { setIsMenuOpen(false); navigate(`/tool/${tool.slug}`); }}
                                                                sx={{
                                                                    justifyContent: 'flex-start',
                                                                    color: theme.palette.text.secondary,
                                                                    fontWeight: 500,
                                                                    fontSize: '0.85rem',
                                                                    p: '4px 8px',
                                                                    '&:hover': { color: theme.palette.text.primary, backgroundColor: alpha(theme.palette.primary.main, 0.05) }
                                                                }}
                                                            >
                                                                {tool.name}
                                                                {tool.isNew && (
                                                                    <Box component="span" sx={{ ml: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontSize: '0.6rem', fontWeight: 800, px: 0.8, py: 0.2, borderRadius: '99px' }}>
                                                                        NEW
                                                                    </Box>
                                                                )}
                                                            </Button>
                                                        ))}
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>

                    <Button href="#features" color="inherit" sx={{ fontWeight: 600, color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main, background: 'transparent' } }}>Features</Button>
                    <Button href="#about" color="inherit" sx={{ fontWeight: 600, color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main, background: 'transparent' } }}>About</Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
                        <IconButton onClick={toggleDarkMode} sx={{ color: theme.palette.text.primary }}>
                            {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
                        </IconButton>
                        <Box sx={{ width: '1px', height: 24, bgcolor: theme.palette.divider, mx: 1 }} />
                        <Button
                            variant="contained"
                            color="primary"
                            href="#tools"
                            endIcon={<ArrowRight size={16} />}
                            sx={{ borderRadius: '99px', px: 3, fontWeight: 700 }}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Box>

                {/* Mobile Toggle */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={toggleDarkMode} sx={{ color: theme.palette.text.primary }}>
                        {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
                    </IconButton>
                    <IconButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} sx={{ color: theme.palette.text.primary }}>
                        {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

