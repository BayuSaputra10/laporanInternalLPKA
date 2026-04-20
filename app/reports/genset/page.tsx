import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function GensetPage() {
  const data = await prisma.gensetReport.findMany({
    orderBy: { id: "desc" }
  })

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">
          Semua Laporan Genset
        </h1>

        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Kembali
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Tanggal</th>
              <th className="text-left">Regu</th>
              <th className="text-left">Solar</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Belum ada data
                </td>
              </tr>
            )}

            {data.map((r) => (
              <tr key={r.id} className="border-t text-black hover:bg-gray-50">

                <td className="px-6 py-3">
                  {new Date(r.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td>{r.regu}</td>

                <td>
                  {r.solarPemakaian != null
                    ? `${r.solarPemakaian}%`
                    : "-"}
                </td>

                <td className="px-6 py-3 text-right">
                  <Link
                    className="text-green-600 hover:underline"
                    href={`/reports/genset/${r.id}`}
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