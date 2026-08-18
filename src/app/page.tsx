'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#111111] text-stone-200 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Top Banner */}
      <div className="bg-[#D97706] text-white text-xs py-2 text-center flex items-center justify-center gap-2">
         <Sparkles className="w-4 h-4" /> ប្រូម៉ូសិនពិសេស៖ ចុះឈ្មោះថ្ងៃនេះ ទទួលបានការសាកល្បងដោយឥតគិតថ្លៃ!
      </div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-xl font-bold tracking-widest text-amber-500 flex items-center gap-3">
          K & C <span className="text-stone-500 text-sm font-normal">| E-WEDDING</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <Link href="#" className="hover:text-amber-500 transition">គំរូធៀបការ</Link>
          <Link href="#" className="hover:text-amber-500 transition">របៀបប្រើប្រាស់</Link>
          <Link href="#" className="hover:text-amber-500 transition">កញ្ចប់តម្លៃ</Link>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="hidden md:block text-stone-300 hover:text-amber-500 transition">ផ្ទាំងគ្រប់គ្រង</Link>
          <Link href="#" className="bg-[#D97706] hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold transition">
            បង្កើតធៀបការ
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* ផ្នែកខាងឆ្វេង (អត្ថបទ) */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D97706]/30 bg-[#D97706]/10 text-[#D97706] text-xs font-bold">
            <Sparkles className="w-4 h-4" /> គេហទំព័រធៀបការលំដាប់ខ្ពស់ប្រចាំឆ្នាំ ២០២៤
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-['Moul'] text-[#E6E6E6] leading-tight" style={{ lineHeight: '1.4' }}>
              ធៀបការឌីជីថល
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-[#D97706]">
              ប្រណិត ថ្លៃថ្នូរ និងទាន់សម័យ
            </h2>
            <p className="text-stone-400 leading-relaxed max-w-lg text-sm md:text-base pt-2">
              ធ្វើធៀបការអញ្ជើញភ្ញៀវតាម Telegram ឬ Facebook ជាមួយឈ្មោះភ្ញៀវផ្ទាល់ខ្លួនម្នាក់ៗ, ទីតាំង Google Maps, KHQR ចំណងដៃ, កាលវិភាគ និងភ្លេងមង្គលការយ៉ាងពិរោះ។
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="#" className="bg-[#D97706] hover:bg-amber-600 text-white px-8 py-3.5 rounded-full font-bold transition flex items-center gap-2 text-sm shadow-lg shadow-[#D97706]/20">
              ចាប់ផ្ដើមបង្កើតធៀបការ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/royal-palace" className="border border-stone-700 hover:border-[#D97706] hover:text-[#D97706] text-stone-300 px-8 py-3.5 rounded-full font-bold transition flex items-center gap-2 text-sm bg-stone-900/50">
              <Play className="w-4 h-4" /> មើលគំរូ Live Demo
            </Link>
          </div>

          {/* ចំណុចពិសេស (Features) */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-stone-800/80">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#D97706] mb-1">100%</h3>
              <p className="text-xs text-stone-500">សុវត្ថិភាពទិន្នន័យ</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#D97706] mb-1">KHQR</h3>
              <p className="text-xs text-stone-500">ចំណងដៃគ្រប់ធនាគារ</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#D97706] mb-1">1-Click</h3>
              <p className="text-xs text-stone-500">ផ្ញើចូល Telegram ភ្លាម</p>
            </div>
          </div>
        </div>

        {/* ផ្នែកខាងស្ដាំ (Card Mockup ទូរស័ព្ទ) */}
        <div className="relative flex justify-center items-center mt-10 md:mt-0">
           {/* ពន្លឺស្រមោលពីក្រោយ (Background Glow) */}
           <div className="absolute inset-0 bg-[#D97706] opacity-10 blur-[100px] rounded-full"></div>
           
           {/* ស៊ុមទូរស័ព្ទ (Phone Mockup) */}
           <div className="relative w-full max-w-[340px] bg-[#1A1A1A] border-[4px] border-stone-800 rounded-[40px] p-2 shadow-2xl z-10">
             <div className="border border-stone-700/50 rounded-[32px] p-6 h-full flex flex-col items-center text-center space-y-6 bg-gradient-to-b from-[#1E1E1E] to-[#111111]">
               
               <div className="w-14 h-14 rounded-full border border-[#D97706]/40 flex items-center justify-center text-[#D97706] bg-[#D97706]/5 mt-4 shadow-inner">
                 <Heart className="w-6 h-6" />
               </div>

               <div className="space-y-1">
                 <p className="text-[10px] text-[#D97706] font-bold tracking-[0.2em] uppercase">The Wedding Of</p>
                 <h3 className="text-xl font-bold text-stone-100 font-['Moul']" style={{ lineHeight: '1.8' }}>គីមស៊ុន & ចាន់ណែត</h3>
               </div>

               <div className="w-full space-y-3 mt-4">
                 <div className="bg-[#111111] border border-[#D97706]/30 rounded-xl p-4 text-center relative">
                   <p className="text-[10px] text-stone-400 mb-2">សូមគោរពអញ្ជើញ</p>
                   <p className="text-[#D97706] font-bold text-sm">ឯកឧត្តម សុខ សាន្ត និង លោកជំទាវ...</p>
                 </div>
                 
                 <div className="bg-[#111111] border border-stone-800 rounded-xl p-3 text-center opacity-60">
                   <p className="text-xs text-stone-500">ឯកឧត្តម សុខ សាន្ត និង លោកជំទាវ</p>
                 </div>
                 
                 <p className="text-[10px] text-stone-500 flex justify-center items-center gap-1.5 pt-2">
                    👆 សាកល្បងវាយឈ្មោះដើម្បីមើលលទ្ធផលជាក់ស្ដែង
                 </p>
               </div>

               <Link href="/royal-palace" className="w-full bg-[#D97706] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2 hover:brightness-110 transition shadow-lg shadow-[#D97706]/20">
                 <Play className="w-4 h-4 fill-current" /> បើកមើលធៀបការពេញ
               </Link>
             </div>
           </div>
        </div>

      </main>
    </div>
  );
}