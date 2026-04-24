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

    const validSortFields = ['id', 'tanggal', 'jenisKendaraan', 'tambahSolar', 'createdAt']
    if (!validSortFields.includes(sortBy as any)) {
      return NextResponse.json({ error: 'Invalid sortBy field' }, { status: 400 })
    }

    const skip = (page - 1) * limit

    const orderByMap: Record<string, Prisma.VehicleFuelReportOrderByWithRelationInput> = {
      id: { id: sortDir },
      tanggal: { tanggal: sortDir },
      jenisKendaraan: { jenisKendaraan: sortDir },
      tambahSolar: { tambahSolar: sortDir },
      createdAt: { createdAt: sortDir }
    };
    const orderBy = orderByMap[sortBy] || { tanggal: 'desc' };

    const [data, total] = await Promise.all([
      prisma.vehicleFuelReport.findMany({
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          tanggal: true,
          jenisKendaraan: true,
          tambahSolar: true,
          createdAt: true
        }
      }),
      prisma.vehicleFuelReport.count()
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
    console.error('GET Vehicle Fuel Reports Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jenisKendaraan = formData.get("jenisKendaraan")
    const tambahSolar = Number(formData.get("tambahSolar"))
    const tanggal = formData.get("tanggal")
    const photo = formData.get("photo") as File | null

    if (photo && !photo.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: "Hanya file foto yang diizinkan untuk upload" },
        { status: 400 }
      )
    }

    console.log("VEHICLE FUEL PAYLOAD:", {
      jenisKendaraan,
      tambahSolar,
      tanggal
    })

    if (!jenisKendaraan || !tanggal) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap" },
        { status: 400 }
      )
    }

    if (isNaN(tambahSolar) || tambahSolar <= 0) {
      return NextResponse.json(
        { success: false, message: "Jumlah solar tidak valid (harus > 0)" },
        { status: 400 }
      )
    }

    let fotoStruk: Buffer | null = null
    if (photo) {
      const bytes = await photo.arrayBuffer()
      fotoStruk = Buffer.from(bytes)
    }

    const report = await prisma.vehicleFuelReport.create({
      data: {
        jenisKendaraan: String(jenisKendaraan),
        tambahSolar,
        tanggal: new Date(String(tanggal)),
        fotoStruk: fotoStruk ?? null
      }
    })

    console.log("CREATED VEHICLE FUEL REPORT:", report)

    return NextResponse.json({
      success: true,
      data: report
    })

  } catch (error: any) {
    console.error("VEHICLE FUEL API ERROR FULL:", error)
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

    await prisma.vehicleFuelReport.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE Vehicle Fuel Report Error:', error)
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}
