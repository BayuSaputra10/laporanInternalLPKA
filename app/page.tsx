import DashboardHeader from "@/app/components/DashboardHeader"
import Footer from "@/app/components/Footer"
import { ActionButtons, AppAboutSection, DashboardCharts, RecentActivity } from "@/app/components/dashboard"

export const revalidate = 0

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/dashboard`, {
    cache: "no-store",
  })

  const dashboardData = res.ok
    ? await res.json()
    : {
        totalVehicle: 0,
        totalVehicleFuel: 0,
        totalVehicleService: 0,
        totalGenset: 0,
        totalGensetFuel: 0,
        totalGensetService: 0,
        totalKendaraan: 0,
        totalGensetAll: 0,
        vehicleReports: [],
        gensetReports: [],
        vehicleFuelReports: [],
        gensetFuelReports: [],
        vehicleServiceReports: [],
        gensetServiceReports: [],
      }

  const footerData = {
    todayTotal: dashboardData.totalKendaraan + dashboardData.totalGensetAll,
    todayGenset: dashboardData.totalGenset,
    todayVehicle: dashboardData.totalVehicle,
    todayVehicleFuel: dashboardData.totalVehicleFuel,
    todayGensetFuel: dashboardData.totalGensetFuel,
    todayVehicleService: dashboardData.totalVehicleService,
    todayGensetService: dashboardData.totalGensetService,
    pending: 0,
    activeTeams: 4,
  }

  return (
    <>
      <DashboardHeader />
      <ActionButtons />
      <DashboardCharts data={dashboardData} />
      <RecentActivity
        vehicleReports={dashboardData.vehicleReports || []}
        gensetReports={dashboardData.gensetReports || []}
        vehicleFuelReports={dashboardData.vehicleFuelReports || []}
        gensetFuelReports={dashboardData.gensetFuelReports || []}
        vehicleServiceReports={dashboardData.vehicleServiceReports || []}
        gensetServiceReports={dashboardData.gensetServiceReports || []}
      />
      <AppAboutSection />
      <Footer footerData={footerData} />
    </>
  )
}

