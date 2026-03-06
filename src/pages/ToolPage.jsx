import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Card, CircularProgress, TextField, InputAdornment, useTheme, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useFileUpload } from '../hooks/useFileUpload';
import { getToolBySlug } from '../utils/tools';
import DropzoneArea from '../components/DropzoneArea';

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = LucideIcons[name] || LucideIcons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const stateVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.2 } }
};

export default function ToolPage() {
    const theme = useTheme();
    const { toolSlug } = useParams();
    const tool = getToolBySlug(toolSlug);

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');

    const {
        appState,
        progress,
        resultUrl,
        errorMsg,
        resetState,
        processFiles
    } = useFileUpload(toolSlug);

    const isUrlSupported = tool?.type === 'html' || tool?.urlSupported || false;
    const status = appState === 'upload' ? 'idle' : appState;
    const error = errorMsg;

    const handleProcess = () => {
        if (file) {
            processFiles([file], url ? { url } : {});
        } else if (url) {
            processFiles([], { url });
        }
    };

    const handleDownload = () => {
        if (resultUrl) {
            const link = document.createElement('a');
            link.href = resultUrl;
            link.setAttribute('download', `${toolSlug}-result.pdf`); // ensure suffix matches type or dynamically handled
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleReset = () => {
        setFile(null);
        setUrl('');
        resetState();
    };

    if (!tool) {
        return (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
                <Card sx={{ p: 6, borderRadius: '32px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: theme.shadows[4] }}>
                    <LucideIcons.AlertTriangle size={48} color={theme.palette.warning.main} style={{ margin: '0 auto', marginBottom: '24px' }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Tool Not Found</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>The tool you are looking for doesn't exist or has been moved.</Typography>
                    <Button component={Link} to="/" variant="contained" size="large" startIcon={<LucideIcons.ArrowLeft size={18} />} sx={{ borderRadius: '12px', fontWeight: 700 }}>
                        Back to Home
                    </Button>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Background Glows */}
            <Box sx={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
            <Box sx={{ position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400, bgcolor: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />

            <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 8, md: 12 }, position: 'relative', zIndex: 10 }}>

                <Box component={Link} to="/" sx={{ alignSelf: 'flex-start', mb: 6, color: 'text.secondary', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    <LucideIcons.ArrowLeft size={16} /> Back to All Tools
                </Box>

                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ width: '100%', textAlign: 'center', marginBottom: '48px' }}>
                    <Box sx={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '24px', mb: 3,
                        bgcolor: `${tool.color}15`, color: tool.color, boxShadow: theme.shadows[1], border: `1px solid ${theme.palette.divider}`
                    }}>
                        <DynamicIcon name={tool.icon} size={40} />
                    </Box>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        {tool.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontWeight: 400 }}>
                        {tool.desc}
                    </Typography>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} style={{ width: '100%', maxWidth: '800px' }}>
                    <Card sx={{
                        borderRadius: '32px', p: { xs: 4, md: 6 },
                        position: 'relative', overflow: 'hidden',
                        boxShadow: `0 20px 40px -10px ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.05 : 0.2)}`,
                        border: `1px solid ${theme.palette.divider}`
                    }}>
                        <AnimatePresence mode="wait">
                            {(status === 'idle' || status === 'error') && (
                                <motion.div key="upload" variants={stateVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                                    {isUrlSupported && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Enter website URL (e.g., https://example.com)"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LucideIcons.LinkIcon size={20} color={theme.palette.text.secondary} />
                                                        </InputAdornment>
                                                    ),
                                                    sx: { borderRadius: '16px', bgcolor: 'background.default' }
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>OR</Typography>
                                                <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                                            </Box>
                                        </Box>
                                    )}

                                    <DropzoneArea
                                        onFileSelect={setFile}
                                        accept={tool.accept}
                                        maxSize={tool.maxSize}
                                        selectedFile={file}
                                        isUrlSupported={isUrlSupported}
                                        hasUrl={!!url}
                                    />

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                <Alert severity="error" sx={{ borderRadius: '16px', mt: 2 }} icon={<LucideIcons.AlertCircle size={24} />}>
                                                    {error}
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Button
                                        onClick={handleProcess}
                                        disabled={(!file && !url) || (isUrlSupported && !url && !file)}
                                        variant="contained"
                                        size="large"
                                        endIcon={<LucideIcons.ArrowRight size={20} />}
                                        sx={{
                                            py: 2, borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700,
                                            boxShadow: (file || url) ? `0 10px 20px -10px ${theme.palette.primary.main}` : 'none'
                                        }}
                                    >
                                        Process File
                                    </Button>
                                </motion.div>
                            )}

                            {status === 'processing' && (
                                <motion.div key="processing" variants={stateVariants} initial="initial" animate="animate" exit="exit">
                                    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                            <CircularProgress variant="determinate" value={100} size={140} thickness={3} sx={{ color: theme.palette.divider }} />
                                            <CircularProgress variant="determinate" value={progress} size={140} thickness={3} sx={{ color: theme.palette.primary.main, position: 'absolute', left: 0 }} />
                                            <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography variant="h4" component="div" color="text.primary" sx={{ fontWeight: 900 }}>
                                                    {Math.round(progress)}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Processing Document...</Typography>
                                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>This usually takes a few seconds. Please don't close this tab.</Typography>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {status === 'success' && (
                                <motion.div key="success" variants={stateVariants} initial="initial" animate="animate" exit="exit">
                                    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4 }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                                            <Box sx={{
                                                width: 96, height: 96, borderRadius: '32px', bgcolor: alpha(theme.palette.success.main, 0.1),
                                                color: theme.palette.success.main, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`, flexShrink: 0
                                            }}>
                                                <LucideIcons.CheckCircle size={48} strokeWidth={2.5} />
                                            </Box>
                                        </motion.div>
                                        <Box>
                                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Task Complete!</Typography>
                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Your file has been successfully processed.</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%', mt: 2 }}>
                                            <Button
                                                onClick={handleDownload}
                                                variant="contained"
                                                color="success"
                                                size="large"
                                                startIcon={<LucideIcons.Download size={22} />}
                                                sx={{ flex: 1, py: 2, borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, boxShadow: `0 10px 20px -10px ${theme.palette.success.main}` }}
                                            >
                                                Download Result
                                            </Button>
                                            <Button
                                                onClick={handleReset}
                                                variant="outlined"
                                                size="large"
                                                sx={{ flex: 1, py: 2, borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, borderColor: theme.palette.divider, color: theme.palette.text.primary, '&:hover': { borderColor: theme.palette.primary.main } }}
                                            >
                                                Start Over
                                            </Button>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </Container>
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
