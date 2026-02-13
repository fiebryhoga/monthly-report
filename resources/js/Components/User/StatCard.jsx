export default function StatCard({ label, value, subtext, color, bg }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{label}</div>
                <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
                <div className="text-[10px] text-gray-400 mt-1">{subtext}</div>
            </div>
            <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            </div>
        </div>
    );
}