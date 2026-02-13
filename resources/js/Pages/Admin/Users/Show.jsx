import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


export default function Show({ auth, user, history, stats }) {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    
    const handleDownloadRecap = () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

        
        const url = route('reports.export', { 
            user_id: user.id, 
            start_date: start, 
            end_date: end, 
            format: 'pdf' 
        });
        window.open(url, '_blank');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link href={route('users.index')} className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#064d54] transition-all shadow-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </Link>
                        <div>
                            <h2 className="font-bold text-xl text-[#064d54] leading-tight">Detail Pegawai</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Informasi lengkap dan riwayat aktivitas.</p>
                        </div>
                    </div>
                    <div>
                        <button 
                            onClick={handleDownloadRecap}
                            className="px-4 py-2 bg-[#064d54] text-white rounded-lg text-sm font-bold hover:bg-[#053a40] shadow-md shadow-[#064d54]/20 transition-all flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Download Rekap (Bulan Ini)
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Profil - ${user.name}`} />

            
            <HistoryModal 
                isOpen={isHistoryOpen} 
                onClose={() => setIsHistoryOpen(false)} 
                history={history} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                
                <div className="lg:col-span-1 space-y-6">
                    <ProfileCard user={user} />
                </div>

                
                <div className="lg:col-span-2 space-y-6">
                    
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard 
                            label="Hadir (Bulan Ini)" value={stats.present} 
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                            color="text-[#064d54]" bg="bg-[#064d54]/10" 
                        />
                        <StatCard 
                            label="Terlambat" value={stats.late} 
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                            color="text-amber-600" bg="bg-amber-50" 
                        />
                        <StatCard 
                            label="Izin / Sakit / Alpha" value={stats.absent} 
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>}
                            color="text-rose-600" bg="bg-rose-50" 
                        />
                    </div>

                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">Aktivitas Terbaru</h3>
                                <p className="text-gray-400 text-xs mt-1">5 riwayat presensi terakhir.</p>
                            </div>
                            <button onClick={() => setIsHistoryOpen(true)} className="text-sm font-bold text-[#0d97a4] hover:text-[#064d54] hover:underline transition-colors">
                                Lihat Semua
                            </button>
                        </div>
                        
                        <HistoryTable data={history.slice(0, 5)} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}






function ProfileCard({ user }) {
    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            
            <div className="h-28 bg-[#064d54] relative">
                <div className="absolute inset-0 bg-white/10 opacity-20 pattern-grid-lg"></div>
            </div>

            
            <div className="px-6 pb-6 relative -mt-12">
                
                
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center mb-3">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0d97a4] to-[#064d54] flex items-center justify-center text-white text-3xl font-bold">
                            {getInitials(user.name)}
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-mono border border-gray-200">
                            {user.nip}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.role === 'employee' ? 'Pegawai' : 'Admin'}
                        </span>
                    </div>
                </div>

                
                <div className="h-px bg-gray-100 my-6"></div>

                
                <div className="space-y-4">
                    <InfoRow label="Jabatan" value={user.position} />
                    <InfoRow label="Departemen" value={user.department} />
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="No. Telepon" value={user.phone} />
                </div>
            </div>
        </div>
    );
}


function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-start border-b border-gray-50 pb-2 last:border-0 last:pb-0">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide w-1/3">{label}</span>
            <span className="text-sm font-semibold text-gray-800 w-2/3 text-right break-words">{value || '-'}</span>
        </div>
    );
}


function StatCard({ label, value, icon, color, bg }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{label}</div>
                <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
            </div>
            <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
        </div>
    );
}


function HistoryTable({ data }) {
    const getBadge = (status) => {
        if(!status) return 'bg-gray-100 text-gray-500';
        switch(status.toLowerCase()) {
            case 'present': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'late': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'sick': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'permit': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'alpha': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">Masuk</th>
                        <th className="px-6 py-4">Pulang</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Catatan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.length > 0 ? (
                        data.map((log, index) => (
                            <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{log.date}</td>
                                <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono font-bold">{log.timeIn}</span></td>
                                <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono font-bold">{log.timeOut}</span></td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getBadge(log.status)}`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-[150px]">{log.note}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="p-8 text-center text-gray-400 italic">Belum ada data presensi.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


function HistoryModal({ isOpen, onClose, history }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up">
                <div className="bg-[#064d54] p-5 flex justify-between items-center text-white shrink-0">
                    <div>
                        <h3 className="font-bold text-lg">Riwayat Presensi Lengkap</h3>
                        <p className="text-white/70 text-xs">Catatan lengkap aktivitas pegawai.</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-0">
                    <HistoryTable data={history} />
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 text-right shrink-0">
                    <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 text-sm">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}