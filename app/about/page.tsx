import Link from "next/link"
import { Zap, Truck, ShieldCheck, FileText, Users, Calendar, Database, Smartphone, ArrowLeft } from "lucide-react"


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lpka-primary/10 via-white to-lpka-green/10 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lpka-bg.jpg')] bg-cover bg-center opacity-5 mix-blend-multiply"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-lpka-primary/80 bg-clip-text text-transparent mb-6 leading-tight">
            Tentang
            <br />
            <span className="bg-gradient-to-r from-lpka-green via-lpka-primary to-[#3b82f6] bg-clip-text">Sistem Laporan Internal</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Platform modern untuk manajemen laporan pemeriksaan harian genset dan kendaraan  
            <strong className="text-lpka-primary font-bold"> LPKA Kelas II Bandar Lampung</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link
              href="/"
              className="group flex items-center justify-center gap-3 bg-lpka-primary hover:bg-lpka-primary/90 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Fitur Unggulan Sistem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dibangun dengan teknologi terkini untuk efisiensi dan akurasi pelaporan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Genset Reports */}
            <div className="group bg-gradient-to-br from-lpka-green/10 to-transparent border-2 border-lpka-green/20 rounded-3xl p-10 md:p-12 hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
              <div className="w-20 h-20 bg-lpka-green/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                <Zap className="w-10 h-10 text-lpka-green drop-shadow-lg" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Laporan Genset
              </h3>
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-center gap-3"><FileText className="w-5 h-5 text-lpka-green/70" /> Hour meter tracking</li>
                <li className="flex items-center gap-3"><Database className="w-5 h-5 text-lpka-green/70" /> Solar usage monitoring</li>
                <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-lpka-green/70" /> Regu & tanggal otomatis</li>
              </ul>
            </div>

            {/* Vehicle Reports */}
            <div className="group bg-gradient-to-br from-lpka-primary/10 to-transparent border-2 border-lpka-primary/20 rounded-3xl p-10 md:p-12 hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
              <div className="w-20 h-20 bg-lpka-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                <Truck className="w-10 h-10 text-lpka-primary drop-shadow-lg" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Laporan Kendaraan
              </h3>
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-center gap-3"><FileText className="w-5 h-5 text-lpka-primary/70" /> KM awal/akhir tracking</li>
                <li className="flex items-center gap-3"><Database className="w-5 h-5 text-lpka-primary/70" /> Solar strip monitoring</li>
                <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-lpka-primary/70" /> Keperluan & jenis kendaraan</li>
              </ul>
            </div>

            {/* Additional Features */}
            <div className="group md:col-span-2 lg:col-span-1 bg-gradient-to-br from-gray-900/5 to-transparent border-2 border-gray-200/50 rounded-3xl p-10 md:p-12 hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-lpka-green to-lpka-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto text-white shadow-2xl">
                <ShieldCheck className="w-10 h-10 drop-shadow-lg" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Teknologi Modern
              </h3>
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-center gap-3"><Smartphone className="w-5 h-5 text-gray-500/70" /> Fully responsive</li>
                <li className="flex items-center gap-3"><Database className="w-5 h-5 text-gray-500/70" /> Prisma + PostgreSQL</li>
                <li className="flex items-center gap-3"><Users className="w-5 h-5 text-gray-500/70" /> Role-based dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Mission */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50/50 to-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Stats */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-lpka-green to-lpka-primary bg-clip-text text-transparent mb-4">
                  Efisiensi & Akurasi
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Sistem yang dirancang khusus untuk memenuhi kebutuhan pelaporan internal 
                  dengan proses yang cepat, aman, dan mudah digunakan oleh seluruh tim.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="group text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all">
                  <div className="text-4xl md:text-5xl font-black text-lpka-green mb-2">
                    100%
                  </div>
                  <p className="text-lg font-semibold text-gray-700">Akurasi Data</p>
                </div>
                <div className="group text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all">
                  <div className="text-4xl md:text-5xl font-black text-lpka-primary mb-2">
                    24/7
                  </div>
                  <p className="text-lg font-semibold text-gray-700">Akses Real-time</p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-white/60 to-gray-50/60 backdrop-blur-xl rounded-3xl p-10 md:p-12 border border-gray-200/50 shadow-xl">
              <h3 className="font-heading text-3xl font-bold text-gray-800 mb-6">
                Misi Kami
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Memberikan solusi pelaporan yang terintegrasi untuk mendukung operasional 
                LPKA Kelas II Bandar Lampung dengan data yang akurat, mudah diakses, 
                dan selalu up-to-date untuk pengambilan keputusan yang lebih baik.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
                <span className="px-4 py-2 bg-lpka-green/10 text-lpka-green rounded-full border border-lpka-green/30">Prisma ORM</span>
                <span className="px-4 py-2 bg-lpka-primary/10 text-lpka-primary rounded-full border border-lpka-primary/30">Next.js 16</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">Tailwind CSS</span>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">TypeScript</span>
                                <span className="px-4 py-2 bg-lpka-primary/10 text-lpka-primary rounded-full border border-lpka-primary/30">Postgresql</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Contact */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Tim Pengembang
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            Dibuat dengan untuk LPKA Kelas II Bandar Lampung
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            <div className="group bg-gradient-to-br from-lpka-green/10 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all border border-lpka-green/20">
              <div className="w-24 h-24 bg-lpka-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-lpka-green font-bold text-2xl">
                IT
              </div>
              <h4 className="font-semibold text-xl text-gray-800 mb-2">Tim IT LPKA</h4>
              <p className="text-lpka-green font-medium">Development & Maintenance</p>
            </div>
            <div className="group bg-gradient-to-br from-lpka-primary/10 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all border border-lpka-primary/20">
              <div className="w-24 h-24 bg-lpka-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-lpka-primary font-bold text-2xl">
                OP
              </div>
              <h4 className="font-semibold text-xl text-gray-800 mb-2">Regu Operasional</h4>
              <p className="text-lpka-primary font-medium">Daily Usage & Feedback</p>
            </div>
            <div className="group bg-gradient-to-br from-gray-100/70 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all border border-gray-200">
              <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-700 font-bold text-2xl">
                MG
              </div>
              <h4 className="font-semibold text-xl text-gray-800 mb-2">Manajemen</h4>
              <p className="text-gray-700 font-medium">Oversight & Reporting</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-lpka-primary/90 to-lpka-green/90 p-10 md:p-12 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/lpka-bg.jpg')] opacity-10 mix-blend-overlay"></div>
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Hubungi Kami
              </h3>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Punya saran atau butuh bantuan?
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div>
                  <p className="text-2xl font-bold mb-2">LPKA Kelas II Bandar Lampung</p>
                  <p>Desa Kota Agung, Kecamatan Tegineneng</p>
                  <p>Kabupaten Pesawaran, Lampung</p>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-lg mb-4">@lpka.lampung</p>
                  <p className="text-lg">(0721) 481107</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

