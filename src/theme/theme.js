import { createTheme } from '@mui/material/styles';

const getModernTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: mode === 'light' ? '#1D4ED8' : '#38BDF8',
            light: mode === 'light' ? '#3B82F6' : '#7DD3FC',
            dark: mode === 'light' ? '#1E40AF' : '#0284C7',
            contrastText: mode === 'light' ? '#FFFFFF' : '#09090B',
        },
        secondary: {
            main: '#10B981',
            light: '#34D399',
            dark: '#059669',
            contrastText: '#FFFFFF',
        },
        background: {
            default: mode === 'light' ? '#F8FAFC' : '#09090B',
            paper: mode === 'light' ? '#FFFFFF' : '#18181B',
        },
        text: {
            primary: mode === 'light' ? '#0F172A' : '#FAFAFA',
            secondary: mode === 'light' ? '#475569' : '#D4D4D8', // Darkened for better contrast in light mode
        },
        divider: mode === 'light' ? '#E2E8F0' : '#27272A',
    },
    typography: {
        fontFamily: '"Inter", "system-ui", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.04em' },
        h2: { fontWeight: 800, letterSpacing: '-0.03em' },
        h3: { fontWeight: 700, letterSpacing: '-0.025em' },
        h4: { fontWeight: 700, letterSpacing: '-0.02em' },
        h5: { fontWeight: 600, letterSpacing: '-0.01em' },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    padding: '10px 24px',
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    background: mode === 'light' ? '#1D4ED8' : '#38BDF8',
                    color: mode === 'light' ? '#FFFFFF' : '#09090B',
                    boxShadow: mode === 'light' 
                        ? '0 2px 8px rgba(37, 99, 235, 0.25)' 
                        : '0 2px 8px rgba(56, 189, 248, 0.25)',
                    '&:hover': {
                        background: mode === 'light' ? '#1D4ED8' : '#0284C7',
                        transform: 'translateY(-1px)',
                        boxShadow: mode === 'light'
                            ? '0 4px 12px rgba(37, 99, 235, 0.3)'
                            : '0 4px 12px rgba(56, 189, 248, 0.3)',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                    },
                },
                outlined: {
                    border: `1px solid ${mode === 'light' ? '#E2E8F0' : '#27272A'}`,
                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                    background: 'transparent',
                    '&:hover': {
                        background: mode === 'light' ? '#F8FAFC' : '#18181B',
                        border: `1px solid ${mode === 'light' ? '#CBD5E1' : '#3F3F46'}`,
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                    },
                },
                text: {
                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                    '&:hover': {
                        background: mode === 'light' ? '#F1F5F9' : '#27272A',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    background: mode === 'light' ? '#FFFFFF' : '#18181B',
                    border: `1px solid ${mode === 'light' ? '#E2E8F0' : '#27272A'}`,
                    boxShadow: mode === 'light' 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'light'
                            ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: mode === 'light' ? '#FFFFFF' : '#18181B',
                },
                elevation1: {
                    boxShadow: mode === 'light'
                        ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.05)'
                        : '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.2)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: mode === 'light' ? '#FFFFFF' : '#09090B',
                    color: mode === 'light' ? '#0F172A' : '#FAFAFA',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${mode === 'light' ? '#E2E8F0' : '#27272A'}`,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: mode === 'light' ? '#334155' : '#D4D4D8',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: mode === 'light' ? '#F1F5F9' : '#27272A',
                    },
                },
            },
        },
    },
});

export const lightTheme = createTheme(getModernTokens('light'));
export const darkTheme = createTheme(getModernTokens('dark'));
