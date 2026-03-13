import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Box, Typography, Button, Container, Card, CardContent, useTheme, InputBase, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

import { CATEGORIES, getToolsByCategory, TOOLS } from '../utils/tools';
import { staggerContainer, revealUp, cardHover } from '../animations/variants';
import HeroSection from '../components/HeroSection';

const DynamicIcon = ({ name, color, size = 24 }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} />;
};

function HomePage() {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Dynamically calculate counts for categories
    const categoryCounts = useMemo(() => {
        const counts = { all: TOOLS.length };
        TOOLS.forEach(tool => {
            counts[tool.category] = (counts[tool.category] || 0) + 1;
        });
        return counts;
    }, []);

    const categoryTools = useMemo(() => getToolsByCategory(activeCategory), [activeCategory]);
    
    const displayedTools = useMemo(() => {
        if (!searchQuery.trim()) return categoryTools;
        const q = searchQuery.toLowerCase();
        return categoryTools.filter(tool => 
            tool.name.toLowerCase().includes(q) || 
            tool.shortDesc.toLowerCase().includes(q) || 
            tool.desc.toLowerCase().includes(q) || 
            tool.slug.toLowerCase().includes(q)
        );
    }, [categoryTools, searchQuery]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
            
            {/* ── PREMIUM HERO SECTION ── */}
            <HeroSection />

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
                        gap: { xs: 4, md: 8 },
                    }}>
                        {[
                            { id: 'secure', icon: 'ShieldCheck', text: 'Secure Encryption' },
                            { id: 'fast', icon: 'Zap', text: 'In-Browser Speed' },
                            { id: 'zero', icon: 'ServerCrash', text: 'No Uploads' },
                            { id: 'free', icon: 'HeartHandshake', text: '100% Private' },
                        ].map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 48, height: 48, borderRadius: '14px',
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                }}>
                                    <DynamicIcon name={item.icon} size={22} color={theme.palette.primary.main} />
                                </Box>
                                <Typography variant="caption" sx={{
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
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
                py: { xs: 12, md: 20 }, px: 3, position: 'relative',
                bgcolor: 'background.default',
                scrollMarginTop: '80px'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 10, textAlign: 'center' }}>
                        <Typography variant="h2" sx={{
                            color: 'text.primary',
                            mb: 2,
                            fontWeight: 900,
                            letterSpacing: '-0.04em',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}>
                            Tools for every task.
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 500 }}>
                            Everything you need to manage PDFs. Simple, powerful, and completely private.
                        </Typography>
                    </Box>

                    {/* Standalone Search Bar */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        mb: 6,
                        px: 2
                    }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: 2,
                            width: '100%',
                            maxWidth: '650px',
                            px: 3, py: 2,
                            borderRadius: '22px',
                            bgcolor: mode === 'light' ? '#fff' : alpha('#fff', 0.05),
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            boxShadow: mode === 'light' ? '0 12px 40px -10px rgba(0,0,0,0.1)' : '0 20px 60px -12px rgba(0,0,0,0.4)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:focus-within': {
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                                boxShadow: mode === 'light' 
                                    ? `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`
                                    : `0 0 0 4px ${alpha(theme.palette.primary.main, 0.05)}`,
                                transform: 'translateY(-2px)',
                                bgcolor: mode === 'light' ? '#fff' : alpha('#fff', 0.07),
                            }
                        }}>
                            <Icons.Search size={22} color={theme.palette.text.secondary} />
                            <InputBase
                                placeholder="Search from 30+ PDF tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ 
                                    fontSize: '1.1rem', 
                                    fontWeight: 600, 
                                    flex: 1,
                                    color: 'text.primary',
                                    '& input::placeholder': {
                                        color: 'text.secondary',
                                        opacity: 0.7
                                    }
                                }}
                            />
                            {searchQuery && (
                                <IconButton 
                                    size="small" 
                                    onClick={() => setSearchQuery('')} 
                                    sx={{ 
                                        p: 0.5,
                                        '&:hover': { color: 'error.main' }
                                    }}
                                >
                                    <Icons.X size={20} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>

                    {/* Controls Bar */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mb: 8,
                        p: { xs: 1, md: 1.5 },
                        width: { xs: '100%', md: 'fit-content' },
                        maxWidth: '100%',
                        margin: '0 auto 64px auto',
                        borderRadius: { xs: '16px', md: '24px' },
                        bgcolor: mode === 'light' ? '#fff' : alpha('#fff', 0.025),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: mode === 'light' ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none',
                        overflow: 'hidden'
                    }}>
                        {/* Category Buttons */}
                        <Box sx={{ 
                            display: 'flex', 
                            overflowX: 'auto', 
                            gap: 1.5, 
                            px: { xs: 2.5, md: 0 },
                            width: '100%',
                            justifyContent: { xs: 'flex-start', md: 'center' },
                            '&::-webkit-scrollbar': { display: 'none' },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}>
                            {CATEGORIES.map(category => (
                                <Button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    size="small"
                                    sx={{
                                        borderRadius: '12px', px: 2.5, py: 1,
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        bgcolor: activeCategory === category.id ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                        color: activeCategory === category.id ? 'primary.main' : 'text.secondary',
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    {category.label}
                                    <Box component="span" sx={{
                                        ml: 1, px: 0.8, py: 0.2, borderRadius: '6px', fontSize: '0.65rem', fontWeight: 900,
                                        bgcolor: activeCategory === category.id ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.text.primary, 0.05),
                                        color: activeCategory === category.id ? 'primary.main' : 'text.secondary'
                                    }}>
                                        {categoryCounts[category.id] || 0}
                                    </Box>
                                </Button>
                            ))}
                        </Box>


                    </Box>

                    {/* Tools Grid with Robust Reveal */}
                    <Box sx={{ minHeight: '400px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory + searchQuery}
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-100px" }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: 24
                                }}
                            >
                                {displayedTools.length > 0 ? (
                                    displayedTools.map((tool) => (
                                        <motion.div key={tool.slug} variants={revealUp}>
                                            <Card
                                                component={motion.div}
                                                variants={cardHover}
                                                initial="initial"
                                                whileHover="hover"
                                                onClick={() => navigate(`/tool/${tool.slug}`)}
                                                sx={{
                                                    height: '100%', 
                                                    cursor: 'pointer',
                                                    borderRadius: '24px',
                                                    border: `1px solid ${alpha(theme.palette.divider, mode === 'light' ? 0.1 : 0.05)}`,
                                                    borderLeft: `6px solid ${tool.color}`,
                                                    bgcolor: theme.palette.background.paper,
                                                    backdropFilter: 'blur(20px)',
                                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    boxShadow: mode === 'light' 
                                                        ? `0 10px 40px -10px ${alpha('#000', 0.05)}` 
                                                        : `0 10px 40px -10px ${alpha('#000', 0.4)}`,
                                                    '&:hover': {
                                                        borderColor: alpha(tool.color, 0.2),
                                                        bgcolor: mode === 'light' ? '#fff' : alpha(tool.color, 0.04),
                                                        transform: 'translateY(-6px)',
                                                        boxShadow: `0 25px 50px -12px ${alpha(tool.color, 0.15)}`
                                                    },
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0, left: 0, right: 0, bottom: 0,
                                                        background: `linear-gradient(135deg, ${alpha(tool.color, 0.05)} 0%, transparent 40%)`,
                                                        pointerEvents: 'none',
                                                        opacity: 0,
                                                        transition: 'opacity 0.4s ease'
                                                    },
                                                    '&:hover::before': {
                                                        opacity: 1
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Box sx={{
                                                            width: 56, height: 56, borderRadius: '18px',
                                                            bgcolor: alpha(tool.color, 0.1), color: tool.color,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            boxShadow: `0 8px 20px -6px ${alpha(tool.color, 0.2)}`,
                                                            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                        }}>
                                                            <DynamicIcon name={tool.icon} size={28} />
                                                        </Box>
                                                        <Box sx={{
                                                            p: 0.8, borderRadius: '50%',
                                                            bgcolor: alpha(theme.palette.text.secondary, 0.03),
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                        }}>
                                                            <Icons.ArrowUpRight size={16} color={alpha(theme.palette.text.secondary, 0.4)} />
                                                        </Box>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ 
                                                            fontWeight: 800, 
                                                            mb: 1, 
                                                            fontSize: '1.25rem', // Slightly larger as per screenshot feel
                                                            letterSpacing: '-0.025em',
                                                            color: 'text.primary'
                                                        }}>
                                                            {tool.name}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ 
                                                            color: 'text.secondary', 
                                                            lineHeight: 1.6, 
                                                            fontSize: '0.92rem',
                                                            fontWeight: 500
                                                        }}>
                                                            {tool.shortDesc}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))
                                ) : (
                                    <Box sx={{ gridColumn: '1 / -1', py: 12, textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600 }}>No tools found matching your search.</Typography>
                                    </Box>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
