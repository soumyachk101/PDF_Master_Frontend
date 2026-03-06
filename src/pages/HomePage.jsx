import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { CATEGORIES, getToolsByCategory } from '../utils/tools';

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = Icons[name] || Icons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function HomePage() {
    const theme = useTheme();
    const [activeCategory, setActiveCategory] = useState('all');
    const displayedTools = getToolsByCategory(activeCategory);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>

            {/* ── HERO SECTION ── */}
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    pt: { xs: 15, md: 20 },
                    pb: { xs: 10, md: 15 },
                    px: 3,
                }}
            >
                {/* Mesh Gradient / Ambient Background */}
                <Box
                    sx={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        background: theme.palette.mode === 'light'
                            ? 'radial-gradient(at 0% 0%, hsla(356, 86%, 85%, 0.5) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(220, 100%, 88%, 0.5) 0px, transparent 50%)'
                            : 'radial-gradient(at 0% 0%, hsla(356, 86%, 15%, 0.5) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(220, 100%, 15%, 0.5) 0px, transparent 50%)',
                        filter: 'blur(100px)', opacity: 0.7
                    }}
                />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <Box sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: '99px',
                            bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${theme.palette.divider}`, mb: 4, backdropFilter: 'blur(10px)'
                        }}>
                            <Box sx={{ display: 'flex', position: 'relative', width: 8, height: 8 }}>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: theme.palette.primary.main, opacity: 0.75, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                                <Box sx={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                                PDFKit v2 is now live
                            </Typography>
                        </Box>

                        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, color: theme.palette.text.primary, mb: 3 }}>
                            Every PDF tool you need, <br sx={{ display: { xs: 'none', md: 'block' } }} />
                            <Box component="span" sx={{
                                background: `linear-gradient(to right, ${theme.palette.primary.main}, #fb923c)`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                            }}>
                                beautifully simple
                            </Box>
                        </Typography>

                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 6, maxWidth: '800px', mx: 'auto', fontWeight: 400, lineHeight: 1.6 }}>
                            Merge, split, compress, and convert PDFs instantly. <strong>100% Free. No limits. No signup required.</strong> Processed securely in your browser or our ephemeral cloud.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
                            <Button
                                component="a" href="#tools"
                                variant="contained"
                                size="large"
                                endIcon={<Icons.ArrowRight size={20} />}
                                sx={{
                                    py: 2, px: 4, fontSize: '1.1rem', borderRadius: '16px',
                                    boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}`,
                                    fontWeight: 700
                                }}
                            >
                                Explore Free Tools
                            </Button>
                            <Button
                                component="a" href="#features"
                                variant="outlined"
                                size="large"
                                sx={{
                                    py: 2, px: 4, fontSize: '1.1rem', borderRadius: '16px',
                                    borderColor: theme.palette.divider, color: theme.palette.text.primary,
                                    bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(30,30,46,0.5)',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: 700,
                                    '&:hover': { borderColor: theme.palette.primary.main, bgcolor: 'transparent' }
                                }}
                            >
                                How it works
                            </Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            {/* ── TRUST STRIP ── */}
            <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}`, py: 4, bgcolor: 'background.paper' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        {[
                            { icon: 'ShieldCheck', text: 'Secure Encryption' },
                            { icon: 'Zap', text: 'Lightning Fast' },
                            { icon: 'ServerCrash', text: 'Zero Retention' },
                            { icon: 'HeartHandshake', text: '100% Free' },
                        ].map((item, i) => (
                            <Grid item key={i}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: `${theme.palette.primary.main}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <DynamicIcon name={item.icon} size={16} color={theme.palette.primary.main} />
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: theme.palette.text.secondary }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── MAIN TOOLS GRID ── */}
            <Box id="tools" component="section" sx={{ py: 15, px: 3, position: 'relative' }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h2" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                            Unleash Your Documents
                        </Typography>
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: '600px', mx: 'auto', fontWeight: 400 }}>
                            Select an action below to instantly process your file. No accounts, no watermarks, no artificial limits.
                        </Typography>
                    </Box>

                    {/* Category Filter */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 8 }}>
                        {CATEGORIES.map(category => (
                            <Button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                variant={activeCategory === category.id ? "contained" : "outlined"}
                                sx={{
                                    borderRadius: '99px', px: 3, py: 1,
                                    borderColor: activeCategory === category.id ? 'transparent' : theme.palette.divider,
                                    color: activeCategory === category.id
                                        ? (theme.palette.mode === 'light' ? '#fff' : theme.palette.primary.main)
                                        : theme.palette.text.secondary,
                                    bgcolor: activeCategory === category.id
                                        ? (theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff')
                                        : theme.palette.background.paper,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                {category.label}
                                <Box component="span" sx={{
                                    ml: 1, px: 1, py: 0.2, borderRadius: '99px', fontSize: '0.75rem',
                                    bgcolor: activeCategory === category.id ? 'rgba(128,128,128,0.2)' : theme.palette.background.default
                                }}>
                                    {category.count}
                                </Box>
                            </Button>
                        ))}
                    </Box>

                    {/* Tools Grid */}
                    <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <Grid container spacing={3}>
                            {displayedTools.map((tool) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={tool.slug}>
                                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                        <Card
                                            component={Link}
                                            to={`/tool/${tool.slug}`}
                                            sx={{
                                                height: '100%', textDecoration: 'none',
                                                display: 'flex', flexDirection: 'column', p: 1
                                            }}
                                        >
                                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                <Box sx={{
                                                    width: 56, height: 56, borderRadius: '16px',
                                                    bgcolor: `${tool.color}15`, color: tool.color,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    mb: 1
                                                }}>
                                                    <DynamicIcon name={tool.icon} size={28} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {tool.name}
                                                        {tool.isNew && (
                                                            <Box component="span" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontSize: '0.65rem', fontWeight: 800, px: 0.8, py: 0.2, borderRadius: '4px' }}>
                                                                NEW
                                                            </Box>
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                                                        {tool.desc}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}

function alpha(color, opacity) {
    if (!color) return `rgba(226, 87, 76, ${opacity})`;
    if (color.startsWith('#')) {
        let r = parseInt(color.slice(1, 3), 16),
            g = parseInt(color.slice(3, 5), 16),
            b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
}
