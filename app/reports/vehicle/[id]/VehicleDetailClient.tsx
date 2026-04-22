/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Truck, Calendar, Users, Zap, FileText } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import KopSurat from "@/app/components/KopSurat"

export default function VehicleDetailClient({ data }: any) {
  const printRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const exportPDF = async () => {
    if (!printRef.current) return

    const images = printRef.current.getElementsByTagName("img")

    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })
      })
    )

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`vehicle-report-${data.id}.pdf`)
  }

  return (
    <>
      {/* HEADER */}
      <header className="border-b border-lpka-primary/20 pb-4 sm:pb-6 mb-6 sm:mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* FIX: mobile jadi wrap */}
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">

            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-lpka-primary hover:bg-lpka-primary/90 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Kembali
            </button>

            <button
              onClick={exportPDF}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-lpka-green hover:bg-lpka-green/90 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg transition-all"
            >
              Export PDF
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          ref={printRef}
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-lpka-primary/20 
          p-4 sm:p-6 md:p-8 text-black
          print:bg-white print:shadow-none print:border-none print:rounded-none"
        >

          <KopSurat title="Laporan Pemeriksaan Kendaraan Harian" />

          {/* TITLE */}
          <div className="flex items-start sm:items-center gap-3 mb-6 sm:mb-8 pt-2 border-t border-lpka-primary/30">
            <Truck className="w-7 h-7 sm:w-10 sm:h-10 text-lpka-primary flex-shrink-0" />
            <div>
              <h1 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-lpka-primary">
                Detail Laporan #{data.id}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Data pemeriksaan lengkap
              </p>
            </div>
          </div>

          {/* DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm">

            {/* LEFT */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-lpka-primary/5 rounded-xl border border-lpka-primary/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lpka-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-lpka-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Jenis Kendaraan</h3>
                  <p className="font-bold text-base sm:text-lg text-lpka-primary break-words">
                    {data.jenisKendaraan}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Tanggal</h3>
                  <p className="font-bold text-base sm:text-lg">
                    {new Date(data.tanggal).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-lpka-primary/5 rounded-xl border border-lpka-primary/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lpka-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-lpka-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Keperluan</h3>
                  <p className="font-bold text-base sm:text-lg text-lpka-primary break-words">
                    {data.keperluan}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    Kilometer
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">
                    {data.kmAwal} → {data.kmAkhir}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SOLAR */}
          <div className="bg-gradient-to-r from-lpka-primary/5 to-blue-50 p-4 sm:p-6 rounded-2xl border border-lpka-primary/20 mb-6 sm:mb-8">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-lpka-primary mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              Status Solar
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {data.solarAwalStrip}
                </div>
                <div className="text-xs text-gray-500">Awal</div>
              </div>

              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-red-600">
                  {data.solarPemakaian ?? 0}
                </div>
                <div className="text-xs text-gray-500">Pemakaian</div>
              </div>

              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">
                  {data.solarAkhirStrip}
                </div>
                <div className="text-xs text-gray-500">Akhir</div>
              </div>
            </div>
          </div>

          {/* FOTO */}
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-800 mb-4">
              📸 Foto Laporan
            </h3>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border-2 border-dashed border-gray-300">
              {data.photoBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${data.photoBase64}`}
                  className="w-full max-h-[300px] sm:max-h-[500px] object-contain rounded-xl shadow-lg mx-auto"
                  alt="Foto kendaraan"
                />
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-lg">Tidak ada foto</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}