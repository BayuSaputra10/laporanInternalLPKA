import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function VehiclePage() {
  const data = await prisma.vehicleReport.findMany({
    orderBy: { id: "desc" }
  })

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">

        <h1 className="text-xl font-bold text-black">
          Semua Laporan Kendaraan
        </h1>

        <div className="flex gap-3">

          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Kembali
          </Link>

        </div>

      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Tanggal</th>
              <th className="text-left">Kendaraan</th>
              <th className="text-left">Keperluan</th>
              <th className="text-left">KM</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Belum ada data
                </td>
              </tr>
            )}

            {data.map((r) => (
              <tr key={r.id} className="border-t text-black hover:bg-gray-50">

                {/* TANGGAL */}
                <td className="px-6 py-3">
                  {new Date(r.tanggal).toLocaleDateString("id-ID")}
                </td>

                {/* KENDARAAN */}
                <td>{r.jenisKendaraan}</td>

                {/* KEPERLUAN */}
                <td>{r.keperluan}</td>

                {/* KM */}
                <td>
                  {r.kmAwal} → {r.kmAkhir}
                </td>

                {/* DETAIL */}
                <td className="px-6 py-3 text-right">
                  <Link
                    className="text-blue-600 hover:underline"
                    href={`/reports/vehicle/${r.id}`}
                  >
                    Detail
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