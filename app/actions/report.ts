"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteReport(id: number, type: "genset" | "vehicle" | "vehicle-fuel" | "genset-fuel" | "vehicle-service" | "genset-service") {
  try {
    if (type === "genset") {
      await prisma.gensetReport.delete({
        where: { id }
      })
    } else if (type === "vehicle") {
      await prisma.vehicleReport.delete({
        where: { id }
      })
    } else if (type === "vehicle-fuel") {
      await prisma.vehicleFuelReport.delete({
        where: { id }
      })
    } else if (type === "genset-fuel") {
      await prisma.gensetFuelReport.delete({
        where: { id }
      })
    } else if (type === "vehicle-service") {
      await prisma.vehicleServiceReport.delete({
        where: { id }
      })
    } else if (type === "genset-service") {
      await prisma.gensetServiceReport.delete({
        where: { id }
      })
    } else {
      throw new Error(`Invalid report type: ${type}`)
    }

    revalidatePath("/reports/vehicle")
    revalidatePath("/reports/genset")
    revalidatePath("/reports/vehicle-fuel")
    revalidatePath("/reports/genset-fuel")
    revalidatePath("/reports/vehicle-service")
    revalidatePath("/reports/genset-service")
    revalidatePath("/")
  } catch (error) {
    console.error("Error deleting report:", error)
    throw new Error(`Failed to delete ${type} report: ${error instanceof Error ? error.message : String(error)}`)
  }
}
