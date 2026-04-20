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
        catatan: catatan || null
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