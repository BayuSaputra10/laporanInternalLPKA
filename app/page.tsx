import { prisma } from "@/lib/prisma"
import Link from "next/link"
import type { GensetReport, VehicleReport } from "@prisma/client"

export default async function Dashboard() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diset")
  }

  let gensetReports: GensetReport[] = []
  let vehicleReports: VehicleReport[] = []

  let totalGenset = 0
  let totalVehicle = 0

  try {
    gensetReports = await prisma.gensetReport.findMany({
      take: 5,
      orderBy: { id: "desc" }
    })

    vehicleReports = await prisma.vehicleReport.findMany({
      take: 5,
      orderBy: { id: "desc" }
    })

    totalGenset = await prisma.gensetReport.count()
    totalVehicle = await prisma.vehicleReport.count()

  } catch (error) {
    console.error("Dashboard error:", error)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-black">
          Dashboard Laporan Internal
        </h1>
        <p className="text-gray-500 text-sm">
          Monitoring Genset & Kendaraan LPKA Bandar Lampung
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow border">
            <p className="text-sm text-gray-500">Total Laporan Genset</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {totalGenset}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <p className="text-sm text-gray-500">Total Laporan Kendaraan</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {totalVehicle}
            </h2>
          </div>

        </div>

        {/* ACTION */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/reports/genset/create"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow font-medium"
          >
            + Input Genset
          </Link>

          <Link
            href="/reports/vehicle/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow font-medium"
          >
            + Input Kendaraan
          </Link>
        </div>

        {/* ================= GENSET ================= */}
        <div className="bg-white rounded-2xl shadow border mb-8 overflow-hidden">

          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="font-semibold text-lg text-green-700">
              Laporan Genset Terbaru
            </h2>

            <Link href="/reports/genset" className="text-sm text-green-600 hover:underline">
              Lihat Semua →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-6 py-3">Tanggal</th>
                  <th className="text-left">Regu</th>
                  <th className="text-left">Solar Pemakaian</th>
                </tr>
              </thead>

              <tbody>
                {gensetReports.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-400">
                      Belum ada data genset
                    </td>
                  </tr>
                )}

                {gensetReports.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50 text-black">

                    <td className="px-6 py-3">
                      <Link
                        href={`/reports/genset/${r.id}`}
                        className="text-green-600 hover:underline"
                      >
                        {new Date(r.tanggal).toLocaleDateString("id-ID")}
                      </Link>
                    </td>

                    <td>{r.regu}</td>

                    <td>
                      {r.solarPemakaian != null
                        ? `${r.solarPemakaian}%`
                        : "-"}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* ================= VEHICLE ================= */}
        <div className="bg-white rounded-2xl shadow border overflow-hidden">

          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="font-semibold text-lg text-blue-700">
              Laporan Kendaraan Terbaru
            </h2>

            <Link href="/reports/vehicle" className="text-sm text-blue-600 hover:underline">
              Lihat Semua →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-6 py-3">Tanggal</th>
                  <th className="text-left">Jenis Kendaraan</th>
                  <th className="text-left">Keperluan</th>
                </tr>
              </thead>

              <tbody>
                {vehicleReports.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-400">
                      Belum ada data kendaraan
                    </td>
                  </tr>
                )}

                {vehicleReports.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50 text-black">

                    <td className="px-6 py-3">
                      <Link
                        href={`/reports/vehicle/${r.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {new Date(r.tanggal).toLocaleDateString("id-ID")}
                      </Link>
                    </td>

                    <td>{r.jenisKendaraan}</td>
                    <td>{r.keperluan}</td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  )
}