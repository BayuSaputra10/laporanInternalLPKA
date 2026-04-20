import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function GET() {
  const data = await prisma.inspectionItem.findMany()
  return NextResponse.json(data)
}