import { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiDownload, FiUser, FiCheckCircle } from 'react-icons/fi';
import { BsFileEarmarkPdfFill, BsFileEarmarkExcelFill } from 'react-icons/bs';

export default function ExportModal({ isOpen, onClose, users }) {
    if (!isOpen) return null;

    
    const toLocalISO = (date) => {
        const offset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - offset).toISOString().split('T')[0];
    };

    const today = new Date();
    
    
    const [startDate, setStartDate] = useState(toLocalISO(today));
    const [endDate, setEndDate] = useState(toLocalISO(today));
    const [format, setFormat] = useState('excel'); 
    const [userId, setUserId] = useState('all');
    const [activeFilter, setActiveFilter] = useState('today');

    
    const handleQuickFilter = (type) => {
        setActiveFilter(type);
        const now = new Date();
        let start, end;

        if (type === 'today') {
            
            start = now;
            end = now;
        } else if (type === 'this_month') {
            
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = now; 
        } else if (type === 'last_month') {
            
            start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            end = new Date(now.getFullYear(), now.getMonth(), 0);
        }

        setStartDate(toLocalISO(start));
        setEndDate(toLocalISO(end));
    };

    
    const handleDownload = () => {
        const params = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
            format: format,
            user_id: userId
        });

        
        window.open(route('reports.export') + '?' + params.toString(), '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            
            <div 
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                
                
                <div className="bg-[#064d54] p-5 flex justify-between items-center text-white border-b border-[#043c42]">
                    <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <FiDownload className="w-5 h-5 text-[#d4af37]" />
                            Export Laporan Presensi
                        </h3>
                        <p className="text-white/70 text-xs mt-0.5">Unduh rekapitulasi data kehadiran pegawai.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                
                <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                    
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Pilih Format Laporan</label>
                        <div className="grid grid-cols-2 gap-4">
                            
                            <div 
                                onClick={() => setFormat('excel')}
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all relative ${
                                    format === 'excel' 
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                                    : 'border-gray-100 bg-white hover:border-gray-200 text-gray-500'
                                }`}
                            >
                                {format === 'excel' && <div className="absolute top-2 right-2 text-emerald-600"><FiCheckCircle /></div>}
                                <BsFileEarmarkExcelFill className={`w-8 h-8 ${format === 'excel' ? 'text-emerald-600' : 'text-gray-300'}`} />
                                <span className="font-bold text-sm">Microsoft Excel</span>
                            </div>

                            
                            <div 
                                onClick={() => setFormat('pdf')}
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all relative ${
                                    format === 'pdf' 
                                    ? 'border-rose-500 bg-rose-50 text-rose-700' 
                                    : 'border-gray-100 bg-white hover:border-gray-200 text-gray-500'
                                }`}
                            >
                                {format === 'pdf' && <div className="absolute top-2 right-2 text-rose-600"><FiCheckCircle /></div>}
                                <BsFileEarmarkPdfFill className={`w-8 h-8 ${format === 'pdf' ? 'text-rose-600' : 'text-gray-300'}`} />
                                <span className="font-bold text-sm">Dokumen PDF</span>
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Periode Waktu</label>
                        
                        
                        <div className="flex gap-2 mb-4 bg-gray-50 p-1 rounded-lg">
                            <QuickFilterButton 
                                active={activeFilter === 'today'} 
                                onClick={() => handleQuickFilter('today')} 
                                label="Hari Ini" 
                            />
                            <QuickFilterButton 
                                active={activeFilter === 'this_month'} 
                                onClick={() => handleQuickFilter('this_month')} 
                                label="Bulan Ini" 
                            />
                            <QuickFilterButton 
                                active={activeFilter === 'last_month'} 
                                onClick={() => handleQuickFilter('last_month')} 
                                label="Bulan Lalu" 
                            />
                        </div>

                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Dari Tanggal</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={startDate}
                                        onChange={(e) => { setStartDate(e.target.value); setActiveFilter('custom'); }}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#064d54] focus:border-[#064d54]"
                                    />
                                    <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Sampai Tanggal</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={endDate}
                                        onChange={(e) => { setEndDate(e.target.value); setActiveFilter('custom'); }}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#064d54] focus:border-[#064d54]"
                                    />
                                    <FiCalendar className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Filter Pegawai</label>
                        <div className="relative">
                            <select 
                                value={userId} 
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#064d54]/20 focus:border-[#064d54] text-sm font-medium text-gray-700 appearance-none"
                            >
                                <option value="all">Semua Pegawai</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name} - {u.nip}</option>
                                ))}
                            </select>
                            <FiUser className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                            <div className="absolute right-3 top-3.5 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                </div>

                
                <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleDownload}
                        className="px-5 py-2.5 rounded-xl bg-[#064d54] text-white font-bold text-sm hover:bg-[#043c42] shadow-lg shadow-[#064d54]/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <FiDownload className="w-4 h-4" />
                        Download Laporan
                    </button>
                </div>
            </div>
        </div>
    );
}


function QuickFilterButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                active 
                ? 'bg-white text-[#064d54] shadow-sm ring-1 ring-gray-200' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
        >
            {label}
        </button>
    );
}