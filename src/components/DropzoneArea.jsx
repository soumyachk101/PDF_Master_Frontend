import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';

export default function DropzoneArea({ tool, onFilesSelected }) {
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            // Very basic error handling for demo
            alert(`Some files were rejected. Ensure they match the format: ${Object.values(tool.accept || {}).flat().join(', ')}`);
            return;
        }
        if (acceptedFiles.length > 0) {
            onFilesSelected(acceptedFiles);
        }
    }, [tool, onFilesSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: tool.accept,
        multiple: tool.multiple,
        maxSize: 100 * 1024 * 1024 // 100MB limit for UI
    });

    return (
        <div
            {...getRootProps()}
            className={`
        w-full max-w-[800px] h-[350px] md:h-[400px] rounded-[24px] border-3 border-dashed 
        flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300
        ${isDragActive
                    ? 'border-primary bg-primary/5 scale-[1.02] shadow-card-hover'
                    : 'border-primary/30 bg-primary/[0.02] hover:bg-primary/[0.04] hover:border-primary/50'}
      `}
        >
            <input {...getInputProps()} />

            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 shadow-btn-red ${isDragActive ? 'bg-primary scale-110' : 'bg-primary'}`}>
                <UploadCloud size={36} className="text-white" strokeWidth={2.5} />
            </div>

            <h3 className="text-3xl font-display font-bold text-ink-primary dark:text-white mb-4">
                {isDragActive ? 'Drop your files here!' : 'Select PDF files'}
            </h3>

            <p className="font-body text-ink-secondary dark:text-ink-muted text-lg mb-8 max-w-sm">
                or drag and drop them here
            </p>

            {/* Button override for click */}
            <button className="bg-primary text-white font-display font-semibold px-8 py-3.5 rounded-btn shadow-btn-red hover:bg-primary-hover hover:-translate-y-0.5 transition-all text-lg pointer-events-none">
                Select Files
            </button>

            {/* Constraints info */}
            <div className="absolute bottom-6 flex items-center gap-4 text-sm font-body text-ink-muted">
                <span className="flex items-center gap-1.5"><FileText size={16} /> Max 100 MB</span>
                {tool.multiple && <span className="flex items-center gap-1.5"><UploadCloud size={16} /> Multiple files allowed</span>}
            </div>
        </div>
    );
}
