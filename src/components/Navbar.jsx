import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, IconButton, Typography, useTheme, Card, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChevronDown, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, getToolsByCategory } from '../utils/tools';
import { useColorMode } from '../contexts/ColorModeContext';
import { springPhysics } from '../animations/variants';

const Logo = ({ color, isDark }) => (
    <Box sx={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background glowing docs */}
            <motion.rect 
                x="8" y="4" width="20" height="24" rx="6" 
                fill={alpha(color, 0.2)} 
                stroke={color} 
                strokeWidth="1.5"
                animate={{ x: [8, 10, 8], y: [4, 2, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Primary doc */}
            <motion.rect 
                x="4" y="8" width="20" height="24" rx="6" 
                fill={color} 
                stroke={color} 
                strokeWidth="1.5"
                animate={{ x: [4, 2, 4], y: [8, 10, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            {/* "Shift" lines */}
            <path d="M10 16H18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M10 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M10 24H18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </svg>
    </Box>
);

export default function Navbar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { mode, toggleColorMode } = useColorMode();
    const isDark = mode === 'dark';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    const primaryColor = isDark ? '#38BDF8' : '#2563EB';

    // Memoize categorized tools for performance
    const categorizedTools = useMemo(() => {
        return CATEGORIES.filter(c => c.id !== 'all').map(category => ({
            ...category,
            tools: getToolsByCategory(category.id)
        }));
    }, []);

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

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                bgcolor: scrolled ? alpha(theme.palette.background.paper, 0.8) : 'transparent',
                backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                borderBottom: scrolled ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
                color: theme.palette.text.primary,
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    maxWidth: '1400px',
                    width: '100%',
                    margin: '0 auto',
                    height: scrolled ? '64px' : '84px',
                    minHeight: '64px !important',
                    px: { xs: 2.5, md: 4, lg: 6 },
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {/* Logo */}
                <Box 
                    component={Link} 
                    to="/" 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5, 
                        textDecoration: 'none', 
                        color: 'inherit',
                        '&:hover .logo-svg': { scale: 1.05 }
                    }}
                >
                    <Logo color={primaryColor} isDark={isDark} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            fontSize: '1.4rem',
                            letterSpacing: '-0.04em',
                            color: theme.palette.text.primary,
                            fontFamily: '"Space Grotesk", sans-serif',
                        }}
                    >
                        <Box component="span" sx={{ color: '#38BDF8' }}>DOC</Box>-SHIFT
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 5 }}>
                    <Box ref={dropdownRef} sx={{ position: 'relative' }}>
                        <Button
                            color="inherit"
                            onMouseEnter={() => setIsMenuOpen(true)}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            endIcon={<motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}><ChevronDown size={14} /></motion.div>}
                            sx={{ 
                                fontWeight: 700, 
                                color: theme.palette.text.primary, 
                                '&:hover': { color: theme.palette.primary.main, background: 'transparent' },
                                fontSize: '0.9rem'
                            }}
                        >
                            All Tools
                        </Button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                                    onMouseLeave={() => setIsMenuOpen(false)}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ 
                                        position: 'absolute', 
                                        top: 'calc(100% + 15px)', 
                                        left: '50%', 
                                        transform: 'translateX(-50%)', 
                                        zIndex: 100 
                                    }}
                                >
                                    <Card sx={{ 
                                        width: 1000, 
                                        p: 6, 
                                        borderRadius: '32px',
                                        boxShadow: mode === 'dark' 
                                            ? '0 40px 100px -20px rgba(0,0,0,0.8)' 
                                            : '0 40px 100px -20px rgba(0,0,0,0.15)',
                                        border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.08 : 0.1)}`,
                                        bgcolor: isDark ? '#0F1115' : alpha('#fff', 0.98),
                                        backdropFilter: 'blur(32px)',
                                    }}>
                                        <Grid container spacing={5}>
                                            {categorizedTools.map(category => {
                                                const catTools = category.tools;
                                                // Get color from the first tool in category or fallback
                                                const catColor = catTools[0]?.color || theme.palette.primary.main;
                                                
                                                return (
                                                    <Grid item xs={3} key={category.id} sx={{ mb: 2 }}>
                                                        <Typography 
                                                            variant="overline" 
                                                            sx={{ 
                                                                fontWeight: 900, 
                                                                color: catColor, 
                                                                letterSpacing: '0.08em', 
                                                                mb: 3, 
                                                                display: 'block',
                                                                fontSize: '0.75rem'
                                                            }}
                                                        >
                                                            {category.label.toUpperCase()}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                            {catTools.map(tool => (
                                                                <Box key={tool.slug} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography
                                                                        onClick={() => { setIsMenuOpen(false); navigate(`/tool/${tool.slug}`); }}
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            color: 'text.primary',
                                                                            fontWeight: 500,
                                                                            fontSize: '0.9rem',
                                                                            transition: 'all 0.2s',
                                                                            '&:hover': { color: catColor, transform: 'translateX(4px)' }
                                                                        }}
                                                                    >
                                                                        {tool.name}
                                                                    </Typography>
                                                                    {tool.isNew && (
                                                                        <Box sx={{
                                                                            ml: 1, px: 0.8, py: 0.2, borderRadius: '4px',
                                                                            bgcolor: '#38BDF8', color: '#fff', fontSize: '10px', fontWeight: 900,
                                                                            textTransform: 'uppercase'
                                                                        }}>
                                                                            NEW
                                                                        </Box>
                                                                    )}
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>

                    {['Features', 'About'].map((item) => (
                        <motion.div key={item} whileHover={{ y: -1 }} transition={springPhysics}>
                            <Button 
                                href={`#${item.toLowerCase()}`} 
                                color="inherit" 
                                sx={{ 
                                    fontWeight: 700, 
                                    color: theme.palette.text.primary, 
                                    '&:hover': { color: theme.palette.primary.main, background: 'transparent' },
                                    fontSize: '0.9rem'
                                }}
                            >
                                {item}
                            </Button>
                        </motion.div>
                    ))}

                    <IconButton 
                        onClick={toggleColorMode} 
                        sx={{ color: theme.palette.text.primary, bgcolor: alpha(theme.palette.divider, 0.05), '&:hover': { bgcolor: alpha(theme.palette.divider, 0.1) } }}
                    >
                        {isDark ? <Sun size={20} strokeWidth={2.2} /> : <Moon size={20} strokeWidth={2.2} />}
                    </IconButton>

                    <Button
                        variant="contained"
                        component={Link}
                        to="/#tools"
                        data-magnetic
                        sx={{ 
                            borderRadius: '14px', 
                            px: 3.5, 
                            py: 1.2,
                            fontWeight: 800,
                            bgcolor: '#38BDF8', // Matching hero primary
                            color: '#000',
                            '&:hover': { bgcolor: alpha('#38BDF8', 0.9) }
                        }}
                    >
                        Get Started <ArrowRight size={18} style={{ marginLeft: 8 }} />
                    </Button>
                </Box>

                {/* Mobile Toggle */}
                <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1 }}>
                    <IconButton 
                        onClick={toggleColorMode} 
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {isDark ? <Sun size={22} strokeWidth={2.5} /> : <Moon size={22} strokeWidth={2.5} />}
                    </IconButton>
                    <IconButton 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {isMobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
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
                                background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(12px)',
                                zIndex: 1999,
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '100%',
                                maxWidth: '350px',
                                background: isDark ? '#09090B' : '#FFFFFF',
                                zIndex: 2000,
                                borderLeft: `1px solid ${theme.palette.divider}`,
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Logo color={primaryColor} />
                                    <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: '"Space Grotesk", sans-serif' }}>DocShift</Typography>
                                </Box>
                                <IconButton onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={24} />
                                </IconButton>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {['Home', 'Features', 'Pricing', 'API'].map((item) => (
                                    <Button 
                                        key={item}
                                        fullWidth 
                                        onClick={() => { setIsMobileMenuOpen(false); navigate(item === 'Home' ? '/' : `/#${item.toLowerCase()}`); }}
                                        sx={{ justifyContent: 'flex-start', py: 2, fontWeight: 700, fontSize: '1.1rem', color: 'text.primary' }}
                                    >
                                        {item}
                                    </Button>
                                ))}
                                
                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>Categories</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                                        {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                                            <Button
                                                key={category.id}
                                                onClick={() => { 
                                                    setIsMobileMenuOpen(false); 
                                                    navigate('/#tools');
                                                }}
                                                sx={{ 
                                                    justifyContent: 'flex-start', 
                                                    py: 1, 
                                                    color: 'text.secondary',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {category.label}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 'auto' }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => { setIsMobileMenuOpen(false); navigate('/#tools'); }}
                                    sx={{ py: 2, borderRadius: '16px', fontWeight: 900, mb: 2 }}
                                >
                                    Start Now
                                </Button>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Toolbar>
        </AppBar>
    );
}
