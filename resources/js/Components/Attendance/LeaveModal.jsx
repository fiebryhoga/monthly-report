import { useForm } from '@inertiajs/react';
import { 
    FiX, 
    FiCalendar, 
    FiActivity, 
    FiBriefcase, 
    FiUploadCloud, 
    FiCheckCircle,
    FiFileText 
} from 'react-icons/fi';

export default function LeaveModal({ show, onClose }) {
    if (!show) return null;

    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'permit',
        start_date: '',
        end_date: '',
        reason: '',
        attachment: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('leaves.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (err) => {
                console.error("Gagal mengirim:", err);
            }
        });
    };

    
    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            <div 
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
                onClick={handleClose}
            ></div>

            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                
                <div className="bg-[#064d54] p-5 flex justify-between items-center text-white border-b border-[#043c42]">
                    <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <FiFileText className="w-5 h-5 text-[#d4af37]" />
                            Formulir Pengajuan
                        </h3>
                        <p className="text-white/70 text-xs mt-0.5">Silakan lengkapi data pengajuan izin atau sakit.</p>
                    </div>
                    <button 
                        onClick={handleClose} 
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[80vh] bg-gray-50/50">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Jenis Pengajuan</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div 
                                onClick={() => setData('type', 'permit')}
                                className={`cursor-pointer relative p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                                    data.type === 'permit' 
                                    ? 'border-[#064d54] bg-white shadow-md ring-1 ring-[#064d54]/20' 
                                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-400'
                                }`}
                            >
                                {data.type === 'permit' && <FiCheckCircle className="absolute top-3 right-3 text-[#064d54]" />}
                                <div className={`p-3 rounded-full ${data.type === 'permit' ? 'bg-[#064d54]/10 text-[#064d54]' : 'bg-gray-100 text-gray-400'}`}>
                                    <FiBriefcase className="w-6 h-6" />
                                </div>
                                <span className={`font-bold text-sm ${data.type === 'permit' ? 'text-[#064d54]' : 'text-gray-500'}`}>Izin / Cuti</span>
                            </div>

                            <div 
                                onClick={() => setData('type', 'sick')}
                                className={`cursor-pointer relative p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                                    data.type === 'sick' 
                                    ? 'border-blue-500 bg-white shadow-md ring-1 ring-blue-500/20' 
                                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-400'
                                }`}
                            >
                                {data.type === 'sick' && <FiCheckCircle className="absolute top-3 right-3 text-blue-500" />}
                                <div className={`p-3 rounded-full ${data.type === 'sick' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-400'}`}>
                                    <FiActivity className="w-6 h-6" />
                                </div>
                                <span className={`font-bold text-sm ${data.type === 'sick' ? 'text-blue-600' : 'text-gray-500'}`}>Sakit</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Mulai Tanggal</label>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border-gray-200 text-sm focus:ring-[#064d54] focus:border-[#064d54] transition-shadow shadow-sm" 
                                    value={data.start_date} 
                                    onChange={e => setData('start_date', e.target.value)} 
                                />
                                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                            </div>
                            {errors.start_date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.start_date}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Sampai Tanggal</label>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border-gray-200 text-sm focus:ring-[#064d54] focus:border-[#064d54] transition-shadow shadow-sm" 
                                    value={data.end_date} 
                                    onChange={e => setData('end_date', e.target.value)} 
                                />
                                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                            </div>
                            {errors.end_date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.end_date}</p>}
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Alasan Pengajuan</label>
                        <textarea 
                            className="w-full rounded-xl border-gray-200 text-sm focus:ring-[#064d54] focus:border-[#064d54] transition-shadow shadow-sm p-3" 
                            rows="3" 
                            placeholder="Jelaskan alasan Anda secara singkat dan jelas..." 
                            value={data.reason} 
                            onChange={e => setData('reason', e.target.value)}
                        ></textarea>
                        {errors.reason && <p className="text-red-500 text-xs mt-1 font-medium">{errors.reason}</p>}
                    </div>

                    
                    {data.type === 'sick' && (
                        <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                                Upload Surat Dokter <span className="text-red-500">*</span>
                            </label>
                            
                            <div className="relative group">
                                <input 
                                    type="file" 
                                    id="file-upload"
                                    accept="application/pdf,image/*" 
                                    className="hidden" 
                                    onChange={e => setData('attachment', e.target.files[0])} 
                                />
                                <label 
                                    htmlFor="file-upload"
                                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                                        data.attachment 
                                        ? 'border-blue-400 bg-blue-50' 
                                        : 'border-gray-300 bg-white hover:border-[#064d54] hover:bg-gray-50'
                                    }`}
                                >
                                    {data.attachment ? (
                                        <div className="text-center">
                                            <FiCheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                            <p className="text-sm font-bold text-blue-700">{data.attachment.name}</p>
                                            <p className="text-xs text-blue-500">Klik untuk ganti file</p>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 group-hover:text-[#064d54]">
                                            <FiUploadCloud className="w-8 h-8 mx-auto mb-2 transition-transform group-hover:-translate-y-1" />
                                            <p className="text-sm font-medium"><span className="font-bold underline">Klik untuk upload</span></p>
                                            <p className="text-[10px] mt-1">Format: PDF atau JPG (Max 2MB)</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.attachment && <p className="text-red-500 text-xs mt-1 font-medium">{errors.attachment}</p>}
                        </div>
                    )}
                </form>

                
                <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3">
                    <button 
                        type="button" 
                        onClick={handleClose} 
                        className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={processing} 
                        className="px-6 py-2.5 text-sm font-bold text-white bg-[#064d54] hover:bg-[#043c42] rounded-xl shadow-lg shadow-[#064d54]/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <FiCheckCircle /> Kirim Pengajuan
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}