'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  MessageSquareHeart, 
  Share2, 
  QrCode, 
  Download, 
  ExternalLink, 
  PlusCircle, 
  ArrowUpRight,
  Sparkles,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState<any>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [wishes, setWishes] = useState<any[]>([]);

  // ទាញយកទិន្នន័យពី Supabase
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. ទាញយក Wedding Invitation ចុងក្រោយ
      const { data: invData } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (invData) {
        setInvitation(invData);

        // 2. ទាញយក RSVPs
        const { data: rsvpData } = await supabase
          .from('rsvps')
          .select('*')
          .eq('invitation_id', invData.id)
          .order('created_at', { ascending: false });
        if (rsvpData) setRsvps(rsvpData);

        // 3. ទាញយក Wishes
        const { data: wishData } = await supabase
          .from('wishes')
          .select('*')
          .eq('invitation_id', invData.id)
          .order('created_at', { ascending: false });
        if (wishData) setWishes(wishData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // គណនាស្ថិតិ
  const attendingCount = rsvps
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + (r.guest_count || 1), 0);
  const notAttendingCount = rsvps.filter((r) => !r.attending).length;

  // Export RSVP ជា CSV
  const handleExportCSV = () => {
    const headers = ['No', 'Guest Name', 'Status', 'Guest Count', 'Message/Note', 'Date'];
    const rows = rsvps.map((r, idx) => [
      idx + 1,
      `"${r.guest_name}"`,
      r.attending ? 'Attending' : 'Declined',
      r.attending ? r.guest_count || 1 : 0,
      `"${r.note || ''}"`,
      new Date(r.created_at).toLocaleString('km-KH'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_RSVP_List_${invitation?.slug || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-stone-100 font-sans pb-24 selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-[#DFBA73] tracking-wider">K & C</Link>
            <span className="text-xs tracking-widest text-stone-500 uppercase font-mono border-l border-stone-800 pl-3">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <Link
              href="/dashboard/guests"
              className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <Users className="w-4 h-4 text-[#DFBA73]" /> បញ្ជីភ្ញៀវ & Telegram
            </Link>

            <Link
              href="/dashboard/create"
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> បង្កើតធៀបថ្មី
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Wedding Info Banner */}
        {invitation ? (
          <div className="bg-[#181a1f] p-6 md:p-8 rounded-3xl border border-stone-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> ធៀបការសកម្ម (Active Wedding)
              </div>
              <h2 className="text-2xl md:text-3xl font-['Moul'] font-normal text-amber-100">
                {invitation.groom_name} & {invitation.bride_name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-1">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#DFBA73]" /> {invitation.event_date || 'មិនទាន់កំណត់កាលបរិច្ឆេទ'}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#DFBA73]" /> {invitation.location_name || 'ទីតាំងកម្មវិធី'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <a
                href={`/${invitation.slug}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#232730] hover:bg-stone-800 text-stone-200 border border-stone-700 px-5 py-3 rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2 transition"
              >
                <span>មើលធៀបការ Live</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-[#181a1f] p-8 rounded-3xl border border-stone-800 text-center space-y-4">
            <p className="text-stone-400 text-sm">មិនទាន់មានទិន្នន័យធៀបការនៅឡើយទេ</p>
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" /> បង្កើតធៀបការដំបូងរបស់អ្នក
            </Link>
          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#181a1f] p-5 rounded-3xl border border-stone-800 shadow-md">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">អ្នកចូលរួមសរុប (RSVP)</p>
            <p className="text-2xl md:text-3xl font-bold text-emerald-400 font-mono mt-2">{attendingCount} <span className="text-xs font-sans font-normal text-stone-400">នាក់</span></p>
          </div>

          <div className="bg-[#181a1f] p-5 rounded-3xl border border-stone-800 shadow-md">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">មិនអាចចូលរួម</p>
            <p className="text-2xl md:text-3xl font-bold text-rose-400 font-mono mt-2">{notAttendingCount} <span className="text-xs font-sans font-normal text-stone-400">នាក់</span></p>
          </div>

          <div className="bg-[#181a1f] p-5 rounded-3xl border border-stone-800 shadow-md">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">សារជូនពរសរុប</p>
            <p className="text-2xl md:text-3xl font-bold text-amber-300 font-mono mt-2">{wishes.length} <span className="text-xs font-sans font-normal text-stone-400">សារ</span></p>
          </div>

          <div className="bg-[#181a1f] p-5 rounded-3xl border border-stone-800 shadow-md">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">ឆ្លើយតបសរុប</p>
            <p className="text-2xl md:text-3xl font-bold text-sky-400 font-mono mt-2">{rsvps.length} <span className="text-xs font-sans font-normal text-stone-400">លើក</span></p>
          </div>
        </div>

        {/* 2 Columns: RSVP List & Wishes Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: RSVP Table */}
          <div className="lg:col-span-7 bg-[#181a1f] rounded-3xl border border-stone-800 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> បញ្ជីឆ្លើយតបការចូលរួម (RSVP)
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">ភ្ញៀវដែលបានបញ្ជាក់វត្តមានតាមគេហទំព័រ</p>
              </div>

              {rsvps.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> Excel
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-[#0F1115] text-stone-400 text-[11px] uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">ឈ្មោះភ្ញៀវ</th>
                    <th className="p-3.5">ស្ថានភាព</th>
                    <th className="p-3.5">ចំនួននាក់</th>
                    <th className="p-3.5 text-right rounded-r-xl">កាលបរិច្ឆេទ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-sans">
                  {rsvps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-stone-500 text-xs">
                        មិនទាន់មានភ្ញៀវឆ្លើយតប RSVP នៅឡើយទេ
                      </td>
                    </tr>
                  ) : (
                    rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-stone-800/20 transition">
                        <td className="p-3.5 font-semibold text-stone-200">{rsvp.guest_name}</td>
                        <td className="p-3.5">
                          {rsvp.attending ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                              ចូលរួម
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                              មិនចូលរួម
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-stone-300">
                          {rsvp.attending ? `${rsvp.guest_count || 1} នាក់` : '-'}
                        </td>
                        <td className="p-3.5 text-right text-stone-500 text-[11px] font-mono">
                          {new Date(rsvp.created_at).toLocaleDateString('km-KH')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Recent Wishes */}
          <div className="lg:col-span-5 bg-[#181a1f] rounded-3xl border border-stone-800 shadow-xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-amber-400" /> សារជូនពរពីភ្ញៀវ (Live Wishes)
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">សារជូនពរចុងក្រោយបង្អស់ពីភ្ញៀវកិត្តិយស</p>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {wishes.length === 0 ? (
                <div className="p-8 text-center text-stone-500 text-xs">
                  មិនទាន់មានសារជូនពរនៅឡើយទេ
                </div>
              ) : (
                wishes.map((w) => (
                  <div key={w.id} className="bg-[#0F1115] p-4 rounded-2xl border border-stone-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300">{w.guest_name}</span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {new Date(w.created_at).toLocaleDateString('km-KH')}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-light">
                      "{w.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}