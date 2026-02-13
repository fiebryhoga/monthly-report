import StatusBadge from './StatusBadge';

export default function AttendanceTable({ employees }) {
    
    // Helper format jam
    const formatTime = (time) => {
        if (!time || time === '-') return <span className="text-gray-300 font-mono text-xs">--:--</span>;
        return String(time).substring(0, 5);
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm flex-1">
            <table className="w-full text-left text-sm">
                <thead className="bg-[#064d54] text-white uppercase text-xs font-bold tracking-wider">
                    <tr>
                        <th className="p-4 pl-6">Pegawai</th>
                        <th className="p-4 text-center">Jam Masuk</th>
                        <th className="p-4 text-center">Jam Pulang</th>
                        <th className="p-4 text-center pr-6">Status Kehadiran</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-[#f8fcfc] transition-colors group">
                                
                                
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 text-[#064d54] flex items-center justify-center font-bold text-sm border border-gray-200 shadow-sm">
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover:text-[#064d54] transition-colors">{emp.name}</div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-gray-400 font-mono tracking-wide bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                                    {emp.nip || '-'}
                                                </span>
                                                {emp.role === 'admin' && (
                                                    <span className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold bg-purple-50 text-purple-600 border border-purple-100 uppercase tracking-wide">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                
                                
                                <td className="p-4 text-center">
                                    {emp.status === 'sick' || emp.status === 'permit' ? (
                                        <span className="text-gray-300 text-xs italic">-</span>
                                    ) : (emp.time_in && emp.time_in !== '-') ? ( 
                                        <span className="inline-block bg-emerald-50 px-3 py-1 rounded-md text-emerald-700 font-mono text-xs border border-emerald-100 shadow-sm font-bold">
                                            {formatTime(emp.time_in)}
                                        </span>
                                    ) : (
                                        formatTime(null)
                                    )}
                                </td>
                                
                                
                                <td className="p-4 text-center">
                                    {emp.status === 'sick' || emp.status === 'permit' ? (
                                        <span className="text-gray-300 text-xs italic">-</span>
                                    ) : (emp.time_out && emp.time_out !== '-') ? (
                                        <span className="inline-block bg-amber-50 px-3 py-1 rounded-md text-amber-700 font-mono text-xs border border-amber-100 shadow-sm font-bold">
                                            {formatTime(emp.time_out)}
                                        </span>
                                    ) : (
                                        formatTime(null)
                                    )}
                                </td>
                                
                                
                                <td className="p-4 text-center pr-6">
                                    <StatusBadge status={emp.status} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="p-16 text-center">
                                <div className="flex flex-col items-center justify-center opacity-40">
                                    <div className="bg-gray-100 p-4 rounded-full mb-3 border border-gray-200">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                    <p className="text-gray-900 font-bold text-lg">Tidak ada data ditemukan</p>
                                    <p className="text-sm text-gray-500 mt-1">Coba pilih tanggal lain atau pastikan pegawai sudah terdaftar.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}