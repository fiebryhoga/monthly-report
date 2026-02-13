import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FiUsers, FiCheckCircle, FiClock, FiAlertCircle, FiCalendar } from 'react-icons/fi';


import StatCard from '@/Components/Dashboard/StatCard';
import ChartsSection from '@/Components/Dashboard/ChartsSection';
import RecentActivity from '@/Components/Dashboard/RecentActivity';

export default function AdminDashboard({ auth, stats, chartTrend, chartStatus, radarData, recentActivity, date }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Dashboard Admin</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-6 pb-10">
                
                
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Ringkasan Operasional</h3>
                        <p className="text-sm text-gray-500">Pantau performa kehadiran pegawai secara real-time.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">
                        <FiCalendar className="text-[#064d54]" /> 
                        <span>{date}</span>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        label="Total Pegawai" 
                        value={stats.total_employees} 
                        icon={<FiUsers className="w-6 h-6" />} 
                        colorClass="bg-gray-50 text-gray-600"
                        iconBgClass="bg-gray-400"
                    />
                    <StatCard 
                        label="Hadir Hari Ini" 
                        value={stats.present_today} 
                        icon={<FiCheckCircle className="w-6 h-6" />} 
                        colorClass="bg-emerald-50 text-emerald-600"
                        iconBgClass="bg-emerald-400"
                    />
                    <StatCard 
                        label="Terlambat" 
                        value={stats.late_today} 
                        icon={<FiClock className="w-6 h-6" />} 
                        colorClass="bg-amber-50 text-amber-600"
                        iconBgClass="bg-amber-400"
                    />
                    <StatCard 
                        label="Cuti / Sakit" 
                        value={stats.on_leave} 
                        icon={<FiAlertCircle className="w-6 h-6" />} 
                        colorClass="bg-blue-50 text-blue-600"
                        iconBgClass="bg-blue-400"
                    />
                </div>

                
                <ChartsSection 
                    chartTrend={chartTrend} 
                    chartStatus={chartStatus} 
                    radarData={radarData} 
                />

                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    
                    
                    
                    
                    <div className="lg:col-span-3">
                        <RecentActivity activities={recentActivity} />
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}