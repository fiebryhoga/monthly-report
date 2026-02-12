import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Master({ auth, users }) {
    const [activeTab, setActiveTab] = useState('employee'); 
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nip: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        password: '' 
    });

    
    const filteredUsers = users
        .filter(u => u.role === activeTab)
        .filter(u => 
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    
    const openCreateModal = () => {
        setEditingUser(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (e, user) => {
        e.stopPropagation(); 
        setEditingUser(user);
        clearErrors();
        setData({
            nip: user.nip,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            position: user.position || '',
            department: user.department || '',
            password: ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => reset(), 300);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => closeModal() };
        
        if (editingUser) {
            put(route('users.update', editingUser.id), options);
        } else {
            post(route('users.store'), options);
        }
    };

    const handleDelete = (e, user) => {
        e.stopPropagation(); 
        if (confirm(`⚠️ DELETE CONFIRMATION\n\nAre you sure you want to delete ${user.name}?\nAll related attendance data will be permanently removed.`)) {
            router.delete(route('users.destroy', user.id));
        }
    };

    const handleSwitchRole = (e, user) => {
        e.stopPropagation(); 
        const action = user.role === 'employee' ? 'Promote to ADMIN' : 'Demote to EMPLOYEE';
        if (confirm(`Role Change Confirmation:\n\n${action} for ${user.name}?`)) {
            router.patch(route('users.role', user.id));
        }
    };

    
    const handleRowClick = (user) => {
        router.get(route('users.show', user.id));
    };

    
    const getInitials = (name) => name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Master Data</h2>}
        >
            <Head title="Employee Management" />

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-[#064d54] to-[#0d6e75] rounded-2xl p-6 text-white shadow-lg shadow-[#064d54]/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[#88dadd] text-sm font-semibold uppercase tracking-wider">Total Employees</p>
                        <h3 className="text-4xl font-extrabold mt-1">{users.filter(u => u.role === 'employee').length}</h3>
                        <p className="text-white/60 text-xs mt-2">Currently Active Workforce</p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[#d4af37] text-sm font-semibold uppercase tracking-wider">Administrators</p>
                        <h3 className="text-4xl font-extrabold mt-1 text-gray-800">{users.filter(u => u.role === 'admin').length}</h3>
                        <p className="text-gray-400 text-xs mt-2">System Managers</p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 bg-[#d4af37]/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
                </div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                
                
                <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    
                    
                    <div className="flex bg-gray-100/80 p-1 rounded-xl">
                        {['employee', 'admin'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    activeTab === tab 
                                    ? 'bg-white text-[#064d54] shadow-md shadow-gray-200' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                }`}
                            >
                                {tab === 'employee' ? 'Employees' : 'Administrators'}
                            </button>
                        ))}
                    </div>

                    
                    <div className="flex w-full lg:w-auto gap-3">
                        <div className="relative flex-1 lg:w-64">
                            <input 
                                type="text"
                                placeholder="Search name, ID, email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-gray-200 border rounded-xl focus:ring-2 focus:ring-[#0d97a4]/20 focus:border-[#0d97a4] transition-all text-sm"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <button 
                            onClick={openCreateModal}
                            className="bg-[#064d54] hover:bg-[#053a40] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#064d54]/20 transition-all transform active:scale-95 whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add New
                        </button>
                    </div>
                </div>

                
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                                <th className="p-5 pl-8">Identity</th>
                                <th className="p-5">Role & Department</th>
                                <th className="p-5">Contact</th>
                                <th className="p-5 text-center">Access Role</th>
                                <th className="p-5 text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        onClick={() => handleRowClick(user)}
                                        className="group hover:bg-[#f0f9fa] cursor-pointer transition-colors duration-200"
                                    >
                                        <td className="p-5 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 text-[#064d54] font-bold flex items-center justify-center text-xs shadow-sm border border-gray-200">
                                                    {getInitials(user.name)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 group-hover:text-[#064d54] transition-colors">{user.name}</div>
                                                    <div className="text-xs text-gray-500 font-mono mt-0.5 bg-gray-100 inline-block px-1.5 rounded">{user.nip}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="font-medium text-gray-800">{user.position || '-'}</div>
                                            <div className="text-xs text-gray-500">{user.department || 'General'}</div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                {user.phone || '-'}
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <button 
                                                onClick={(e) => handleSwitchRole(e, user)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                                                    user.role === 'employee'
                                                    ? 'text-gray-500 border-gray-200 bg-white hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                                                    : 'text-[#d4af37] border-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37]/10'
                                                }`}
                                                title={user.role === 'employee' ? "Promote to Admin" : "Demote to Employee"}
                                            >
                                                {user.role === 'employee' ? 'EMPLOYEE' : 'ADMIN'}
                                            </button>
                                        </td>
                                        <td className="p-5 pr-8 text-right">
                                            <div className="flex justify-end items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={(e) => openEditModal(e, user)}
                                                    className="p-2 text-gray-400 hover:text-[#064d54] hover:bg-[#064d54]/5 rounded-lg transition-colors"
                                                    title="Edit Data"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                </button>
                                                <button 
                                                    onClick={(e) => handleDelete(e, user)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Data"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-40">
                                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            </div>
                                            <p className="text-gray-900 font-semibold">No records found</p>
                                            <p className="text-sm text-gray-500">Try adjusting your search criteria or add a new record.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    
                    <div 
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
                        onClick={closeModal}
                    ></div>

                    
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 relative z-10 flex flex-col max-h-[90vh]">
                        
                        
                        <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
                            <div>
                                <h3 className="font-bold text-xl text-gray-800">
                                    {editingUser ? 'Edit Employee' : 'Add New Employee'}
                                </h3>
                                <p className="text-gray-400 text-sm mt-0.5">Please fill in the details below.</p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                            
                            
                            <div>
                                <h4 className="text-xs font-bold text-[#064d54] uppercase tracking-wider mb-3">Personal Identity</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Employee ID (NIP)</label>
                                        <input 
                                            type="text" 
                                            value={data.nip}
                                            onChange={e => setData('nip', e.target.value)}
                                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none ${errors.nip ? 'border-red-500' : 'border-gray-200 focus:border-[#0d97a4]'}`}
                                            placeholder="e.g. EMP001"
                                        />
                                        {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip}</p>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[#0d97a4]'}`}
                                            placeholder="Enter name..."
                                        />
                                    </div>
                                </div>
                            </div>

                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#0d97a4]'}`}
                                    placeholder="user@sawitco.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0d97a4] focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none"
                                        placeholder="+62..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                                    <input 
                                        type="text" 
                                        value={data.position}
                                        onChange={e => setData('position', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0d97a4] focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none"
                                        placeholder="e.g. Staff"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Department / Division</label>
                                <input 
                                    type="text" 
                                    value={data.department}
                                    onChange={e => setData('department', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0d97a4] focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none"
                                    placeholder="e.g. Operations"
                                />
                            </div>

                            
                            <div className="pt-2">
                                <h4 className="text-xs font-bold text-[#064d54] uppercase tracking-wider mb-3">Account Security</h4>
                                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                        Password {editingUser && <span className="text-xs font-normal text-gray-500">(Leave empty to keep current)</span>}
                                    </label>
                                    <input 
                                        type="password" 
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-[#0d97a4]/20 transition-all outline-none ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#0d97a4]'}`}
                                        placeholder={editingUser ? "Enter to reset password..." : "Min. 6 characters..."}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                            </div>

                            
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                                <button 
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-bold transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-[#064d54] text-white rounded-xl hover:bg-[#053a40] font-bold shadow-lg shadow-[#064d54]/30 transition-all active:scale-95 flex items-center gap-2 text-sm"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        editingUser ? 'Save Changes' : 'Create Account'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}