'use client';
import React, { useState } from 'react';
import { Copy, UserPlus, Check } from 'lucide-react';

export default function GuestManager() {
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!guestName.trim()) return;
    const formattedName = guestName.trim().replace(/\s+/g, '_');
    const baseUrl = 'https://e-wedding-platform-1god.vercel.app/royal-palace';
    setGeneratedLink(`${baseUrl}?to=${formattedName}`);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 p-6 text-stone-100 flex justify-center items-center">
      <div className="w-full max-w-sm bg-[#1C0507] p-6 rounded-3xl border border-amber-900/50 shadow-2xl">
        <h2 className="text-xl font-['Moul'] text-amber-100 mb-6 text-center">បង្កើត Link ភ្ញៀវ</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            value={guestName} 
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="បញ្ចូលឈ្មោះភ្ញៀវ..."
            className="w-full bg-[#2A080C] border border-amber-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-400"
          />
          <button 
            onClick={generateLink}
            className="w-full bg-[#DFBA73] text-stone-950 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> បង្កើត Link
          </button>
        </div>

        {generatedLink && (
          <div className="mt-6 p-4 bg-[#2A080C] rounded-xl border border-amber-900/40 space-y-3">
            <p className="text-[10px] text-amber-300 break-all">{generatedLink}</p>
            <button 
              onClick={copyToClipboard}
              className="w-full bg-amber-900/40 hover:bg-amber-900/60 text-amber-100 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'បាន Copy រួចហើយ!' : 'Copy Link ផ្ញើឱ្យភ្ញៀវ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}