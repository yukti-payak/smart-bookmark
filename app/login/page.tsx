"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function LoginPage() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col items-center justify-between font-sans selection:bg-amber-200 relative overflow-hidden">
      
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-amber-100/40 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-orange-100/30 rounded-full blur-[100px]"></div>

      <div className="flex-grow flex items-center justify-center p-6 w-full z-10">
        <div className="max-w-md w-full relative group">
          
          
          <div className="absolute -top-6 -right-6 w-16 h-16 border-2 border-amber-800/20 rounded-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-700 bg-[#FDFCF0]/50 backdrop-blur-sm z-20">
            <span className="text-[10px] font-black text-amber-900/40 text-center leading-none uppercase tracking-tighter">EST.<br/>2026</span>
          </div>

          <div className="relative bg-[#FFFBF2]/90 backdrop-blur-md border border-white/60 rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(62,39,35,0.15)] p-10 md:p-16 text-center overflow-hidden">
            
            
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-800/10 rounded-tl-[3.5rem]"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-800/10 rounded-br-[3.5rem]"></div>

            
            <div className="mb-10 relative inline-block">
              <div className="absolute inset-0 bg-amber-900/10 rounded-[24px] scale-110 blur-md group-hover:scale-125 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-[#3E2723] rounded-[24px] flex items-center justify-center relative shadow-xl transform group-hover:-rotate-6 transition-all duration-500">
                <span className="text-3xl font-serif font-black text-[#FDFCF0]">M</span>
              </div>
            </div>

            
            <p className="text-[11px] font-bold text-amber-800/40 uppercase tracking-[0.4em] mb-3">{greeting}</p>
            <h1 className="text-4xl font-serif font-bold text-[#2D1B18] tracking-tight mb-2">
              SmartMark
            </h1>
            <p className="text-[#6D4C41] font-medium leading-relaxed mb-12 max-w-[280px] mx-auto text-sm italic opacity-80">
              "A private sanctuary for your digital bookmarks."
            </p>

            
            <button 
              onClick={handleLogin}
              className="w-full group/btn relative flex items-center justify-center gap-4 bg-[#2D1B18] text-[#FDFCF0] font-bold py-5 px-8 rounded-2xl overflow-hidden transition-all active:scale-[0.98] shadow-2xl hover:shadow-amber-900/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/0 via-white/5 to-amber-900/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <div className="bg-white p-1.5 rounded-lg group-hover/btn:scale-110 transition-transform shadow-inner">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
              </div>
              <span className="tracking-wide">Sign in with Google</span>
            </button>

            
            <div className="mt-12 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-amber-800/10"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/30">Verified & Secure</span>
              <span className="h-px w-8 bg-amber-800/10"></span>
            </div>
          </div>
        </div>
      </div>

    
      <footer className="w-full pb-10 pt-4 px-8 text-center z-10">
        <p className="text-[12px] font-medium text-amber-900/40 max-w-sm mx-auto leading-relaxed italic">
          Designed as a permanent record for your online journey. 
          Your collection is encrypted, private, and yours forever.
        </p>
        <div className="mt-4 text-[9px] font-black text-amber-900/20 uppercase tracking-[0.4em]">
          &copy; 2026 SmartMark Vaults
        </div>
      </footer>
    </div>
  );
}