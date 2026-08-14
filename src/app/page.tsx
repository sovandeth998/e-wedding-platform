import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121513] text-stone-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold font-['Cinzel_Decorative'] text-[#C5A059] mb-4">E-Wedding SaaS</h1>
      <p className="text-stone-400 max-w-lg mb-8">វេទិកាបង្កើតធៀបការបែបឌីជីថល ថ្លៃថ្នូរ ប្រណិត ជាមួយ QR Code និង Dynamic Guest Link</p>
      <Link href="/demo-wedding?to=ភ្ញៀវកិត្តិយស" className="bg-[#C5A059] text-stone-900 px-6 py-3 rounded-full font-bold hover:bg-[#D4AF37] transition">
        មើលគំរូធៀបការ (Live Demo)
      </Link>
    </main>
  );
}