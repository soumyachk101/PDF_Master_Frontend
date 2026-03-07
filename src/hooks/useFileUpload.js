import { useState, useCallback } from 'react';
import axios from 'axios';
import { getToolBySlug } from '../utils/tools';

export function useFileUpload(toolSlug) {
    const tool = getToolBySlug(toolSlug);
    const [appState, setAppState] = useState('upload'); // 'upload' | 'processing' | 'success' | 'error'
    const [progress, setProgress] = useState(0);
    const [resultUrl, setResultUrl] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const resetState = useCallback(() => {
        setAppState('upload');
        setProgress(0);
        setResultUrl(null);
        setErrorMsg('');
    }, []);

    const processFiles = useCallback(async (files, additionalData = {}) => {
        if (!files || files.length === 0) return;

        setAppState('processing');
        setProgress(0);
        setErrorMsg('');

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file); // 'files' must match Multer backend
        });

        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await axios.post(`${apiUrl}/api/pdf/${toolSlug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob', // Expect binary data from backend
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(Math.min(percentCompleted / 2, 50));
                }
            });

            let fakeProgress = setInterval(() => {
                setProgress(p => {
                    if (p >= 99) {
                        clearInterval(fakeProgress);
                        return 99;
                    }
                    return p + 2;
                });
            }, 300);

            // Handle blob response
            clearInterval(fakeProgress);
            setProgress(100);

            // Create ObjectURL for the download
            const blob = new Blob([response.data], { type: tool?.outputMime || 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);

            setResultUrl(downloadUrl);
            setAppState('success');

        } catch (error) {
            console.error('File processing error:', error);
            setAppState('error');

            // When responseType is 'blob', error.response.data is a Blob — parse it
            let message = 'An error occurred during file processing.';
            if (error.response?.data instanceof Blob) {
                try {
                    const text = await error.response.data.text();
                    const json = JSON.parse(text);
                    message = json?.error?.message || json?.message || message;
                } catch { /* ignore parse errors */ }
            } else if (error.response?.data?.error?.message) {
                message = error.response.data.error.message;
            } else if (!error.response) {
                message = 'Cannot reach the server. Make sure the backend is running.';
            }
            setErrorMsg(message);
        }
    }, [toolSlug]);

    return {
        appState,
        setAppState,
        progress,
        resultUrl,
        errorMsg,
        resetState,
        processFiles
    };
}
