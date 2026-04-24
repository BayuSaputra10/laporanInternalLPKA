import DashboardHeader from "@/app/components/DashboardHeader"
import Footer from "@/app/components/Footer"
import { ActionButtons, AppAboutSection, DashboardCharts, RecentActivity } from "@/app/components/dashboard"
import { getDashboardData } from "@/lib/dashboard"

export default async function Page() {
  const dashboardData = await getDashboardData()

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

