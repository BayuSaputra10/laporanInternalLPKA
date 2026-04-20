import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import GensetDetailClient from "./GensetDetailClient"

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const data = await prisma.gensetReport.findUnique({
    where: { id: numericId }
  })

  if (!data) return notFound()

  const safeData = {
    id: data.id,
    regu: data.regu,
    tanggal: data.tanggal,
    waktuPemakaianJam: data.waktuPemakaianJam,
    hourMeterAwal: data.hourMeterAwal,
    hourMeterAkhir: data.hourMeterAkhir,
    solarLevelAwal: data.solarLevelAwal,
    solarLevelAkhir: data.solarLevelAkhir,
    solarPemakaian: data.solarPemakaian,
    createdAt: data.createdAt,

    // 🔥 BASE64 CONVERT
    photoBase64: data.photoData
      ? Buffer.from(data.photoData).toString("base64")
      : null
  }

  return <GensetDetailClient data={safeData} />
}