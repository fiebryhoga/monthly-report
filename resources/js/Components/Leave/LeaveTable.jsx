import StatusBadge from './StatusBadge';

export default function LeaveTable({ leaves, onUpdateStatus, onViewDocument }) {
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
                <thead className="bg-[#064d54] text-white uppercase text-xs font-bold tracking-wider">
                    <tr>
                        <th className="p-5 pl-6">Pegawai</th>
                        <th className="p-5">Tipe Izin</th>
                        <th className="p-5">Durasi</th>
                        <th className="p-5">Alasan & Bukti</th>
                        <th className="p-5 text-center">Status</th>
                        <th className="p-5 text-right pr-6">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {leaves.length > 0 ? (
                        leaves.map((leave) => (
                            <tr key={leave.id} className="hover:bg-[#f8fcfc] transition-colors group">
                                
                                
                                <td className="p-5 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gray-100 text-[#064d54] border border-gray-200 flex items-center justify-center font-bold text-sm shadow-sm">
                                            {leave.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover:text-[#064d54] transition-colors">{leave.user.name}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-0.5 bg-gray-50 inline-block px-1.5 rounded">{leave.user.nip || '-'}</div>
                                        </div>
                                    </div>
                                </td>

                                
                                <td className="p-5">
                                    {leave.type === 'sick' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> SAKIT
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> IZIN
                                        </span>
                                    )}
                                </td>

                                
                                <td className="p-5">
                                    <div className="font-bold text-gray-700 text-xs">{formatDate(leave.start_date)}</div>
                                    <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                                        {formatDate(leave.end_date)}
                                    </div>
                                </td>

                                
                                <td className="p-5 max-w-xs">
                                    <p className="text-gray-600 italic text-sm mb-2 bg-gray-50 p-2 rounded-lg border border-gray-100 text-xs">
                                        "{leave.reason}"
                                    </p>
                                    {leave.attachment ? (
                                        <button 
                                            onClick={() => onViewDocument(`/storage/${leave.attachment}`)}
                                            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-[#0d97a4] hover:bg-[#064d54] px-3 py-1.5 rounded-md transition-all shadow-sm active:scale-95"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            Lihat Dokumen
                                        </button>
                                    ) : (
                                        <span className="text-[10px] text-gray-400 italic">Tidak ada lampiran</span>
                                    )}
                                </td>

                                
                                <td className="p-5 text-center">
                                    <StatusBadge status={leave.status} />
                                </td>

                                
                                <td className="p-5 text-right pr-6">
                                    {leave.status === 'pending' ? (
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => onUpdateStatus(leave.id, 'rejected')}
                                                className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-[10px] font-bold hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
                                            >
                                                TOLAK
                                            </button>
                                            <button 
                                                onClick={() => onUpdateStatus(leave.id, 'approved')}
                                                className="px-3 py-1.5 rounded-lg bg-[#064d54] text-white text-[10px] font-bold hover:bg-[#053a40] shadow-md shadow-[#064d54]/20 transition-all active:scale-95 flex items-center gap-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                SETUJUI
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] text-gray-400 italic flex justify-end items-center gap-1 font-medium">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            Selesai
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-16 text-center">
                                <div className="flex flex-col items-center justify-center opacity-40">
                                    <div className="bg-gray-100 p-4 rounded-full mb-3 border border-gray-200">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <p className="text-gray-900 font-bold text-lg">Semua Beres!</p>
                                    <p className="text-sm text-gray-500 mt-1">Tidak ada pengajuan izin yang pending saat ini.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}