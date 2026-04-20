import "./globals.css"
import Link from "next/link"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Laporan Internal",
  description: "Aplikasi laporan pemeriksaan kendaraan & genset"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-slate-100">
        <header className="bg-slate-900 text-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <Link href="/" className="text-xl font-semibold tracking-tight">
                Laporan Internal
              </Link>
              <p className="text-sm text-slate-300">Laporan pemeriksaan kendaraan & genset</p>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm">
              <Link href="/" className="rounded-md bg-slate-700 px-3 py-2 hover:bg-slate-600 transition">
                Dashboard
              </Link>
              <Link href="/reports/vehicle/create" className="rounded-md bg-slate-700 px-3 py-2 hover:bg-slate-600 transition">
                Baru Kendaraan
              </Link>
              <Link href="/reports/genset/create" className="rounded-md bg-slate-700 px-3 py-2 hover:bg-slate-600 transition">
                Baru Genset
              </Link>
            </nav>
          </div>
        </header>

        <main className="min-h-[calc(100vh-88px)]">
          {children}
        </main>

        {/* 🔥 TOAST GLOBAL */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b", // slate-800
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "14px"
            },
            success: {
              style: {
                background: "#16a34a", // green-600
              },
            },
            error: {
              style: {
                background: "#dc2626", // red-600
              },
            },
          }}
        />

      </body>
    </html>
  )
}