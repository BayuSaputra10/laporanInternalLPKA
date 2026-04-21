import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Truck, ArrowLeft } from "lucide-react"

export default async function VehiclePage() {
  const data = await prisma.vehicleReport.findMany({
    orderBy: { id: "desc" }
  })

  return (
    <>
      {/* HEADER */}
      <header className="border-b border-lpka-primary/20 pb-6 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-lpka-primary hover:text-lpka-primary/80 font-semibold hover:underline transition-colors p-2 -m-2 rounded-lg hover:bg-lpka-primary/10"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </Link>
          <div className="flex-1 flex items-center gap-3">
            <Truck className="w-8 h-8 text-lpka-primary" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-lpka-primary">
              Laporan Kendaraan
            </h1>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {data.length === 0 ? (
          <div className="text-center py-20">
            <Truck className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Belum ada laporan kendaraan</h3>
            <Link
              href="/reports/vehicle/create"
              className="inline-flex items-center gap-2 bg-lpka-primary hover:bg-lpka-primary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Buat Laporan Pertama
            </Link>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-lpka-primary/20 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-lpka-primary/10 to-transparent border-b border-lpka-primary/20">
              <h2 className="font-heading text-xl font-bold text-lpka-primary">
                {data.length} Laporan Ditemukan
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-lpka-primary/5">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Kendaraan
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Keperluan
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    KM
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(r.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {r.jenisKendaraan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.keperluan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.kmAwal} → {r.kmAkhir}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/reports/vehicle/${r.id}`}
                        className="group inline-flex items-center gap-2 bg-lpka-primary/10 hover:bg-lpka-primary/20 text-lpka-primary px-4 py-2 rounded-lg font-semibold hover:shadow-md transition-all"
                      >
                        Lihat Detail
                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
