export default function InfoItem({ iconPath, label, value, isEmail = false }) {
    return (
        <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#064d54]/5 flex items-center justify-center text-[#064d54] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
                </svg>
            </div>
            <div className="overflow-hidden">
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-0.5">{label}</p>
                <p className={`font-semibold text-gray-800 ${isEmail ? 'break-all text-sm' : ''}`}>
                    {value || '-'}
                </p>
            </div>
        </div>
    );
}