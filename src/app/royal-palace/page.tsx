'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Crown, Clock, MapPin, Volume2, VolumeX, Send, CheckCircle2, MailOpen } from 'lucide-react';

function RoyalPalaceContent() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState('ភ្ញៀវកិត្តិយស');
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const rawTo = searchParams.get('to');
    if (rawTo) {
      try {
        setGuestName(decodeURIComponent(rawTo).replace(/_/g, ' '));
      } catch (e) {
        setGuestName(rawTo.replace(/_/g, ' '));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const bgAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113884.mp3');
    bgAudio.loop = true;
    setAudio(bgAudio);
    return () => { bgAudio.pause(); };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => {}); setIsPlaying(true); }
  };

  return (
    <div className="min-h-screen bg-[#140406] text-stone-100 font-sans flex justify-center">
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gradient-to-b from-[#2A080C] to-[#1A0407] border-2 border-[#DFBA73]/50 rounded-[36px] p-8 text-center shadow-[0_0_50px_rgba(223,186,115,0.25)] space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-[#DFBA73]/40 flex items-center justify-center text-[#DFBA73]">
              <Crown className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-[#DFBA73] font-bold tracking-[0.25em] uppercase">Royal Wedding</p>
              <h2 className="text-xl font-['Moul'] text-amber-100" style={{ lineHeight: '2.0' }}>សិរីសួស្តី អាពាហ៍ពិពាហ៍</h2>
            </div>
            <div className="bg-stone-950/80 p-5 rounded-2xl border border-amber-500/30 shadow-inner space-y-1.5">
              <p className="text-xs text-[#DFBA73]/80 font-medium">សូមគោរពអញ្ជើញ</p>
              <p className="text-lg font-bold text-amber-100 tracking-wide font-['Moul']" style={{ lineHeight: '1.8' }}>
                {guestName}
              </p>
              <p className="text-[11px] text-stone-400 pt-1">ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស</p>
            </div>
            <button onClick={handleOpenInvitation} className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 py-4 rounded-2xl text-sm font-bold shadow-xl flex items-center justify-center gap-2 transition">
              <MailOpen className="w-5 h-5" /> បើកមើលធៀបការ
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="w-full max-w-md bg-[#1C0507] min-h-screen border-x border-amber-900/40 pb-24 px-6 pt-16 text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#DFBA73]"><Crown className="w-7 h-7" /></div>
          <h1 className="text-2xl font-['Moul'] text-amber-100" style={{ lineHeight: '2.2' }}>សិរីសួស្តី អាពាហ៍ពិពាហ៍</h1>
          <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-500/30">
            <p className="text-[11px] text-amber-300/80">សូមគោរពអញ្ជើញ</p>
            <p className="text-lg font-bold text-amber-100 font-['Moul'] mt-2" style={{ lineHeight: '1.8' }}>{guestName}</p>
          </div>
          <p className="text-sm text-[#DFBA73]">សូមស្វាគមន៍មកកាន់កម្មវិធីរបស់យើងខ្ញុំ!</p>
          
          <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#DFBA73] text-stone-950 shadow-2xl flex items-center justify-center border-2 border-amber-200">
            {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function RoyalPalacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#140406] flex items-center justify-center text-amber-200">កំពុងដំណើរការ...</div>}>
      <RoyalPalaceContent />
    </Suspense>
  );
}