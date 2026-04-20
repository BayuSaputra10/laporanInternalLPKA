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

    const totalGenset = await prisma.gensetReport.count()
    const totalVehicle = await prisma.vehicleReport.count()

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <h1 className="text-2xl font-bold mb-6 text-black flex items-center justify-center gap-2">
                Dashboard Laporan Internal Genset & Kendaraan LPKA Bandar Lampung
            </h1>

            {/* SUMMARY */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-500 text-white p-6 rounded-xl shadow">
                    <p className="text-sm opacity-80">Total Genset</p>
                    <h2 className="text-3xl font-bold">{totalGenset}</h2>
                </div>

                <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
                    <p className="text-sm opacity-80">Total Kendaraan</p>
                    <h2 className="text-3xl font-bold">{totalVehicle}</h2>
                </div>
            </div>

            {/* ACTION */}
            <div className="flex gap-4 mb-8">
                <Link href="/reports/genset/create" className="bg-green-600 text-white px-4 py-2 rounded">
                    + Laporan Genset
                </Link>

                <Link href="/reports/vehicle/create" className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Laporan Kendaraan
                </Link>
            </div>

            {/* ================= GENSET ================= */}
            <div className="bg-white p-4 rounded-xl shadow mb-8">
                <div className="flex justify-between mb-4">
                    <h2 className="font-semibold text-lg text-green-700">
                        Laporan Genset Terbaru
                    </h2>

                    <Link href="/reports/genset" className="text-sm text-green-600">
                        Lihat Semua →
                    </Link>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-left text-black">
                            <th className="py-2">Tanggal</th>
                            <th>Regu</th>
                            <th>Catatan</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gensetReports.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-4 text-slate-950">
                                    Belum ada data genset
                                </td>
                            </tr>
                        )}

                        {gensetReports.map((r) => (
                            <tr key={r.id} className="border-b hover:bg-gray-50 text-black">
                                <td className="py-2">
                                    <Link href={`/reports/genset/${r.id}`} className="block w-full">
                                        {new Date(r.tanggal).toLocaleDateString("id-ID")}
                                    </Link>
                                </td>
                                <td>{r.regu}</td>
                                <td>{r.catatan || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= VEHICLE ================= */}
            <div className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between mb-4">
                    <h2 className="font-semibold text-lg text-blue-700">
                        Laporan Kendaraan Terbaru
                    </h2>

                    <Link href="/reports/vehicle" className="text-sm text-blue-600">
                        Lihat Semua →
                    </Link>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-2">Tanggal</th>
                            <th>Unit</th>
                            <th>Catatan</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehicleReports.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-4 text-gray-500">
                                    Belum ada data kendaraan
                                </td>
                            </tr>
                        )}

                        {vehicleReports.map((r) => (
                            <tr key={r.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">
                                    <Link href={`/reports/vehicle/${r.id}`} className="block w-full">
                                        {new Date(r.tanggal).toLocaleDateString("id-ID")}
                                    </Link>
                                </td>
                                <td>{r.unit || "-"}</td>
                                <td>{r.catatan || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}