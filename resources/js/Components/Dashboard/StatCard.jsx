export default function StatCard({ label, value, icon, colorClass, iconBgClass }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${iconBgClass} group-hover:scale-110 transition-transform duration-500`}></div>
            
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                    <h3 className="text-3xl font-black text-gray-800 tracking-tight">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${colorClass}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}