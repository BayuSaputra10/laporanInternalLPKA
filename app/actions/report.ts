"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteReport(id: number) {
  await prisma.report.delete({
    where: { id }
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}