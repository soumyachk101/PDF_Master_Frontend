import { createTheme } from '@mui/material/styles';

const glassStyles = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
};

const darkGlassStyles = {
    background: 'rgba(30, 30, 46, 0.65)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
};

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#E2574C',
            light: '#FDECEA',
            dark: '#A83B32',
            contrastText: '#fff',
        },
        background: {
            default: mode === 'light' ? '#F8FAFC' : '#11111B',
            paper: mode === 'light' ? '#FFFFFF' : '#1E1E2E',
        },
        text: {
            primary: mode === 'light' ? '#111019' : '#FFFFFF',
            secondary: mode === 'light' ? '#4B5563' : '#9CA3AF',
        },
        divider: mode === 'light' ? '#E5E7EB' : '#313244',
    },
    typography: {
        fontFamily: '"Inter", "system-ui", "sans-serif"',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h3: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h4: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    padding: '10px 24px',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 20px -10px rgba(226, 87, 76, 0.5)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #E2574C 0%, #C94B41 100%)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    ...(mode === 'light' ? glassStyles : darkGlassStyles),
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                },
            },
        },
    },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
