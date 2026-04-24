import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import VehicleDetailClient from "./VehicleDetailClient"

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const data = await prisma.vehicleReport.findUnique({
    where: { id: numericId }
  })

  if (!data) return notFound()

  const safeData = {
    id: data.id,
    jenisKendaraan: data.jenisKendaraan,
    namaDriver: data.namaDriver,
    keperluan: data.keperluan,
    tanggal: data.tanggal,

    kmAwal: data.kmAwal,
    kmAkhir: data.kmAkhir,
    kmPemakaian: data.kmPemakaian,

    solarAwalStrip: data.solarAwalStrip,
    solarAkhirStrip: data.solarAkhirStrip,
    solarPemakaian: data.solarPemakaian,

    createdAt: data.createdAt,

    // 🔥 BASE64 CONVERT
    photoBase64: data.fotoData
      ? Buffer.from(data.fotoData).toString("base64")
      : null
  }

  return <VehicleDetailClient data={safeData} />
}