import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    
    const stats = [
        { title: 'Total Pegawai', value: '128', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-blue-500' },
        { title: 'Hadir Hari Ini', value: '112', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500' },
        { title: 'Izin / Sakit', value: '4', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-yellow-500' },
        { title: 'Alpha / Absen', value: '12', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-red-500' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Overview</h2>}
        >
            <Head title="Dashboard" />

            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100 flex items-center justify-between relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-[#064d54] mb-2">
                        Halo, {auth.user.name}! 👋
                    </h3>
                    <p className="text-gray-500">
                        Selamat datang kembali di Sistem Manajemen Kepegawaian Sawit & Co.
                    </p>
                 </div>
                 
                 <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0d97a4]/10 to-transparent"></div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                <svg className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
                                </svg>
                            </div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Harian</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                        <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
                    </div>
                ))}
            </div>

            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[300px] p-6">
                <h4 className="font-bold text-lg text-gray-800 mb-4">Aktivitas Terbaru</h4>
                <div className="space-y-4">
                     
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-4"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Pegawai #{item} melakukan absensi masuk.</p>
                                <p className="text-xs text-gray-400">Baru saja</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}