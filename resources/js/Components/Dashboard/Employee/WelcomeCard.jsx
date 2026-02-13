import { FiCalendar } from 'react-icons/fi';

export default function WelcomeCard({ user, currentDate }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 11) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 19) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <div className="bg-gradient-to-r from-[#064d54] to-[#0d97a4] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10">
                <h3 className="text-3xl font-black mb-2 tracking-tight">
                    {getGreeting()}, {user.name.split(' ')[0]}! 👋
                </h3>
                <p className="text-teal-100 text-sm font-medium opacity-90 max-w-lg">
                    Selamat bekerja dan tetap semangat! Jangan lupa jaga kesehatan.
                </p>
                
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/10 shadow-sm hover:bg-white/30 transition-colors cursor-default">
                    <FiCalendar className="w-4 h-4" /> 
                    <span>{currentDate}</span>
                </div>
            </div>
        </div>
    );
}