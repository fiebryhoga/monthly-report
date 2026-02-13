export default function StatusBadge({ status }) {
    let styles = "";
    let icon = "";
    let label = status;

    switch (status) {
        case 'approved':
            styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
            icon = (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            );
            label = "DISETUJUI";
            break;
        case 'rejected':
            styles = "bg-rose-50 text-rose-700 border-rose-200";
            icon = (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            );
            label = "DITOLAK";
            break;
        default: 
            styles = "bg-amber-50 text-amber-700 border-amber-200";
            icon = (
                <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            );
            label = "MENUNGGU";
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${styles}`}>
            {icon} {label}
        </span>
    );
}