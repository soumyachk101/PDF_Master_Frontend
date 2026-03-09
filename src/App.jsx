import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ColorModeContext } from './contexts/ColorModeContext';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    bgcolor: 'background.default',
    gap: 3
  }}>
    <div className="loader"></div>
    <Typography variant="body2" sx={{ 
      color: 'text.secondary', 
      fontWeight: 600, 
      letterSpacing: '2px', 
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      opacity: 0.8,
      animation: 'pulseText 1.5s ease-in-out infinite'
    }}>
      Preparing PDFs
    </Typography>
    <style>
      {`
        @keyframes pulseText {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}
    </style>
  </Box>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => setMode(prev => prev === 'dark' ? 'light' : 'dark'),
  }), [mode]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tool/:toolSlug" element={<ToolPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
