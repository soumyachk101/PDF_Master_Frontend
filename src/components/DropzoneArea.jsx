import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, IconButton, useTheme } from '@mui/material';
import { UploadCloud, File, FileImage, FileText, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DropzoneArea({ onFileSelect, accept, maxSize, selectedFile, isUrlSupported, hasUrl }) {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles: 1,
        disabled: hasUrl // Disable dropzone if a URL is entered
    });

    const getFileIcon = () => {
        if (!selectedFile) return null;
        if (selectedFile.type.includes('image')) return <FileImage color="#3b82f6" size={40} />;
        if (selectedFile.type.includes('pdf')) return <FileText color={theme.palette.primary.main} size={40} />;
        return <File color={theme.palette.text.secondary} size={40} />;
    };

    return (
        <Box
            sx={{
                width: '100%',
                transition: 'all 0.3s ease',
                opacity: hasUrl ? 0.5 : 1,
                pointerEvents: hasUrl ? 'none' : 'auto'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {!selectedFile ? (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Paper
                            {...getRootProps()}
                            elevation={isDragActive ? 8 : (isHovered ? 4 : 0)}
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                p: { xs: 5, md: 8 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                cursor: 'pointer',
                                borderRadius: '24px',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                bgcolor: isDragReject ? alpha(theme.palette.error.main, 0.05)
                                    : isDragActive ? alpha(theme.palette.primary.main, 0.05)
                                        : (isHovered && theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : theme.palette.mode === 'light' ? 'rgba(255,255,255,0.4)' : alpha(theme.palette.background.paper, 0.4)),
                                backdropFilter: 'blur(20px)',
                                border: '2px dashed',
                                borderColor: isDragReject ? theme.palette.error.main
                                    : isDragActive ? theme.palette.primary.main
                                        : isHovered ? alpha(theme.palette.primary.main, 0.5)
                                            : alpha(theme.palette.divider, 0.8),
                                transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
                            }}
                        >
                            <input {...getInputProps()} />

                            {/* Animated glowing border stroke hack for active drag */}
                            <Box sx={{
                                position: 'absolute', inset: 0, borderRadius: 'inherit',
                                pointerEvents: 'none', transition: 'opacity 0.3s',
                                opacity: isDragActive ? 1 : 0,
                                '&::before': {
                                    content: '""', position: 'absolute', inset: 0,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, #fb923c, ${theme.palette.primary.main})`,
                                    backgroundSize: '200% 200%',
                                    animation: 'gradientMove 3s ease infinite',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    padding: '2px', borderRadius: 'inherit'
                                }
                            }} />

                            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <motion.div
                                    animate={isDragActive ? { y: [-10, 10, -10] } : isHovered ? { y: -5, scale: 1.05 } : { y: 0, scale: 1 }}
                                    transition={{ repeat: isDragActive ? Infinity : 0, duration: 2, ease: "easeInOut" }}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 80, height: 80, borderRadius: '20px', marginBottom: '24px',
                                        background: isDragReject ? alpha(theme.palette.error.main, 0.1)
                                            : isDragActive ? theme.palette.primary.main
                                                : isHovered ? alpha(theme.palette.primary.main, 0.1)
                                                    : theme.palette.background.default,
                                        color: isDragReject ? theme.palette.error.main
                                            : isDragActive ? '#fff'
                                                : isHovered ? theme.palette.primary.main
                                                    : theme.palette.text.secondary,
                                        boxShadow: isDragActive ? `0 10px 30px -10px ${theme.palette.primary.main}` : 'none',
                                    }}
                                >
                                    <UploadCloud size={40} />
                                </motion.div>

                                <Typography variant="h5" sx={{
                                    fontWeight: 800, mb: 1.5,
                                    color: isDragReject ? theme.palette.error.main
                                        : isDragActive ? theme.palette.primary.main
                                            : theme.palette.text.primary
                                }}>
                                    {isDragReject ? 'Format not supported' :
                                        isDragActive ? 'Drop file here to unleash' :
                                            'Drag & drop your file here'}
                                </Typography>

                                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
                                    or click to browse from your computer
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
                                    <Typography variant="caption" sx={{
                                        fontWeight: 700, textTransform: 'uppercase', px: 2, py: 0.5,
                                        borderRadius: '99px', bgcolor: 'background.default', border: `1px solid ${theme.palette.divider}`,
                                        color: theme.palette.text.secondary
                                    }}>
                                        Max Size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        fontWeight: 700, textTransform: 'uppercase', px: 2, py: 0.5,
                                        borderRadius: '99px', bgcolor: 'background.default', border: `1px solid ${theme.palette.divider}`,
                                        color: theme.palette.text.secondary
                                    }}>
                                        Supported: {Object.values(accept).flat().map(ext => ext.replace('.', '')).join(', ').toUpperCase()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </motion.div>
                ) : (
                    <motion.div
                        key="selected"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                position: 'relative', overflow: 'hidden',
                                p: { xs: 3, md: 4 }, borderRadius: '24px',
                                display: 'flex', alignItems: 'center', gap: 3,
                                bgcolor: theme.palette.background.paper,
                                border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                                '&:hover': {
                                    boxShadow: `0 10px 40px -10px ${alpha(theme.palette.primary.main, 0.3)}`
                                }
                            }}
                        >
                            {/* Success subtle background pulse */}
                            <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`, zIndex: 0, pointerEvents: 'none' }} />

                            <Box sx={{
                                position: 'relative', zIndex: 1, width: 64, height: 64, borderRadius: '16px',
                                bgcolor: theme.palette.background.default, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: `1px solid ${theme.palette.divider}`, flexShrink: 0
                            }}>
                                {getFileIcon()}
                                <Box sx={{
                                    position: 'absolute', bottom: -8, right: -8, width: 28, height: 28,
                                    bgcolor: theme.palette.background.paper, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: theme.shadows[2]
                                }}>
                                    <CheckCircle2 size={20} color="#22c55e" />
                                </Box>
                            </Box>

                            <Box sx={{ position: 'relative', zIndex: 1, flexGrow: 1, minWidth: 0 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {selectedFile.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </Typography>
                            </Box>

                            <IconButton
                                onClick={(e) => { e.stopPropagation(); onFileSelect(null); }}
                                sx={{
                                    position: 'relative', zIndex: 1,
                                    color: theme.palette.text.secondary,
                                    '&:hover': { color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1), transform: 'rotate(90deg)' },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <X size={24} />
                            </IconButton>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
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
