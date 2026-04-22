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

export interface FooterData {
  todayTotal: number;
  todayGenset: number;
  todayVehicle: number;
  pending: number;
  activeTeams: number;
}

export interface DashboardData {
  gensetReports: GensetReport[];
  vehicleReports: VehicleReport[];
  totalGenset: number;
  totalVehicle: number;
  footerData: FooterData;
}

