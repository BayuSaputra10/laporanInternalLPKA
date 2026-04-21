/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Prisma } from '@prisma/client'

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10')))
    const sortBy = searchParams.get('sortBy') || 'tanggal'
    const sortDir = (searchParams.get('sortDir') || 'desc') as 'asc' | 'desc'

    // Validate sortBy
    const validSortFields = ['id', 'tanggal', 'jenisKendaraan', 'keperluan', 'kmAkhir', 'createdAt']
    if (!validSortFields.includes(sortBy as any)) {
      return NextResponse.json({ error: 'Invalid sortBy field' }, { status: 400 })
    }

    const skip = (page - 1) * limit

    const orderByMap: Record<string, Prisma.VehicleReportOrderByWithRelationInput> = {
      id: { id: sortDir },
      tanggal: { tanggal: sortDir },
      jenisKendaraan: { jenisKendaraan: sortDir },
      keperluan: { keperluan: sortDir },
      kmAkhir: { kmAkhir: sortDir },
      createdAt: { createdAt: sortDir }
    };
    const orderBy = orderByMap[sortBy] || { tanggal: 'desc' };

    const [data, total] = await Promise.all([
      prisma.vehicleReport.findMany({
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          tanggal: true,
          jenisKendaraan: true,
          keperluan: true,
          kmAwal: true,
          kmAkhir: true,
          createdAt: true
        }
      }),
      prisma.vehicleReport.count()
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: total,
        pageSize: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('GET Vehicle Reports Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

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
    // PHOTO VALIDATION - HANYA GAMBAR
    // =========================
    if (photo && !photo.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: "Hanya file foto yang diizinkan untuk upload" },
        { status: 400 }
      )
    }

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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    if (id <= 0) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.vehicleReport.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE Vehicle Report Error:', error)
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
