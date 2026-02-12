import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            
            
            <div 
                className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-out lg:static lg:translate-x-0 bg-[#064d54] ${
                    showingSidebar ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}
            >
                <Sidebar user={user} />
            </div>

            
            {showingSidebar && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setShowingSidebar(false)}
                ></div>
            )}

            
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                
                <Navbar 
                    user={user} 
                    header={header} 
                    onToggleSidebar={() => setShowingSidebar(true)} 
                />

                
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto animate-fade-in-up">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}