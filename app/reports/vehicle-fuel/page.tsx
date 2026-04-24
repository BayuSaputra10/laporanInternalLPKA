/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Fuel, ArrowLeft, Loader2, Trash2 } from "lucide-react"
import { deleteReport } from "@/app/actions/report"
import Pagination from "@/app/components/Pagination"
import SortableHeader from "@/app/components/SortableHeader"

interface Report {
  id: number
  tanggal: Date
  jenisKendaraan: string
  tambahSolar: number
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

function VehicleFuelPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [data, setData] = useState<Report[]>([])
  const [pagination, setPagination] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const page = searchParams.get('page') || '1'
  const sortBy = searchParams.get('sortBy') || 'tanggal'
  const sortDir = searchParams.get('sortDir') || 'desc'
  const limit = '10'

  const basePath = '/reports/vehicle-fuel'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/reports/vehicle-fuel?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}`
        )
        if (!res.ok) throw new Error('Failed to fetch')

        const json: ApiResponse = await res.json()
        setData(json.data)
        setPagination(json.pagination)
      } catch {
        toast.error('Gagal memuat data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, sortBy, sortDir])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-lpka-green" />
          <p className="text-lg font-semibold text-gray-600">
            Loading reports...
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* HEADER */}
      <header className="border-b border-lpka-green/20 pb-6 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-lpka-green hover:text-lpka-green/80 font-semibold hover:underline transition-colors p-2 -m-2 rounded-lg hover:bg-lpka-green/10"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <Fuel className="w-8 h-8 text-lpka-green" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-lpka-green">
              Laporan Pengisian Solar
            </h1>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {data.length === 0 ? (
          <div className="text-center py-20">
            <Fuel className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              Belum ada laporan pengisian solar
            </h3>
            <Link
              href="/reports/vehicle-fuel/create"
              className="inline-flex items-center gap-2 bg-lpka-green hover:bg-lpka-green/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Buat Laporan Pertama
            </Link>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-lpka-green/20 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-lpka-green/10 to-transparent border-b border-lpka-green/20">
              <h2 className="font-heading text-xl font-bold text-lpka-green">
                {pagination.totalCount || 0} Laporan Ditemukan
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-lpka-green/5">
                  <tr>
                    <SortableHeader
                      label="Tanggal"
                      sortBy="tanggal"
                      currentSortBy={sortBy}
                      currentSortDir={sortDir as 'asc' | 'desc'}
                      basePath={basePath}
                      color="green"
                    />
                    <SortableHeader
                      label="Kendaraan"
                      sortBy="jenisKendaraan"
                      currentSortBy={sortBy}
                      currentSortDir={sortDir as 'asc' | 'desc'}
                      basePath={basePath}
                      otherParams={`page=${page}`}
                      color="green"
                    />
                    <SortableHeader
                      label="Solar (Liter)"
                      sortBy="tambahSolar"
                      currentSortBy={sortBy}
                      currentSortDir={sortDir as 'asc' | 'desc'}
                      basePath={basePath}
                      otherParams={`page=${page}`}
                      color="green"
                    />
                    <th className="px-6 py-4 text-right font-semibold text-lpka-green text-sm uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {data.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {new Date(r.tanggal).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {r.jenisKendaraan}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {r.tambahSolar} L
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/reports/vehicle-fuel/${r.id}`}
                            className="flex items-center gap-2 bg-lpka-green/10 hover:bg-lpka-green/20 text-lpka-green px-4 py-2 text-sm rounded-lg font-semibold hover:shadow-md transition-all"
                          >
                            Lihat Detail
                          </Link>

                          <button
                            onClick={async () => {
                              if (!confirm('Yakin ingin menghapus laporan ini?')) return
                              try {
                                await deleteReport(r.id, 'vehicle-fuel' as any)
                                toast.success('Laporan dihapus')
                                window.location.reload()
                              } catch {
                                toast.error('Gagal menghapus')
                              }
                            }}
                            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 text-sm rounded-lg font-semibold hover:shadow-md transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              totalCount={pagination.totalCount || 0}
              pageSize={pagination.pageSize || 10}
              basePath={basePath}
              color="green"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default VehicleFuelPage