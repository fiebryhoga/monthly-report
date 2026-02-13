import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';


import StatCards from '@/Components/Master/StatCards';
import UserFilters from '@/Components/Master/UserFilters';
import UserTable from '@/Components/Master/UserTable';
import UserModal from '@/Components/Master/UserModal';

export default function Master({ auth, users }) {
    const [activeTab, setActiveTab] = useState('employee'); 
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    
    const filteredUsers = users
        .filter(u => u.role === activeTab)
        .filter(u => 
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    
    const openCreateModal = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        if (confirm(`⚠️ DELETE CONFIRMATION\n\nAre you sure you want to delete ${user.name}?`)) {
            router.delete(route('users.destroy', user.id));
        }
    };

    const handleSwitchRole = (user) => {
        const action = user.role === 'employee' ? 'Promote to ADMIN' : 'Demote to EMPLOYEE';
        if (confirm(`Role Change Confirmation:\n\n${action} for ${user.name}?`)) {
            router.patch(route('users.role', user.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Master Data</h2>}
        >
            <Head title="Employee Management" />

            
            <StatCards users={users} />

            
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                
                
                <UserFilters 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    onAdd={openCreateModal} 
                />

                
                <UserTable 
                    users={filteredUsers} 
                    onEdit={openEditModal} 
                    onDelete={handleDelete} 
                    onSwitchRole={handleSwitchRole} 
                />
            </div>

            
            <UserModal 
                show={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                user={editingUser} 
            />

        </AuthenticatedLayout>
    );
}