import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';


import AttendanceCard from '@/Components/Attendance/AttendanceCard';
import HistoryList from '@/Components/Attendance/HistoryList';
import LeaveModal from '@/Components/Attendance/LeaveModal';

export default function MyAttendance({ auth, history, today_log, office_config, holiday_info, pending_leave }) {
    const { flash = {} } = usePage().props;
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Presensi Saya</h2>}
        >
            <Head title="Presensi & Izin" />

            
            <LeaveModal 
                show={showLeaveModal} 
                onClose={() => setShowLeaveModal(false)} 
            />

            <div className="py-6">
                
                
                {flash.success && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg shadow-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <span>✅</span> {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <span>⚠️</span> {flash.error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    
                    <div className="lg:col-span-1">
                        <AttendanceCard 
                            today_log={today_log}
                            office_config={office_config}
                            holiday_info={holiday_info}
                            pending_leave={pending_leave} 
                            onOpenLeaveModal={() => setShowLeaveModal(true)}
                        />
                    </div>

                    
                    <div className="lg:col-span-2">
                        <HistoryList history={history} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}