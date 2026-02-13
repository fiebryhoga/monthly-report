export default function HistoryModal({ isOpen, onClose, history }) {
    if (!isOpen) return null;

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Late': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Sick': return 'bg-blue-50 text-blue-700 border-blue-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up">
                
                
                <div className="bg-[#064d54] p-5 flex justify-between items-center text-white shrink-0">
                    <div>
                        <h3 className="font-bold text-lg">Full Attendance History</h3>
                        <p className="text-white/70 text-xs">Complete record of employee activities.</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                
                <div className="overflow-y-auto flex-1 p-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Check In</th>
                                <th className="px-6 py-4">Check Out</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {history.map((log, index) => (
                                <tr key={index} className="hover:bg-[#f8fcfc] transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{log.date}</td>
                                    <td className="px-6 py-4 text-gray-600 font-mono">{log.timeIn}</td>
                                    <td className="px-6 py-4 text-gray-600 font-mono">{log.timeOut}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(log.status)}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">{log.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-right shrink-0">
                    <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 text-sm">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}