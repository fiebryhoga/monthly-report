import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, user }) {
    
    
    const attendanceHistory = [
        { date: 'Feb 12, 2026', timeIn: '07:45 AM', timeOut: '05:05 PM', status: 'Present', note: '-' },
        { date: 'Feb 11, 2026', timeIn: '08:10 AM', timeOut: '05:00 PM', status: 'Late', note: 'Flat tire' },
        { date: 'Feb 10, 2026', timeIn: '07:50 AM', timeOut: '05:10 PM', status: 'Present', note: '-' },
        { date: 'Feb 09, 2026', timeIn: '--:--', timeOut: '--:--', status: 'Sick', note: 'Medical Cert.' },
        { date: 'Feb 08, 2026', timeIn: '--:--', timeOut: '--:--', status: 'Day Off', note: 'Sunday' },
    ];

    
    const getStatusBadge = (status) => {
        switch(status) {
            case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
            case 'Late': return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
            case 'Sick': return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
            case 'Day Off': return 'bg-gray-50 text-gray-600 border-gray-200 ring-gray-500/20';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    
    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('users.index')} 
                            className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#064d54] transition-all shadow-sm"
                            title="Back to List"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </Link>
                        <div>
                            <h2 className="font-bold text-xl text-[#064d54] leading-tight">Employee Profile</h2>
                            <p className="text-xs text-gray-500 mt-0.5">View personal details and activity.</p>
                        </div>
                    </div>
                    
                    
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors">
                            Export Data
                        </button>
                        <button className="px-4 py-2 bg-[#064d54] text-white rounded-lg text-sm font-medium hover:bg-[#053a40] shadow-md shadow-[#064d54]/20 transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            Edit Profile
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Profile - ${user.name}`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
                        
                        
                        <div className="h-32 bg-gradient-to-r from-[#064d54] to-[#0d97a4] relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 opacity-30 pattern-dots"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                        
                        <div className="px-6 pb-8 relative">
                            
                            <div className="absolute -top-12 left-6">
                                <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0d97a4] to-[#064d54] flex items-center justify-center text-white text-3xl font-bold border border-gray-100">
                                        {getInitials(user.name)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-14 ml-1">
                                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{user.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200">{user.nip}</span>
                                    <span>•</span>
                                    <span className="text-[#0d97a4] uppercase tracking-wide text-xs font-bold">{user.role}</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-5">
                                <InfoItem 
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                                    label="Position"
                                    value={user.position || '-'}
                                />
                                <InfoItem 
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>}
                                    label="Department"
                                    value={user.department || '-'}
                                />
                                <InfoItem 
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                                    label="Email Address"
                                    value={user.email}
                                    isEmail
                                />
                                <InfoItem 
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                                    label="Phone Number"
                                    value={user.phone || '-'}
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className="bg-gradient-to-br from-[#064d54] to-[#04363b] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">Account Status</h4>
                            <p className="text-white/70 text-sm mb-4">This account is currently active and has full system access based on the assigned role.</p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#88dadd]">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Active User
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    </div>
                </div>

                
                <div className="lg:col-span-2 space-y-6">
                    
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard 
                            label="Total Present" 
                            value="22" 
                            subtext="This Month" 
                            color="text-[#064d54]" 
                            bg="bg-[#064d54]/5"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                        />
                        <StatCard 
                            label="Late Arrival" 
                            value="3" 
                            subtext="Needs Improvement" 
                            color="text-amber-600" 
                            bg="bg-amber-50"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                        />
                        <StatCard 
                            label="Absence" 
                            value="1" 
                            subtext="Approved Leave" 
                            color="text-rose-600" 
                            bg="bg-rose-50"
                            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                        />
                    </div>

                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">Attendance History</h3>
                                <p className="text-gray-400 text-xs mt-1">Latest activity logs for this user.</p>
                            </div>
                            <button className="text-sm font-semibold text-[#0d97a4] hover:text-[#064d54] hover:underline">
                                View Full History
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Check In</th>
                                        <th className="px-6 py-4">Check Out</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Note</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceHistory.map((log, index) => (
                                        <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                                                {log.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`font-mono text-xs font-bold px-2 py-1 rounded inline-block ${log.timeIn !== '--:--' ? 'bg-gray-100 text-gray-700' : 'text-gray-300'}`}>
                                                    {log.timeIn}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`font-mono text-xs font-bold px-2 py-1 rounded inline-block ${log.timeOut !== '--:--' ? 'bg-gray-100 text-gray-700' : 'text-gray-300'}`}>
                                                    {log.timeOut}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ring-1 ring-inset ${getStatusBadge(log.status)}`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs max-w-[150px] truncate">
                                                {log.note !== '-' ? log.note : <span className="text-gray-300">-</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-400">
                            Showing latest 5 records
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}



function InfoItem({ icon, label, value, isEmail = false }) {
    return (
        <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#064d54]/5 flex items-center justify-center text-[#064d54] shrink-0">
                {icon}
            </div>
            <div className="overflow-hidden">
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-0.5">{label}</p>
                <p className={`font-semibold text-gray-800 ${isEmail ? 'break-all text-sm' : ''}`}>{value}</p>
            </div>
        </div>
    );
}

function StatCard({ label, value, subtext, color, bg, icon }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{label}</div>
                <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
                <div className="text-[10px] text-gray-400 mt-1">{subtext}</div>
            </div>
            <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
        </div>
    );
}