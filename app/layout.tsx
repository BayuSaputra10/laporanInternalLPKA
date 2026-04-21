import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Sistem Laporan Internal LPKA Kelas II Bandar Lampung",
  description: "Aplikasi manajemen laporan pemeriksaan kendaraan & genset harian"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-lpka-bg antialiased font-body">

        <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
          {children}
        </main>

        {/* 🔥 TOAST GLOBAL */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgb(30 64 175)", // lpka-primary
              color: "#fff",
              borderRadius: "0.5rem",
              padding: "16px 20px",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
            },
            success: {
              style: {
                background: "rgb(4 120 87)", // lpka-green
              },
            },
            error: {
              style: {
                background: "#dc2626", // red-600
              },
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}

