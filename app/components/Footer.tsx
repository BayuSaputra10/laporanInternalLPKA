"use client"

import Link from "next/link"
import {
  Zap,
  Truck,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Home,
  FileText
} from "lucide-react"
import type { FooterData } from "@/lib/types"

interface FooterProps {
  footerData: FooterData
}

export default function Footer({ footerData }: FooterProps) {
  return (
    <footer className="relative mt-16 md:mt-24 pt-20 pb-12 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lpka-primary-fg via-gray-900 to-lpka-green/20" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 md:p-10">

          {/* SUMMARY - Simplified */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            
            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-lpka-primary" />
                <p className="text-xs text-white/70 uppercase">Kendaraan Hari Ini</p>
              </div>
              <p className="text-lg font-bold text-white">
                {footerData.todayVehicle + footerData.todayVehicleFuel + footerData.todayVehicleService} Laporan
              </p>
              <p className="text-xs text-white/60">
                Harian, Solar & Service
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-lpka-green" />
                <p className="text-xs text-white/70 uppercase">Genset Hari Ini</p>
              </div>
              <p className="text-lg font-bold text-white">
                {footerData.todayGenset + footerData.todayGensetFuel + footerData.todayGensetService} Laporan
              </p>
              <p className="text-xs text-white/60">
                Harian, Solar & Service
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-white" />
                <p className="text-xs text-white/70 uppercase">Tim</p>
              </div>
              <p className="text-lg font-bold text-white">4 Regu</p>
              <p className="text-xs text-white/60">Regu Aktif</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                <p className="text-xs text-white/70 uppercase">Total Hari Ini</p>
              </div>
              <p className="text-lg font-bold text-white">
                {footerData.todayTotal} Laporan
              </p>
              <p className="text-xs text-white/60">
                Semua Kategori
              </p>
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
                <a href="tel:(0721)481107" className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
                <a href="mailto:@lpka.lampung" className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
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
                <li><Link href="/" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/reports/vehicle-menu" className="hover:text-white transition-colors">Laporan Kendaraan</Link></li>
                <li><Link href="/reports/genset-menu" className="hover:text-white transition-colors">Laporan Genset</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Tentang</Link></li>
              </ul>
            </div>

            {/* REPORTS */}
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Lihat Laporan
              </h4>

              <ul className="space-y-2 text-xs">
                <li><Link href="/reports/vehicle" className="hover:text-white transition-colors">Laporan Harian Kendaraan</Link></li>
                <li><Link href="/reports/vehicle-fuel" className="hover:text-white transition-colors">Laporan Solar Kendaraan</Link></li>
                <li><Link href="/reports/vehicle-service" className="hover:text-white transition-colors">Laporan Service Kendaraan</Link></li>
                <li><Link href="/reports/genset" className="hover:text-white transition-colors">Laporan Harian Genset</Link></li>
                <li><Link href="/reports/genset-fuel" className="hover:text-white transition-colors">Laporan Solar Genset</Link></li>
                <li><Link href="/reports/genset-service" className="hover:text-white transition-colors">Laporan Service Genset</Link></li>
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
            © 2026 LPKA Lampung
          </div>

        </div>
      </div>
    </footer>
  )
}

