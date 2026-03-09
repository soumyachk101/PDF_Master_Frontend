import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import { CATEGORIES } from '../utils/tools';
import { Twitter, Github, MessageCircle } from 'lucide-react'; // mapped social icons

export default function Footer() {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer" sx={{
            position: 'relative',
            bgcolor: 'background.paper',
            pt: { xs: 8, md: 10 },
            pb: { xs: 4, md: 5 },
            transition: 'background-color 0.3s',
            overflow: 'hidden'
        }}>
            {/* Subtle top gradient border effect */}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '1px',
                background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
                opacity: 0.5
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                <Grid container spacing={{ xs: 6, lg: 4 }} sx={{ mb: { xs: 8, md: 10 } }}>

                    {/* Brand Column */}
                    <Grid xs={12} lg={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', width: 'fit-content', '&:hover .logo-icon': { bgcolor: 'primary.main', color: '#fff', transform: 'rotate(-6deg)', boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}` } }}>
                                <Box className="logo-icon" sx={{
                                    width: 40, height: 40, borderRadius: '16px', bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main',
                                    transition: 'all 0.3s ease', boxShadow: theme.shadows[1]
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
                                    <Box component="span" sx={{ color: 'primary.main', fontWeight: 900 }}>PDF</Box>Kit
                                </Typography>
                            </Box>

                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, maxWidth: 'sm' }}>
                                Every PDF tool you'll ever need. <Box component="strong" sx={{ color: 'text.primary' }}>100% Free. No limits. No signup required.</Box> We believe essential document utilities should be accessible, secure, and beautiful to use.
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                {[
                                    { icon: Twitter, x: '#', label: 'Twitter' },
                                    { icon: Github, x: '#', label: 'GitHub' },
                                    { icon: MessageCircle, x: '#', label: 'Discord' }
                                ].map((social, i) => {
                                    const Icon = social.icon;
                                    return (
                                        <IconButton key={i} href={social.x} aria-label={social.label} size="medium" sx={{
                                            bgcolor: 'background.default', border: `1px solid ${theme.palette.divider}`,
                                            color: 'text.secondary',
                                            '&:hover': { color: 'primary.main', borderColor: alpha(theme.palette.primary.main, 0.5), bgcolor: alpha(theme.palette.primary.main, 0.05) },
                                            transition: 'all 0.2s'
                                        }}>
                                            <Icon size={18} />
                                        </IconButton>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Categories Columns */}
                    <Grid xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Tools</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {CATEGORIES.filter(c => c.id !== 'all').slice(0, 4).map(cat => (
                                <Box component="li" key={cat.id}>
                                    <Link component={RouterLink} to="/" underline="none" sx={{
                                        position: 'relative', fontWeight: 500, color: 'text.secondary', py: 0.5, display: 'inline-block',
                                        '&:hover': { color: 'primary.main' },
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
                                            bgcolor: 'primary.main', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease'
                                        },
                                        '&:hover::after': { transform: 'scaleX(1)' }
                                    }}>
                                        {cat.label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>More Tools</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {CATEGORIES.filter(c => c.id !== 'all').slice(4).map(cat => (
                                <Box component="li" key={cat.id}>
                                    <Link component={RouterLink} to="/" underline="none" sx={{
                                        position: 'relative', fontWeight: 500, color: 'text.secondary', py: 0.5, display: 'inline-block',
                                        '&:hover': { color: 'primary.main' },
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
                                            bgcolor: 'primary.main', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease'
                                        },
                                        '&:hover::after': { transform: 'scaleX(1)' }
                                    }}>
                                        {cat.label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Legal / Company */}
                    <Grid xs={12} sm={6} md={4} lg={2}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Legal</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {['Privacy Policy', 'Terms of Service', 'About Us', 'Contact'].map((item, i) => (
                                <Box component="li" key={i}>
                                    <Link component={RouterLink} to="/" underline="none" sx={{
                                        position: 'relative', fontWeight: 500, color: 'text.secondary', py: 0.5, display: 'inline-block',
                                        '&:hover': { color: 'primary.main' },
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px',
                                            bgcolor: 'primary.main', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease'
                                        },
                                        '&:hover::after': { transform: 'scaleX(1)' }
                                    }}>
                                        {item}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                </Grid>

                {/* Bottom Bar */}
                <Box sx={{
                    pt: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                        © {currentYear} <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>PDFKit</Box>. All rights reserved.
                    </Typography>

                    <Typography variant="caption" sx={{
                        fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', px: 2, py: 0.5,
                        borderRadius: '99px', bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                    }}>
                        Always Free
                    </Typography>
                </Box>
            </Container>

            {/* Background decorative blob */}
            <Box sx={{
                position: 'absolute', top: 0, right: 0, width: 400, height: 400,
                bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: '50%',
                mixBlendMode: 'multiply', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none'
            }} />
        </Box>
    );
}

function alpha(color, opacity) {
    if (!color) return `rgba(37, 99, 235, ${opacity})`;
    if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
}
