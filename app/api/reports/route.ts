import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const gensetReports = await prisma.gensetReport.findMany({
      orderBy: {
        id: "desc"
      }
    })

    const vehicleReports = await prisma.vehicleReport.findMany({
      orderBy: {
        id: "desc"
      }
    })

    const combined = [
      ...gensetReports.map(r => ({ ...r, type: 'genset' })),
      ...vehicleReports.map(r => ({ ...r, type: 'vehicle' }))
    ].sort((a, b) => b.id - a.id)

    return NextResponse.json(combined)
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}