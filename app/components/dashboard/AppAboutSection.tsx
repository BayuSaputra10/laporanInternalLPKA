"use client"

import { ShieldCheck, Zap, Truck, BarChart3, Clock, Fingerprint } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Pelaporan Terintegrasi",
    desc: "Satukan laporan harian, solar, dan servis dalam satu platform.",
    color: "from-blue-500 to-lpka-primary",
  },
  {
    icon: Clock,
    title: "Update Real-time",
    desc: "Data langsung tersimpan dan bisa diakses kapan saja.",
    color: "from-emerald-500 to-lpka-green",
  },
  {
    icon: BarChart3,
    title: "Visualisasi Data",
    desc: "Pantau performa genset & kendaraan melalui grafik interaktif.",
    color: "from-amber-500 to-lpka-gold",
  },
  {
    icon: Fingerprint,
    title: "Akses Digital",
    desc: "Laporan tersimpan rapi & aman, bebas dari kertas yang hilang.",
    color: "from-purple-500 to-purple-700",
  },
]

export default function AppAboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-xl">
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-lpka-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-lpka-green/10 blur-3xl" />

        <div className="relative p-8 md:p-12 lg:p-14">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lpka-primary/10 to-lpka-green/10 px-4 py-1.5 text-sm font-semibold text-gray-700 border border-lpka-primary/10">
              <Zap className="h-4 w-4 text-lpka-green" />
              <Truck className="h-4 w-4 text-lpka-primary" />
              <span>Tentang Aplikasi</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sistem Laporan Internal{" "}
              <span className="bg-gradient-to-r from-lpka-green to-lpka-primary bg-clip-text text-transparent">
                LPKA Kelas II Lampung
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
              Platform digital untuk mencatat, memantau, dan mengelola laporan pemeriksaan
              harian genset serta kendaraan dinas secara efisien, akurat, dan terstruktur.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-lpka-primary/5 px-4 py-2 text-sm font-medium text-lpka-primary border border-lpka-primary/10">
              <Zap className="h-4 w-4" />
              Genset Monitoring
            </span>
            <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
            <span className="inline-flex items-center gap-2 rounded-full bg-lpka-green/5 px-4 py-2 text-sm font-medium text-lpka-green border border-lpka-green/10">
              <Truck className="h-4 w-4" />
              Kendaraan Tracking
            </span>
            <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200">
              <BarChart3 className="h-4 w-4" />
              Laporan Real-time
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

