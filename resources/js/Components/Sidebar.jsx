import { Link } from '@inertiajs/react';

export default function Sidebar({ user, className = '' }) {
    return (
        
        
        
        
        <aside className={`bg-[#064d54] text-white w-64 h-screen sticky top-0 flex flex-col shadow-2xl transition-all duration-300 ${className} font-sans z-50`}>
            
            
            <div className="h-20 flex items-center gap-3 px-6 border-b border-[#0d97a4]/30 bg-[#054046] shrink-0">
                <img 
                    src="/assets/images/sco-logo-login.png" 
                    alt="Logo" 
                    className="h-10 w-auto drop-shadow-md"
                    onError={(e) => { e.target.style.display = 'none'; }} 
                />
                <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-wide leading-none">Sawit & Co.</span>
                    <span className="text-[10px] text-[#0d97a4] uppercase tracking-widest mt-1">Enterprise</span>
                </div>
            </div>

            
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                
                
                <MenuSection label="Menu Utama" />
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    <DashboardIcon />
                    Dashboard
                </NavLink>

                
                {user.role === 'admin' && (
                    <>
                        <MenuSection label="Administrator" className="mt-6" />
                        
                        <NavLink href={route('users.index')} active={route().current('users.*')}>
                            <UsersIcon />
                            Master Pegawai
                        </NavLink>

                        <NavLink href={route('config.index')} active={route().current('config.*')}>
                            <ConfigIcon />
                            Konfigurasi Kantor
                        </NavLink>

                        <NavLink href={route('admin.leaves.index')} active={route().current('admin.leaves.*')}>
                            <DocumentCheckIcon />
                            Persetujuan Izin
                        </NavLink>

                        <NavLink href={route('admin.attendance.index')} active={route().current('admin.attendance.*')}>
                            <MonitorIcon />
                            Monitoring Presensi
                        </NavLink>
                    </>
                )}

                
                <MenuSection label="Aktivitas Saya" className="mt-6" />
                
                <NavLink href={route('attendance.my')} active={route().current('attendance.my')}>
                    <ClockIcon />
                    Presensi & Absen
                </NavLink>

                
                <div className="mt-8 pt-4 border-t border-[#0d97a4]/20 pb-4">
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 text-sm font-bold text-red-300 hover:bg-red-900/30 hover:text-red-100 hover:translate-x-1 group"
                    >
                        <LogoutIcon />
                        Keluar Sistem
                    </Link>
                </div>
            </nav>
            
            
            <div className="p-4 border-t border-[#0d97a4]/30 bg-[#04363b] shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d97a4] to-[#064d54] border border-white/20 flex items-center justify-center text-sm font-bold shadow-inner text-white uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <div className="text-sm overflow-hidden flex-1">
                        <p className="font-semibold truncate text-white">{user.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                            <p className="text-[10px] text-[#0d97a4] truncate capitalize tracking-wide">
                                {user.role === 'admin' ? 'Administrator' : 'Pegawai'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}



function MenuSection({ label, className = '' }) {
    return (
        <p className={`px-2 text-[10px] font-bold text-[#0d97a4] uppercase tracking-widest mb-2 opacity-80 ${className}`}>
            {label}
        </p>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 mb-1 text-sm font-medium border border-transparent ${
                active
                    ? 'bg-[#0d97a4] text-white shadow-lg shadow-[#0d97a4]/30 translate-x-1 font-bold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-1 hover:border-white/5'
            }`}
        >
            {children}
        </Link>
    );
}


const DashboardIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>;
const UsersIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const ConfigIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const DocumentCheckIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>;
const MonitorIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>;
const ClockIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const CalendarIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const LogoutIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;