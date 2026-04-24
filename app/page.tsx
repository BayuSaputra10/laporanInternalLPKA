import { prisma } from "@/lib/prisma"
import DashboardHeader from "@/app/components/DashboardHeader"
import Footer from "@/app/components/Footer"
import {
  StatsGrid,
  ActionButtons,
  LatestGensetReports,
  LatestVehicleReports,
  LatestVehicleFuelReports,
  LatestGensetFuelReports,
  LatestVehicleServiceReports,
  LatestGensetServiceReports
} from "@/app/components/dashboard"
import type { GensetReport, VehicleReport, VehicleFuelReport, GensetFuelReport, VehicleServiceReport, GensetServiceReport } from "@/lib/types"

async function getDashboardData() {
  const now = new Date()
  const jakartaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
  const today = new Date(jakartaNow)
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [gensetReports, vehicleReports, vehicleFuelReports, gensetFuelReports, vehicleServiceReports, gensetServiceReports, totalGenset, totalVehicle, totalVehicleFuel, totalGensetFuel, totalVehicleService, totalGensetService, pendingVehicle, distinctRegu, todayGenset] = await Promise.all([
    prisma.gensetReport.findMany({ take: 5, orderBy: { id: "desc" } }),
    prisma.vehicleReport.findMany({ take: 5, orderBy: { id: "desc" } }),
    prisma.vehicleFuelReport.findMany({ take: 5, orderBy: { id: "desc" } }),
    prisma.gensetFuelReport.findMany({ take: 5, orderBy: { id: "desc" } }),
    prisma.vehicleServiceReport.findMany({ take: 5, orderBy: { id: "desc" } }),
    prisma.gensetServiceReport.findMany({ take: 5, orderBy: { id: "desc" } }),
    prisma.gensetReport.count(),
    prisma.vehicleReport.count(),
    prisma.vehicleFuelReport.count(),
    prisma.gensetFuelReport.count(),
    prisma.vehicleServiceReport.count(),
    prisma.gensetServiceReport.count(),
    prisma.vehicleReport.count({ where: { status: "draft" } }),
    prisma.gensetReport.groupBy({ by: ["regu"], _count: { regu: true } }),
    prisma.gensetReport.count({ where: { tanggal: { gte: today, lt: tomorrow } } })
  ])

  const [todayVehicle, todayVehicleFuel, todayGensetFuel, todayVehicleService, todayGensetService] = await Promise.all([
    prisma.vehicleReport.count({ where: { tanggal: { gte: today, lt: tomorrow } } }),
    prisma.vehicleFuelReport.count({ where: { tanggal: { gte: today, lt: tomorrow } } }),
    prisma.gensetFuelReport.count({ where: { tanggal: { gte: today, lt: tomorrow } } }),
    prisma.vehicleServiceReport.count({ where: { tanggal: { gte: today, lt: tomorrow } } }),
    prisma.gensetServiceReport.count({ where: { tanggal: { gte: today, lt: tomorrow } } })
  ])

  const todayTotal = todayGenset + todayVehicle + todayVehicleFuel + todayGensetFuel + todayVehicleService

  return {
    gensetReports: gensetReports as unknown as GensetReport[],
    vehicleReports: vehicleReports as unknown as VehicleReport[],
    vehicleFuelReports: vehicleFuelReports as unknown as VehicleFuelReport[],
    gensetFuelReports: gensetFuelReports as unknown as GensetFuelReport[],
    vehicleServiceReports: vehicleServiceReports as unknown as VehicleServiceReport[],
    gensetServiceReports: gensetServiceReports as unknown as GensetServiceReport[],
    stats: { totalGenset, totalVehicle, totalVehicleFuel, totalGensetFuel, totalVehicleService, totalGensetService },
    footerData: {
      todayTotal,
      todayGenset,
      todayVehicle,
      todayVehicleFuel,
      todayGensetFuel,
      todayVehicleService,
      todayGensetService,
      pending: pendingVehicle,
      activeTeams: distinctRegu.length
    }
  }
}

export const revalidate = 0

export default async function Page() {
  const data = await getDashboardData()

  return (
    <>
      <DashboardHeader />
      <StatsGrid data={data.stats} />
      <ActionButtons />
      <LatestGensetReports reports={data.gensetReports} />
      <LatestVehicleReports reports={data.vehicleReports} />
      <LatestVehicleFuelReports reports={data.vehicleFuelReports} />
      <LatestGensetFuelReports reports={data.gensetFuelReports} />
      <LatestVehicleServiceReports reports={data.vehicleServiceReports} />
      <LatestGensetServiceReports reports={data.gensetServiceReports} />
      <Footer footerData={data.footerData} />
    </>
  )
}