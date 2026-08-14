'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { 
  Plus, 
  Users, 
  Heart, 
  Eye, 
  Share2, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Crown
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [invitations, setInvitations] = useState<any[]>([
    {
      id: '1',
      slug: 'kimsun-channet-2026',
      groom_name: 'គីមស៊ុន',
      bride_name: 'ចាន់ណេត',
      event_date: '2026-11-15',
      plan_type: 'vip',
      is_published: true,
      total_guests: 120,
      attending_count: 85,
      wishes_count: 24,
    }
  ]);

  const [recentWishes, setRecentWishes] = useState<any[]>([
    { sender: 'សុខ ពិសិដ្ឋ', message: 'សូមជូនពរឱ្យស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង! 🎉', time: '10 នាទីមុន' },
    { sender: 'បងស្រី ផល្លា', message: 'Happy Wedding! មានសុភមង្គល និងជោគជ័យគ្រប់ភារកិច្ច ❤️', time: '1 ម៉ោងមុន' },
    { sender: 'មិត្តភក្តិ វិសាល', message: 'អបអរសាទរគូស្នេហ៍គំរូ! ជួបគ្នានៅថ្ងៃកម្មវិធីបាទ', time: '3 ម៉ោងមុន' },
  ]);

  return (
    <div className="min-h-screen bg-[#141518] text-stone-200 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top Welcome Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 p-6 rounded-2xl shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A059] bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Dashboard
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-['Moul'] text-amber-100">
              សួស្តី គូស្នេហ៍សិរីសួស្តី
            </h1>
            <p className="text-xs text-stone-400 mt-1">គ្រប់គ្រងធៀបការ តាមដានភ្ញៀវចូលរួម និងពាក្យជូនពរនៅទីនេះ</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/pricing"
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Crown className="w-4 h-4 text-amber-400" /> Upgrade Plan
            </Link>
            <Link
              href="/dashboard/create"
              className="gold-button text-stone-950 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition"
            >
              <Plus className="w-4 h-4" /> បង្កើតធៀបការថ្មី
            </Link>
          </div>
        </div>

        {/* ស្ថិតិសង្ខេប (Summary Analytics Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400">ភ្ញៀវក្នុងបញ្ជីសរុប</p>
              <p className="text-xl font-bold text-amber-100">120 នាក់</p>
            </div>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400">ភ្ញៀវបញ្ជាក់ថាចូលរួម (RSVP)</p>
              <p className="text-xl font-bold text-emerald-300">85 នាក់</p>
            </div>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400">សារជូនពរទទួលបាន</p>
              <p className="text-xl font-bold text-rose-300">24 សារ</p>
            </div>
          </div>
        </div>

        {/* បញ្ជីធៀបការរបស់អ្នក (My Invitations) */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h2 className="text-base font-bold text-[#C5A059] flex items-center gap-2">
              <Calendar className="w-4 h-4" /> ធៀបការរបស់អ្នក (My Invitations)
            </h2>
          </div>

          <div className="space-y-4">
            {invitations.map((inv) => (
              <div key={inv.id} className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Moul'] text-sm text-amber-100">{inv.groom_name} & {inv.bride_name}</h3>
                    <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      {inv.plan_type}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">កាលបរិច្ឆេទ៖ {inv.event_date} | Link: <span className="font-mono text-amber-400">/{inv.slug}</span></p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                  <Link
                    href={`/dashboard/guests`}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition border border-stone-700"
                  >
                    <Users className="w-3.5 h-3.5 text-amber-400" /> បញ្ជីភ្ញៀវ & Links
                  </Link>

                  <a
                    href={`/${inv.slug}?to=ភ្ញៀវកិត្តិយស`}
                    target="_blank"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow"
                  >
                    <Eye className="w-3.5 h-3.5" /> មើលធៀបការ (Live)
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* សារជូនពរថ្មីៗ (Recent Wishes Feed) */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-3">
            <Heart className="w-4 h-4 text-rose-400" /> ពាក្យជូនពរថ្មីៗ (Recent Wishes)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentWishes.map((w, idx) => (
              <div key={idx} className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-xs text-amber-200">{w.sender}</p>
                    <span className="text-[10px] text-stone-500">{w.time}</span>
                  </div>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">{w.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}