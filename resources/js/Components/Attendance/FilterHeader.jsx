export default function FilterHeader({ date, onDateChange, onExportClick }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-50 pb-6">
            <div>
                <h3 className="font-bold text-gray-800 text-lg">Ringkasan Harian</h3>
                <p className="text-sm text-gray-400">Pantau jam masuk, jam pulang, dan status kehadiran pegawai.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                    onClick={onExportClick}
                    className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#064d54] hover:border-[#064d54]/30 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all group"
                >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#064d54]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Export Laporan
                </button>

                
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#064d54]/10 focus-within:border-[#064d54]">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider leading-none mb-0.5">Pilih Tanggal</label>
                        <input 
                            type="date" 
                            value={date}
                            onChange={onDateChange}
                            className="border-none bg-transparent text-sm font-bold text-[#064d54] focus:ring-0 p-0 cursor-pointer w-32"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}