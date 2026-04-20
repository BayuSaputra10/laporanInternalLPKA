import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
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

  return NextResponse.json({
    gensetReports,
    vehicleReports,
    totalGenset,
    totalVehicle
  })
}