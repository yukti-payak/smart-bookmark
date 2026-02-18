"use client";
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export default function AddBookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    
    setIsSubmitting(true);
    const { error } = await supabase.from('bookmarks').insert([{ title, url, user_id: userId }]);
    
    if (error) {
      toast.error('Could not secure entry to vault.');
    } else {
      toast.success('Book Mark Added successfully');
      setTitle(''); 
      setUrl('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#FFFBF2] rounded-[2.5rem] shadow-[20px_20px_60px_#ebead6,-20px_-20px_60px_#ffffff] border border-amber-100/40 p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-amber-900/40 uppercase tracking-[0.2em] ml-2">Entry Title</label>
            <input
              type="text" placeholder="e.g. Research Article" value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-[#FDFCF0] border border-amber-100/50 rounded-2xl focus:ring-4 focus:ring-amber-900/5 focus:border-amber-800 outline-none transition-all text-[#3E2723] font-serif"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-amber-900/40 uppercase tracking-[0.2em] ml-2">Source URL</label>
            <input
              type="url" placeholder="https://..." value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 bg-[#FDFCF0] border border-amber-100/50 rounded-2xl focus:ring-4 focus:ring-amber-900/5 focus:border-amber-800 outline-none transition-all font-mono text-xs text-amber-800"
              required
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#3E2723] hover:bg-[#4E342E] disabled:bg-[#3E2723]/70 text-[#FDFCF0] font-bold py-5 rounded-2xl transition-all shadow-xl shadow-amber-900/20 active:scale-[0.98]"
        >
          {isSubmitting ? 'Securing...' : 'Add a Bookmark'}
        </button>
      </form>
    </div>
  );
}