/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Wrench, Calendar, FileText } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import KopSurat from "@/app/components/KopSurat"

export default function GensetServiceDetailClient({ data }: any) {
  const printRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()

  const exportPDF = async () => {
    if (!printRef.current) return
    setIsExporting(true)

    await new Promise((r) => setTimeout(r, 150))

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

    const DESKTOP_WIDTH = 850

    printRef.current.classList.add("pdf-export-desktop")
    printRef.current.style.minWidth = `${DESKTOP_WIDTH}px`
    printRef.current.style.width = `${DESKTOP_WIDTH}px`

    await new Promise((r) => setTimeout(r, 200))

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      width: DESKTOP_WIDTH,
      height: printRef.current.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
    })

    printRef.current.classList.remove("pdf-export-desktop")
    printRef.current.style.minWidth = ""
    printRef.current.style.width = ""

    const imgData = canvas.toDataURL("image/png", 1.0)
    const pdfWidthMM = 210
    const pdfHeightMM = (canvas.height * pdfWidthMM) / canvas.width

    const pdf = new jsPDF("p", "mm", [pdfWidthMM, pdfHeightMM])
    pdf.addImage(imgData, "PNG", 5, 5, pdfWidthMM - 10, pdfHeightMM - 10)
    pdf.save(`genset-service-report-${data.id}.pdf`)

    setIsExporting(false)
  }

  return (
    <>
      {/* HEADER */}
      <header className="border-b border-teal-500/20 pb-4 sm:pb-6 mb-6 sm:mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Kembali
            </button>

            <button
              onClick={exportPDF}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg"
            >
              Export PDF
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          ref={printRef}
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-500/20 p-4 sm:p-6 md:p-8 text-black"
        >
          <KopSurat title="Laporan Servis Genset" />

          {/* TITLE */}
          <div className="flex items-start sm:items-center gap-3 mb-6 sm:mb-8 pt-2 border-t border-teal-500/30">
            <Wrench className="w-7 h-7 sm:w-10 sm:h-10 text-teal-600" />
            <div>
              <h1 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-teal-600">
                Detail Laporan #{data.id}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Data servis dan perawatan genset
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm">
            {/* LEFT */}
            <div className="space-y-3">
              <div className="flex gap-3 p-3 sm:p-4 bg-teal-50 rounded-xl border border-teal-200">
                <Calendar className="w-6 h-6 text-teal-600" />
                <div>
                  <h3 className="font-semibold">Tanggal Servis</h3>
                  <p>
                    {new Date(data.tanggal).toLocaleDateString("id-ID", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-3">
              <div className="flex gap-3 p-3 sm:p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <FileText className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold">Catatan Servis</h3>
                  <p className="font-medium text-gray-800 whitespace-pre-wrap">
                    {data.catatan}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOTO */}
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 className="font-bold mb-4">Foto Dokumentasi Servis</h3>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border-2 border-dashed border-gray-300">
              {data.photoBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${data.photoBase64}`}
                  className="w-full max-h-[400px] object-contain rounded-xl"
                  alt="Foto servis genset"
                />
              ) : (
                <div className="text-center py-10 text-gray-500">
                  Tidak ada foto
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
            <p>
              Laporan dibuat pada{" "}
              {data.createdAt
                ? new Date(data.createdAt).toLocaleString("id-ID")
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

