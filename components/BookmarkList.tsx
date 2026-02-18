"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching:', error.message);
    setBookmarks(data || []);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      toast.error('Removal failed. Verify permissions.');
    } else {
      toast('Bookmark deleted successfully', { icon: '🗑️' });
      setBookmarks((prev) => prev.filter((bm) => bm.id !== id));
    }
  };

  useEffect(() => {
    fetchBookmarks();
    const channel = supabase.channel('realtime-bookmarks').on('postgres_changes', 
      { event: '*', schema: 'public', table: 'bookmarks' }, () => fetchBookmarks()
    ).subscribe();
    
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 px-4">
        <span className="text-[10px] font-black text-amber-900/20 uppercase tracking-[0.3em]">Archived Bookmarks</span>
        <div className="h-px flex-grow bg-amber-800/10"></div>
      </div>

      <div className="grid gap-4 md:gap-5">
        {bookmarks.map((bm) => (
          <div key={bm.id} className="group bg-[#FFFBF2] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-amber-100/30 flex justify-between items-center transition-all hover:shadow-[15px_15px_40px_#ebead6] md:hover:-translate-y-1">
            <div className="flex items-center gap-3 md:gap-5 min-w-0 pr-2">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-[#FDFCF0] rounded-xl flex items-center justify-center text-amber-800 border border-amber-100/50 group-hover:bg-[#3E2723] group-hover:text-[#FDFCF0] transition-colors duration-500">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="truncate">
                <h3 className="font-serif font-bold text-[#3E2723] text-base md:text-lg group-hover:text-amber-700 transition-colors">
                  <a href={bm.url} target="_blank" rel="noopener noreferrer">{bm.title}</a>
                </h3>
                <p className="text-[10px] md:text-[11px] text-amber-900/40 font-mono truncate mt-0.5 md:mt-1 italic tracking-tight">{bm.url}</p>
              </div>
            </div>

            {/* Changed opacity classes: Always visible on mobile (opacity-100), hidden by default on desktop (md:opacity-0) */}
            <button 
              onClick={() => handleDelete(bm.id)}
              className="flex-shrink-0 p-2.5 md:p-3 text-rose-400 md:text-amber-900/20 md:hover:text-rose-600 md:hover:bg-rose-50 rounded-xl transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
              title="Remove Item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="py-20 text-center bg-[#FFFBF2]/50 rounded-[3rem] border-2 border-dashed border-amber-800/10">
          <p className="text-amber-900/30 font-serif italic text-sm">Your vault stands empty. Secure your first discovery above.</p>
        </div>
      )}
    </div>
  );
}