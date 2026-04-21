/* eslint-disable @typescript-eslint/no-explicit-any */


import Link from "next/link"
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
    gensetReports,
    vehicleReports,
    totalGenset,
    totalVehicle
  }
}

export default async function Page() {
  const data = await getDashboardData()


  // =========================
  // UI DASHBOARD
  // =========================
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-black">
          Realtime Dashboard Laporan
        </h1>
        <p className="text-gray-500 text-sm">
Refresh page (F5) untuk update terbaru
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* SUMMARY */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Genset</p>
            <h2 className="text-3xl font-bold text-green-600">
{data.totalGenset}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Kendaraan</p>
            <h2 className="text-3xl font-bold text-blue-600">
{data.totalVehicle}
            </h2>
          </div>

        </div>

        {/* ACTION BUTTON */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/reports/genset/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Input Genset
          </Link>

          <Link
            href="/reports/vehicle/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Input Kendaraan
          </Link>
        </div>

        {/* ================= GENSET ================= */}
        <div className="bg-white rounded-xl shadow mb-6 p-4">

          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-green-600">
              Genset Terbaru
            </h2>

            <Link
              href="/reports/genset"
              className="text-sm text-green-600 hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

{data.gensetReports.length === 0 && (
            <p className="text-gray-400">Belum ada data genset</p>
          )}

{data.gensetReports.map((r) => (
            <div
              key={r.id}
              className="border-b py-2 flex justify-between text-black"
            >
              <div>
                {new Date(r.tanggal).toLocaleDateString("id-ID")} - {r.regu}
              </div>

              <Link
                href={`/reports/genset/${r.id}`}
                className="text-green-600 text-sm hover:underline"
              >
                Detail
              </Link>
            </div>
          ))}

        </div>

        {/* ================= VEHICLE ================= */}
        <div className="bg-white rounded-xl shadow p-4">

          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-blue-600">
              Vehicle Terbaru
            </h2>

            <Link
              href="/reports/vehicle"
              className="text-sm text-blue-600 hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

{data.vehicleReports.length === 0 && (
            <p className="text-gray-400">Belum ada data kendaraan</p>
          )}

{data.vehicleReports.map((r) => (
            <div
              key={r.id}
              className="border-b py-2 flex justify-between text-black"
            >
              <div>
                {new Date(r.tanggal).toLocaleDateString("id-ID")} - {r.jenisKendaraan}
              </div>

              <Link
                href={`/reports/vehicle/${r.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                Detail
              </Link>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}