import Image from "next/image"
import { Zap, Truck } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="relative w-full min-h-[400px] sm:h-[480px] md:h-[520px] overflow-hidden">

      {/* FULL BACKGROUND */}
      <Image
        src="/lpka-bg.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

        {/* Logo */}
        <div className="mb-4 rounded-xl bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-md">
          <Image
            src="/sipir.png"
            alt="LPKA Logo"
            width={100}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
          LPKA Kelas II Lampung
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-white/80 mb-5">
          Sistem Laporan Pemeriksaan Harian
        </p>

        {/* Badges */}
        <div className="flex gap-3 flex-wrap justify-center mb-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-lpka-green shadow">
            <Zap className="w-4 h-4" />
            Genset
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-lpka-primary shadow">
            <Truck className="w-4 h-4" />
            Kendaraan
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-white/70 italic">
          Digitalisasi Laporan Pemeriksaan Internal
        </p>

      </div>
    </header>
  )
}