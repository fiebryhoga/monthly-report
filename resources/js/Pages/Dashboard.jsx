import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    FiUserCheck, FiClock, FiFileText, FiAlertCircle, 
    FiArrowRight, FiCalendar
} from 'react-icons/fi';


export default function Dashboard({ auth, stats, today_log, recent_logs, current_date }) {
    const user = auth.user;

    
    const safeStats = stats || { present: 0, late: 0, leave: 0, alpha: 0 };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 11) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 19) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Dashboard</h2>}
        >
            <Head title="Dashboard Pegawai" />

            <div className="space-y-6">
                
                
                <div className="bg-gradient-to-r from-[#064d54] to-[#0d97a4] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-1">{getGreeting()}, {user.name.split(' ')[0]}! 👋</h3>
                        <p className="text-teal-100 text-sm font-medium opacity-90">
                            Selamat bekerja dan jangan lupa jaga kesehatan!
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold border border-white/10">
                            <FiCalendar /> {current_date}
                        </div>
                    </div>
                </div>

                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Hadir Tepat Waktu" value={safeStats.present} icon={<FiUserCheck />} color="bg-emerald-50 text-emerald-600 border-emerald-100" />
                    <StatCard label="Terlambat" value={safeStats.late} icon={<FiClock />} color="bg-amber-50 text-amber-600 border-amber-100" />
                    <StatCard label="Izin / Sakit" value={safeStats.leave} icon={<FiFileText />} color="bg-blue-50 text-blue-600 border-blue-100" />
                    <StatCard label="Tanpa Keterangan" value={safeStats.alpha} icon={<FiAlertCircle />} color="bg-red-50 text-red-600 border-red-100" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
                            <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-[#064d54] rounded-full"></span>
                                Status Hari Ini
                            </h4>

                            <div className="flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm ${today_log ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                                        {today_log ? '✅' : '⏳'}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Status Kehadiran</p>
                                        {today_log ? (
                                            <div>
                                                <h3 className="text-xl font-black text-gray-800">Sudah Absen</h3>
                                                <div className="flex gap-4 mt-2 text-xs font-mono text-gray-600">
                                                    <span className="bg-white px-2 py-1 rounded border">IN: {today_log.time_in.substring(0, 5)}</span>
                                                    <span className="bg-white px-2 py-1 rounded border">OUT: {today_log.time_out ? today_log.time_out.substring(0, 5) : '--:--'}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 className="text-xl font-black text-gray-800">Belum Absen</h3>
                                                <p className="text-sm text-gray-500">Silakan lakukan presensi masuk sekarang.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Link 
                                    href={route('attendance.my')} 
                                    className="group flex items-center gap-2 bg-[#064d54] hover:bg-[#053a40] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#064d54]/20 transition-all active:scale-95 whitespace-nowrap"
                                >
                                    {today_log && !today_log.time_out ? 'Absen Pulang' : 'Buka Halaman Presensi'}
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-gray-800 text-lg">Aktivitas Terakhir</h4>
                                <Link href={route('attendance.my')} className="text-xs font-bold text-[#064d54] hover:underline">Lihat Semua</Link>
                            </div>

                            <div className="space-y-4">
                                {recent_logs && recent_logs.length > 0 ? (
                                    recent_logs.map((log) => (
                                        <div key={log.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shadow-sm">
                                                <FiUserCheck className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-800">
                                                    {new Date(log.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                </p>
                                                <p className="text-xs text-gray-500 capitalize">{log.status}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-mono font-bold text-gray-600">{log.time_in ? log.time_in.substring(0, 5) : '-'}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400 text-sm">Belum ada aktivitas.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className={`p-5 rounded-2xl border ${color} flex flex-col justify-between h-32 hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm text-xl">{icon}</div>
                <span className="text-3xl font-black">{value}</span>
            </div>
            <p className="font-bold text-sm opacity-90">{label}</p>
        </div>
    );
}