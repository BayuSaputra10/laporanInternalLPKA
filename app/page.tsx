import { prisma } from "@/lib/prisma"
import DashboardClient from "@/components/DashboardClient"

export default async function Dashboard() {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
        throw new Error(
            'DATABASE_URL environment variable is not set. ' +
            'Please configure it in Vercel or your hosting platform.'
        )
    }

    let gensetReports = []
    let vehicleReports = []
    let totalGenset = 0
    let totalVehicle = 0

    try {
        gensetReports = await prisma.gensetReport.findMany({
            take: 20,
            orderBy: { id: "desc" }
        })

        vehicleReports = await prisma.vehicleReport.findMany({
            take: 20,
            orderBy: { id: "desc" }
        })

        totalGenset = await prisma.gensetReport.count()
        totalVehicle = await prisma.vehicleReport.count()
    } catch (error) {
        console.error('Database connection error:', error)
        throw new Error(
            'Failed to connect to database. ' +
            'Please check your DATABASE_URL and ensure the database is running. ' +
            'Error: ' + (error instanceof Error ? error.message : String(error))
        )
    }

    const combinedReports = [
        ...gensetReports.map((r) => ({
            ...r,
            type: "genset" as const,
            tanggal: r.tanggal.toISOString()
        })),
        ...vehicleReports.map((r) => ({
            ...r,
            type: "vehicle" as const,
            tanggal: r.tanggal.toISOString()
        }))
    ]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, 20)

    return (
        <DashboardClient
            initialReports={combinedReports}
            totalGenset={totalGenset}
            totalVehicle={totalVehicle}
        />
    )
}