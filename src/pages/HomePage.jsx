import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useTheme, InputBase } from '@mui/material';
import { alpha } from '@mui/material/styles';
// framer-motion imports updated: removed unused motion hooks
import { motion } from 'framer-motion';

import { CATEGORIES, getToolsByCategory } from '../utils/tools';
import { Suspense, lazy } from 'react';

const AnimatedShaderBackground = lazy(() => import('../components/ui/animated-shader-background'));

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

// Helper utilities removed as they were causing lint errors and are currently unused

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

    // --- Parallax & Mouse Tracking Removed ---

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
                <Suspense fallback={null}>
                    <AnimatedShaderBackground />
                </Suspense>

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

                {/* Floating Orbs Removed */}

                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Content Area - centered */}
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
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
                                            width: 8, height: 8, borderRadius: '50%', bgcolor: mode === 'light' ? '#1D4ED8' : '#38BDF8',
                                            boxShadow: `0 0 8px ${mode === 'light' ? '#1D4ED8' : '#38BDF8'}`,
                                        }} />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                color: mode === 'light' ? '#1D4ED8' : '#38BDF8',
                                                fontSize: '0.85rem',
                                                letterSpacing: '0.5px',
                                            }}
                                        >
                                            ✨ DOC-SHIFT — instant, private PDF tools
                                        </Typography>
                                    </Box>
                                </motion.div>

                                {/* Main Headline (Staggered words) */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: '2.7rem', sm: '4.2rem', md: '5.6rem' },
                                            mb: 4,
                                            lineHeight: 1.04,
                                            fontWeight: 900,
                                            letterSpacing: '-0.05em',
                                            fontFamily: '"Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                                        }}
                                    >
                                        <motion.span
                                            variants={itemVariants}
                                            style={{
                                                display: 'inline-block',
                                                color: mode === 'light' ? '#1D4ED8' : '#38BDF8',
                                            }}
                                        >
                                            DOC
                                        </motion.span>
                                        <motion.span
                                            variants={itemVariants}
                                            style={{
                                                display: 'inline-block',
                                                color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                            }}
                                        >
                                            -SHIFT
                                        </motion.span>
                                        <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} />
                                        <motion.span
                                            variants={itemVariants}
                                            style={{
                                                display: 'inline-block',
                                                color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                            }}
                                        >
                                            Shift how you
                                        </motion.span>{' '}
                                        <motion.span
                                            variants={itemVariants}
                                            style={{
                                                display: 'inline-block',
                                                color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                                            }}
                                        >
                                            work with PDFs.
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
                                    }}>
                                        DOC-SHIFT is your focused PDF toolbox for fast, private document workflows.{' '}
                                        <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} />
                                        Merge, split, compress, and convert in your browser — no signups, no limits, no files stored.
                                    </Typography>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2.5, mb: { xs: 8, lg: 10 } }}>
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
                                                        '0%': { boxShadow: `0 0 0 0 ${alpha(mode === 'light' ? '#1D4ED8' : '#38BDF8', 0.4)}` },
                                                        '100%': { boxShadow: `0 0 0 15px ${alpha(mode === 'light' ? '#1D4ED8' : '#38BDF8', 0)}` }
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
                            <Typography component="div" sx={{
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
        scrollMarginTop: '64px'
    }}>
    <Container maxWidth="xl">
        {/* Tools Section Heading - Simplified */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" sx={{
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
                    inputProps={{ 'aria-label': 'Search PDF tools' }}
                    sx={{
                        fontSize: '0.95rem',
                        color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                        '& ::placeholder': {
                            color: mode === 'light' ? '#64748B' : '#9CA3AF',
                            opacity: 1,
                        },
                    }}
                />
                {searchQuery && (
                    <Box
                        component="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
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
                                    <Typography variant="subtitle1" component="h3" sx={{
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
