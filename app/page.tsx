"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import AddBookmarkForm from '@/components/AddBookmarkForm';
import BookmarkList from '@/components/BookmarkList';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push('/login'); 
      else setUser(data.user);
    };
    checkUser();
  }, [router]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF0] text-amber-900/40 font-serif italic">
      Unlocking Vault...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      
      <nav className="border-b border-amber-800/10 bg-[#FFFBF2]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3E2723] rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
              <span className="text-[#FDFCF0] font-serif font-black text-xl">M</span>
            </div>
            <span className="font-serif font-bold text-[#2D1B18] text-xl tracking-tight">SmartMark</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-amber-900/40 uppercase tracking-widest hidden md:block">
              {user.email}
            </span>
          
            <button 
  onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
  className="px-5 py-2 bg-[#3E2723] hover:bg-[#5D4037] text-[#FDFCF0] text-[11px] font-bold uppercase tracking-widest rounded-lg shadow-sm transition-all duration-200 active:scale-95 border border-amber-900/20"
>
  Logout
</button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-3xl mx-auto p-8 md:p-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-[#2D1B18] tracking-tight">Your Library</h1>
          <p className="text-amber-900/50 mt-2 italic">A curated collection of your digital discoveries.</p>
        </header>

        <section className="space-y-12">
          <AddBookmarkForm userId={user.id} />
          <div className="pt-4">
            <BookmarkList userId={user.id} />
          </div>
        </section>
      </main>
    </div>
  );
}