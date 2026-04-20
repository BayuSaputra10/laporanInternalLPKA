/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const report = await prisma.report.create({
      data: {
        type: "vehicle",
        tanggal: new Date(),
        catatan: body.catatan,

        vehicle: {
          create: {
            vehicleName: body.vehicleName,
            kmAwal: body.kmAwal,
            kmAkhir: body.kmAkhir,
            solarAwal: body.solarAwal,
            solarAkhir: body.solarAkhir,
          }
        },

        inspections: {
          create: body.inspections.map((item: any) => ({
            itemId: item.itemId, // ✅ FIX DI SINI
            kondisi: item.kondisi,
            keterangan: item.keterangan
          }))
        }
      }
    })

    return Response.json(report)
  } catch (error) {
    console.error(error)
    return new Response("Error", { status: 500 })
  }
}