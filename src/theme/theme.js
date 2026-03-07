import { createTheme } from '@mui/material/styles';

// Skeuomorphic design tokens
const getSkeuomorphicTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#22D3EE', // Electric Cyan - Accent/Highlights
            light: '#67E8F9',
            dark: '#06B6D4',
            contrastText: '#18181B',
        },
        secondary: {
            main: '#FDE047', // Yellow - Highlight
            light: '#FEF08A',
            dark: '#FACC15',
            contrastText: '#18181B',
        },
        background: {
            default: mode === 'light' ? '#F3F4F6' : '#18181B', // Cool Gray / Charcoal Black
            paper: mode === 'light' ? '#FFFFFF' : '#27272A',
        },
        text: {
            primary: mode === 'light' ? '#18181B' : '#F9FAFB',
            secondary: mode === 'light' ? '#4B5563' : '#A1A1AA',
        },
        divider: mode === 'light' ? '#E5E7EB' : '#3F3F46',
    },
    typography: {
        fontFamily: '"Inter", "system-ui", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.04em',
            textShadow: mode === 'light' 
                ? '1px 1px 0 rgba(255,255,255,0.8), -1px -1px 0 rgba(0,0,0,0.1)' 
                : '2px 2px 4px rgba(0,0,0,0.5)',
        },
        h2: {
            fontWeight: 800,
            letterSpacing: '-0.03em',
            textShadow: mode === 'light' 
                ? '1px 1px 0 rgba(255,255,255,0.8), -1px -1px 0 rgba(0,0,0,0.1)' 
                : '2px 2px 4px rgba(0,0,0,0.5)',
        },
        h3: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
            letterSpacing: '0.01em',
            textShadow: '0 1px 0 rgba(0,0,0,0.2)',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '14px',
                    padding: '14px 32px',
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                },
                contained: {
                    background: 'linear-gradient(180deg, #4FC3F7 0%, #22D3EE 50%, #06B6D4 100%)',
                    boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.4),
                        inset 0 -2px 0 rgba(0,0,0,0.2),
                        0 4px 0 #0891b2,
                        0 5px 0 #0e7490,
                        0 10px 20px rgba(0,0,0,0.3)
                    `,
                    border: '1px solid rgba(255,255,255,0.3)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,0.4),
                            inset 0 -2px 0 rgba(0,0,0,0.2),
                            0 6px 0 #0891b2,
                            0 7px 0 #0e7490,
                            0 15px 25px rgba(0,0,0,0.4)
                        `,
                    },
                    '&:active': {
                        transform: 'translateY(2px)',
                        boxShadow: `
                            inset 0 2px 0 rgba(0,0,0,0.2),
                            0 2px 0 #0891b2,
                            0 3px 0 #0e7490,
                            0 5px 10px rgba(0,0,0,0.3)
                        `,
                    },
                },
                outlined: {
                    background: mode === 'light' 
                        ? 'linear-gradient(180deg, #fef3c7 0%, #fde047 50%, #facc15 100%)'
                        : 'linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)',
                    boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.3),
                        inset 0 -2px 0 rgba(0,0,0,0.15),
                        0 4px 0 ${mode === 'light' ? '#ca8a04' : '#52525b'},
                        0 5px 0 ${mode === 'light' ? '#a16207' : '#71717a'},
                        0 10px 20px rgba(0,0,0,0.2)
                    `,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: mode === 'light' ? '#fbbf24' : '#52525b',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        borderWidth: '1px',
                        borderColor: mode === 'light' ? '#fbbf24' : '#52525b',
                        boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,0.3),
                            inset 0 -2px 0 rgba(0,0,0,0.15),
                            0 6px 0 ${mode === 'light' ? '#ca8a04' : '#52525b'},
                            0 7px 0 ${mode === 'light' ? '#a16207' : '#71717a'},
                            0 15px 25px rgba(0,0,0,0.3)
                        `,
                    },
                    '&:active': {
                        transform: 'translateY(2px)',
                        boxShadow: `
                            inset 0 2px 0 rgba(0,0,0,0.15),
                            0 2px 0 ${mode === 'light' ? '#ca8a04' : '#52525b'},
                            0 3px 0 ${mode === 'light' ? '#a16207' : '#71717a'},
                            0 5px 10px rgba(0,0,0,0.2)
                        `,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    background: mode === 'light'
                        ? `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)`
                        : `linear-gradient(135deg, rgba(39,39,42,0.9) 0%, rgba(24,24,27,0.8) 100%)`,
                    boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,${mode === 'light' ? '0.8' : '0.1'}),
                        inset 0 -1px 0 rgba(0,0,0,${mode === 'light' ? '0.05' : '0.3'}),
                        0 8px 32px rgba(0,0,0,${mode === 'light' ? '0.1' : '0.5'}),
                        0 2px 0 rgba(255,255,255,${mode === 'light' ? '0.5' : '0.05'}) inset
                    `,
                    border: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
                    '&:hover': {
                        transform: 'translateY(-6px) scale(1.02)',
                        boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,${mode === 'light' ? '0.9' : '0.15'}),
                            inset 0 -1px 0 rgba(0,0,0,${mode === 'light' ? '0.08' : '0.4'}),
                            0 20px 40px rgba(0,0,0,${mode === 'light' ? '0.2' : '0.7'}),
                            0 2px 0 rgba(255,255,255,${mode === 'light' ? '0.6' : '0.08'}) inset
                        `,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: mode === 'light'
                        ? `
                            inset 0 1px 0 rgba(255,255,255,0.8),
                            0 4px 16px rgba(0,0,0,0.08),
                            0 1px 0 rgba(255,255,255,0.5) inset
                          `
                        : `
                            inset 0 1px 0 rgba(255,255,255,0.08),
                            0 8px 24px rgba(0,0,0,0.4),
                            0 1px 0 rgba(255,255,255,0.05) inset
                          `,
                },
                elevation1: {
                    boxShadow: mode === 'light'
                        ? `
                            inset 0 1px 0 rgba(255,255,255,0.7),
                            0 6px 20px rgba(0,0,0,0.1),
                            0 2px 0 rgba(0,0,0,0.05)
                          `
                        : `
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 10px 30px rgba(0,0,0,0.5),
                            0 2px 0 rgba(0,0,0,0.3)
                          `,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                    background: mode === 'light'
                        ? `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(243,244,246,0.9) 100%)`
                        : `linear-gradient(180deg, rgba(39,39,42,0.95) 0%, rgba(24,24,27,0.9) 100%)`,
                    boxShadow: mode === 'light'
                        ? `
                            inset 0 1px 0 rgba(255,255,255,0.8),
                            0 2px 8px rgba(0,0,0,0.08),
                            0 1px 0 rgba(0,0,0,0.05)
                          `
                        : `
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 4px 16px rgba(0,0,0,0.4),
                            0 1px 0 rgba(0,0,0,0.3)
                          `,
                    borderBottom: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    background: mode === 'light'
                        ? 'linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)'
                        : 'linear-gradient(180deg, #3f3f46 0%, #27272a 100%)',
                    boxShadow: mode === 'light'
                        ? `
                            inset 0 1px 0 rgba(255,255,255,0.8),
                            0 2px 4px rgba(0,0,0,0.1),
                            0 1px 0 rgba(0,0,0,0.05)
                          `
                        : `
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 2px 6px rgba(0,0,0,0.3),
                            0 1px 0 rgba(0,0,0,0.2)
                          `,
                    border: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    '&:hover': {
                        background: mode === 'light'
                            ? 'linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)'
                            : 'linear-gradient(180deg, #52525b 0%, #3f3f46 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: mode === 'light'
                            ? `
                                inset 0 1px 0 rgba(255,255,255,0.9),
                                0 4px 8px rgba(0,0,0,0.15),
                                0 2px 0 rgba(0,0,0,0.08)
                              `
                            : `
                                inset 0 1px 0 rgba(255,255,255,0.15),
                                0 4px 12px rgba(0,0,0,0.4),
                                0 2px 0 rgba(0,0,0,0.3)
                              `,
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: mode === 'light'
                            ? `
                                inset 0 2px 4px rgba(0,0,0,0.1),
                                0 1px 0 rgba(255,255,255,0.8)
                              `
                            : `
                                inset 0 2px 4px rgba(0,0,0,0.3),
                                0 1px 0 rgba(255,255,255,0.05)
                              `,
                    },
                },
            },
        },
    },
});

export const lightTheme = createTheme(getSkeuomorphicTokens('light'));
export const darkTheme = createTheme(getSkeuomorphicTokens('dark'));
