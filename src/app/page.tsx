'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Heart, 
  QrCode, 
  Users, 
  Smartphone, 
  Music, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Crown,
  ChevronDown,
  Play,
  Send,
  Calendar,
  Layers
} from 'lucide-react';

export default function LandingPage() {
  const [previewGuest, setPreviewGuest] = useState('ឯកឧត្តម សុខ សាន្ត និង លោកជំទាវ');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const templates = [
    {
      id: 'khmer-luxury-gold',
      name: 'Khmer Luxury Gold',
      subtitle: 'រចនាប័ទ្មខ្មែរប្រពៃណី ស៊ុមពណ៌មាសប្រណិត',
      tag: 'ពេញនិយមបំផុត (Popular)',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      demoUrl: '/kimsun-channet-2026?to=ឯកឧត្តម_សុខ_សាន្ត'
    },
    {
      id: 'modern-floral',
      name: 'Modern Minimalist Floral',
      subtitle: 'រចនាប័ទ្មផ្កាស្រទន់ ទាន់សម័យ និងបែប Classic',
      tag: 'ស្ទីលទាន់សម័យ (Modern)',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
      demoUrl: '/kimsun-channet-2026?to=បងប្រុស_រិទ្ធី_និង_ភរិយា'
    },
    {
      id: 'royal-palace',
      name: 'Royal Palace Elegance',
      subtitle: 'រចនាប័ទ្មវាំង ថ្លៃថ្នូរ និងកម្រិត VIP ខ្ពស់',
      tag: 'VIP Luxury',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
      demoUrl: '/kimsun-channet-2026?to=ភ្ញៀវកិត្តិយស'
    }
  ];

  const faqs = [
    {
      q: 'តើការបង្កើតធៀបការបែបឌីជីថលនេះដំណើរការដូចម្ដេច?',
      a: 'អ្នកគ្រាន់តែចូលទៅកាន់ "បង្កើតធៀបការ" រួចបំពេញឈ្មោះកូនកំលោះ-កូនក្រមុំ ថ្ងៃខែ ទីតាំងកម្មវិធី និងលេខគណនី KHQR។ បន្ទាប់មកប្រព័ន្ធនឹងបង្កើតគេហទំព័រធៀបការ និង Link ឈ្មោះភ្ញៀវម្នាក់ៗស្វ័យប្រវត្តសម្រាប់ផ្ញើតាម Telegram ឬ Facebook។'
    },
    {
      q: 'តើភ្ញៀវអាចស្កេន KHQR ចងដៃបានពីគ្រប់ធនាគារដែរឬទេ?',
      a: 'បាទ/ចាស! ប្រព័ន្ធគាំទ្រស្តង់ដារ KHQR (Bakong) ដែលអនុញ្ញាតឱ្យភ្ញៀវស្កេនពី ABA, Wing, ACLEDA, Canadia និងគ្រប់ App ធនាគារក្នុងប្រទេសកម្ពុជា។'
    },
    {
      q: 'តើខ្ញុំអាចបង្កើត Link ដាក់ឈ្មោះភ្ញៀវច្រើននាក់ក្នុងពេលតែមួយបានទេ?',
      a: 'បានយ៉ាងងាយស្រួល! នៅក្នុងផ្ទាំង Guest Manager អ្នកគ្រាន់តែ Paste បញ្ជីឈ្មោះភ្ញៀវរបស់អ្នកចូល នោះប្រព័ន្ធនឹងបង្កើត Links សម្រាប់ភ្ញៀវរាប់រយនាក់ក្នុង ១ វិនាទី និងអាចទាញយកជា Excel ទុកផ្ទៀងផ្ទាត់បានទៀតផង។'
    },
    {
      q: 'តើធៀបការនេះដំណើរការលើទូរស័ព្ទដៃបានរលូនទេ?',
      a: 'គេហទំព័រទាំងអស់ត្រូវបានរចនាឡើងយ៉ាងពិសេស (Mobile-First) ដើម្បីធានាថាដំណើរការបានលឿន និងស្រស់ស្អាតឥតខ្ចោះលើ iPhone, Android, iPad និងកុំព្យូទ័រ។'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] text-stone-100 selection:bg-amber-500 selection:text-black font-sans">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-stone-950 text-[11px] md:text-xs font-bold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-md">
        <Sparkles className="w-3.5 h-3.5" />
        <span>ប្រូម៉ូសិនពិសេស៖ ចុះឈ្មោះថ្ងៃនេះ ទទួលបានការសាកល្បងបង្កើតធៀបការឥតគិតថ្លៃ!</span>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#0F1115]/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-['Cinzel_Decorative'] text-xl font-bold text-[#C5A059] tracking-wider">K & C</span>
            <span className="text-xs tracking-widest text-stone-400 uppercase font-mono hidden sm:inline">E-Wedding</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-300">
            <a href="#templates" className="hover:text-amber-400 transition">គំរូធៀបការ</a>
            <a href="#features" className="hover:text-amber-400 transition">មុខងារពិសេសៗ</a>
            <a href="#how-it-works" className="hover:text-amber-400 transition">របៀបប្រើប្រាស់</a>
            <Link href="/pricing" className="hover:text-amber-400 transition">កញ្ចប់តម្លៃ</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs text-stone-300 hover:text-white px-3 py-2 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/create"
              className="gold-button text-stone-950 px-5 py-2 rounded-full text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition"
            >
              បង្កើតធៀបការ
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="pt-16 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A059] bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> គេហទំព័រធៀបការបែបឌីជីថលជំនាន់ថ្មី ២០២៦
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Moul'] text-amber-100 leading-snug md:leading-normal">
              ធៀបការឌីជីថល<br />
              <span className="text-[#C5A059]">ប្រណិត ថ្លៃថ្នូរ និងទាន់សម័យ</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-stone-400 max-w-xl leading-relaxed">
              ផ្ញើធៀបការអញ្ជើញភ្ញៀវតាម Telegram ឬ Facebook ជាមួយឈ្មោះភ្ញៀវផ្ទាល់ខ្លួនម្នាក់ៗ, ទីតាំង Google Maps, KHQR ចំណងដៃ, កាលវិភាគ និងភ្លេងមង្គលការយ៉ាងរលូន។
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/dashboard/create"
                className="w-full sm:w-auto gold-button text-stone-950 px-8 py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition"
              >
                <span>ចាប់ផ្តើមបង្កើតធៀបការ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#templates"
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-6 py-3.5 rounded-full text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <Eye className="w-4 h-4 text-amber-400" /> មើលគំរូ Live Demo
              </a>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 text-stone-400">
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-200">100%</p>
                <p className="text-[11px] text-stone-500">គាំទ្រគ្រប់ទូរស័ព្ទ</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-200">KHQR</p>
                <p className="text-[11px] text-stone-500">ចំណងដៃគ្រប់ធនាគារ</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-200">1-Click</p>
                <p className="text-[11px] text-stone-500">ផ្ញើចូល Telegram ភ្លាម</p>
              </div>
            </div>
          </div>

          {/* Right Live Interactive Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] bg-stone-900/90 rounded-[40px] p-4 border-4 border-stone-700 shadow-[0_0_50px_rgba(197,160,89,0.15)] relative">
              <div className="bg-[#181a1f] rounded-[32px] overflow-hidden border border-stone-800 text-center p-6 space-y-4">
                
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#C5A059]">
                  <Heart className="w-6 h-6 animate-pulse" />
                </div>

                <div>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">The Wedding Of</p>
                  <h3 className="font-['Moul'] text-lg text-amber-100 mt-1">គីមស៊ុន & ចាន់ណេត</h3>
                </div>

                <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 space-y-1">
                  <p className="text-[10px] text-stone-400">សូមគោរពអញ្ជើញ</p>
                  <p className="text-xs font-bold text-amber-300 truncate">{previewGuest}</p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={previewGuest}
                    onChange={(e) => setPreviewGuest(e.target.value)}
                    placeholder="សាកវាយឈ្មោះភ្ញៀវនៅទីនេះ..."
                    className="w-full bg-stone-950 border border-stone-700 text-[11px] p-2.5 rounded-xl text-stone-200 focus:outline-none focus:border-amber-400 text-center"
                  />
                  <p className="text-[10px] text-stone-500">👆 សាកល្បងប្តូរឈ្មោះដើម្បីមើលទិដ្ឋភាពជាក់ស្តែង</p>
                </div>

                <Link
                  href={`/kimsun-channet-2026?to=${encodeURIComponent(previewGuest)}`}
                  target="_blank"
                  className="w-full gold-button text-stone-950 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-stone-950" /> បើកមើលធៀបការពេញ
                </Link>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (3 EASY STEPS) */}
      <section id="how-it-works" className="py-16 px-4 md:px-8 bg-stone-950/70 border-y border-stone-800">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> ងាយស្រួល ៣ ជំហាន
            </div>
            <h2 className="font-['Moul'] text-xl md:text-3xl text-amber-100">របៀបបង្កើត និងផ្ញើធៀបការ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3 relative">
              <span className="text-3xl font-black text-amber-500/20 font-mono">01</span>
              <h3 className="font-bold text-sm text-stone-100">ជ្រើសរើស Template & ព័ត៌មាន</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                ជ្រើសរើសស្ទីលធៀបការដែលអ្នកពេញចិត្ត រួចបំពេញឈ្មោះកូនកំលោះ-កូនក្រមុំ កាលបរិច្ឆេទ ទីតាំង និងលេខ KHQR។
              </p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3 relative">
              <span className="text-3xl font-black text-amber-500/20 font-mono">02</span>
              <h3 className="font-bold text-sm text-stone-100">បង្កើត Link ឈ្មោះភ្ញៀវស្វ័យប្រវត្ត</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                គ្រាន់តែ Paste បញ្ជីឈ្មោះភ្ញៀវរបស់អ្នកចូល ប្រព័ន្ធនឹងបង្កើត Links ផ្ទាល់ខ្លួនសម្រាប់ភ្ញៀវម្នាក់ៗភ្លាមៗ។
              </p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3 relative">
              <span className="text-3xl font-black text-amber-500/20 font-mono">03</span>
              <h3 className="font-bold text-sm text-stone-100">ផ្ញើជូនភ្ញៀវ & តាមដាន RSVP</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                ចុចផ្ញើ Link ចូល Telegram ភ្ញៀវដោយផ្ទាល់ និងចូលមើលស្ថិតិអ្នកចូលរួម និងសារជូនពរតាមផ្ទាំង Dashboard។
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-['Moul'] text-xl md:text-3xl text-amber-100">គំរូធៀបការពេញនិយម (Templates)</h2>
            <p className="text-xs md:text-sm text-stone-400">ជ្រើសរើសស្ទីលដែលស័ក្តិសមបំផុតសម្រាប់ថ្ងៃមង្គលការរបស់អ្នក</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((tpl) => (
              <div key={tpl.id} className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition duration-300 flex flex-col justify-between group shadow-xl">
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md text-[#C5A059] border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {tpl.tag}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-base text-stone-100">{tpl.name}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{tpl.subtitle}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={tpl.demoUrl}
                    target="_blank"
                    className="w-full bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200 text-xs font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                  >
                    <Eye className="w-4 h-4" /> មើលគំរូជាក់ស្ដែង (Live Demo)
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-16 px-4 md:px-8 bg-stone-950/60 border-t border-stone-800">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-['Moul'] text-xl md:text-2xl text-[#C5A059]">សំណួរដែលសួរញឹកញាប់ (FAQ)</h2>
            <p className="text-xs text-stone-400">ចម្លើយចំពោះចម្ងល់នានាអំពីការប្រើប្រាស់គេហទំព័រធៀបការ</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 text-xs md:text-sm font-bold text-stone-200 hover:text-amber-300 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-stone-400 leading-relaxed border-t border-stone-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BAR */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 p-8 md:p-12 rounded-[36px] shadow-2xl space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold font-['Moul'] text-amber-100">
            ត្រៀមខ្លួនបង្កើតធៀបការដ៏ប្រណិតហើយឬនៅ?
          </h2>
          <p className="text-xs md:text-sm text-stone-400 max-w-lg mx-auto">
            ចាប់ផ្ដើមបង្កើតគេហទំព័រធៀបការរបស់អ្នកឥឡូវនេះក្នុងរយៈពេលតែ ៥ នាទីប៉ុណ្ណោះ។
          </p>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 gold-button text-stone-950 px-8 py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-95 transition"
          >
            <span>បង្កើតធៀបការឥឡូវនេះ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-stone-800/80 py-10 px-4 text-center text-xs text-stone-500 space-y-3">
        <p className="font-['Cinzel_Decorative'] text-sm text-[#C5A059]">K & C E-Wedding Platform</p>
        <p>© 2026 E-Wedding Platform. All rights reserved.</p>
      </footer>

    </div>
  );
}