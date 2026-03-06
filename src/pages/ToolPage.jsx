import * as LucideIcons from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useFileUpload } from '../hooks/useFileUpload';
import { getToolBySlug } from '../utils/tools';
import DropzoneArea from '../components/DropzoneArea';

const DynamicIcon = ({ name, color, size = 24, className = "" }) => {
    const Icon = LucideIcons[name] || LucideIcons.FileText;
    return <Icon size={size} color={color} className={className} />;
};

export default function ToolPage() {
    const { toolSlug } = useParams();
    const tool = getToolBySlug(toolSlug);
    const {
        file,
        setFile,
        url,
        setUrl,
        progress,
        status,
        error,
        resultUrl,
        handleProcess,
        reset
    } = useFileUpload(toolSlug);

    if (!tool) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 bg-bg dark:bg-bg-dark">
                <div className="text-center glass dark:glass-dark p-12 rounded-[32px] max-w-lg w-full">
                    <LucideIcons.AlertTriangle size={48} className="mx-auto text-orange-500 mb-6" />
                    <h2 className="text-3xl font-display font-bold text-ink-primary dark:text-white mb-4">Tool Not Found</h2>
                    <p className="text-ink-secondary dark:text-ink-muted font-body mb-8">The tool you are looking for doesn't exist or has been moved.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-btn font-display font-semibold shadow-btn-red hover:shadow-glow hover:-translate-y-0.5 transition-all">
                        <LucideIcons.ArrowLeft size={18} /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const isUrlSupported = tool.slug === 'html-to-pdf';

    return (
        <div className="flex flex-col w-full min-h-screen bg-bg dark:bg-bg-dark relative overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob pointer-events-none"></div>
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animate-delay-2000 pointer-events-none"></div>

            <main className="flex-1 w-full max-w-content mx-auto px-4 sm:px-6 py-32 relative z-10 flex flex-col items-center">

                <Link to="/" className="self-start mb-8 text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 font-display font-medium text-sm group">
                    <LucideIcons.ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to All Tools
                </Link>

                <div className="text-center mb-12 animate-fade-down w-full">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] mb-6 shadow-sm border border-white/50 dark:border-white/10 glass dark:glass-dark rotate-3 hover:rotate-0 transition-transform duration-500" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                        <DynamicIcon name={tool.icon} size={40} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-ink-primary dark:text-white mb-6">
                        {tool.name}
                    </h1>
                    <p className="text-lg font-body text-ink-secondary dark:text-ink-muted max-w-2xl mx-auto">
                        {tool.desc}
                    </p>
                </div>

                <div className="w-full max-w-upload mx-auto animate-fade-up style={{animationDelay: '0.1s'}}">
                    <div className="glass dark:glass-dark rounded-[32px] p-8 md:p-12 shadow-glass dark:shadow-glass-dark border border-white/50 dark:border-white/10 relative overflow-hidden group">

                        {/* Shimmer effect backgound */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/2 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>

                        <div className="relative z-10">
                            {status === 'idle' || status === 'error' ? (
                                <div className="space-y-8">
                                    {isUrlSupported ? (
                                        <div className="space-y-6">
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-muted group-focus-within/input:text-primary transition-colors">
                                                    <LucideIcons.LinkIcon size={20} />
                                                </div>
                                                <input
                                                    type="url"
                                                    value={url}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    placeholder="Enter website URL (e.g., https://example.com)"
                                                    className="block w-full pl-12 pr-4 py-4 border-2 border-border/50 dark:border-border-dark/50 rounded-2xl bg-white/50 dark:bg-surface-dark/50 text-ink-primary dark:text-white placeholder-ink-muted focus:ring-0 focus:border-primary focus:bg-white dark:focus:bg-surface-dark transition-all duration-300 shadow-sm font-body"
                                                />
                                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-focus-within/input:border-primary/20 pointer-events-none transition-colors duration-300"></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="h-px bg-border/50 dark:bg-border-dark/50 flex-1"></div>
                                                <span className="text-sm font-display font-semibold text-ink-muted uppercase tracking-wider">OR</span>
                                                <div className="h-px bg-border/50 dark:bg-border-dark/50 flex-1"></div>
                                            </div>
                                        </div>
                                    ) : null}

                                    <DropzoneArea
                                        onFileSelect={setFile}
                                        accept={tool.accept}
                                        maxSize={tool.maxSize}
                                        selectedFile={file}
                                        isUrlSupported={isUrlSupported}
                                        hasUrl={!!url}
                                    />

                                    {error && (
                                        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl animate-shake">
                                            <LucideIcons.AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm font-medium">{error}</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleProcess}
                                        disabled={(!file && !url) || (isUrlSupported && !url && !file)}
                                        className={`w-full py-4 rounded-btn font-display font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${(file || url)
                                            ? 'bg-primary text-white shadow-btn-red hover:shadow-glow hover:-translate-y-1'
                                            : 'bg-ink-muted/20 text-ink-muted cursor-not-allowed border border-border/50 dark:border-border-dark/50'
                                            }`}
                                    >
                                        Process File <LucideIcons.ArrowRight size={20} />
                                    </button>
                                </div>
                            ) : status === 'processing' ? (
                                <div className="py-12 flex flex-col items-center justify-center space-y-8 animate-fade-in">
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        {/* Outer glowing ring */}
                                        <div className="absolute inset-0 rounded-full border-[6px] border-primary/20 blur-[2px]"></div>

                                        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md">
                                            <circle
                                                className="text-border dark:text-border-dark transition-colors"
                                                strokeWidth="6"
                                                stroke="currentColor"
                                                fill="transparent"
                                                r="58"
                                                cx="64"
                                                cy="64"
                                            />
                                            <circle
                                                className="text-primary transition-all duration-300 ease-out"
                                                strokeWidth="6"
                                                strokeDasharray={364.4}
                                                strokeDashoffset={364.4 - (progress / 100) * 364.4}
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                fill="transparent"
                                                r="58"
                                                cx="64"
                                                cy="64"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-3xl font-display font-black text-ink-primary dark:text-white mb-1">
                                                {progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-display font-bold text-ink-primary dark:text-white mb-2">Processing Document...</h3>
                                        <p className="text-ink-secondary dark:text-ink-muted font-body">This usually takes a few seconds. Please don't close this tab.</p>
                                    </div>
                                </div>
                            ) : status === 'success' ? (
                                <div className="py-8 flex flex-col items-center text-center space-y-8 animate-bounce-in">
                                    <div className="w-24 h-24 bg-green-500/10 rounded-[32px] flex items-center justify-center text-green-500 mb-2 rotate-3 shadow-sm border border-green-500/20 relative">
                                        <div className="absolute inset-0 rounded-[32px] bg-green-500/20 blur-xl animate-pulse"></div>
                                        <LucideIcons.CheckCircle size={48} strokeWidth={2.5} className="relative z-10" />
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-display font-bold text-ink-primary dark:text-white mb-3">Task Complete!</h3>
                                        <p className="text-ink-secondary dark:text-ink-muted font-body text-lg">Your file has been successfully processed.</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
                                        <a
                                            href={resultUrl}
                                            download
                                            className="flex-1 py-4 px-6 rounded-btn font-display font-bold text-lg bg-green-500 text-white shadow-[0_8px_16px_rgba(34,197,94,0.25)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                                        >
                                            <LucideIcons.Download size={22} /> Download Result
                                        </a>
                                        <button
                                            onClick={reset}
                                            className="flex-1 py-4 px-6 rounded-btn font-display font-bold text-lg bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md text-ink-primary dark:text-white border border-border dark:border-border-dark hover:border-primary/50 hover:text-primary dark:hover:border-primary/50 dark:hover:text-primary transition-colors flex items-center justify-center gap-2"
                                        >
                                            Start Over
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
