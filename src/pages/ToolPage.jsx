import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Settings, FileText, CheckCircle2, Download, AlertTriangle, RefreshCcw } from 'lucide-react';
import { getToolBySlug } from '../utils/tools';
import DropzoneArea from '../components/DropzoneArea';
import { useFileUpload } from '../hooks/useFileUpload';

export default function ToolPage() {
    const { toolSlug } = useParams();
    const tool = getToolBySlug(toolSlug);
    const [files, setFiles] = useState([]);
    const [urlInput, setUrlInput] = useState('');

    const {
        appState,
        setAppState,
        progress,
        resultUrl,
        errorMsg,
        processFiles,
        resetState
    } = useFileUpload(toolSlug);

    // Reset state when tool changes
    useEffect(() => {
        resetState();
        setFiles([]);
    }, [toolSlug, resetState]);

    if (!tool) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-4xl font-display font-bold text-ink-primary mb-4">Tool not found</h1>
                <p className="text-ink-secondary mb-8">The tool you are looking for does not exist.</p>
                <Link to="/" className="bg-primary text-white px-6 py-3 rounded-btn font-medium">Go back Home</Link>
            </div>
        );
    }

    const handleFilesSelected = (selectedFiles) => {
        setFiles(selectedFiles);
        processFiles(selectedFiles, { toolSlug });
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (!urlInput) return;
        // Mock a file for the processFiles hook to pass the check, or we can just pass the url in additionalData
        // processFiles expects files, so we pass a dummy blob to get past `if(!files)` 
        const dummyFile = new File(['dummy'], 'url.txt', { type: 'text/plain' });
        setFiles([dummyFile]);
        processFiles([dummyFile], { toolSlug, url: urlInput });
    };

    const handleDownload = () => {
        if (resultUrl) {
            // Trigger download or open in new tab
            window.open(resultUrl, '_blank');
        } else {
            alert('Download triggered! Waiting for backend to provide real URL.');
        }
    };

    const handleReset = () => {
        resetState();
        setFiles([]);
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface dark:bg-surface-deeper">

            {/* Tool Header */}
            <div className="bg-white dark:bg-surface-dark border-b border-border dark:border-border-dark pt-12 pb-8 px-4 sm:px-6">
                <div className="max-w-content mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-primary transition-colors mb-6">
                        <ArrowLeft size={16} /> Back to all tools
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: tool.color }}>
                            {/* We could use dynamic icon here too, but for simplicity we stick to static */}
                            <Settings size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-primary dark:text-white tracking-tight">{tool.name}</h1>
                            <p className="font-body text-ink-secondary dark:text-ink-muted mt-2 text-lg">{tool.desc}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[500px]">

                {appState === 'upload' && !tool.urlInput && (
                    <div className="w-full flex justify-center animate-fade-up">
                        <DropzoneArea tool={tool} onFilesSelected={handleFilesSelected} />
                    </div>
                )}

                {appState === 'upload' && tool.urlInput && (
                    <div className="w-full max-w-[600px] flex flex-col justify-center animate-fade-up">
                        <div className="bg-white dark:bg-surface-dark border-2 border-border dark:border-border-dark rounded-card p-10 text-center shadow-card">
                            <h3 className="text-3xl font-display font-bold text-ink-primary dark:text-white mb-4">Enter URL</h3>
                            <p className="font-body text-ink-secondary dark:text-ink-muted mb-8">Type or paste the webpage URL you want to convert to PDF.</p>
                            <form onSubmit={handleUrlSubmit} className="flex flex-col gap-4">
                                <input
                                    type="url"
                                    required
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full px-6 py-4 rounded-btn border border-border dark:border-border-dark bg-surface dark:bg-bg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                                />
                                <button type="submit" className="bg-primary text-white font-display font-semibold px-8 py-4 rounded-btn shadow-btn-red hover:bg-primary-hover hover:-translate-y-0.5 transition-all text-lg">
                                    Convert to PDF
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {appState === 'processing' && (
                    <div className="w-full max-w-[600px] bg-white dark:bg-surface-dark rounded-card shadow-card p-10 flex flex-col items-center text-center border border-border dark:border-border-dark animate-fade-in">
                        <div className="relative w-24 h-24 mb-8">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle className="text-border dark:text-border-dark stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                                <circle className="text-primary stroke-current transition-all duration-300 ease-out" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * progress) / 100}></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-display font-bold text-xl text-primary">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-display font-bold text-ink-primary dark:text-white mb-3">Processing File(s)...</h2>
                        <p className="text-ink-secondary dark:text-ink-muted mb-6">Please keep this tab open. This usually takes a few seconds to communicate with our secure backend.</p>

                        {/* File list preview */}
                        <div className="w-full flex flex-col gap-3 text-left bg-surface dark:bg-bg rounded-lg p-4 max-h-[150px] overflow-y-auto border border-border dark:border-border-dark">
                            {files.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <FileText size={16} className="text-primary shrink-0" />
                                    <span className="truncate font-medium text-ink-primary dark:text-white flex-1">{f.name}</span>
                                    <span className="text-ink-muted shrink-0 text-xs">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {appState === 'success' && (
                    <div className="w-full max-w-[600px] bg-white dark:bg-surface-dark rounded-card shadow-card py-12 px-8 flex flex-col items-center text-center border border-green-500/30 animate-bounce-in">
                        <div className="w-20 h-20 bg-green-100 text-green-500 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={40} strokeWidth={2.5} />
                        </div>

                        <h2 className="text-3xl font-display font-bold text-ink-primary dark:text-white mb-4">Task Completed!</h2>
                        <p className="text-ink-secondary dark:text-ink-muted text-lg mb-10">
                            Your files have been successfully processed.
                        </p>

                        <button
                            onClick={handleDownload}
                            className="group flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-btn shadow-btn-red hover:bg-primary-hover hover:-translate-y-1 transition-all"
                        >
                            <Download size={24} className="group-hover:animate-bounce" />
                            <span className="font-display font-bold text-xl">Download Result</span>
                        </button>

                        <button
                            onClick={handleReset}
                            className="mt-8 text-ink-secondary hover:text-primary transition-colors font-medium underline-offset-4 hover:underline"
                        >
                            Process more files
                        </button>
                    </div>
                )}

                {appState === 'error' && (
                    <div className="w-full max-w-[600px] bg-white dark:bg-surface-dark rounded-card shadow-card py-12 px-8 flex flex-col items-center text-center border border-red-500/30 animate-fade-in">
                        <div className="w-20 h-20 bg-red-100 text-red-500 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle size={40} strokeWidth={2.5} />
                        </div>

                        <h2 className="text-3xl font-display font-bold text-ink-primary dark:text-white mb-4">Oops! Something went wrong.</h2>
                        <p className="text-ink-secondary dark:text-ink-muted text-lg mb-8">
                            {errorMsg || 'An unknown error occurred while processing your files.'}
                        </p>

                        <button
                            onClick={handleReset}
                            className="group flex items-center gap-3 bg-surface dark:bg-bg border border-border dark:border-border-dark text-ink-primary dark:text-white px-8 py-4 rounded-btn hover:border-primary hover:text-primary transition-all"
                        >
                            <RefreshCcw size={20} />
                            <span className="font-display font-bold">Try Again</span>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
