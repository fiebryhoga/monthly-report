export default function UserFilters({ activeTab, setActiveTab, searchQuery, setSearchQuery, onAdd }) {
    return (
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
                    onClick={onAdd}
                    className="bg-[#064d54] hover:bg-[#053a40] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#064d54]/20 transition-all transform active:scale-95 whitespace-nowrap"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Add New
                </button>
            </div>
        </div>
    );
}