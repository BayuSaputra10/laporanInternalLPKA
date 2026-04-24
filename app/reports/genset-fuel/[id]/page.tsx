import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import GensetFuelDetailClient from "./GensetFuelDetailClient"

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const numericId = Number(id)

  if (isNaN(numericId)) return notFound()

  const data = await prisma.gensetFuelReport.findUnique({
    where: { id: numericId }
  })

  if (!data) return notFound()

  const safeData = {
    id: data.id,
    tambahSolar: data.tambahSolar,
    tanggal: data.tanggal,
    createdAt: data.createdAt,
    photoBase64: data.fotoStruk
      ? Buffer.from(data.fotoStruk).toString("base64")
      : null
  }

  return <GensetFuelDetailClient data={safeData} />
}

