import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface InspectionItem {
  itemId: string
  kondisi: string
  keterangan: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      regu,
      tanggal,
      mesin,
      generator,
      shift,
      speed,
      oliPress,
      temp,
      volt,
      hz,
      kw,
      ampereR,
      ampereS,
      ampereT,
      ampere,
      solarLevelAwal,
      solarLevelAkhir,
      solarPemakaian,
      gantiOliMesin,
      gantiFilterOli,
      gantiFilterSolar,
      catatan,
      inspections
    } = body

    // VALIDASI WAJIB
    if (!regu || !tanggal) {
      return NextResponse.json(
        { error: "Regu dan tanggal wajib diisi" },
        { status: 400 }
      )
    }

    const report = await prisma.gensetReport.create({
      data: {
        regu,
        tanggal: new Date(tanggal),
        mesin,
        generator,
        shift,

        speed,
        oliPress,
        temp,

        volt,
        hz,
        kw,

        ampereR,
        ampereS,
        ampereT,
        ampere,

        solarLevelAwal,
        solarLevelAkhir,
        solarPemakaian,

        gantiOliMesin,
        gantiFilterOli,
        gantiFilterSolar,

        catatan,

        inspections: {
          create: inspections.map((item: InspectionItem) => ({
            itemId: item.itemId,
            kondisi: item.kondisi,
            keterangan: item.keterangan
          }))
        }
      }
    })

    return NextResponse.json(report)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}