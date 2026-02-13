import { Link } from '@inertiajs/react';
import { FiArrowRight, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function TodayStatusCard({ todayLog }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col relative overflow-hidden">
            {/* Dekorasi header */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#064d54]"></div>
            
            <h4 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                <FiClock className="text-[#064d54]" />
                Status Kehadiran Hari Ini
            </h4>

            <div className="flex-1 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-gray-50/80 transition-colors">
                <div className="flex items-center gap-5 w-full sm:w-auto">
                    {/* Icon Status */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform hover:scale-105 ${
                        todayLog ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
                    }`}>
                        {todayLog ? <FiCheckCircle /> : <FiClock />}
                    </div>
                    
                    {/* Teks Status */}
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status Saat Ini</p>
                        {todayLog ? (
                            <div>
                                <h3 className="text-xl font-black text-gray-800">Sudah Absen Masuk</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs font-mono font-bold text-green-700 shadow-sm">
                                        IN: {todayLog.time_in.substring(0, 5)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold shadow-sm ${
                                        todayLog.time_out 
                                        ? 'bg-white border-gray-200 text-blue-700' 
                                        : 'bg-gray-100 border-transparent text-gray-400'
                                    }`}>
                                        OUT: {todayLog.time_out ? todayLog.time_out.substring(0, 5) : '--:--'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-black text-gray-800">Belum Absen</h3>
                                <p className="text-sm text-gray-500 font-medium">Anda belum melakukan presensi hari ini.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tombol Aksi */}
                <Link 
                    href={route('attendance.my')} 
                    className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#064d54] hover:bg-[#053a40] text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-[#064d54]/20 transition-all active:scale-95 whitespace-nowrap"
                >
                    <span>{todayLog && !todayLog.time_out ? 'Lakukan Absen Pulang' : 'Buka Halaman Presensi'}</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}