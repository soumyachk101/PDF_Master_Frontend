import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useTheme, InputBase } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

import { CATEGORIES, getToolsByCategory } from '../utils/tools';

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

export default function HomePage() {
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>

            {/* ── HERO SECTION ── */}
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    pt: { xs: 16, md: 24 },
                    pb: { xs: 14, md: 22 },
                    px: 3,
                    bgcolor: mode === 'light' ? '#F8FAFC' : '#0C0C0F',
                }}
            >
                {/* Mesh Gradient Background */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: mode === 'light'
                            ? `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 60%),
                               radial-gradient(ellipse 60% 50% at 80% 80%, rgba(253, 224, 71, 0.1) 0%, transparent 60%),
                               radial-gradient(ellipse 50% 40% at 10% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)`
                            : `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 211, 238, 0.12) 0%, transparent 60%),
                               radial-gradient(ellipse 60% 50% at 80% 80%, rgba(253, 224, 71, 0.08) 0%, transparent 60%),
                               radial-gradient(ellipse 50% 40% at 10% 60%, rgba(168, 85, 247, 0.06) 0%, transparent 60%)`,
                        animation: 'heroGradientShift 20s ease infinite alternate',
                        '@keyframes heroGradientShift': {
                            '0%': { transform: 'scale(1) rotate(0deg)' },
                            '50%': { transform: 'scale(1.05) rotate(1deg)' },
                            '100%': { transform: 'scale(1) rotate(0deg)' },
                        },
                    }}
                />

                {/* Grid Pattern Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: mode === 'light' ? 0.3 : 0.06,
                        backgroundImage: `linear-gradient(${mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'} 1px, transparent 1px),
                                          linear-gradient(90deg, ${mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'} 1px, transparent 1px)`,
                        backgroundSize: '64px 64px',
                        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)',
                    }}
                />

                {/* Floating Orbs */}
                {[
                    { x: '15%', y: '20%', size: 200, color: '#22D3EE', delay: 0 },
                    { x: '75%', y: '15%', size: 160, color: '#A855F7', delay: 2 },
                    { x: '85%', y: '65%', size: 120, color: '#FDE047', delay: 4 },
                    { x: '5%', y: '70%', size: 140, color: '#06B6D4', delay: 1 },
                ].map((orb, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-15, 15, -15],
                            x: i % 2 === 0 ? [-10, 10, -10] : [10, -10, 10],
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 8 + i * 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: orb.delay,
                        }}
                        style={{
                            position: 'absolute',
                            left: orb.x,
                            top: orb.y,
                            width: orb.size,
                            height: orb.size,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
                            filter: 'blur(40px)',
                            pointerEvents: 'none',
                        }}
                    />
                ))}

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    {/* Announcement Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 3, py: 1.2, borderRadius: '99px',
                            bgcolor: mode === 'light'
                                ? 'rgba(34, 211, 238, 0.08)'
                                : 'rgba(34, 211, 238, 0.1)',
                            border: `1px solid ${mode === 'light' ? 'rgba(34, 211, 238, 0.25)' : 'rgba(34, 211, 238, 0.2)'}`,
                            mb: 5, backdropFilter: 'blur(12px)',
                        }}>
                            <Box sx={{
                                width: 8, height: 8, borderRadius: '50%', bgcolor: '#22D3EE',
                                boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
                                animation: 'badgePulse 2s ease-in-out infinite',
                                '@keyframes badgePulse': {
                                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                    '50%': { opacity: 0.6, transform: 'scale(1.3)' },
                                },
                            }} />
                            <Typography variant="caption" sx={{
                                fontWeight: 700,
                                color: mode === 'light' ? '#0E7490' : '#67E8F9',
                                fontSize: '0.85rem', letterSpacing: '0.5px',
                            }}>
                                ✨ PDFKit v2 is now live
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <Typography variant="h1" sx={{
                            fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                            mb: 4,
                            lineHeight: 1.08,
                            fontWeight: 900,
                            letterSpacing: '-0.04em',
                        }}>
                            <Box component="span" sx={{
                                background: `linear-gradient(135deg, #22D3EE 0%, #06B6D4 40%, #A855F7 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'headlineGradientFlow 6s linear infinite',
                                '@keyframes headlineGradientFlow': {
                                    '0%': { backgroundPosition: '0% center' },
                                    '100%': { backgroundPosition: '200% center' },
                                },
                            }}>
                                Every PDF Tool
                            </Box>
                            <br />
                            <Box component="span" sx={{
                                color: mode === 'light' ? '#18181B' : '#FFFFFF',
                            }}>
                                You'll Ever Need
                            </Box>
                        </Typography>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <Typography variant="h6" sx={{
                            color: mode === 'light' ? '#4B5563' : '#D4D4D8',
                            mb: 7,
                            maxWidth: '700px',
                            mx: 'auto',
                            fontWeight: 400,
                            lineHeight: 1.8,
                            fontSize: { xs: '1.05rem', md: '1.2rem' },
                        }}>
                            Merge, split, compress, and convert PDFs instantly.{' '}
                            <Box component="span" sx={{
                                fontWeight: 700,
                                color: mode === 'light' ? '#18181B' : '#FFFFFF',
                            }}>
                                100% Free. No limits. No signup required.
                            </Box>
                            <br />
                            Processed securely in your browser or our ephemeral cloud.
                        </Typography>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2.5, mb: 10 }}>
                            <Button
                                component="a" href="#tools"
                                variant="contained"
                                size="large"
                                endIcon={<Icons.ArrowRight size={20} />}
                                sx={{
                                    py: 2.2, px: 5, fontSize: { xs: '1rem', md: '1.1rem' }, borderRadius: '16px',
                                    fontWeight: 800,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                Explore Free Tools
                            </Button>
                            <Button
                                component="a" href="#features"
                                variant="outlined"
                                size="large"
                                sx={{
                                    py: 2.2, px: 5, fontSize: { xs: '1rem', md: '1.1rem' }, borderRadius: '16px',
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                    color: mode === 'light' ? '#18181B' : '#F9FAFB',
                                }}
                            >
                                How it works
                            </Button>
                        </Box>
                    </motion.div>

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
                                { value: '10+', label: 'Powerful Tools', icon: 'Layers' },
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
                                        bgcolor: mode === 'light'
                                            ? 'rgba(255, 255, 255, 0.9)'
                                            : 'rgba(255, 255, 255, 0.07)',
                                        boxShadow: mode === 'light'
                                            ? '0 12px 32px rgba(0,0,0,0.1)'
                                            : '0 12px 32px rgba(0,0,0,0.4)',
                                    }
                                }}>
                                    <Typography variant="h4" sx={{
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        fontWeight: 900,
                                        color: '#22D3EE',
                                        mb: 0.5,
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        color: mode === 'light' ? '#6B7280' : '#A1A1AA',
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
                bgcolor: mode === 'light' ? '#FFFFFF' : '#141417',
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
                                    bgcolor: mode === 'light' ? alpha('#22D3EE', 0.08) : alpha('#22D3EE', 0.1),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${mode === 'light' ? alpha('#22D3EE', 0.15) : alpha('#22D3EE', 0.15)}`,
                                }}>
                                    <DynamicIcon name={item.icon} size={20} color="#22D3EE" />
                                </Box>
                                <Typography variant="body2" sx={{
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1.5,
                                    color: mode === 'light' ? '#374151' : '#D4D4D8',
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
                bgcolor: mode === 'light' ? '#F3F4F6' : '#18181B',
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h2" sx={{
                            color: mode === 'light' ? '#18181B' : '#F9FAFB',
                            mb: 2,
                            fontSize: { xs: '2rem', md: '3rem' },
                        }}>
                            Unleash Your Documents
                        </Typography>
                        <Typography variant="h6" sx={{
                            color: mode === 'light' ? '#6B7280' : '#A1A1AA',
                            maxWidth: '600px', mx: 'auto', fontWeight: 400,
                            fontSize: { xs: '1rem', md: '1.15rem' },
                        }}>
                            Select an action below to instantly process your file. No accounts, no watermarks, no artificial limits.
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
                                borderColor: '#22D3EE',
                                boxShadow: `0 0 0 3px ${alpha('#22D3EE', 0.15)}, 0 4px 12px rgba(0,0,0,${mode === 'light' ? '0.08' : '0.4'})`,
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
                                    color: mode === 'light' ? '#18181B' : '#F9FAFB',
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
                                        bgcolor: mode === 'light' ? '#F3F4F6' : 'rgba(255,255,255,0.08)',
                                        border: 'none', cursor: 'pointer', p: 0,
                                        color: mode === 'light' ? '#6B7280' : '#A1A1AA',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            bgcolor: mode === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.12)',
                                            color: mode === 'light' ? '#18181B' : '#F9FAFB',
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
                                        : mode === 'light' ? '#4B5563' : '#D4D4D8',
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
                                            : mode === 'light' ? '#18181B' : '#F9FAFB',
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
                                        : mode === 'light' ? '#6B7280' : '#A1A1AA',
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
                                color: mode === 'light' ? '#6B7280' : '#A1A1AA',
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
                                                    color: mode === 'light' ? '#18181B' : '#F9FAFB',
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
                                                    color: mode === 'light' ? '#6B7280' : '#A1A1AA',
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
}
