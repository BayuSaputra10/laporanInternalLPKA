import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import VehicleServiceDetailClient from "./VehicleServiceDetailClient"

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const data = await prisma.vehicleServiceReport.findUnique({
    where: { id: numericId }
  })

  if (!data) return notFound()

  const safeData = {
    id: data.id,
    jenisKendaraan: data.jenisKendaraan,
    tanggal: data.tanggal,
    catatan: data.catatan,
    createdAt: data.createdAt,
    photoBase64: data.fotoServis
      ? Buffer.from(data.fotoServis).toString("base64")
      : null
  }

  return <VehicleServiceDetailClient data={safeData} />
}

