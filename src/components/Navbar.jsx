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
                transition: 'all 0.3s ease',
                bgcolor: scrolled ? alpha(theme.palette.background.paper, 0.8) : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
                color: theme.palette.text.primary,
                boxShadow: scrolled
                    ? mode === 'light'
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                    : 'none',
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    maxWidth: '1200px',
                    width: '100%',
                    margin: '0 auto',
                    height: '64px',
                    minHeight: '64px !important',
                    padding: '0 16px',
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Logo */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{ 
                        position: 'relative', 
                        width: 36, 
                        height: 36, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.1),
                        borderRadius: '10px'
                    }}>
                        <img src="/logo.png" alt="DOC-SHIFT Logo" width="24" height="24" style={{ width: 24, height: 24, objectFit: 'contain', position: 'relative', zIndex: 1 }} />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: '-0.04em',
                            color: theme.palette.text.primary,
                            fontFamily: '"Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                color: mode === 'light' ? '#2563EB' : '#38BDF8',
                                fontWeight: 900,
                            }}
                        >
                            DOC
                        </Box>
                        -SHIFT
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

                    <IconButton 
                        onClick={toggleDarkMode} 
                        sx={{ color: theme.palette.text.primary }}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
                    </IconButton>
                    <Box sx={{ width: '1px', height: 24, bgcolor: theme.palette.divider, mx: 1 }} />
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/#tools"
                        endIcon={<ArrowRight size={16} />}
                        sx={{ borderRadius: '99px', px: 3, fontWeight: 700 }}
                    >
                        Get Started
                    </Button>
                </Box>

            {/* Mobile Toggle */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                <IconButton 
                    onClick={toggleDarkMode} 
                    sx={{ color: theme.palette.text.primary }}
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
                </IconButton>
                <IconButton 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    sx={{ color: theme.palette.text.primary }}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                </IconButton>
            </Box>
            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1999,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '300px',
                            background: theme.palette.background.paper,
                            zIndex: 2000,
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 900,
                                    letterSpacing: '-0.04em',
                                    fontFamily: '"Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                                }}
                            >
                                <Box component="span" sx={{ color: mode === 'light' ? '#2563EB' : '#38BDF8' }}>
                                    DOC
                                </Box>
                                -SHIFT
                            </Typography>
                            <IconButton onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                                <X size={24} />
                            </IconButton>
                        </Box>

                            <Button 
                                fullWidth 
                                onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }}
                                sx={{ justifyContent: 'flex-start', py: 1.5, fontWeight: 600 }}
                            >
                                Home
                            </Button>
                            
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                    Categories
                                </Typography>
                                {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                                    <Button
                                        key={category.id}
                                        fullWidth
                                        onClick={() => { 
                                            setIsMobileMenuOpen(false); 
                                            const el = document.getElementById('tools');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        sx={{ 
                                            justifyContent: 'flex-start', 
                                            py: 1, 
                                            color: getToolsByCategory(category.id)[0]?.color,
                                            fontWeight: 600
                                        }}
                                    >
                                        {category.label}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 1 }} />

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => { 
                                    setIsMobileMenuOpen(false); 
                                    navigate('/#tools');
                                }}
                                sx={{ py: 1.5, borderRadius: '12px', fontWeight: 800 }}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Toolbar>
        </AppBar>
    );
}

