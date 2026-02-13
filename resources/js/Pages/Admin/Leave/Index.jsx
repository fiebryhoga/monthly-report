import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LeaveTable from '@/Components/Leave/LeaveTable';
import DocumentModal from '@/Components/Leave/DocumentModal';

export default function LeaveIndex({ auth, leaves }) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDocUrl, setCurrentDocUrl] = useState(null);

    
    const handleViewDocument = (url) => {
        setCurrentDocUrl(url);
        setIsModalOpen(true);
    };

    
    const handleUpdateStatus = (id, status) => {
        const actionText = status === 'approved' ? 'MENYETUJUI' : 'MENOLAK';
        const confirmMessage = `Apakah Anda yakin ingin ${actionText} pengajuan ini?\n\nSistem akan otomatis memperbarui data absensi pegawai jika disetujui.`;

        if (confirm(confirmMessage)) {
            router.patch(route('admin.leaves.update', id), { 
                status: status 
            }, {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Persetujuan Izin</h2>}
        >
            <Head title="Kelola Izin" />

            
            <DocumentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                documentUrl={currentDocUrl} 
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                
                
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            Daftar Pengajuan Masuk
                            {leaves.filter(l => l.status === 'pending').length > 0 && (
                                <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full border border-red-100 font-bold animate-pulse">
                                    {leaves.filter(l => l.status === 'pending').length} Baru
                                </span>
                            )}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">Kelola pengajuan sakit dan izin pegawai di sini.</p>
                    </div>
                </div>
                
                
                <LeaveTable 
                    leaves={leaves} 
                    onUpdateStatus={handleUpdateStatus} 
                    onViewDocument={handleViewDocument}
                />

                
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 flex justify-end gap-4 uppercase font-bold tracking-wider">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Sakit</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Izin</span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}