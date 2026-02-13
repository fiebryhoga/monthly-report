import { router } from '@inertiajs/react';

export default function UserTable({ users, onEdit, onDelete, onSwitchRole }) {
    
    const getInitials = (name) => name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

    const handleRowClick = (id) => {
        router.get(route('users.show', id));
    };

    if (users.length === 0) {
        return (
            <div className="p-20 text-center flex flex-col items-center justify-center opacity-40">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <p className="text-gray-900 font-semibold">No records found</p>
                <p className="text-sm text-gray-500">Try adjusting your search criteria.</p>
            </div>
        );
    }

    return (
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
                    {users.map((user) => (
                        <tr 
                            key={user.id} 
                            onClick={() => handleRowClick(user.id)}
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
                                    onClick={(e) => { e.stopPropagation(); onSwitchRole(user); }}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                                        user.role === 'employee'
                                        ? 'text-gray-500 border-gray-200 bg-white hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                                        : 'text-[#d4af37] border-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37]/10'
                                    }`}
                                >
                                    {user.role === 'employee' ? 'EMPLOYEE' : 'ADMIN'}
                                </button>
                            </td>

                            
                            <td className="p-5 pr-8 text-right">
                                <div className="flex justify-end items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onEdit(user); }}
                                        className="p-2 text-gray-400 hover:text-[#064d54] hover:bg-[#064d54]/5 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDelete(user); }}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}