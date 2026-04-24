/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link"
import { Truck, Zap, Fuel, FileText, Plus, ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"
import type { GensetReport, VehicleReport, VehicleFuelReport } from "@/lib/types"
import DashboardHeader from "@/app/components/DashboardHeader"
import Footer from "@/app/components/Footer"

async function getDashboardData() {
  const now = new Date()

  const jakartaNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  )

  const today = new Date(jakartaNow)
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const gensetReports = await prisma.gensetReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const vehicleReports = await prisma.vehicleReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const vehicleFuelReports = await prisma.vehicleFuelReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const totalGenset = await prisma.gensetReport.count()
  const totalVehicle = await prisma.vehicleReport.count()
  const totalVehicleFuel = await prisma.vehicleFuelReport.count()

  // Real data for footer
  const todayGenset = await prisma.gensetReport.count({
    where: {
      tanggal: {
        gte: today,
        lt: tomorrow
      }
    }
  })

  const todayVehicle = await prisma.vehicleReport.count({
    where: {
      tanggal: {
        gte: today,
        lt: tomorrow
      }
    }
  })

  const todayVehicleFuel = await prisma.vehicleFuelReport.count({
    where: {
      tanggal: {
        gte: today,
        lt: tomorrow
      }
    }
  })

  const todayTotal = todayGenset + todayVehicle + todayVehicleFuel

  const pendingVehicle = await prisma.vehicleReport.count({
    where: {
      status: "draft"
    }
  })

  const distinctRegu = await prisma.gensetReport.groupBy({
    by: ['regu'],
    _count: {
      regu: true
    }
  })

  const activeTeams = distinctRegu.length

  return {
    gensetReports: gensetReports as unknown as GensetReport[],
    vehicleReports: vehicleReports as unknown as VehicleReport[],
    vehicleFuelReports: vehicleFuelReports as unknown as VehicleFuelReport[],
    totalGenset,
    totalVehicle,
    totalVehicleFuel,
    footerData: {
      todayTotal,
      todayGenset,
      todayVehicle,
      todayVehicleFuel,
      pending: pendingVehicle,
      activeTeams
    }
  }
}

export const revalidate = 0

export default async function Page() {
  const data = await getDashboardData()

  return (
    <>
      <DashboardHeader />

      {/* STATS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
        <div className="group bg-gradient-to-br from-lpka-green/10 via-white/50 to-lpka-green/5 border-4 border-lpka-green/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-lpka-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
            <Zap className="w-12 h-12 md:w-14 md:h-14 text-lpka-green drop-shadow-lg" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
            Total Laporan Genset
          </h3>
          <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lpka-green to-[#10b981] bg-clip-text text-transparent drop-shadow-2xl">
            {data.totalGenset.toLocaleString()}
          </div>
        </div>

        <div className="group bg-gradient-to-br from-lpka-primary/10 via-white/50 to-lpka-primary/5 border-4 border-lpka-primary/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-lpka-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
            <Truck className="w-12 h-12 md:w-14 md:h-14 text-lpka-primary drop-shadow-lg" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
            Total Laporan Kendaraan
          </h3>
          <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lpka-primary to-[#3b82f6] bg-clip-text text-transparent drop-shadow-2xl">
            {data.totalVehicle.toLocaleString()}
          </div>
        </div>

        <div className="group bg-gradient-to-br from-yellow-500/10 via-white/50 to-yellow-500/5 border-4 border-yellow-500/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
            <Fuel className="w-12 h-12 md:w-14 md:h-14 text-yellow-600 drop-shadow-lg" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
            Total Pengisian Solar
          </h3>
          <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-600 to-[#d97706] bg-clip-text text-transparent drop-shadow-2xl">
            {data.totalVehicleFuel.toLocaleString()}
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-20 justify-center">
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
          Pengisian Solar
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500 ml-auto" />
        </Link>
      </section>

      {/* GENSET REPORTS */}
      <section className="mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-lpka-green/20 rounded-2xl flex items-center justify-center p-2 shrink-0">
              <Zap className="w-7 h-7 lg:w-8 lg:h-8 text-lpka-green" />
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold bg-gradient-to-r from-lpka-green to-[#10b981] bg-clip-text text-transparent">
              Laporan Genset Terbaru
            </h2>
          </div>
          <Link
            href="/reports/genset"
            className="group flex items-center gap-2 px-6 py-3 bg-lpka-green/10 border-2 border-lpka-green/30 rounded-xl font-semibold text-lg text-lpka-green hover:bg-lpka-green hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
          >
            Lihat Semua
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {data.gensetReports.length === 0 ? (
          <div className="text-center py-20 md:py-24 text-gray-500 bg-gradient-to-b from-gray-50/50 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-dashed border-gray-200">
            <FileText className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada laporan genset</h3>
            <p className="text-lg">Mulai dengan membuat laporan pertama</p>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-lpka-green/20 overflow-hidden">
            <div className="lg:hidden space-y-4 p-6">
              {data.gensetReports.map((r) => (
                <Link key={r.id} href={`/reports/genset/${r.id}`} className="group block p-6 bg-gradient-to-r from-lpka-green/5 to-transparent rounded-2xl border border-lpka-green/20 hover:bg-lpka-green/10 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-lpka-green/20 rounded-xl flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-lpka-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900">{new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm font-medium text-lpka-green">{r.regu}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Lihat Detail</span>
                    <ArrowRight className="w-5 h-5 text-lpka-green group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-lpka-green/10">
                    <tr>
                      <th className="px-8 py-5 text-left font-bold text-lg text-lpka-green uppercase tracking-wider border-b-2 border-lpka-green/30">
                        Tanggal Pemeriksaan
                      </th>
                      <th className="px-8 py-5 text-left font-bold text-lg text-lpka-green uppercase tracking-wider border-b-2 border-lpka-green/30">
                        Regu
                      </th>
                      <th className="px-8 py-5 text-right font-bold text-lg text-lpka-green uppercase tracking-wider border-b-2 border-lpka-green/30">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.gensetReports.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6 whitespace-nowrap font-semibold text-lg text-gray-900 border-r border-gray-100">
                          {new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-lg font-semibold text-gray-800">
                          <span className="inline-flex px-4 py-2 rounded-full bg-lpka-green/10 text-lpka-green font-bold border border-lpka-green/20">
                            {r.regu}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-right">
                          <Link
                            href={`/reports/genset/${r.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lpka-green to-[#10b981] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md whitespace-nowrap"
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

      {/* VEHICLE REPORTS */}
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

        {data.vehicleReports.length === 0 ? (
          <div className="text-center py-20 md:py-24 text-gray-500 bg-gradient-to-b from-gray-50/50 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-dashed border-gray-200">
            <Truck className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada laporan kendaraan</h3>
            <p className="text-lg">Mulai dengan membuat laporan pertama</p>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-lpka-primary/20 overflow-hidden">
            <div className="lg:hidden space-y-4 p-6">
              {data.vehicleReports.map((r) => (
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
                    {data.vehicleReports.map((r) => (
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

      {/* VEHICLE FUEL REPORTS */}
      <section className="mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center p-2 shrink-0">
              <Fuel className="w-7 h-7 lg:w-8 lg:h-8 text-yellow-600" />
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-[#d97706] bg-clip-text text-transparent">
              Pengisian Solar Terbaru
            </h2>
          </div>
          <Link
            href="/reports/vehicle-fuel"
            className="group flex items-center gap-2 px-6 py-3 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl font-semibold text-lg text-yellow-700 hover:bg-yellow-500 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
          >
            Lihat Semua
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {data.vehicleFuelReports.length === 0 ? (
          <div className="text-center py-20 md:py-24 text-gray-500 bg-gradient-to-b from-gray-50/50 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-dashed border-gray-200">
            <Fuel className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada laporan pengisian solar</h3>
            <p className="text-lg">Mulai dengan membuat laporan pertama</p>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-500/20 overflow-hidden">
            <div className="lg:hidden space-y-4 p-6">
              {data.vehicleFuelReports.map((r) => (
                <Link key={r.id} href={`/reports/vehicle-fuel/${r.id}`} className="group block p-6 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-2xl border border-yellow-500/20 hover:bg-yellow-500/10 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Fuel className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900">{new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm font-medium text-yellow-700">{r.jenisKendaraan}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{r.tambahSolar} Liter</span>
                    <ArrowRight className="w-5 h-5 text-yellow-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-yellow-500/10">
                    <tr>
                      <th className="px-8 py-5 text-left font-bold text-lg text-yellow-700 uppercase tracking-wider border-b-2 border-yellow-500/30">
                        Tanggal
                      </th>
                      <th className="px-8 py-5 text-left font-bold text-lg text-yellow-700 uppercase tracking-wider border-b-2 border-yellow-500/30">
                        Kendaraan
                      </th>
                      <th className="px-8 py-5 text-left font-bold text-lg text-yellow-700 uppercase tracking-wider border-b-2 border-yellow-500/30">
                        Solar (L)
                      </th>
                      <th className="px-8 py-5 text-right font-bold text-lg text-yellow-700 uppercase tracking-wider border-b-2 border-yellow-500/30">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.vehicleFuelReports.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6 whitespace-nowrap font-semibold text-lg text-gray-900 border-r border-gray-100">
                          {new Date(r.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-lg font-semibold text-gray-800">
                          <span className="inline-flex px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-700 font-bold border border-yellow-500/20">
                            {r.jenisKendaraan}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-lg font-bold text-yellow-700">
                          {r.tambahSolar} L
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-right">
                          <Link
                            href={`/reports/vehicle-fuel/${r.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-[#d97706] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md whitespace-nowrap"
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

      <Footer footerData={data.footerData} />
    </>
  )
}

