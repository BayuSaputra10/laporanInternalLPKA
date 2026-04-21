/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Zap, Users, Calendar, Clock, FileText } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import KopSurat from "@/app/components/KopSurat"

export default function GensetDetailClient({ data }: any) {
  const printRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const exportPDF = async () => {
    if (!printRef.current) return

    // pastikan image loaded
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

    pdf.save(`lpka-genset-${data.id}.pdf`)
  }

  return (
    <>
      <header className="border-b border-lpka-green/20 pb-6 mb-8">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 bg-lpka-green hover:bg-lpka-green/90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Kembali
            </button>

            <button
              onClick={exportPDF}
              className="group flex items-center gap-2 bg-lpka-primary hover:bg-lpka-primary/90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Export PDF
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={printRef} className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-lpka-green/20 p-8 text-black print:bg-white print:shadow-none print:border-none print:rounded-none">

          {/* KOP SURAT */}
          <KopSurat title="Laporan Pemeriksaan Genset Harian" />

          {/* TITLE */}
          <div className="flex items-center gap-3 mb-8 pt-2 border-t border-lpka-green/30">
            <Zap className="w-10 h-10 text-lpka-green" />
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-lpka-green">
                Detail Laporan #{data.id}
              </h1>
              <p className="text-sm text-gray-600 mt-1">Data pemeriksaan lengkap</p>
            </div>
          </div>

          {/* DATA GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-lpka-green/5 rounded-xl border border-lpka-green/20">
                <div className="w-12 h-12 bg-lpka-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-6 h-6 text-lpka-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Regu</h3>
                  <p className="font-bold text-lg text-lpka-green">{data.regu}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Tanggal</h3>
                  <p className="font-bold text-lg">{new Date(data.tanggal).toLocaleDateString("id-ID")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-lpka-green/10 rounded-xl border border-lpka-green/20">
                <div className="w-12 h-12 bg-lpka-green/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-lpka-green" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Jam Pemakaian</h3>
                  <p className="font-bold text-xl text-lpka-green">{data.waktuPemakaianJam} jam</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">Hour Meter</span>
                  <span className="text-2xl font-bold text-gray-900">{data.hourMeterAwal} → {data.hourMeterAkhir}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SOLAR */}
          <div className="bg-gradient-to-r from-lpka-green/5 to-blue-50 p-6 rounded-2xl border border-lpka-green/20 mb-8">
            <h3 className="font-heading text-xl font-bold text-lpka-green mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Status Solar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">{data.solarLevelAwal}%</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Awal</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border-lpka-green">
                <div className="text-2xl font-bold text-red-600 mb-1">{data.solarPemakaian ?? "-"}%</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Pemakaian</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">{data.solarLevelAkhir}%</div>
                <div className="text-xs uppercase tracking-wide text-section">Akhir</div>
              </div>
            </div>
          </div>

          {/* PHOTO */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-heading text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📸 Foto Laporan
            </h3>
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
              {data.photoBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${data.photoBase64}`}
                  className="w-full max-h-[500px] object-contain rounded-xl shadow-lg mx-auto"
                  alt="Foto laporan"
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Tidak ada foto yang dilampirkan</p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
            <p>Laporan dibuat pada {data.createdAt ? new Date(data.createdAt).toLocaleString("id-ID") : "-"}</p>
          </div>

        </div>
      </div>
    </>
  )
}
