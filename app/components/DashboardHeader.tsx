import Link from 'next/link'
import Image from 'next/image'
import { Zap, Truck } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="w-screen left-1/2 -ml-[50vw] text-center py-16 md:py-20 border-b-4 border-lpka-primary/20 mb-12 md:mb-16 bg-[url(/lpka-bg.jpg)] bg-no-repeat bg-cover bg-center bg-fixed relative overflow-hidden">
      <div className="">
        {/* Enhanced Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <Image
              src="/sipir.png"
              alt="LPKA Kelas II Lampung"
              width={120}
              height={120}
              className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-3xl shadow-2xl border-4 border-lpka-primary/40 group-hover:border-white transition-all duration-500 float-subtle hover:scale-105 hover:rotate-3"
              priority
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-lpka-primary/20 to-lpka-green/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
        
        {/* Title & Subtitle */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl [text-shadow:3px_3px_0px_rgba(0,0,0,0.8),_1px_1px_0px_rgba(255,255,255,0.5)] mb-6 leading-tight">
          LPKA Kelas II Lampung
        </h1>
        
        <p className="text-2xl md:text-3xl lg:text-4xl text-lpka-gold bg-white/90 backdrop-blur-xl border-2 border-lpka-primary/50 rounded-2xl px-6 py-4 font-black mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-2xl [text-shadow:2px_2px_0px_rgba(0,0,0,0.7),_1px_1px_0px_rgba(255,255,255,0.6)] hover:shadow-white/50 hover:-translate-y-1 transition-all duration-300">
          Sistem Laporan Pemeriksaan Harian
        </p>
        
        {/* Category Badges */}
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <span className="flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-xl border-2 border-lpka-green/50 rounded-2xl text-xl font-bold text-lpka-green shadow-2xl hover:shadow-white/50 hover:-translate-y-1 transition-all duration-300">
            <Zap className="w-7 h-7" />
            Genset
          </span>
          <span className="flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-xl border-2 border-lpka-primary/50 rounded-2xl text-xl font-bold text-lpka-primary shadow-2xl hover:shadow-white/50 hover:-translate-y-1 transition-all duration-300">
            <Truck className="w-7 h-7" />
            Kendaraan
          </span>
        </div>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-lpka-gold bg-white/90 backdrop-blur-xl border-2 border-lpka-primary/50 rounded-2xl px-6 py-4 font-bold italic max-w-lg mx-auto drop-shadow-2xl [text-shadow:2px_2px_0px_rgba(0,0,0,0.6),_1px_1px_0px_rgba(255,255,255,0.8)] hover:shadow-white/50 hover:-translate-y-1 transition-all duration-300">
          Digitalisasi Laporan Pemeriksaan Internal
        </p>
      </div>
    </header>
    
  )
}

