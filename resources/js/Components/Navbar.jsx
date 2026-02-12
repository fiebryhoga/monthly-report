import { Link } from '@inertiajs/react';

export default function Navbar({ user, header, onToggleSidebar }) {
    
    
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm border-b border-gray-100 h-20 px-6 lg:px-8 flex items-center justify-between transition-all">
            
            
            <div className="flex items-center gap-4">
                
                <button 
                    onClick={onToggleSidebar}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#0d97a4]"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                </button>

                
                <div className="flex flex-col">
                    {header || <h2 className="text-xl font-bold text-[#064d54]">Dashboard</h2>}
                </div>
            </div>

            
            <div className="flex items-center gap-4">
                
                
                <div className="flex items-center gap-3">
                    
                    
                    <div className="text-right hidden sm:block leading-tight">
                        <div className="text-sm font-bold text-gray-800">{user.name}</div>
                        <div className="text-xs text-gray-500 tracking-wide">{user.nip || 'Administrator'}</div>
                    </div>

                    
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0d97a4] to-[#064d54] text-white flex items-center justify-center font-bold text-lg shadow-md ring-2 ring-white/50">
                        {getInitials(user.name)}
                    </div>
                </div>

                
                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                
                <Link 
                    href={route('logout')} 
                    method="post" 
                    as="button"
                    className="group flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                    title="Sign Out"
                >
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </Link>
            </div>
        </header>
    );
}