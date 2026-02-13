import { FiUserCheck, FiClock, FiFileText, FiAlertCircle } from 'react-icons/fi';

function StatCard({ label, value, icon, colorClass }) {
    return (
        <div className={`p-6 rounded-2xl border ${colorClass} flex flex-col justify-between h-36 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
            <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm text-2xl group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <span className="text-4xl font-black tracking-tighter opacity-90">{value}</span>
            </div>
            <div>
                <p className="font-bold text-xs uppercase tracking-wider opacity-70 mb-1">Total</p>
                <p className="font-bold text-sm">{label}</p>
            </div>
        </div>
    );
}

export default function StatGrid({ stats }) {
    // Fallback jika stats undefined/null
    const safeStats = stats || { present: 0, late: 0, leave: 0, alpha: 0 };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                label="Hadir Tepat Waktu" 
                value={safeStats.present} 
                icon={<FiUserCheck />} 
                colorClass="bg-emerald-50 text-emerald-600 border-emerald-100" 
            />
            <StatCard 
                label="Terlambat" 
                value={safeStats.late} 
                icon={<FiClock />} 
                colorClass="bg-amber-50 text-amber-600 border-amber-100" 
            />
            <StatCard 
                label="Izin / Sakit" 
                value={safeStats.leave} 
                icon={<FiFileText />} 
                colorClass="bg-blue-50 text-blue-600 border-blue-100" 
            />
            <StatCard 
                label="Tanpa Keterangan" 
                value={safeStats.alpha} 
                icon={<FiAlertCircle />} 
                colorClass="bg-red-50 text-red-600 border-red-100" 
            />
        </div>
    );
}