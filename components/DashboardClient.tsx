'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Report {
  id: number
  tanggal: string
  type: 'genset' | 'vehicle'
  regu?: string | null
  unit?: string | null
  catatan?: string | null
}

interface DashboardClientProps {
  initialReports: Report[]
  totalGenset: number
  totalVehicle: number
}

export default function DashboardClient({
  initialReports,
  totalGenset,
  totalVehicle
}: DashboardClientProps) {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'genset' | 'vehicle'>('all')
  const [sortBy, setSortBy] = useState<'tanggal' | 'type'>('tanggal')

  useEffect(() => {
    let filtered = initialReports

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.type === filterType)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.catatan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.regu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.unit?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'tanggal') {
        return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
      } else {
        return a.type.localeCompare(b.type)
      }
    })

    setReports(filtered)
  }, [searchTerm, filterType, sortBy, initialReports])

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-black flex items-center justify-center gap-2">
        Dashboard Laporan Internal Genset & Kendaraan LPKA Bandar Lampung
      </h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <p className="text-sm opacity-80">Total Genset</p>
          <h2 className="text-3xl font-bold">{totalGenset}</h2>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <p className="text-sm opacity-80">Total Kendaraan</p>
          <h2 className="text-3xl font-bold">{totalVehicle}</h2>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex gap-4 mb-8">
        <Link href="/reports/genset/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Laporan Genset
        </Link>

        <Link href="/reports/vehicle/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Laporan Kendaraan
        </Link>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Cari berdasarkan catatan, regu, atau unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">Semua Jenis</option>
            <option value="genset">Genset</option>
            <option value="vehicle">Kendaraan</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border rounded"
          >
            <option value="tanggal">Urut Tanggal</option>
            <option value="type">Urut Jenis</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Laporan Terbaru ({reports.length})</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Tanggal</th>
              <th>Jenis</th>
              <th>Detail</th>
              <th>Catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  {searchTerm || filterType !== 'all' ? 'Tidak ada laporan yang sesuai filter' : 'Belum ada data laporan'}
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={`${report.type}-${report.id}`} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    {new Date(report.tanggal).toLocaleDateString("id-ID")}
                  </td>

                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${
                      report.type === "vehicle"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {report.type === "vehicle" ? "Kendaraan" : "Genset"}
                    </span>
                  </td>

                  <td>
                    {report.type === "genset" ? (
                      <div className="text-sm">
                        <div>Regu: {report.regu}</div>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div>Unit: {report.unit}</div>
                      </div>
                    )}
                  </td>

                  <td className="max-w-xs truncate">{report.catatan || "-"}</td>

                  <td>
                    <Link
                      href={`/reports/${report.type}/${report.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}