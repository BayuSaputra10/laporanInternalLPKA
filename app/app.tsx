import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Dashboard() {

  const gensetReports = await prisma.gensetReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const vehicleReports = await prisma.vehicleReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const combinedReports = [
    ...gensetReports.map((r) => ({
      ...r,
      type: "genset" as const
    })),
    ...vehicleReports.map((r) => ({
      ...r,
      type: "vehicle" as const
    }))
  ]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-slate-900 p-6">

      <h1 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
        Dashboard Laporan
      </h1>

      {/* NAVIGASI */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/reports/vehicle/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Laporan Kendaraan
        </Link>

        <Link
          href="/reports/genset/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Laporan Genset
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Laporan Terbaru</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Tanggal</th>
              <th>Jenis</th>
              <th>Catatan</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {combinedReports.map((report) => (
              <tr key={`${report.type}-${report.id}`} className="border-b">
                
                <td className="py-3">
                  {new Date(report.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      report.type === "vehicle"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {report.type === "vehicle" ? "Kendaraan" : "Genset"}
                  </span>
                </td>

                <td>{report.catatan || "-"}</td>

                <td>
                  <Link
                    href={`/reports/${report.type}/${report.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Lihat
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}