import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Import Komponen Baru
import WelcomeCard from '@/Components/Dashboard/Employee/WelcomeCard';
import StatGrid from '@/Components/Dashboard/Employee/StatGrid';
import TodayStatusCard from '@/Components/Dashboard/Employee/TodayStatusCard';

export default function Dashboard({ auth, stats, today_log, current_date }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Dashboard</h2>}
        >
            <Head title="Dashboard Pegawai" />

            <div className="space-y-8 pb-10">
                
                
                <WelcomeCard 
                    user={auth.user} 
                    currentDate={current_date} 
                />

                
                <StatGrid 
                    stats={stats} 
                />

                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    
                    <div className="lg:col-span-2">
                        <TodayStatusCard 
                            todayLog={today_log} 
                        />
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}