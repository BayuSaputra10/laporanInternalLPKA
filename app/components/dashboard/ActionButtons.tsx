import Link from "next/link"
import { Plus, ArrowRight } from "lucide-react"

export default function ActionButtons() {
  return (
    <section className="flex flex-wrap gap-4 lg:gap-6 mb-20 justify-center">
      <Link
        href="/reports/genset/create"
        className="group flex items-center justify-center gap-4 bg-gradient-to-r from-lpka-green to-[#10b981] hover:from-lpka-green/90 hover:to-[#10b981]/90 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 min-w-[280px] border-2 border-transparent hover:border-lpka-green/50"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500 shrink-0" />
        Buat Laporan Genset
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
      </Link>
      <Link
        href="/reports/vehicle/create"
        className="group flex items-center justify-center gap-4 bg-gradient-to-r from-lpka-primary to-[#3b82f6] hover:from-lpka-primary/90 hover:to-[#3b82f6]/90 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 min-w-[280px] border-2 border-transparent hover:border-lpka-primary/50"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500 shrink-0" />
        Buat Laporan Kendaraan
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
      </Link>
      <Link
        href="/reports/vehicle-fuel/create"
        className="group flex items-center justify-center gap-4 bg-gradient-to-r from-yellow-500 to-[#d97706] hover:from-yellow-500/90 hover:to-[#d97706]/90 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 min-w-[280px] border-2 border-transparent hover:border-yellow-500/50"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500 shrink-0" />
        Solar Kendaraan
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
      </Link>
      <Link
        href="/reports/genset-fuel/create"
        className="group flex items-center justify-center gap-4 bg-gradient-to-r from-orange-500 to-[#c2410c] hover:from-orange-500/90 hover:to-[#c2410c]/90 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 min-w-[280px] border-2 border-transparent hover:border-orange-500/50"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500 shrink-0" />
        Solar Genset
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
      </Link>
      <Link
        href="/reports/vehicle-service/create"
        className="group flex items-center justify-center gap-4 bg-gradient-to-r from-purple-600 to-[#7c3aed] hover:from-purple-600/90 hover:to-[#7c3aed]/90 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 min-w-[280px] border-2 border-transparent hover:border-purple-500/50"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500 shrink-0" />
        Servis Kendaraan
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
      </Link>
      <Link
        href="/reports/genset-service/create"
        className="group flex items-center justify-center gap-4 bg-gradient-to-r from-pink-600 to-[#db2777] hover:from-pink-600/90 hover:to-[#db2777]/90 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 min-w-[280px] border-2 border-transparent hover:border-pink-500/50"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500 shrink-0" />
        Servis Genset
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
      </Link>
    </section>
  )
}