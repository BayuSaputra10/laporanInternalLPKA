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

  const vehicleFuelReports = await prisma.vehicleFuelReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const gensetFuelReports = await prisma.gensetFuelReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const vehicleServiceReports = await prisma.vehicleServiceReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const gensetServiceReports = await prisma.gensetServiceReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const totalGenset = await prisma.gensetReport.count()
  const totalVehicle = await prisma.vehicleReport.count()
  const totalVehicleFuel = await prisma.vehicleFuelReport.count()
  const totalGensetFuel = await prisma.gensetFuelReport.count()
  const totalVehicleService = await prisma.vehicleServiceReport.count()
  const totalGensetService = await prisma.gensetServiceReport.count()

  // Hitung total gabungan
  const totalKendaraan = totalVehicle + totalVehicleFuel + totalVehicleService
  const totalGensetAll = totalGenset + totalGensetFuel + totalGensetService

  return NextResponse.json({
    gensetReports,
    vehicleReports,
    vehicleFuelReports,
    gensetFuelReports,
    vehicleServiceReports,
    gensetServiceReports,
    totalGenset,
    totalVehicle,
    totalVehicleFuel,
    totalGensetFuel,
    totalVehicleService,
    totalGensetService,
    totalKendaraan,
    totalGensetAll
  })
}

