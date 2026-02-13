import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UserModal({ show, onClose, user }) {
    if (!show) return null;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nip: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        password: '' 
    });

    useEffect(() => {
        if (user) {
            setData({
                nip: user.nip,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                position: user.position || '',
                department: user.department || '',
                password: ''
            });
        } else {
            reset();
        }
        clearErrors();
    }, [user, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose() };
        
        if (user) {
            put(route('users.update', user.id), options);
        } else {
            post(route('users.store'), options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[90vh]">
                <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
                    <div>
                        <h3 className="font-bold text-xl text-gray-800">{user ? 'Edit Employee' : 'Add New Employee'}</h3>
                        <p className="text-gray-400 text-sm mt-0.5">Please fill in the details below.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                    
                    <div>
                        <h4 className="text-xs font-bold text-[#064d54] uppercase tracking-wider mb-3">Personal Identity</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">NIP</label>
                                <input type="text" value={data.nip} onChange={e => setData('nip', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0d97a4]/20 outline-none" placeholder="e.g. EMP001" />
                                {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0d97a4]/20 outline-none" placeholder="Enter name..." />
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0d97a4]/20 outline-none" placeholder="user@sawitco.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                            <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none" placeholder="+62..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                            <input type="text" value={data.position} onChange={e => setData('position', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none" placeholder="Staff" />
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                        <input type="text" value={data.department} onChange={e => setData('department', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none" placeholder="Operations" />
                    </div>

                    
                    <div className="pt-2">
                        <h4 className="text-xs font-bold text-[#064d54] uppercase tracking-wider mb-3">Security</h4>
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Password {user && <span className="text-xs font-normal text-gray-500">(Leave empty to keep)</span>}</label>
                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border bg-white outline-none" placeholder={user ? "Reset password..." : "Min. 6 chars..."} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm">Cancel</button>
                        <button type="submit" disabled={processing} className="px-6 py-3 bg-[#064d54] text-white rounded-xl hover:bg-[#053a40] font-bold shadow-lg text-sm">
                            {processing ? 'Saving...' : (user ? 'Save Changes' : 'Create Account')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}