"use client"

import Link from "next/link"
import {
  Zap,
  Fuel,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Home
} from "lucide-react"
import type { FooterData } from "@/lib/types"

interface FooterProps {
  footerData: FooterData
}

export default function Footer({ footerData }: FooterProps) {
  return (
    <footer className="relative mt-16 md:mt-24 pt-20 pb-12 overflow-hidden">

      {/* Background (dipermudah biar ringan di mobile) */}
      <div className="absolute inset-0 bg-gradient-to-br from-lpka-primary-fg via-gray-900 to-lpka-green/20" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 md:p-10">

          {/* SUMMARY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            
            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-lpka-green" />
                <p className="text-xs text-white/70 uppercase">Hari Ini</p>
              </div>
              <p className="text-lg font-bold text-white">
                {footerData.todayTotal} Laporan
              </p>
              <p className="text-xs text-white/60">
                Genset: {footerData.todayGenset} | Kendaraan: {footerData.todayVehicle} | Solar: {footerData.todayVehicleFuel}
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Fuel className="w-5 h-5 text-yellow-400" />
                <p className="text-xs text-white/70 uppercase">Solar Hari Ini</p>
              </div>
              <p className="text-lg font-bold text-white">
                {footerData.todayVehicleFuel} Pengisian
              </p>
              <p className="text-xs text-white/60">Kendaraan Dinas</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-white" />
                <p className="text-xs text-white/70 uppercase">Tim</p>
              </div>
              <p className="text-lg font-bold text-white">4 Regu</p>
              <p className="text-xs text-white/60">Regu Aktif</p>
            </div>

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/80">

            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/lpka2.png"
                  alt="LPKA"
                  className="w-10 h-10 rounded-full bg-white/20 p-1"
                />
                <div>
                  <h3 className="font-bold text-white text-lg">
                    LPKA Sistem
                  </h3>
                  <p className="text-xs opacity-70">
                    Laporan Internal
                  </p>
                </div>
              </div>

              <p className="text-xs opacity-70 mb-4 leading-relaxed">
                Sistem digital laporan genset & kendaraan untuk efisiensi operasional.
              </p>

              <div className="flex gap-3">
                <a href="(0721) 481107" className="p-2 bg-white/20 rounded-lg">
                  <Phone className="w-4 h-4" />
                </a>
                <a href=" @lpka.lampung" className="p-2 bg-white/20 rounded-lg">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* NAV */}
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Navigasi
              </h4>

              <ul className="space-y-2 text-xs">
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/reports/genset">Genset</Link></li>
                <li><Link href="/reports/vehicle">Kendaraan</Link></li>
                <li><Link href="/reports/vehicle-fuel">Pengisian Solar</Link></li>
              </ul>
            </div>

            {/* REGU */}
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Regu
              </h4>

              <ul className="space-y-2 text-xs">
                <li>Pengamanan</li>
                <li>Komitmen</li>
                <li>Personel</li>
                <li>Kegiatan</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lokasi
              </h4>

              <p className="text-xs opacity-70 mb-2">
                LPKA Bandar Lampung
              </p>

              <p className="flex items-center gap-2 text-xs opacity-70 mb-2">
                <Calendar className="w-3 h-3" />
                24 Jam
              </p>

              <p className="text-xs opacity-60">
                Pesawaran, Lampung
              </p>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/50">
            © 2024 LPKA Lampung
          </div>

        </div>
      </div>
    </footer>
  )
}