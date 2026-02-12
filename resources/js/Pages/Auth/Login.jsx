import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const [showSupport, setShowSupport] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nip: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex w-full font-sans bg-white overflow-hidden">
            <Head title="Sign In - Sawit & Co" />

            
            <div className="hidden lg:flex w-1/2 bg-[#064d54] relative flex-col justify-between p-16 text-white overflow-hidden">
                
                
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1596525983309-84d799042c16?q=80&w=2000&auto=format&fit=crop" 
                        alt="Background Texture" 
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#064d54] via-[#064d54]/90 to-[#1e868f]/80"></div>
                </div>

                
                <div className="relative z-10">
                    <img 
                        src="/assets/images/sco-logo-login.png" 
                        alt="Sawit & Co Logo" 
                        className="h-16 w-auto mb-6 drop-shadow-lg"
                    />
                    <div className="h-1 w-20 bg-[#0d97a4] rounded-full mb-6"></div>
                </div>

                
                <div className="relative z-20 mb-10">
                    <h1 className="text-5xl font-extrabold leading-tight mb-4 text-[#e8dfc8]">
                        Sustainable Growth, <br/> 
                        <span className="italic text-[#d4af37]">Better Future.</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-md font-light">
                        Integrated Employee Attendance & Management System.
                    </p>
                </div>

                
                <div className="relative z-10">
                    <p className="text-white/40 text-xs tracking-wider">
                        &copy; 2026 Sawit & Co. Enterprise
                    </p>
                </div>

                
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0d97a4] rounded-full opacity-10 blur-3xl z-0"></div>
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[#1e868f] rounded-full opacity-10 blur-3xl z-0"></div>
            </div>

            
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative">
                
                
                {showSupport && (
                    <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
                        <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-gray-100 ring-1 ring-gray-100 transform transition-all scale-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-[#0d97a4]/10 rounded-full text-[#0d97a4]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <button onClick={() => setShowSupport(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            
                            <h3 className="text-xl font-bold text-[#064d54] mb-2">IT Support Center</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Please contact the IT department to reset your password or report technical issues.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <svg className="w-5 h-5 text-[#0d97a4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase">Helpdesk Hotline</p>
                                        <p className="text-sm font-medium text-gray-700">Ext. 1092 (IT Division)</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <svg className="w-5 h-5 text-[#0d97a4] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase">Email Support</p>
                                        <a href="mailto:support@sawit.co.id" className="text-sm font-medium text-[#0d97a4] hover:underline">support@sawit.co.id</a>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setShowSupport(false)}
                                className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full max-w-sm">
                    
                    <div className="lg:hidden flex justify-center mb-8">
                         <img 
                            src="/assets/images/sco-logo.png" 
                            alt="Sawit & Co Logo" 
                            className="h-12 w-auto"
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-[#064d54] mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-gray-500 text-sm">Sign in to access your dashboard.</p>
                    </div>

                    {status && (
                        <div className="mb-6 font-medium text-sm text-[#0d97a4] bg-[#0d97a4]/10 p-4 rounded-lg border border-[#0d97a4]/20 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-semibold text-[#064d54] mb-1.5 ml-1">
                                Employee ID (NIP)
                            </label>
                            <input
                                id="nip"
                                type="text"
                                name="nip"
                                value={data.nip}
                                className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 border focus:bg-white transition-all duration-200 outline-none ${
                                    errors.nip 
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                                    : 'border-gray-200 focus:border-[#0d97a4] focus:ring-4 focus:ring-[#0d97a4]/10'
                                }`}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('nip', e.target.value)}
                                placeholder="Enter your Employee ID"
                            />
                            {errors.nip && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.nip}</p>}
                        </div>

                        
                        <div>
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="text-sm font-semibold text-[#064d54]">Password</label>
                                <button 
                                    type="button" 
                                    onClick={() => setShowSupport(true)}
                                    className="text-xs font-semibold text-[#1e868f] hover:text-[#0d97a4] transition-colors focus:outline-none"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 border focus:bg-white transition-all duration-200 outline-none ${
                                    errors.password 
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                                    : 'border-gray-200 focus:border-[#0d97a4] focus:ring-4 focus:ring-[#0d97a4]/10'
                                }`}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
                        </div>

                        
                        <div className="block mt-4">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-[#0d97a4] shadow-sm focus:ring-[#0d97a4]"
                                />
                                <span className="ml-2 text-sm text-gray-500 font-medium">Remember me on this device</span>
                            </label>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#0d97a4] hover:bg-[#064d54] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#0d97a4]/30 focus:outline-none focus:ring-4 focus:ring-[#0d97a4]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] mt-6 flex justify-center items-center"
                        >
                             {processing ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                         <p className="text-xs text-gray-400">
                            Trouble accessing your account?{" "}
                            <button 
                                type="button"
                                onClick={() => setShowSupport(true)}
                                className="text-[#0d97a4] cursor-pointer hover:underline font-semibold focus:outline-none"
                            >
                                Contact IT Support
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}