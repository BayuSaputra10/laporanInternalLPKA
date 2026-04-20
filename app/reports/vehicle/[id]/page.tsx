import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function VehicleDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const reportId = Number(id)

  const report = await prisma.vehicleReport.findUnique({
    where: { id: reportId },
  })

  if (!report) return notFound()

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* NAV */}
        <Link
          href="/"
          className="text-sm px-4 py-2 bg-black text-white rounded"
        >
          ← Kembali
        </Link>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mt-4">
          Detail Laporan Kendaraan
        </h1>

        <p className="text-gray-500 mb-4">
          {new Date(report.tanggal).toLocaleDateString("id-ID")}
        </p>

        {/* DATA */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <p><b>Unit:</b> {report.unit || "-"}</p>
          <p><b>Catatan:</b> {report.catatan || "-"}</p>
        </div>

        {/* INSPECTIONS */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-4">Hasil Pemeriksaan</h2>
          <p className="text-gray-500">Fitur detail pemeriksaan akan segera ditambahkan</p>
        </div>

      </div>
    </div>
  )
}
