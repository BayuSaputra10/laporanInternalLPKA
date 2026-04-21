/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Prisma } from '@prisma/client'


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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    if (id <= 0) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    await prisma.gensetReport.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE Genset Report Error:', error)
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10')))
    const sortBy = searchParams.get('sortBy') || 'tanggal'
    const sortDir = (searchParams.get('sortDir') || 'desc') as 'asc' | 'desc'

    // Validate sortBy
const validSortFields = ['id', 'tanggal', 'regu', 'solarPemakaian', 'createdAt']
    if (!validSortFields.includes(sortBy as any)) {
      return NextResponse.json({ error: 'Invalid sortBy field' }, { status: 400 })
    }

    const skip = (page - 1) * limit

    const orderByMap: Record<string, Prisma.GensetReportOrderByWithRelationInput> = {
      id: { id: sortDir },
      tanggal: { tanggal: sortDir },
      regu: { regu: sortDir },
      solarPemakaian: { solarPemakaian: sortDir },
      createdAt: { createdAt: sortDir }
    };
    const orderBy = orderByMap[sortBy] || { tanggal: 'desc' };

    const [data, total] = await Promise.all([
      prisma.gensetReport.findMany({
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          tanggal: true,
          regu: true,
          solarPemakaian: true,
          createdAt: true
        }
      }),
      prisma.gensetReport.count()
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
    console.error('GET Genset Reports Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

