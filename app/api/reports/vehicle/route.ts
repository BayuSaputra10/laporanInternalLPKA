import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jenisKendaraan = formData.get("jenisKendaraan")
    const keperluan = formData.get("keperluan")
    const tanggal = formData.get("tanggal")

    const kmAwal = Number(formData.get("kmAwal"))
    const kmAkhir = Number(formData.get("kmAkhir"))

    const solarAwalStrip = Number(formData.get("solarAwalStrip"))
    const solarAkhirStrip = Number(formData.get("solarAkhirStrip"))

    const photo = formData.get("photo") as File | null

    // 🔥 DEBUG LOG WAJIB
    console.log("VEHICLE PAYLOAD:", {
      jenisKendaraan,
      keperluan,
      tanggal,
      kmAwal,
      kmAkhir
    })

    // ❗ VALIDASI WAJIB
    if (!jenisKendaraan || !keperluan || !tanggal) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap" },
        { status: 400 }
      )
    }

    const kmPemakaian = kmAkhir - kmAwal
    const solarPemakaian = solarAwalStrip - solarAkhirStrip

    let fotoData: Buffer | null = null

    if (photo) {
      const bytes = await photo.arrayBuffer()
      fotoData = Buffer.from(bytes)
    }

    const report = await prisma.vehicleReport.create({
      data: {
        jenisKendaraan: String(jenisKendaraan),
        keperluan: String(keperluan),
        tanggal: new Date(String(tanggal)),

        kmAwal,
        kmAkhir,
        kmPemakaian,

        solarAwalStrip,
        solarAkhirStrip,
        solarPemakaian,

        fotoData: fotoData ?? null,

        status: "draft"
      }
    })

    console.log("CREATED VEHICLE REPORT:", report)

    return NextResponse.json({
      success: true,
      data: report
    })

  } catch (error) {
    console.error("VEHICLE API ERROR:", error)

    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    )
  }
}