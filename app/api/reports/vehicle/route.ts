/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jenisKendaraan = formData.get("jenisKendaraan")
    const keperluan = formData.get("keperluan")
    const tanggal = formData.get("tanggal")

    const kmAwalNum = Number(formData.get("kmAwal"))
    const kmAkhirNum = Number(formData.get("kmAkhir"))

    const solarAwalNum = Number(formData.get("solarAwalStrip"))
    const solarAkhirNum = Number(formData.get("solarAkhirStrip"))

    const photo = formData.get("photo") as File | null

    // =========================
    // DEBUG LOG (WAJIB DI VERCEL)
    // =========================
    console.log("VEHICLE PAYLOAD:", {
      jenisKendaraan,
      keperluan,
      tanggal,
      kmAwalNum,
      kmAkhirNum,
      solarAwalNum,
      solarAkhirNum
    })

    // =========================
    // VALIDASI FIELD WAJIB
    // =========================
    if (!jenisKendaraan || !keperluan || !tanggal) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap" },
        { status: 400 }
      )
    }

    // =========================
    // VALIDASI NUMBER (ANTI BUG SILENT FAIL)
    // =========================
    if (
      isNaN(kmAwalNum) ||
      isNaN(kmAkhirNum) ||
      isNaN(solarAwalNum) ||
      isNaN(solarAkhirNum)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Numeric field tidak valid (NaN detected)"
        },
        { status: 400 }
      )
    }

    // =========================
    // HITUNG DATA
    // =========================
    const kmPemakaian = kmAkhirNum - kmAwalNum
    const solarPemakaian = solarAwalNum - solarAkhirNum

    // =========================
    // HANDLE FILE
    // =========================
    let fotoData: Buffer | null = null

    if (photo) {
      const bytes = await photo.arrayBuffer()
      fotoData = Buffer.from(bytes)
    }

    // =========================
    // INSERT DATABASE
    // =========================
    const report = await prisma.vehicleReport.create({
      data: {
        jenisKendaraan: String(jenisKendaraan),
        keperluan: String(keperluan),
        tanggal: new Date(String(tanggal)),

        kmAwal: kmAwalNum,
        kmAkhir: kmAkhirNum,
        kmPemakaian,

        solarAwalStrip: solarAwalNum,
        solarAkhirStrip: solarAkhirNum,
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

  } catch (error: any) {
    console.error("VEHICLE API ERROR FULL:", error)

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
        code: error?.code || null,
        meta: error?.meta || null
      },
      { status: 500 }
    )
  }
}