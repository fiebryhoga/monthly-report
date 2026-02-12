import { Link } from '@inertiajs/react';

export default function Sidebar({ user, className = '' }) {
    return (
        <aside className={`bg-[#064d54] text-white w-64 min-h-screen flex flex-col shadow-2xl transition-all duration-300 ${className}`}>
            
            <div className="h-20 flex items-center gap-3 px-6 border-b border-[#0d97a4]/30 bg-[#054046]">
                
                <img 
                    src="/assets/images/sco-logo-login.png" 
                    alt="Logo" 
                    className="h-10 w-auto drop-shadow-md"
                    onError={(e) => { e.target.style.display = 'none'; }} // Fallback if image fails
                />
                <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-wide leading-none">Sawit & Co.</span>
                    <span className="text-[10px] text-[#0d97a4] uppercase tracking-widest mt-1">Enterprise</span>
                </div>
            </div>

            
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                
                
                <MenuSection label="Main Menu" />
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    <DashboardIcon />
                    Dashboard
                </NavLink>

                
                {user.role === 'admin' && (
                    <>
                        <MenuSection label="Administration" className="mt-6" />
                        <NavLink href="#" active={false}>
                            <UsersIcon />
                            Employee Master
                        </NavLink>

                        <NavLink href={route('users.index')} active={route().current('users.index')}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            Master Data
                        </NavLink>


                        <NavLink href="#" active={false}>
                            <DocumentReportIcon />
                            Monthly Reports
                        </NavLink>
                    </>
                )}

                
                <MenuSection label="My Activity" className="mt-6" />
                <NavLink href="#" active={false}>
                    <ClockIcon />
                    My Attendance
                </NavLink>
                <NavLink href="#" active={false}>
                    <CalendarIcon />
                    Leave Requests
                </NavLink>
            </nav>
            
            
            <div className="p-4 border-t border-[#0d97a4]/30 bg-[#04363b]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d97a4] to-[#064d54] border border-white/20 flex items-center justify-center text-sm font-bold shadow-inner">
                        {user.name.charAt(0)}
                    </div>
                    <div className="text-sm overflow-hidden flex-1">
                        <p className="font-semibold truncate text-white">{user.name}</p>
                        <p className="text-xs text-[#0d97a4] truncate capitalize tracking-wide">{user.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}



function MenuSection({ label, className = '' }) {
    return (
        <p className={`px-2 text-xs font-bold text-[#0d97a4]/80 uppercase tracking-widest mb-3 ${className}`}>
            {label}
        </p>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 mb-1 text-sm font-medium ${
                active
                    ? 'bg-[#0d97a4] text-white shadow-lg shadow-[#0d97a4]/20 translate-x-1'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-1'
            }`}
        >
            {children}
        </Link>
    );
}

/* Icons (Extracted for cleanliness) */
const DashboardIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>;
const UsersIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const DocumentReportIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
const ClockIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const CalendarIcon = () => <svg className="w-5 h-5 mr-3 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;