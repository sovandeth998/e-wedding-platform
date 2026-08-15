{/* 3. HERO SECTION (REFINED FONTS & SPACING) */}
      <section className="pt-16 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium text-[#C5A059] bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> គេហទំព័រធៀបការបែបឌីជីថលជំនាន់ថ្មី ២០២៦
            </div>

            {/* Main Heading: ប្រើ font-normal លើ Font Moul និងសម្រួល Line Height */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-['Moul'] font-normal text-amber-100 leading-[1.8] sm:leading-[1.7] lg:leading-[1.7] tracking-wide">
              ធៀបការឌីជីថល<br />
              <span className="text-[#C5A059]">ប្រណិត ថ្លៃថ្នូរ និងទាន់សម័យ</span>
            </h1>

            {/* Description: ប្រើ Font Kantumruy Pro ទន់ស្រាល */}
            <p className="text-xs sm:text-sm md:text-base text-stone-400 max-w-xl leading-relaxed font-light">
              ផ្ញើធៀបការអញ្ជើញភ្ញៀវតាម Telegram ឬ Facebook ជាមួយឈ្មោះភ្ញៀវផ្ទាល់ខ្លួនម្នាក់ៗ, ទីតាំង Google Maps, KHQR ចំណងដៃ, កាលវិភាគ និងភ្លេងមង្គលការយ៉ាងរលូន។
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/dashboard/create"
                className="w-full sm:w-auto gold-button text-stone-950 px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition"
              >
                <span>ចាប់ផ្តើមបង្កើតធៀបការ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#templates"
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-6 py-3.5 rounded-full text-xs md:text-sm font-normal flex items-center justify-center gap-2 transition"
              >
                <Eye className="w-4 h-4 text-amber-400" /> មើលគំរូ Live Demo
              </a>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 text-stone-400">
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-200 font-mono">100%</p>
                <p className="text-[11px] text-stone-400 mt-0.5">គាំទ្រគ្រប់ទូរស័ព្ទ</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-200 font-mono">KHQR</p>
                <p className="text-[11px] text-stone-400 mt-0.5">ចំណងដៃគ្រប់ធនាគារ</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-200 font-mono">1-Click</p>
                <p className="text-[11px] text-stone-400 mt-0.5">ផ្ញើចូល Telegram ភ្លាម</p>
              </div>
            </div>
          </div>

          {/* Right Live Interactive Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] bg-stone-900/90 rounded-[40px] p-4 border-4 border-stone-700 shadow-[0_0_50px_rgba(197,160,89,0.15)] relative">
              <div className="bg-[#181a1f] rounded-[32px] overflow-hidden border border-stone-800 text-center p-6 space-y-4">
                
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#C5A059]">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-amber-400 font-medium tracking-widest uppercase">The Wedding Of</p>
                  <h3 className="font-['Moul'] font-normal text-base text-amber-100 leading-relaxed">គីមស៊ុន & ចាន់ណេត</h3>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 space-y-1">
                  <p className="text-[11px] text-stone-400">សូមគោរពអញ្ជើញ</p>
                  <p className="text-xs font-semibold text-amber-300 truncate">{previewGuest}</p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={previewGuest}
                    onChange={(e) => setPreviewGuest(e.target.value)}
                    placeholder="សាកវាយឈ្មោះភ្ញៀវនៅទីនេះ..."
                    className="w-full bg-stone-950 border border-stone-700 text-xs p-2.5 rounded-xl text-stone-200 focus:outline-none focus:border-amber-400 text-center"
                  />
                  <p className="text-[10px] text-stone-400">👆 សាកល្បងប្តូរឈ្មោះដើម្បីមើលទិដ្ឋភាពជាក់ស្តែង</p>
                </div>

                <Link
                  href={`/kimsun-channet-2026?to=${encodeURIComponent(previewGuest)}`}
                  target="_blank"
                  className="w-full gold-button text-stone-950 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-stone-950" /> បើកមើលធៀបការពេញ
                </Link>

              </div>
            </div>
          </div>

        </div>
      </section>