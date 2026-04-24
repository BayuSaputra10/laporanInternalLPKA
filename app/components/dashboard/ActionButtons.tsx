import Link from "next/link"
import { Truck, Zap, ArrowRight } from "lucide-react"

export default function ActionButtons() {
  return (
    <section className="max-w-4xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tombol Laporan Kendaraan */}
        <Link
          href="/reports/vehicle-menu"
          className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-lpka-primary/20 hover:border-lpka-primary/50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lpka-primary/10 to-transparent rounded-bl-full" />
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-lpka-primary to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Laporan Kendaraan
            </h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Kelola laporan harian, pengisian solar, dan servis kendaraan dinas
            </p>
            <div className="flex items-center gap-2 text-lpka-primary font-bold group-hover:gap-3 transition-all">
              Buat Laporan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Tombol Laporan Genset */}
        <Link
          href="/reports/genset-menu"
          className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-lpka-green/20 hover:border-lpka-green/50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lpka-green/10 to-transparent rounded-bl-full" />
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-lpka-green to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Laporan Genset
            </h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Kelola laporan harian, pengisian solar, dan servis genset
            </p>
            <div className="flex items-center gap-2 text-lpka-green font-bold group-hover:gap-3 transition-all">
              Buat Laporan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

