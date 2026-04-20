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
      where: { id: reportId }
    })

    if (gensetReport) {
      return NextResponse.json({ ...gensetReport, type: 'genset' })
    }

    // Try to find in vehicle reports
    const vehicleReport = await prisma.vehicleReport.findUnique({
      where: { id: reportId }
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