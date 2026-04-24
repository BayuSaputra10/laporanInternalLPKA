import Link from "next/link"
import { Wrench, ArrowRight, FileText } from "lucide-react"
import type { GensetServiceReport } from "@/lib/types"

interface LatestGensetServiceReportsProps {
  reports: GensetServiceReport[]
}

export default function LatestGensetServiceReports({ reports }: LatestGensetServiceReportsProps) {
  return (
    <section className="mb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center p-2 shrink-0">
            <Wrench className="w-7 h-7 lg:w-8 lg:h-8 text-pink-600" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-[#db2777] bg-clip-text text-transparent">
            Servis Genset Terbaru
          </h2>
        </div>
        <Link
          href="/reports/genset-service"
          className="group flex items-center gap-2 px-6 py-3 bg-pink-500/10 border-2 border-pink-500/30 rounded-xl font-semibold text-lg text-pink-700 hover:bg-pink-500 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
        >
          Lihat Semua
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-20 md:py-24 text-gray-500 bg-gradient-to-b from-gray-50/50 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-dashed border-gray-200">
          <Wrench className="w-20 h-20 mx-auto mb-6 opacity-50" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada laporan servis genset</h3>
          <p className="text-lg">Mulai dengan membuat laporan pertama</p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-500/20 overflow-hidden">
          <div className="lg:hidden space-y-4 p-6">
            {reports.map((r) => (
              <Link key={r.id} href={`/reports/genset-service/${r.id}`} className="group block p-6 bg-gradient-to-r from-pink-500/5 to-transparent rounded-2xl border border-pink-500/20 hover:bg-pink-500/10 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 truncate max-w-[200px]">{r.catatan}</span>
                  <ArrowRight className="w-5 h-5 text-pink-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-500/10">
                  <tr>
                    <th className="px-8 py-5 text-left font-bold text-lg text-pink-700 uppercase tracking-wider border-b-2 border-pink-500/30">
                      Tanggal
                    </th>
                    <th className="px-8 py-5 text-left font-bold text-lg text-pink-700 uppercase tracking-wider border-b-2 border-pink-500/30">
                      Catatan
                    </th>
                    <th className="px-8 py-5 text-right font-bold text-lg text-pink-700 uppercase tracking-wider border-b-2 border-pink-500/30">
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
                      <td className="px-8 py-6 whitespace-nowrap text-lg text-gray-700 max-w-xs truncate">
                        {r.catatan}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        <Link
                          href={`/reports/genset-service/${r.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-[#db2777] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md whitespace-nowrap"
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