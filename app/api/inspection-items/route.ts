import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")

  const items = await prisma.inspectionItem.findMany({
    where: { type: type || undefined },
    orderBy: { id: "asc" }
  })

  return Response.json(items)
}