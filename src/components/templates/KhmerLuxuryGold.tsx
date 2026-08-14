'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, MapPin, Copy, Send } from 'lucide-react';

export default function KhmerLuxuryGold({ invitation, guestName }: { invitation: any; guestName: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [wishes, setWishes] = useState<any[]>([]);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const target = new Date(invitation.event_date || '2026-11-15T07:00:00').getTime();
    const interval = setInterval(() => {
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [invitation]);

  const handleOpen = () => {
    setStep(2);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(invitation.bank_account_number || '001234567');
    alert('បានចម្លងលេខគណនីរួចរាល់!');
  };

  const handleWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender || !message) return;
    setWishes([{ sender, message }, ...wishes]);
    setSender('');
    setMessage('');
    alert('សូមអរគុណចំពោះពាក្យជូនពរ! ❤️');
  };

  return (
    <div className="w-full max-w-md md:max-w-xl bg-paper min-h-screen md:rounded-3xl relative shadow-2xl border-x md:border border-amber-200/50 overflow-hidden my-auto">
      <audio ref={audioRef} loop src={invitation.music_url || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'} />

      {step === 2 && (
        <button onClick={toggleMusic} className="fixed top-4 right-4 z-50 bg-stone-900/80 text-amber-300 p-2.5 rounded-full border border-amber-500/30 shadow-lg">
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {step === 1 ? (
        <div className="min-h-screen md:min-h-[700px] flex flex-col justify-between items-center p-8 text-center">
          <div className="pt-6">
            <h1 className="font-['Cinzel_Decorative'] text-4xl font-bold text-[#B38728]">K & C</h1>
            <p className="text-xs uppercase tracking-widest text-[#8F6B27] mt-2">Royal Wedding Invitation</p>
          </div>

          <div className="w-full bg-white/95 rounded-2xl p-7 gold-border-card relative shadow-md">
            <div className="corner-decor top-left" /><div className="corner-decor top-right" />
            <div className="corner-decor bottom-left" /><div className="corner-decor bottom-right" />
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">សូមគោរពអញ្ជើញ</p>
            <h2 className="font-['Moul'] text-[#4A3B18] text-base md:text-lg leading-loose">{guestName}</h2>
            <div className="w-12 h-0.5 bg-amber-200 mx-auto my-3" />
            <p className="text-xs text-stone-600 font-light">ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ក្នុងពិធីអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ</p>
          </div>

          <button onClick={handleOpen} className="gold-button text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg active:scale-95 transition">
            បើកមើលធៀបការ
          </button>
        </div>
      ) : (
        <div className="p-6 md:p-8 space-y-6 pb-16">
          <div className="text-center pt-4">
            <h1 className="font-['Moul'] text-base text-[#4A3B18]">សិរីសួស្តី អាពាហ៍ពិពាហ៍</h1>
            <p className="font-['Cormorant_Garamond'] italic text-stone-500 text-sm">Two Hearts Joined as One</p>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 gold-border-card text-center relative">
            <div className="grid grid-cols-2 gap-3 text-left border-b border-amber-200/60 pb-4 mb-4 text-xs">
              <div>
                <p className="font-bold text-[#8F6B27]">មាតាបិតាខាងប្រុស</p>
                <p>{invitation.groom_father}</p>
                <p>{invitation.groom_mother}</p>
              </div>
              <div>
                <p className="font-bold text-[#8F6B27]">មាតាបិតាខាងស្រី</p>
                <p>{invitation.bride_father}</p>
                <p>{invitation.bride_mother}</p>
              </div>
            </div>

            <div className="flex items-center justify-around">
              <div className="flex flex-col items-center">
                <img src={invitation.groom_photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"} className="w-20 h-20 rounded-full border-2 border-[#C5A059] object-cover mb-1" />
                <span className="text-[10px] text-stone-400">{invitation.groom_title}</span>
                <span className="font-['Moul'] text-xs text-[#4A3B18]">{invitation.groom_name}</span>
              </div>
              <span className="font-['MonteCarlo'] text-4xl text-[#B38728]">&</span>
              <div className="flex flex-col items-center">
                <img src={invitation.bride_photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"} className="w-20 h-20 rounded-full border-2 border-[#C5A059] object-cover mb-1" />
                <span className="text-[10px] text-stone-400">{invitation.bride_title}</span>
                <span className="font-['Moul'] text-xs text-[#4A3B18]">{invitation.bride_name}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 gold-border-card text-center">
            <p className="text-xs text-[#8F6B27] font-semibold">{invitation.khmer_date}</p>
            <p className="text-sm font-bold text-stone-800 mt-1">{invitation.event_date}</p>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {Object.entries(timeLeft).map(([k, v]) => (
                <div key={k} className="bg-amber-50 border border-amber-200 rounded-xl p-2">
                  <span className="block font-bold text-base text-[#8F6B27]">{String(v).padStart(2, '0')}</span>
                  <span className="text-[10px] text-stone-500 capitalize">{k}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 gold-border-card text-center space-y-2">
            <h3 className="font-['Moul'] text-xs text-[#8F6B27]">ទីតាំងប្រារព្ធពិធី</h3>
            <p className="text-xs font-bold">{invitation.location_name}</p>
            <p className="text-[11px] text-stone-500">{invitation.location_address}</p>
            <a href={invitation.google_maps_url || "https://maps.google.com"} target="_blank" className="gold-button text-white text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow">
              <MapPin className="w-3.5 h-3.5" /> បើក Google Maps
            </a>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 gold-border-card text-center space-y-2">
            <h3 className="font-['Moul'] text-xs text-[#8F6B27]">អំណោយចំណងដៃ</h3>
            <div className="inline-block p-2 bg-white border-2 border-[#C5A059] rounded-2xl shadow-inner">
              <img src={invitation.bank_qr_url || `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${invitation.bank_account_number}`} className="w-32 h-32 mx-auto" />
            </div>
            <p className="text-xs font-bold">{invitation.bank_name}: {invitation.bank_account_number}</p>
            <p className="text-[11px] text-stone-500">{invitation.bank_account_name}</p>
            <button onClick={handleCopy} className="text-xs text-[#8F6B27] font-semibold underline inline-flex items-center gap-1">
              <Copy className="w-3 h-3" /> ចុចចម្លងលេខកុង (Copy)
            </button>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 gold-border-card space-y-3">
            <h3 className="font-['Moul'] text-xs text-center text-[#8F6B27]">ពាក្យជូនពរជ័យ</h3>
            <form onSubmit={handleWish} className="space-y-2">
              <input value={sender} onChange={e => setSender(e.target.value)} placeholder="ឈ្មោះរបស់អ្នក..." className="w-full text-xs p-2 border border-amber-200 rounded-lg" required />
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="ពាក្យជូនពរ..." className="w-full text-xs p-2 border border-amber-200 rounded-lg" rows={2} required />
              <button type="submit" className="w-full gold-button text-white text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1">
                <Send className="w-3 h-3" /> ផ្ញើសារជូនពរ
              </button>
            </form>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {wishes.map((w, i) => (
                <div key={i} className="bg-amber-50 p-2 rounded-lg text-xs border border-amber-100">
                  <p className="font-bold text-[#8F6B27]">{w['sender']}</p>
                  <p className="text-stone-600">{w['message']}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}