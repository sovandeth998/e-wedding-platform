'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Send, 
  Copy, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles,
  ArrowLeft,
  Search,
  MessageSquare,
  Share2
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface GuestItem {
  id: string;
  name: string;
  table_no?: string;
  sent_status?: boolean;
}

export default function GuestManagerPage() {
  const [slug, setSlug] = useState('kimsun-channet-2026');
  const [bulkInput, setBulkInput] = useState('');
  const [guestList, setGuestList] = useState<GuestItem[]>([
    { id: '1', name: 'ឯកឧត្តម សុខ សាន្ត និង លោកជំទាវ', table_no: 'VIP-01', sent_status: false },
    { id: '2', name: 'លោកជំទាវ ហ៊ុន ម៉ាលីកា', table_no: 'VIP-02', sent_status: false },
    { id: '3', name: 'បងប្រុស រិទ្ធី និង ភរិយា', table_no: 'A-05', sent_status: true },
    { id: '4', name: 'កញ្ញា ធីតា និង មិត្តភក្តិ', table_no: 'B-02', sent_status: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [invitationData, setInvitationData] = useState<any>(null);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }

    async function loadLatestInvitation() {
      try {
        const { data } = await supabase
          .from('invitations')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        if (data) {
          setInvitationData(data);
          if (data.slug) setSlug(data.slug);
        }
      } catch (err) {}
    }
    loadLatestInvitation();
  }, []);

  const handleBulkAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkInput.trim()) return;

    const names = bulkInput
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    const newGuests: GuestItem[] = names.map((name, index) => ({
      id: `${Date.now()}-${index}`,
      name: name,
      table_no: '',
      sent_status: false,
    }));

    setGuestList([...newGuests, ...guestList]);
    setBulkInput('');
  };

  const handleDeleteGuest = (id: string) => {
    setGuestList(guestList.filter((g) => g.id !== id));
  };

  const getGuestUrl = (guestName: string) => {
    const encodedName = encodeURIComponent(guestName.replace(/\s+/g, '_'));
    return `${baseUrl}/${slug}?to=${encodedName}`;
  };

  const getInvitationMessage = (guestName: string) => {
    const link = getGuestUrl(guestName);
    const groom = invitationData?.groom_name || 'គីមស៊ុន';
    const bride = invitationData?.bride_name || 'ចាន់ណេត';
    const date = invitationData?.event_date || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';

    return `សូមគោរពអញ្ជើញ ${guestName} ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ (${groom} & ${bride}) ដែលនឹងប្រព្រឹត្តទៅនៅ ${date}។\n\nសូមចុចលើ Link ខាងក្រោមដើម្បីបើកមើលធៀបការឌីជីថល៖\n👉 ${link}`;
  };

  const handleSendTelegram = (guest: GuestItem) => {
    const message = getInvitationMessage(guest.name);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(getGuestUrl(guest.name))}&text=${encodeURIComponent(message)}`;
    
    setGuestList(
      guestList.map((g) => (g.id === guest.id ? { ...g, sent_status: true } : g))
    );

    window.open(telegramUrl, '_blank');
  };

  const handleCopy = (guestId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(guestId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ['No', 'Guest Name', 'Table No', 'Sent Status', 'Invitation URL'];
    const rows = guestList.map((g, idx) => [
      idx + 1,
      `"${g.name}"`,
      `"${g.table_no || ''}"`,
      g.sent_status ? 'Sent' : 'Pending',
      `"${getGuestUrl(g.name)}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_Guest_List_${slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guestList.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sentCount = guestList.filter((g) => g.sent_status).length;

  return (
    <div className="min-h-screen bg-[#0F1115] text-stone-100 font-sans pb-24 selection:bg-amber-500 selection:text-black">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500/50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base md:text-xl font-bold text-amber-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#DFBA73]" /> បញ្ជីភ្ញៀវ & Telegram Direct Invite
              </h1>
              <p className="text-xs text-stone-400 mt-0.5">គ្រប់គ្រង និងផ្ញើធៀបការចូល Telegram ភ្ញៀវម្នាក់ៗដោយចុចតែ ១ ឃ្លីក</p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="hidden sm:inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition"
          >
            <Download className="w-4 h-4 text-emerald-400" /> Export Excel (CSV)
          </button>
        </div>
      </header>

      {/* Content Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#181a1f] p-6 rounded-3xl border border-stone-800 shadow-lg">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">ចំនួនភ្ញៀវសរុប</p>
            <p className="text-3xl font-bold text-amber-200 font-mono mt-2">{guestList.length} <span className="text-sm font-sans font-normal text-stone-400">នាក់</span></p>
          </div>
          <div className="bg-[#181a1f] p-6 rounded-3xl border border-stone-800 shadow-lg">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">បានផ្ញើធៀបការរួច</p>
            <p className="text-3xl font-bold text-emerald-400 font-mono mt-2">{sentCount} <span className="text-sm font-sans font-normal text-stone-400">នាក់</span></p>
          </div>
          <div className="bg-[#181a1f] p-6 rounded-3xl border border-stone-800 shadow-lg">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">នៅសល់មិនទាន់ផ្ញើ</p>
            <p className="text-3xl font-bold text-amber-500 font-mono mt-2">{guestList.length - sentCount} <span className="text-sm font-sans font-normal text-stone-400">នាក់</span></p>
          </div>
        </div>

        {/* Bulk Add Input Box */}
        <div className="bg-[#181a1f] p-6 md:p-8 rounded-3xl border border-stone-800 shadow-xl space-y-4">
          <div>
            <h2 className="text-sm md:text-base font-bold text-stone-200 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#DFBA73]" /> បន្ថែមបញ្ជីឈ្មោះភ្ញៀវច្រើននាក់ក្នុងពេលតែមួយ (Bulk Paste)
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              ចម្លងឈ្មោះភ្ញៀវពី Excel ឬ Note រួច Paste ចូលប្រអប់ខាងក្រោម (១ ជួរ ឈ្មោះភ្ញៀវ ១ នាក់)
            </p>
          </div>

          <form onSubmit={handleBulkAdd} className="space-y-4">
            <textarea
              rows={4}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="ឧទាហរណ៍៖&#10;ឯកឧត្តម សុខ សាន្ត និង លោកជំទាវ&#10;លោកជំទាវ ហ៊ុន ម៉ាលីកា&#10;បងប្រុស រិទ្ធី និង ភរិយា&#10;កញ្ញា សុគន្ធ ធីតា"
              className="w-full bg-[#0F1115] border border-stone-700 rounded-2xl p-4 text-xs md:text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 px-7 py-3 rounded-2xl text-xs md:text-sm font-bold shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                + បង្កើត Links សម្រាប់ភ្ញៀវទាំងអស់
              </button>
            </div>
          </form>
        </div>

        {/* Guest List Table Container */}
        <div className="bg-[#181a1f] rounded-3xl border border-stone-800 shadow-xl overflow-hidden space-y-4 p-6 md:p-8">
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ស្វែងរកឈ្មោះភ្ញៀវ..."
                className="w-full bg-[#0F1115] border border-stone-700 rounded-2xl pl-11 pr-4 py-2.5 text-xs md:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-xs text-stone-400 self-end sm:self-center">
              បង្ហាញ {filteredGuests.length} ក្នុងចំណោម {guestList.length} នាក់
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#0F1115] text-stone-400 text-[11px] uppercase tracking-wider border-b border-stone-800">
                <tr>
                  <th className="p-4 w-12 text-center rounded-l-xl">#</th>
                  <th className="p-4">ឈ្មោះភ្ញៀវកិត្តិយស</th>
                  <th className="p-4">ស្ថានភាពផ្ញើ</th>
                  <th className="p-4 text-right rounded-r-xl">សកម្មភាព (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-sans">
                {filteredGuests.map((guest, idx) => {
                  const guestUrl = getGuestUrl(guest.name);
                  const guestMsg = getInvitationMessage(guest.name);

                  return (
                    <tr key={guest.id} className="hover:bg-stone-800/20 transition">
                      <td className="p-4 text-center font-mono text-stone-500">{idx + 1}</td>
                      <td className="p-4 font-semibold text-stone-200">
                        {guest.name}
                      </td>
                      <td className="p-4">
                        {guest.sent_status ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                            <Check className="w-3.5 h-3.5" /> បានផ្ញើរួច
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-medium text-stone-400 bg-stone-800/80 px-3 py-1 rounded-full border border-stone-700/50">
                            មិនទាន់ផ្ញើ
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          
                          {/* Send Telegram Button */}
                          <button
                            onClick={() => handleSendTelegram(guest)}
                            className="bg-[#229ED9] hover:bg-[#1E88E5] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition"
                            title="ចុចដើម្បីផ្ញើចូល Telegram ភ្ញៀវភ្លាមៗ"
                          >
                            <Send className="w-3.5 h-3.5" /> ផ្ញើ Telegram
                          </button>

                          {/* Copy Message */}
                          <button
                            onClick={() => handleCopy(guest.id, guestMsg)}
                            className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition border border-stone-700/50"
                            title="ចម្លងសារអញ្ជើញពេញលេញ"
                          >
                            {copiedId === guest.id ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <MessageSquare className="w-4 h-4" />
                            )}
                          </button>

                          {/* Open Invitation */}
                          <a
                            href={guestUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition border border-stone-700/50"
                            title="មើលគំរូធៀបការរបស់ភ្ញៀវនេះ"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteGuest(guest.id)}
                            className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-rose-950 text-stone-400 hover:text-rose-400 transition border border-stone-700/50"
                            title="លុបឈ្មោះចេញ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </main>

    </div>
  );
}