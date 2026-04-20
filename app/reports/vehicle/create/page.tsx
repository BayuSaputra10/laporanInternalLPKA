"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const res = await fetch("/api/reports/vehicle", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    console.log("API RESPONSE:", data)

    setLoading(false)

    if (res.ok) {
      router.push("/reports/vehicle")
    } else {
      alert(data.message || "Gagal membuat laporan")
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">

      <div className="max-w-2xl w-full">

        <div className="bg-white/80 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 text-black">

          <h1 className="text-xl font-bold mb-6">
            Input Vehicle Report
          </h1>

          {/* 🔥 FIX UTAMA DI SINI */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">

            <input
              name="jenisKendaraan"
              placeholder="Jenis Kendaraan"
              className="w-full border bg-white/90 p-2 rounded"
              required
            />

            <input
              name="keperluan"
              placeholder="Keperluan"
              className="w-full border bg-white/90 p-2 rounded"
              required
            />

            <input
              name="tanggal"
              type="date"
              className="w-full border bg-white/90 p-2 rounded"
              required
            />

            <div className="grid grid-cols-2 gap-2">

              <input
                name="kmAwal"
                type="number"
                placeholder="KM Awal"
                className="border bg-white/90 p-2 rounded"
                required
              />

              <input
                name="kmAkhir"
                type="number"
                placeholder="KM Akhir"
                className="border bg-white/90 p-2 rounded"
                required
              />

            </div>

            <div className="grid grid-cols-2 gap-2">

              <input
                name="solarAwalStrip"
                type="number"
                placeholder="Solar Awal"
                className="border bg-white/90 p-2 rounded"
                required
              />

              <input
                name="solarAkhirStrip"
                type="number"
                placeholder="Solar Akhir"
                className="border bg-white/90 p-2 rounded"
                required
              />

            </div>

            <input
              name="photo"
              type="file"
              accept="image/*"
              className="w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}