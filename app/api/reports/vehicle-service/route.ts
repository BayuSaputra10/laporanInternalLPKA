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

    const validSortFields = ['id', 'tanggal', 'jenisKendaraan', 'createdAt']
    if (!validSortFields.includes(sortBy as any)) {
      return NextResponse.json({ error: 'Invalid sortBy field' }, { status: 400 })
    }

    const skip = (page - 1) * limit

    const orderByMap: Record<string, Prisma.VehicleServiceReportOrderByWithRelationInput> = {
      id: { id: sortDir },
      tanggal: { tanggal: sortDir },
      jenisKendaraan: { jenisKendaraan: sortDir },
      createdAt: { createdAt: sortDir }
    };
    const orderBy = orderByMap[sortBy] || { tanggal: 'desc' };

    const [data, total] = await Promise.all([
      prisma.vehicleServiceReport.findMany({
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          tanggal: true,
          jenisKendaraan: true,
          catatan: true,
          createdAt: true
        }
      }),
      prisma.vehicleServiceReport.count()
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
    console.error('GET Vehicle Service Reports Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jenisKendaraan = formData.get("jenisKendaraan")
    const tanggal = formData.get("tanggal")
    const catatan = formData.get("catatan")
    const photo = formData.get("photo") as File | null

    if (photo && !photo.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: "Hanya file foto yang diizinkan untuk upload" },
        { status: 400 }
      )
    }

    console.log("VEHICLE SERVICE PAYLOAD:", {
      jenisKendaraan,
      tanggal,
      catatan
    })

    if (!jenisKendaraan || !tanggal || !catatan) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap" },
        { status: 400 }
      )
    }

    let fotoServis: Buffer | null = null
    if (photo) {
      const bytes = await photo.arrayBuffer()
      fotoServis = Buffer.from(bytes)
    }

    const report = await prisma.vehicleServiceReport.create({
      data: {
        jenisKendaraan: String(jenisKendaraan),
        tanggal: new Date(String(tanggal)),
        catatan: String(catatan),
        fotoServis: fotoServis ?? null
      }
    })

    console.log("CREATED VEHICLE SERVICE REPORT:", report)

    return NextResponse.json({
      success: true,
      data: report
    })

  } catch (error: any) {
    console.error("VEHICLE SERVICE API ERROR FULL:", error)
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

    await prisma.vehicleServiceReport.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE Vehicle Service Report Error:', error)
    return NextResponse.json({ error: 'Failed to delete report' }, { status: 500 })
  }
}

