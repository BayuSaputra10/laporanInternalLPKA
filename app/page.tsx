/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link"
import { Truck, Zap, FileText, Plus, ArrowRight, Calendar, Users } from "lucide-react"
import { prisma } from "@/lib/prisma"
import type { GensetReport, VehicleReport } from "@/lib/types"

async function getDashboardData() {
  const gensetReports = await prisma.gensetReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const vehicleReports = await prisma.vehicleReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const totalGenset = await prisma.gensetReport.count()
  const totalVehicle = await prisma.vehicleReport.count()

  return {
    gensetReports: gensetReports as unknown as GensetReport[],
    vehicleReports: vehicleReports as unknown as VehicleReport[],
    totalGenset,
    totalVehicle
  }
}

export const revalidate = 0

export default async function Page() {
  const data = await getDashboardData()

  return (
    <>
      {/* HERO HEADER */}
      <header className="text-center py-12 border-b-4 border-lpka-primary/20 mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-lpka-primary mb-4">
            LPKA Kelas II Bandar Lampung
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6">
            Sistem Laporan Pemeriksaan Harian
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="flex items-center gap-2 text-lpka-green font-semibold">
              <Zap className="w-5 h-5" />
              Genset
            </span>
            <span className="flex items-center gap-2 text-lpka-primary font-semibold">
              <Truck className="w-5 h-5" />
              Kendaraan
            </span>
          </div>
        </div>
      </header>

      {/* STATS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="group bg-gradient-to-br from-lpka-green/10 to-lpka-green/5 border-4 border-lpka-green/30 rounded-lg p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center">
          <Zap className="w-16 h-16 text-lpka-green mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Total Laporan Genset</h3>
          <div className="text-4xl font-bold text-lpka-green">
            {data.totalGenset}
          </div>
        </div>

        <div className="group bg-gradient-to-br from-lpka-primary/10 to-lpka-primary/5 border-4 border-lpka-primary/30 rounded-lg p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-center">
          <Truck className="w-16 h-16 text-lpka-primary mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Total Laporan Kendaraan</h3>
          <div className="text-4xl font-bold text-lpka-primary">
            {data.totalVehicle}
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
        <Link
          href="/reports/genset/create"
          className="group flex items-center justify-center gap-3 bg-lpka-green hover:bg-lpka-green/90 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          Input Laporan Genset
        </Link>
        <Link
          href="/reports/vehicle/create"
          className="group flex items-center justify-center gap-3 bg-lpka-primary hover:bg-lpka-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          Input Laporan Kendaraan
        </Link>
      </section>

      {/* GENSET TABLE */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-lpka-green" />
            <h2 className="font-heading text-2xl font-bold text-lpka-green">
              Laporan Genset Terbaru
            </h2>
          </div>
          <Link
            href="/reports/genset"
            className="flex items-center gap-2 text-lpka-green hover:text-lpka-green/80 font-semibold hover:underline transition-colors"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {data.gensetReports.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Belum ada data laporan genset</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-lpka-green/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-lpka-green/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-green text-sm uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-green text-sm uppercase tracking-wider">
                    Regu
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-lpka-green text-sm uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.gensetReports.map((r, index) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(r.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.regu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/reports/genset/${r.id}`}
                        className="text-lpka-green hover:text-lpka-green/80 font-semibold hover:underline flex items-center gap-1 justify-end"
                      >
                        Detail
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* VEHICLE TABLE */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-lpka-primary" />
            <h2 className="font-heading text-2xl font-bold text-lpka-primary">
              Laporan Kendaraan Terbaru
            </h2>
          </div>
          <Link
            href="/reports/vehicle"
            className="flex items-center gap-2 text-lpka-primary hover:text-lpka-primary/80 font-semibold hover:underline transition-colors"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {data.vehicleReports.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Truck className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Belum ada data laporan kendaraan</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-lpka-primary/20 overflow-hidden">
            <table className="w-full">
              <thead className="bg-lpka-primary/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Jenis Kendaraan
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.vehicleReports.map((r, index) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(r.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.jenisKendaraan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/reports/vehicle/${r.id}`}
                        className="text-lpka-primary hover:text-lpka-primary/80 font-semibold hover:underline flex items-center gap-1 justify-end"
                      >
                        Detail
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

