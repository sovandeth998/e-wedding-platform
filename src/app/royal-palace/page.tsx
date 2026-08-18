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
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wishMessage, setWishMessage] = useState('');
  const [wishSent, setWishSent] = useState(false);

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

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'RSVP', guest_name: guestName, attending, guest_count: guestCount }),
      });
      setRsvpSent(true);
    } catch (err) { setRsvpSent(true); }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishMessage.trim()) return;
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'WISH', guest_name: guestName, message: wishMessage }),
      });
      setWishSent(true);
      setWishMessage('');
    } catch (err) { setWishSent(true); }
  };

  return (
    <div className="min-h-screen bg-[#140406] text-stone-100 font-sans selection:bg-amber-500 selection:text-black flex justify-center">
      
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
            <button onClick={handleOpenInvitation} className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 py-4 rounded-2xl text-sm font-bold shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition tracking-wide">
              <MailOpen className="w-5 h-5 fill-stone-950" /> បើកមើលធៀបការ
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#DFBA73] text-stone-950 shadow-2xl hover:scale-110 active:scale-95 transition flex items-center justify-center border-2 border-amber-200">
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {isOpen && (
        <div className="w-full max-w-md bg-[#1C0507] min-h-screen border-x border-amber-900/40 shadow-2xl relative pb-24">
          
          <div className="pt-16 pb-10 text-center px-6 space-y-4 relative">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#DFBA73]">
              <Crown className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.25em]">Royal Wedding</p>
              <h1 className="text-2xl font-['Moul'] text-amber-100" style={{ lineHeight: '2.2' }}>សិរីសួស្តី អាពាហ៍ពិពាហ៍</h1>
            </div>
            <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-500/30 shadow-lg space-y-1 my-4">
              <p className="text-[11px] text-amber-300/80">សូមគោរពអញ្ជើញ</p>
              <p className="text-base font-bold text-amber-100 font-['Moul']" style={{ lineHeight: '1.8' }}>{guestName}</p>
            </div>
            <div className="space-y-2 pt-2">
              <h2 className="text-2xl font-['Moul'] text-[#DFBA73] font-normal" style={{ lineHeight: '2.0' }}>គីមស៊ុន & ចាន់ណេត</h2>
              <p className="text-xs text-stone-400">ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4 border-t border-amber-900/30">
            <div className="text-center space-y-1">
              <h3 className="font-['Moul'] text-base text-amber-100" style={{ lineHeight: '1.8' }}>កម្មវិធីសិរីមង្គល</h3>
              <p className="text-xs text-stone-400">កាលវិភាគនៃកម្មវិធីមង្គលការ</p>
            </div>
            <div className="space-y-3">
              <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-900/60 flex items-center gap-4">
                <Clock className="w-5 h-5 text-[#DFBA73]" />
                <div className="text-left">
                  <p className="text-xs text-amber-300 font-bold">០៧:០០ ព្រឹក</p>
                  <p className="text-xs text-stone-300">ពិធីហែជំនូន និងសែនព្រេន</p>
                </div>
              </div>
              <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-900/60 flex items-center gap-4">
                <Clock className="w-5 h-5 text-[#DFBA73]" />
                <div className="text-left">
                  <p className="text-xs text-amber-300 font-bold">០៥:០០ ល្ងាច</p>
                  <p className="text-xs text-stone-300">ទទួលទានភោជនាហារ និងរាំកម្សាន្ត</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4 border-t border-amber-900/30">
            <div className="text-center space-y-1">
              <h3 className="font-['Moul'] text-base text-amber-100" style={{ lineHeight: '1.8' }}>ទីតាំងប្រារព្ធពិធី</h3>
              <p className="text-xs text-stone-400">ឌឹ ព្រេមៀ សែនសុខ (អគារ A)</p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-full bg-[#DFBA73] text-stone-950 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition">
              <MapPin className="w-4 h-4" /> បើកមើលលើ Google Maps
            </a>
          </div>

          <div className="px-6 py-6 space-y-4 border-t border-amber-900/30 text-center">
            <div className="space-y-1">
              <h3 className="font-['Moul'] text-base text-amber-100" style={{ lineHeight: '1.8' }}>ចំណងដៃអាពាហ៍ពិពាហ៍</h3>
              <p className="text-xs text-stone-400">ស្កេនពីគ្រប់ App ធនាគារ</p>
            </div>
            <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl border-4 border-[#DFBA73]">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WEDDING_KHQR" alt="KHQR Code" className="w-32 h-32 mx-auto"/>
              <p className="text-[10px] font-bold text-stone-900 mt-2">KIMSUN & CHANNET</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4 border-t border-amber-900/30">
            <div className="text-center space-y-1">
              <h3 className="font-['Moul'] text-base text-amber-100" style={{ lineHeight: '1.8' }}>ឆ្លើយតបការចូលរួម</h3>
            </div>
            {rsvpSent ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-emerald-300">អរគុណសម្រាប់ការឆ្លើយតប!</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setAttending(true)} className={`py-2.5 rounded-xl text-xs font-bold border transition ${attending ? 'bg-[#DFBA73] text-stone-950 border-[#DFBA73]' : 'bg-[#2A080C] text-stone-400 border-amber-900/60'}`}>ចូលរួម</button>
                  <button type="button" onClick={() => setAttending(false)} className={`py-2.5 rounded-xl text-xs font-bold border transition ${!attending ? 'bg-rose-900/80 text-white border-rose-600' : 'bg-[#2A080C] text-stone-400 border-amber-900/60'}`}>មិនអាចចូលរួម</button>
                </div>
                {attending && (
                  <select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full bg-[#2A080C] border border-amber-900/60 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400">
                    <option value={1}>ចូលរួម ១ នាក់</option>
                    <option value={2}>ចូលរួម ២ នាក់</option>
                    <option value={3}>ចូលរួម ៣ នាក់</option>
                    <option value={4}>៤ នាក់ ឬច្រើនជាង</option>
                  </select>
                )}
                <button type="submit" className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 py-3 rounded-xl text-xs font-bold shadow-lg transition">បញ្ជាក់ការចូលរួម</button>
              </form>
            )}
          </div>

          <div className="px-6 py-6 space-y-4 border-t border-amber-900/30">
            <div className="text-center space-y-1">
              <h3 className="font-['Moul'] text-base text-amber-100" style={{ lineHeight: '1.8' }}>ជូនពរគូស្វាមីភរិយាថ្មី</h3>
            </div>
            {wishSent ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl text-center">
                <p className="text-xs text-emerald-300">សារជូនពររបស់អ្នកត្រូវបានផ្ញើរួចរាល់!</p>
              </div>
            ) : (
              <form onSubmit={handleWishSubmit} className="space-y-3">
                <textarea rows={3} value={wishMessage} onChange={(e) => setWishMessage(e.target.value)} placeholder="សរសេរសារជូនពរនៅទីនេះ..." className="w-full bg-[#2A080C] border border-amber-900/60 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-600" />
                <button type="submit" className="w-full bg-[#2A080C] hover:bg-amber-950 text-amber-300 border border-amber-500/40 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition">
                  <Send className="w-3.5 h-3.5" /> ផ្ញើសារជូនពរ
                </button>
              </form>
            )}
          </div>
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