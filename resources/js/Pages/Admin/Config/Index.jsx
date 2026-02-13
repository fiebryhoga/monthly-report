import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function ConfigIndex({ auth, config, holidays }) {
    
    
    const { data: conf, setData: setConf, put, processing, errors } = useForm({
        office_start_time: config?.office_start_time || '08:00',
        office_end_time: config?.office_end_time || '17:00',
        late_tolerance_minutes: config?.late_tolerance_minutes || 0,
        allowed_radius_meters: config?.allowed_radius_meters || 50,
        office_latitude: config?.office_latitude || '',
        office_longitude: config?.office_longitude || '',
    });

    
    const { data: hol, setData: setHol, post, reset, errors: holErrors } = useForm({
        date: '',
        description: ''
    });

    
    const handleConfigSubmit = (e) => {
        e.preventDefault();
        put(route('config.update'), {
            preserveScroll: true,
            onSuccess: () => alert('Konfigurasi berhasil disimpan!')
        });
    };

    
    const handleHolidaySubmit = (e) => {
        e.preventDefault();
        post(route('holidays.store'), {
            onSuccess: () => reset()
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-[#064d54] tracking-tight">Konfigurasi Sistem</h2>}
        >
            <Head title="Pengaturan Presensi" />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                
                <div className="xl:col-span-2 space-y-6">
                    
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        
                        
                        <div className="bg-gradient-to-r from-[#064d54] to-[#0d97a4] px-8 py-5 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    Parameter Presensi
                                </h3>
                                <p className="text-white/70 text-xs mt-1">Atur jam kerja, toleransi, dan lokasi kantor pusat.</p>
                            </div>
                        </div>

                        <form onSubmit={handleConfigSubmit} className="p-8 space-y-8">
                            
                            
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">1. Jadwal Operasional</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Jam Masuk Kantor</label>
                                        <div className="relative">
                                            <input 
                                                type="time" 
                                                value={conf.office_start_time}
                                                onChange={e => setConf('office_start_time', e.target.value)}
                                                className="w-full pl-10 border-gray-300 rounded-xl focus:ring-[#0d97a4] focus:border-[#0d97a4] transition-shadow"
                                            />
                                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1.5 ml-1">Batas awal perhitungan keterlambatan.</p>
                                    </div>

                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Jam Pulang Kantor</label>
                                        <div className="relative">
                                            <input 
                                                type="time" 
                                                value={conf.office_end_time}
                                                onChange={e => setConf('office_end_time', e.target.value)}
                                                className="w-full pl-10 border-gray-300 rounded-xl focus:ring-[#0d97a4] focus:border-[#0d97a4] transition-shadow"
                                            />
                                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1.5 ml-1">Syarat minimal absen pulang valid.</p>
                                    </div>
                                </div>

                                
                                <div className="mt-5 bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-4">
                                    <div className="p-2 bg-amber-100 rounded-full text-amber-600 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold text-gray-800 mb-1">Toleransi Keterlambatan</label>
                                        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                            Pegawai tidak akan ditandai "Terlambat" jika absen dalam rentang waktu ini setelah jam masuk.
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={conf.late_tolerance_minutes}
                                                onChange={e => setConf('late_tolerance_minutes', e.target.value)}
                                                className="w-20 text-center font-bold border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-sm"
                                            />
                                            <span className="text-sm font-bold text-amber-700">Menit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">2. Geofencing (Lokasi)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Latitude</label>
                                        <input 
                                            type="text" 
                                            value={conf.office_latitude}
                                            onChange={e => setConf('office_latitude', e.target.value)}
                                            placeholder="-6.123456"
                                            className="w-full border-gray-300 rounded-xl text-sm focus:ring-[#0d97a4] focus:border-[#0d97a4]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Longitude</label>
                                        <input 
                                            type="text" 
                                            value={conf.office_longitude}
                                            onChange={e => setConf('office_longitude', e.target.value)}
                                            placeholder="106.123456"
                                            className="w-full border-gray-300 rounded-xl text-sm focus:ring-[#0d97a4] focus:border-[#0d97a4]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Radius Maksimal (Geofence)</label>
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="number" 
                                            value={conf.allowed_radius_meters}
                                            onChange={e => setConf('allowed_radius_meters', e.target.value)}
                                            className="w-24 border-gray-300 rounded-xl focus:ring-[#0d97a4] focus:border-[#0d97a4] font-bold text-center"
                                        />
                                        <span className="text-gray-600 font-medium">Meter</span>
                                        <span className="text-xs text-gray-400 italic ml-2">dari titik koordinat kantor.</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="pt-6 border-t border-gray-100">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-[#064d54] hover:bg-[#043c42] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#064d54]/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2 text-lg"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Menyimpan...
                                        </span>
                                    ) : (
                                        'Simpan Perubahan Konfigurasi'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                
                <div className="xl:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col sticky top-6">
                        
                        
                        <div className="bg-[#d4af37] px-6 py-5">
                            <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                Kalender Libur
                            </h3>
                            <p className="text-white/80 text-xs mt-1">Kelola tanggal merah & cuti bersama.</p>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            
                            
                            <form onSubmit={handleHolidaySubmit} className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Tambah Baru</h4>
                                <div className="space-y-3">
                                    <div>
                                        <input 
                                            type="date" 
                                            value={hol.date}
                                            onChange={e => setHol('date', e.target.value)}
                                            className="w-full border-gray-200 rounded-lg text-sm focus:border-[#d4af37] focus:ring-[#d4af37] shadow-sm"
                                            required
                                        />
                                        {holErrors.date && <p className="text-red-500 text-xs mt-1">{holErrors.date}</p>}
                                    </div>
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Keterangan (Cth: Idul Fitri)"
                                            value={hol.description}
                                            onChange={e => setHol('description', e.target.value)}
                                            className="w-full border-gray-200 rounded-lg text-sm focus:border-[#d4af37] focus:ring-[#d4af37] shadow-sm"
                                            required
                                        />
                                        {holErrors.description && <p className="text-red-500 text-xs mt-1">{holErrors.description}</p>}
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-white border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white font-bold py-2 rounded-lg text-sm transition-all"
                                    >
                                        + Tambahkan
                                    </button>
                                </div>
                            </form>

                            
                            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar max-h-[600px]">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span>Jadwal Mendatang</span>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">{holidays.length}</span>
                                </h4>
                                
                                {holidays.length > 0 ? (
                                    <div className="space-y-3">
                                        {holidays.map((h) => (
                                            <div key={h.id} className="group flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#d4af37]/30 transition-all">
                                                <div className="flex items-center gap-3">
                                                    
                                                    <div className="bg-red-50 text-red-600 border border-red-100 w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                                                        <span className="text-xs font-bold uppercase">{new Date(h.date).toLocaleString('id-ID', { month: 'short' })}</span>
                                                        <span className="text-lg font-black leading-none">{new Date(h.date).getDate()}</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800 text-sm line-clamp-1">{h.description}</div>
                                                        <div className="text-xs text-gray-400">{new Date(h.date).getFullYear()}</div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Yakin ingin menghapus hari libur ini?')) {
                                                            router.delete(route('holidays.destroy', h.id));
                                                        }
                                                    }}
                                                    className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                                    title="Hapus"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-100">
                                        <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <p className="text-gray-400 text-xs font-medium">Belum ada hari libur.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}