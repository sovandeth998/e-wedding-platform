'use client';
import React from 'react';
import Link from 'next/link';
import { Crown, LayoutDashboard } from 'lucide-react';
import { WEDDING_CONFIG } from '@/data/weddingConfig';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070B19] text-stone-100 font-sans flex flex-col items-center justify-center p-6">
      
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E2B764_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="z-10 w-full max-w-md bg-[#0B132B] border border-blue-900/40 rounded-[32px] p-8 shadow-2xl space-y-8 text-center relative overflow-hidden">
        
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#E2B764] shadow-lg">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" alt="Couple" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-2">
           <h1 className="text-xl font-['Moul'] text-amber-100" style={{ lineHeight: '1.8' }}>មង្គលការរបស់</h1>
           <h2 className="text-2xl font-bold text-[#E2B764] tracking-wide">{WEDDING_CONFIG.groomName} & {WEDDING_CONFIG.brideName}</h2>
           <p className="text-sm text-stone-400 font-medium">សូមស្វាគមន៍មកកាន់ប្រព័ន្ធធៀបការឌីជីថល</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-blue-900/50">
          <p className="text-xs text-stone-400 mb-2">សូមជ្រើសរើសជម្រើសខាងក្រោម៖</p>
          
          <Link href="/royal-palace" className="w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-stone-950 py-3.5 rounded-xl text-sm font-bold shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2">
            <Crown className="w-4 h-4" /> មើលទម្រង់ធៀបការគំរូ
          </Link>

          <Link href="/dashboard" className="w-full bg-[#1C2541] border border-[#E2B764]/40 text-amber-200 py-3.5 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-950 transition flex items-center justify-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> ផ្ទាំងគ្រប់គ្រង (Admin Dashboard)
          </Link>
        </div>
      </div>
    </div>
  );
}