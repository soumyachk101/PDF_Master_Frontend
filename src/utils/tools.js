export const TOOLS = [
    // ── ORGANIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'merge-pdf', name: 'Merge PDF', shortDesc: 'Combine PDFs into one.', desc: 'Combine multiple PDF files into one document in any order you choose.', icon: 'Combine', category: 'organize', color: '#3B82F6', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Merge PDF Files Free – No Upload, 100% Private',
        seoDesc: 'Merge PDF files together securely. Our completely free tool runs directly in your browser with no uploads required, ensuring total privacy.',
        seoKeywords: 'merge pdf files without uploading, combine pdf online private, secure pdf merge',
        seoArticle: 'Use our free online tool to merge PDF files instantly without uploading them to external servers. Since processing is optimized for privacy, your files remain completely secure on your device. Just arrange the files in your preferred order and click merge.',
        faqs: [
            { q: 'Can I merge PDF files without uploading?', a: 'Yes! PDFKit prioritizes your privacy. Your files are processed securely without being stored or analyzed by external cloud services.' },
            { q: 'Is there a limit to how many files I can merge?', a: 'You can merge large batches of files simultaneously completely for free, without worrying about premium paywalls.' }
        ]
    },
    { 
        slug: 'split-pdf', name: 'Split PDF', shortDesc: 'Break a PDF into pages.', desc: 'Separate one page or a whole set into independent PDF files.', icon: 'Scissors', category: 'organize', color: '#3B82F6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip',
        seoTitle: 'Split PDF Pages Online Free – 100% Private',
        seoDesc: 'Easily split PDF pages online for free. Extract pages from your PDF securely and privately without needing to install heavy software.',
        seoKeywords: 'split pdf pages online free, extract pdf pages, split pdf no upload',
        seoArticle: 'Split a large PDF document into multiple smaller files or extract specific pages entirely for free. Our online splitter is incredibly fast, bypassing slow upload queues by running the extraction tasks securely.',
        faqs: [
            { q: 'How do I extract specific pages?', a: 'Simply enter the page ranges you want to extract (e.g., "1-3, 5") and click process. We will instantly package the specific pages into a secure download.' },
            { q: 'Are my split PDFs secure?', a: 'Absolutely. We do not retain or read the contents of your PDF files. Your privacy is guaranteed.' }
        ]
    },
    { slug: 'remove-pages', name: 'Remove Pages', shortDesc: 'Delete pages from a PDF.', desc: 'Select and permanently remove specific pages from your PDF document.', icon: 'Trash2', category: 'organize', color: '#3B82F6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true },
    { slug: 'extract-pages', name: 'Extract Pages', shortDesc: 'Pull out selected pages.', desc: 'Extract specific pages from a PDF into a new document or separate files.', icon: 'FolderOpen', category: 'organize', color: '#3B82F6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true },
    { slug: 'organize-pdf', name: 'Organize PDF', shortDesc: 'Sort and reorder pages visually.', desc: 'Drag to reorder pages, rotate individual pages, and delete unwanted ones.', icon: 'LayoutGrid', category: 'organize', color: '#3B82F6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true },
    { slug: 'scan-to-pdf', name: 'Scan to PDF', shortDesc: 'Turn scans into a PDF.', desc: 'Convert camera scans or image files into a single PDF document.', icon: 'ScanLine', category: 'organize', color: '#3B82F6', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },

    // ── OPTIMIZE ────────────────────────────────────────────────────────────
    { 
        slug: 'compress-pdf', name: 'Compress PDF', shortDesc: 'Shrink PDF file size.', desc: 'Reduce file size while optimizing for maximum quality.', icon: 'Minimize2', category: 'optimize', color: '#10B981', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Compress PDF in Browser – No Upload, Fast & Free',
        seoDesc: 'Reduce your PDF file size instantly. Use our free tool to compress PDF in browser without uploading to external servers.',
        seoKeywords: 'compress pdf in browser no upload, reduce pdf size online, shrink pdf private',
        seoArticle: 'Shrink large PDF files to easily share them via email or upload them to portals. Our powerful compression engine runs incredibly fast, helping you compress PDFs in your browser without sacrificing document quality or compromising your privacy constraints.',
        faqs: [
            { q: 'Will compressing my PDF ruin the quality?', a: 'No, our tool optimizes images and removes unnecessary metadata while carefully preserving text crispness and readability.' },
            { q: 'Why compress PDFs without uploading?', a: 'Compressing files natively keeps your sensitive data isolated and secure from third parties, all while completing the process much faster than waiting for giant files to upload to a cloud server.' }
        ]
    },
    { slug: 'repair-pdf', name: 'Repair PDF', shortDesc: 'Fix corrupted PDF files.', desc: 'Repair a damaged PDF and recover data from corrupt PDF files automatically.', icon: 'Wrench', category: 'optimize', color: '#10B981', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'ocr-pdf', name: 'OCR PDF', shortDesc: 'Make scanned PDFs searchable.', desc: 'Convert scanned image PDFs into fully searchable and selectable documents.', icon: 'ScanText', category: 'optimize', color: '#10B981', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },

    // ── CONVERT TO PDF ──────────────────────────────────────────────────────
    { slug: 'jpg-to-pdf', name: 'JPG to PDF', shortDesc: 'Convert images to PDF.', desc: 'Convert JPG and PNG images to PDF with adjustable orientation and margins.', icon: 'Images', category: 'convertTo', color: '#F59E0B', accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }, multiple: true, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'word-to-pdf', name: 'Word to PDF', shortDesc: 'Convert DOCX files to PDF.', desc: 'Make DOC and DOCX files easy to read by converting them to PDF.', icon: 'FileText', category: 'convertTo', color: '#F59E0B', accept: { 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'pptx-to-pdf', name: 'PowerPoint to PDF', shortDesc: 'Convert presentations to PDF.', desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', icon: 'Presentation', category: 'convertTo', color: '#F59E0B', accept: { 'application/vnd.ms-powerpoint': ['.ppt'], 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'excel-to-pdf', name: 'Excel to PDF', shortDesc: 'Convert spreadsheets to PDF.', desc: 'Make Excel spreadsheets easy to read by converting them to PDF format.', icon: 'Table', category: 'convertTo', color: '#F59E0B', accept: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'html-to-pdf', name: 'HTML to PDF', shortDesc: 'Convert any webpage to PDF.', desc: 'Convert webpages to PDF by entering a URL. Preserves layout and styles.', icon: 'Globe', category: 'convertTo', color: '#F59E0B', accept: null, multiple: false, minFiles: 0, urlInput: true, outputExt: '.pdf', outputMime: 'application/pdf' },

    // ── CONVERT FROM PDF ────────────────────────────────────────────────────
    { slug: 'pdf-to-jpg', name: 'PDF to JPG', shortDesc: 'Export PDF pages as images.', desc: 'Convert each PDF page into a JPG image or extract all embedded images.', icon: 'Image', category: 'convertFrom', color: '#8B5CF6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.zip', outputMime: 'application/zip' },
    { slug: 'pdf-to-word', name: 'PDF to Word', shortDesc: 'Convert PDF to editable DOCX.', desc: 'Easily convert PDF files into editable DOC and DOCX documents.', icon: 'FileOutput', category: 'convertFrom', color: '#8B5CF6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.docx', outputMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { slug: 'pdf-to-pptx', name: 'PDF to PowerPoint', shortDesc: 'Turn PDFs into slide decks.', desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', icon: 'MonitorPlay', category: 'convertFrom', color: '#8B5CF6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pptx', outputMime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
    { slug: 'pdf-to-excel', name: 'PDF to Excel', shortDesc: 'Extract PDF tables to XLSX.', desc: 'Pull data straight from PDFs into Excel spreadsheets in seconds.', icon: 'Sheet', category: 'convertFrom', color: '#8B5CF6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.xlsx', outputMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { slug: 'pdf-to-pdfa', name: 'PDF to PDF/A', shortDesc: 'Convert to archival PDF format.', desc: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.', icon: 'Archive', category: 'convertFrom', color: '#8B5CF6', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },

    // ── EDIT ────────────────────────────────────────────────────────────────
    { 
        slug: 'rotate-pdf', name: 'Rotate PDF', shortDesc: 'Fix page orientation.', desc: 'Rotate your PDF pages to the correct orientation. Apply to all or specific pages.', icon: 'RotateCw', category: 'edit', color: '#06B6D4', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf',
        seoTitle: 'Rotate PDF Without Software – Fast & Private',
        seoDesc: 'Quickly rotate PDF pages online for free. Fix sideways documents in seconds securely without installing software or creating accounts.',
        seoKeywords: 'rotate pdf without software, flip pdf online, fix pdf orientation, private pdf rotator',
        seoArticle: 'Did you scan a document upside down? Easily correct PDF page orientation with our free online tool. Rotate PDFs without software straight from your device. Applying transformations takes only a few seconds, letting you download the fixed document instantly and privately.',
        faqs: [
            { q: 'Does rotating my PDF upload it to a cloud?', a: 'No! Our tool focuses on privacy, securely processing your file manipulation to keep your document totally private.' },
            { q: 'Can I choose how many degrees to rotate it?', a: 'Yes, you can easily rotate your document clockwise (90 degrees), counter-clockwise, or completely flip it upside down (180 degrees).' }
        ]
    },
    { slug: 'page-numbers', name: 'Add Page Numbers', shortDesc: 'Number your PDF pages.', desc: 'Insert page numbers with custom position, font size, and starting number.', icon: 'Hash', category: 'edit', color: '#06B6D4', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'add-watermark', name: 'Add Watermark', shortDesc: 'Stamp text over your PDF.', desc: 'Stamp a text watermark over your PDF pages with custom opacity and position.', icon: 'Droplets', category: 'edit', color: '#06B6D4', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'crop-pdf', name: 'Crop PDF', shortDesc: 'Trim PDF margins.', desc: 'Crop the margins of a PDF or select specific areas to keep per page.', icon: 'Crop', category: 'edit', color: '#06B6D4', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'edit-pdf', name: 'Edit PDF', shortDesc: 'Add text, shapes, and images.', desc: 'Add text, images, shapes or freehand annotations directly onto a PDF document.', icon: 'PenLine', category: 'edit', color: '#06B6D4', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasCanvas: true },

    // ── SECURITY ────────────────────────────────────────────────────────────
    { slug: 'unlock-pdf', name: 'Unlock PDF', shortDesc: 'Remove PDF password.', desc: 'Remove PDF password security, giving you the freedom to use your PDF as you want.', icon: 'Unlock', category: 'security', color: '#EF4444', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'protect-pdf', name: 'Protect PDF', shortDesc: 'Lock PDF with a password.', desc: 'Protect PDF files with AES-256 encryption and custom access permissions.', icon: 'Lock', category: 'security', color: '#EF4444', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },
    { slug: 'sign-pdf', name: 'Sign PDF', shortDesc: 'Add your signature to a PDF.', desc: 'Draw, type, or upload a signature and place it anywhere on your PDF.', icon: 'Pen', category: 'security', color: '#EF4444', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true },
    { slug: 'redact-pdf', name: 'Redact PDF', shortDesc: 'Permanently hide sensitive info.', desc: 'Permanently redact text and graphics to remove sensitive information from a PDF.', icon: 'EyeOff', category: 'security', color: '#EF4444', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', hasThumbnails: true },
    { slug: 'compare-pdf', name: 'Compare PDF', shortDesc: 'Spot changes between two PDFs.', desc: 'Show a side-by-side document comparison and easily spot changes between versions.', icon: 'GitCompare', category: 'security', color: '#EF4444', accept: { 'application/pdf': ['.pdf'] }, multiple: true, minFiles: 2, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf' },

    // ── INTELLIGENCE ────────────────────────────────────────────────────────
    { slug: 'translate-pdf', name: 'Translate PDF', shortDesc: 'AI-powered PDF translation.', desc: 'Easily translate PDF files powered by AI. Keeps fonts, layout, and formatting intact.', icon: 'Languages', category: 'intelligence', color: '#EC4899', accept: { 'application/pdf': ['.pdf'] }, multiple: false, minFiles: 1, urlInput: false, outputExt: '.pdf', outputMime: 'application/pdf', isNew: true },
]

export const CATEGORIES = [
    { id: 'all', label: 'All', count: 30 },
    { id: 'organize', label: 'Organize PDF', count: 6 },
    { id: 'optimize', label: 'Optimize PDF', count: 3 },
    { id: 'convertTo', label: 'Convert to PDF', count: 5 },
    { id: 'convertFrom', label: 'Convert from PDF', count: 5 },
    { id: 'edit', label: 'Edit PDF', count: 5 },
    { id: 'security', label: 'PDF Security', count: 5 },
    { id: 'intelligence', label: 'PDF Intelligence', count: 1 },
]

export const getToolBySlug = (slug) => TOOLS.find(t => t.slug === slug) || null
export const getToolsByCategory = (cat) => cat === 'all' ? TOOLS : TOOLS.filter(t => t.category === cat)
