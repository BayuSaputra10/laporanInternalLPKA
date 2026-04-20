import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface InspectionItem {
  itemId: number
  kondisi: string
  keterangan: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      tanggal,
      unit,
      kmAwal,
      kmAkhir,
      solarAwal,
      solarAkhir,
      catatan,
      inspections
    } = body

    // VALIDASI WAJIB
    if (!tanggal) {
      return NextResponse.json(
        { error: "Tanggal wajib diisi" },
        { status: 400 }
      )
    }

    const report = await prisma.vehicleReport.create({
      data: {
        tanggal: new Date(tanggal),
        unit: unit || null,
        kmAwal: kmAwal !== undefined && kmAwal !== null ? Number(kmAwal) : null,
        kmAkhir: kmAkhir !== undefined && kmAkhir !== null ? Number(kmAkhir) : null,
        solarAwal: solarAwal !== undefined && solarAwal !== null ? Number(solarAwal) : null,
        solarAkhir: solarAkhir !== undefined && solarAkhir !== null ? Number(solarAkhir) : null,
        catatan: catatan || null,
        inspections: inspections ? {
          create: inspections.map((item: InspectionItem) => ({
            itemId: item.itemId,
            kondisi: item.kondisi,
            keterangan: item.keterangan
          }))
        } : undefined
      }
    })

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error("Error creating vehicle report:", error)
    return NextResponse.json(
      { error: "Failed to create vehicle report" },
      { status: 500 }
    )
  }
}