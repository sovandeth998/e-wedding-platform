'use client';
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  QrCode, 
  Music, 
  VolumeX, 
  Send, 
  Clock, 
  Sparkles,
  Flower2,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface ModernFloralProps {
  invitation: any;
  guestName?: string;
}

export default function ModernFloral({ invitation, guestName = 'ភ្ញៀវកិត្តិយស' }: ModernFloralProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // RSVP State
  const [rsvpName, setRsvpName] = useState(guestName !== 'ភ្ញៀវកិត្តិយស' ? guestName : '');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState('1');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wishes State
  const [sender, setSender] = useState(guestName !== 'ភ្ញៀវកិត្តិយស' ? guestName : '');
  const [wishMessage, setWishMessage] = useState('');
  const [wishesList, setWishesList] = useState<any[]>([
    { sender: 'សុខ ពិសិដ្ឋ', message: 'សូមជូនពរឱ្យអ្នកទាំងពីរស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង! 💐' },
    { sender: 'ផល្លា និង ក្រុមគ្រួសារ', message: 'Happy Wedding! មានសុភមង្គល និងជោគជ័យគ្រប់ភារកិច្ច ❤️' }
  ]);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Background Music
    const bgMusic = new Audio(invitation?.music_url || 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-processional-656.mp3');
    bgMusic.loop = true;
    setAudio(bgMusic);

    // Countdown Timer
    const target = new Date(invitation?.event_date || '2026-11-15T17:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      bgMusic.pause();
    };
  }, [invitation]);

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

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audio && !isPlaying) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName) return;
    
    try {
      await supabase.from('rsvps').insert([
        {
          invitation_id: invitation?.id,
          guest_name: rsvpName,
          attending: attending === 'yes',
          guest_count: parseInt(guestCount) || 1,
        }
      ]);
    } catch (err) {}
    
    setRsvpSubmitted(true);
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender || !wishMessage) return;

    const newWish = { sender, message: wishMessage };
    setWishesList([newWish, ...wishesList]);

    try {
      await supabase.from('wishes').insert([
        {
          invitation_id: invitation?.id,
          sender_name: sender,
          message: wishMessage,
        }
      ]);
    } catch (err) {}

    setWishMessage('');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#FBF9F5] text-stone-800 shadow-2xl font-serif relative overflow-hidden border border-stone-200">
      
      {/* Floating Music Button */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 bg-stone-900/80 text-amber-200 p-3 rounded-full shadow-lg backdrop-blur-md border border-stone-700 active:scale-95 transition"
        >
          {isPlaying ? <Music className="w-4 h-4 animate-spin" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
        </button>
      )}

      {/* ========================================================================= */}
      {/* 1. ENVELOPE OPENING COVER OVERLAY */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-[#F4EFEB] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-xs w-full bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6 relative">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
              <Flower2 className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-sans">The Wedding Of</p>
              <h2 className="text-2xl font-bold font-['Moul'] text-stone-800">
                {invitation?.groom_name || 'គីមស៊ុន'} & {invitation?.bride_name || 'ចាន់ណេត'}
              </h2>
            </div>

            <div className="py-3 px-4 bg-[#FBF9F5] rounded-2xl border border-dashed border-stone-300">
              <p className="text-[11px] text-stone-500 font-sans">សូមគោរពអញ្ជើញ</p>
              <p className="text-sm font-bold text-emerald-950 mt-1">{guestName}</p>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="w-full bg-stone-900 hover:bg-stone-800 text-stone-100 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-sans font-semibold shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>បើកមើលធៀបការ</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN INVITATION BODY */}
      {/* ========================================================================= */}
      <div className="space-y-12 pb-20">

        {/* Hero Section */}
        <div className="relative pt-16 pb-12 px-6 text-center space-y-4 bg-gradient-to-b from-[#EFEBE4] to-[#FBF9F5]">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-widest text-emerald-800 uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
            <Flower2 className="w-3 h-3" /> Save The Date
          </span>

          <h1 className="text-3xl font-bold font-['Moul'] text-stone-900 leading-relaxed">
            {invitation?.groom_name || 'គីមស៊ុន'}<br />
            <span className="text-lg font-normal text-emerald-800 font-sans">&</span><br />
            {invitation?.bride_name || 'ចាន់ណេត'}
          </h1>

          <p className="text-xs font-sans text-stone-600 tracking-wide">
            {invitation?.khmer_date || 'ត្រូវនឹងថ្ងៃអាទិត្យ ៥កើត ខែកត្តិក ឆ្នាំរោង ព.ស. ២៥៦៨'}
          </p>

          {/* Couple Cover Photo */}
          <div className="pt-4">
            <div className="w-56 h-72 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={invitation?.cover_image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600'} 
                alt="Couple" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Parents Announcement */}
        <div className="px-8 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-sans text-stone-500 uppercase tracking-widest">យើងខ្ញុំមានកិត្តិយសសូមជម្រាបជូន</p>
            <p className="text-xs text-stone-700 leading-relaxed">
              ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា មេត្តាជ្រាបថា ពិធីអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm text-left">
            <div className="space-y-1">
              <p className="text-[10px] font-sans font-semibold text-emerald-800 uppercase">ខាងកូនប្រុស</p>
              <p className="text-xs font-bold text-stone-900">{invitation?.groom_father || 'លោក ស៊ុន ហេង'}</p>
              <p className="text-xs font-bold text-stone-900">{invitation?.groom_mother || 'លោកស្រី សុខ ផល្លា'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-sans font-semibold text-emerald-800 uppercase">ខាងកូនស្រី</p>
              <p className="text-xs font-bold text-stone-900">{invitation?.bride_father || 'លោក ចាន់ ថុល'}</p>
              <p className="text-xs font-bold text-stone-900">{invitation?.bride_mother || 'លោកស្រី ម៉ៅ សុភី'}</p>
            </div>
          </div>
        </div>

        {/* Live Countdown */}
        <div className="px-8 text-center space-y-4">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-700" /> រាប់ថយក្រោយថ្ងៃមង្គល
          </h3>

          <div className="grid grid-cols-4 gap-2 font-sans">
            {[
              { label: 'ថ្ងៃ', val: timeLeft.days },
              { label: 'ម៉ោង', val: timeLeft.hours },
              { label: 'នាទី', val: timeLeft.minutes },
              { label: 'វិនាទី', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
                <span className="text-lg font-bold text-stone-900 font-mono">{item.val}</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Schedule & Location */}
        <div className="px-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-stone-900">{invitation?.location_name || 'មជ្ឈមណ្ឌលសន្និបាត ឌឹ ព្រេមៀ សែនសុខ (អគារ A)'}</h3>
              <p className="text-xs font-sans text-stone-500 leading-relaxed">{invitation?.location_address || 'ផ្លូវ 1003, សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ, ភ្នំពេញ'}</p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation?.location_name || 'The Premier Center Sen Sok')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold bg-stone-900 text-stone-100 px-5 py-2.5 rounded-xl shadow transition"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" /> បើក Google Maps
            </a>
          </div>
        </div>

        {/* Digital Gift / KHQR */}
        <div className="px-8 space-y-4 text-center">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-50 text-rose-700 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Moul'] text-xs text-stone-800">ចំណងដៃឌីជីថល (Digital Gift)</h3>
              <p className="text-[11px] font-sans text-stone-500 mt-1">ជូនពរ និងចងដៃតាមរយៈ KHQR</p>
            </div>

            <div className="p-3 bg-[#FBF9F5] rounded-2xl border border-stone-200 max-w-[200px] mx-auto">
              <img
                src={invitation?.qr_code_url || 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=WEDDING_GIFT_KHQR'}
                alt="KHQR"
                className="w-36 h-36 mx-auto rounded-lg"
              />
              <p className="text-[10px] font-mono font-bold text-stone-800 mt-2">{invitation?.bank_name || 'ABA Bank'}</p>
              <p className="text-[11px] font-mono text-emerald-800">{invitation?.bank_account_number || '001 234 567'}</p>
            </div>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="px-8 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-stone-900 text-center font-sans">បញ្ជាក់ការចូលរួម (RSVP)</h3>
            
            {rsvpSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> អរគុណសម្រាប់ការបញ្ជាក់ការចូលរួម!
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 font-sans text-xs">
                <div>
                  <label className="block text-stone-500 mb-1">ឈ្មោះភ្ញៀវ</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={e => setRsvpName(e.target.value)}
                    className="w-full bg-[#FBF9F5] border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-stone-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-2 rounded-xl text-xs font-semibold border ${attending === 'yes' ? 'bg-stone-900 text-white border-stone-900' : 'bg-[#FBF9F5] text-stone-700 border-stone-300'}`}
                  >
                    ចូលរួម
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-2 rounded-xl text-xs font-semibold border ${attending === 'no' ? 'bg-stone-900 text-white border-stone-900' : 'bg-[#FBF9F5] text-stone-700 border-stone-300'}`}
                  >
                    មិនអាចចូលរួម
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 rounded-xl font-bold transition active:scale-95"
                >
                  ផ្ញើការបញ្ជាក់
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Wishes Book */}
        <div className="px-8 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-stone-900 text-center font-sans">សៀវភៅជូនពរ (Guest Book)</h3>

            <form onSubmit={handleWishSubmit} className="space-y-3 font-sans text-xs">
              <input
                type="text"
                placeholder="ឈ្មោះរបស់អ្នក"
                value={sender}
                onChange={e => setSender(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-stone-800"
                required
              />
              <textarea
                rows={3}
                placeholder="សរសេរពាក្យជូនពរ..."
                value={wishMessage}
                onChange={e => setWishMessage(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-stone-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" /> ផ្ញើសារជូនពរ
              </button>
            </form>

            <div className="space-y-2 pt-2 max-h-48 overflow-y-auto font-sans">
              {wishesList.map((w, idx) => (
                <div key={idx} className="bg-[#FBF9F5] p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                  <p className="font-bold text-emerald-950">{w.sender}</p>
                  <p className="text-stone-600 leading-relaxed">{w.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs font-sans text-stone-400 pt-6">
          <p>Thank you for being part of our special day</p>
        </div>

      </div>
    </div>
  );
}