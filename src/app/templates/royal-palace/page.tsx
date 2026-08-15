'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Crown, 
  Clock, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

export default function RoyalPalacePage() {
  const searchParams = useSearchParams();
  const guestParam = searchParams.get('to');
  const guestName = guestParam ? guestParam.replace(/_/g, ' ') : 'ភ្ញៀវកិត្តិយស';

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wishName, setWishName] = useState(guestName);
  const [wishMessage, setWishMessage] = useState('');
  const [wishSent, setWishSent] = useState(false);

  useEffect(() => {
    const bgAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113884.mp3');
    bgAudio.loop = true;
    setAudio(bgAudio);

    return () => {
      bgAudio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'RSVP',
          guest_name: guestName,
          attending: attending,
          guest_count: guestCount,
        }),
      });
      setRsvpSent(true);
    } catch (err) {
      setRsvpSent(true);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishMessage.trim()) return;
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'WISH',
          guest_name: wishName,
          message: wishMessage,
        }),
      });
      setWishSent(true);
      setWishMessage('');
    } catch (err) {
      setWishSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#2A080C] text-stone-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Floating Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#DFBA73] text-stone-950 shadow-2xl hover:scale-110 active:scale-95 transition flex items-center justify-center border-2 border-amber-200"
      >
        {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
      </button>

      <div className="max-w-lg mx-auto bg-[#1C0507] min-h-screen border-x border-amber-900/50 shadow-2xl relative pb-20">
        
        {/* Top Header */}
        <div className="pt-16 pb-12 text-center px-6 space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#DFBA73]">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-amber-400 font-bold uppercase tracking-[0.25em]">Royal Wedding Invitation</p>
            <h1 
              className="text-3xl sm:text-4xl font-['Moul'] font-normal text-amber-100"
              style={{ lineHeight: '2.2' }}
            >
              សិរីសួស្តី អាពាហ៍ពិពាហ៍
            </h1>
          </div>

          {/* Guest Card */}
          <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-500/30 shadow-lg space-y-1 my-6">
            <p className="text-xs text-amber-300/80">សូមគោរពអញ្ជើញ</p>
            <p className="text-base sm:text-lg font-bold text-amber-100">{guestName}</p>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-2xl sm:text-3xl font-['Moul'] text-[#DFBA73] font-normal" style={{ lineHeight: '2.0' }}>
              គីមស៊ុន & ចាន់ណេត
            </h2>
            <p className="text-xs text-stone-400">
              ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="px-6 py-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-['Moul'] text-lg text-amber-100 font-normal" style={{ lineHeight: '2.0' }}>
              កម្មវិធីសិរីមង្គល
            </h3>
            <p className="text-xs text-stone-400">កាលវិភាគនៃកម្មវិធីមង្គលការ</p>
          </div>

          <div className="space-y-3">
            <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-900/60 flex items-center gap-4">
              <Clock className="w-5 h-5 text-[#DFBA73]" />
              <div>
                <p className="text-xs text-amber-300 font-bold">០៧:០០ ព្រឹក</p>
                <p className="text-xs text-stone-300">ពិធីហែជំនូន និងសែនព្រេនតាមប្រពៃណី</p>
              </div>
            </div>

            <div className="bg-[#2A080C] p-4 rounded-2xl border border-amber-900/60 flex items-center gap-4">
              <Clock className="w-5 h-5 text-[#DFBA73]" />
              <div>
                <p className="text-xs text-amber-300 font-bold">០៥:០០ ល្ងាច</p>
                <p className="text-xs text-stone-300">ពិធីទទួលទានភោជនាហារ និងរាំកម្សាន្ត</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="px-6 py-8 space-y-6 border-t border-amber-900/40">
          <div className="text-center space-y-1">
            <h3 className="font-['Moul'] text-lg text-amber-100 font-normal" style={{ lineHeight: '2.0' }}>
              ទីតាំងប្រារព្ធពិធី
            </h3>
            <p className="text-xs text-stone-400">មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)</p>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#DFBA73] hover:bg-amber-400 text-stone-950 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition"
          >
            <MapPin className="w-4 h-4" /> បើកមើលលើ Google Maps
          </a>
        </div>

        {/* KHQR */}
        <div className="px-6 py-8 space-y-6 border-t border-amber-900/40 text-center">
          <div className="space-y-1">
            <h3 className="font-['Moul'] text-lg text-amber-100 font-normal" style={{ lineHeight: '2.0' }}>
              ចំណងដៃអាពាហ៍ពិពាហ៍ (KHQR)
            </h3>
            <p className="text-xs text-stone-400">ស្កេនពីគ្រប់ App ធនាគារក្នុងប្រទេសកម្ពុជា</p>
          </div>

          <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl border-4 border-[#DFBA73]">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=KHQR_WEDDING_DEMO" 
              alt="KHQR Code" 
              className="w-44 h-44 mx-auto"
            />
            <p className="text-[11px] font-bold text-stone-900 mt-2">KIMSUN & CHANNET</p>
          </div>
        </div>

        {/* RSVP Section */}
        <div className="px-6 py-8 space-y-6 border-t border-amber-900/40">
          <div className="text-center space-y-1">
            <h3 className="font-['Moul'] text-lg text-amber-100 font-normal" style={{ lineHeight: '2.0' }}>
              ឆ្លើយតបការចូលរួម (RSVP)
            </h3>
            <p className="text-xs text-stone-400">សូមបញ្ជាក់វត្តមាន ដើម្បីឱ្យយើងខ្ញុំរៀបចំទទួលបដិសណ្ឋារកិច្ច</p>
          </div>

          {rsvpSent ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-5 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-emerald-300">អរគុណសម្រាប់ការឆ្លើយតប!</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition ${attending ? 'bg-[#DFBA73] text-stone-950 border-[#DFBA73]' : 'bg-[#2A080C] text-stone-400 border-amber-900/60'}`}
                >
                  ចូលរួម
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition ${!attending ? 'bg-rose-900/80 text-white border-rose-600' : 'bg-[#2A080C] text-stone-400 border-amber-900/60'}`}
                >
                  មិនអាចចូលរួម
                </button>
              </div>

              {attending && (
                <div>
                  <label className="text-xs text-stone-400 block mb-1">ចំនួនអ្នកចូលរួម</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#2A080C] border border-amber-900/60 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value={1}>១ នាក់</option>
                    <option value={2}>២ នាក់</option>
                    <option value={3}>៣ នាក់</option>
                    <option value={4}>៤ នាក់ ឬច្រើនជាង</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 py-3 rounded-xl text-xs font-bold shadow-lg transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </div>

        {/* Wishes Section */}
        <div className="px-6 py-8 space-y-6 border-t border-amber-900/40">
          <div className="text-center space-y-1">
            <h3 className="font-['Moul'] text-lg text-amber-100 font-normal" style={{ lineHeight: '2.0' }}>
              ជូនពរដល់គូស្វាមីភរិយាថ្មី
            </h3>
            <p className="text-xs text-stone-400">ផ្ញើសារជូនពរដ៏មានអត្ថន័យ</p>
          </div>

          {wishSent ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl text-center">
              <p className="text-xs text-emerald-300">សារជូនពររបស់អ្នកត្រូវបានផ្ញើជូនម្ចាស់ការរួចរាល់ហើយ!</p>
            </div>
          ) : (
            <form onSubmit={handleWishSubmit} className="space-y-3">
              <textarea
                rows={3}
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="សរសេរសារជូនពរនៅទីនេះ..."
                className="w-full bg-[#2A080C] border border-amber-900/60 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-600"
              />
              <button
                type="submit"
                className="w-full bg-[#2A080C] hover:bg-amber-950 text-amber-300 border border-amber-500/40 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5" /> ផ្ញើសារជូនពរ
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}