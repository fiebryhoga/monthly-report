export default function DocumentModal({ isOpen, onClose, documentUrl }) {
    if (!isOpen || !documentUrl) return null;

    const isPdf = documentUrl.toLowerCase().endsWith('.pdf');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 z-[9999]">
            
            <div 
                className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>
            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                
                <div className="bg-[#064d54] p-4 flex justify-between items-center text-white shrink-0">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Pratinjau Dokumen
                    </h3>
                    <div className="flex gap-2">
                        <a 
                            href={documentUrl} 
                            download 
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
                            title="Download File"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                        <button onClick={onClose} className="bg-white/10 hover:bg-red-500 p-2 rounded-full transition-colors text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>

                
                <div className="flex-1 bg-gray-100 p-1 overflow-hidden relative">
                    {isPdf ? (
                        <iframe 
                            src={`${documentUrl}#toolbar=0`} 
                            className="w-full h-full rounded-lg border border-gray-200 bg-white"
                            title="Document Preview"
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center overflow-auto">
                            <img 
                                src={documentUrl} 
                                alt="Bukti Izin" 
                                className="max-w-full max-h-full object-contain rounded shadow-sm" 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}