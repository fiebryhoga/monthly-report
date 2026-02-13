export default function StatCards({ users }) {
    const employeeCount = users.filter(u => u.role === 'employee').length;
    const adminCount = users.filter(u => u.role === 'admin').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            
            <div className="bg-gradient-to-br from-[#064d54] to-[#0d6e75] rounded-2xl p-6 text-white shadow-lg shadow-[#064d54]/20 relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-[#88dadd] text-sm font-semibold uppercase tracking-wider">Total Employees</p>
                    <h3 className="text-4xl font-extrabold mt-1">{employeeCount}</h3>
                    <p className="text-white/60 text-xs mt-2">Currently Active Workforce</p>
                </div>
                <div className="absolute -right-4 -bottom-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
            </div>

            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-[#d4af37] text-sm font-semibold uppercase tracking-wider">Administrators</p>
                    <h3 className="text-4xl font-extrabold mt-1 text-gray-800">{adminCount}</h3>
                    <p className="text-gray-400 text-xs mt-2">System Managers</p>
                </div>
                <div className="absolute -right-4 -bottom-4 bg-[#d4af37]/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            </div>
        </div>
    );
}