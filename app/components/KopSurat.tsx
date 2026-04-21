interface KopSuratProps {
  title?: string
}

export default function KopSurat({ title = "Laporan Harian" }: KopSuratProps) {
  return (
    <div className="border-b-4 border-lpka-primary/30 pb-6 mb-8 print:border-b-2 print:border-black print:mb-4">

      {/* WRAPPER CENTER TOTAL */}
      <div className="relative flex items-center justify-center max-w-4xl mx-auto">

        {/* LOGO (kiri absolute biar tidak ganggu center text) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <img
            src="/lpka2.png"
            alt="LPKA Logo"
            className="w-20 h-20 object-contain print:w-16 print:h-16"
          />
        </div>

        {/* TEXT CENTER FIX */}
        <div className="text-center leading-tight px-20 print:px-16">

          <h1 className="text-xs md:text-[11px] font-bold uppercase tracking-widest text-lpka-primary font-heading">
            Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia
          </h1>

          <h2 className="text-sm md:text-base font-bold uppercase tracking-wide mt-1 text-gray-800 font-heading">
            LPKA Kelas II Bandar Lampung
          </h2>

        </div>

      </div>

      {/* TITLE */}
      <div className="text-center mt-6 print:mt-3">

        <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-lpka-primary font-heading print:text-base">
          {title}
        </h3>

      </div>

      {/* LINE */}
      <div className="mt-4 h-px bg-gradient-to-r from-lpka-primary/50 via-transparent to-lpka-green/50 print:border-t print:border-black print:mt-2"></div>

    </div>
  )
}
