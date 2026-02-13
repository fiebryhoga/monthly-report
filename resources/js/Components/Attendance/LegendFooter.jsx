export default function LegendFooter() {
    return (
        <div className="mt-6 pt-4 border-t border-gray-50 flex flex-wrap justify-end gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Hadir</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> Terlambat</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Izin</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Sakit</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Alpha</span>
        </div>
    );
}