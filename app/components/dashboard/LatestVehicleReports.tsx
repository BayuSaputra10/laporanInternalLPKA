import Link from "next/link"
import { Truck, ArrowRight, FileText } from "lucide-react"
import type { VehicleReport } from "@/lib/types"

interface LatestVehicleReportsProps {
  reports: VehicleReport[]
}

export default function LatestVehicleReports({ reports }: LatestVehicleReportsProps) {
  return (
    <section className="mb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-lpka-primary/20 rounded-2xl flex items-center justify-center p-2 shrink-0">
            <Truck className="w-7 h-7 lg:w-8 lg:h-8 text-lpka-primary" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold bg-gradient-to-r from-lpka-primary to-[#3b82f6] bg-clip-text text-transparent">
            Laporan Kendaraan Terbaru
          </h2>
        </div>
        <Link
          href="/reports/vehicle"
          className="group flex items-center gap-2 px-6 py-3 bg-lpka-primary/10 border-2 border-lpka-primary/30 rounded-xl font-semibold text-lg text-lpka-primary hover:bg-lpka-primary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
        >
          Lihat Semua
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-20 md:py-24 text-gray-500 bg-gradient-to-b from-gray-50/50 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-dashed border-gray-200">
          <Truck className="w-20 h-20 mx-auto mb-6 opacity-50" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada laporan kendaraan</h3>
          <p className="text-lg mb-6">Mulai dengan membuat laporan pertama</p>
          <Link
            href="/reports/vehicle-menu"
            className="inline-flex items-center gap-2 bg-lpka-primary hover:bg-lpka-primary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Buat Laporan Kendaraan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-lpka-primary/20 overflow-hidden">
          <div className="lg:hidden space-y-4 p-6">
            {reports.map((r) => (
              <Link key={r.id} href={`/reports/vehicle/${r.id}`} className="group block p-6 bg-gradient-to-r from-lpka-primary/5 to-transparent rounded-2xl border border-lpka-primary/20 hover:bg-lpka-primary/10 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-lpka-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6 text-lpka-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm font-medium text-lpka-primary">{r.jenisKendaraan}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Lihat Detail</span>
                  <ArrowRight className="w-5 h-5 text-lpka-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-lpka-primary/10">
                  <tr>
                    <th className="px-8 py-5 text-left font-bold text-lg text-lpka-primary uppercase tracking-wider border-b-2 border-lpka-primary/30">
                      Tanggal Pemeriksaan
                    </th>
                    <th className="px-8 py-5 text-left font-bold text-lg text-lpka-primary uppercase tracking-wider border-b-2 border-lpka-primary/30">
                      Jenis Kendaraan
                    </th>
                    <th className="px-8 py-5 text-right font-bold text-lg text-lpka-primary uppercase tracking-wider border-b-2 border-lpka-primary/30">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reports.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap font-semibold text-lg text-gray-900 border-r border-gray-100">
                        {new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-semibold text-gray-800">
                        <span className="inline-flex px-4 py-2 rounded-full bg-lpka-primary/10 text-lpka-primary font-bold border border-lpka-primary/20">
                          {r.jenisKendaraan}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        <Link
                          href={`/reports/vehicle/${r.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lpka-primary to-[#3b82f6] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md whitespace-nowrap"
                        >
                          Lihat Detail
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}