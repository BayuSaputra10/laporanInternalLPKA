// Types for dashboard and reports
export interface GensetReport {
  id: number;
  regu: string;
  tanggal: string;
  waktuPemakaianJam: number;
  hourMeterAwal: number;
  hourMeterAkhir: number;
  solarLevelAwal: number;
  solarLevelAkhir: number;
  solarPemakaian: number | null;
  createdAt: string;
}

export interface VehicleReport {
  id: number;
  jenisKendaraan: string;
  namaDriver: string;
  keperluan: string;
  tanggal: string;
  kmAwal: number;
  kmAkhir: number;
  kmPemakaian: number | null;
  solarAwalStrip: number;
  solarAkhirStrip: number;
  solarPemakaian: number | null;
  createdAt: string;
}

export interface VehicleFuelReport {
  id: number;
  jenisKendaraan: string;
  tambahSolar: number;
  tanggal: string;
  createdAt: string;
}

export interface GensetFuelReport {
  id: number;
  tambahSolar: number;
  tanggal: string;
  createdAt: string;
}

export interface FooterData {
  todayTotal: number;
  todayGenset: number;
  todayVehicle: number;
  todayVehicleFuel: number;
  todayGensetFuel: number;
  pending: number;
  activeTeams: number;
}

export interface DashboardData {
  gensetReports: GensetReport[];
  vehicleReports: VehicleReport[];
  vehicleFuelReports: VehicleFuelReport[];
  gensetFuelReports: GensetFuelReport[];
  totalGenset: number;
  totalVehicle: number;
  totalVehicleFuel: number;
  totalGensetFuel: number;
  footerData: FooterData;
}

