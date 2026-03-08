import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useTheme, InputBase } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CATEGORIES, getToolsByCategory } from '../utils/tools';

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

function HomePage() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categoryTools = getToolsByCategory(activeCategory);
    const displayedTools = searchQuery.trim()
        ? categoryTools.filter(tool => {
            const q = searchQuery.toLowerCase();
            return tool.name.toLowerCase().includes(q)
                || tool.shortDesc.toLowerCase().includes(q)
                || tool.desc.toLowerCase().includes(q)
                || tool.slug.toLowerCase().includes(q);
        })
        : categoryTools;

    // --- Parallax & Mouse Tracking ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const targetX = clientX - window.innerWidth / 2;
        const targetY = clientY - window.innerHeight / 2;
        mouseX.set(targetX);
        mouseY.set(targetY);
    };

    const springConfig = { damping: 25, stiffness: 150 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    const parallaxX1 = useTransform(smoothMouseX, [-500, 500], [20, -20]);
    const parallaxY1 = useTransform(smoothMouseY, [-500, 500], [20, -20]);
    
    const parallaxX2 = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
    const parallaxY2 = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

    const parallaxX3 = useTransform(smoothMouseX, [-500, 500], [40, -40]);
    const parallaxY3 = useTransform(smoothMouseY, [-500, 500], [40, -40]);

    // Text Reveal Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>

            {/* ── HERO SECTION ── */}
            <Box
                component="section"
                onMouseMove={handleMouseMove}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    pt: { xs: 16, md: 20 },
                    pb: { xs: 14, md: 24 },
                    px: 3,
                    bgcolor: mode === 'light' ? '#F8FAFC' : '#09090B',
                }}
            >
                {/* Main Hero Background Setup */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                    }}
                />

                {/* Grid Pattern Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: mode === 'light' ? 0.3 : 0.4,
                        backgroundImage: `linear-gradient(${mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'} 1px, transparent 1px),
                                          linear-gradient(90deg, ${mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 70%)',
                    }}
                />
                
                {/* Glowing Mesh */}
                <Box sx={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '80%', height: '600px',
                    background: mode === 'light' 
                        ? 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)'
                        : 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0) 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />

                {/* Floating Orbs Removed */ }

                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Content Area */}
                        <Grid item xs={12} lg={6}>
                            <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, maxWidth: '680px', mx: 'auto' }}>
                                {/* Announcement Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Box sx={{
                                        display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1, borderRadius: '99px',
                                        bgcolor: mode === 'light'
                                            ? 'rgba(37, 99, 235, 0.08)'
                                            : 'rgba(56, 189, 248, 0.1)',
                                        border: `1px solid ${mode === 'light' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(56, 189, 248, 0.2)'}`,
                                        mb: 4, backdropFilter: 'blur(12px)',
                                    }}>
                                        <Box sx={{
                                            width: 8, height: 8, borderRadius: '50%', bgcolor: mode === 'light' ? '#2563EB' : '#38BDF8',
                                            boxShadow: `0 0 8px ${mode === 'light' ? '#2563EB' : '#38BDF8'}`,
                                        }} />
                                        <Typography variant="caption" sx={{
                                            fontWeight: 700,
                                            color: mode === 'light' ? '#2563EB' : '#38BDF8',
                                            fontSize: '0.85rem', letterSpacing: '0.5px',
                                        }}>
                                            ✨ PDFKit v2 is now live
                                        </Typography>
                                    </Box>
                                </motion.div>

                                {/* Main Headline (Staggered words) */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <Typography variant="h1" sx={{
                                        fontSize: { xs: '2.5rem', sm: '4rem', md: '5.5rem' },
                                        mb: 4,
                                        lineHeight: 1.05,
                                        fontWeight: 900,
                                        letterSpacing: '-0.04em',
                                    }}>
                                        <motion.span variants={itemVariants} style={{ display: 'inline-block', color: mode === 'light' ? '#0F172A' : '#FAFAFA' }}>
                                            Your
                                        </motion.span>{' '}
                                        <motion.span variants={itemVariants} style={{ display: 'inline-block', color: mode === 'light' ? '#2563EB' : '#38BDF8' }}>
                                            PDFs.
                                        </motion.span>{' '}
                                        <br sx={{ display: { xs: 'none', sm: 'block' } }} />
                                        <motion.span variants={itemVariants} style={{ display: 'inline-block', color: mode === 'light' ? '#0F172A' : '#FAFAFA' }}>
                                            Your
                                        </motion.span>{' '}
                                        <motion.span variants={itemVariants} style={{ display: 'inline-block', color: mode === 'light' ? '#0F172A' : '#FAFAFA' }}>
                                            browser.
                                        </motion.span>
                                        <br />
                                        <motion.span variants={itemVariants} style={{ display: 'inline-block', color: mode === 'light' ? '#0F172A' : '#FAFAFA' }}>
                                            Your
                                        </motion.span>{' '}
                                        <motion.span variants={itemVariants} style={{ display: 'inline-block', color: mode === 'light' ? '#64748B' : '#A1A1AA' }}>
                                            rules.
                                        </motion.span>
                                    </Typography>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.5 }}
                                >
                                    <Typography variant="h6" sx={{
                                        color: mode === 'light' ? '#334155' : '#D4D4D8',
                                        mb: 6,
                                        fontWeight: 400,
                                        lineHeight: 1.7,
                                        fontSize: { xs: '1.05rem', md: '1.25rem' },
                                    }}>
                                        Merge, split, compress, and convert PDFs instantly right in your browser.{' '}
                                        <br sx={{ display: { xs: 'none', sm: 'block' } }}/>
                                        No signups. No limits. Total privacy.
                                    </Typography>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', lg: 'flex-start' }, gap: 2.5, mb: { xs: 8, lg: 0 } }}>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                component="a" href="#tools"
                                                variant="contained"
                                                size="large"
                                                endIcon={<Icons.ArrowRight size={20} />}
                                                sx={{
                                                    py: 2, px: 4, fontSize: '1.1rem', borderRadius: '14px',
                                                    fontWeight: 700,
                                                    boxShadow: mode === 'light' 
                                                        ? '0 8px 32px rgba(37,99,235,0.3)'
                                                        : '0 8px 32px rgba(56,189,248,0.3)',
                                                    animation: 'pulseBtn 2s infinite alternate',
                                                    '@keyframes pulseBtn': {
                                                        '0%': { boxShadow: `0 0 0 0 ${alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.4)}` },
                                                        '100%': { boxShadow: `0 0 0 15px ${alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0)}` }
                                                    }
                                                }}
                                            >
                                                Explore 30+ Tools
                                            </Button>
                                        </motion.div>
                                        
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button
                                                component="a" href="#features"
                                                variant="outlined"
                                                size="large"
                                                sx={{
                                                    py: 2, px: 4, fontSize: '1.1rem', borderRadius: '14px',
                                                    fontWeight: 600,
                                                    border: `2px solid ${mode === 'light' ? '#E2E8F0' : '#27272A'}`,
                                                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                                    '&:hover': {
                                                        border: `2px solid ${mode === 'light' ? '#CBD5E1' : '#3F3F46'}`,
                                                    }
                                                }}
                                            >
                                                How it works
                                            </Button>
                                        </motion.div>
                                    </Box>
                                </motion.div>
                            </Box>
                        </Grid>

                        {/* Right Content Area - Parallax PDF Cards */}
                        <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
                            <Box sx={{ position: 'relative', height: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                
                                {/* Card 1: Merge PDFs */}
                                <motion.div 
                                    style={{ x: parallaxX1, y: parallaxY1, position: 'absolute', top: '10%', right: '15%', zIndex: 3 }}
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                                >
                                    <Box sx={{
                                        width: 220, p: 3, borderRadius: '24px',
                                        bgcolor: mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(24,24,27,0.8)',
                                        backdropFilter: 'blur(20px)',
                                        border: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
                                        boxShadow: mode === 'light' ? '0 20px 40px rgba(0,0,0,0.05)' : '0 20px 40px rgba(0,0,0,0.5)',
                                        display: 'flex', flexDirection: 'column', gap: 2,
                                        transform: 'rotate(6deg)'
                                    }}>
                                        <Box sx={{ width: 48, height: 48, borderRadius: '16px', bgcolor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                                            <Icons.Files size={24} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: mode === 'light' ? '#0F172A' : '#FAFAFA' }}>Merge PDFs</Typography>
                                            <Box sx={{ width: '60%', height: 6, borderRadius: '3px', bgcolor: mode === 'light' ? '#E2E8F0' : '#27272A', mt: 1 }} />
                                            <Box sx={{ width: '40%', height: 6, borderRadius: '3px', bgcolor: mode === 'light' ? '#E2E8F0' : '#27272A', mt: 0.5 }} />
                                        </Box>
                                    </Box>
                                </motion.div>

                                {/* Card 2: Compress PDF */}
                                <motion.div 
                                    style={{ x: parallaxX2, y: parallaxY2, position: 'absolute', bottom: '15%', left: '10%', zIndex: 2 }}
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
                                >
                                    <Box sx={{
                                        width: 200, p: 3, borderRadius: '24px',
                                        bgcolor: mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(24,24,27,0.85)',
                                        backdropFilter: 'blur(20px)',
                                        border: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
                                        boxShadow: mode === 'light' ? '0 20px 40px rgba(0,0,0,0.05)' : '0 20px 40px rgba(0,0,0,0.5)',
                                        display: 'flex', flexDirection: 'column', gap: 2,
                                        transform: 'rotate(-4deg)'
                                    }}>
                                        <Box sx={{ width: 48, height: 48, borderRadius: '16px', bgcolor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                                            <Icons.Minimize2 size={24} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: mode === 'light' ? '#0F172A' : '#FAFAFA' }}>Compress</Typography>
                                                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>-70%</Typography>
                                                <Box sx={{ flexGrow: 1, height: 4, borderRadius: '2px', bgcolor: mode === 'light' ? '#E2E8F0' : '#27272A', overflow: 'hidden' }}>
                                                    <Box sx={{ width: '30%', height: '100%', bgcolor: '#10B981' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </motion.div>

                                {/* Card 3: Convert */}
                                <motion.div 
                                    style={{ x: parallaxX3, y: parallaxY3, position: 'absolute', top: '40%', right: '-5%', zIndex: 1 }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }}
                                >
                                    <Box sx={{
                                        width: 180, p: 3, borderRadius: '24px',
                                        bgcolor: mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(24,24,27,0.7)',
                                        backdropFilter: 'blur(15px)',
                                        border: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
                                        boxShadow: mode === 'light' ? '0 20px 40px rgba(0,0,0,0.05)' : '0 20px 40px rgba(0,0,0,0.4)',
                                        display: 'flex', flexDirection: 'column', gap: 2,
                                        transform: 'rotate(12deg)'
                                    }}>
                                        <Box sx={{ width: 48, height: 48, borderRadius: '16px', bgcolor: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7' }}>
                                            <Icons.RefreshCw size={24} />
                                        </Box>
                                    </Box>
                                </motion.div>

                            </Box>
                        </Grid>
                    </Grid>
                    
                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: { xs: 2, md: 3 },
                        }}>
                            {[
                                { value: '25+', label: 'Powerful Tools', icon: 'Layers' },
                                { value: '100%', label: 'Free Forever', icon: 'Heart' },
                                { value: '0ms', label: 'Retention Time', icon: 'Timer' },
                                { value: '🔒', label: 'Encrypted', icon: null },
                            ].map((stat, index) => (
                                <Box key={index} sx={{
                                    textAlign: 'center',
                                    p: { xs: 2.5, md: 3 },
                                    borderRadius: '20px',
                                    bgcolor: mode === 'light'
                                        ? 'rgba(255, 255, 255, 0.7)'
                                        : 'rgba(255, 255, 255, 0.04)',
                                    border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.08)'}`,
                                    backdropFilter: 'blur(12px)',
                                    minWidth: { xs: '140px', md: '160px' },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                    }
                                }}>
                                    <Typography variant="h4" sx={{
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        fontWeight: 900,
                                        color: mode === 'light' ? '#2563EB' : '#38BDF8',
                                        mb: 0.5,
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: mode === 'light' ? '#475569' : '#A1A1AA',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        fontSize: '0.7rem',
                                    }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            {/* ── TRUST STRIP ── */}
            <Box sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                py: 5,
                bgcolor: mode === 'light' ? '#F8FAFC' : '#09090B',
            }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: { xs: 3, md: 6 },
                    }}>
                        {[
                            { icon: 'ShieldCheck', text: 'Secure Encryption' },
                            { icon: 'Zap', text: 'Lightning Fast' },
                            { icon: 'ServerCrash', text: 'Zero Retention' },
                            { icon: 'HeartHandshake', text: '100% Free' },
                        ].map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{
                                    width: 44, height: 44, borderRadius: '12px',
                                    bgcolor: mode === 'light' ? alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.08) : alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.1),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${mode === 'light' ? alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.15) : alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.15)}`,
                                }}>
                                    <DynamicIcon name={item.icon} size={20} color={mode === 'light' ? '#2563EB' : '#38BDF8'} />
                                </Box>
                                <Typography variant="body2" sx={{
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1.5,
                                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                    fontSize: '0.8rem',
                                }}>
                                    {item.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ── MAIN TOOLS GRID ── */}
            <Box id="tools" component="section" sx={{
                py: { xs: 10, md: 15 }, px: 3, position: 'relative',
                bgcolor: mode === 'light' ? '#F8FAFC' : '#09090B',
            }}>
                <Container maxWidth="xl">
                    {/* Tools Section Heading - Simplified */}
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                        <Typography variant="h3" sx={{
                            color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                            mb: 2,
                            fontWeight: 800,
                            fontSize: { xs: '1.75rem', md: '2.5rem' },
                        }}>
                            All PDF Tools
                        </Typography>
                    </Box>

                    {/* Search Bar */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5,
                            width: '100%', maxWidth: '520px',
                            px: 2.5, py: 1.5,
                            borderRadius: '16px',
                            bgcolor: mode === 'light' ? '#FFFFFF' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${mode === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.1)'}`,
                            boxShadow: mode === 'light'
                                ? '0 2px 8px rgba(0,0,0,0.06)'
                                : '0 2px 8px rgba(0,0,0,0.3)',
                            transition: 'all 0.25s ease',
                            '&:focus-within': {
                                borderColor: mode === 'light' ? '#2563EB' : '#38BDF8',
                                boxShadow: `0 0 0 3px ${alpha(mode === 'light' ? '#2563EB' : '#38BDF8', 0.15)}, 0 4px 12px rgba(0,0,0,${mode === 'light' ? '0.08' : '0.4'})`,
                            },
                        }}>
                            <Icons.Search size={20} color={mode === 'light' ? '#9CA3AF' : '#71717A'} style={{ flexShrink: 0 }} />
                            <InputBase
                                placeholder="Search tools... (e.g. merge, compress, convert)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                fullWidth
                                sx={{
                                    fontSize: '0.95rem',
                                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                    '& ::placeholder': {
                                        color: mode === 'light' ? '#9CA3AF' : '#71717A',
                                        opacity: 1,
                                    },
                                }}
                            />
                            {searchQuery && (
                                <Box
                                    component="button"
                                    onClick={() => setSearchQuery('')}
                                    sx={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 28, height: 28, borderRadius: '8px', flexShrink: 0,
                                        bgcolor: mode === 'light' ? '#F1F5F9' : 'rgba(255,255,255,0.08)',
                                        border: 'none', cursor: 'pointer', p: 0,
                                        color: mode === 'light' ? '#475569' : '#A1A1AA',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            bgcolor: mode === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.12)',
                                            color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                        },
                                    }}
                                >
                                    <Icons.X size={14} />
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {/* Category Filter */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 4 }}>
                        {CATEGORIES.map(category => (
                            <Button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                variant={activeCategory === category.id ? "contained" : "text"}
                                sx={{
                                    borderRadius: '99px', px: 2.5, py: 0.8,
                                    fontSize: '0.875rem',
                                    border: activeCategory === category.id
                                        ? 'none'
                                        : `1px solid ${theme.palette.divider}`,
                                    color: activeCategory === category.id
                                        ? '#fff'
                                        : mode === 'light' ? '#334155' : '#D4D4D8',
                                    bgcolor: activeCategory === category.id
                                        ? theme.palette.primary.main
                                        : 'transparent',
                                    boxShadow: activeCategory === category.id
                                        ? `0 4px 14px -4px ${alpha(theme.palette.primary.main, 0.5)}`
                                        : 'none',
                                    transform: 'none !important',
                                    '&:hover': {
                                        transform: 'none !important',
                                        bgcolor: activeCategory === category.id
                                            ? theme.palette.primary.dark
                                            : alpha(theme.palette.text.primary, 0.05),
                                        color: activeCategory === category.id
                                            ? '#fff'
                                            : mode === 'light' ? '#0F172A' : '#FAFAFA',
                                        boxShadow: activeCategory === category.id
                                            ? `0 6px 20px -4px ${alpha(theme.palette.primary.main, 0.6)}`
                                            : 'none',
                                    }
                                }}
                            >
                                {category.label}
                                <Box component="span" sx={{
                                    ml: 1, px: 0.8, py: 0.1, borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700,
                                    bgcolor: activeCategory === category.id
                                        ? 'rgba(255,255,255,0.25)'
                                        : alpha(theme.palette.text.primary, 0.08),
                                    color: activeCategory === category.id
                                        ? '#fff'
                                        : mode === 'light' ? '#475569' : '#A1A1AA',
                                }}>
                                    {category.count}
                                </Box>
                            </Button>
                        ))}
                    </Box>

                    {/* Search Results Count */}
                    {searchQuery.trim() && (
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="body2" sx={{
                                color: mode === 'light' ? '#475569' : '#A1A1AA',
                                fontSize: '0.9rem',
                            }}>
                                {displayedTools.length === 0
                                    ? <>No tools found for "<strong>{searchQuery}</strong>". Try a different search.</>
                                    : <>Showing <strong>{displayedTools.length}</strong> {displayedTools.length === 1 ? 'tool' : 'tools'} matching "<strong>{searchQuery.trim()}</strong>"</>
                                }
                            </Typography>
                        </Box>
                    )}

                    {/* Tools Grid */}
                    <div key={activeCategory}>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)'
                            },
                            gap: 3
                        }}>
                            {displayedTools.map((tool) => (
                                <div key={tool.slug} style={{ height: '100%' }}>
                                    <Card
                                        component={Link}
                                        to={`/tool/${tool.slug}`}
                                        sx={{
                                            height: '100%', textDecoration: 'none',
                                            display: 'flex', flexDirection: 'column',
                                            p: 0, overflow: 'hidden',
                                            borderLeft: `3px solid ${tool.color}`,
                                            transform: 'none',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                borderColor: tool.color,
                                                boxShadow: `0 12px 30px -8px ${tool.color}30`,
                                                '& .tool-icon': {
                                                    transform: 'scale(1.1)',
                                                    boxShadow: `0 8px 24px -4px ${tool.color}40`,
                                                },
                                                '& .tool-arrow': {
                                                    opacity: 1,
                                                    transform: 'translateX(0)',
                                                }
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                                <Box className="tool-icon" sx={{
                                                    width: 48, height: 48, borderRadius: '14px',
                                                    bgcolor: `${tool.color}12`, color: tool.color,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                }}>
                                                    <DynamicIcon name={tool.icon} size={24} />
                                                </Box>
                                                <Box className="tool-arrow" sx={{
                                                    opacity: 0, transform: 'translateX(-8px)',
                                                    transition: 'all 0.3s ease', color: tool.color, mt: 0.5
                                                }}>
                                                    <Icons.ArrowUpRight size={18} />
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{
                                                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                                    fontWeight: 700,
                                                    mb: 0.5, fontSize: '0.95rem',
                                                    display: 'flex', alignItems: 'center', gap: 1
                                                }}>
                                                    {tool.name}
                                                    {tool.isNew && (
                                                        <Box component="span" sx={{
                                                            bgcolor: alpha(tool.color, 0.12), color: tool.color,
                                                            fontSize: '0.6rem', fontWeight: 800, px: 0.7, py: 0.15, borderRadius: '4px'
                                                        }}>
                                                            NEW
                                                        </Box>
                                                    )}
                                                </Typography>
                                                <Typography variant="body2" sx={{
                                                    color: mode === 'light' ? '#475569' : '#A1A1AA',
                                                    lineHeight: 1.5, fontSize: '0.8rem'
                                                }}>
                                                    {tool.shortDesc}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </Box>
                    </div>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
