import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { deleteReport } from "@/app/actions/report"

export default async function GensetDetail({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const reportId = Number(id)

  const report = await prisma.gensetReport.findUnique({
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

          <form action={deleteReport.bind(null, reportId, "genset")}>
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
          Detail Laporan Genset
        </h1>

        <p className="text-gray-500 mb-4">
          {new Date(report.tanggal).toLocaleDateString("id-ID")}
        </p>

        {/* DATA */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <p><b>Regu:</b> {report.regu}</p>
          <p><b>Mesin:</b> {report.mesin || "-"}</p>
          <p><b>Generator:</b> {report.generator || "-"}</p>
          <p><b>Shift:</b> {report.shift || "-"}</p>
        </div>

        {/* TEKNIS */}
        <div className="bg-emerald-50 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">Teknis</h2>
          <p>Speed: {report.speed ?? "-"}</p>
          <p>Oli Press: {report.oliPress ?? "-"}</p>
          <p>Temp: {report.temp ?? "-"}</p>
        </div>

        {/* GENERATOR */}
        <div className="bg-blue-50 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">Generator</h2>
          <p>Volt: {report.volt ?? "-"}</p>
          <p>HZ: {report.hz ?? "-"}</p>
          <p>KW: {report.kw ?? "-"}</p>
          <p>Ampere R: {report.ampereR ?? "-"}</p>
          <p>Ampere S: {report.ampereS ?? "-"}</p>
          <p>Ampere T: {report.ampereT ?? "-"}</p>
        </div>

        {/* SOLAR */}
        <div className="bg-yellow-50 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">Solar</h2>
          <p>Awal: {report.solarLevelAwal ?? "-"}%</p>
          <p>Akhir: {report.solarLevelAkhir ?? "-"}%</p>
          <p>Pemakaian: {report.solarPemakaian ?? "-"}%</p>
        </div>

        {/* MAINTENANCE */}
        <div className="bg-pink-50 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">Maintenance</h2>
          <p>Oli Mesin: {report.gantiOliMesin ?? "-"} jam</p>
          <p>Filter Oli: {report.gantiFilterOli ?? "-"} jam</p>
          <p>Filter Solar: {report.gantiFilterSolar ?? "-"} jam</p>
        </div>

        {/* INSPECTIONS */}
        {report.inspections && report.inspections.length > 0 && (
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
        )}

        {/* CATATAN */}
        {report.catatan && (
          <div className="mt-4">
            <h2 className="font-bold">Catatan</h2>
            <p>{report.catatan}</p>
          </div>
        )}

      </div>
    </div>
  )
}
