import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, useTheme, Chip } from '@mui/material';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DropzoneArea({ onFileSelect, accept, maxSize, selectedFiles, isUrlSupported, hasUrl, multiple }) {
    const theme = useTheme();

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(multiple ? acceptedFiles : [acceptedFiles[0]]);
        }
    }, [onFileSelect, multiple]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles: multiple ? 50 : 1,
        disabled: hasUrl // Disable dropzone if a URL is entered
    });

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const dm = 2;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleRemoveFile = (index, e) => {
        e.stopPropagation();
        if (multiple) {
            const newFiles = [...selectedFiles];
            newFiles.splice(index, 1);
            onFileSelect(newFiles);
        } else {
            onFileSelect([]);
        }
    };

    return (
        <Box sx={{ width: '100%', opacity: hasUrl ? 0.5 : 1, pointerEvents: hasUrl ? 'none' : 'auto', transition: 'opacity 0.3s' }}>
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed',
                    borderColor: isDragReject ? 'error.main' : isDragActive ? 'primary.main' : 'divider',
                    borderRadius: '24px',
                    p: 4,
                    textAlign: 'center',
                    bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '280px',
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                    }
                }}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!selectedFiles || selectedFiles.length === 0 ? (
                        <motion.div key="upload-prompt" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{
                                width: 80, height: 80, borderRadius: '50%', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                bgcolor: isDragReject ? alpha(theme.palette.error.main, 0.1) : isDragActive ? alpha(theme.palette.primary.main, 0.1) : 'background.default',
                                color: isDragReject ? theme.palette.error.main : theme.palette.primary.main
                            }}>
                                {isDragReject ? <LucideIcons.XCircle size={40} /> : <LucideIcons.UploadCloud size={40} />}
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: isDragReject ? 'error.main' : 'text.primary' }}>
                                {isDragReject ? 'File type not supported' : isDragActive ? 'Drop it here!' : 'Choose files or drag & drop'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                                Supports {Object.values(accept || {}).flat().join(', ') || 'all files'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Chip label={`Max Size: ${formatSize(maxSize)}`} size="small" variant="outlined" sx={{ borderRadius: '8px', fontWeight: 600 }} />
                                {multiple && <Chip label="Multiple Files Allowed" size="small" variant="outlined" sx={{ borderRadius: '8px', fontWeight: 600 }} />}
                            </Box>
                        </motion.div>
                    ) : (
                        <motion.div key="file-selected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                                {selectedFiles.map((file, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, borderRadius: '16px', bgcolor: 'background.default', border: `1px solid ${theme.palette.divider}`, textAlign: 'left' }}>
                                        <Box sx={{ p: 2, borderRadius: '12px', bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                                            <LucideIcons.File size={32} />
                                        </Box>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                {file.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {formatSize(file.size)}
                                            </Typography>
                                        </Box>
                                        <IconButton onClick={(e) => handleRemoveFile(i, e)} color="error" sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) } }}>
                                            <LucideIcons.X size={20} />
                                        </IconButton>
                                    </Box>
                                ))}
                                {multiple && (
                                    <Button variant="outlined" sx={{ mt: 2, alignSelf: 'center', borderRadius: '12px', textTransform: 'none' }} onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]').click(); }}>
                                        + Add more files
                                    </Button>
                                )}
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    );
}

function alpha(color, opacity) {
    if (!color) return `rgba(226, 87, 76, ${opacity})`;
    if (color.startsWith('#')) return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
}
