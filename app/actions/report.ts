"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteReport(id: number, type: "genset" | "vehicle") {
  try {
    if (type === "genset") {
      await prisma.gensetReport.delete({
        where: { id }
      })
    } else if (type === "vehicle") {
      await prisma.vehicleReport.delete({
        where: { id }
      })
    } else {
      throw new Error(`Invalid report type: ${type}`)
    }

    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Error deleting report:", error)
    throw new Error(`Failed to delete ${type} report: ${error instanceof Error ? error.message : String(error)}`)
  }
}