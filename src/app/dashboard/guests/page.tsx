'use client';
import React, { useState } from 'react';
import { 
  Users, 
  Link as LinkIcon, 
  Copy, 
  Send, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface GuestItem {
  id: string;
  name: string;
  link: string;
  status: 'pending' | 'sent';
}

export default function GuestManagerPage() {
  const [slug, setSlug] = useState('kimsun-channet-2026'); // Slug នៃធៀបការ
  const [bulkInput, setBulkInput] = useState('');
  const [guests, setGuests] = useState<GuestItem[]>([
    { id: '1', name: 'ឯកឧត្តម ជា ស៊ីវុត្ថា និង លោកជំទាវ', link: '', status: 'pending' },
    { id: '2', name: 'លោកជំទាវ ម៉ៅ ស្រីពៅ', link: '', status: 'pending' },
    { id: '3', name: 'បងប្រុស រិទ្ធី និង ភរិយា', link: '', status: 'pending' },
  ]);

  // Generate Links for existing and new guests
  const getFullLink = (guestName: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
    return `${baseUrl}/${slug}?to=${encodeURIComponent(guestName)}`;
  };

  // Handle Bulk Add Guests from Textarea
  const handleBulkAdd = () => {
    if (!bulkInput.trim()) return;
    
    const lines = bulkInput.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const newItems: GuestItem[] = lines.map((name, idx) => ({
      id: Date.now() + '-' + idx,
      name: name,
      link: getFullLink(name),
      status: 'pending'
    }));

    setGuests(prev => [...prev, ...newItems]);
    setBulkInput('');
    alert(`🎉 បានបន្ថែមភ្ញៀវចំនួន ${newItems.length} នាក់ដោយជោគជ័យ!`);
  };

  // Copy Single Guest Link
  const handleCopyLink = (name: string) => {
    const link = getFullLink(name);
    navigator.clipboard.writeText(link).then(() => {
      alert(`បានចម្លង Link សម្រាប់ "${name}" រួចរាល់!`);
    });
  };

  // Send via Telegram
  const handleSendTelegram = (name: string) => {
    const link = getFullLink(name);
    const text = `សូមគោរពអញ្ជើញ ${name} ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ តាមរយៈតំណភ្ជាប់ធៀបការខាងក្រោម៖\n\n${link}`;
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
    window.open(tgUrl, '_blank');
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "ឈ្មោះភ្ញៀវ (Guest Name),តំណភ្ជាប់ធៀបការ (Invitation Link)\n";
    
    guests.forEach(g => {
      csvContent += `"${g.name}","${getFullLink(g.name)}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Wedding_Guest_List_${slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#141518] text-stone-200 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A059] bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-500/20 mb-3">
            <Users className="w-3.5 h-3.5" /> Guest Manager
          </div>
          <h1 className="text-2xl md:text-4xl font-bold font-['Moul'] text-amber-100">
            គ្រប់គ្រង និងបង្កើត Link ជូនភ្ញៀវ
          </h1>
          <p className="text-xs md:text-sm text-stone-400 mt-2">
            បង្កើត Link ឈ្មោះភ្ញៀវម្នាក់ៗស្វ័យប្រវត្តិ ងាយស្រួលផ្ញើតាម Telegram ឬ Facebook
          </p>
        </div>

        {/* Wedding Slug Configuration */}
        <div className="bg-stone-900/90 rounded-2xl p-5 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-stone-400">ធៀបការបច្ចុប្បន្ន: </span>
            <span className="text-amber-300 font-mono font-bold">/{slug}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="text" 
              value={slug} 
              onChange={e => setSlug(e.target.value)} 
              placeholder="កែប្រែ Slug"
              className="bg-stone-950 border border-stone-700 text-xs px-3 py-2 rounded-xl text-stone-200 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Bulk Add Box */}
        <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-[#C5A059] font-bold text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> បញ្ចូលឈ្មោះភ្ញៀវច្រើននាក់ក្នុងពេលតែមួយ (Bulk Add)
            </h3>
            <span className="text-[11px] text-stone-500">១ ជួរ = ភ្ញៀវ ១ នាក់</span>
          </div>

          <textarea
            rows={4}
            value={bulkInput}
            onChange={e => setBulkInput(e.target.value)}
            placeholder="ឧទាហរណ៍៖&#10;ឯកឧត្តម សុខ សាន្ត និង លោកជំទាវ&#10;បងប្រុស ពិសិដ្ឋ&#10;មិត្តភក្តិ រដ្ឋា និង ភរិយា"
            className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs md:text-sm text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-600 font-sans"
          />

          <div className="flex justify-end">
            <button
              onClick={handleBulkAdd}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-4 h-4" /> បង្កើត Links ទាំងអស់
            </button>
          </div>
        </div>

        {/* Guest List Display */}
        <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div>
              <h3 className="text-stone-100 font-bold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" /> បញ្ជីឈ្មោះភ្ញៀវ ({guests.length} នាក់)
              </h3>
            </div>
            {guests.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5" /> ទាញយកជា Excel (CSV)
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {guests.map((guest, idx) => {
              const fullUrl = getFullLink(guest.name);
              return (
                <div key={guest.id} className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-amber-500/30 transition">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500 text-xs font-mono">{idx + 1}.</span>
                      <p className="font-bold text-amber-100 text-xs md:text-sm truncate">{guest.name}</p>
                    </div>
                    <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">{fullUrl}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-stone-800 pt-2 md:pt-0">
                    <button
                      onClick={() => window.open(fullUrl, '_blank')}
                      title="Preview"
                      className="bg-stone-800 hover:bg-stone-700 text-stone-300 p-2 rounded-lg text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyLink(guest.name)}
                      className="bg-stone-800 hover:bg-stone-700 text-amber-300 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition border border-stone-700"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </button>
                    <button
                      onClick={() => handleSendTelegram(guest.name)}
                      className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" /> Telegram
                    </button>
                    <button
                      onClick={() => removeGuest(guest.id)}
                      className="text-stone-600 hover:text-rose-400 p-1.5 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}