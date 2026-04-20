import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reportId = Number(id)

    if (isNaN(reportId)) {
      return NextResponse.json(
        { error: 'Invalid report ID' },
        { status: 400 }
      )
    }

    // Try to find in genset reports first
    const gensetReport = await prisma.gensetReport.findUnique({
      where: { id: reportId },
      include: {
        inspections: {
          include: { item: true }
        }
      }
    })

    if (gensetReport) {
      return NextResponse.json({ ...gensetReport, type: 'genset' })
    }

    // Try to find in vehicle reports
    const vehicleReport = await prisma.vehicleReport.findUnique({
      where: { id: reportId },
      include: {
        inspections: {
          include: { item: true }
        }
      }
    })

    if (vehicleReport) {
      return NextResponse.json({ ...vehicleReport, type: 'vehicle' })
    }

    return NextResponse.json(
      { error: 'Report not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching report:', error)
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reportId = Number(id)

    if (isNaN(reportId)) {
      return NextResponse.json(
        { error: 'Invalid report ID' },
        { status: 400 }
      )
    }

    // Try to delete from genset reports first
    const deletedGenset = await prisma.gensetReport.deleteMany({
      where: { id: reportId }
    })

    if (deletedGenset.count > 0) {
      return NextResponse.json({ message: 'Genset report deleted successfully' })
    }

    // Try to delete from vehicle reports
    const deletedVehicle = await prisma.vehicleReport.deleteMany({
      where: { id: reportId }
    })

    if (deletedVehicle.count > 0) {
      return NextResponse.json({ message: 'Vehicle report deleted successfully' })
    }

    return NextResponse.json(
      { error: 'Report not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error deleting report:', error)
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reportId = Number(id)
    const body = await request.json()

    if (isNaN(reportId)) {
      return NextResponse.json(
        { error: 'Invalid report ID' },
        { status: 400 }
      )
    }

    // Check if it's a genset report
    const existingGenset = await prisma.gensetReport.findUnique({
      where: { id: reportId }
    })

    if (existingGenset) {
      const updated = await prisma.gensetReport.update({
        where: { id: reportId },
        data: {
          regu: body.regu,
          tanggal: new Date(body.tanggal),
          mesin: body.mesin,
          generator: body.generator,
          shift: body.shift,
          speed: body.speed ? Number(body.speed) : null,
          oliPress: body.oliPress ? Number(body.oliPress) : null,
          temp: body.temp ? Number(body.temp) : null,
          volt: body.volt ? Number(body.volt) : null,
          hz: body.hz ? Number(body.hz) : null,
          kw: body.kw ? Number(body.kw) : null,
          ampereR: body.ampereR ? Number(body.ampereR) : null,
          ampereS: body.ampereS ? Number(body.ampereS) : null,
          ampereT: body.ampereT ? Number(body.ampereT) : null,
          ampere: body.ampere ? Number(body.ampere) : null,
          solarLevelAwal: body.solarLevelAwal ? Number(body.solarLevelAwal) : null,
          solarLevelAkhir: body.solarLevelAkhir ? Number(body.solarLevelAkhir) : null,
          solarPemakaian: body.solarPemakaian ? Number(body.solarPemakaian) : null,
          gantiOliMesin: body.gantiOliMesin ? Number(body.gantiOliMesin) : null,
          gantiFilterOli: body.gantiFilterOli ? Number(body.gantiFilterOli) : null,
          gantiFilterSolar: body.gantiFilterSolar ? Number(body.gantiFilterSolar) : null,
          catatan: body.catatan
        }
      })
      return NextResponse.json(updated)
    }

    // Check if it's a vehicle report
    const existingVehicle = await prisma.vehicleReport.findUnique({
      where: { id: reportId }
    })

    if (existingVehicle) {
      const updated = await prisma.vehicleReport.update({
        where: { id: reportId },
        data: {
          tanggal: new Date(body.tanggal),
          unit: body.unit,
          catatan: body.catatan
        }
      })
      return NextResponse.json(updated)
    }

    return NextResponse.json(
      { error: 'Report not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error updating report:', error)
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    )
  }
}