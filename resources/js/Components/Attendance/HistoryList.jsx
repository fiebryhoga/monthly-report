import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

export default function HistoryList({ history }) {
    
    
    const formatDuration = (minutes) => {
        if (!minutes || minutes <= 0) return '0m';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hrs > 0) {
            return `${hrs}j ${mins}m`; 
        }
        return `${mins}m`; 
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[500px]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                <h3 className="font-bold text-[#064d54] flex items-center gap-2 text-lg">
                    <FiCalendar className="w-5 h-5" /> Riwayat Bulan Ini
                </h3>
                <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    {history.length} Hari Aktif
                </span>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[600px] custom-scrollbar space-y-4">
                {history.length > 0 ? (
                    history.map((log) => (
                        <div key={log.id} className="flex flex-col sm:flex-row bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all group">
                            
                            <div className={`w-full h-2 sm:w-1.5 sm:h-auto ${log.status === 'late' ? 'bg-amber-500' : log.status === 'alpha' ? 'bg-red-500' : log.status === 'sick' ? 'bg-blue-500' : log.status === 'permit' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
                            
                            
                            <div className="p-4 bg-gray-50 w-full sm:w-24 border-b sm:border-r border-gray-100 text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{new Date(log.date).toLocaleString('id-ID', { month: 'short' })}</div>
                                <div className="text-2xl font-black text-[#064d54]">{new Date(log.date).getDate()}</div>
                                <div className="text-[10px] text-gray-400">{new Date(log.date).toLocaleString('id-ID', { weekday: 'short' })}</div>
                            </div>

                            
                            <div className="flex-1 p-4">
                                <div className="flex justify-between mb-3 items-center">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border tracking-wide ${
                                        log.status === 'late' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                                        log.status === 'alpha' ? 'bg-red-50 text-red-600 border-red-200' : 
                                        log.status === 'sick' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                        log.status === 'permit' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                                        'bg-emerald-50 text-emerald-600 border-emerald-200'
                                    }`}>
                                        
                                        {log.status === 'late' ? `Terlambat ${formatDuration(log.late_minutes)}` : 
                                         log.status === 'alpha' ? 'Alpha' : 
                                         log.status === 'sick' ? 'Sakit' :
                                         log.status === 'permit' ? 'Izin' :
                                         'Hadir'}
                                    </span>
                                    {log.lat && <span className="text-[10px] text-gray-400 flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full"><FiMapPin className="text-emerald-500" /> GPS OK</span>}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-gray-50 rounded-lg p-2">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Masuk</div>
                                        <div className="font-mono font-bold text-gray-800 text-sm">{log.time_in ? log.time_in.substring(0, 5) : '-'}</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-2">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Pulang</div>
                                        <div className="font-mono font-bold text-gray-800 text-sm">{log.time_out ? log.time_out.substring(0, 5) : '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 flex flex-col items-center justify-center opacity-50">
                        <div className="bg-gray-100 p-4 rounded-full mb-3">
                            <FiClock className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-bold">Belum ada riwayat.</p>
                        <p className="text-xs text-gray-400">Absensi Anda bulan ini akan muncul di sini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}