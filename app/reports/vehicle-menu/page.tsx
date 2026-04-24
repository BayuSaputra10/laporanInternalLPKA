"use client"

import Link from "next/link"
import { ArrowLeft, Truck, FilePlus, Fuel, Wrench } from "lucide-react"

export default function VehicleMenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-lpka-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lpka-primary/10 rounded-2xl">
              <Truck className="w-10 h-10 text-lpka-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Laporan Kendaraan</h1>
              <p className="text-gray-500 mt-1">Pilih jenis laporan yang ingin dibuat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tombol 1: Laporan Kendaraan Harian */}
          <Link
            href="/reports/vehicle/create"
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-lpka-primary/30"
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-lpka-primary/10 rounded-xl flex items-center justify-center group-hover:bg-lpka-primary group-hover:scale-110 transition-all duration-300">
              <FilePlus className="w-6 h-6 text-lpka-primary group-hover:text-white transition-colors" />
            </div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-lpka-primary to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Laporan Kendaraan Harian
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Buat laporan pemeriksaan harian kendaraan dinas
              </p>
            </div>
            <div className="flex items-center gap-2 text-lpka-primary font-semibold group-hover:gap-3 transition-all">
              Buat Laporan
              <span className="text-lg">→</span>
            </div>
          </Link>

          {/* Tombol 2: Laporan Solar Kendaraan */}
          <Link
            href="/reports/vehicle-fuel/create"
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-yellow-500/30"
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-110 transition-all duration-300">
              <FilePlus className="w-6 h-6 text-yellow-600 group-hover:text-white transition-colors" />
            </div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Fuel className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Laporan Solar Kendaraan
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Buat laporan pengisian bahan bakar kendaraan
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-600 font-semibold group-hover:gap-3 transition-all">
              Buat Laporan
              <span className="text-lg">→</span>
            </div>
          </Link>

          {/* Tombol 3: Laporan Service Kendaraan */}
          <Link
            href="/reports/vehicle-service/create"
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-purple-500/30"
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
              <FilePlus className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Laporan Service Kendaraan
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Buat laporan perawatan dan servis kendaraan
              </p>
            </div>
            <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
              Buat Laporan
              <span className="text-lg">→</span>
            </div>
          </Link>
        </div>

        {/* Lihat Semua Laporan */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Atau lihat laporan yang sudah dibuat</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/reports/vehicle"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-lpka-primary font-semibold border border-gray-100"
            >
              <Truck className="w-5 h-5" />
              Lihat Laporan Harian
            </Link>
            <Link
              href="/reports/vehicle-fuel"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-yellow-600 font-semibold border border-gray-100"
            >
              <Fuel className="w-5 h-5" />
              Lihat Laporan Solar
            </Link>
            <Link
              href="/reports/vehicle-service"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-purple-600 font-semibold border border-gray-100"
            >
              <Wrench className="w-5 h-5" />
              Lihat Laporan Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

