import "./globals.css"
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

        {children}

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