"use client"

import Link from "next/link"
import {
  Truck,
  Zap,
  Fuel,
  Wrench,
  ArrowRight,
  Activity,
} from "lucide-react"
import type {
  VehicleReport,
  GensetReport,
  VehicleFuelReport,
  GensetFuelReport,
  VehicleServiceReport,
  GensetServiceReport,
} from "@/lib/types"

interface RecentActivityProps {
  vehicleReports: VehicleReport[]
  gensetReports: GensetReport[]
  vehicleFuelReports: VehicleFuelReport[]
  gensetFuelReports: GensetFuelReport[]
  vehicleServiceReports: VehicleServiceReport[]
  gensetServiceReports: GensetServiceReport[]
}

type ActivityItem =
  | { type: "vehicle"; data: VehicleReport }
  | { type: "genset"; data: GensetReport }
  | { type: "vehicleFuel"; data: VehicleFuelReport }
  | { type: "gensetFuel"; data: GensetFuelReport }
  | { type: "vehicleService"; data: VehicleServiceReport }
  | { type: "gensetService"; data: GensetServiceReport }

const TYPE_CONFIG = {
  vehicle: {
    label: "Laporan Kendaraan",
    icon: Truck,
    color: "text-lpka-primary",
    bg: "bg-lpka-primary/10",
    border: "border-lpka-primary/20",
    badgeText: "text-lpka-primary",
    gradient: "from-lpka-primary to-[#3b82f6]",
    href: "/reports/vehicle",
    detailPrefix: "",
  },
  genset: {
    label: "Laporan Genset",
    icon: Zap,
    color: "text-lpka-green",
    bg: "bg-lpka-green/10",
    border: "border-lpka-green/20",
    badgeText: "text-lpka-green",
    gradient: "from-lpka-green to-[#10b981]",
    href: "/reports/genset",
    detailPrefix: "",
  },
  vehicleFuel: {
    label: "Solar Kendaraan",
    icon: Fuel,
    color: "text-yellow-600",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    badgeText: "text-yellow-700",
    gradient: "from-yellow-500 to-[#d97706]",
    href: "/reports/vehicle-fuel",
    detailPrefix: "",
  },
  gensetFuel: {
    label: "Solar Genset",
    icon: Fuel,
    color: "text-orange-600",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    badgeText: "text-orange-700",
    gradient: "from-orange-500 to-[#c2410c]",
    href: "/reports/genset-fuel",
    detailPrefix: "",
  },
  vehicleService: {
    label: "Servis Kendaraan",
    icon: Wrench,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    badgeText: "text-purple-700",
    gradient: "from-purple-500 to-[#7c3aed]",
    href: "/reports/vehicle-service",
    detailPrefix: "",
  },
  gensetService: {
    label: "Servis Genset",
    icon: Wrench,
    color: "text-pink-600",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    badgeText: "text-pink-700",
    gradient: "from-pink-500 to-[#db2777]",
    href: "/reports/genset-service",
    detailPrefix: "",
  },
}

function getDetail(item: ActivityItem): string {
  switch (item.type) {
    case "vehicle":
      return item.data.jenisKendaraan
    case "genset":
      return item.data.regu
    case "vehicleFuel":
      return `${item.data.jenisKendaraan} — ${item.data.tambahSolar} L`
    case "gensetFuel":
      return `${item.data.tambahSolar} L`
    case "vehicleService":
      return item.data.jenisKendaraan
    case "gensetService":
      return item.data.catatan || "—"
  }
}

function getHref(item: ActivityItem): string {
  const base = TYPE_CONFIG[item.type].href
  return `${base}/${item.data.id}`
}

export default function RecentActivity({
  vehicleReports,
  gensetReports,
  vehicleFuelReports,
  gensetFuelReports,
  vehicleServiceReports,
  gensetServiceReports,
}: RecentActivityProps) {
  const allItems: ActivityItem[] = [
    ...vehicleReports.map((data) => ({ type: "vehicle" as const, data })),
    ...gensetReports.map((data) => ({ type: "genset" as const, data })),
    ...vehicleFuelReports.map((data) => ({ type: "vehicleFuel" as const, data })),
    ...gensetFuelReports.map((data) => ({ type: "gensetFuel" as const, data })),
    ...vehicleServiceReports.map((data) => ({ type: "vehicleService" as const, data })),
    ...gensetServiceReports.map((data) => ({ type: "gensetService" as const, data })),
  ]

  const sortedItems = allItems
    .sort((a, b) => {
      const dateA = new Date(a.data.tanggal).getTime()
      const dateB = new Date(b.data.tanggal).getTime()
      if (dateB !== dateA) return dateB - dateA
      return b.data.id - a.data.id
    })
    .slice(0, 10)

  const hasData = sortedItems.length > 0

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-indigo-500 to-violet-500/20 rounded-2xl flex items-center justify-center p-2 shrink-0">
            <Activity className="w-7 h-7 lg:w-8 lg:h-8 text-indigo-600" />
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Aktivitas Terbaru
          </h2>
        </div>
      </div>

      {!hasData ? (
        <div className="text-center py-20 md:py-24 text-gray-500 bg-gradient-to-b from-gray-50/50 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-dashed border-gray-200">
          <Activity className="w-20 h-20 mx-auto mb-6 opacity-50" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Belum ada aktivitas</h3>
          <p className="text-lg">Mulai dengan membuat laporan pertama</p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-500/20 overflow-hidden">
          {/* Mobile view */}
          <div className="lg:hidden space-y-4 p-6">
            {sortedItems.map((item) => {
              const cfg = TYPE_CONFIG[item.type]
              const Icon = cfg.icon
              return (
                <Link
                  key={`${item.type}-${item.data.id}`}
                  href={getHref(item)}
                  className="group block p-6 bg-gradient-to-r from-indigo-500/5 to-transparent rounded-2xl border border-indigo-500/10 hover:bg-indigo-500/10 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${cfg.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        {new Date(item.data.tanggal).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <span className={`inline-flex px-3 py-1 rounded-full ${cfg.bg} ${cfg.badgeText} font-bold text-xs border ${cfg.border} mt-1`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-600 font-medium truncate max-w-[200px]">
                      {getDetail(item)}
                    </span>
                    <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Desktop view */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-500/10">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold text-base text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-500/30">
                      Tanggal
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-base text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-500/30">
                      Tipe Laporan
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-base text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-500/30">
                      Detail
                    </th>
                    <th className="px-6 py-5 text-right font-bold text-base text-indigo-700 uppercase tracking-wider border-b-2 border-indigo-500/30">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedItems.map((item) => {
                    const cfg = TYPE_CONFIG[item.type]
                    const Icon = cfg.icon
                    return (
                      <tr
                        key={`${item.type}-${item.data.id}`}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-6 py-5 whitespace-nowrap font-semibold text-base text-gray-900 border-r border-gray-100">
                          {new Date(item.data.tanggal).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cfg.bg} ${cfg.badgeText} font-bold border ${cfg.border}`}
                          >
                            <Icon className="w-4 h-4" />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700 font-medium">
                          {getDetail(item)}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <Link
                            href={getHref(item)}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${cfg.gradient} text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md whitespace-nowrap`}
                          >
                            Lihat Detail
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

