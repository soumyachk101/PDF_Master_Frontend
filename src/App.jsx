import { useState, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import NotFoundPage from './pages/NotFoundPage';

export const ColorModeContext = createContext({ toggleColorMode: () => { }, mode: 'dark' });

export function useColorMode() {
  return useContext(ColorModeContext);
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
