import { prisma } from '@/lib/prisma'

export async function GET() {
  const reports = await prisma.report.findMany({
    include: {
      vehicle: true,
      genset: true
    },
    orderBy: {
      id: "desc"
    }
  })

  return Response.json(reports)
}