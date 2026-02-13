export default function StatusBadge({ status }) {
    let styles = "";
    let icon = null;
    let label = status;

    switch (status) {
        case 'alpha':
            styles = "bg-red-50 text-red-600 border-red-100";
            label = "ALPHA";
            break;
        case 'late':
            styles = "bg-amber-50 text-amber-700 border-amber-100";
            label = "TERLAMBAT";
            break;
        case 'sick':
            styles = "bg-blue-50 text-blue-600 border-blue-100";
            label = "SAKIT";
            break;
        case 'permit':
            styles = "bg-indigo-50 text-indigo-600 border-indigo-100";
            label = "IZIN";
            break;
        case 'present':
            styles = "bg-emerald-50 text-emerald-600 border-emerald-100";
            label = "HADIR";
            break;
        default:
            styles = "text-gray-400 font-medium";
            label = "Unknown";
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm min-w-[100px] justify-center ${styles}`}>
            {status === 'alpha' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>}
            {label}
        </span>
    );
}