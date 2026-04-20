/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
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
    <div className="min-h-screen bg-slate-100 p-6">

      {/* BUTTON */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-between">

        <button
          onClick={() => router.back()}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
        >
          ← Kembali
        </button>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
        >
          Export PDF
        </button>

      </div>

      {/* AREA PDF */}
      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow text-black"
      >

        {/* KOP SURAT */}
        <KopSurat />

        {/* TITLE */}
        <h1 className="text-lg font-bold mb-4">
          Detail Genset #{data.id}
        </h1>

        {/* DATA */}
        <div className="space-y-2 text-sm">

          <p>
            <b>Regu:</b> {data.regu}
          </p>

          <p>
            <b>Tanggal Pemeriksaan:</b>{" "}
            {new Date(data.tanggal).toLocaleDateString("id-ID")}
          </p>

          <p>
            <b>Dibuat pada:</b>{" "}
            {data.createdAt
              ? new Date(data.createdAt).toLocaleString("id-ID")
              : "-"}
          </p>

          <p>
            <b>Jam Pemakaian:</b> {data.waktuPemakaianJam} jam
          </p>

          <p>
            <b>Hour Meter:</b>{" "}
            {data.hourMeterAwal} → {data.hourMeterAkhir}
          </p>

          <p>
            <b>Solar:</b>{" "}
            {data.solarLevelAwal}% → {data.solarLevelAkhir}%
          </p>

          <p>
            <b>Pemakaian Solar:</b>{" "}
            {data.solarPemakaian ?? "-"}%
          </p>

        </div>

        {/* FOTO */}
        <div className="mt-6">

          <h2 className="font-semibold mb-2">
            Foto Laporan
          </h2>

          {data.photoBase64 ? (
            <img
              src={`data:image/jpeg;base64,${data.photoBase64}`}
              className="rounded border max-h-[400px]"
              alt="Foto laporan"
            />
          ) : (
            <p className="text-gray-400">Tidak ada foto</p>
          )}

        </div>

      </div>
    </div>
  )
}