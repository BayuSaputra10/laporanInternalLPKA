import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const regu = formData.get("regu") as string
    const tanggal = formData.get("tanggal") as string

    const waktuPemakaianJam = Number(formData.get("waktuPemakaianJam"))
    const hourMeterAwal = Number(formData.get("hourMeterAwal"))
    const hourMeterAkhir = Number(formData.get("hourMeterAkhir"))

    const solarLevelAwal = Number(formData.get("solarLevelAwal"))
    const solarLevelAkhir = Number(formData.get("solarLevelAkhir"))

    const solarPemakaian = solarLevelAwal - solarLevelAkhir

    const photo = formData.get("photo") as File | null

    // =========================
    // PHOTO VALIDATION - HANYA GAMBAR
    // =========================
    if (photo && !photo.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: "Hanya file foto yang diizinkan untuk upload" },
        { status: 400 }
      )
    }

    let photoData: Buffer | null = null

    if (photo) {
      const bytes = await photo.arrayBuffer()
      photoData = Buffer.from(bytes)
    }

    const report = await prisma.gensetReport.create({
      data: {
        regu,
        tanggal: new Date(tanggal),

        waktuPemakaianJam,
        hourMeterAwal,
        hourMeterAkhir,

        solarLevelAwal,
        solarLevelAkhir,
        solarPemakaian,

        photoData, // ✅ BASE64/BINARY

        createdAt: new Date()
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