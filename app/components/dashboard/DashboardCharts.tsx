"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"
import { Truck, Zap } from "lucide-react"

interface DashboardChartsProps {
  data: {
    totalVehicle: number
    totalVehicleFuel: number
    totalVehicleService: number
    totalGenset: number
    totalGensetFuel: number
    totalGensetService: number
    totalKendaraan: number
    totalGensetAll: number
  }
}

const VEHICLE_COLORS = ["#1e40af", "#3b82f6", "#60a5fa"]
const GENSET_COLORS = ["#047857", "#10b981", "#34d399"]

export default function DashboardCharts({ data }: DashboardChartsProps) {
  const vehicleData = [
    { name: "Laporan Harian", value: data.totalVehicle },
    { name: "Pengisian Solar", value: data.totalVehicleFuel },
    { name: "Servis", value: data.totalVehicleService },
  ].filter((item) => item.value > 0)

  const gensetData = [
    { name: "Laporan Harian", value: data.totalGenset },
    { name: "Pengisian Solar", value: data.totalGensetFuel },
    { name: "Servis", value: data.totalGensetService },
  ].filter((item) => item.value > 0)

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Laporan Kendaraan */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-lpka-primary/20 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-lpka-primary/20 rounded-2xl flex items-center justify-center shrink-0">
              <Truck className="w-7 h-7 text-lpka-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900">
                Laporan Kendaraan
              </h2>
              <p className="text-sm text-gray-500">
                Total: {data.totalKendaraan.toLocaleString()} laporan
              </p>
            </div>
          </div>

          <div className="h-80">
            {vehicleData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) =>
                      percent && percent > 0.05
                        ? `${(percent * 100).toFixed(0)}%`
                        : ""
                    }
                    outerRadius={110}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="none"
                  >
                    {vehicleData.map((entry, index) => (
                      <Cell
                        key={`cell-v-${index}`}
                        fill={VEHICLE_COLORS[index % VEHICLE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => {
                      const num = typeof value === "number" ? value : 0
                      return [`${num.toLocaleString()} laporan`, "Jumlah"]
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: "14px", paddingTop: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Belum ada data laporan kendaraan
              </div>
            )}
          </div>
        </div>

        {/* Chart Laporan Genset */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-lpka-green/20 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-lpka-green/20 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7 text-lpka-green" />
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900">
                Laporan Genset
              </h2>
              <p className="text-sm text-gray-500">
                Total: {data.totalGensetAll.toLocaleString()} laporan
              </p>
            </div>
          </div>

          <div className="h-80">
            {gensetData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gensetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) =>
                      percent && percent > 0.05
                        ? `${(percent * 100).toFixed(0)}%`
                        : ""
                    }
                    outerRadius={110}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="none"
                  >
                    {gensetData.map((entry, index) => (
                      <Cell
                        key={`cell-g-${index}`}
                        fill={GENSET_COLORS[index % GENSET_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => {
                      const num = typeof value === "number" ? value : 0
                      return [`${num.toLocaleString()} laporan`, "Jumlah"]
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: "14px", paddingTop: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Belum ada data laporan genset
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

