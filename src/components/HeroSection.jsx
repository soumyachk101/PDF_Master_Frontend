import { Box, Typography, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleScrollDown = () => {
        const nextSection = document.getElementById('tools');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.background.default, // Respecting theme
                pt: { xs: 8, md: 0 }
            }}
        >
            {/* ── BACKGROUND DECO ── */}
            {/* Ultra-subtle Vertical Grid Lines */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.text.primary, 0.05)} 1px, transparent 1px)`,
                    backgroundSize: '80px 100%',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
                    pointerEvents: 'none'
                }}
            />
            
            {/* Deep Ambient Glow */}
            <Box sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                height: '80vw',
                background: `radial-gradient(circle at center, ${alpha('#38BDF8', 0.04)} 0%, transparent 60%)`,
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'blur(150px)'
            }} />

            {/* ── CONTENT ── */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <Box sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2.5, md: 0 } }}>
                    
                    {/* Eyebrow Badge */}
                    <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 0.6,
                        mb: 5,
                        borderRadius: '99px',
                        bgcolor: alpha('#38BDF8', 0.08),
                        border: `1px solid ${alpha('#38BDF8', 0.15)}`,
                        backdropFilter: 'blur(12px)',
                    }}>
                        {/* Custom Sparkle SVG matching screenshot color */}
                        <Box sx={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                               <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2L12 12.3L4.7 9.3L7.3 2L12 2Z" fill="#FACC15" />
                           </svg>
                        </Box>
                        <Typography variant="caption" sx={{ 
                            fontWeight: 800, 
                            letterSpacing: '0.01em', 
                            color: '#38BDF8',
                            fontSize: '0.78rem',
                            fontFamily: '"Inter", sans-serif'
                        }}>
                             DOC-SHIFT — instant, private PDF tools
                        </Typography>
                    </Box>

                    {/* H1 Headline (Screenshot-Perfect) */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '3.2rem', sm: '5.5rem', md: '7rem', lg: '8.2rem' },
                            lineHeight: 0.9,
                            fontWeight: 900,
                            letterSpacing: '-0.06em',
                            mb: 4,
                            fontFamily: '"Inter", "Space Grotesk", sans-serif',
                            color: theme.palette.text.primary,
                            textAlign: 'center',
                            textTransform: 'none'
                        }}
                    >
                        <Box component="span" sx={{ color: '#38BDF8' }}>DOC</Box>-SHIFT
                        <Box sx={{ display: 'block' }}>Shift how you</Box>
                        <Box sx={{ display: 'block' }}>work with PDFs.</Box>
                    </Typography>

                    {/* Subheading */}
                    <Typography variant="body1" sx={{
                        fontSize: { xs: '1.05rem', md: '1.2rem' }, 
                        color: theme.palette.text.secondary, 
                        mb: 7,
                        maxWidth: '850px', 
                        mx: 'auto', 
                        fontWeight: 500, 
                        lineHeight: 1.55,
                        fontFamily: '"Inter", sans-serif'
                    }}>
                        DOC-SHIFT is your focused PDF toolbox for fast, private document workflows. <br />
                        Merge, split, compress, and convert in your browser — no signups, no limits, no files stored.
                    </Typography>

                    {/* CTA Group */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            component="a"
                            href="#tools"
                            onClick={(e) => { e.preventDefault(); handleScrollDown(); }}
                            sx={{
                                py: 1.8, 
                                px: 4.5, 
                                borderRadius: '14px', 
                                fontSize: '1rem', 
                                fontWeight: 800,
                                bgcolor: '#38BDF8',
                                color: '#000',
                                boxShadow: `0 10px 30px -10px ${alpha('#38BDF8', 0.3)}`,
                                textTransform: 'none',
                                '&:hover': { 
                                    bgcolor: alpha('#38BDF8', 0.9),
                                    boxShadow: `0 15px 35px -10px ${alpha('#38BDF8', 0.4)}`,
                                }
                            }}
                        >
                            Explore 25+ Tools <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                py: 1.8, 
                                px: 4.5, 
                                borderRadius: '14px', 
                                fontSize: '1rem', 
                                fontWeight: 700,
                                color: '#FFFFFF',
                                borderColor: alpha('#fff', 0.2),
                                textTransform: 'none',
                                '&:hover': { 
                                    borderColor: alpha('#fff', 0.5), 
                                    bgcolor: alpha('#fff', 0.05) 
                                }
                            }}
                        >
                            How it works
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;
