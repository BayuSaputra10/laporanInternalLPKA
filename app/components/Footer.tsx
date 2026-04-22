import Link from "next/link"
import { Zap, Truck, Phone, Mail, MapPin, Users, Calendar, FileText, Home } from "lucide-react"
import type { FooterData } from "@/lib/types"

interface FooterProps {
  footerData: FooterData
}

export default function Footer({ footerData }: FooterProps) {
  return (
    <footer className="relative mt-32 pt-28 pb-16 overflow-hidden">
      {/* Enhanced LPKA-themed Background */}
      <div className="absolute inset-0">
        {/* Main gradient with LPKA colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-lpka-primary-fg via-gray-900/80 to-lpka-green/20"></div>
        {/* Subtle LPKA bg pattern */}
        <div className="absolute inset-0 bg-[url('/lpka-bg.jpg')] bg-cover bg-center opacity-5 mix-blend-multiply animate-gradient-x"></div>
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
        {/* Animated LPKA particles */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-lpka-primary/20 rounded-[50%] blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-[-100px] left-10 w-[500px] h-[500px] bg-lpka-green/15 rounded-[50%] blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-white/10 rounded-[50%] blur-2xl animate-bob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-lpka-primary/10 rounded-full blur-xl animate-twist-slow"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="backdrop-blur-3xl bg-white/3 border border-white/15 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-black/30 hover:shadow-3xl transition-all duration-500 mx-4 md:mx-0">
        
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-lpka-green/30 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-lpka-green" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80 uppercase tracking-wide">Hari Ini</p>
                <p className="text-2xl font-bold text-white">{footerData.todayTotal} Laporan</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">Genset: {footerData.todayGenset} | Kendaraan: {footerData.todayVehicle}</p>
          </div>



          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-white" />
              <div>
                <p className="text-sm font-medium text-white/80 uppercase tracking-wide">Tim Aktif</p>
                <p className="text-2xl font-bold text-white">4 Regu</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">Regu Pelaksana</p>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 text-white/80 text-sm">
          {/* Branding */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/lpka2.png" alt="LPKA" className="w-12 h-12 rounded-full bg-white/20 p-1" />
              <div>
                <h3 className="font-bold text-xl text-white bg-gradient-to-r from-lpka-primary to-lpka-green bg-clip-text">LPKA Sistem</h3>
                <p className="text-xs opacity-75">Laporan Internal</p>
              </div>
            </div>
            <p className="opacity-70 leading-relaxed mb-6">Digitalisasi pemeriksaan harian genset & kendaraan untuk efisiensi operasional LPKA Kelas II Bandar Lampung.</p>
            <div className="flex gap-4 text-lg">
              <a href="tel:+6271xxxxxxxx" className="group p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all">
                <Phone className="w-5 h-5 group-hover:-translate-y-0.5" />
              </a>
              <a href="mailto:lpka.lampung@example.com" className="group p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all">
                <Mail className="w-5 h-5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Navigasi Cepat
            </h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-2">Dashboard</Link></li>
              <li><Link href="/reports/genset" className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-2"><Zap className="w-4 h-4" /> Genset</Link></li>
              <li><Link href="/reports/vehicle" className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-2"><Truck className="w-4 h-4" /> Kendaraan</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-2 transition-all group flex items-center gap-2">Tentang</Link></li>
            </ul>
          </div>

          {/* Regu Info */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Regu
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 py-2 px-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Regu Pengamanan</li>
              <li className="flex items-center gap-2 py-2 px-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Komitmen Keamanan</li>
              <li className="flex items-center gap-2 py-2 px-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Kekuatan Personel</li>
              <li className="flex items-center gap-2 py-2 px-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Aturan Kegiatan</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Lokasi
            </h4>
            <p className="mb-4 opacity-70">LPKA Kelas II Bandar Lampung</p>
            <p className="mb-6 opacity-70 flex items-start gap-2">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
              24/7 Operasional
            </p>
            <p className="text-xs opacity-60">Masgar, Kecamatan Tegineneng, Kabupaten Pesawaran</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-xs">
          <p>&copy; 2024 LPKA Kelas II Bandar Lampung. Sistem Laporan Internal v1.0.</p>
        </div>
        </div>
      </div>
    </footer>
  )
}
