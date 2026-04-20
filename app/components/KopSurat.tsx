export default function KopSurat() {
  return (
    <div className="border-b pb-4 mb-6">

      {/* WRAPPER CENTER TOTAL */}
      <div className="relative flex items-center justify-center">

        {/* LOGO (kiri absolute biar tidak ganggu center text) */}
        <div className="absolute left-0">
          <img
            src="/lpka2.png"
            alt="LPKA Logo"
            className="w-20 mt-10 h-20 object-contain"
          />
        </div>

        {/* TEXT CENTER FIX */}
        <div className="text-center leading-tight">

          <h1 className="text-[11px] font-semibold uppercase tracking-wide">
            Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia
          </h1>

          <h2 className="text-sm font-bold uppercase tracking-wide mt-1">
            LPKA Kelas II Bandar Lampung
          </h2>

        </div>

      </div>


      {/* TITLE */}
      <div className="text-center mt-4">

        <h3 className="text-sm font-bold uppercase tracking-wider">
          Laporan Pemeriksaan Genset Harian
        </h3>

      </div>

      {/* LINE */}
      <div className="mt-3 border-b border-black"></div>

    </div>
  )
}