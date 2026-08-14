'use client';
import React from 'react';
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
  Crown
} from 'lucide-react';

export default function LandingPage() {
  const templates = [
    {
      id: 'khmer-luxury-gold',
      name: 'Khmer Traditional Luxury',
      tag: 'ពេញនិយមបំផុត (Popular)',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      demoUrl: '/demo-wedding?to=ឯកឧត្តម_សុខ_សាន្ត'
    },
    {
      id: 'modern-floral',
      name: 'Modern Minimalist Floral',
      tag: 'ទាន់សម័យ (Modern)',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
      demoUrl: '/demo-wedding?to=បងប្រុស_រិទ្ធី_និង_ភរិយា'
    },
    {
      id: 'royal-burgundy',
      name: 'Royal Palace Elegance',
      tag: 'កម្រិត VIP',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
      demoUrl: '/demo-wedding?to=ភ្ញៀវកិត្តិយស'
    }
  ];

  return (
    <div className="min-h-screen bg-[#111315] text-stone-100 selection:bg-amber-500 selection:text-black">
      
      {/* 1. TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111315]/80 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-['Cinzel_Decorative'] text-xl font-bold text-[#C5A059]">
            <span>K & C</span>
            <span className="text-xs tracking-widest text-stone-400 font-sans uppercase">E-Wedding</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-300">
            <a href="#templates" className="hover:text-amber-300 transition">គំរូធៀបការ</a>
            <a href="#features" className="hover:text-amber-300 transition">មុខងារពិសេសៗ</a>
            <Link href="/pricing" className="hover:text-amber-300 transition">កញ្ចប់តម្លៃ</Link>
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
              className="gold-button text-stone-950 px-4 py-2 rounded-full text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition"
            >
              បង្កើតធៀបការ
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A059] bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> គេហទំព័រធៀបការបែបឌីជីថលជំនាន់ថ្មី
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-['Moul'] text-amber-100 leading-snug md:leading-normal">
            ធៀបការបែបឌីជីថល<br />
            <span className="text-[#C5A059]">ថ្លៃថ្នូរ ប្រណិត និងទាន់សម័យ</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-400 max-w-2xl mx-auto leading-relaxed">
            ផ្ញើធៀបការតាមបែប Digital ជាមួយឈ្មោះភ្ញៀវផ្ទាល់ខ្លួនម្នាក់ៗ ទីតាំង Google Maps, KHQR ចំណងដៃ, កាលវិភាគ និងភ្លេងមង្គលការយ៉ាងប្រណិត។
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section id="features" className="py-16 px-4 md:px-8 bg-stone-950/60 border-y border-stone-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-['Moul'] text-xl md:text-2xl text-[#C5A059]">មុខងារដែលធ្វើឱ្យធៀបការអ្នកលេចធ្លោ</h2>
            <p className="text-xs text-stone-400">ផ្ដល់ភាពងាយស្រួល និងបទពិសោធន៍ដ៏ល្អបំផុតដល់ភ្ញៀវកិត្តិយស</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-100">Dynamic Guest Links</h3>
              <p className="text-xs text-stone-400 leading-relaxed">ឈ្មោះភ្ញៀវកិត្តិយសម្នាក់ៗបង្ហាញលើផ្ទាំងធៀបការស្វ័យប្រវត្តពេលបើក Link។</p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-100">KHQR ចំណងដៃឌីជីថល</h3>
              <p className="text-xs text-stone-400 leading-relaxed">ភ្ញៀវអាចស្កេន KHQR (ABA / Bakong) ជូនពរ និងចងដៃបានភ្លាមៗពីគ្រប់ធនាគារ។</p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-100">Responsive គ្រប់ឧបករណ៍</h3>
              <p className="text-xs text-stone-400 leading-relaxed">ដំណើរការយ៉ាងរលូនឥតខ្ចោះលើ iPhone, Android, iPad និង Laptop។</p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-100">Background Music</h3>
              <p className="text-xs text-stone-400 leading-relaxed">ចាក់ភ្លេងមង្គលការ ឬបទរ៉ូមែនទិកស្រទន់ដោយស្វ័យប្រវត្តពេលភ្ញៀវបើកធៀប។</p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-100">RSVP & សៀវភៅជូនពរ</h3>
              <p className="text-xs text-stone-400 leading-relaxed">ដឹងចំនួនភ្ញៀវចូលរួមច្បាស់លាស់ និងទទួលបានសារជូនពរដ៏មានន័យពីភ្ញៀវ។</p>
            </div>

            <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#C5A059]">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-100">Bulk Link Generator</h3>
              <p className="text-xs text-stone-400 leading-relaxed">បង្កើត Link ភ្ញៀវរាប់រយនាក់ក្នុង ១ ចុច និងទាញយកជា Excel បានយ៉ាងលឿន។</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-['Moul'] text-xl md:text-2xl text-amber-100">គំរូធៀបការពេញនិយម (Templates)</h2>
            <p className="text-xs text-stone-400">ជ្រើសរើសស្ទីលដែលស័ក្តិសមបំផុតសម្រាប់ថ្ងៃពិសេសរបស់អ្នក</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <div key={tpl.id} className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition group flex flex-col justify-between">
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md text-[#C5A059] border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {tpl.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-sm text-stone-100">{tpl.name}</h3>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={tpl.demoUrl}
                    target="_blank"
                    className="w-full bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5" /> មើល Demo ផ្ទាល់
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-stone-800 py-10 px-4 text-center text-xs text-stone-500 space-y-3">
        <p className="font-['Cinzel_Decorative'] text-sm text-[#C5A059]">K & C E-Wedding Platform</p>
        <p>© 2026 E-Wedding Platform. All rights reserved.</p>
      </footer>

    </div>
  );
}