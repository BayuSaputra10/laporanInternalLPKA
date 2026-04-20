import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jenisKendaraan = formData.get("jenisKendaraan") as string
    const keperluan = formData.get("keperluan") as string
    const tanggal = formData.get("tanggal") as string

    const kmAwal = Number(formData.get("kmAwal"))
    const kmAkhir = Number(formData.get("kmAkhir"))

    const solarAwalStrip = Number(formData.get("solarAwalStrip"))
    const solarAkhirStrip = Number(formData.get("solarAkhirStrip"))

    const kmPemakaian = kmAkhir - kmAwal
    const solarPemakaian = solarAwalStrip - solarAkhirStrip

    const photo = formData.get("photo") as File | null

    let fotoData: Buffer | null = null

    if (photo) {
      const bytes = await photo.arrayBuffer()
      fotoData = Buffer.from(bytes)
    }

    const report = await prisma.vehicleReport.create({
      data: {
        jenisKendaraan,
        keperluan,
        tanggal: new Date(tanggal),

        kmAwal,
        kmAkhir,
        kmPemakaian,

        solarAwalStrip,
        solarAkhirStrip,
        solarPemakaian,

        fotoData, // ✅ BASE64

        status: "draft"
      }
    })

    return NextResponse.json({
      success: true,
      data: report
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}