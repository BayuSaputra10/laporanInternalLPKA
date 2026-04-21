/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Truck, ArrowLeft, Loader2, Trash2 } from "lucide-react"
import { deleteReport } from "@/app/actions/report"
import Pagination from "@/app/components/Pagination"
import SortableHeader from "@/app/components/SortableHeader"

interface Report {
  id: number
  tanggal: Date
  jenisKendaraan: string
  keperluan: string
  kmAwal: number
  kmAkhir: number
  createdAt: Date
}

interface ApiResponse {
  data: Report[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
  }
}

function VehiclePage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [data, setData] = useState<Report[]>([])
  const [pagination, setPagination] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const page = searchParams.get('page') || '1'
  const sortBy = searchParams.get('sortBy') || 'tanggal'
  const sortDir = searchParams.get('sortDir') || 'desc'
  const limit = '10'

  const basePath = '/reports/vehicle'
  const apiUrl = `/api/reports/vehicle?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}`

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error('Failed to fetch')
        const json: ApiResponse = await res.json()
        setData(json.data)
        setPagination(json.pagination)
      } catch (err) {
        setError('Failed to load reports')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, sortBy, sortDir, apiUrl])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-lpka-primary" />
          <p className="text-lg font-semibold text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* HEADER */}
      <header className="border-b border-lpka-primary/20 pb-6 mb-8">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
  
  {/* KIRI */}
  <Link
    href="/"
    className="group flex items-center gap-2 text-lpka-primary hover:text-lpka-primary/80 font-semibold hover:underline transition-colors p-2 -m-2 rounded-lg hover:bg-lpka-primary/10"
  >
    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
    Kembali ke Dashboard
  </Link>

  {/* KANAN */}
  <div className="flex items-center gap-3">
    <Truck className="w-8 h-8 text-lpka-primary" />
    <h1 className="font-heading text-2xl md:text-3xl font-bold text-lpka-primary">
      Laporan Kendaraan
    </h1>
  </div>

</div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {data.length === 0 && !loading ? (
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
                {pagination.totalCount || 0} Laporan Ditemukan
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-lpka-primary/5">
                <tr>
                  <SortableHeader
                    label="Tanggal"
                    sortBy="tanggal"
                    currentSortBy={sortBy}
                    currentSortDir={sortDir as 'asc' | 'desc'}
                    basePath={basePath}
                    color="primary"
                  />
                  <SortableHeader
                    label="Kendaraan"
                    sortBy="jenisKendaraan"
                    currentSortBy={sortBy}
                    currentSortDir={sortDir as 'asc' | 'desc'}
                    basePath={basePath}
                    otherParams={`page=${page}`}
                    color="primary"
                  />
                  <SortableHeader
                    label="Keperluan"
                    sortBy="keperluan"
                    currentSortBy={sortBy}
                    currentSortDir={sortDir as 'asc' | 'desc'}
                    basePath={basePath}
                    otherParams={`page=${page}`}
                    color="primary"
                  />
                  <SortableHeader
                    label="KM"
                    sortBy="kmAkhir"
                    currentSortBy={sortBy}
                    currentSortDir={sortDir as 'asc' | 'desc'}
                    basePath={basePath}
                    otherParams={`page=${page}`}
                    color="primary"
                  />
                  <th className="px-6 py-4 text-right font-semibold text-lpka-primary text-sm uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((r: Report) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/reports/vehicle/${r.id}`}
                        className="group inline-flex items-center gap-2 bg-lpka-primary/10 hover:bg-lpka-primary/20 text-lpka-primary px-4 py-2 rounded-lg font-semibold hover:shadow-md transition-all"
                      >
                        Lihat Detail
                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <form action={deleteReport.bind(null, r.id, "vehicle")} className="inline">
                        <button
                          type="submit"
                          formAction={async () => {
                            if (confirm(`Hapus laporan kendaraan "${r.jenisKendaraan}" tanggal ${new Date(r.tanggal).toLocaleDateString("id-ID")}?`)) {
                              try {
                                await deleteReport(r.id, "vehicle")
                                toast.success("✅ Laporan berhasil dihapus!")
                                window.location.reload()
                              } catch (error) {
                                toast.error("❌ Gagal menghapus laporan")
                              }
                            }
                          }}
                          className="group inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-700 hover:text-red-600 hover:border-red-500/50 px-4 py-2 rounded-lg font-semibold hover:shadow-md transition-all text-sm"
                        >
                          Hapus
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pagination.totalPages && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalCount={pagination.totalCount}
                pageSize={parseInt(limit)}
                basePath={basePath}
                color="primary"
              />
            )}
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <Truck className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h3 className="text-xl font-semibold text-red-500 mb-2">Error: {error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="bg-lpka-primary hover:bg-lpka-primary/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default VehiclePage
