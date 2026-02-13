import { Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  Title, Tooltip, Legend, ArcElement, RadialLinearScale, Filler
} from 'chart.js';
import { FiTrendingUp, FiActivity, FiPieChart } from 'react-icons/fi';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  Title, Tooltip, Legend, ArcElement, RadialLinearScale, Filler
);

export default function ChartsSection({ chartTrend, chartStatus, radarData }) {
    
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { 
                mode: 'index', intersect: false, 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                titleColor: '#1f2937', bodyColor: '#1f2937', 
                borderColor: '#e5e7eb', borderWidth: 1, padding: 10,
                titleFont: { weight: 'bold' }
            }
        },
        scales: {
            y: { beginAtZero: true, grid: { borderDash: [2, 4], color: '#f3f4f6' } },
            x: { grid: { display: false } }
        },
        elements: { line: { tension: 0.4 } }
    };

    const lineData = {
        labels: chartTrend.labels,
        datasets: [{
            label: 'Kehadiran',
            data: chartTrend.data,
            borderColor: '#064d54',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(6, 77, 84, 0.2)');
                gradient.addColorStop(1, 'rgba(6, 77, 84, 0)');
                return gradient;
            },
            fill: true,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#064d54',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    const doughnutData = {
        labels: ['Hadir', 'Terlambat', 'Sakit', 'Izin', 'Alpha'],
        datasets: [{
            data: [chartStatus.present, chartStatus.late, chartStatus.sick, chartStatus.permit, chartStatus.alpha],
            backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#6366f1', '#ef4444'],
            borderWidth: 0, hoverOffset: 4
        }]
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: '#f3f4f6' },
                grid: { color: '#f3f4f6' },
                pointLabels: { font: { size: 10, weight: 'bold' }, color: '#6b7280' },
                ticks: { display: false, backdropColor: 'transparent' }
            }
        },
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { size: 10 } } } }
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-h-[350px]">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="p-1.5 bg-teal-50 rounded-lg text-[#064d54]"><FiTrendingUp /></span>
                        Trend Kehadiran
                    </h4>
                </div>
                <div className="h-[300px] w-full">
                    <Line options={lineOptions} data={lineData} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600"><FiPieChart /></span>
                        Status Hari Ini
                    </h4>
                    <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
                        <div className="w-40 h-40 relative z-10">
                            <Doughnut data={doughnutData} options={{ cutout: '75%', plugins: { legend: { display: false } } }} />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-gray-800">{chartStatus.present + chartStatus.late}</span>
                            <span className="text-[9px] uppercase text-gray-400 font-bold tracking-wider">Check-in</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-medium text-gray-500">
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hadir</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Telat</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Sakit</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Izin</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="p-1.5 bg-purple-50 rounded-lg text-purple-600"><FiActivity /></span>
                        Analisis
                    </h4>
                    <p className="text-xs text-gray-400 mb-4">Pola 30 hari terakhir.</p>
                    <div className="h-[200px] flex items-center justify-center">
                        <Radar data={radarData} options={radarOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}