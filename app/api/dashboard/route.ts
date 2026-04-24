import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  // Jalankan semua query secara paralel untuk mengurangi latency
  const [
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
  ] = await Promise.all([
    prisma.gensetReport.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: { id: true, regu: true, tanggal: true },
    }),
    prisma.vehicleReport.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: { id: true, jenisKendaraan: true, tanggal: true },
    }),
    prisma.vehicleFuelReport.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: { id: true, jenisKendaraan: true, tambahSolar: true, tanggal: true },
    }),
    prisma.gensetFuelReport.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: { id: true, tambahSolar: true, tanggal: true },
    }),
    prisma.vehicleServiceReport.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: { id: true, jenisKendaraan: true, tanggal: true },
    }),
    prisma.gensetServiceReport.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: { id: true, catatan: true, tanggal: true },
    }),
    prisma.gensetReport.count(),
    prisma.vehicleReport.count(),
    prisma.vehicleFuelReport.count(),
    prisma.gensetFuelReport.count(),
    prisma.vehicleServiceReport.count(),
    prisma.gensetServiceReport.count(),
  ])

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
    totalGensetAll,
  })
}

