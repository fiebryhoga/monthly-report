import { FiClock } from 'react-icons/fi';

export default function RecentActivity({ activities }) {
    return (
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="p-1.5 bg-orange-50 rounded-lg text-orange-600"><FiClock /></span>
                    Aktivitas Terbaru (Live)
                </h4>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {activities.length > 0 ? (
                    activities.map((log) => (
                        <div key={log.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                            
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105 ${
                                log.status === 'late' ? 'bg-amber-100 text-amber-700' : 
                                log.status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-gray-100 text-gray-600'
                            }`}>
                                {log.user.name.charAt(0)}
                            </div>
                            
                            
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-800 truncate group-hover:text-[#064d54] transition-colors">{log.user.name}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                                        log.time_out ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                    }`}>
                                        {log.time_out ? 'PULANG' : 'MASUK'}
                                    </span>
                                    <span>•</span>
                                    <span>{log.status === 'late' ? <span className="text-amber-600 font-bold">Terlambat</span> : 'Tepat Waktu'}</span>
                                </div>
                            </div>
                            
                            
                            <div className="text-right">
                                <p className="text-sm font-mono font-bold text-gray-700">
                                    {log.time_out ? String(log.time_out).substring(0, 5) : String(log.time_in).substring(0, 5)}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    {new Date(log.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                        <FiClock className="w-8 h-8 opacity-20" />
                        <span className="text-sm italic">Belum ada aktivitas presensi hari ini.</span>
                    </div>
                )}
            </div>
        </div>
    );
}