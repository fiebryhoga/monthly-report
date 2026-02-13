import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    FiMapPin, FiRefreshCw, FiClock, FiCalendar, 
    FiCheckCircle, FiFileText, FiAlertTriangle 
} from 'react-icons/fi';

export default function AttendanceCard({ today_log, office_config, holiday_info, pending_leave, onOpenLeaveModal }) {
    const { data, setData, post, processing, reset } = useForm({
        latitude: '',
        longitude: ''
    });

    const [currentTime, setCurrentTime] = useState(new Date());
    const [userLocation, setUserLocation] = useState(null);
    const [distanceToOffice, setDistanceToOffice] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoadingLoc, setIsLoadingLoc] = useState(false);

    const isHoliday = holiday_info?.is_holiday;
    const holidayReason = holiday_info?.reason;

    
    const formatDuration = (minutes) => {
        if (!minutes || minutes <= 0) return '0 Menit';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hrs > 0 ? `${hrs} Jam ${mins} Menit` : `${mins} Menit`;
    };

    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180, Δλ = (lon2-lon1) * Math.PI/180;
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    };

    
    const getLocation = () => {
        
        if (isHoliday || pending_leave) return;

        setIsLoadingLoc(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError("Browser tidak mendukung GPS.");
            setIsLoadingLoc(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                setData({ latitude, longitude });

                if (office_config?.office_latitude) {
                    const dist = calculateDistance(latitude, longitude, office_config.office_latitude, office_config.office_longitude);
                    setDistanceToOffice(Math.round(dist));
                }
                setIsLoadingLoc(false);
            },
            (err) => {
                setLocationError("Gagal mengambil lokasi. Pastikan GPS aktif.");
                setIsLoadingLoc(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    
    useEffect(() => {
        if (!isHoliday && !pending_leave) getLocation();
    }, [isHoliday, pending_leave]);

    
    const handleSubmit = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const payload = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
            post(route('attendance.store'), {
                data: payload,
                preserveScroll: true,
                onSuccess: () => { reset(); getLocation(); },
                onError: () => getLocation()
            });
        }, () => alert("Gagal verifikasi GPS."), { enableHighAccuracy: true });
    };

    

    
    if (pending_leave) {
        return (
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl border border-amber-100 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
                <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <FiClock className="w-10 h-10" />
                </div>
                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Status Presensi</h3>
                <h2 className="text-2xl font-black text-amber-600 mb-2">Menunggu Persetujuan</h2>
                <p className="text-gray-600 text-sm px-4">
                    Pengajuan <strong>{pending_leave.type === 'sick' ? 'Sakit' : 'Izin'}</strong> Anda sedang diproses oleh Admin.
                </p>
                <div className="mt-4 text-xs text-amber-600/70 font-mono bg-amber-50 inline-block px-3 py-1 rounded-lg">
                    Mohon tunggu konfirmasi.
                </div>
            </div>
        );
    }

    
    if (isHoliday) {
        return (
            <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-xl border border-red-100 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCalendar className="w-10 h-10" />
                </div>
                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Status Kantor</h3>
                <h2 className="text-3xl font-black text-red-600 mb-2">{holidayReason}</h2>
                <p className="text-gray-500 text-sm">Tidak ada jadwal presensi hari ini.</p>
                <button 
                    onClick={onOpenLeaveModal} 
                    className="mt-6 w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    <FiFileText /> Tetap ajukan izin?
                </button>
            </div>
        );
    }

    
    if (today_log && (today_log.status === 'sick' || today_log.status === 'permit')) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border border-blue-100 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Status Presensi</h3>
                <h2 className="text-2xl font-black text-blue-700 mb-2">Pengajuan Disetujui</h2>
                <p className="text-gray-600 text-sm">
                    Anda tercatat <strong>{today_log.status === 'sick' ? 'SAKIT' : 'IZIN'}</strong> hari ini.
                </p>
                {today_log.note && (
                    <p className="mt-2 text-xs text-gray-400 italic">"{today_log.note}"</p>
                )}
            </div>
        );
    }

    
    
    
    let btnText = "Absen Masuk";
    let btnSub = "Mulai jam kerja";
    let btnColor = "bg-gradient-to-r from-[#064d54] to-[#0d97a4]";
    let isDisabled = false;
    let currentStatus = { label: 'BELUM HADIR', color: 'bg-gray-100 text-gray-500 border-gray-200' };

    if (today_log) {
        
        if (today_log.status === 'late') {
            currentStatus = { label: `TERLAMBAT (${formatDuration(today_log.late_minutes)})`, color: 'bg-amber-50 text-amber-700 border-amber-200' };
        } else {
            currentStatus = { label: 'HADIR (TEPAT WAKTU)', color: 'bg-green-50 text-green-700 border-green-200' };
        }

        if (!today_log.time_out) {
            btnText = "Absen Pulang"; 
            btnSub = "Selesaikan hari kerja"; 
            btnColor = "bg-gradient-to-r from-[#d4af37] to-[#e6c256] text-white";
        } else {
            btnText = "Presensi Selesai"; 
            btnSub = "Sampai jumpa besok!"; 
            btnColor = "bg-gray-200 text-gray-400 cursor-not-allowed"; 
            isDisabled = true;
        }
    } else {
        
        if (!userLocation && !isDisabled) {
            isDisabled = true; 
            btnText = "Mencari Lokasi..."; 
            btnColor = "bg-gray-100 text-gray-400 cursor-wait";
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative transition-all hover:shadow-2xl">
                
                
                <div className="bg-[#064d54] p-6 text-white text-center relative">
                    <div className="text-5xl font-black font-mono tracking-tight relative z-10">
                        {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        <span className="text-lg text-teal-300 ml-1 font-sans font-normal">{currentTime.toLocaleTimeString('id-ID', { second: '2-digit' })}</span>
                    </div>
                    <p className="text-teal-100 text-sm mt-2 font-medium relative z-10">
                        {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>

                
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status Hari Ini</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${currentStatus.color} animate-in fade-in`}>
                        {currentStatus.label}
                    </span>
                </div>

                <div className="p-8">
                    
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                                <FiMapPin /> Lokasi Anda
                            </span>
                            {!isLoadingLoc && (
                                <button onClick={getLocation} className="text-xs text-[#0d97a4] font-bold hover:underline flex items-center gap-1">
                                    <FiRefreshCw /> Refresh GPS
                                </button>
                            )}
                        </div>
                        
                        <div className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-colors ${
                            locationError || distanceToOffice > office_config?.allowed_radius_meters 
                            ? 'border-red-100 bg-red-50' 
                            : !userLocation 
                            ? 'border-gray-100 bg-gray-50' 
                            : 'border-green-100 bg-green-50'
                        }`}>
                            <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${
                                !userLocation ? 'bg-gray-200 text-gray-400' 
                                : locationError || distanceToOffice > office_config?.allowed_radius_meters 
                                ? 'bg-red-200 text-red-600 animate-pulse' 
                                : 'bg-green-200 text-green-600'
                            }`}>
                                {locationError ? <FiAlertTriangle /> : <FiMapPin />}
                            </div>
                            
                            <div>
                                {locationError ? (
                                    <p className="text-sm font-bold text-red-600">{locationError}</p>
                                ) : !userLocation ? (
                                    <p className="text-sm font-bold text-gray-500">Mencari lokasi...</p>
                                ) : (
                                    <p className="text-xl font-black text-green-600">
                                        {distanceToOffice} <span className="text-xs text-gray-400 font-bold">Meter dari Kantor</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    
                    <button 
                        onClick={handleSubmit} 
                        disabled={isDisabled || processing} 
                        className={`w-full py-5 rounded-xl shadow-lg transition-all active:scale-[0.98] ${btnColor} ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl text-white'}`}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <FiRefreshCw className="animate-spin" /> Memproses...
                            </span>
                        ) : (
                            <>
                                <span className="text-lg font-bold block">{btnText}</span>
                                {!isDisabled && <span className="text-[10px] uppercase">{btnSub}</span>}
                            </>
                        )}
                    </button>
                </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                <button 
                    onClick={onOpenLeaveModal} 
                    className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 text-sm font-bold hover:border-[#064d54] hover:text-[#064d54] hover:bg-[#064d54]/5 transition-all flex items-center justify-center gap-2 group"
                >
                    <FiFileText className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                    Ajukan Izin / Sakit
                </button>
            </div>
        </div>
    );
}