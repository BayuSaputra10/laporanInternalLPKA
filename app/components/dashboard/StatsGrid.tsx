import { Truck, Zap, Fuel, Wrench } from "lucide-react"

interface StatsGridProps {
  data: {
    totalGenset: number
    totalVehicle: number
    totalVehicleFuel: number
    totalGensetFuel: number
    totalVehicleService: number
    totalGensetService: number
  }
}

export default function StatsGrid({ data }: StatsGridProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-6 md:gap-8 mb-20">
      {/* Total Laporan Genset */}
      <div className="group bg-gradient-to-br from-lpka-green/10 via-white/50 to-lpka-green/5 border-4 border-lpka-green/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-lpka-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Zap className="w-12 h-12 md:w-14 md:h-14 text-lpka-green drop-shadow-lg" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          Total Laporan Genset
        </h3>
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lpka-green to-[#10b981] bg-clip-text text-transparent drop-shadow-2xl">
          {data.totalGenset.toLocaleString()}
        </div>
      </div>

      {/* Total Laporan Kendaraan */}
      <div className="group bg-gradient-to-br from-lpka-primary/10 via-white/50 to-lpka-primary/5 border-4 border-lpka-primary/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-lpka-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Truck className="w-12 h-12 md:w-14 md:h-14 text-lpka-primary drop-shadow-lg" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          Total Laporan Kendaraan
        </h3>
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lpka-primary to-[#3b82f6] bg-clip-text text-transparent drop-shadow-2xl">
          {data.totalVehicle.toLocaleString()}
        </div>
      </div>

      {/* Solar Kendaraan */}
      <div className="group bg-gradient-to-br from-yellow-500/10 via-white/50 to-yellow-500/5 border-4 border-yellow-500/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Fuel className="w-12 h-12 md:w-14 md:h-14 text-yellow-600 drop-shadow-lg" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          Solar Kendaraan
        </h3>
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-600 to-[#d97706] bg-clip-text text-transparent drop-shadow-2xl">
          {data.totalVehicleFuel.toLocaleString()}
        </div>
      </div>

      {/* Solar Genset */}
      <div className="group bg-gradient-to-br from-orange-500/10 via-white/50 to-orange-500/5 border-4 border-orange-500/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Fuel className="w-12 h-12 md:w-14 md:h-14 text-orange-600 drop-shadow-lg" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          Solar Genset
        </h3>
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-[#c2410c] bg-clip-text text-transparent drop-shadow-2xl">
          {data.totalGensetFuel.toLocaleString()}
        </div>
      </div>

      {/* Servis Kendaraan */}
      <div className="group bg-gradient-to-br from-purple-500/10 via-white/50 to-purple-500/5 border-4 border-purple-500/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Wrench className="w-12 h-12 md:w-14 md:h-14 text-purple-600 drop-shadow-lg" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          Servis Kendaraan
        </h3>
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-[#7c3aed] bg-clip-text text-transparent drop-shadow-2xl">
          {data.totalVehicleService.toLocaleString()}
        </div>
      </div>

      {/* Servis Genset */}
      <div className="group bg-gradient-to-br from-pink-500/10 via-white/50 to-pink-500/5 border-4 border-pink-500/20 rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
          <Wrench className="w-12 h-12 md:w-14 md:h-14 text-pink-600 drop-shadow-lg" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          Servis Genset
        </h3>
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl">
          {data.totalGensetService.toLocaleString()}
        </div>
      </div>
    </section>
  )
}