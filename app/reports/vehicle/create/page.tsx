"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type FormDataKeys = "jenisKendaraan" | "keperluan" | "tanggal" | "kmAwal" | "kmAkhir" | "solarAwalStrip" | "solarAkhirStrip" | "photo"
type Errors = Partial<Record<FormDataKeys, string>>

export default function CreateVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const validateForm = (formData: FormData): Errors => {
    const newErrors: Errors = {}

    if (!formData.get("jenisKendaraan")?.toString().trim()) newErrors.jenisKendaraan = "Jenis kendaraan wajib diisi"
    if (!formData.get("keperluan")?.toString().trim()) newErrors.keperluan = "Keperluan wajib diisi"
    if (!formData.get("tanggal")?.toString().trim()) newErrors.tanggal = "Tanggal wajib diisi"

    const kmAwal = Number(formData.get("kmAwal"))
    const kmAkhir = Number(formData.get("kmAkhir"))
    const solarAwal = Number(formData.get("solarAwalStrip"))
    const solarAkhir = Number(formData.get("solarAkhirStrip"))

    if (isNaN(kmAwal) || kmAwal < 0) newErrors.kmAwal = "KM Awal harus valid (>= 0)"
    if (isNaN(kmAkhir) || kmAkhir < 0) newErrors.kmAkhir = "KM Akhir harus valid (>= 0)"
    if (!isNaN(kmAwal) && !isNaN(kmAkhir) && kmAkhir <= kmAwal) newErrors.kmAkhir = "KM Akhir harus lebih besar dari KM Awal"

    if (isNaN(solarAwal) || solarAwal < 0) newErrors.solarAwalStrip = "Solar Awal harus valid (>= 0)"
    if (isNaN(solarAkhir) || solarAkhir < 0) newErrors.solarAkhirStrip = "Solar Akhir harus valid (>= 0)"
    if (!isNaN(solarAwal) && !isNaN(solarAkhir) && solarAkhir > solarAwal) newErrors.solarAkhirStrip = "Solar Akhir tidak boleh lebih besar dari Awal"

    const photoFile = formData.get("photo") as File | null
    if (photoFile && !photoFile.type.startsWith("image/")) newErrors.photo = "Hanya file foto yang diizinkan (jpg, png, etc.)"

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    setErrors({})

    // Client validation
    const clientErrors = validateForm(formData)
    if (Object.keys(clientErrors).length > 0) {
      Object.entries(clientErrors).forEach(([key, msg]) => {
        toast.error(msg as string)
      })
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/reports/vehicle", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success("✅ Laporan vehicle berhasil dibuat!")
        router.push('/')
      } else {
        toast.error(data.message || "❌ Gagal membuat laporan vehicle")
      }
    } catch (error) {
      toast.error("❌ Kesalahan jaringan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white/80 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 text-black">
          <h1 className="text-xl font-bold mb-6">Input Vehicle Report</h1>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Kendaraan *</label>
              <input name="jenisKendaraan" placeholder="Jenis Kendaraan" className="w-full border bg-white/90 p-2 rounded" required />
              {errors.jenisKendaraan && <p className="text-red-500 text-xs mt-1">{errors.jenisKendaraan}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Keperluan *</label>
              <input name="keperluan" placeholder="Keperluan" className="w-full border bg-white/90 p-2 rounded" required />
              {errors.keperluan && <p className="text-red-500 text-xs mt-1">{errors.keperluan}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tanggal *</label>
              <input name="tanggal" type="date" className="w-full border bg-white/90 p-2 rounded" required />
              {errors.tanggal && <p className="text-red-500 text-xs mt-1">{errors.tanggal}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">KM Awal *</label>
                <input name="kmAwal" type="number" placeholder="KM Awal" className="border bg-white/90 p-2 rounded w-full" required />
                {errors.kmAwal && <p className="text-red-500 text-xs mt-1">{errors.kmAwal}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">KM Akhir *</label>
                <input name="kmAkhir" type="number" placeholder="KM Akhir" className="border bg-white/90 p-2 rounded w-full" required />
                {errors.kmAkhir && <p className="text-red-500 text-xs mt-1">{errors.kmAkhir}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">Solar Awal *</label>
                <input name="solarAwalStrip" type="number" placeholder="Solar Awal" className="border bg-white/90 p-2 rounded w-full" required />
                {errors.solarAwalStrip && <p className="text-red-500 text-xs mt-1">{errors.solarAwalStrip}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Solar Akhir *</label>
                <input name="solarAkhirStrip" type="number" placeholder="Solar Akhir" className="border bg-white/90 p-2 rounded w-full" required />
                {errors.solarAkhirStrip && <p className="text-red-500 text-xs mt-1">{errors.solarAkhirStrip}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Foto (Opsional, hanya foto)</label>
              <input name="photo" type="file" accept="image/*" className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition">
              {loading ? "Menyimpan..." : "Simpan Laporan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
