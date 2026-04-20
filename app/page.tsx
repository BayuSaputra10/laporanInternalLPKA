/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type GensetReport = any
type VehicleReport = any

export default function Dashboard() {
  const [gensetReports, setGensetReports] = useState<GensetReport[]>([])
  const [vehicleReports, setVehicleReports] = useState<VehicleReport[]>([])
  const [totalGenset, setTotalGenset] = useState(0)
  const [totalVehicle, setTotalVehicle] = useState(0)
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        cache: "no-store"
      })

      const data = await res.json()

      setGensetReports(data.gensetReports)
      setVehicleReports(data.vehicleReports)
      setTotalGenset(data.totalGenset)
      setTotalVehicle(data.totalVehicle)

      setLoading(false)
    } catch (err) {
      console.error("Dashboard fetch error:", err)
    }
  }

  // =========================
  // REALTIME POLLING (SAFE)
  // =========================
  useEffect(() => {
    let isMounted = true

    const run = async () => {
      if (!isMounted) return
      await fetchData()
    }

    run()

    const interval = setInterval(() => {
      run()
    }, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="p-6 text-black">
        Loading dashboard...
      </div>
    )
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-black">
          Realtime Dashboard Laporan
        </h1>
        <p className="text-gray-500 text-sm">
          Auto update setiap 5 detik
        </p>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* SUMMARY */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Genset</p>
            <h2 className="text-3xl font-bold text-green-600">
              {totalGenset}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Kendaraan</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {totalVehicle}
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

          {/* HEADER */}
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

          {gensetReports.length === 0 && (
            <p className="text-gray-400">Belum ada data genset</p>
          )}

          {gensetReports.map((r) => (
            <div
              key={r.id}
              className="border-b py-2 flex justify-between items-center text-black"
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

          {/* HEADER */}
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

          {vehicleReports.length === 0 && (
            <p className="text-gray-400">Belum ada data kendaraan</p>
          )}

          {vehicleReports.map((r) => (
            <div
              key={r.id}
              className="border-b py-2 flex justify-between items-center text-black"
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