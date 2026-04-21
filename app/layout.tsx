import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/app/components/Navbar"

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
    <html lang="id" className="scroll-smooth">
      <body className="bg-lpka-bg antialiased font-body min-h-screen">
        <Navbar />
        
        
        <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
              borderRadius: "1rem",
              padding: "16px 24px",
              fontSize: "15px",
              fontFamily: "var(--font-body)",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
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

