import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ExportModal from '@/Components/Dashboard/ExportModal'; 


import FilterHeader from '@/Components/Attendance/FilterHeader';
import AttendanceTable from '@/Components/Attendance/AttendanceTable';
import LegendFooter from '@/Components/Attendance/LegendFooter';

export default function AttendanceIndex({ auth, employees, date, users_list }) {
    const [selectedDate, setSelectedDate] = useState(date);
    const [showExport, setShowExport] = useState(false);

    
    const handleFilter = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        router.get(route('admin.attendance.index'), { date: newDate }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Monitoring Presensi</h2>}
        >
            <Head title="Monitoring Harian" />

            
            <ExportModal 
                isOpen={showExport} 
                onClose={() => setShowExport(false)} 
                users={users_list} 
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[600px] flex flex-col">
                
                
                <FilterHeader 
                    date={selectedDate} 
                    onDateChange={handleFilter} 
                    onExportClick={() => setShowExport(true)} 
                />

                
                <AttendanceTable employees={employees} />
                
                
                <LegendFooter />

            </div>
        </AuthenticatedLayout>
    );
}