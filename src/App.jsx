import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import NotFoundPage from './pages/NotFoundPage';

import { ColorModeContext } from './contexts/ColorModeContext';

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tool/:toolSlug" element={<ToolPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
