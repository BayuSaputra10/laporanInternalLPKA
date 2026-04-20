import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { deleteReport } from "@/app/actions/report"

export default async function VehicleDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const reportId = Number(id)

  const report = await prisma.vehicleReport.findUnique({
    where: { id: reportId },
    include: {
      inspections: {
        include: {
          item: true
        }
      }
    }
  })

  if (!report) return notFound()

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* NAV */}
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="text-sm px-4 py-2 bg-black text-white rounded"
          >
            ← Kembali
          </Link>

          <form action={deleteReport.bind(null, reportId, "vehicle")}>
            <button
              type="submit"
              className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={(e) => {
                if (!confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
                  e.preventDefault()
                }
              }}
            >
              🗑️ Hapus
            </button>
          </form>
        </div>

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
          <p><b>KM Awal:</b> {report.kmAwal ?? "-"} km</p>
          <p><b>KM Akhir:</b> {report.kmAkhir ?? "-"} km</p>
          <p><b>Solar Awal:</b> {report.solarAwal ?? "-"} L</p>
          <p><b>Solar Akhir:</b> {report.solarAkhir ?? "-"} L</p>
          <p><b>Catatan:</b> {report.catatan || "-"}</p>
        </div>

        {/* INSPECTIONS */}
        {report.inspections && report.inspections.length > 0 ? (
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h2 className="font-bold mb-4">Hasil Pemeriksaan</h2>
            <div className="space-y-2">
              {report.inspections.map((inspection) => (
                <div key={inspection.id} className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="flex-1">{inspection.item?.name || `Item ${inspection.itemId}`}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    inspection.kondisi === 'Normal' ? 'bg-green-100 text-green-800' :
                    inspection.kondisi === 'Perlu Perhatian' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {inspection.kondisi}
                  </span>
                  {inspection.keterangan && (
                    <span className="text-sm text-gray-600 ml-2">{inspection.keterangan}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h2 className="font-bold mb-2">Hasil Pemeriksaan</h2>
            <p className="text-gray-500">Belum ada data pemeriksaan</p>
          </div>
        )}

      </div>
    </div>
  )
}
